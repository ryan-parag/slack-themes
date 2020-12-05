import React, { useEffect, useState } from "react"
import Layout from '../components/Layout'
import Link from 'next/link'
import Logo from '../components/Logo'
import { Edit2 } from 'react-feather'
import Navigation from '../components/Navigation'

export default function SubmitTheme() {
  return(
    <Layout>
      <div className="flex flex-col lg:flex-row mx-4 md:mx-auto lg:mx-auto xl:mx-auto 2xl:mx-auto py-8 md:py-9">
        <div className="w-full md:w-2/3 xl:w-1/2 mx-auto lg:px-8">
          <Link href="/">
            <a>
              <Logo/>
            </a>
          </Link>
          <Navigation active={'Submit a Theme'}/>
          <h1 className="mb-4 mt-8">Submit a Theme</h1>
          <p>
            Don't see a theme in the list? Have an idea to add to the site? Use the links to contribute or submit a Slack theme you would like to submit!
          </p>
          <p className="mt-4 mb-8">
            Designed and Developed by <a className="link" href="https://ryanparag.com" target="_blank">Ryan Parag</a> and <a className="link" href="https://matt-broughton.com/" target="_blank">Matthew Broughton</a>
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSchqy0ZxM083CPp2fsOfITKszjsNRDPH6T4chhm7f8QHldxPQ/viewform"
            target="_blank"
            className="flex transition p-4 mb-4 rounded-md border border-gray-200 shadow hover:shadow-lg"
          >
            <div>
              <div className="rounded-full inline-block p-3 bg-red-100 text-red-500">
                <Edit2/>
              </div>
            </div>
            <div className="pl-4">
              <h5 className="mb-4">Submit a Theme</h5>
              <p className="text-sm leading-6 text-gray-600">Don't see a theme in the list? Use the form to enter the HEX color codes of a Slack theme you would like to submit!</p>
            </div>
          </a>
        </div>
      </div>
    </Layout>
  )
}