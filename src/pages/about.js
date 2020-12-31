import React from "react"
import Layout from '../components/Layout'
import Link from 'next/link'
import Logo from '../components/Logo'
import { GitHub, FileText } from 'react-feather'
import Navigation from '../components/Navigation'

export default function About() {
  return(
    <Layout>
      <div className="flex flex-col lg:flex-row mx-4 md:mx-auto lg:mx-auto xl:mx-auto 2xl:mx-auto py-8 md:py-9">
        <div className="w-full md:w-2/3 xl:w-1/2 mx-auto lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <Link href="/">
              <a>
                <Logo/>
              </a>
            </Link>
          </div>
          <Navigation active={'About'}/>
          <h1 className="mb-4 mt-8">About</h1>
          <p>
            Beautiful, curated themes to help personalize all of your different Slack workspaces. Thanks for visiting 👍!
          </p>
          <p className="mt-4 mb-8">
            Designed and Developed by <a className="link" href="https://ryanparag.com" target="_blank">Ryan Parag</a> and <a className="link" href="https://matt-broughton.com/" target="_blank">Matthew Broughton</a>
          </p>
          <a
            href="https://github.com/ryan-parag/slack-themes"
            target="_blank"
            className="flex transition p-4 mb-4 rounded-md border border-gray-200 dark:border-white dark:border-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-10 shadow hover:shadow-lg dark:hover:border-opacity-20"
          >
            <div>
              <div className="rounded-full inline-block p-3 bg-blue-100 text-blue-500 dark:bg-blue-500 dark:text-white">
                <GitHub/>
              </div>
            </div>
            <div className="pl-4">
              <h5 className="mb-4">Want to contribute?</h5>
              <p className="mb-4 text-sm leading-6 text-gray-600 dark:text-gray-400">Are you a designer or developer? Do you have an idea to add to this site or want to chip in with design updates? Hop in on the fun if you'd like to learn as well!</p>
              <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">We're always looking for designers/developers to help out with wireframes / mockups / prototypes / code - send us a message through email or provide some design updates through the GitHub repo.</p>
            </div>
          </a>
          <h3 className="mb-4 mt-8">How do I use a theme?</h3>
          <p className="mt-4 mb-8">Follow the step-by-step instructions on how to copy, paste, and implement a theme to your Slack workspace:</p>
          <div className="border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white dark:bg-opacity-10 p-4 rounded-md mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4 pb-4 border-b border-gray-300 dark:border-gray-600">
              <div className="pr-4 w-full">
                <h5 className="mb-4">1. Choose a Theme</h5>
                <p className="text-sm leading-6 text-gray-600 dark:text-gray-400"><Link href="/"><a className="link">Explore</a></Link> from the list of Slack themes and click to copy the HEX code string</p>
              </div>
              <img className="rounded-md block w-full" alt="step 1" src="how-to-1.png"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4 pb-4 border-b border-gray-300 dark:border-gray-600">
              <img className="rounded-md block w-full" alt="step 2" src="how-to-2.png"/>
              <div className="pl-4 w-full">
                <h5 className="mb-4">2. Paste in your Workspace</h5>
                <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">Paste the copied HEX string into any text box in the Slack workspace in which you would like to change themes</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="pr-4 w-full">
                <h5 className="mb-4">3. Change Theme</h5>
                <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">Submit the message in the text box and click the <em>Switch sidebar theme</em> button that Slack generates underneath your posted message</p>
              </div>
              <img className="rounded-md block w-full" alt="step 3" src="how-to-3.png"/>
            </div>
          </div>
          <div className="flex p-4 rounded-md border border-gray-200 bg-gray-100 dark:border-white dark:border-opacity-10 dark:bg-white dark:bg-opacity-10">
            <div>
              <div className="rounded-full inline-block p-3 bg-gray-200 text-gray-500 dark:bg-white dark:text-black">
                <FileText/>
              </div>
            </div>
            <div className="pl-4 w-full">
              <h5 className="mb-4">Colophon</h5>
              <p className="mb-4 text-sm leading-6 text-gray-600 dark:text-gray-400">This site was made with:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <ul className="list-inside list-disc w-full text-sm text-gray-600 dark:text-gray-400">
                <li>React</li>
                <li>Next.js</li>
                <li>Tailwind.css</li>
                <li>Styled components</li>
              </ul>
              <ul className="list-inside list-disc w-full text-sm text-gray-600 dark:text-gray-400">
                <li>PostCSS</li>
                <li>Framer Motion</li>
                <li>Firebase</li>
                <li>Google Forms</li>
              </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}