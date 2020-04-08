import React from 'react';
import styled from 'styled-components';
import Checkbox from '../Checkbox';
import Button from '../Button'

const DrawerContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${({ theme }) => theme.rootBg};
  width: 100%;
  padding: 3.2rem 2.4rem;
  max-width: 500px;
  box-shadow: -1px 0px 0px ${({ theme }) => theme.disabledColor}, -5px 0px 8px rgba(0,0,0,.1), -10px 0px 20px -2px rgba(0,0,0,.08);
  z-index:9000;
`;

const DrawerOverlay = styled.div`
  position:fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.overlay};
  z-index: 8000;
  cursor pointer;
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 4.8rem;
  right: 1.6rem;
`;

const ThemeButton = styled(Button)`
  width: 4.8rem;
  height: 4.8rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  &.active {
    color: ${({ theme }) => theme.rootBg};
    background: ${({ theme }) => theme.rootColor};
  }
`;

const ThemeExample = styled.div`
  padding: 1.6rem;
  border-radius: 0.8rem;
  background: ${({ theme }) => theme.subtle};
`;

 const Drawer = (props) => {

  const lightToggle = () => {
    props.theme === 'dark' ? props.toggleTheme() : null
  }

  const darkToggle = () => {
    props.theme === 'light' ? props.toggleTheme() : null
  }

  return(
    <>
      <DrawerContainer>
        <CloseButton onClick={() => props.showDrawer()}>Close</CloseButton>
        <h2>Settings</h2>
        <div style={{
          marginBottom: '1.6rem'
        }}>
          <small>Change site theme:</small>
        </div>
        <div>
          <ThemeButton style={{marginRight: '1.6rem'}} onClick={lightToggle} className={props.theme === 'dark' ? null : 'active'}>
            <svg xmlns='http://www.w3.org/2000/svg' fill="currentColor" width='24' height='24' viewBox='0 0 512 512'><title>light</title><path d='M256,118a22,22,0,0,1-22-22V48a22,22,0,0,1,44,0V96A22,22,0,0,1,256,118Z'/><path d='M256,486a22,22,0,0,1-22-22V416a22,22,0,0,1,44,0v48A22,22,0,0,1,256,486Z'/><path d='M369.14,164.86a22,22,0,0,1-15.56-37.55l33.94-33.94a22,22,0,0,1,31.11,31.11l-33.94,33.94A21.93,21.93,0,0,1,369.14,164.86Z'/><path d='M108.92,425.08a22,22,0,0,1-15.55-37.56l33.94-33.94a22,22,0,1,1,31.11,31.11l-33.94,33.94A21.94,21.94,0,0,1,108.92,425.08Z'/><path d='M464,278H416a22,22,0,0,1,0-44h48a22,22,0,0,1,0,44Z'/><path d='M96,278H48a22,22,0,0,1,0-44H96a22,22,0,0,1,0,44Z'/><path d='M403.08,425.08a21.94,21.94,0,0,1-15.56-6.45l-33.94-33.94a22,22,0,0,1,31.11-31.11l33.94,33.94a22,22,0,0,1-15.55,37.56Z'/><path d='M142.86,164.86a21.89,21.89,0,0,1-15.55-6.44L93.37,124.48a22,22,0,0,1,31.11-31.11l33.94,33.94a22,22,0,0,1-15.56,37.55Z'/><path d='M256,358A102,102,0,1,1,358,256,102.12,102.12,0,0,1,256,358Z'/></svg>
          </ThemeButton>
          <ThemeButton onClick={darkToggle} className={props.theme === 'light' ? null : 'active'}>
            <svg xmlns='http://www.w3.org/2000/svg' fill="currentColor" width='24' height='24' viewBox='0 0 512 512'><title>dark</title><path d='M264,480A232,232,0,0,1,32,248C32,154,86,69.72,169.61,33.33a16,16,0,0,1,21.06,21.06C181.07,76.43,176,104.66,176,136c0,110.28,89.72,200,200,200,31.34,0,59.57-5.07,81.61-14.67a16,16,0,0,1,21.06,21.06C442.28,426,358,480,264,480Z'/></svg>
          </ThemeButton>
        </div>
        <hr style={{
          marginTop: '3.2rem',
          marginBottom: '3.2rem'
        }}/>
        <div style={{
          marginBottom: '1.6rem'
        }}>
          <small>Edit theme properties:</small>
        </div>
        <div>
          <Checkbox
            isChecked={props.isNeutralNav}
            method={props.neutralNavToggle.bind(this)}
          >
            Change Top Navigation to neutral color
          </Checkbox>
        </div>
        <div>
          <Checkbox
            isChecked={props.themeLabel}
            method={props.themeLabelToggle.bind(this)}
          >
            Add Theme Name when copying
          </Checkbox>
        </div>
        <ThemeExample>
          <small>
            <code>Example Theme:</code>
          </small>
          <p style={{
            wordBreak: 'break-word',
            marginBottom: '0'
          }}>
            <small>
              {props.themeLabel ? 'Theme Label --' : null} #393C40, #121016, #99C221, #000000, #53565A, #F3F3F3, #99C221, #5188F3, {props.isNeutralNav ? '#393C40' : '#99C221'}, {props.isNeutralNav ? '#99C221' : '#000000'}
            </small>
          </p>
        </ThemeExample>
      </DrawerContainer>
    <DrawerOverlay onClick={() => props.showDrawer()}/>
    </>
  )
}

export default Drawer