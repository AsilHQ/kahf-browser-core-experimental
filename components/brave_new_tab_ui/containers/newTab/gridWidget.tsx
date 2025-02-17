// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// You can obtain one at https://mozilla.org/MPL/2.0/.

import * as React from 'react'
import { Widget, WidgetProps } from '../../components/default/widget'
import { useNewTabPref } from '../../hooks/usePref'

interface Props extends Omit<WidgetProps, 'hideWidget'> {
    pref: keyof NewTab.Preferences
    container: React.ComponentType<React.PropsWithChildren>
    children: React.ReactNode
}

export default function GridWidget ({ pref: showPref, container: Container, children, ...rest }: Props) {
    const [showing, setShowing] = useNewTabPref(showPref)
    const isStats = showPref === 'showStats'
    return showing ? <Container>
        <Widget hideWidget={() => setShowing(false)} isStats={isStats} {...rest}>
        {children}
        </Widget>
    </Container> : null
}
