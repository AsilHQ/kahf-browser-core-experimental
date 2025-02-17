/* Copyright (c) 2023 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at https://mozilla.org/MPL/2.0/. */

#include "brave/browser/ui/webui/welcome_page/welcome_dom_handler.h"

#include <algorithm>

#include "base/i18n/rtl.h"
#include "base/metrics/histogram_macros.h"
#include "base/strings/utf_string_conversions.h"
#include "base/logging.h"
#include "brave/common/importer/importer_constants.h"
#include "brave/components/constants/pref_names.h"
#include "brave/components/p3a/pref_names.h"
#include "chrome/browser/browser_process.h"
#include "chrome/browser/metrics/metrics_reporting_state.h"
#include "chrome/browser/profiles/profile.h"
#include "chrome/browser/ui/browser.h"
#include "chrome/browser/ui/browser_finder.h"
#include "chrome/browser/ui/chrome_pages.h"
#include "chrome/common/webui_url_constants.h"
#include "chrome/grit/branded_strings.h"
#include "components/prefs/pref_service.h"
#include "ui/base/l10n/l10n_util.h"
#include "chrome/browser/ntp_tiles/chrome_most_visited_sites_factory.h"
#include "chrome/browser/ui/webui/new_tab_page/ntp_pref_names.h"
#include "components/ntp_tiles/constants.h"
#include "components/ntp_tiles/most_visited_sites.h"
#include "brave/browser/ui/webui/new_tab_page/brave_new_tab_ui.h"
#include "brave/browser/ui/webui/new_tab_page/brave_new_tab_ui_utils.h"
#include "brave/components/ntp_background_images/browser/ntp_sponsored_images_data.h"
#include "brave/components/ntp_background_images/browser/view_counter_service.h"
namespace {

constexpr char16_t kChromeBetaMacBrowserName[] = u"Chrome Beta";
constexpr char16_t kChromeDevMacBrowserName[] = u"Chrome Dev";
constexpr char16_t kChromeBetaLinuxBrowserName[] = u"Google Chrome (beta)";
constexpr char16_t kChromeDevLinuxBrowserName[] = u"Google Chrome (unstable)";
constexpr char kP3AOnboardingHistogramName[] =
    "Brave.Welcome.InteractionStatus.2";
constexpr size_t kMaxP3AOnboardingPhases = 3;

// What was the last screen that you viewed during the browser onboarding
// process?
// 0. Only viewed the welcome screen, performed no action
// 1. Viewed the profile import screen
// 2. Viewed the diagnostic/analytics consent screen
// 3. Finished the onboarding process
void RecordP3AHistogram(size_t last_onboarding_phase) {
  int answer = std::min(last_onboarding_phase, kMaxP3AOnboardingPhases);
  UMA_HISTOGRAM_EXACT_LINEAR(kP3AOnboardingHistogramName, answer,
                             kMaxP3AOnboardingPhases + 1);
}

bool IsChromeBeta(const std::u16string& browser_name) {
  return browser_name ==
             l10n_util::GetStringUTF16(IDS_CHROME_SHORTCUT_NAME_BETA) ||
         browser_name == kChromeBetaMacBrowserName ||
         browser_name == kChromeBetaLinuxBrowserName;
}

bool IsChromeDev(const std::u16string& browser_name) {
  return browser_name ==
             l10n_util::GetStringUTF16(IDS_CHROME_SHORTCUT_NAME_DEV) ||
         browser_name == kChromeDevMacBrowserName ||
         browser_name == kChromeDevLinuxBrowserName;
}

}  // namespace

WelcomeDOMHandler::WelcomeDOMHandler(Profile* profile) : profile_(profile) {
  most_visited_sites_ = ChromeMostVisitedSitesFactory::NewForProfile(profile_);
  if (most_visited_sites_) {
    most_visited_sites_->EnableCustomLinks(IsCustomLinksEnabled());
    most_visited_sites_->SetShortcutsVisible(IsShortcutsVisible());
    most_visited_sites_->AddMostVisitedURLsObserver(
        this, ntp_tiles::kMaxNumMostVisited);
  }
  base::MakeRefCounted<shell_integration::DefaultSchemeClientWorker>(
      GURL("https://brave.com"))
      ->StartCheckIsDefaultAndGetDefaultClientName(
          base::BindOnce(&WelcomeDOMHandler::OnGetDefaultBrowser,
                         weak_ptr_factory_.GetWeakPtr()));
}

