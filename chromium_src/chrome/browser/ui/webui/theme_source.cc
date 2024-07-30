// Copyright (c) 2024 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// You can obtain one at https://mozilla.org/MPL/2.0/.

#include "chrome/browser/ui/webui/theme_source.h"

#include <string>

#include "base/strings/strcat.h"
#include "chrome/browser/ui/color/chrome_color_provider_utils.h"

namespace {

std::string MaybeNalaMappings(std::vector<std::string_view>& color_id_sets) {
  auto it = base::ranges::find(color_id_sets, "nala");
  if (it == color_id_sets.end()) {
    return std::string();
  }
  color_id_sets.erase(it);

  const std::vector<std::string> colors = {
      "primary", "secondary", "tertiary", "neutral", "neutral-variant", "error",
  };

  const std::vector<char> tones = {0,  5,  10, 15, 20, 25, 30, 35, 40,
                                   50, 60, 70, 80, 90, 95, 98, 99, 100};

  std::string result;
  for (const auto& color : colors) {
    for (const auto& tone : tones) {
      auto leo_color = base::StrCat(
          {"--leo-color-", color, "-", base::NumberToString(tone)});
      auto ui_color =
          base::StrCat({"--color-ref-", color, base::NumberToString(tone)});
      result += base::StrCat({leo_color, ":var(", ui_color, ");"});
    }
  }
  return result;
}

}  // namespace

#define ChromeColorIdName ChromeColorIdName), MaybeNalaMappings(color_id_sets
#include "src/chrome/browser/ui/webui/theme_source.cc"
#undef ChromeColorIdName
