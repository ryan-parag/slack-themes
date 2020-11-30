import React, { useEffect, useState } from "react"
import Layout from '../components/Layout'
import Link from 'next/link'
import Logo from '../components/Logo'
import { Edit2, GitHub, FileText } from 'react-feather'

export default function SubmitTheme() {
  return(
    <Layout>
      <div className="flex flex-col lg:flex-row mx-4 md:mx-auto lg:mx-auto xl:mx-auto 2xl:mx-auto py-8 md:py-9">
        <div className="w-full lg:w-1/3 lg:px-4 h-3/6 lg:sticky top-8 lg:top-9 mb-16">
          <Link href="/">
            <a>
              <Logo/>
            </a>
          </Link>
          <h1 className="mt-16 mb-4">Submit a Theme</h1>
          <p>
            Don't see a theme in the list? Have an idea to add to the site? Use the links to contribute or submit a Slack theme you would like to submit!
          </p>
          <p className="mt-4">
            Designed and Developed by <a className="link" href="https://ryanparag.com" target="_blank">Ryan Parag</a> and <a className="link" href="https://matt-broughton.com/" target="_blank">Matthew Broughton</a>
          </p>
        </div>
        <div className="w-full lg:w-2/3 lg:px-8">
          <div className="flex mb-4">
            <Link href="/">
              <a className="link">
                &larr; Back Home
              </a>
            </Link>
            <span className="mr-2 ml-4">/</span>
            <strong>Submit a Theme</strong>
          </div>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSchqy0ZxM083CPp2fsOfITKszjsNRDPH6T4chhm7f8QHldxPQ/viewform"
            target="_blank"
            className="flex transition p-4 mb-4 rounded-md border border-gray-200 shadow hover:shadow-lg"
          >
            <div>
              <div className="rounded-full inline-block p-4 bg-red-100 text-red-500">
                <Edit2/>
              </div>
            </div>
            <div className="pl-4">
              <h4 className="mb-4">Submit a Theme</h4>
              <p>Don't see a theme in the list? Use the form to enter the HEX color codes of a Slack theme you would like to submit!</p>
            </div>
          </a>
          <a
            href="https://github.com/ryan-parag/slack-themes"
            target="_blank"
            className="flex transition p-4 mb-4 rounded-md border border-gray-200 shadow hover:shadow-lg"
          >
            <div>
              <div className="rounded-full inline-block p-4 bg-blue-100 text-blue-500">
                <GitHub/>
              </div>
            </div>
            <div className="pl-4">
              <h4 className="mb-4">Want to contribute?</h4>
              <p className="mb-4">Are you a designer or developer? Do you have an idea to add to this site or want to chip in with design updates? Hop in on the fun if you'd like to learn as well!</p>
              <p>We're always looking for designers/developers to help out with wireframes / mockups / prototypes / code - send us a message through email or provide some design updates through the GitHub repo.</p>
            </div>
          </a>
          <div className="flex p-4 rounded-md border border-gray-200 bg-gray-100">
            <div>
              <div className="rounded-full inline-block p-4 bg-gray-200 text-gray-500">
                <FileText/>
              </div>
            </div>
            <div className="pl-4 w-full">
              <h4 className="mb-4">Colophon</h4>
              <p className="mb-4">This site was made with:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <ul className="list-inside list-disc w-full">
                <li>React</li>
                <li>Next.js</li>
                <li>Tailwind.css</li>
                <li>Styled components</li>
              </ul>
              <ul className="list-inside list-disc w-full">
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