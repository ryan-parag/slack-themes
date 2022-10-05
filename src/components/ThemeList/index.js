import React, { useState } from 'react'
import Filters from '@components/Filters';
import Sort from '@components/Sort';
import Theme from '@components/Theme';
import { X, HelpCircle } from 'react-feather'
import Link from 'next/link'
import Tooltip from '@components/Tooltip';
import Image from 'next/image';

const HelpSnackbar = () => {
  const [open, setOpen] = useState(true)

  return(
    <>
      {
        open && (
          <div className="p-4 shadow-md bg-white dark:bg-zinc-800 rounded-lg col-span-1 md:col-span-3 xl:col-span-4 2xl:col-span-5 border border-black border-opacity-10 dark:border-white dark:border-opacity-10 flex items-start relative">
            <div className="h-12 w-12 hidden lg:inline-flex lg:h-20 lg:w-20 xl:h-24 xl:w-24 relative items-center justify-center relative">
              <Image layout="fill" src="/theme-star.svg" />
            </div>
            <div className="pl-0 pr-8 lg:pr-0 lg:pl-6 flex-1 w-full">
              <h6 className="font-bold mb-2">How to change your Slack theme:</h6>
              <p className='text-sm lg:text-base mb-4 leading-loose'>
                Change your Slack theme by copying &amp; pasting into a Slack channel, and clicking the <span className="py-1 px-2 text-sm border border-black border-opacity-10 bg-black bg-opacity-5 dark:border-white dark:border-opacity-10 dark:bg-white dark:bg-opacity-5 rounded-md mx-1 shadow-sm">Switch sidebar theme</span> button that Slack generates for you
              </p>
              <Link href={'/about#tutorial'}>
                <a className="text-link">
                  View a walkthrough
                </a>
              </Link>
            </div>
            <div className="absolute right-4 top-4">
              <Tooltip tooltipText="Dismiss">
                <button
                  onClick={() => setOpen(false)}
                  className="transition inline-flex p-1 rounded-full bg-black bg-opacity-10 hover:bg-opacity-20 dark:bg-white dark:bg-opacity-10 dark:hover:bg-opacity-20 items-center justify-center"
                >
                  <X size={16}/>
                </button>
              </Tooltip>
            </div>
          </div>
        )
      }
    </>
  )
}

const ThemeList = ({filters, selected, setSelected, copyString, filteredThemes, minimalHeader, changeTheme, sorts, sorting, setSorting}) => {

  return(
    <div className="p-4 xl:p-8 overflow-x-hidden">
      <input style={{ opacity: '0', width: '0', height: '0', position: 'fixed', top: '-9999px', left: '-9999px' }}type="text" value={copyString} readOnly />
      <div className="flex justify-between items-center mb-4">
        <div className="inline-flex items-center">
          <Filters
            filters={filters}
            setSelected={setSelected}
            selected={selected}
          />
          {
            selected !== null && (
              <button className="shadow-md transition ml-2 text-sm py-2.5 lg:py-2 px-3 rounded-md border border-black border-opacity-10 dark:border-white dark:border-opacity-10 hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => setSelected(null)}>Reset</button>
            )
          }
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 pb-16">
        <HelpSnackbar/>
        {
          filteredThemes.map((item,i) => (
            <Theme
              key={item.id}
              theme={item}
              changeTheme={changeTheme}
              minimalHeader={minimalHeader}
              favorite={true}
            />
          ))
        }
      </div>
    </div>
  )
}

export default ThemeList