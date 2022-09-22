import React, { useState } from 'react'
import Sidebar from "@components/Sidebar"
import Toggle from "@components/Toggle"
import Header from "@components/Header"
import { Toaster } from 'react-hot-toast'

const Layout = ({ children, title, toggleLabel, toggleState, setToggle, actions }) => {

  const [open, setOpen] = useState(false)

  return(
    <div>
      <Toaster
        position="top-right"
      />
      <div className="flex flex-col lg:flex-row h-screen overflow-y-hidden">
        <Header setOpen={setOpen} open={open} />
        <div className="w-64 hidden lg:block">
          <Sidebar/>
        </div>
        {
          open && (
            <div className="w-64 fixed top-0 left-0 bottom-0">
              <Sidebar/>
            </div>
          )
        }
        <div className={`w-full flex-1 overflow-y-hidden h-screen relative ${open && 'translate-x-64'} transition`}>
          <div className="px-4 xl:px-8 h-16 flex items-center justify-between border-b border-black border-opacity-10 dark:border-white dark:border-opacity-10">
            <h1 className="font-bold text-lg">{title}</h1>
            {
              toggleLabel && (
                <div className="inline-flex items-center">
                  <span className={`text-sm pr-3 ${!toggleState && 'opacity-60'}`}>{toggleLabel}</span>
                  <Toggle
                    toggle={toggleState}
                    setToggle={setToggle}
                    toggleLabel={toggleLabel}
                  />
                </div>
              )
            }
            {
              actions && (
                actions
              )
            }
          </div>
          <main className="overflow-y-scroll h-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout