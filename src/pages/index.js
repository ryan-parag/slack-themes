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

  const [themeCount, setThemeCount] = useState(36)
  const [loadedThemes, setLoadedThemes] = useState([])
  const [filteredThemes, setFilteredThemes] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')

  const [themeLabel, setThemeLabel] = useState(true)
  const [neutralNav, setNeutralNav] = useState(true)
  const [drawerState, setDrawerState] = useState(false)

  const getData = (count) => {
    setLoading(true)
    const themeRef = firebase.database().ref("themes");
    themeRef.orderByChild("theme_name")
      /*.limitToFirst(count)*/
      .once("value", (snapshot) => {
        const fetchedThemes = []
        snapshot.forEach(function (childSnapshot) {
          console.log(childSnapshot.val())
          fetchedThemes.push(childSnapshot.val())
        })
        setLoadedThemes(fetchedThemes)
        setFilteredThemes(fetchedThemes)
    })
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  useEffect(() => {
    setTimeout(() => {
      getData(themeCount)
    }, 200)
  }, [themeCount || query])

  const toggleThemeLabel = () => {
    setThemeLabel(!themeLabel)
  }

  const toggleNeutralNav = () => {
    setNeutralNav(!neutralNav)
  }

  const toggleDrawerState = () => {
    setDrawerState(!drawerState)
  }

  const updateQuery = (string) => {
    setQuery(string)
    setLoading(true)
    switch (string) {
      case 'dark':
        setFilteredThemes(loadedThemes.filter(item => item.categories.dark))
        break;
      case 'light':
        setFilteredThemes(loadedThemes.filter(item => item.categories.light))
        break;
      case 'red':
        setFilteredThemes(loadedThemes.filter(item => item.categories.red))
        break;
      case 'blue':
        setFilteredThemes(loadedThemes.filter(item => item.categories.blue))
        break;
      case 'green':
        setFilteredThemes(loadedThemes.filter(item => item.categories.green))
        break;
      case 'purple':
        setFilteredThemes(loadedThemes.filter(item => item.categories.purple))
        break;
      case 'yellow':
        setFilteredThemes(loadedThemes.filter(item => item.categories.yellow))
        break;
      case 'pink':
        setFilteredThemes(loadedThemes.filter(item => item.categories.pink))
        break;
      case 'orange':
        setFilteredThemes(loadedThemes.filter(item => item.categories.orange))
        break;
      case 'brand':
        setFilteredThemes(loadedThemes.filter(item => item.categories.brand))
        break;
      case 'racing':
        setFilteredThemes(loadedThemes.filter(item => item.categories.racing))
        break;
      case 'syntax':
        setFilteredThemes(loadedThemes.filter(item => item.categories.syntax))
        break;
      case 'minimal':
        setFilteredThemes(loadedThemes.filter(item => item.categories.minimal))
        break;
      case 'material':
        setFilteredThemes(loadedThemes.filter(item => item.categories.material))
        break;
      default:
        setFilteredThemes(loadedThemes)
    }
    setTimeout(() => {
      setLoading(false)
    }, 500)
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
            <Categories
              activeQuery={query}
              updateQuery={updateQuery}
            />
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