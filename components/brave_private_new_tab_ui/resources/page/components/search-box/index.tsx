// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at https://mozilla.org/MPL/2.0/.
import * as React from 'react'
import styled from 'styled-components'
import { getLocale } from '$web-common/locale'

const Box = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;
`

const Form = styled.form`
  --bg-color: rgba(255, 255, 255, 0.22);
  --box-shadow: 0px 2px 70px rgba(0, 0, 0, 0.3);

  display: grid;
  grid-template-columns: 1fr 50px;
  align-items: center;
  width: 100%;
  height: 52px;
  font-family: ${p => p.theme.fontFamily.heading};
  color: white;
  font-size: 14px;
  font-weight: 400;
  background: var(--bg-color);
  border-radius: 8px;
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

    &::placeholder {
      color: rgba(255,255,255,0.7);
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
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="244"
    height="80"
  >
    <defs>
      <clipPath id="h">
        <path d="M219 14h24.71v38H219Zm0 0" />
      </clipPath>
      <clipPath id="i">
        <path d="M0 0h83v79.781H0Zm0 0" />
      </clipPath>
      <clipPath id="k">
        <path d="M0 0h243.71v79.781H0Zm0 0" />
      </clipPath>
      <clipPath id="b">
        <path d="M0 0h244v80H0z" />
      </clipPath>
      <clipPath id="n">
        <path d="M41 0h42v79.781H41Zm0 0" />
      </clipPath>
      <clipPath id="p">
        <path d="M0 0h243.71v79.781H0Zm0 0" />
      </clipPath>
      <clipPath id="d">
        <path d="M0 0h244v80H0z" />
      </clipPath>
      <clipPath id="s">
        <path d="M0 0h243.71v79.781H0Zm0 0" />
      </clipPath>
      <clipPath id="e">
        <path d="M0 0h244v80H0z" />
      </clipPath>
      <clipPath id="w">
        <path d="M0 0h243.71v79.781H0Zm0 0" />
      </clipPath>
      <clipPath id="f">
        <path d="M0 0h244v80H0z" />
      </clipPath>
      <linearGradient
        id="j"
        x1={10.88}
        x2={150.64}
        y1={-0.95}
        y2={138.81}
        gradientTransform="scale(.488 .42105)"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset={0}
          style={{
            stopColor: "#e753ff",
            stopOpacity: 1,
          }}
        />
        <stop
          offset={1}
          style={{
            stopColor: "#3154f1",
            stopOpacity: 1,
          }}
        />
      </linearGradient>
      <linearGradient
        id="c"
        x1={0}
        x2={85.46}
        y1={38.04}
        y2={38.04}
        gradientTransform="scale(.488 .42105)"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset={0}
          style={{
            stopColor: "#dbdbdb",
            stopOpacity: 1,
          }}
        />
        <stop
          offset={1}
          style={{
            stopColor: "#fff",
            stopOpacity: 0,
          }}
        />
      </linearGradient>
      <linearGradient
        id="o"
        x1={13.88}
        x2={113.16}
        y1={153.8}
        y2={75.71}
        gradientTransform="scale(.488 .42105)"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset={0}
          style={{
            stopColor: "#000",
            stopOpacity: 0.301961,
          }}
        />
        <stop
          offset={1}
          style={{
            stopColor: "#3161f1",
            stopOpacity: 0,
          }}
        />
      </linearGradient>
      <linearGradient
        id="v"
        x1={124.58}
        x2={-14.87}
        y1={52.99}
        y2={173.47}
        gradientTransform="scale(.488 .42105)"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset={0}
          style={{
            stopColor: "#dbdbdb",
            stopOpacity: 1,
          }}
        />
        <stop
          offset={1}
          style={{
            stopColor: "#fff",
            stopOpacity: 0,
          }}
        />
      </linearGradient>
      <linearGradient
        id="g"
        x1={0}
        x2={57.17}
        y1={41.37}
        y2={41.37}
        gradientTransform="scale(.488 .42105)"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset={0}
          style={{
            stopColor: "#dbdbdb",
            stopOpacity: 1,
          }}
        />
        <stop
          offset={1}
          style={{
            stopColor: "#fff",
            stopOpacity: 0,
          }}
        />
      </linearGradient>
      <mask id="m">
        <g filter="url(#a)">
          <path
            d="M0 0h244v80H0z"
            style={{
              fill: "#000",
              fillOpacity: 0.301961,
              stroke: "none",
            }}
          />
        </g>
      </mask>
      <mask id="r">
        <g filter="url(#a)">
          <path
            d="M0 0h244v80H0z"
            style={{
              fill: "#000",
              fillOpacity: 0.101961,
              stroke: "none",
            }}
          />
        </g>
      </mask>
      <mask id="u">
        <g filter="url(#a)">
          <path
            d="M0 0h244v80H0z"
            style={{
              fill: "#000",
              fillOpacity: 0.101961,
              stroke: "none",
            }}
          />
        </g>
      </mask>
      <mask id="y">
        <g filter="url(#a)">
          <path
            d="M0 0h244v80H0z"
            style={{
              fill: "#000",
              fillOpacity: 0.301961,
              stroke: "none",
            }}
          />
        </g>
      </mask>
      <g id="l" clipPath="url(#b)">
        <path
          d="M41.703 4.691c0-1.55-.168-3.07-.488-4.546C30.656 6.199 16.359 8.184 7.672 8.828 3.328 9.152 0 12.29 0 16.051v15.23c2.344.399 4.777.614 7.27.614 19.02 0 34.433-12.18 34.433-27.207Zm0 0"
          style={{
            stroke: "none",
            fillRule: "nonzero",
            fill: "url(#c)",
          }}
        />
      </g>
      <g id="q" clipPath="url(#d)">
        <path
          d="M7.672 14.57c8.75-.656 23.207-2.66 33.793-8.832 10.586 6.172 25.043 8.176 33.793 8.832 4.344.325 7.672 3.461 7.672 7.22v-5.74c0-3.765-3.328-6.902-7.672-7.226-8.75-.648-23.211-2.656-33.793-8.828-10.578 6.176-25.04 8.18-33.793 8.832C3.328 9.152 0 12.29 0 16.051v5.738c0-3.766 3.328-6.902 7.672-7.227Zm0 0"
          style={{
            stroke: "none",
            fillRule: "nonzero",
            fill: "#fff",
            fillOpacity: 1,
          }}
        />
      </g>
      <g id="t" clipPath="url(#e)">
        <path
          d="M8.707 51.29C.281 39.874 0 30.077 0 30.077V16.051v18.82s.219 7.758 6.207 17.512c.68 1.101 2.625.62 2.531-.63-.011-.151-.02-.312-.027-.468ZM82.93 16.05v14.028s-.79 28.48-41.465 44.93c-9.38-3.797-16.617-8.23-22.235-12.801 2.985 5.727 7.868 10.625 14.282 13.969 2.468 1.254 5.05 2.48 8.008 3.605 40.625-16.449 41.41-44.906 41.41-44.906Zm0 0"
          style={{
            stroke: "none",
            fillRule: "nonzero",
            fill: "#000",
            fillOpacity: 1,
          }}
        />
      </g>
      <g id="x" clipPath="url(#f)">
        <path
          d="M27.898 5.48C20.484 7.527 13.016 8.434 7.676 8.828 3.328 9.152 0 12.29 0 16.051v13.308c15.332 0 27.777-10.672 27.898-23.882Zm0 0"
          style={{
            stroke: "none",
            fillRule: "nonzero",
            fill: "url(#g)",
          }}
        />
      </g>
      <filter
        id="a"
        width="100%"
        height="100%"
        x="0%"
        y="0%"
        filterUnits="objectBoundingBox"
      >
        <feColorMatrix
          in="SourceGraphic"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
        />
      </filter>
    </defs>
    <g clipPath="url(#h)">
      <path
        d="M237.488 14.172c-11.172 0-18.668 6.922-18.425 15.957v21.039h9.12v-11.02h2.45c5.035 0 9.12-3.523 9.12-7.87h-11.57v-2.27c-.019-.504-.136-7.961 9.305-7.961 1.797 0 3.399-.977 3.992-2.438l2.227-5.437h-6.223Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "#222",
          fillOpacity: 1,
        }}
      />
    </g>
    <path
      d="M186.883 51.168h-9.117V14.645c5.035 0 9.117 3.523 9.117 7.87v2.087c2.18-1.024 4.668-1.606 7.367-1.618 10.477-.218 18.504 6.266 18.504 15.899V51.16h-9.121V38.215c0-3.996-3.754-7.235-8.383-7.235-4.637 0-8.39 3.243-8.387 7.243l.02 12.937ZM105.09 14.645v36.523h9.125v-6.953l4.93-4.88 5.886 8.872c1.203 1.813 3.434 2.934 5.86 2.941l6.617.02-12.246-17.738 11.93-11.875h-7.239c-2.164 0-4.226.824-5.625 2.25L114.215 34.14V22.52c0-4.352-4.082-7.875-9.125-7.875ZM154.934 21.09c-9.625 0-17.43 6.734-17.43 15.039 0 8.309 7.805 15.043 17.43 15.043 3.007 0 5.84-.656 8.308-1.817v1.817h9.121V36.129c0-8.305-7.804-15.04-17.433-15.04Zm8.308 15.039L163 43.188c-.008.332-.477.492-.75.261l-2.078-1.761c-1.578 1.109-3.625 1.726-5.848 1.59-3.906-.243-7.183-2.919-7.64-6.282-.707-5.176 4.988-9.422 11.144-7.613 3.29.96 5.406 3.742 5.406 6.738Zm0 0"
      style={{
        stroke: "none",
        fillRule: "nonzero",
        fill: "#222",
        fillOpacity: 1,
      }}
    />
    <path
      d="M115.95 63.898c-.02.926-.934 1.657-2.009 1.657h-8.644c-.113 0-.207-.082-.207-.18v-5.266c0-.097.094-.175.207-.175h8.547c1.043 0 1.93.683 1.996 1.578.035.449-.14.773-.442 1.093.352.313.559.825.551 1.297Zm-9.653-2.753v.949c0 .05.043.086.101.086h7.582c.368 0 .665-.258.657-.578-.012-.309-.325-.543-.68-.543h-7.559c-.058 0-.101.039-.101.086Zm8.445 2.742c.012-.32-.281-.668-.652-.668h-7.692c-.058 0-.101.035-.101.086v1.035c0 .05.043.09.101.09h7.66c.36 0 .672-.235.68-.543ZM134.648 65.223c.032.18-.132.332-.335.332h-.547c-.274 0-.543-.082-.762-.223l-2.711-1.809a1.421 1.421 0 0 0-.758-.222h-4.426c-.058 0-.101.039-.101.09v1.625c0 .293-.281.535-.621.535h-.375c-.114 0-.207-.082-.207-.18v-2.566c0-.297.277-.535.62-.535h8.38c.367 0 .664-.262.648-.583-.008-.304-.32-.636-.68-.636h-8.347c-.344 0-.621-.239-.621-.531v-.41c0-.098.093-.176.207-.176h8.695c1.102 0 1.992.879 1.953 1.84-.039.913-.941 1.535-2.004 1.535h-.554c-.055 0-.079.058-.036.09l2.45 1.628c.074.051.132.118.144.2ZM145.61 59.93h4.644c1.719 0 3.11 1.199 3.11 2.68v.261c0 1.484-1.391 2.684-3.11 2.684h-4.645c-1.718 0-3.109-1.2-3.109-2.684v-.262c0-1.48 1.39-2.68 3.11-2.68Zm6.542 2.941v-.266c0-.859-.804-1.554-1.8-1.554h-4.84c-.996 0-1.801.695-1.801 1.554v.266c0 .86.805 1.555 1.8 1.555h4.84c.997 0 1.801-.696 1.801-1.555ZM171.07 59.93h.375c.34 0 .618.238.618.535v2.402c0 1.48-1.391 2.684-3.106 2.684h-5.266c-1.718 0-3.109-1.203-3.109-2.684v-2.402c0-.297.277-.535.617-.535h.38c.116 0 .202.078.202.175v2.766c0 .86.813 1.555 1.801 1.555h2.027c.059 0 .102-.04.102-.09v-3.871c0-.297.277-.535.617-.535h.379c.11 0 .203.078.203.175v4.23c0 .052.043.09.102.09h2.027c.996 0 1.8-.695 1.8-1.554v-2.766c0-.097.095-.175.204-.175ZM190.047 61.059h-8.277c-.36 0-.649.34-.649.652 0 .309.293.562.649.562h7.046c1.079 0 1.957.664 1.957 1.598 0 .93-.875 1.688-1.957 1.688h-8.593c-.114 0-.203-.082-.203-.176v-.41c0-.293.277-.535.617-.535h8.277c.363 0 .656-.254.656-.56 0-.308-.293-.566-.656-.566h-7.043c-1.078 0-1.957-.664-1.957-1.593 0-.93.879-1.778 1.957-1.778h8.59c.113 0 .207.079.207.176v.41c0 .293-.281.535-.621.535ZM201.629 61.059c-.996 0-1.8.691-1.8 1.55v.266c0 .86.804 1.555 1.8 1.555h7.226c.34 0 .618.238.618.535v.406c0 .098-.09.18-.203.18h-7.547c-1.715 0-3.106-1.203-3.106-2.684v-.262c0-1.48 1.39-2.68 3.106-2.68h7.547c.113 0 .203.079.203.177v.406c0 .297-.278.535-.618.535h-7.226Zm-.598 1.66c0-.293.278-.535.621-.535h6.41c.114 0 .208.082.208.18v.32c0 .293-.278.535-.622.535h-6.035c-.324 0-.582-.227-.582-.5ZM228.18 65.223c.027.18-.133.332-.336.332h-.547c-.274 0-.543-.082-.762-.223l-2.715-1.809a1.398 1.398 0 0 0-.754-.222h-4.43c-.054 0-.1.039-.1.09v1.625c0 .293-.278.535-.618.535h-.379c-.11 0-.203-.082-.203-.18v-2.566c0-.297.277-.535.621-.535h8.379c.363 0 .664-.262.648-.583-.011-.304-.324-.636-.68-.636h-8.347c-.344 0-.621-.239-.621-.531v-.41c0-.098.094-.176.203-.176h8.7c1.1 0 1.988.879 1.948 1.84-.039.913-.94 1.535-2 1.535h-.554c-.055 0-.078.058-.035.09l2.449 1.628c.074.051.133.118.14.2Zm0 0"
      style={{
        stroke: "none",
        fillRule: "nonzero",
        fill: "#abafbb",
        fillOpacity: 1,
      }}
    />
    <g clipPath="url(#i)">
      <path
        d="M75.27 8.828C66.52 8.18 52.05 6.172 41.465 0 30.887 6.172 16.422 8.176 7.672 8.828 3.328 9.152 0 12.29 0 16.051v18.82S.219 42.63 6.207 52.38c.68 1.101 2.625.617 2.531-.629-.261-2.727-.238-5.75.446-8.5 3.73-13.59 22.554-17.258 32.527-7.848 5.68-4.437 14.555-5.66 21.23-2.125a16.698 16.698 0 0 1 4.692 3.504c.879.953.597 2.36-.578 3.035-5.903-6.718-18.715-5.793-22.285 2.204-1.235 2.308-5.32 2.28-6.551.011-5.649-9.074-20.371-6.449-22.09 3.621-1.41 12.465 5.34 24.23 17.387 30.516 2.468 1.254 5.05 2.48 8.007 3.605C82.148 63.32 82.937 34.867 82.937 34.867v-18.82c0-3.758-3.324-6.902-7.664-7.223Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#j)",
        }}
      />
    </g>
    <g clipPath="url(#k)">
      <use xlinkHref="#l" mask="url(#m)" />
    </g>
    <g clipPath="url(#n)">
      <path
        d="M75.258 8.828C66.508 8.176 52.05 6.172 41.465 0v35.2c.078.073.16.14.238.21 5.684-4.437 14.559-5.66 21.234-2.125a16.635 16.635 0 0 1 4.692 3.508c.875.95.598 2.355-.578 3.031-5.906-6.719-18.715-5.789-22.285 2.207-.621 1.16-1.965 1.73-3.301 1.715v36.008s.035.016.055.023c40.625-16.449 41.41-44.906 41.41-44.906v-18.82c0-3.766-3.328-6.903-7.672-7.227Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "url(#o)",
        }}
      />
    </g>
    <g clipPath="url(#p)">
      <use xlinkHref="#q" mask="url(#r)" />
    </g>
    <path
      d="M52.027 20.79c3.055.507 5.22 2.382 5.809 5.01.035.16.289.16.328 0 .59-2.632 2.762-4.503 5.813-5.01.187-.032.187-.25 0-.286-3.055-.508-5.223-2.383-5.813-5.012-.035-.16-.289-.16-.328 0-.59 2.633-2.762 4.504-5.809 5.012-.187.031-.187.25 0 .285Zm0 0"
      style={{
        stroke: "none",
        fillRule: "nonzero",
        fill: "#fff",
        fillOpacity: 1,
      }}
    />
    <g clipPath="url(#s)">
      <use xlinkHref="#t" mask="url(#u)" />
    </g>
    <path
      d="M55.93 33.305c6.613.172 10.304 3.558 11.968 5.656a1.824 1.824 0 0 0-.27-2.168 16.635 16.635 0 0 0-4.69-3.508c-6.676-3.535-15.56-2.316-21.235 2.125C31.734 26 12.914 29.668 9.18 43.258c-.68 2.75-.707 5.773-.446 8.504.133 1.804.422 3.582.84 5.324.04.152.11.297.211.422a59.37 59.37 0 0 0 5.64 6.152c-2.413-5.703-6.597-18.828 2.032-26.5 8.086-7.183 18.547-2.914 22.824 1.473.633.648 1.782.664 2.414.015 1.996-2.043 6.418-5.515 13.23-5.34Zm0 0"
     style={{
       stroke: "none",
       fillRule: "nonzero",
       fill: "url(#v)",
     }}
   />
    <g clipPath="url(#w)">
      <use xlinkHref="#x" mask="url(#y)" />
    </g>
   </svg>

  )
}

