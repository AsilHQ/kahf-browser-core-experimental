/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at https://mozilla.org/MPL/2.0/. */

import { ExternalWallet } from '../../shared/lib/external_wallet'

export type PromotionKey =
  'bitflyer-verification' |
  'brave-creators' |
  'tap-network' |
  'uphold-card'

function getSupportedLocales (key: Exclude<PromotionKey, 'brave-creators'>) {
  switch (key) {
    case 'bitflyer-verification':
      return ['JP']
    case 'tap-network':
      return ['US']
    case 'uphold-card':
      return ['US']
  }
}

function isSupportedLocale (key: PromotionKey, countryCode: string) {
  // This promotion is valid in all locales
  if (key === 'brave-creators') {
    return true
  }

  return getSupportedLocales(key).includes(countryCode)
}

export function getPromotionURL (key: PromotionKey) {
  switch (key) {
    case 'bitflyer-verification':
      return 'https://kahfbrowser.com/'
    case 'brave-creators':
      return 'https://creators.brave.com'
    case 'tap-network':
      return 'https://brave.tapnetwork.io'
    case 'uphold-card':
      return 'https://uphold.com/brave/upholdcard'
  }
}

function getPromotions (
  externalWallet: ExternalWallet | null,
  isAndroid: boolean
) {
  const list: PromotionKey[] = []

  if (isAndroid) {
    if (!externalWallet) {
      list.unshift('bitflyer-verification')
    }
  } else {
    list.unshift('tap-network')
    if (externalWallet && externalWallet.provider === 'uphold') {
      list.unshift('uphold-card')
    }
    list.unshift('brave-creators')
  }

  return list
}

export function getAvailablePromotions (
  countryCode: string,
  externalWallet: ExternalWallet | null,
  isAndroid: boolean
) {
  return getPromotions(externalWallet, isAndroid).filter((key) => {
    return isSupportedLocale(key, countryCode)
  })
}
