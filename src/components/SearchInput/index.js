import React, { Component, useRef } from 'react';
import styled from 'styled-components';
import theme from '../../theme';

const TextFieldContainer = styled.div`
  margin-bottom: 2.4rem;
  width: 100%;
  position: relative;
  transition: all 120ms ease-out 0s;
  &.pinned {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 100;
  }
`;

const TextFieldInput = styled.input`
  display: block;
  width: 100%;
  padding: 1.6rem;
  font-size: 1.8rem;
  border-radius: 0.4rem;
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.15) , 0px 4px 8px 0px rgba(0,0,0,0.15);
  border: 1px solid ${({ theme }) => theme.disabledColor};
  background: ${({ theme }) => theme.transparent};
  backdrop-filter: blur(12px) saturate(150%);
  transition: all 120ms ease-out 0s;
  &:focus {
    box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.15) , 0px 4px 8px 0px rgba(0,0,0,0.15);
    border-color: ${theme.primary};
  }
  &[disabled] {
    background: ${({ theme }) => theme.subtle};
    color: ${({ theme }) => theme.textColor};
    box-shadow: none;
  }
  &.pinned {
    border-width: 0px;
    border-radius: 0;
    border-bottom-width: 1px;
  }
`;

const TextFieldInputWithIcon = styled(TextFieldInput)`
  padding-left: 4.8rem;
`;

const TextFieldIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 1.2rem;
  width: 2.4rem;
  height: 2.4rem;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.textColor};
  z-index: 2000;
`;

const TextFieldReset = styled.button`
  cursor: pointer;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.primary};
  position: absolute;
  top: 50%;
  right: 1.2rem;
  transform: translateY(-50%);
  border-radius: 0.4rem;
  display: inline-flex;
  width: 3.2rem;
  height: 3.2rem;
  align-items: center;
  justify-content: center;
  padding: 0;
  z-index: 2000;
  &:hover, &:focus {
    background: rgba(0,0,0,0.05);
  }
`;

class SearchInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
    };
  }

  filterUpdate() {
    const val = this.myValue.value
    this.props.filterUpdate(val)
    this.setState({
      inputText: val
    })
  }

  filterClear() {
    this.props.filterUpdate('')
    this.myValue.value = ''
  }

  inputState() {
    const searchField = this.searchField
    const searchInput = this.myValue

    const pinSearch = () => {
      searchField.classList.add('pinned')
      searchInput.classList.add('pinned')
    }
  
    const unpinSearch = () => {
      if(searchField.classList.contains('pinned')) {
        searchField.classList.remove('pinned')
        searchInput.classList.remove('pinned')
      }
    }

    let pinState = window.scrollY > window.innerHeight*.8;
    pinState ? pinSearch(): unpinSearch();
  }

  render() {

    window.addEventListener('scroll', this.inputState.bind(this))

    return (
      <TextFieldContainer ref={ (container) => {this.searchField = container} }>
        <TextFieldIcon>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        </TextFieldIcon>
        {
          this.props.filterText.length > 1 ?
            <TextFieldReset
              ref={ (value) => {this.myValue = value} }
              onClick={this.filterClear.bind(this)}
              value=""
            >
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </TextFieldReset>
            :
            null
        }
        <TextFieldInputWithIcon
          placeholder="Search for a theme..."
          type="text"
          ref={ (value) => {this.myValue = value} }
          onChange={this.filterUpdate.bind(this)}
        />
      </TextFieldContainer>
    )
  }
}

export default SearchInput;