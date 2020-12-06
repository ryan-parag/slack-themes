import React, { useEffect, useState } from "react"
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
          <Link href="/">
            <a>
              <Logo/>
            </a>
          </Link>
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
            className="flex transition p-4 mb-4 rounded-md border border-gray-200 shadow hover:shadow-lg"
          >
            <div>
              <div className="rounded-full inline-block p-3 bg-blue-100 text-blue-500">
                <GitHub/>
              </div>
            </div>
            <div className="pl-4">
              <h5 className="mb-4">Want to contribute?</h5>
              <p className="mb-4 text-sm leading-6 text-gray-600">Are you a designer or developer? Do you have an idea to add to this site or want to chip in with design updates? Hop in on the fun if you'd like to learn as well!</p>
              <p className="text-sm leading-6 text-gray-600">We're always looking for designers/developers to help out with wireframes / mockups / prototypes / code - send us a message through email or provide some design updates through the GitHub repo.</p>
            </div>
          </a>
          <div className="flex p-4 rounded-md border border-gray-200 bg-gray-100">
            <div>
              <div className="rounded-full inline-block p-3 bg-gray-200 text-gray-500">
                <FileText/>
              </div>
            </div>
            <div className="pl-4 w-full">
              <h5 className="mb-4">Colophon</h5>
              <p className="mb-4 text-sm leading-6 text-gray-600">This site was made with:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <ul className="list-inside list-disc w-full text-sm text-gray-600">
                <li>React</li>
                <li>Next.js</li>
                <li>Tailwind.css</li>
                <li>Styled components</li>
              </ul>
              <ul className="list-inside list-disc w-full text-sm text-gray-600">
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