// Copyright (c) 2024 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// You can obtain one at https://mozilla.org/MPL/2.0/.
import Flex from '$web-common/Flex';
import { getLocale } from '$web-common/locale';
import Icon from '@brave/leo/react/icon';
import Input from '@brave/leo/react/input';
import { color, font, spacing } from '@brave/leo/tokens/css/variables';
import * as React from 'react';
import styled from 'styled-components';
// import EnginePicker from './EnginePicker';
import { useSearchContext } from './SearchContext';
import { googleSearchHost, searchBoxRadius } from './config';
import SearchBoxSvgComponent from './SearchBoxSvgComponent';

const searchBoxClass = 'ntp-search-box'

const SearchInput = styled(Input)`
  --leo-control-focus-effect: none;
  --leo-control-padding: 13px 15px 13px 42px;
  --leo-control-color: rgba(0, 0, 0, 0.7);
  --leo-control-text-color: ${color.white};
  --leo-control-font: ${font.large.regular};

  display: inline-block;
  width: 540px;
  overflow: hidden;
  margin-top: 0px;
  // padding-left: 30px;
  // margin-left: -26px;
  border-radius: 77px;

  leo-icon {
    --leo-icon-color: rgba(255, 255, 255);
  }

  &::placeholder {
    color: white;
    // margin-left: -26px;
  }
`

const SearchIconContainer = styled.div`
  padding-right: ${spacing.m};
`

const Container = styled.div`
  --leo-control-radius: ${searchBoxRadius};

  display: flex;

  /* If we have search results, don't add a radius to the bottom of the search box */
  &:has(+ .search-results) {
    --leo-control-radius: ${searchBoxRadius} ${searchBoxRadius} 0 0;
  }
  // background:black;
  // opacity:0.2;
  border-radius: var(--leo-control-radius);
  margin-top: 5px;
  padding: 0px 0px;
  
  border-radius: 60px;
`

export const Backdrop = styled.div`
  z-index: -1;
  position: absolute;
  inset: 0;
  // backdrop-filter: blur(64px);
  border-radius: 77px;
  margin-top: -6px;
`

export default function SearchBox() {
  const { searchEngine, query, setQuery } = useSearchContext()
  const placeholderText = searchEngine?.host === googleSearchHost
    ?  getLocale('searchNonBravePlaceholder')
    : getLocale('searchNonBravePlaceholder')
  const searchInput = React.useRef<HTMLElement>()
  React.useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && document.activeElement === document.body) {
        e.preventDefault()
        searchInput.current?.focus()
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [])
  return <Container className={searchBoxClass}>
    <SearchInput tabIndex={1} type="text" ref={searchInput} value={query} onInput={e => setQuery(e.value)} placeholder={placeholderText} >
      {/* <div style={{ height: '24px', width: '24px', marginTop:'19px', marginBottom: '-43px', marginLeft: '16px',marginRight: '4px', zIndex: '0', padding: '0' }}> */}
      <Flex slot="left-icon" align='center' style={{ height: '24px', width: '24px', marginTop:'-12px', marginBottom: '-43px', marginLeft: '-24px',marginRight: '4px', zIndex: '0', padding: '0' }}>
      <SearchBoxSvgComponent />
      </Flex>
      {/* </div> */}
      <SearchIconContainer slot="right-icon">
      
          <Icon name="search" />
        
      </SearchIconContainer>
    </SearchInput>
  </Container>

}
