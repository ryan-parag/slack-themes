import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components';
import Button from '../Button';
import theme from '../../theme';

const WidgetContainer = styled.button`
  user-select: none;
  width: 100%;
  box-shadow: 0px 5px 5px -3px rgba(0,0,0,.2), 0px 8px 10px 1px rgba(0,0,0, .14), 0px 3px 14px 2px rgba(0,0,0, .12);
  border-radius: 8px;
  position: relative;
  margin-bottom: 1.6rem;
  display: block;
  padding: 0;
  border-radius: 8px;
  text-align: left;
  cursor: pointer;
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  transition: all 200ms ease-out 0s;
  &:hover {
    box-shadow: 0px 10px 12px 1px rgba(0,0,0, .12), 0px 5px 18px 2px rgba(0,0,0, .1),0px 12px 32px 2px rgba(0,0,0, .08);
  }
  &:hover, &:focus {
    transform: scale(1.03);
  }
  &:focus {
    box-shadow: 0px 0px 0px 4px ${theme.primary};
  }
  &:active {
    transform: scale(1);
    box-shadow: 0px 2px 2px rgba(0,0,0, .2), 0px 5px 8px rgba(0,0,0, .12);
  }
`;

const WidgetHeader = styled.div`
  padding: 0.8rem;
  transition: all 200ms ease-out 0s;
  &:hover {
    background: ${props => props.color || "transparent"};
  }
`;

const WidgetTopBar = styled.div`
  text-align: center;
  padding: 0.8rem;
  font-size: 14px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  cursor: pointer;
  border: 0;
  display: block;
  width: 100%;
  transition: all 200ms ease-out 0s;
`;

const WidgetTitle = styled.div`
  font-size: 1.8rem;
`;

const WidgetBody = styled.div`
  padding: 0;
`;

const WidgetList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
  background: transparent;
`;

const WidgetListItem = styled.li`
  padding: 1.6rem 4rem 1.6rem 2.4rem;
  width: 100%;
  position: relative;
  margin-bottom: 0;
  transition: all 200ms ease-out 0s;
  &:before {
    width: 0.8rem;
    height: 0.8rem;
    content: '';
    position: absolute;
    top: 50%;
    left: 0.8rem;
    transform: translateY(-50%);
    background: ${props => props.activeColor || "transparent"}
  }
  &:hover {
    background: ${props => props.color || "transparent"};
  }
  &:last-of-type:hover {
    background: ${props => props.color || "transparent"};
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

const WidgetListItemActive= styled(WidgetListItem)`
  transition: all 200ms ease-out 0s;
  &:before {
    background: currentColor;
  }
  &:hover {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const WidgetText = styled.span`
  height: 0.8rem;
  background: currentColor;
  display: block;
  opacity: .8;
  border-radius: 999px;
`;

const WidgetMention = styled.span`
  height: 1.2rem;
  width: 2.4rem;
  position: absolute;
  top: 50%;
  right: 0.8rem;
  transform: translateY(-50%);
  border-radius: 999px;
`;

const ButtonBlock = styled(Button)`
  width: 100%;
  display: block;
`;

const CopyInput = styled.textarea`
  position: absolute;
  left: -9999px;
`;

const SlackWidget = (props) => {

  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  const [buttonText, setButtonText] = useState('Click to Copy');

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setButtonText('Copied ✓')
    setTimeout(() => {
      setButtonText('Click to Copy')
    }, 1000)
  };

  const theme = props.theme
  const themeName = theme.name
  const columnBg = theme.colors.columnBg
  const topNavBg = props.isNeutralNav ? theme.colors.columnBg : theme.colors.topNavBg
  const topNavText = props.isNeutralNav ? theme.colors.textColor : theme.colors.topNavText
  const activeItem = theme.colors.activeItem
  const activeItemText = theme.colors.activeItemText
  const hoverItem = theme.colors.hoverItem
  const textColor = theme.colors.textColor
  const activePresence = theme.colors.activePresence
  const mentionBadge = theme.colors.mentionBadge
  const copyString = `${props.themeLabel ? themeName + ' -- ' : ''}${columnBg},#121016,${activeItem},${activeItemText},${hoverItem},${textColor},${activePresence},${mentionBadge},${topNavBg},${topNavText}`

  return (
    <div key={themeName}>
      <WidgetContainer
        style={{
          background: columnBg,
          color: textColor
        }}
        onClick={copyToClipboard}
      >
        <WidgetTopBar style={{
          color: topNavText,
          background: topNavBg
        }}
        >
          {buttonText}
        </WidgetTopBar>
        <WidgetHeader color={hoverItem}>
          <WidgetTitle>
            {themeName}
          </WidgetTitle>
        </WidgetHeader>
        <WidgetBody>
          <WidgetList>
            <WidgetListItemActive style={{
              color: activeItemText,
              background: activeItem
            }}>
              <WidgetText />
            </WidgetListItemActive>
            <WidgetListItem activeColor={activePresence} color={hoverItem} style={{
              color: textColor
            }}>
              <WidgetText />
              <WidgetMention style={{
                background: mentionBadge
              }} />
            </WidgetListItem>
            <WidgetListItem activeColor={activePresence} color={hoverItem} style={{
              color: textColor
            }}>
              <WidgetText />
            </WidgetListItem>
          </WidgetList>
        </WidgetBody>
      </WidgetContainer>
      <CopyInput
        ref={textAreaRef}
        value={copyString}
        readOnly
      />
    </div>
  )
}

export default SlackWidget;