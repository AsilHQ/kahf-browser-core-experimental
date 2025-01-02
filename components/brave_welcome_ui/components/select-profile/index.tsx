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
import { getUniqueBrowserTypes } from '../../state/utils'
// import { useViewTypeTransition } from '../../state/hooks'
import { WelcomeBrowserProxyImpl, ImportDataBrowserProxyImpl, defaultImportTypes, P3APhase } from '../../api/welcome_browser_proxy'
import { getLocale } from '$web-common/locale'

import ChromeCanarySVG from '../svg/browser-icons/chrome-canary'
import ChromeSVG from '../svg/browser-icons/chrome'
import ChromeBetaSVG from '../svg/browser-icons/chrome-beta'
import ChromeDevSVG from '../svg/browser-icons/chrome-dev'
import ChromiumSVG from '../svg/browser-icons/chromium'
import EdgeSVG from '../svg/browser-icons/edge'
import FirefoxSVG from '../svg/browser-icons/firefox'
import OperaSVG from '../svg/browser-icons/opera'
import SafariSVG from '../svg/browser-icons/safari'
import VivaldiSVG from '../svg/browser-icons/vivaldi'
import WhaleSVG from '../svg/browser-icons/whale'
import YandexSVG from '../svg/browser-icons/yandex'
import MicrosoftIE from '../svg/browser-icons/ie'
// import AvatarIconSVG from '../svg/avatar-icon'

interface BrowserItemButtonProps {
  browserName: string
  onChange?: (browserName: string) => void
  isActive: boolean
}
interface ProfileItemProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  profileName: string
  id: number
  isChecked: boolean
}
const browserIcons:any = {
  'Google Chrome Canary': <ChromeCanarySVG />,
  'Google Chrome': <ChromeSVG />,
  'Google Chrome Dev': <ChromeDevSVG />,
  'Google Chrome Beta': <ChromeBetaSVG />,
  'Chromium': <ChromiumSVG />,
  'Microsoft Edge': <EdgeSVG />,
  'Firefox': <FirefoxSVG />,
  'Opera': <OperaSVG />,
  'Safari': <SafariSVG />,
  'Vivaldi': <VivaldiSVG />,
  'NAVER Whale': <WhaleSVG />,
  'Yandex': <YandexSVG />,
  'Internet Explorer': <MicrosoftIE />
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
      <div className="browser-logo-box">
        {browserIcons[props.browserName]}
      </div>
      <p className="browser-name">{props.browserName}</p>
    </button>
  )
}
function ProfileItem(props: ProfileItemProps) {
  return (
    <div className="item-box">
      <label className="item-grid" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="item-action" style={{ position: 'relative', cursor: 'pointer' }}>
          <input
            type="checkbox"
            id={`profile-${props.id}`}
            checked={props.isChecked}
            onChange={props.onChange}
            style={{ display: 'none' }} // Hide the default checkbox
          />
          <span
            style={{
              width: '17px',
              height: '17px',
              backgroundColor: props.isChecked ? 'blue' : 'rgb(255 255 255 / 99%)', // Change color when checked
              borderRadius: '50%', // Circular shape
              display: 'inline-block',
              transition: 'background-color 0.3s ease',
              position: 'relative',
            }}
          >
            {props.isChecked && (
              <span
                style={{
                  content: '""',
                  position: 'absolute',
                  top: '4px',
                  left: '8px',
                  width: '5px',
                  height: '10px',
                  border: 'solid white',
                  borderWidth: '0 2px 2px 0',
                  transform: 'rotate(45deg)',
                }}
              />
            )}
          </span>
        </div>
        <div className="item-info" style={{ marginLeft: '10px' }}>
          <span>{props.profileName}</span>
        </div>
      </label>
    </div>
  )
}

