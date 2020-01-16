import React from 'react'
import styled from 'styled-components';

const widgetContainer = styled.div`
  user-select: none;
  width: 100%;
  box-shadow: 0px 5px 5px -3px rgba(black,.2), 0px 8px 10px 1px rgba(black, .14), 0px 3px 14px 2px rgba(black, .12);
  border-radius: 8px
  background: red;
  color: yellow;
  position: relative;
`;

const widgetHeader = styled.div`
  padding: 0.8rem;
  &:hover {
    background: slateblue;
  }
`;

const widgetTitle = styled.div`
  font-size: 1.8rem;
`;

const widgetBody = styled.div`
  padding: 0;
`;

const widgetList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
  background: transparent;
`;

const widgetListItem = styled.li`
  padding: 1.6rem 4rem 1.6rem 2.4rem;
  width: 100%;
  position: relative;
  color: purple;
  margin-bottom: 0;
  &:before {
    width: 0.8rem;
    height: 0.8rem;
    content: '';
    background: grey;
    position: absolute;
    top: 50%;
    left: 0.8rem;
    transform: translateY(-50%);
  }
  &:hover {
    background: tomato;
  }
`;

const widgetListItemActive= styled(widgetListItem)`
  background: black;
  color: white;
`;

const widgetText = styled.span`
  height: 0.8rem;
  background: currentColor;
  display: block;
  opacity: .8;
  border-radius: 999px;
`;

const widgetMention = styled.span`
  height: 1.2rem;
  width: 2.4rem;
  position: absolute;
  top: 50%;
  right: 0.8rem;
  transform: translateY(-50%);
  background: green;
  border-radius: 999px;
`;

const slackWidget = (title) => {
  return (
    <widgetContainer>
      <widgetHeader>
        <widgetTitle>
          title
        </widgetTitle>
      </widgetHeader>
      <widgetBody>
        <widgetList>
          <widgetListItemActive>
            <widgetText />
          </widgetListItemActive>
          <widgetListItem>
            <widgetMention />
          </widgetListItem>
          <widgetListItem>
            <widgetText />
          </widgetListItem>
        </widgetList>
      </widgetBody>
    </widgetContainer>
  )
}

export default slackWidget;