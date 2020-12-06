import React, { useEffect, useState } from "react"
import Layout from '../components/Layout'
import Link from 'next/link'
import Logo from '../components/Logo'
import firebase from '../data/firebase'
import Navigation from '../components/Navigation'
import ThemeSubmitForm from '../components/ThemeSubmitForm'
import TimeAgo from 'timeago-react'
import Footer from '../components/Footer'

export default function SubmitTheme() {

  const [loadedThemes, setLoadedThemes] = useState([])

  const swatchClass = 'transition transform border border-gray-300 w-4 h-4 rounded-full inline-block mr-2'

  const convertTime = secs => {
    var t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    return t;
  }

  useEffect(() => {
    firebase.firestore().collection('themes').limit(10).where('groups', 'array-contains', 'community').orderBy('created', 'desc').onSnapshot(snapshot => {
      const fetchedThemes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setLoadedThemes(fetchedThemes)
    })
  },[loadedThemes])

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
        <div className="w-full md:w-2/3 xl:w-1/2 mx-auto lg:px-8 mt-8">
          <h5 className="mb-4">Recently Submitted Themes</h5>
          {
            loadedThemes.map(theme => (
              <div className="mb-6 flex w-full">
                <div>
                  {
                    theme.submittedBy !== 'Unknown' ? (
                      <div
                        className={`rounded-full inline-flex w-10 h-10 items-center justify-center bg-white shadow bg-cover text-gray-600 border border-gray-200 font-bold`}
                      >
                        {theme.submittedBy.charAt(0)}
                      </div>
                    )
                    :
                    (
                      <img className="rounded-full w-10 h-10" src="/slackbot.svg"/>
                    )
                  }
                </div>
                <div className="flex flex-col w-full pl-4 mb-2">
                  <p className="text-gray-600 text-sm mb-2">
                    <strong>{theme.submittedBy}</strong> submitted <strong>{theme.theme_name}</strong>!
                  </p>
                  <div className="flex mb-2">
                    <span className={swatchClass} style={{ background: theme.active_item}}></span>
                    <span className={swatchClass} style={{ background: theme.active_item_text}}></span>
                    <span className={swatchClass} style={{ background: theme.active_presence}}></span>
                    <span className={swatchClass} style={{ background: theme.column_bg}}></span>
                    <span className={swatchClass} style={{ background: theme.hover_item}}></span>
                    <span className={swatchClass} style={{ background: theme.mention_badge}}></span>
                    <span className={swatchClass} style={{ background: theme.text_color}}></span>
                    <span className={swatchClass} style={{ background: theme.top_nav_bg}}></span>
                    <span className={swatchClass} style={{ background: theme.top_nav_text}}></span>
                  </div>
                  <small className="text-gray-500 text-xs">
                    <TimeAgo
                      datetime={convertTime(theme.created.seconds)}
                      locale='en_US'
                    />
                  </small>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <Footer/>
    </Layout>
  )
}