WelcomeDOMHandler::~WelcomeDOMHandler() {
  RecordP3AHistogram(last_onboarding_phase_);
    if (most_visited_sites_) {
    most_visited_sites_->RemoveMostVisitedURLsObserver(this);
  }
}

Browser* WelcomeDOMHandler::GetBrowser() {
  return chrome::FindBrowserWithTab(web_ui()->GetWebContents());
}

void WelcomeDOMHandler::RegisterMessages() {
  web_ui()->RegisterMessageCallback(
      "importNowRequested",
      base::BindRepeating(&WelcomeDOMHandler::HandleImportNowRequested,
                          base::Unretained(this)));
  web_ui()->RegisterMessageCallback(
      "recordP3A", base::BindRepeating(&WelcomeDOMHandler::HandleRecordP3A,
                                       base::Unretained(this)));
  web_ui()->RegisterMessageCallback(
      "setP3AEnabled", base::BindRepeating(&WelcomeDOMHandler::SetP3AEnabled,
                                           base::Unretained(this)));
  web_ui()->RegisterMessageCallback(
      "openSettingsPage",
      base::BindRepeating(&WelcomeDOMHandler::HandleOpenSettingsPage,
                          base::Unretained(this)));
  web_ui()->RegisterMessageCallback(
      "setMetricsReportingEnabled",
      base::BindRepeating(&WelcomeDOMHandler::HandleSetMetricsReportingEnabled,
                          base::Unretained(this)));
  web_ui()->RegisterMessageCallback(
      "getDefaultBrowser",
      base::BindRepeating(&WelcomeDOMHandler::HandleGetDefaultBrowser,
                          base::Unretained(this)));
  web_ui()->RegisterMessageCallback(
      "enableWebDiscovery",
      base::BindRepeating(&WelcomeDOMHandler::HandleEnableWebDiscovery,
                          base::Unretained(this)));
    web_ui()->RegisterMessageCallback(
      "addNewTopSite",
      base::BindRepeating(&WelcomeDOMHandler::HandleAddNewTopSite,
                          base::Unretained(this)));
  web_ui()->RegisterMessageCallback(
      "editTopSite",
      base::BindRepeating(&WelcomeDOMHandler::HandleEditTopSite,
                          base::Unretained(this)));
}

void WelcomeDOMHandler::HandleImportNowRequested(
    const base::Value::List& args) {
  chrome::ShowSettingsSubPageInTabbedBrowser(GetBrowser(),
                                             chrome::kImportDataSubPage);
}

void WelcomeDOMHandler::HandleGetDefaultBrowser(const base::Value::List& args) {
  CHECK_EQ(1U, args.size());
  const auto& callback_id = args[0].GetString();
  AllowJavascript();
  ResolveJavascriptCallback(base::Value(callback_id),
                            base::Value(default_browser_name_));
}

void WelcomeDOMHandler::OnGetDefaultBrowser(
    shell_integration::DefaultWebClientState state,
    const std::u16string& name) {
  std::u16string browser_name = name;
#if BUILDFLAG(IS_MAC)
  base::ReplaceSubstringsAfterOffset(&browser_name, 0, u".app", u"");
#endif
  if (IsChromeBeta(browser_name)) {
    browser_name = base::UTF8ToUTF16(std::string(kGoogleChromeBrowserBeta));
  } else if (IsChromeDev(browser_name)) {
    browser_name = base::UTF8ToUTF16(std::string(kGoogleChromeBrowserDev));
  }
  default_browser_name_ = browser_name;
}

void WelcomeDOMHandler::HandleRecordP3A(const base::Value::List& args) {
  CHECK_EQ(1U, args.size());
  CHECK(args[0].is_int());

  last_onboarding_phase_ = args[0].GetInt();

  RecordP3AHistogram(last_onboarding_phase_);
}

