import React, { useEffect, useState } from "react"
import firebase from '../data/firebase'
import Layout from '../components/Layout'
import Link from 'next/link'
import Logo from '../components/Logo'
import ThemeAdmin from '../components/ThemeAdmin'
import { Plus } from 'react-feather'
import ThemeSubmission from '../components/ThemeSubmission'
import ThemeItem from '../components/ThemeItem'

export default function Admin() {

  const initialVals = {
    pass: '',
    filterQuery: '',
  }

  const [loggedIn, setLoggedIn] = useState(false)
  const [values, setValues] = useState(initialVals)
  const [error, setError] = useState(false)
  const [loadedThemes, setLoadedThemes] = useState([])
  const [filteredThemes, setFilteredThemes] = useState([])
  const [submittedThemes, setSubmittedThemes] = useState([])
  const [activeTab, setActiveTab] = useState('themes')

  const handleInput = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
    if(value.length > 0) {
      const filtered = loadedThemes.filter(theme => {
        return theme.theme_name.toLowerCase().includes(values.filterQuery.toLowerCase())
      })
      setFilteredThemes(filtered)
    } else {
      setFilteredThemes(loadedThemes)
    }
  }

  const getPass = (e) => {
    e.preventDefault();
    const passRef = firebase.database().ref("admin/pass");
    passRef.orderByKey()
      .on("value", (snapshot) => {
        const pass = snapshot.val()
        values.pass === pass ? setLoggedIn(true) : setLoggedIn(false)
        if(values.pass === pass) {
          setLoggedIn(true)
          setError(false)
        } else {
          setLoggedIn(false)
          setError(true)
        }
    })
  }

  const logout = () => {
    setLoggedIn(false)
    setValues({
      ...values,
      pass: ''
    })
  }

  const handleKeypress = e => {
    if (e.keyCode === 13) {
      getPass(e)
    }
  };

  const addModalToggle = () => {
    setShowAddModal(prev => !prev)
  }

  useEffect(() => {
    firebase.firestore().collection('themes').orderBy('theme_name', 'asc').onSnapshot(snapshot => {
      const fetchedThemes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setLoadedThemes(fetchedThemes)
    })

    firebase.firestore().collection('submitted').orderBy('created', 'desc').onSnapshot(snapshot => {
      const fetchedThemes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setSubmittedThemes(fetchedThemes)
    })
  }, [loadedThemes, submittedThemes])

  return(
    <Layout>
      <div className="flex flex-wrap md:flex-row flex-col mx-4 md:mx-auto lg:mx-auto xl:mx-auto 2xl:mx-auto py-8 md:py-9 items-center justify-between">
        <div className="inline-block mb-4 md:mb-0">
          <Logo admin/>
        </div>
        <div className="inline-flex">
          <Link href="/">
            <a className="button mx-2">
              &larr; Back
            </a>
          </Link>
          {
            loggedIn ? (
              <button
                onClick={logout}
                className="button mx-2"
              >
                Sign Out
              </button>
            )
            :
            null
          }
        </div>
      </div>
      <div className="flex flex-col lg:flex-row mx-4 md:mx-auto lg:mx-auto xl:mx-auto 2xl:mx-auto py-8 md:py-9 justify-center">
        <div className={loggedIn ? 'w-full lg:px-4 top-8 mb-16' : 'w-full lg:w-1/3 lg:px-4 top-8 mb-16'}>
          {
            loggedIn ? (
              <>
                <div className="w-full md:w-1/2 mx-auto text-center mb-8 pb-8">
                  <h1>Themes</h1>
                  <p className="text-xl mt-4">Edit/Add themes in the database</p>
                  <span className="text-sm text-gray-500">{filteredThemes.length} theme{filteredThemes.length !== 1 ? 's' : null}</span>
                  <div className="flex border-b mt-4">
                    <button
                      className={`transition w-full focus:outline-none text-center p-3 ${activeTab === 'themes' ? 'font-bold border-b-2 border-current' : 'border-b text-gray-600 hover:border-current'}`}
                      onClick={() => setActiveTab('themes')}
                    >
                      Themes
                    </button>
                    <button
                      className={`transition w-full focus:outline-none text-center p-3 ${activeTab === 'submitted' ? 'font-bold border-b-2 border-current' : 'border-b text-gray-600 hover:border-current'}`}
                      onClick={() => setActiveTab('submitted')}
                    >
                      Submitted
                      {
                        submittedThemes.length > 0 ? (
                          <span className="ml-2 bg-yellow-200 text-xs text-yellow-700 rounded-full inline-flex h-6 w-6 items-center justify-center">
                            {submittedThemes.length}
                          </span>
                        ) : null
                      }
                    </button>
                  </div>
                </div>
                {
                  activeTab === 'themes' ? (
                    <>
                      <div className="flex justify-between items-center mb-4">
                        <input
                          name="filterQuery"
                          value={values.filterQuery}
                          className="border border-gray-500 rounded-md py-2 px-4 mr-2 w-80 md:w-96"
                          onChange={handleInput}
                          placeholder="Filter themes..."
                        />
                        <button
                          className="button button--primary"
                          onClick={addModalToggle}
                        >
                          <Plus/>
                        </button>
                      </div>
                      <ThemeAdmin
                        data={filteredThemes}
                      />
                    </>
                  ) : null
                }
                {
                  activeTab === 'submitted' ? (
                    <div className="mx-auto w-full max-w-xl">
                      {
                        submittedThemes.map(item => (
                          <div className="bg-gray-100 p-4 flex justify-between">
                            <ThemeSubmission theme={item}/>
                            <div className="max-w-xs w-full mx-auto mt-8 text-center">
                              <ThemeItem theme={item}/>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  ) : null
                }
              </>
            )
            :
            (
              <div className="p-8 rounded-md border border-gray-200 shadow md:mt-16">
                <h1 className="mb-4">Admin Login</h1>
                <p className="text-sm">This section is for admins. Login to edit/add themes that are in the database.</p>
                <form className="mt-4">
                  <label className="font-semibold">Admin Password</label>
                  <input
                    className="border border-gray-500 mt-2 rounded-md block p-4 w-full mb-4"
                    value={values.pass}
                    onChange={handleInput}
                    onKeyPress={handleKeypress}
                    name="pass"
                    placeholder="Enter password"
                    type="password"
                  />
                  {
                    error ? (
                      <small className="block mb-4 text-red-500">Incorrect Password 😞. Try again</small>
                    )
                    :
                    null
                  }
                  <button
                    className="button button--primary p-4 block w-full cursor-pointer"
                    onClick={getPass}
                    type="submit"
                  >
                    Sign In
                  </button>
                </form>
              </div>
            )
          }
        </div>
      </div>
    </Layout>
  )
}