import React, { useEffect, useState } from "react"
import Layout from '../components/Layout'
import Link from 'next/link'
import Logo from '../components/Logo'
import { Edit2 } from 'react-feather'
import Navigation from '../components/Navigation'
import ThemeSubmitForm from '../components/ThemeSubmitForm'

export default function SubmitTheme() {
  return(
    <Layout>
      <div className="flex flex-col mx-4 md:mx-auto py-8 md:py-9">
        <div className="w-full md:w-2/3 xl:w-1/2 mx-auto lg:px-8">
          <Link href="/">
            <a>
              <Logo/>
            </a>
          </Link>
          <Navigation active={'Submit a Theme'}/>
          <h1 className="mb-4 mt-8">Submit a Theme</h1>
          <p className="mb-8">
            Don't see a theme in the list and have an idea to add to the site? Use the form to contribute a theme to the list!
          </p>
        </div>
        <div className="w-full md:w-full xl:w-2/3 mx-auto lg:px-8">
          <ThemeSubmitForm/>
        </div>
      </div>
    </Layout>
  )
}