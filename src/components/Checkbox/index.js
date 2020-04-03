import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';

const CheckboxLabel = styled.label`
  margin-bottom: 1.6rem;
  cursor: pointer;
  user-select: none;
  background: transparent;
  padding: 1.2rem;
  border-radius: 0.8rem;
  background: ${theme.subtle};
  transition: all 120ms ease-out 0s;
  position: relative;
  display: inline-flex;
  align-items: center;
  &:hover {
    box-shadow: inset 0px 0px 4px rgba(0,0,0,.2);
  }
  &.active {
    background: ${theme.neutral.grey9};
    color: ${theme.neutral.grey0};
  }
`;

const CheckboxIcon = styled.div`
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-right: 8px;
`;

const Checkbox = ({isChecked,method}) => {
  return(
    <CheckboxLabel className={isChecked ? 'active' : null}>
      <input
        type="checkbox"
        onChange={method.bind(this)}
        style={{
          position: 'absolute',
          left: '0',
          top: '0',
          opacity: '0'
        }}
      />
      <CheckboxIcon>
        {
          isChecked ?
          (
            <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 512 512'><title>ionicons-v5-l</title><path d='M400,48H112a64.07,64.07,0,0,0-64,64V400a64.07,64.07,0,0,0,64,64H400a64.07,64.07,0,0,0,64-64V112A64.07,64.07,0,0,0,400,48ZM364.25,186.29l-134.4,160a16,16,0,0,1-12,5.71h-.27a16,16,0,0,1-11.89-5.3l-57.6-64a16,16,0,1,1,23.78-21.4l45.29,50.32L339.75,165.71a16,16,0,0,1,24.5,20.58Z' fill="currentColor"/></svg>
          )
          :
          (
            <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 512 512'><title>ionicons-v5-q</title><path d='M416,448H96a32.09,32.09,0,0,1-32-32V96A32.09,32.09,0,0,1,96,64H416a32.09,32.09,0,0,1,32,32V416A32.09,32.09,0,0,1,416,448Z' fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16px"/></svg>
          )
        }
      </CheckboxIcon>
      <small>Change <strong>Top Navigation</strong> to a neutral color?</small>
    </CheckboxLabel>
  )
}

export default Checkbox;