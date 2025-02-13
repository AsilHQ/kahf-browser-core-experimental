#include "brave/browser/ui/webui/new_tab_page/wallpaper_data_fetcher.h"
#include "brave/browser/ui/webui/new_tab_page/brave_new_tab_page_handler.h"

#include "base/bind.h"
#include "base/callback.h"
#include "content/public/browser/storage_partition.h"
#include "chrome/services/network/public/cpp/resource_request.h"
#include "chrome/services/network/public/cpp/simple_url_loader.h"
#include "net/traffic_annotation/network_traffic_annotation.h"

WallpaperDataFetcher::WallpaperDataFetcher(content::BrowserContext* browser_context)
    : browser_context_(browser_context) {}

WallpaperDataFetcher::~WallpaperDataFetcher() = default;

void WallpaperDataFetcher::FetchWallpaperData(FetchCallback callback) {
  callback_ = std::move(callback);

  auto resource_request = std::make_unique<chrome::services::network::ResourceRequest>();
  // Replace with your actual wallpaper API endpoint
  resource_request->url = GURL("https://elements.getpostman.com/redirect?entityId=38585973-cf8bb8f0-eed4-4581-864a-5293419fdd8c&entityType=collection ");
  resource_request->method = "GET";

  // Define a proper traffic annotation
  net::NetworkTrafficAnnotationTag traffic_annotation =
      net::DefineNetworkTrafficAnnotation("wallpaper_data_fetcher", R"(
        semantics {
          sender: "Wallpaper Data Fetcher"
          description: "Fetches wallpaper data for the new tab page"
          trigger: "User opens a new tab"
          data: "Wallpaper metadata and URLs"
          destination: WEBSITE
        }
        policy {
          cookies_allowed: NO
          setting: "This feature cannot be disabled in settings."
          policy_exception_justification: "Essential for new tab functionality."
        })");

  simple_url_loader_ = chrome::services::network::SimpleURLLoader::Create(
      std::move(resource_request), traffic_annotation);

  auto* url_loader_factory = 
      content::BrowserContext::GetDefaultStoragePartition(browser_context_)
          ->GetURLLoaderFactoryForBrowserProcess()
          .get();

  simple_url_loader_->DownloadToStringOfUnboundedSizeUntilCrashAndDie(
      url_loader_factory,
      base::BindOnce(&WallpaperDataFetcher::OnURLLoadComplete, 
                     weak_ptr_factory_.GetWeakPtr()));
}

void WallpaperDataFetcher::OnURLLoadComplete(
    std::unique_ptr<std::string> response_body) {
  if (response_body) {
    std::move(callback_).Run(*response_body);
  } else {
    std::move(callback_).Run(std::string());
  }
}