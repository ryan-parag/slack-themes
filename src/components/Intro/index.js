import React from 'react';
import { Badge } from '../Badge';
import { H2,H5 } from '../Text';
import Logo from '../Logo';
import { ContainerItemSmall } from '../ContainerItem';
import Button from '../Button';

const Intro = (props) => {
  return (
    <ContainerItemSmall>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '3.2rem',
        marginTop: '0.4rem'
      }}>
        <Logo />
        <Button 
          onClick={() => props.showDrawer()}
          style={{
            width: '4.8rem',
            height: '4.8rem',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0'
          }}
        >
          <svg xmlns='http://www.w3.org/2000/svg' fill="currentColor" width='24' height='24' viewBox='0 0 512 512'><title>settings</title><path d='M256,176a80,80,0,1,0,80,80A80.24,80.24,0,0,0,256,176Zm172.72,80a165.53,165.53,0,0,1-1.64,22.34l48.69,38.12a11.59,11.59,0,0,1,2.63,14.78l-46.06,79.52a11.64,11.64,0,0,1-14.14,4.93l-57.25-23a176.56,176.56,0,0,1-38.82,22.67l-8.56,60.78A11.93,11.93,0,0,1,302.06,486H209.94a12,12,0,0,1-11.51-9.53l-8.56-60.78A169.3,169.3,0,0,1,151.05,393L93.8,416a11.64,11.64,0,0,1-14.14-4.92L33.6,331.57a11.59,11.59,0,0,1,2.63-14.78l48.69-38.12A174.58,174.58,0,0,1,83.28,256a165.53,165.53,0,0,1,1.64-22.34L36.23,195.54a11.59,11.59,0,0,1-2.63-14.78l46.06-79.52A11.64,11.64,0,0,1,93.8,96.31l57.25,23a176.56,176.56,0,0,1,38.82-22.67l8.56-60.78A11.93,11.93,0,0,1,209.94,26h92.12a12,12,0,0,1,11.51,9.53l8.56,60.78A169.3,169.3,0,0,1,361,119L418.2,96a11.64,11.64,0,0,1,14.14,4.92l46.06,79.52a11.59,11.59,0,0,1-2.63,14.78l-48.69,38.12A174.58,174.58,0,0,1,428.72,256Z'/></svg>
        </Button>
      </div>
      <H2>Pick a theme for Slack</H2>
      <H5>Having trouble keeping track of all of your Slack workspaces?</H5>
      <p>Choose and copy one of the themes in the list to personalize a Slack workspace.</p>
      <p>How to:</p>
      <ol>
        <li>Copy a theme</li>
        <li>Paste in a Slack Channel</li>
        <li>Click the <Badge>Switch sidebar theme</Badge> button that Slack generates for you.</li>
      </ol>
      <p>
        <small>
          Don't see a theme you're looking for? <a href="https://forms.gle/ko6NiYzx6zEHiGb46" target="_blank">Submit a theme</a>.
        </small>
      </p>
    </ContainerItemSmall>
  )
}

export default Intro;