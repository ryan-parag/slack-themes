import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  text-align: center;
  font-size: 1.4rem;
  width: 100%;
  padding: 1.6rem 1.6rem 3.2rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <span>
        Designed and Developed by <a href="https://grapalab.com" target="_blank">Ryan Parag</a>
      </span>
    </FooterContainer>
  )
}

export default Footer;