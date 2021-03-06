import React, { useState, useEffect } from "react"
import nookies from "nookies"
import {verifyIdToken} from "../data/admin"
import {firebaseClient} from "../data/firebase"
import firebase from "firebase/app"
import Layout from '../components/Layout'
import { ThemeHeader } from '../components/ThemeAdmin'
import { motion } from 'framer-motion'
import { Loader } from 'react-feather'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ThemeAdminSubmitted from '../components/ThemeAdminSubmitted'
import ThemeAdminList from '../components/ThemeAdminList'

function Dashboard({session}) {
  firebaseClient()
  const [activeTab, setActiveTab] = useState('themes')
  const router = useRouter()

  const changeTab = (tab) => {
    setActiveTab(tab)
    router.push(`/dashboard?${tab}`, undefined, { shallow: true })
  }
  
  const [submissionCount, setSubmissionCount] = useState(0)
  const [themeCount, setThemeCount] = useState(0)

  const signOut = async () => {
    await firebase.auth().signOut()
    router.push('/login')
  }

  useEffect(() => {
    firebase.firestore().collection('submitted').onSnapshot(snapshot => {
      const fetchedThemes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setSubmissionCount(fetchedThemes.length)
    })
    firebase.firestore().collection('themes').onSnapshot(snapshot => {
      const fetchedThemes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setThemeCount(fetchedThemes.length)
    })
  },[submissionCount, themeCount])

  if(session) {
    return (
      <Layout>
        <ThemeHeader loggedIn={signOut} />
        <div className="border-b border-gray-300 dark:border-gray-600 flex w-full justify-center">
          <div className="w-full md:w-1/2 mx-auto text-center">
            <h1>Themes</h1>
            <p className="text-xl mt-4">Edit/Add themes in the database</p>
            <div className="flex border-b mt-8">
              <Link href="/dashboard?themes">
                <a
                  className={`transition w-full focus:outline-none text-center hover:bg-gray-100 dark:hover:bg-gray-900 p-3 ${activeTab === 'themes' ? 'font-bold border-b-2 border-current' : 'border-b border-transparent text-gray-400 dark:text-gray-600 hover:border-current'}`}
                  onClick={() => changeTab('themes')}
                >
                  <div className="flex items-center justify-center">
                    Themes{' '}
                    <span className="text-xs rounded-full ml-2 font-bold bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 inline-flex items-center justify-center px-2 h-6">
                      {themeCount}
                    </span>
                  </div>
                </a>
              </Link>
              <Link href="/dashboard?submitted">
                <a
                  className={`transition w-full focus:outline-none text-center hover:bg-gray-100 dark:hover:bg-gray-900 p-3 ${activeTab === 'submitted' ? 'font-bold border-b-2 border-current' : 'border-b border-transparent text-gray-400 dark:text-gray-600 hover:border-current focus:border-current'}`}
                  onClick={() => changeTab('submitted')}
                >
                  <div className="flex items-center justify-center">
                    Submitted{' '}
                    {
                      submissionCount >= 1 ? (
                        <span className="text-xs rounded-full ml-2 font-bold bg-yellow-200 text-yellow-900 dark:bg-yellow-400 dark:text-black inline-flex items-center justify-center px-2 h-6">
                          {submissionCount}
                        </span>
                      )
                      :
                      null
                    }
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="py-8 px-4 md:px-0">
          {
            activeTab === 'themes' ? (
              <ThemeAdminList/>
            )
            :
            null
          }
          {
            activeTab === 'submitted' ? (
              <ThemeAdminSubmitted/>
            )
            :
            null
          }
        </div>
      </Layout>
    )
  } else {
    return (
      <div className="rounded-md text-center bg-gray-100 dark:bg-gray-900 p-8 mt-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ ease: "linear", duration: 1, loop: Infinity }}
          className="inline-block p-3 mb-4 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300 rounded-full"
        >
          <Loader/>
        </motion.div>
        <h4>Loading...</h4>
      </div>
    )
  }
}

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context)
    const token = await verifyIdToken(cookies.token)
    const {uid, email} = token
    return {
      props: { session: `Your email is ${email} and your UID is ${uid}`}
    }
  } catch (err) {
    context.res.writeHead(302, {location: "/login"})
    context.res.end()
    return {props: []}
  }
}

export default Dashboard