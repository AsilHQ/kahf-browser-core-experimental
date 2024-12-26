// In brave/components/brave_new_tab_ui/browser/wallpaper_data_fetcher.h
#ifndef BRAVE_COMPONENTS_BRAVE_NEW_TAB_UI_BROWSER_WALLPAPER_DATA_FETCHER_H_
#define BRAVE_COMPONENTS_BRAVE_NEW_TAB_UI_BROWSER_WALLPAPER_DATA_FETCHER_H_

#include <memory>
#include <string>

#include "base/callback.h"
#include "base/bind.h"
#include "base/memory/weak_ptr.h"
#include "url/gurl.h"

namespace content {
class BrowserContext;
}

namespace chrome::services::network {
class SimpleURLLoader;
}

class WallpaperDataFetcher {
 public:
  // Fix the callback definition
  using FetchCallback = base::OnceCallback<void(const std::string&)>;
  
  explicit WallpaperDataFetcher(content::BrowserContext* browser_context);
  ~WallpaperDataFetcher();

  WallpaperDataFetcher(const WallpaperDataFetcher&) = delete;
  WallpaperDataFetcher& operator=(const WallpaperDataFetcher&) = delete;

  void FetchWallpaperData(FetchCallback callback);

 private:
  void OnURLLoadComplete(std::unique_ptr<std::string> response_body);

  content::BrowserContext* const browser_context_;
  std::unique_ptr<chrome::services::network::SimpleURLLoader> simple_url_loader_;
  FetchCallback callback_;
  base::WeakPtrFactory<WallpaperDataFetcher> weak_ptr_factory_{this};
};

#endif  // BRAVE_COMPONENTS_BRAVE_NEW_TAB_UI_BROWSER_WALLPAPER_DATA_FETCHER_H_