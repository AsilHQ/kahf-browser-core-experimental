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
  onChange?: (appName: string) => void
  isActive: boolean
}

const browserIcons :any = {
  'Fb': <FbSVG />,
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
  const handleClick = () => {
    props.onChange?.(props.appName)
  }

  const buttonClass = classnames({
    'browser-item': true,
    'is-selected': props.isActive
  })

  return (
    <button onClick={handleClick}
      className={buttonClass}
    >
      <i className="check-icon-box">
        {props.isActive && (
          <svg viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.9558.9327c-.2259-.2134-.5083-.2667-.7907-.2667s-.5648.16-.7907.3733l-7.06 7.68-3.7276-3.4666c-.4518-.4267-1.186-.4267-1.5814 0-.226.2133-.3389.48-.3389.7466 0 .2667.113.5334.3389.7467l4.5748 4.2667c.1695.2133.4519.32.7907.32h.0565c.3389 0 .6213-.16.7907-.3734l7.8507-8.5333c.3953-.4267.3389-1.12-.113-1.4933Z" fill="#4C54D2"/>
          </svg>
        )}
      </i>
      <div className="browser-logo-box">
        {browserIcons[props.appName]}
      </div>
    </button>
  )
}

function FavouriteApp() {
  console.log("FavouriteApp called")
  const {
    currentSelectedBrowserProfiles,
    viewType,
    currentSelectedBrowser,
    setCurrentSelectedBrowser,
    setViewType,
    // incrementCount,
    scenes
  } = React.useContext(DataContext)
  // const browserTypes = getUniqueBrowserTypes(browserProfiles ?? [])
  const browserTypes = [
  'Fb',
  'Figma',
  'Gmail',
  'Calendar',
  'Insta',
  'Slack',
  'Spotify',
  'X',
  'Youtube']
  const handleSelectionChange = (appName: string) => {
    setCurrentSelectedBrowser?.(appName)
  }

  const { forward, skip } = useViewTypeTransition(viewType)
  const goForward = () => setViewType(forward)

  const handleImport = () => {
    WelcomeBrowserProxyImpl.getInstance().recordP3A(P3APhase.Finished)
    goForward()
  }
    

  const handleSkip = () => {
    scenes?.s2.play() // play the final animation on skip
    setViewType(skip!)
    WelcomeBrowserProxyImpl.getInstance().recordP3A(P3APhase.Consent)
  }

  React.useEffect(() => {
  }, [])

  const hasSelectedBrowser =
    currentSelectedBrowserProfiles && currentSelectedBrowserProfiles.length > 0

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
                appName={entry ?? 'Chromium-based browser'}
                onChange={handleSelectionChange}
                isActive={entry === currentSelectedBrowser}
              />
            )
          })}
        </div>
      </S.BrowserListBox>
        <S.ActionBox>
          <Button
            isPrimary={true}
            isDisabled={!hasSelectedBrowser}
            onClick={handleImport}
            scale="large"
          >
            {getLocale('braveWelcomeImportButtonLabel')}
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
