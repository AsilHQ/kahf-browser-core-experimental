// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at https://mozilla.org/MPL/2.0/.

import * as React from 'react'

const SvgComponent = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Gmail"
    role="img"
    viewBox="0 0 512 512"
    {...props}
  >
    <rect width="512" height="512" rx="15%" fill="#ffffff"/>
    <path d="M158 391v-142l-82-63V361q0 30 30 30" fill="#4285f4"/>
    <path d="M154 248l102 77 102-77v-98l-102 77-102-77" fill="#ea4335"/>
    <path d="M354 391v-142l82-63V361q0 30-30 30" fill="#34a853"/>
    <path d="M76 188l82 63v-98l-30-23c-27-21-52 0-52 26" fill="#c5221f"/>
    <path d="M436 188l-82 63v-98l30-23c27-21 52 0 52 26" fill="#fbbc04"/>
  </svg>
)

export default SvgComponent
