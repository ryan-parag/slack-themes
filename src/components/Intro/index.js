import React from 'react';
import Logo from '../Logo'
import Box from '../Box'
import Link from 'next/link'
import Navigation from '../Navigation'

const Intro = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <Link href="/">
          <a><Logo/></a>
        </Link>
      </div>
      <Navigation active={'Explore'}/>
      <h1 className="mt-8">Pick a theme for Slack</h1>
      <p className="font-bold mt-4">Having trouble keeping track of all of your Slack workspaces?</p>
      <p className="mt-4">Choose and copy one of the themes in the list to personalize a Slack workspace.</p>
      <p className="mt-4 mb-4">How to:</p>
      <Box marginBottom={'8'}>
        <ul className="list-inside list-decimal mb-4">
          <li className="text-lg mb-3">Copy a theme</li>
          <li className="text-lg mb-3">Paste in a Slack Channel</li>
          <li className="text-lg">Click the <span className="inline-block py-1 px-2 border border-gray-400 dark:border-white dark:border-opacity-20 bg-white dark:bg-opacity-10 font-bold text-xs rounded-md">Switch sidebar Theme</span> button that Slack generates for you.</li>
        </ul>
        <Link href="/about">
          <a className="button button--secondary inline-flex">
            View instructions
          </a>
        </Link>
      </Box>
    </>
  )
};

export default Intro;