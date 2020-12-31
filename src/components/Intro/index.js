import React from 'react';
import Logo from '../Logo'
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
      <p className="mt-4">How to:</p>
      <ul className="list-inside list-decimal mt-4 p-4 bg-gray-100 dark:bg-gray-900 rounded-md mb-8">
        <li className="text-lg mb-3">Copy a theme</li>
        <li className="text-lg mb-3">Paste in a Slack Channel</li>
        <li className="text-lg">Click the <span className="inline-block py-1 px-2 border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 font-bold text-xs rounded-md">Switch sidebar Theme</span> button that Slack generates for you.</li>
      </ul>
    </>
  )
};

export default Intro;