import React, { useState } from 'react'
import { firebaseClient } from '../data/firebase'
import firebase from "firebase/app"
import "firebase/auth"
import Layout from '../components/Layout'
import Link from 'next/link'
import Logo from '../components/Logo'
import { ThemeHeader } from '../components/ThemeAdmin'
import { useRouter } from 'next/router'

export default function Login() {
  firebaseClient()
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()

  const googleProvider = new firebase.auth.GoogleAuthProvider()

  const logInEmail = async () => {
    await firebase
    .auth()
    .signInWithEmailAndPassword(email,pass)
    .then(function() {
      router.push('/dashboard')
    })
    .catch(function (error) {
      const message = error.message
      setError(true)
      setErrorMessage(message)
    })
  }

  const logInEmailKeyPress = (event) => {
    if(event.key === 'Enter'){
      logInEmail()
    }
  }

  const logInGoogle = async () => {
    await firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then(function() {
      router.push('/dashboard')
      console.log('signed in with Google')
    })
    .catch(function (error) {
      const message = error.message
      setError(true)
      setErrorMessage(message)
    })
  }

  const createAccount = async () => {
    await firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then(function() {
      router.push('/dashboard')
    })
    .catch(function (error) {
      const message = error.message
      setError(true)
      setErrorMessage(message)
    })
  }

  return(
    <Layout>
      <ThemeHeader/>
      <div className="flex flex-col lg:flex-row mx-4 md:mx-auto lg:mx-auto xl:mx-auto 2xl:mx-auto py-8 md:py-9 justify-center">
        <div className="w-full lg:w-1/2 2xl:w-1/3 lg:px-4 top-8 mb-16">
          <div className="p-8 rounded-md border border-gray-200 shadow md:mt-16">
            <h1 className="mb-4">Admin Login</h1>
            <p className="text-sm">This section is for admins. Login to edit/add themes that are in the database.</p>
            {
              error ? (
                <div className="mb-4 mt-4 p-4 text-sm bg-red-100 text-red-700 w-full rounded-md">
                  {errorMessage}
                </div>
              )
              :
              null
            }
            <div className="mb-4 mt-4">
              <label htmlFor="emailAddress" className="text-sm font-semibold">Email</label>
              <input
                id="emailAddress"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter your emaill..."
                className="border border-gray-500 mt-2 rounded-md block p-4 w-full"
                onKeyPress={logInEmailKeyPress}
              />
            </div>
            <div className="mb-8">
              <label htmlFor="password" className="text-sm font-semibold">Password</label>
              <input
                id="password"
                type="password"
                onChange={(e) => setPass(e.target.value)}
                placeholder="Password..."
                value={pass}
                className="border border-gray-500 mt-2 rounded-md block p-4 w-full"
                onKeyPress={logInEmailKeyPress}
              />
            </div>
            <button
              className="button button--primary p-4 block w-full cursor-pointer"
              onClick={logInEmail}
              onKeyPress={logInEmailKeyPress}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}