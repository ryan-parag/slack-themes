import React, { useState } from "react"
import nookies from "nookies"
import {verifyIdToken} from "../data/admin"
import {firebaseClient} from "../data/firebase"
import firebase from "firebase/app"
import Layout from '../components/Layout'
import { ThemeHeader } from '../components/ThemeAdmin'
import { motion } from 'framer-motion'
import { Loader } from 'react-feather'

function Dashboard({session}) {
  firebaseClient()
  const [activeTab, setActiveTab] = useState('themes')
  console.log(session)

  const signOut = async () => {
    await firebase.auth().signOut()
    window.location.href = '/login'
   }

  if(session) {
    return (
      <Layout>
        <ThemeHeader loggedIn={signOut} />
        <div className="border-b border-gray-300 flex w-full justify-center">
          <div className="w-full md:w-1/2 mx-auto text-center">
            <h1>Themes</h1>
            <p className="text-xl mt-4">Edit/Add themes in the database</p>
            <div className="flex border-b mt-8">
              <button
                className={`transition w-full focus:outline-none text-center hover:bg-gray-100 p-3 ${activeTab === 'themes' ? 'font-bold border-b-2 border-current' : 'border-b border-transparent text-gray-600 hover:border-current'}`}
                onClick={() => setActiveTab('themes')}
              >
                Themes
              </button>
              <button
                className={`transition w-full focus:outline-none text-center hover:bg-gray-100 p-3 ${activeTab === 'submitted' ? 'font-bold border-b-2 border-current' : 'border-b border-transparent text-gray-600 hover:border-current focus:border-current'}`}
                onClick={() => setActiveTab('submitted')}
              >
                Submitted
              </button>
            </div>
          </div>
        </div>
        <div className="py-8 px-4 md:px-0">
          {
            activeTab === 'themes' ? (
              <div className="bg-pink-100 text-pink-900 p-8 rounded-md block text-center w-full">
                THEMES TODO
              </div>
            )
            :
            null
          }
          {
            activeTab === 'submitted' ? (
              <div className="bg-yellow-100 text-yellow-900 p-8 rounded-md block text-center w-full">
                SUBMITTED TODO
              </div>
            )
            :
            null
          }
        </div>
      </Layout>
    )
  } else {
    return (
      <div className="rounded-md text-center bg-gray-100 p-8 mt-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ ease: "linear", duration: 1, loop: Infinity }}
          className="inline-block p-3 mb-4 bg-gray-200 text-gray-800 rounded-full"
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
    console.log('sup')
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