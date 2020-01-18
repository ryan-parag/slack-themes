import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: inline-flex;
  align-items: center;
  margin-bottom: 3.2rem;
  user-select: none;
`;

const LogoIcon = styled.div`
  border-radius: 0.4rem;
  width: 3.6rem;
  height: 3.6rem;
  overflow: hidden;
`;

const LogoText = styled.span`
  font-size: 2.1rem;
  font-weight: 900;
  margin-left: 1.2rem;
`;



const Logo = () => {
  return (
    <LogoContainer>
      <LogoIcon>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 80 80" fill="none">
        <g clipPath="url(#clip0)">
          <rect x="0.407715" y="0.407715" width="79.5923" height="79.5923" fill="#050506"/>
          <rect x="40.6287" y="-40.0923" width="28.2388" height="114.157" transform="rotate(45 40.6287 -40.0923)" fill="#CE3A5E"/>
          <rect x="60.5965" y="-20.1245" width="28.2388" height="114.157" transform="rotate(45 60.5965 -20.1245)" fill="#63C4EE"/>
          <rect x="80.5644" y="-0.156631" width="28.2388" height="114.157" transform="rotate(45 80.5644 -0.156631)" fill="#5CB381"/>
          <rect x="100.532" y="19.8112" width="28.2388" height="114.157" transform="rotate(45 100.532 19.8112)" fill="#E4B34B"/>
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="100%" height="100%" fill="white"/>
          </clipPath>
        </defs>
      </svg>
      </LogoIcon>
      <LogoText>Slack Themes</LogoText>
    </LogoContainer>
  )
};

export default Logo;