import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components';

const WidgetContainer = styled.button`
  user-select: none;
  width: 100%;
  box-shadow: 0px 5px 5px -3px rgba(0,0,0,.2), 0px 8px 10px 1px rgba(0,0,0, .14), 0px 3px 14px 2px rgba(0,0,0, .12);
  border-radius: 8px;
  position: relative;
  margin-bottom: 16px;
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
    box-shadow: 0px 0px 0px 4px rgba(0,0,0, 0.2);
  }
  &:active {
    transform: scale(1);
    box-shadow: 0px 2px 2px rgba(0,0,0, .2), 0px 5px 8px rgba(0,0,0, .12);
  }
`;

const WidgetHeader = styled.div`
  padding: 8px;
  transition: all 200ms ease-out 0s;
  &:hover {
    background: ${props => props.color || "transparent"};
  }
`;

const WidgetTopBar = styled.div`
  text-align: center;
  padding: 8px;
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
  font-size: 18px;
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
  padding: 16px 40px 16px 36px;
  width: 100%;
  position: relative;
  margin-bottom: 0;
  transition: all 200ms ease-out 0s;
  &:before {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    content: '';
    position: absolute;
    top: 50%;
    left: 8px;
    transform: translateY(-50%);
    background: url(/slackbot.svg) no-repeat;
    background-size: cover;
  }
  &:after {
    content: '';
    position: absolute;
    left: 24px;
    top: 28px;
    transform: translateY(-50%);
    width: 7px;
    height: 7px;
    color: ${props => props.activeColor || "inherit"};
    background: ${props => props.activeColor ? 'currentColor' : props.bg};
    border-radius: 50%;
    border: 1px solid currentColor;
    box-shadow: 0px 0px 0px 2px ${props => props.bg || "transparent"};
  }
  &:hover {
    background: ${props => props.hover || "transparent"};
  }
  &:last-of-type:hover {
    background: ${props => props.hover || "transparent"};
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

const WidgetListItemActive= styled(WidgetListItem)`
  transition: all 200ms ease-out 0s;
  &:after {
    color: inherit;
    background: currentColor;
    box-shadow: 0px 0px 0px 2px ${props => props.activeBg || "transparent"};
  }
  &:hover {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const WidgetText = styled.span`
  height: 8px;
  background: currentColor;
  display: block;
  opacity: .8;
  border-radius: 999px;
`;

const WidgetMention = styled.span`
  height: 12px;
  width: 24px;
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  border-radius: 999px;
`;

const CopyInput = styled.textarea`
  position: absolute;
  left: -9999px;
`;

const ThemeItem = (props) => {

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
  const themeName = theme.theme_name
  const columnBg = theme.column_bg
  const topNavBg = props.neutralNav ? theme.column_bg : theme.top_nav_bg
  const topNavText = props.neutralNav ? theme.text_color : theme.top_nav_text
  const activeItem = theme.active_item
  const activeItemText = theme.active_item_text
  const hoverItem = theme.hover_item
  const textColor = theme.text_color
  const activePresence = theme.active_presence
  const mentionBadge = theme.mention_badge
  const copyString = `${props.themeLabel ? themeName + ' -- ' : ''}${columnBg},#121016,${activeItem},${activeItemText},${hoverItem},${textColor},${activePresence},${mentionBadge},${topNavBg},${topNavText}`

  return (
    <div>
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
            <WidgetListItemActive activeBg={activeItem} style={{
              color: activeItemText,
              background: activeItem
            }}>
              <WidgetText />
            </WidgetListItemActive>
            <WidgetListItem activeColor={activePresence} bg={columnBg} hover={hoverItem} style={{
              color: textColor
            }}>
              <WidgetText />
              <WidgetMention style={{
                background: mentionBadge
              }} />
            </WidgetListItem>
            <WidgetListItem bg={columnBg} hover={hoverItem} style={{
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

export default ThemeItem;