function SelectProfile () {
  const {
    browserProfiles,
    currentSelectedBrowserProfiles,
    // viewType,
    currentSelectedBrowser,
    setCurrentSelectedBrowser,
    // setViewType,
    incrementCount,
    // scenes
  } = React.useContext(DataContext)
  const browserTypes = getUniqueBrowserTypes(browserProfiles ?? [])
  const handleSelectionChange = (browserName: string) => {
    setCurrentSelectedBrowser?.(browserName)
  }
  const [selectedProfiles, setSelectedProfiles] = React.useState<Set<number>>(new Set())
//   const { forward, skip } = useViewTypeTransition(viewType)

//   const handleImport = () => {
//     if (!currentSelectedBrowser || !currentSelectedBrowserProfiles) return

//     if (forward === ViewType.ImportSelectProfile) {
//       setViewType(ViewType.ImportSelectProfile)
//       WelcomeBrowserProxyImpl.getInstance().recordP3A(P3APhase.Import)
//       return
//     }

//     if (forward === ViewType.ImportInProgress) {
//       ImportDataBrowserProxyImpl.getInstance().importData(
//         currentSelectedBrowserProfiles[0].index,
//         defaultImportTypes
//       )
//       incrementCount()
//       WelcomeBrowserProxyImpl.getInstance().recordP3A(P3APhase.Consent)
//       return
//     }

//     console.error(`Invalid forward view: ${forward}`)
//   }
  const handleImportProfiles = () => {
    if (selectedProfiles.size <= 0) return
    let entries: number[] = []
    selectedProfiles.forEach((entry) => {
      entries.push(entry)
      incrementCount()
    })

    if (entries.length === 1) {
      ImportDataBrowserProxyImpl.getInstance().importData(entries[0], defaultImportTypes)
    } else {
      ImportDataBrowserProxyImpl.getInstance().importDataBulk(entries, defaultImportTypes)
    }
    WelcomeBrowserProxyImpl.getInstance().recordP3A(P3APhase.Consent)
  }

  React.useEffect(() => {
    WelcomeBrowserProxyImpl.getInstance().getDefaultBrowser().then(
      (name: string) => {
      setCurrentSelectedBrowser?.(name)
    })
  }, [])

//   const hasSelectedBrowser =
//     currentSelectedBrowserProfiles && currentSelectedBrowserProfiles.length > 0
  const getImportEntryName = (entry: any) => {
    let name = entry.name
    if (entry.profileName) {
      name += ' - ' + entry.profileName
    }
    return name
    }
    
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target
    const parsedId = parseInt(id.split('-')[1])

    if (!checked && selectedProfiles?.has(parsedId)) {
      selectedProfiles.delete(parsedId)
      setSelectedProfiles(new Set([...selectedProfiles]))
      return
    }

    setSelectedProfiles(new Set(selectedProfiles.add(parsedId)))
  }
  return (
    <S.MainBox>
      <div className="view-header-box">
        <div className="view-details">
          <h1 className="view-title">{getLocale('braveWelcomeImportSettingsTitle')}</h1>
          <p className="view-desc">{getLocale('braveWelcomeImportSettingsDesc')}</p>
        </div>
      </div>
      <div className="right-box">
      <S.BrowserListBox>
        <div className="browser-list">
          {browserTypes.map((entry, id) => {
            return (<>
              <BrowserItemButton
                key={id}
                browserName={entry ?? 'Chromium-based browser'}
                onChange={handleSelectionChange}
                isActive={entry === currentSelectedBrowser}
                />
                {entry === currentSelectedBrowser && (
                    <S.ProfileListBox>
        <div className="profile-list">
          {currentSelectedBrowserProfiles?.map((entry) => {
            return (<ProfileItem
              key={entry.index}
              id={entry.index}
              profileName={getImportEntryName(entry)}
              onChange={handleChange}
              isChecked={selectedProfiles.has(entry.index)}
            />)
          })}
        </div>
                    </S.ProfileListBox>)}
                </>
            )
          })}
        </div>
      </S.BrowserListBox>
           <S.ActionBox>
        <Button
          isPrimary={true}
          onClick={handleImportProfiles}
          scale="jumbo"
        >
          {getLocale('braveWelcomeImportProfilesButtonLabel')}
        </Button>
      </S.ActionBox>
      </div>
    </S.MainBox>
  )
}

export default SelectProfile
