import React, { useState } from 'react'
import Sidebar from "@components/Sidebar"
import Toggle from "@components/Toggle"
import Header from "@components/Header"
import { Toaster } from 'react-hot-toast'
import Head from 'next/head'

const Layout = ({ children, title, toggleLabel, toggleState, setToggle, actions }) => {

  const [open, setOpen] = useState(false)

  return(
    <>
      <Head>
        <title>Slack Themes</title>
        <meta name="title" content="Slack Themes"/>
        <meta name="description" content="Beautiful, curated themes to help personalize all of your different Slack workspaces."/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://slack-themes.vercel.app/"/>
        <meta property="og:title" content="Slack Themes"/>
        <meta property="og:description" content="Beautiful, curated themes to help personalize all of your different Slack workspaces."/>
        <meta property="og:image" content="/og.png"/>
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content="https://slack-themes.vercel.app/"/>
        <meta property="twitter:title" content="Slack Themes"/>
        <meta property="twitter:description" content="Beautiful, curated themes to help personalize all of your different Slack workspaces."/>
        <meta property="twitter:image" content="/og.png"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
        <link rel="manifest" href="/favicon/site.webmanifest"/>
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#ffffff"/>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_ID}`}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.GA_ID}', {
            page_path: window.location.pathname,
          });
        `,
          }}
        />
      </Head>
      <div>
        <Toaster
          position="top-right"
        />
        <div className="flex flex-col lg:flex-row h-screen overflow-y-hidden overflow-x-hidden scrollbar-hide">
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
          <div className={`w-full flex-1 overflow-y-hidden scrollbar-hide h-screen relative ${open && 'translate-x-64'} transition`}>
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
            <main className="overflow-y-scroll scrollbar-hide overflow-x-hidden h-full">
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout