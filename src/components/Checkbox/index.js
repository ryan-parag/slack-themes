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
  background: ${({ theme }) => theme.subtle};
  border: 1px solid transparent;
  transition: all 120ms ease-out 0s;
  position: relative;
  display: flex;
  align-items: center;
  &:hover {
    border-color: ${({ theme }) => theme.primaryShade};
    box-shadow: inset 0px 0px 4px rgba(0,0,0,.2);
  }
  &.active {
    background: ${({ theme }) => theme.transparent};
    color: ${({ theme }) => theme.primary};
  }
`;

const CheckboxIcon = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const Checkbox = (props) => {
  return(
    <CheckboxLabel className={props.isChecked ? 'active' : null}>
      <input
        type="checkbox"
        onChange={props.method.bind(this)}
        style={{
          position: 'absolute',
          left: '0',
          top: '0',
          opacity: '0'
        }}
      />
      <CheckboxIcon>
        {
          props.isChecked ?
          (
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 512 512'><title>checked</title><path d='M400,48H112a64.07,64.07,0,0,0-64,64V400a64.07,64.07,0,0,0,64,64H400a64.07,64.07,0,0,0,64-64V112A64.07,64.07,0,0,0,400,48ZM364.25,186.29l-134.4,160a16,16,0,0,1-12,5.71h-.27a16,16,0,0,1-11.89-5.3l-57.6-64a16,16,0,1,1,23.78-21.4l45.29,50.32L339.75,165.71a16,16,0,0,1,24.5,20.58Z' fill="currentColor"/></svg>
          )
          :
          (
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 512 512'><title>unchecked</title><path d='M416,448H96a32.09,32.09,0,0,1-32-32V96A32.09,32.09,0,0,1,96,64H416a32.09,32.09,0,0,1,32,32V416A32.09,32.09,0,0,1,416,448Z' fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="20px"/></svg>
          )
        }
      </CheckboxIcon>
      <small>{props.children}</small>
    </CheckboxLabel>
  )
}

export default Checkbox;
