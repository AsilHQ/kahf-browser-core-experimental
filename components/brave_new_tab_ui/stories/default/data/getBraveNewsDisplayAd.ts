// Copyright (c) 2021 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// You can obtain one at https://mozilla.org/MPL/2.0/.

import { DisplayAd } from '../../../../brave_news/browser/resources/shared/api'

let callCount = 0

export default function getBraveNewsDisplayAd (always: boolean = false) {
  callCount++
  const ad: DisplayAd | null = (always || callCount % 2)
    ? {
      description: 'Technica',
      uuid: '0abc',
      creativeInstanceId: '1234',
      title: '10 reasons why technica recreated the sound of old classics.',
      ctaText: 'Hear it',
      targetUrl: { url: 'https://www.brave.com' },
      image: { imageUrl: undefined, paddedImageUrl: { url: 'https://kahfbrowser.com/?' } },
      dimensions: '1x3'
    }
    : null
  return new Promise<{ ad: DisplayAd | null }>(function (resolve) {
    setTimeout(() => resolve({ ad }), 2400)
  })
}