interface Props {
  onSubmit?: (value: string, openNewTab: boolean) => unknown
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
    props.onSubmit?.(value, false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (value === '') return

    if ((e.metaKey || e.ctrlKey) && (e.key === 'Enter')) {
      props.onSubmit?.(value, true)
    }
  }

  return (
    <Box>
      <BraveSearchLogo />
      <Form onSubmit={handleSubmit} onClick={handleFormBoxClick} role="search" aria-label="Brave">
        <input ref={inputRef} onChange={onInputChange} onKeyDown={handleKeyDown} type="text" placeholder={getLocale('searchPlaceholderLabel')} value={value} autoCapitalize="off" autoComplete="off" autoCorrect="off" spellCheck="false" aria-label="Search" title="Search" aria-autocomplete="none" aria-haspopup="false" maxLength={2048} autoFocus />
        <IconButton data-test-id="submit_button" aria-label="Submit">
          <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M8 16a8 8 0 1 1 5.965-2.67l5.775 5.28a.8.8 0 1 1-1.08 1.18l-5.88-5.375A7.965 7.965 0 0 1 8 16Zm4.374-3.328a.802.802 0 0 0-.201.18 6.4 6.4 0 1 1 .202-.181Z" fill="url(#search_icon_gr)"/><defs><linearGradient id="search_icon_gr" x1="20" y1="20" x2="-2.294" y2="3.834" gradientUnits="userSpaceOnUse"><stop stopColor="#BF14A2"/><stop offset="1" stopColor="#F73A1C"/></linearGradient></defs></svg>
        </IconButton>
      </Form>
    </Box>
  )
}

export default Search
