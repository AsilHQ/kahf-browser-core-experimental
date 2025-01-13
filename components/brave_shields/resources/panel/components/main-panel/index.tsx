// Copyright (c) 2021 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at https://mozilla.org/MPL/2.0/.
import * as React from 'react'

import * as S from './style'
import Toggle from '../../../../../web-components/toggle'
import AdvancedControlsContent from '../advanced-controls-content'
import AdvancedControlsContentScroller from '../advanced-controls-scroller'
import { getLocale, splitStringForTag } from '../../../../../common/locale'
import DataContext from '../../state/context'
import getPanelBrowserAPI from '../../api/panel_browser_api'
import Button from '$web-components/button'
import { useIsExpanded } from '../../state/hooks'

function MainPanel () {
  const { isExpanded, toggleIsExpanded } = useIsExpanded()
  const { siteBlockInfo, getSiteSettings } = React.useContext(DataContext)

  const braveShieldsStatusText = splitStringForTag(siteBlockInfo?.isBraveShieldsEnabled ? getLocale('braveShieldsUp') : getLocale('braveShieldsDown'))
  const braveShieldsBrokenText = splitStringForTag(getLocale('braveShieldsBroken'))
  const braveShieldsNote = splitStringForTag(siteBlockInfo?.isBraveShieldsEnabled
    ? getLocale('braveShieldsBlockedNote')
    : getLocale('braveShieldsNOTBlockedNote'))

  const handleToggleChange = async (isOn: boolean) => {
    await getPanelBrowserAPI().dataHandler.setBraveShieldsEnabled(isOn)
    if (isOn) {
      if (getSiteSettings) getSiteSettings()
    }
  }

  const handleReportSite = async () => {
    await getPanelBrowserAPI().dataHandler.openWebCompatWindow()
  }

  const handleLearnMoreClick = () => {
    chrome.tabs.create({ url: 'https://kahfbrowser.com/', active: true })
  }

  const onSettingsClick = () => {
    chrome.tabs.create({ url: 'chrome://settings/shields', active: true })
  }

  let reportSiteOrFootnoteElement = (
    <S.Footnote>
      {braveShieldsBrokenText.beforeTag}
      <span>{braveShieldsBrokenText.duringTag}</span>
      {braveShieldsBrokenText.afterTag}
    </S.Footnote>
  )
  let managedFootnoteElement = (
    <S.Footnote>
      <S.ControlBox>
        <S.ManagedIcon />
        <S.ManagedText>{getLocale('braveShieldsManaged')}</S.ManagedText>
      </S.ControlBox>
    </S.Footnote>
  )
  let advancedControlButtonElement = (isExpanded != null) && (
    <S.AdvancedControlsButton
      type="button"
      aria-expanded={isExpanded}
      aria-controls='advanced-controls-content'
      onClick={toggleIsExpanded}
    >
      <i>
        <svg width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M15.334 8.969H6a.667.667 0 1 1 0-1.334h9.334a.667.667 0 0 1 0 1.334Zm.005-5.377H5.962c-.368 0-.629-.255-.629-.623s.299-.667.667-.667h9.334c.367 0 .666.299.666.667 0 .368-.292.623-.66.623ZM2 15.635c-1.102 0-2-.897-2-2s.898-2 2-2c1.103 0 2 .897 2 2s-.897 2-2 2Zm0-2.666a.667.667 0 1 0 .001 1.334.667.667 0 0 0 0-1.334Zm0-2.667c-1.102 0-2-.897-2-2s.898-2 2-2c1.103 0 2 .897 2 2s-.897 2-2 2Zm0-2.667a.667.667 0 1 0 .002 1.335A.667.667 0 0 0 2 7.635Zm.398-3.604a.669.669 0 0 1-.96.12L.244 3.17a.666.666 0 1 1 .846-1.03l.65.533L2.798 1.24a.668.668 0 0 1 1.073.791l-1.472 2ZM6 12.969h9.334a.667.667 0 0 1 0 1.333H6a.667.667 0 1 1 0-1.333Z"/></svg>
      </i>
      <span>{getLocale('braveShieldsAdvancedCtrls')}</span>
      <S.CaratIcon isExpanded={isExpanded} />
    </S.AdvancedControlsButton>
  )

  let totalCountElement = (
    <S.BlockCount title={siteBlockInfo?.totalBlockedResources.toString()}>
      {(siteBlockInfo?.totalBlockedResources ?? 0) > 99 ? '99+' : siteBlockInfo?.totalBlockedResources}
    </S.BlockCount>
  )

  if (!siteBlockInfo?.isBraveShieldsEnabled) {
    totalCountElement = (<S.BlockCount>{'\u2014'}</S.BlockCount>)

    advancedControlButtonElement = (
      <S.GlobalDefaultsButton
        type="button"
        onClick={onSettingsClick}
      >
        <i className="icon-globe">
          <svg width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M14.03 11.126a3.191 3.191 0 0 1 3.188 3.186A3.191 3.191 0 0 1 14.03 17.5a3.191 3.191 0 0 1-3.187-3.188 3.191 3.191 0 0 1 3.187-3.186Zm0 1.417c-.227 0-.443.046-.643.125l2.289 2.288c.078-.2.125-.416.125-.644 0-.976-.795-1.77-1.77-1.77Zm0 3.54c.228 0 .444-.046.644-.125l-2.29-2.29c-.078.2-.125.417-.125.644 0 .977.795 1.772 1.771 1.772Z"/><path d="M8.718.5C4.043.5.218 4.325.218 9s3.825 8.5 8.5 8.5h.354a.71.71 0 0 0 .708-.708c0-.355-.354-.638-.708-.638-.708-.92-1.558-2.267-2.054-3.966H8.93c.425 0 .709-.284.709-.709s-.284-.708-.709-.708H6.734c0-.142-.07-.284-.07-.425-.142-1.133-.071-2.054.07-2.975h3.896c.071.637.142 1.346.142 2.054 0 .425.283.708.708.708a.71.71 0 0 0 .709-.708c0-.708 0-1.417-.142-2.125h3.542c.141.496.212 1.063.212 1.63 0 .283 0 .566-.07.85-.072.353.212.708.637.778.354.071.708-.212.779-.637.07-.213.07-.567.07-.921 0-4.675-3.824-8.5-8.5-8.5ZM7.23 2.058c-.566.992-1.275 2.267-1.629 3.896H2.343c.92-1.983 2.762-3.4 4.887-3.896Zm0 13.884c-2.125-.496-3.896-1.913-4.816-3.825H5.6a11.962 11.962 0 0 0 1.63 3.825Zm-1.983-5.525c0 .07 0 .212.07.283h-3.47c-.142-.496-.213-1.133-.213-1.7s.071-1.133.213-1.63h3.471c-.142.922-.213 1.984-.071 3.047Zm3.33-4.463H7.088a12.229 12.229 0 0 1 1.629-3.47c.566.85 1.204 1.983 1.629 3.47h-1.77Zm6.516 0h-3.33c-.424-1.629-1.062-2.975-1.7-3.896 2.196.425 4.109 1.913 5.03 3.896Z"/></svg>
        </i>
        <span>{getLocale('braveShieldsChangeDefaults')}</span>
      </S.GlobalDefaultsButton>
    )

    reportSiteOrFootnoteElement = (
      <S.ReportSiteBox>
        <S.ReportSiteAction>
          <span>{getLocale('braveShieldsReportSiteDesc')}</span>
          <Button
            isPrimary
            onClick={handleReportSite}
          >
            {getLocale('braveShieldsReportSite')}
          </Button>
        </S.ReportSiteAction>
      </S.ReportSiteBox>
    )
  }

  return (
    <S.Box>
      <S.HeaderBox>
      <S.SiteTitleBox>
        <S.FavIconBox>
          <img key={siteBlockInfo?.faviconUrl.url} src={siteBlockInfo?.faviconUrl.url} />
        </S.FavIconBox>
        <S.SiteTitle>{siteBlockInfo?.host}</S.SiteTitle>
      </S.SiteTitleBox>
      <S.CountBox>
        <S.BlockNote>
          {braveShieldsNote.beforeTag}
          <a href="#" onClick={handleLearnMoreClick}>{braveShieldsNote.duringTag}</a>
          {braveShieldsNote.afterTag}
        </S.BlockNote>
        {totalCountElement}
      </S.CountBox>
      </S.HeaderBox>
      <S.StatusBox>
        <S.ControlBox>
          <S.ShieldsIcon isActive={siteBlockInfo?.isBraveShieldsEnabled ?? false}>
          <svg
    width={30}
    height={35}
    viewBox="0 0 118 135"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M107.061 16.1756C94.6152 15.1067 74.0346 11.7958 58.9792 1.62C43.9307 11.7958 23.3571 15.0998 10.9115 16.1756C4.73388 16.7101 0 21.8813 0 28.0798V59.1068C0 59.1068 0.312353 71.8925 8.82918 87.9682C9.794 89.7868 12.5635 88.9886 12.4316 86.934C12.0568 82.4361 12.0915 77.4524 13.0633 72.9198C18.3664 50.5136 45.1454 44.4679 59.3262 59.9814C67.4058 52.6654 80.0318 50.6525 89.5273 56.4761C92.1164 57.9962 94.3722 59.9745 96.1978 62.2581C97.4472 63.8268 97.0515 66.1452 95.3787 67.2558C86.9799 56.1846 68.7593 57.7116 63.6784 70.8929C61.9222 74.6967 56.1125 74.6481 54.3633 70.9068C46.3254 55.9486 25.3839 60.2799 22.9406 76.8762C20.9346 97.4291 30.5342 116.823 47.672 127.186C51.1842 129.254 54.8561 131.274 59.0625 133.128C116.848 106.008 117.965 59.0999 117.965 59.0999V28.0728C117.965 21.8813 113.238 16.6962 107.068 16.1687L107.061 16.1756Z"
      fill="url(#paint0_linear_1341_1057)"
    />
    <path
      style={{
        mixBlendMode: "overlay",
      }}
      opacity={0.3}
      d="M59.3193 9.35243C59.3193 6.79807 59.0764 4.29231 58.6252 1.85596C43.6045 11.8374 23.2668 15.1136 10.9115 16.1756C4.73388 16.7101 0 21.8813 0 28.0797V53.186C3.33176 53.8454 6.79541 54.1994 10.3424 54.1994C37.3921 54.1994 59.3193 34.1185 59.3193 9.34549V9.35243Z"
      fill="url(#paint1_linear_1341_1057)"
    />
    <path
      style={{
        mixBlendMode: "multiply",
      }}
      d="M107.047 16.1756C94.6012 15.0998 74.0345 11.7958 58.9791 1.62V59.6482C59.0902 59.7662 59.2082 59.8773 59.3192 59.9953C67.3988 52.6793 80.0248 50.6663 89.5203 56.49C92.1094 58.0101 94.3652 59.9883 96.1908 62.272C97.4402 63.8407 97.0445 66.1591 95.3717 67.2696C86.9729 56.1985 68.7523 57.7255 63.6714 70.9068C62.7898 72.8226 60.881 73.7596 58.9791 73.7388V133.1C58.9791 133.1 59.0277 133.121 59.0555 133.134C116.841 106.015 117.958 59.1068 117.958 59.1068V28.0798C117.958 21.8743 113.224 16.7032 107.047 16.1687V16.1756Z"
      fill="url(#paint2_linear_1341_1057)"
    />
    <g
      style={{
        mixBlendMode: "screen",
      }}
      opacity={0.1}
    >
      <path
        d="M10.9115 25.6364C23.3571 24.5606 43.9238 21.2566 58.9792 11.0808C74.0346 21.2566 94.6013 24.5606 107.047 25.6364C113.224 26.1709 117.958 31.3421 117.958 37.5406V28.0797C117.958 21.8743 113.224 16.7032 107.047 16.1687C94.6013 15.0997 74.0276 11.7888 58.9792 1.61304C43.9307 11.7957 23.364 15.0997 10.9115 16.1756C4.73388 16.7101 0 21.8813 0 28.0797V37.5406C0 31.3352 4.73388 26.164 10.9115 25.6295V25.6364Z"
        fill="white"
      />
    </g>
    <path
      d="M73.9998 35.8886C78.345 36.7284 81.4269 39.8173 82.2668 44.1555C82.3154 44.4193 82.6763 44.4193 82.7318 44.1555C83.5717 39.8103 86.6605 36.7284 90.9988 35.8886C91.2625 35.84 91.2625 35.479 90.9988 35.4235C86.6536 34.5836 83.5717 31.4948 82.7318 27.1566C82.6832 26.8928 82.3223 26.8928 82.2668 27.1566C81.4269 31.5017 78.3381 34.5836 73.9998 35.4235C73.7361 35.4721 73.7361 35.833 73.9998 35.8886Z"
      fill="white"
    />
    <g
      style={{
        mixBlendMode: "multiply",
      }}
      opacity={0.1}
    >
      <path
        d="M12.3831 86.1704C0.402588 67.3529 0 51.2077 0 51.2077V28.0797V59.1068C0 59.1068 0.312353 71.8924 8.82918 87.9751C9.794 89.7937 12.5635 88.9955 12.4316 86.9409C12.4108 86.6841 12.4039 86.4203 12.39 86.1635L12.3831 86.1704Z"
        fill="black"
      />
      <path
        d="M117.958 28.0797V51.2077C117.958 51.2077 116.834 98.1578 58.9792 125.27C45.6383 119.016 35.3445 111.707 27.3552 104.169C31.5963 113.609 38.5444 121.688 47.6651 127.2C51.1773 129.268 54.8492 131.288 59.0556 133.141C116.841 106.022 117.958 59.1137 117.958 59.1137V28.0867V28.0797Z"
        fill="black"
      />
    </g>
    <path
      d="M79.5528 56.5247C88.9581 56.8093 94.2126 62.39 96.5795 65.8467C97.114 64.7084 97.0307 63.3271 96.1908 62.272C94.3653 59.9884 92.1094 58.0101 89.5203 56.49C80.0248 50.6664 67.3918 52.6724 59.3193 59.9953C45.1384 44.4818 18.3663 50.5275 13.0563 72.9337C12.0915 77.4662 12.0499 82.45 12.4247 86.9479C12.6121 89.9257 13.0216 92.8548 13.6186 95.7285C13.6741 95.9784 13.7713 96.2144 13.917 96.4226C16.1937 99.7613 18.8591 103.162 21.941 106.564C18.5051 97.1653 12.5566 75.5297 24.8286 62.8828C36.3301 51.0342 51.212 58.0726 57.2924 65.3053C58.1948 66.3742 59.826 66.402 60.7283 65.3331C63.5673 61.9666 69.856 56.2401 79.5458 56.5317L79.5528 56.5247Z"
      fill="url(#paint3_linear_1341_1057)"
    />
    <path
      style={{
        mixBlendMode: "overlay",
      }}
      opacity={0.3}
      d="M39.6827 10.6573C29.1391 14.0307 18.5121 15.5231 10.9185 16.1756C4.73388 16.71 0 21.8812 0 28.0797V50.0207C21.8092 50.0207 39.5092 32.4249 39.6827 10.6504V10.6573Z"
      fill="url(#paint4_linear_1341_1057)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1341_1057"
        x1={7.552}
        y1={0.960581}
        x2={104.562}
        y2={97.9705}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E753FF" />
        <stop offset={1} stopColor="#3154F1" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_1341_1057"
        x1={0}
        y1={28.0242}
        x2={59.3193}
        y2={28.0242}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DBDBDB" />
        <stop offset={1} stopColor="white" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint2_linear_1341_1057"
        x1={9.63431}
        y1={108.375}
        x2={78.5463}
        y2={54.1716}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopOpacity={0.3} />
        <stop offset={1} stopColor="#3161F1" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint3_linear_1341_1057"
        x1={86.4731}
        y1={38.4013}
        x2={-10.3216}
        y2={122.029}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DBDBDB" />
        <stop offset={1} stopColor="white" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="paint4_linear_1341_1057"
        x1={0}
        y1={30.3356}
        x2={39.6827}
        y2={30.3356}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DBDBDB" />
        <stop offset={1} stopColor="white" stopOpacity={0} />
      </linearGradient>
    </defs>
  </svg>
          </S.ShieldsIcon>
          <S.StatusText>
            <span>{braveShieldsStatusText.beforeTag}</span>
            {braveShieldsStatusText.duringTag}
            {braveShieldsStatusText.afterTag}
            {' '}
            {siteBlockInfo?.host}
          </S.StatusText>
          <S.StatusToggle>
            <Toggle
              brand="shields"
              isOn={siteBlockInfo?.isBraveShieldsEnabled}
              onChange={handleToggleChange}
              accessibleLabel={getLocale('braveShieldsEnable')}
              disabled={siteBlockInfo?.isBraveShieldsManaged}
            />
          </S.StatusToggle>
        </S.ControlBox>
        {!siteBlockInfo?.isBraveShieldsManaged &&
        <S.StatusFootnoteBox>
          {reportSiteOrFootnoteElement}
        </S.StatusFootnoteBox>
        }
        {siteBlockInfo?.isBraveShieldsManaged &&
        <S.StatusFootnoteBox>
          {managedFootnoteElement}
        </S.StatusFootnoteBox>
        }
      </S.StatusBox>
      {advancedControlButtonElement}
      { isExpanded &&
        siteBlockInfo?.isBraveShieldsEnabled &&
        <AdvancedControlsContentScroller
          isExpanded={isExpanded}
        >
          <AdvancedControlsContent />
        </AdvancedControlsContentScroller>
      }
    </S.Box>
  )
}

export default MainPanel
