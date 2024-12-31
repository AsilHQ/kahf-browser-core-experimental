/* Copyright (c) 2023 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at https://mozilla.org/MPL/2.0/. */

#ifndef BRAVE_BROWSER_UI_WEBUI_WELCOME_PAGE_WELCOME_DOM_HANDLER_H_
#define BRAVE_BROWSER_UI_WEBUI_WELCOME_PAGE_WELCOME_DOM_HANDLER_H_

#include <string>

#include "base/memory/raw_ptr.h"
#include "base/memory/weak_ptr.h"
#include "base/values.h"
#include "chrome/browser/shell_integration.h"
#include "content/public/browser/web_ui_message_handler.h"
#include "components/ntp_tiles/most_visited_sites.h"
#include "components/ntp_tiles/ntp_tile.h"

class Profile;
class Browser;

// The handler for Javascript messages for the chrome://welcome page
class WelcomeDOMHandler : public content::WebUIMessageHandler,
                          public ntp_tiles::MostVisitedSites::Observer {
 public:
  explicit WelcomeDOMHandler(Profile* profile);
  WelcomeDOMHandler(const WelcomeDOMHandler&) = delete;
  WelcomeDOMHandler& operator=(const WelcomeDOMHandler&) = delete;
  ~WelcomeDOMHandler() override;

  // WebUIMessageHandler implementation.
  void RegisterMessages() override;

  // ntp_tiles::MostVisitedSites::Observer implementation.
  void OnURLsAvailable(
      const std::map<ntp_tiles::SectionType, ntp_tiles::NTPTilesVector>&
          sections) override;
  void OnIconMadeAvailable(const GURL& site_url) override;

 private:
  void HandleImportNowRequested(const base::Value::List& args);
  void HandleRecordP3A(const base::Value::List& args);
  void HandleGetDefaultBrowser(const base::Value::List& args);
  void SetLocalStateBooleanEnabled(const std::string& path,
                                   const base::Value::List& args);
  void OnGetDefaultBrowser(shell_integration::DefaultWebClientState state,
                           const std::u16string& name);
  void SetP3AEnabled(const base::Value::List& args);
  void HandleOpenSettingsPage(const base::Value::List& args);
  void HandleSetMetricsReportingEnabled(const base::Value::List& args);
  void HandleEnableWebDiscovery(const base::Value::List& args);
  void HandleAddNewTopSite(const base::Value::List& args);
  void HandleEditTopSite(const base::Value::List& args);
  int GetCustomLinksNum() const;
  bool IsCustomLinksEnabled() const;
  bool IsShortcutsVisible() const;
  
  Browser* GetBrowser();

  size_t last_onboarding_phase_ = 0;
  std::u16string default_browser_name_;
  raw_ptr<Profile> profile_ = nullptr;
  std::unique_ptr<ntp_tiles::MostVisitedSites> most_visited_sites_;
  base::WeakPtrFactory<WelcomeDOMHandler> weak_ptr_factory_{this};
};

#endif  // BRAVE_BROWSER_UI_WEBUI_WELCOME_PAGE_WELCOME_DOM_HANDLER_H_
