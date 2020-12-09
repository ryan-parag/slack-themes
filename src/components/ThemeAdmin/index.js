import React, { useState, useEffect } from 'react'
import { Search } from 'react-feather';
import Modal from '../Modal'
import ThemeUpdateItem from '../ThemeUpdateItem'
import Link from 'next/link'
import Logo from '../Logo'
import Navigation from '../Navigation'

export const ThemeHeader = ({loggedIn}) => {
  return (
    <div className="flex flex-wrap md:flex-row flex-col mx-4 md:mx-auto lg:mx-auto xl:mx-auto 2xl:mx-auto py-8 md:py-9 items-center justify-between">
      <div className="inline-block mb-4 md:mb-0">
        <Logo admin/>
      </div>
      {
        loggedIn ? (
          <Navigation signOut={loggedIn}/>
        )
        :
        (
          <div className="inline-flex">
            <Link href="/">
              <a className="button mx-2">
                &larr; Back
              </a>
            </Link>
          </div>
        )
      }
    </div>
  )
}

const ThemeAdmin = ({data}) => {

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
        {
          data && data.length > 0 ? (
            data.map(theme => (
              <ThemeUpdateItem
                theme={theme}
                onDelete={() => deleteModalToggle(theme)}
                key={theme.theme_name}
              />
            ))
          )
          :
          (
            <div className="rounded-md text-center bg-gray-100 p-8 mt-4 col-span-3">
              <div className="inline-block p-3 mb-4 bg-gray-200 text-gray-800 rounded-full">
                <Search/>
              </div>
              <h4>No Results</h4>
            </div>
          )
        }
      </div>
    </>
  )
}

export default ThemeAdmin