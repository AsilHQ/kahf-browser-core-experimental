/* Copyright (c) 2023 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at https://mozilla.org/MPL/2.0/. */

#ifndef BRAVE_COMPONENTS_BRAVE_ADS_CORE_INTERNAL_CREATIVES_CREATIVE_AD_UTIL_H_
#define BRAVE_COMPONENTS_BRAVE_ADS_CORE_INTERNAL_CREATIVES_CREATIVE_AD_UTIL_H_

#include <algorithm>
#include <cstddef>
#include <string>

#include "base/containers/flat_set.h"
#include "base/strings/strcat.h"
#include "brave/components/brave_ads/core/internal/creatives/creative_ad_info.h"
#include "brave/components/brave_ads/core/internal/segments/segment_constants.h"

namespace brave_ads {

template <typename T>
size_t UntargetedCreativeAdCount(const T& creative_ads) {
  return std::ranges::count_if(
      creative_ads, [](const CreativeAdInfo& creative_ad) {
        return creative_ad.segment == kUntargetedSegment;
      });
}

template <typename T>
size_t TargetedCreativeAdCount(const T& creative_ads) {
  return std::ranges::count_if(
      creative_ads, [](const CreativeAdInfo& creative_ad) {
        return creative_ad.segment != kUntargetedSegment;
      });
}

template <typename T>
T DeduplicateCreativeAds(const T& creative_ads) {
  base::flat_set<std::string> uuids;

  T deduplicated_creative_ads;
  for (const auto& creative_ad : creative_ads) {
    const std::string uuid =
        base::StrCat({creative_ad.campaign_id, creative_ad.creative_set_id,
                      creative_ad.creative_instance_id, creative_ad.segment});
    if (uuids.contains(uuid)) {
      // Skip duplicates.
      continue;
    }
    uuids.insert(uuid);

    deduplicated_creative_ads.push_back(creative_ad);
  }

  return deduplicated_creative_ads;
}

}  // namespace brave_ads

#endif  // BRAVE_COMPONENTS_BRAVE_ADS_CORE_INTERNAL_CREATIVES_CREATIVE_AD_UTIL_H_
