import React from 'react';
import Logo from '../Logo'
import { Sliders} from 'react-feather';
import Link from 'next/link'

const Intro = ({toggleDrawerState}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <Link href="/">
          <a><Logo/></a>
        </Link>
        <button
          className="button button--sm"
          onClick={toggleDrawerState}
        >
          <Sliders/>
        </button>
      </div>
      <h1 className="mt-16">Pick a theme for Slack</h1>
      <p className="font-bold mt-4">Having trouble keeping track of all of your Slack workspaces?</p>
      <p className="mt-4">Choose and copy one of the themes in the list to personalize a Slack workspace.</p>
      <p className="mt-4">How to:</p>
      <ul className="list-inside list-decimal mt-4 p-4 bg-gray-100 rounded-md">
        <li className="text-lg mb-3">Copy a theme</li>
        <li className="text-lg mb-3">Paste in a Slack Channel</li>
        <li className="text-lg">Click the <span className="inline-block py-1 px-2 border border-gray-400 bg-white font-bold text-xs rounded-md">Switch sidebar Theme</span> button that Slack generates for you.</li>
      </ul>
      <p className="mt-4 mb-4">
        <small>
          Don't see a theme you're looking for? <Link href="/submit-theme">Submit a theme</Link>.
        </small>
      </p>
    </>
  )
};

export default Intro;