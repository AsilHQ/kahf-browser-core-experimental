// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at https://mozilla.org/MPL/2.0/.

import * as React from 'react'
import * as S from './style'

import classnames from '$web-common/classnames'
import { getLocale } from '$web-common/locale'
import Button from '../button/index'

import { WelcomeBrowserProxyImpl, P3APhase } from '../../api/welcome_browser_proxy'

import DataContext from '../../state/context'
import { shouldPlayAnimations, useViewTypeTransition } from '../../state/hooks'

import braveLogoUrl from '../../assets/Kahf-logo-unicolor.svg'

function KahfInitial () {
  const { viewType, setViewType, scenes } = React.useContext(DataContext)
  const { forward } = useViewTypeTransition(viewType)

  const ref = React.useRef<HTMLDivElement>(null)

  const goForward = () => setViewType(forward)

  const handleSkip = () => {
    WelcomeBrowserProxyImpl.getInstance().recordP3A(P3APhase.Import)
    goForward()
    scenes?.s1.play()
  }

  React.useEffect(() => {
   
    return () => {
  
    }
  }, [])

  return (
    <S.Box ref={shouldPlayAnimations ? ref : null}>
      {viewType}
      <div className="view-logo-box">
        <img src={braveLogoUrl} />
      </div>
      <div className={classnames({ 'view-content': true, 'initial': shouldPlayAnimations })}>
        <div className="view-header-box">
          <div className="view-details">
            <h1 className="view-title">{getLocale('braveWelcomeTitle')}</h1>
          </div>
        </div>
        <S.ActionBox>
          <Button
            isPrimary={true}
            onClick={handleSkip}
            scale="jumbo"
          >
            {'Lets Go'}
          </Button>
        </S.ActionBox>
      </div>
  
    </S.Box>
  )
}

export default KahfInitial
