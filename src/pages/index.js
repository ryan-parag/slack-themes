import React, { useEffect, useState } from "react"
import Layout from '../components/Layout'
import Intro from '../components/Intro'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import ThemeList from '../components/ThemeList'
import firebase from '../data/firebase'
import Drawer from '../components/Drawer'
import { motion } from 'framer-motion'
import { Loader, Search , Sliders} from 'react-feather'
import { useRouter } from 'next/router'
import EmptyState from '../components/EmptyState'

export default function Home() {

  const router = useRouter()

  const initialQuery = router.query.filter
  const initialSort = router.query.sort
  const initialOrder = router.query.order

  const [filteredThemes, setFilteredThemes] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState(initialQuery ? initialQuery : '')
  const [sort, setSort] = useState(initialSort ? initialSort : 'theme_name')
  const [order, setOrder] = useState(initialOrder ? initialOrder : 'asc')
  //const [query, setQuery] = useState('')
  //const [sort, setSort] = useState('theme_name')
  //const [order, setOrder] = useState('asc')
  const [queryAmount, setQueryAmount] = useState(27)
  const [dataSize, setDataSize] = useState(null)

  const [themeLabel, setThemeLabel] = useState(true)
  const [neutralNav, setNeutralNav] = useState(true)
  const [drawerState, setDrawerState] = useState(false)

  const updateQuery = (string) => {
    setQuery(string)
    setQueryAmount(27)
  }

  const updateQueryAmount = () => {
    setQueryAmount(prev => prev + 27)
  }

  const changeSort = (sort) => {
    setSort(sort)
  }

  const changeOrder = (order) => {
    setOrder(order)
  }

  const toggleThemeLabel = () => {
    setThemeLabel(!themeLabel)
  }

  const toggleNeutralNav = () => {
    setNeutralNav(!neutralNav)
  }

  const toggleDrawerState = () => {
    setDrawerState(!drawerState)
  }

  useEffect(() => {

    router.push(`/?order=${order}&sort=${sort}${query !== '' ? `&filter=${query}` : ''}`, undefined, { shallow: true })

    setLoading(true)
      if(query !== '') {
        firebase.firestore().collection('themes').limit(queryAmount).where('groups', 'array-contains', query).orderBy(sort, order).onSnapshot(snapshot => {
          const fetchedThemes = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))
          setFilteredThemes(fetchedThemes)
        })
        firebase.firestore().collection('themes').where('groups', 'array-contains', query).onSnapshot(snapshot => {
          const fetchedThemes = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))
          setDataSize(fetchedThemes.length)
        })
      } else {
        firebase.firestore().collection('themes').limit(queryAmount).orderBy(sort, order).onSnapshot(snapshot => {
          const fetchedThemes = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))
          setFilteredThemes(fetchedThemes)
        })
        firebase.firestore().collection('themes').onSnapshot(snapshot => {
          const fetchedThemes = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))
          setDataSize(fetchedThemes.length)
        })
      }
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [query, sort, order, queryAmount])

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
              <div className="text-sm text-gray-500 dark:text-gray-400">Filter by category:</div>
            </div>
            <Categories
              activeQuery={query}
              updateQuery={updateQuery}
            />
            <div className="flex justify-between mt-4 md:md-0">
              <div className="inline-flex items-start">
                <span className="text-sm inline-block pt-0.5 text-gray-500 dark:text-gray-400">Sort by:</span>
                <button
                  className={`transition pb-0.5 border-b-2 focus:outline-none ${sort === 'theme_name' ? 'font-semibold border-current' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 border-transparent'} ml-4 mr-4`}
                  onClick={() => changeSort('theme_name')}
                >
                    Name
                </button>
                <button
                  className={`transition pb-0.5 border-b-2 focus:outline-none ${sort === 'likes' ? 'font-semibold border-current' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 border-transparent'}`}
                  onClick={() => changeSort('likes')}
                >
                  Likes
                </button>
              </div>
              <div className="inline-flex items-center">
              <button
                  className={`transition pb-0.5 border-b-2 focus:outline-none ${order === 'desc' ? 'border-current' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 border-transparent'} mr-4`}
                  onClick={() => changeOrder('desc')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                  </svg>
                </button>
                <button
                className={`transition pb-0.5 border-b-2 focus:outline-none ${order === 'asc' ? 'border-current' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 border-transparent'} mr-4`}
                  onClick={() => changeOrder('asc')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                  </svg>
                </button>
                <button
                  className="transition text-gray-400 dark:text-gray-500 focus:outline-none hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={toggleDrawerState}
                >
                  <Sliders size={'24'}/>
                </button>
              </div>
            </div>
            {
              filteredThemes.length ? (
                <ThemeList
                  data={filteredThemes}
                  neutralNav={neutralNav}
                  themeLabel={themeLabel}
                  updateQueryAmount={updateQueryAmount}
                  dataSize={dataSize}
                  loading={loading}
                />
              )
              :
              (
                <EmptyState
                  loading={loading}
                />
              )
            }
          </div>
        </div>
        <Footer/>
      </div>
    </Layout>
  );
}