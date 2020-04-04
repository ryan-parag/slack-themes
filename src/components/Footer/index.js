import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

const FooterContainer = styled.footer`
  text-align: center;
  font-size: 1.4rem;
  width: 100%;
  padding: 1.6rem 1.6rem 3.2rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>
        Designed and Developed by <a href="https://grapalab.com" target="_blank">Ryan Parag</a> and <a href="https://matt-broughton.com" target="_blank">Matthew Broughton</a>
      </p>
      <Button>Contribute on GitHub</Button>
    </FooterContainer>
  )
}

export default Footer;