import React from 'react'
import Header from '../Header'
import ReactGA from 'react-ga'

const Layout = ({children}) => {

  if (typeof window !== "undefined") {
    ReactGA.initialize('UA-63443247-3')
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  return (
    <>
      <Header/>
      <div className="container mx-auto">
        {children}
      </div>
    </>
  )
}

export default Layout