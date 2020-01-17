import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: inline-flex;
  align-items: center;
`;

const LogoIcon = styled.img`
  border-radius: 0.4rem;
  width: 3.6rem;
  height: 3.6rem;
`;

const LogoText = styled.span`
  font-size: 2.1rem;
  font-weight: 900;
  margin-left: 1.2rem;
`;



const Logo = () => {
  return (
    <LogoContainer>
      <LogoIcon src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/813538/slack-themes-icon.svg" />
      <LogoText>Slack Themes</LogoText>
    </LogoContainer>
  )
};

export default Logo;