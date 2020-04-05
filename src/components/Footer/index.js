import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

const FooterContainer = styled.footer`
  text-align: center;
  font-size: 1.4rem;
  width: 100%;
  padding: 1.6rem 1.6rem 3.2rem;
`;

const FooterLink = styled.a`
  display: inline-flex;
  padding: 0.8rem 1.6rem;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: ${({theme}) => theme.rootColor};
  border: 1px solid;
  border-radius: 0.4rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>
        Designed and Developed by <a href="https://grapalab.com" target="_blank">Ryan Parag</a> and <a href="https://matt-broughton.com" target="_blank">Matthew Broughton</a>
      </p>
      <FooterLink href="https://github.com/ryan-parag/slack-themes" target="_blank">Contribute on GitHub</FooterLink>
    </FooterContainer>
  )
}

export default Footer;