import React from 'react';
import { Badge } from './badge';
import { H2,H5 } from './text';
import Logo from './logo';
import { ContainerItemSmall } from './containerItem';

const Intro = () => {
  return (
    <ContainerItemSmall>
      <Logo />
      <H2>Pick a theme for Slack</H2>
      <H5>Having trouble keeping track of all of your Slack workspaces?</H5>
      <p>Choose and copy one of the themes below to personalize a Slack workspace.</p>
      <p>How to:</p>
      <ol>
        <li>Copy a theme</li>
        <li>Paste in a Slack Channel</li>
        <li>Click the <Badge>Switch sidebar theme</Badge> button that Slack generates for you.</li>
      </ol>
      <p>
        <small>
          Don't see a theme you're looking for? <a href="#" target="_blank">Submit a theme</a>.
          <br />
          Designed and Developed by <a href="#" target="_blank">Ryan Parag</a>
        </small>
      </p>
    </ContainerItemSmall>
  )
}

export default Intro;