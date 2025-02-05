// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at https://mozilla.org/MPL/2.0/.

import styled from 'styled-components'

export const MainBox = styled.div`
  border-radius: 30px;
  max-width: 800px;
  color: white;
  font-family: ${(p) => p.theme.fontFamily.heading};
  display: flex;
  align-items: center;
  justify-content: center;

  .view-header-box {
    display: grid;
    grid-template-columns: 0.2fr 1fr 0.2fr;
    margin-bottom: 50px;
    text-align: left;
    max-width: 463px;
    margin-left: -16px;
    margin-right: 73px;
  }

  .view-details {
    grid-column: 2;
  }

  .view-title {
    width:400px;
    font-weight: 700;
    font-size: 31px;
    margin: 0 0 18px 0;
    color:black;
  }

  .view-desc {
    font-weight: 500;
    font-size: 14px;
    margin: 0;
    color:black;
  }

  button {
    color: black;
  }

  .right-box{
  display: flex;
  flex-direction: column;
  margin:40px 20px 0 0;
}
`

export const BrowserListBox = styled.div`
  max-width:400px;
  min-width:400px;
  padding:0 70px;
  .browser-list {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-gap: 11px;
    flex-wrap: wrap;
  }

  .browser-item {
    --border-color: transparent;
    background: white;
    border-radius: 10px;
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #212529;
    border: 0;
    box-shadow: 0 0 0 4px var(--border-color);
    position: relative;

    &.is-selected {
      --border-color: #737ADE;
    }
  }

  .browser-name {
    font-weight: 600;
    font-size: 12px;
    margin: 0;
  }

  .browser-logo-box {
    width: 35px;
    height: 40px;
  }

  .check-icon-box {
    position: absolute;
    right: 7px;
    top: 7px;
  }

`

export const ActionBox = styled.div`
  display: flex;
  grid-gap: 10px;
  flex-direction: column;
  margin-top:22px;
  padding:0px 80px;

  button {
    color: white;
  }

  button:nth-child(2) {
    color:black;
    &[disabled] {
      background: rgba(255, 255, 255, 0.14);
      backdrop-filter: blur(8px);
      color: rgba(255, 255, 255, 0.32);
    }
  }
`
