/* Copyright (c) 2022 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * you can obtain one at http://mozilla.org/MPL/2.0/. */

#include "components/crx_file/crx_verifier.h"

#include <utility>
#include <vector>

#include "base/containers/span.h"

namespace {

// The Brave publisher key that is accepted in addition to upstream's
// kPublisherKeyHash. This key may be used to verify updates of the browser
// itself. If you change this constant, then you will likely also need to change
// the associated file crx-private-key.der, which is not in Git.
// Until May 2024, components were only signed with 0x93, 0x74, 0xd6... Since
// then, they are also signed with this new key (0x2a, 0x37, 0x45...). Now, the
// value here ensures that only binaries signed with the new key are accepted.
constexpr uint8_t kBravePublisherKeyHash[] = {
    0x2a, 0x37, 0x45, 0x41, 0xf8, 0xa6, 0xef, 0x0c, 0x90, 0xd2, 0x90,
    0x61, 0x80, 0x2a, 0xf7, 0x1d, 0xb9, 0xc6, 0x1c, 0xf8, 0xb5, 0xe1,
    0xd7, 0xbe, 0xdb, 0xdc, 0xbf, 0x1b, 0xd4, 0x70, 0x8f, 0x36};

auto GetBravePublisherKeyHash() {
  static auto brave_publisher_key = std::to_array(kBravePublisherKeyHash);
  return base::span(brave_publisher_key);
}

// Used in the patch in crx_verifier.cc.
bool IsBravePublisher(base::span<const uint8_t> key_hash) {
  return GetBravePublisherKeyHash() == key_hash;
}

}  // namespace

namespace crx_file {

void SetBravePublisherKeyHashForTesting(base::span<const uint8_t> test_key) {
  GetBravePublisherKeyHash().copy_from(test_key);
}

}  // namespace crx_file

#include "src/components/crx_file/crx_verifier.cc"
