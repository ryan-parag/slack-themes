import React from 'react'
import Head from 'next/head'

const Header = () => {

  const pageTitle = 'Slack Themes'
  const description = 'Choose and copy one of the themes below to personalize a Slack workspace.'

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="Description" content={description}></meta>
      <meta name="viewport" content="width=device-width, user-scalable=no"></meta>
      <meta property="og:url" content="https://slack-themes.now.sh/"></meta>
      <meta property="og:type" content="website"></meta>
      <meta property="og:title" content={pageTitle}></meta>
      <meta property="og:description" content={description}></meta>
      <title>{pageTitle}</title>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"></link>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"></link>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"></link>
      <link rel="manifest" href="/favicon/site.webmanifest"></link>
      <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5"></link>
      <meta name="msapplication-TileColor" content="#da532c"></meta>
      <meta name="theme-color" content="#ffffff"></meta>
    </Head>
  )
}

export default Header;