void WelcomeDOMHandler::HandleOpenSettingsPage(const base::Value::List& args) {
  DCHECK(profile_);
  Browser* browser = chrome::FindBrowserWithProfile(profile_);
  if (browser) {
    content::OpenURLParams open_params(
        GURL("brave://settings/privacy"), content::Referrer(),
        WindowOpenDisposition::NEW_BACKGROUND_TAB,
        ui::PAGE_TRANSITION_AUTO_TOPLEVEL, false);
    browser->OpenURL(open_params, /*navigation_handle_callback=*/{});
  }
}

void WelcomeDOMHandler::HandleSetMetricsReportingEnabled(
    const base::Value::List& args) {
  CHECK_EQ(args.size(), 1U);
  if (!args[0].is_bool()) {
    return;
  }
  bool enabled = args[0].GetBool();
  ChangeMetricsReportingState(
      enabled, ChangeMetricsReportingStateCalledFrom::kUiSettings);
}

void WelcomeDOMHandler::HandleEnableWebDiscovery(
    const base::Value::List& args) {
  DCHECK(profile_);
  profile_->GetPrefs()->SetBoolean(kWebDiscoveryEnabled, true);
}

void WelcomeDOMHandler::SetLocalStateBooleanEnabled(
    const std::string& path,
    const base::Value::List& args) {
  CHECK_EQ(args.size(), 1U);
  if (!args[0].is_bool()) {
    return;
  }

  bool enabled = args[0].GetBool();
  PrefService* local_state = g_browser_process->local_state();
  local_state->SetBoolean(path, enabled);
}

void WelcomeDOMHandler::SetP3AEnabled(const base::Value::List& args) {
  SetLocalStateBooleanEnabled(p3a::kP3AEnabled, args);
}

// ntp_tiles::MostVisitedSites::Observer:
void WelcomeDOMHandler::OnURLsAvailable(
    const std::map<ntp_tiles::SectionType, ntp_tiles::NTPTilesVector>&
        sections) {
  if (!most_visited_sites_)
    return;

  base::Value::Dict result;
  base::Value::List tiles;
  int tile_id = 1;

  // Super Referral feature only present in regular tabs (not private tabs)
  // auto* service = ViewCounterServiceFactory::GetForProfile(profile_);
  // if (service) {
  //   for (auto& top_site : service->GetTopSitesData()) {
  //     base::Value::Dict tile_value;
  //     if (top_site.name.empty()) {
  //       tile_value.Set("title", top_site.destination_url);
  //       tile_value.Set("title_direction", base::i18n::LEFT_TO_RIGHT);
  //     } else {
  //       tile_value.Set("title", top_site.name);
  //       tile_value.Set("title_direction",
  //                      base::i18n::GetFirstStrongCharacterDirection(
  //                          base::UTF8ToUTF16(top_site.name)));
  //     }
  //     tile_value.Set("id", tile_id++);
  //     tile_value.Set("url", top_site.destination_url);
  //     tile_value.Set("favicon", top_site.image_path);
  //     tile_value.Set("defaultSRTopSite", true);
  //     tile_value.Set("source",
  //                    static_cast<int32_t>(ntp_tiles::TileSource::ALLOWLIST));
  //     tile_value.Set("title_source", static_cast<int32_t>(
  //                                        ntp_tiles::TileTitleSource::INFERRED));
  //     tiles.Append(std::move(tile_value));
  //   }
  // }

  for (auto& tile : sections.at(ntp_tiles::SectionType::PERSONALIZED)) {
    base::Value::Dict tile_value;
    if (tile.title.empty()) {
      tile_value.Set("title", tile.url.spec());
      tile_value.Set("title_direction", base::i18n::LEFT_TO_RIGHT);
    } else {
      tile_value.Set("title", base::UTF16ToUTF8(tile.title));
      tile_value.Set("title_direction",
                     base::i18n::GetFirstStrongCharacterDirection(tile.title));
    }
    tile_value.Set("id", tile_id++);
    tile_value.Set("url", tile.url.spec());
    tile_value.Set("favicon", tile.favicon_url.spec());
    tile_value.Set("source", static_cast<int32_t>(tile.source));
    tile_value.Set("title_source", static_cast<int32_t>(tile.title_source));
    tiles.Append(std::move(tile_value));
  }

  result.Set("tiles", std::move(tiles));
  result.Set("custom_links_enabled",
             most_visited_sites_->IsCustomLinksEnabled());
  result.Set("visible", most_visited_sites_->IsShortcutsVisible());
  result.Set("custom_links_num", GetCustomLinksNum());

  // Notify listeners of this update (ex: new tab page)
  if (IsJavascriptAllowed()) {
    FireWebUIListener("most-visited-info-changed", result);
  }
}

