import React, { useRef, useState } from 'react'
import styled from 'styled-components';
import Button from '../Button';

const WidgetContainer = styled.div`
  user-select: none;
  width: 100%;
  box-shadow: 0px 5px 5px -3px rgba(0,0,0,.2), 0px 8px 10px 1px rgba(0,0,0, .14), 0px 3px 14px 2px rgba(0,0,0, .12);
  border-radius: 8px;
  background: ${props => props.columnBg || "transparent"};
  color: ${props => props.textColor || "transparent"};
  position: relative;
  margin-bottom: 1.6rem;
`;

const WidgetHeader = styled.div`
  padding: 0.8rem;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  transition: all 200ms ease-out 0s;
  &:hover {
    background: ${props => props.menuBgHover || "transparent"};
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
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
  color: ${props => props.textColor || "transparent"};
  margin-bottom: 0;
  transition: all 200ms ease-out 0s;
  &:before {
    width: 0.8rem;
    height: 0.8rem;
    content: '';
    background: ${props => props.activePresence || "transparent"};
    position: absolute;
    top: 50%;
    left: 0.8rem;
    transform: translateY(-50%);
  }
  &:hover {
    background: ${props => props.hoverItem || "transparent"};
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

const WidgetListItemActive= styled(WidgetListItem)`
  background: ${props => props.activeItem || "transparent"};
  color: ${props => props.activeItemText || "transparent"};
  transition: all 200ms ease-out 0s;
  &:hover {
    background: ${props => props.activeItem || "transparent"};
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
  background: ${props => props.mentionBadge || "transparent"};
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

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess('Copied!');
  };

  return (
    <div {...props} key={props.title}>
      <WidgetContainer {...props}>
        <WidgetHeader {...props}>
          <WidgetTitle {...props}>
            {props.title}
          </WidgetTitle>
        </WidgetHeader>
        <WidgetBody {...props}>
          <WidgetList {...props}>
            <WidgetListItemActive {...props}>
              <WidgetText {...props} />
            </WidgetListItemActive>
            <WidgetListItem {...props}>
              <WidgetText {...props} />
              <WidgetMention {...props} />
            </WidgetListItem>
            <WidgetListItem {...props}>
              <WidgetText {...props} />
            </WidgetListItem>
          </WidgetList>
        </WidgetBody>
      </WidgetContainer>
      <ButtonBlock {...props} onClick={copyToClipboard}>
       Copy {props.title}
      </ButtonBlock>
      <CopyInput {...props}
        ref={textAreaRef}
        value={`${props.title} Theme -- ${props.columnBg},${props.menuBgHover},${props.activeItem},${props.activeItemText},${props.hoverItem},${props.textColor},${props.activePresence},${props.mentionBadge}`}
      />
    </div>
  )
}

export default SlackWidget;