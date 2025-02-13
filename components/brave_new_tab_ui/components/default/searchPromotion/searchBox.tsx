// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// You can obtain one at https://mozilla.org/MPL/2.0/.
import * as React from 'react'
import styled from 'styled-components'
import { getLocale } from '$web-common/locale'

const Box = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`

const Form = styled.form`
  --bg-color: rgba(255, 255, 255, 0.7);
  --box-shadow: 0px 2px 70px rgba(0, 0, 0, 0.3);

  display: grid;
  grid-template-columns: 1fr 50px;
  align-items: center;
  width: 100%;
  height: 56px;
  font-family: ${p => p.theme.fontFamily.heading};
  color: #6B7084;
  font-size: 16px;
  font-weight: 400;
  background: var(--bg-color);
  backdrop-filter: blur(55px);
  border-radius: 16px;
  transition: box-shadow 0.3s ease-in-out;
  overflow: hidden;

  &:focus-within,
  &:hover {
    box-shadow: var(--box-shadow);
  }

  input[type="text"] {
    width: 100%;
    height: 36px;
    border: 0;
    background-color: transparent;
    padding: 5px 16px;

    &:focus {
      outline: 0;
    }
  }
`

const IconButton = styled.button`
  background: transparent;
  padding: 0;
  margin: 0;
  border: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;

  &:hover {
    background: linear-gradient(304.74deg, #6F4CD2 15.81%, #BF14A2 63.17%, #F73A1C 100%);

    path {
      fill: white;
    }
  }
`

function BraveSearchLogo () {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none">
    <g clipPath="url(#a)">
      <path
        fill="url(#b)"
        d="M154.24 20.97C136.31 19.43 106.66 14.66 84.97 0 63.29 14.66 33.65 19.42 15.72 20.97 6.82 21.74 0 29.19 0 38.12v44.7s.45 18.42 12.72 41.58c1.39 2.62 5.38 1.47 5.19-1.49-.54-6.48-.49-13.66.91-20.19 7.64-32.28 46.22-40.99 66.65-18.64 11.64-10.54 29.83-13.44 43.51-5.05 3.73 2.19 6.98 5.04 9.61 8.33 1.8 2.26 1.23 5.6-1.18 7.2-12.1-15.95-38.35-13.75-45.67 5.24-2.53 5.48-10.9 5.41-13.42.02-11.58-21.55-41.75-15.31-45.27 8.6-2.89 29.61 10.94 57.55 35.63 72.48 5.06 2.98 10.35 5.89 16.41 8.56 83.25-39.07 84.86-106.65 84.86-106.65v-44.7c0-8.92-6.81-16.39-15.7-17.15l-.01.01Z"
      />
      <path
        fill="url(#c)"
        d="M85.46 11.14c0-3.68-.35-7.29-1-10.8-21.64 14.38-50.94 19.1-68.74 20.63C6.82 21.74 0 29.19 0 38.12v36.17c4.8.95 9.79 1.46 14.9 1.46 38.97 0 70.56-28.93 70.56-64.62v.01Z"
        opacity={0.3}
        style={{
          mixBlendMode: "overlay",
        }}
      />
      <path
        fill="url(#d)"
        d="M154.22 20.97C136.29 19.42 106.66 14.66 84.97 0v83.6c.16.17.33.33.49.5 11.64-10.54 29.83-13.44 43.51-5.05 3.73 2.19 6.98 5.04 9.61 8.33 1.8 2.26 1.23 5.6-1.18 7.2-12.1-15.95-38.35-13.75-45.67 5.24-1.27 2.76-4.02 4.11-6.76 4.08v85.52s.07.03.11.05c83.25-39.07 84.86-106.65 84.86-106.65v-44.7c0-8.94-6.82-16.39-15.72-17.16v.01Z"
        style={{
          mixBlendMode: "multiply",
        }}
      />
      <path
        fill="#fff"
        d="M15.72 34.6c17.93-1.55 47.56-6.31 69.25-20.97 21.69 14.66 51.32 19.42 69.25 20.97 8.9.77 15.72 8.22 15.72 17.15V38.12c0-8.94-6.82-16.39-15.72-17.16-17.93-1.54-47.57-6.31-69.25-20.97-21.68 14.67-51.31 19.43-69.25 20.98C6.82 21.74 0 29.19 0 38.12v13.63c0-8.94 6.82-16.39 15.72-17.16v.01Z"
        opacity={0.1}
        style={{
          mixBlendMode: "screen",
        }}
      />
      <path
        fill="#fff"
        d="M106.61 49.37c6.26 1.21 10.7 5.66 11.91 11.91.07.38.59.38.67 0 1.21-6.26 5.66-10.7 11.91-11.91.38-.07.38-.59 0-.67-6.26-1.21-10.7-5.66-11.91-11.91-.07-.38-.59-.38-.67 0-1.21 6.26-5.66 10.7-11.91 11.91-.38.07-.38.59 0 .67Z"
      />
      <path
        fill="#000"
        d="M17.84 121.81C.58 94.7 0 71.44 0 71.44V38.12v44.7s.45 18.42 12.72 41.59c1.39 2.62 5.38 1.47 5.19-1.49-.03-.37-.04-.75-.06-1.12l-.01.01Zm152.1-83.69v33.32s-1.62 67.64-84.97 106.7c-19.22-9.01-34.05-19.54-45.56-30.4 6.11 13.6 16.12 25.24 29.26 33.18 5.06 2.98 10.35 5.89 16.41 8.56 83.25-39.07 84.86-106.65 84.86-106.65V38.12Z"
        opacity={0.1}
        style={{
          mixBlendMode: "multiply",
        }}
      />
      <path
        fill="url(#e)"
        d="M114.61 79.1c13.55.41 21.12 8.45 24.53 13.43.77-1.64.65-3.63-.56-5.15a35.035 35.035 0 0 0-9.61-8.33c-13.68-8.39-31.88-5.5-43.51 5.05-20.43-22.35-59-13.64-66.65 18.64-1.39 6.53-1.45 13.71-.91 20.19.27 4.29.86 8.51 1.72 12.65.08.36.22.7.43 1 3.28 4.81 7.12 9.71 11.56 14.61-4.95-13.54-13.52-44.71 4.16-62.93 16.57-17.07 38.01-6.93 46.77 3.49 1.3 1.54 3.65 1.58 4.95.04 4.09-4.85 13.15-13.1 27.11-12.68l.01-.01Z"
      />
      <path
        fill="url(#f)"
        d="M57.17 13.02c-15.19 4.86-30.5 7.01-41.44 7.95C6.82 21.74 0 29.19 0 38.12v31.61c31.42 0 56.92-25.35 57.17-56.72v.01Z"
        opacity={0.3}
        style={{
          mixBlendMode: "overlay",
        }}
      />
    </g>
    <defs>
      <linearGradient
        id="b"
        x1={10.88}
        x2={150.64}
        y1={-0.95}
        y2={138.81}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E753FF" />
        <stop offset={1} stopColor="#3154F1" />
      </linearGradient>
      <linearGradient
        id="c"
        x1={0}
        x2={85.46}
        y1={38.04}
        y2={38.04}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DBDBDB" />
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="d"
        x1={13.88}
        x2={113.16}
        y1={153.8}
        y2={75.71}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopOpacity={0.3} />
        <stop offset={1} stopColor="#3161F1" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="e"
        x1={124.58}
        x2={-14.87}
        y1={52.99}
        y2={173.47}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DBDBDB" />
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="f"
        x1={0}
        x2={57.17}
        y1={41.37}
        y2={41.37}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#DBDBDB" />
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </linearGradient>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h170v189H0z" />
      </clipPath>
    </defs>
  </svg>
  )
}

interface Props {
  onSubmit: (value: string, openNewTab: boolean) => unknown
}

function Search (props: Props) {
  const [value, setValue] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  const handleFormBoxClick = () => {
    inputRef.current && inputRef.current.focus()
  }

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    props.onSubmit(value, false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (value === '') return

    if ((e.metaKey || e.ctrlKey) && (e.key === 'Enter')) {
      props.onSubmit(value, true)
    }
  }

  return (
    <Box>
      <BraveSearchLogo />
      <Form onSubmit={handleSubmit} onClick={handleFormBoxClick} role="search" aria-label="Brave">
        <input ref={inputRef} onChange={onInputChange} onKeyDown={handleKeyDown} type="text" placeholder={getLocale('searchPromotionSearchBoxPlaceholderLabel')} value={value} autoCapitalize="off" autoComplete="off" autoCorrect="off" spellCheck="false" aria-label="Search" title="Search" aria-autocomplete="none" aria-haspopup="false" maxLength={2048} autoFocus />
        <IconButton data-test-id="submit_button" aria-label="Submit">
          <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M8 16a8 8 0 1 1 5.965-2.67l5.775 5.28a.8.8 0 1 1-1.08 1.18l-5.88-5.375A7.965 7.965 0 0 1 8 16Zm4.374-3.328a.802.802 0 0 0-.201.18 6.4 6.4 0 1 1 .202-.181Z" fill="url(#search_icon_gr)"/><defs><linearGradient id="search_icon_gr" x1="20" y1="20" x2="-2.294" y2="3.834" gradientUnits="userSpaceOnUse"><stop stopColor="#BF14A2"/><stop offset="1" stopColor="#F73A1C"/></linearGradient></defs></svg>
        </IconButton>
      </Form>
    </Box>
  )
}

export default Search
