// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at https://mozilla.org/MPL/2.0/.

import * as React from 'react'

import * as S from './style'
import Button from '../button/index'
import classnames from '$web-common/classnames'
import DataContext from '../../state/context'
import { useViewTypeTransition } from '../../state/hooks'
import { WelcomeBrowserProxyImpl, P3APhase } from '../../api/welcome_browser_proxy'
import { getLocale } from '$web-common/locale'
import { setFavouriteApps } from './util'
// import { addNewTopSite } from 'components/brave_welcome_ui/api/topSites'
import FbSVG from '../svg/app-icons/fb'
import FigmaSVG from '../svg/app-icons/figma'
import GmailSVG from '../svg/app-icons/gmail'
import CalendarSVG from '../svg/app-icons/calendar'
import InstaSVG from '../svg/app-icons/insta'
import SlackSVG from '../svg/app-icons/slack'
import SpotifySVG from '../svg/app-icons/spotify'
import XSVG from '../svg/app-icons/x'
import YoutubeSVG from '../svg/app-icons/youtube'

interface AppItemButtonProps {
  appName: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  id: number
  isChecked: boolean
}

const browserIcons :any = {
  'Facebook': <FbSVG />,
  'Figma': < FigmaSVG/>,
  'Gmail': <GmailSVG />,
  'Calendar': <CalendarSVG />,
  'Insta': <InstaSVG />,
  'Slack': <SlackSVG />,
  'Spotify': <SpotifySVG />,
  'X': <XSVG />,
  'Youtube': <YoutubeSVG />,
}

function AppItemButton (props: AppItemButtonProps) {
  const buttonClass = classnames({
    'browser-item': true,
    'is-selected': props.isChecked
  })

  return (
    <>
      <label htmlFor={`profile-${props.id}`} className="button-label">
        <button
          className={buttonClass}
        >
          <input
            type="checkbox"
            className='check-icon-box'
            id={`profile-${props.id}`}
            checked={props.isChecked}
            onChange={props.onChange}
          />
          <div className="browser-logo-box">
            {browserIcons[props.appName]}
          </div>
        </button>
      </label>
    </>
  )
}

function FavouriteApp() {
  console.log("FavouriteApp called")
  const {
    // currentSelectedBrowserProfiles,
    viewType,
    // currentSelectedBrowser,
    setViewType,
    // incrementCount,
    // scenes
  } = React.useContext(DataContext)
   const [selectedProfiles, setSelectedProfiles] = React.useState<Set<number>>(new Set())
  const browserTypes = [
  'Facebook',
  'Figma',
  'Gmail',
  'Calendar',
  'Insta',
  'Slack',
  'Spotify',
  'X',
  'Youtube']
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Handle Change is Being Called")
    const { id, checked } = e.target
    const parsedId = parseInt(id.split('-')[1])
    console.log("id,checked,parseId", id, checked, parsedId)
    console.log(selectedProfiles)
    if (!checked && selectedProfiles?.has(parsedId)) {
      selectedProfiles.delete(parsedId)
      setSelectedProfiles(new Set([...selectedProfiles]))
      return
    }

    setSelectedProfiles(new Set(selectedProfiles.add(parsedId)))
  }

  const { forward } = useViewTypeTransition(viewType)
  const goForward = () => setViewType(forward)    

  const handleSkip = () => {
    goForward()
  }

  React.useEffect(() => {
    console.log(typeof(handleSkip))
  }, [])

  // const hasSelectedBrowser =
    // currentSelectedBrowserProfiles && currentSelectedBrowserProfiles.length > 0
  const handleImportProfiles = () => {
    if (selectedProfiles.size <= 0) return
    let entries: string[] = []
    selectedProfiles.forEach((entry) => {
      entries.push(browserTypes[entry])
      // incrementCount()
    })

    if (entries.length === 1) {
      // ImportDataBrowserProxyImpl.getInstance().importData(entries[0], defaultImportTypes)
      console.log(entries)
    } else {
      // ImportDataBrowserProxyImpl.getInstance().importDataBulk(entries, defaultImportTypes)
      console.log(entries)
      setFavouriteApps(entries)
    }
    WelcomeBrowserProxyImpl.getInstance().recordP3A(P3APhase.Finished)
    goForward()
  }
  return (
    <S.MainBox>
      <div className="view-header-box">
        <div className="view-details">
          <h1 className="view-title">{getLocale('braveWelcomeFavouriteAppTitle')}</h1>
          <p className="view-desc">{getLocale('braveWelcomeFavouriteAppDesc')}</p>
        </div>
      </div>
      <div className="right-box">
      <S.BrowserListBox>
        <div className="browser-list">
          {browserTypes.map((entry, id) => {
            return (
              <AppItemButton
                key={id}
                id={id}
                appName={entry ?? 'Chromium-based browser'}
                onChange={handleChange}
                isChecked={selectedProfiles.has(id)}
              />
            )
          })}
        </div>
      </S.BrowserListBox>
        <S.ActionBox>
          <Button
            isPrimary={true}
            // isDisabled={!hasSelectedBrowser}
            onClick={handleImportProfiles}
            scale="large"
          >
            Next
            {/* {getLocale('braveWelcomeImportButtonLabel')} */}
          </Button>
        <Button
          isTertiary={true}
          onClick={handleSkip}
          scale="large"
          
        >
          {getLocale('braveWelcomeSkipButtonLabel')}
        </Button>

      </S.ActionBox>
      </div>
    </S.MainBox>
  )
}

export default FavouriteApp
