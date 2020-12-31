import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components';
import firebase from 'firebase'
import { motion } from 'framer-motion'

const WidgetContainer = styled.button`
  user-select: none;
  width: 100%;
  box-shadow: 0px 0px 0px 1px rgba(255,255,255,.2) ,0px 5px 5px -3px rgba(0,0,0,.2), 0px 8px 10px 1px rgba(0,0,0, .14), 0px 3px 14px 2px rgba(0,0,0, .12);
  border-radius: 8px;
  position: relative;
  margin-bottom: 8px;
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
    box-shadow: 0px 0px 0px 2px rgba(255,255,255,.2), 0px 4px 24px 1px rgba(255,255,255, .2), 0px 10px 12px 1px rgba(0,0,0, .12), 0px 5px 18px 2px rgba(0,0,0, .1),0px 12px 32px 2px rgba(0,0,0, .08);
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
  const [themeLikes, setThemeLikes] = useState(props.theme.likes)
  const [themeItem, setThemeItem] = useState(props.theme)
  const [animate, setAnimate] = useState(false)

  const variants = {
    open: { scale: 1 },
    closed: { scale: 1.1 },
  }

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setButtonText('Copied ✓')
    setTimeout(() => {
      setButtonText('Click to Copy')
    }, 1000)
  };

  const themeName = props.theme.theme_name
  const columnBg = props.theme.column_bg
  const topNavBg = props.neutralNav ? props.theme.column_bg : props.theme.top_nav_bg
  const topNavText = props.neutralNav ? props.theme.text_color : props.theme.top_nav_text
  const activeItem = props.theme.active_item
  const activeItemText = props.theme.active_item_text
  const hoverItem = props.theme.hover_item
  const textColor = props.theme.text_color
  const activePresence = props.theme.active_presence
  const mentionBadge = props.theme.mention_badge
  const copyString = `${props.themeLabel ? themeName + ' -- ' : ''}${columnBg},#121016,${activeItem},${activeItemText},${hoverItem},${textColor},${activePresence},${mentionBadge},${topNavBg},${topNavText}`
  const likes = props.theme.likes

  const updateLike = () => {
    setAnimate(true)
    const updated = likes + 1
    firebase.firestore().collection('themes').doc(themeItem.theme_name).update({
      likes: updated
    })
    setTimeout(() => {
      setAnimate(false)
    }, 1000)
  }

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
            {
              themeName === '' ? (
                <span className="opacity-50">Example Theme</span>
              )
              :
              themeName
            }
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
      <div className="flex mb-2">
        {
          props.withLikes ? (
            <button
              className={`transition text-sm p-1 rounded-md inline-flex items-center ${likes > 0 ? 'text-gray-900 dark:text-white' : 'text-gray-400'} hover:text-gray-600 dark:hover:text-white hover:bg-pink-100 dark:hover:bg-pink-500 dark:hover:bg-opacity-30 focus:outline-none transform hover:scale-110 hover:rotate-6 active:scale-95`}
              onClick={updateLike}
            >
              <svg height="20" width="20" className={`${likes > 0 ? 'text-pink-500' : 'inherit'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span className="ml-1">{likes}</span>
            </button>
          )
          :
          null
        }
      </div>
    </div>
  )
}

export default ThemeItem;
