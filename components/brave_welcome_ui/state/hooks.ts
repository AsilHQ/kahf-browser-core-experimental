// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// You can obtain one at https://mozilla.org/MPL/2.0/.

import * as React from 'react'
import { BrowserProfile, ImportDataBrowserProxyImpl } from '../api/welcome_browser_proxy'
import { loadTimeData } from '$web-common/loadTimeData'
import { BrowserType, ViewType } from './component_types'
import DataContext from './context'

const browserList = Object.values(BrowserType)

export const getValidBrowserProfiles = (profiles: BrowserProfile[]) => {
  const getBrowserName = (toFind: string) => {
    // TODO(tali): Add exact matching for cases like "Chrome" vs "Chrome Canary"
    return browserList.find(browser => toFind.includes(browser))
  }

  let results = profiles
    .filter((profile) => profile.name !== 'Bookmarks HTML File')
    .map((profile) => {
      const browserType = getBrowserName(profile.name)
      // Introducing a new property here
      return { ...profile, browserType }
    })

  return results
}

export function useInitializeImportData () {
  const [browserProfiles, setProfiles] = React.useState<BrowserProfile[] | undefined>(undefined)

  React.useEffect(() => {
    const fetchAllBrowserProfiles = async () => {
      const res = await ImportDataBrowserProxyImpl.getInstance().initializeImportDialog()
      const validProfiles = getValidBrowserProfiles(res)
      setProfiles(validProfiles)
    }

    fetchAllBrowserProfiles()
  }, [])

  return {
    browserProfiles
  }
}

export function useProfileCount () {
  const profileCountRef = React.useRef(0)

  const incrementCount = () => {
    profileCountRef.current++
  }

  const decrementCount = () => {
    profileCountRef.current--
  }

  return {
    profileCountRef,
    incrementCount,
    decrementCount
  }
}

export const shouldPlayAnimations = loadTimeData.getBoolean('hardwareAccelerationEnabledAtStartup') &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

// This hook is a kind of finite state machine that helps transition between view types.
// It's intended to put transition logic in one place, so that we can easily understand
// what's going on and add or remove a state from the graph.
// Returns three transition functions: forward(), back() and skip().
interface ViewTypeState {
  forward: ViewType;
  back?: ViewType;
  skip?: ViewType;
  fail?: ViewType;
}

export function useViewTypeTransition(currentViewType: ViewType | undefined): ViewTypeState {
  const { browserProfiles, currentSelectedBrowserProfiles } = React.useContext(DataContext);

  const states = React.useMemo(() => {
    return {
      [ViewType.Initial]: {  // The initial state view
        forward: ViewType.DefaultBrowser,
        back: undefined, // No backward navigation from the initial state
      },
      [ViewType.DefaultBrowser]: {  // The initial state view
        forward: !browserProfiles || browserProfiles.length === 0 ?
          ViewType.ImportSelectTheme : ViewType.ImportSelectBrowser,
        back: ViewType.Initial, // Allow going back to the initial state
      },
      [ViewType.ImportSelectTheme]: {
        forward: ViewType.HelpWDP,
        back: ViewType.DefaultBrowser, // Allow going back to the default browser view
      },
      [ViewType.ImportSelectBrowser]: {
        forward: currentSelectedBrowserProfiles && currentSelectedBrowserProfiles.length > 1 ?
          ViewType.ImportSelectProfile : ViewType.ImportInProgress,
        skip: ViewType.HelpWDP,
        back: ViewType.DefaultBrowser, // Allow going back to the default browser view
      },
      [ViewType.ImportSelectProfile]: {
        forward: ViewType.ImportInProgress,
        back: ViewType.ImportSelectBrowser, // Allow going back to the browser selection view
      },
      [ViewType.ImportInProgress]: {
        forward: ViewType.ImportSucceeded,
        fail: ViewType.ImportFailed,
        back: ViewType.ImportSelectProfile, // Allow going back to the profile selection view
      },
      [ViewType.ImportSucceeded]: {
        forward: ViewType.HelpWDP,
        back: ViewType.ImportInProgress, // Allow going back to the import progress view
      },
      [ViewType.ImportFailed]: {
        forward: ViewType.HelpWDP,
        back: ViewType.ImportInProgress, // Allow going back to the import progress view
      },
      [ViewType.HelpWDP]: {
        forward: ViewType.HelpImprove,
        back: ViewType.ImportSelectBrowser, // Allow going back to the import succeeded view
      },
      // [ViewType.HelpWDP]: {
      //   forward: ViewType.ImportFavouriteApp, // Transition to the FavouriteApp view
      //   back: ViewType.ImportSelectBrowser, // Allow going back to the import succeeded view
      // },
      [ViewType.ImportFavouriteApp]: {
        // forward: ViewType.ImportEnableShields,
        // skip: ViewType.ImportEnableShields, // Transition to the HelpImprove view
        back: ViewType.ImportSelectBrowser, // Allow going back to the HelpWDP view
      },
      // [ViewType.ImportEnableShields]: {
      //   // forward: ViewType.HelpImprove, // Transition to the HelpImprove view
      //   back: ViewType.ImportFavouriteApp, // Allow going back to the FavouriteApp view
      // },
      // [ViewType.HelpImprove]: {
      //   // forward: ViewType.HelpImprove, // The end state view
      //   back: ViewType.ImportEnableShields, // Allow going back to the FavouriteApp view
      // },      
      [ViewType.HelpImprove]: {
        forward: ViewType.HelpImprove, // The end state view
        back: ViewType.HelpWDP, // Allow going back to the HelpWDP view
      },
    };
  }, [browserProfiles, currentSelectedBrowserProfiles]);

  return states[currentViewType ?? ViewType.Initial];
}