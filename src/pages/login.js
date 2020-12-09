import React, { useState } from 'react'
import { firebaseClient } from '../data/firebase'
import firebase from "firebase/app"
import "firebase/auth"
import Layout from '../components/Layout'
import Link from 'next/link'
import Logo from '../components/Logo'
import { ThemeHeader } from '../components/ThemeAdmin'

export default function Login() {
  firebaseClient()
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const googleProvider = new firebase.auth.GoogleAuthProvider()

  const logInEmail = async () => {
    await firebase
    .auth()
    .signInWithEmailAndPassword(email,pass)
    .then(function() {
      window.location.href = '/dashboard'
    })
    .catch(function (error) {
      const message = error.message
      setError(true)
      setErrorMessage(message)
    })
  }

  const logInGoogle = async () => {
    await firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then(function() {
      window.location.href = '/dashboard'
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
      window.location.href = '/dashboard'
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
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="text-sm font-semibold">Password</label>
              <input
                id="password"
                type="password"
                onChange={(e) => setPass(e.target.value)}
                placeholder="Password..."
                value={pass}
                className="border border-gray-500 mt-2 rounded-md block p-4 w-full"
              />
            </div>
            <button
              className="button button--primary p-4 block w-full cursor-pointer"
              onClick={logInEmail}
            >
              Sign in
            </button>
            <div className="mt-2 mb-2 text-sm text-center text-gray-600">or</div>
            <button
              className="button flex items-center p-4 w-full cursor-pointer"
              onClick={logInGoogle}
            >
              <svg className="w-6 h-6 mr-4" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg"><path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4"/><path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853"/><path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04"/><path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335"/></svg>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}