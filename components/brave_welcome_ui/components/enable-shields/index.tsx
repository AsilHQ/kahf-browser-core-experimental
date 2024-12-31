// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at https://mozilla.org/MPL/2.0/.

import * as React from 'react'

import * as S from './style'
import Button from '../button/index'
import classnames from '$web-common/classnames'
import DataContext from '../../state/context'
// import { ViewType } from '../../state/component_types'
// import { useViewTypeTransition } from '../../state/hooks'
import { WelcomeBrowserProxyImpl } from '../../api/welcome_browser_proxy'
import { getLocale } from '$web-common/locale'

interface BrowserItemButtonProps {
  browserName: string
  onChange?: (browserName: string) => void
  isActive: boolean
}


function BrowserItemButton (props: BrowserItemButtonProps) {
  const handleClick = () => {
    props.onChange?.(props.browserName)
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
      <p className="browser-name">{props.browserName}</p>
    </button>
  )
}

function EnableShields () {
  const {
    // currentSelectedBrowserProfiles,
    // viewType,
    currentSelectedBrowser,
    setCurrentSelectedBrowser,
    // setViewType,
    // incrementCount,
    // scenes
  } = React.useContext(DataContext)
  const browserTypes = ["Yes, Block Away!","No, I was looking for new sucks"]
  const handleSelectionChange = (browserName: string) => {
    setCurrentSelectedBrowser?.(browserName)
  }

  const handleImport = () => {
    window.open('chrome://newtab', '_self')
      }

  React.useEffect(() => {
    WelcomeBrowserProxyImpl.getInstance().getDefaultBrowser().then(
      (name: string) => {
      setCurrentSelectedBrowser?.(name)
    })
  }, [])

  return (
    <S.MainBox>
      <div className="view-header-box">
        <div className="view-details">
          <h1 className="view-title">{getLocale('braveWelcomeEnableRewardsTitle')}</h1>
          <p className="view-desc">{getLocale('braveWelcomeEnableRewardsDesc')}</p>
        </div>
      </div>
      <div className="right-box">
      <S.BrowserListBox>
        <div className="browser-list" style={{"display":"none"}}>
          {browserTypes.map((entry, id) => {
            return (
              <BrowserItemButton
                key={id}
                browserName={entry ?? 'Chromium-based browser'}
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
            onClick={handleImport}
            scale="large"
          >
            Finish
          </Button>
      </S.ActionBox>
      </div>
    </S.MainBox>
  )
}

export default EnableShields
