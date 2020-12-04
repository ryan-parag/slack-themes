import React, { useEffect, useState } from "react"
import Layout from '../components/Layout'
import Intro from '../components/Intro'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import ThemeList from '../components/ThemeList'
import firebase from '../data/firebase'
import Drawer from '../components/Drawer'
import { motion } from 'framer-motion'
import { Loader, Search } from 'react-feather'

export default function Home() {
  const [loadedThemes, setLoadedThemes] = useState([])
  const [filteredThemes, setFilteredThemes] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('theme_name')
  const [order, setOrder] = useState('asc')

  const [themeLabel, setThemeLabel] = useState(true)
  const [neutralNav, setNeutralNav] = useState(true)
  const [drawerState, setDrawerState] = useState(false)

  const updateQuery = (string) => {
    setQuery(string)
  }

  useEffect(() => {
    setLoading(true)
    firebase.firestore().collection('themes').orderBy(sort, order).onSnapshot(snapshot => {
      const fetchedThemes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      switch (query) {
        case 'dark':
          setFilteredThemes(fetchedThemes.filter(item => item.categories.dark))
          break;
        case 'light':
          setFilteredThemes(fetchedThemes.filter(item => item.categories.light))
          break;
        case 'red':
          setFilteredThemes(fetchedThemes.filter(item => item.categories.red))
          break;
        case 'blue':
          setFilteredThemes(fetchedThemes.filter(item => item.categories.blue))
          break;
        case 'green':
          setFilteredThemes(fetchedThemes.filter(item => item.categories.green))
          break;
        case 'purple':
          setFilteredThemes(fetchedThemes.filter(item => item.categories.purple))
          break;
        case 'yellow':
          setFilteredThemes(fetchedThemes.filter(item => item.categories.yellow))
          break;
        case 'pink':
          setFilteredThemes(fetchedThemes.filter(item => item.categories.pink))
          break;
        case 'orange':
          setFilteredThemes(fetchedThemes.filter(item => item.categories.orange))
          break;
        case 'brand':
          setFilteredThemes(fetchedThemes.filter(item => item.categories.brand))
          break;
        case 'racing':
          setFilteredThemes(fetchedThemes.filter(item => item.categories.racing))
          break;
        case 'syntax':
          setFilteredThemes(fetchedThemes.filter(item => item.categories.syntax))
          break;
        case 'minimal':
          setFilteredThemes(fetchedThemes.filter(item => item.categories.minimal))
          break;
        case 'material':
          setFilteredThemes(fetchedThemes.filter(item => item.categories.material))
          break;
        default:
          setFilteredThemes(fetchedThemes)
      }
    })
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [query, sort, order])

  const toggleThemeLabel = () => {
    setThemeLabel(!themeLabel)
  }

  const toggleNeutralNav = () => {
    setNeutralNav(!neutralNav)
  }

  const toggleDrawerState = () => {
    setDrawerState(!drawerState)
  }

  return (
    <Layout>
      {
        drawerState ? (
          <Drawer
          toggleDrawerState={toggleDrawerState}
          themeLabel={themeLabel}
          neutralNav={neutralNav}
          toggleNeutralNav={toggleNeutralNav}
          toggleThemeLabel={toggleThemeLabel}
          />
        )
        :
        null
      }
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row mx-4 md:mx-auto lg:mx-auto xl:mx-auto 2xl:mx-auto py-8 md:py-9">
          <div className="w-full lg:w-1/3 lg:px-4 h-3/6 lg:sticky top-8 lg:top-9">
            <Intro
              toggleDrawerState={toggleDrawerState}
            />
          </div>
          <div className="w-full lg:w-2/3 lg:px-8">
            <div className="flex mb-4 justify-between">
              <div className="text-sm text-gray-500">Filter by category:</div>
            </div>
            <Categories
              activeQuery={query}
              updateQuery={updateQuery}
            />
            <div className="flex justify-between">
              <div className="inline-flex items-center">
                <span className="text-sm text-gray-500">Sort by:</span>
                <button
                  className={`transition focus:outline-none ${sort === 'theme_name' ? 'font-semibold' : 'text-gray-400 hover:text-gray-600'} ml-4 mr-4`}
                  onClick={() => setSort('theme_name')}
                >
                    Name
                </button>
                <button
                  className={`transition focus:outline-none ${sort === 'likes' ? 'font-semibold' : 'text-gray-400 hover:text-gray-600'}`}
                  onClick={() => setSort('likes')}
                >
                  Likes
                </button>
              </div>
              <button
                className="transition text-gray-400 focus:outline-none hover:text-gray-700"
                onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
              >
                {
                  order === 'asc' ? 
                    (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                      </svg>
                    )
                    :
                    (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                      </svg>
                    )
                }
              </button>
            </div>
            {
              filteredThemes.length > 0 && !loading ? (
                <ThemeList
                  data={filteredThemes}
                  neutralNav={neutralNav}
                  themeLabel={themeLabel}
                />
              )
              :
              (
                <div className="rounded-md text-center bg-gray-100 p-8 mt-4">
                  {
                    loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ ease: "linear", duration: 1, loop: Infinity }}
                        className="inline-block p-3 mb-4 bg-gray-200 text-gray-800 rounded-full"
                      >
                        <Loader/>
                      </motion.div>
                    )
                    : (
                      <div className="inline-block p-3 mb-4 bg-gray-200 text-gray-800 rounded-full">
                        <Search/>
                      </div>
                    )
                  }
                  <h4>{loading ? 'Loading...' : 'No Results'}</h4>
                </div>
              )
            }
          </div>
        </div>
        <Footer/>
      </div>
    </Layout>
  );
}