void WelcomeDOMHandler::OnIconMadeAvailable(const GURL& site_url) {}
bool WelcomeDOMHandler::IsCustomLinksEnabled() const {
  return !profile_->GetPrefs()->GetBoolean(ntp_prefs::kNtpUseMostVisitedTiles);
}
bool WelcomeDOMHandler::IsShortcutsVisible() const {
  return profile_->GetPrefs()->GetBoolean(ntp_prefs::kNtpShortcutsVisible);
}
int WelcomeDOMHandler::GetCustomLinksNum() const {
  // Calculate the number of tiles that can be visible in favorites mode.
  int custom_links_num = 0;
  auto most_visited_sites =
      ChromeMostVisitedSitesFactory::NewForProfile(profile_);
  if (most_visited_sites) {
    custom_links_num += most_visited_sites->GetCustomLinkNum();
  }

  // In NTP SR mode, SR tiles are also shown in tiles.
  // auto* service = ViewCounterServiceFactory::GetForProfile(profile_);
  // if (service) {
  //   custom_links_num += service->GetTopSitesData().size();
  // }

  return custom_links_num;
}

void WelcomeDOMHandler::HandleEditTopSite(const base::Value::List& args) {
  if (!most_visited_sites_)
    return;

  AllowJavascript();

  if (!args[0].is_string() || !args[1].is_string() || !args[2].is_string())
    return;

  std::string url = args[0].GetString();
  DCHECK(!url.empty());

  std::string new_url = args[1].GetString();
  std::string title = args[2].GetString();

  // |new_url| can be empty if user only want to change title.
  // Stop editing if we can't make |new_url| valid.
  if (!new_url.empty() && !GetValidURLStringForTopSite(&new_url))
    return;

  if (title.empty())
    title = new_url.empty() ? url : new_url;

  // when user modifies current top sites, change to favorite mode.
  if (!most_visited_sites_->IsCustomLinksEnabled()) {
    profile_->GetPrefs()->SetBoolean(ntp_prefs::kNtpUseMostVisitedTiles, false);
    most_visited_sites_->EnableCustomLinks(IsCustomLinksEnabled());
  }

  GURL gurl(url);
  GURL new_gurl(new_url);
  std::u16string title16 = base::UTF8ToUTF16(title);

  const bool updated =
      most_visited_sites_->UpdateCustomLink(gurl, new_gurl, title16);
  if (!updated) {
    most_visited_sites_->AddCustomLink(new_url.empty() ? gurl : new_gurl,
                                       title16);
  }
}

void WelcomeDOMHandler::HandleAddNewTopSite(
    const base::Value::List& args) {
      // LOG(ERROR)<<"HandleAddNewTopSite called from WelcomeDOMHandler";
  if (!most_visited_sites_)
    return;

  AllowJavascript();

  if (!args[0].is_string() || !args[1].is_string())
    return;

  std::string url = args[0].GetString();
  DCHECK(!url.empty());

  std::string title = args[1].GetString();

  // Stop adding if we can't make |url| valid.
  if (!GetValidURLStringForTopSite(&url))
    return;

  // If the user tries to add a new site in top sites mode, change to favorite
  // mode.
  if (!most_visited_sites_->IsCustomLinksEnabled()) {
    profile_->GetPrefs()->SetBoolean(ntp_prefs::kNtpUseMostVisitedTiles, false);
    most_visited_sites_->EnableCustomLinks(IsCustomLinksEnabled());
  }
  // LOG(ERROR)<<"most_visited_sites_->AddCustomLink being called from WelcomeDOMHandler";
  most_visited_sites_->AddCustomLink(GURL(url), base::UTF8ToUTF16(title));
}
