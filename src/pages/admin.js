import React, { useEffect, useState } from "react"
import firebase from '../data/firebase'
import Layout from '../components/Layout'
import Link from 'next/link'
import Logo from '../components/Logo'
import Modal from '../components/Modal'
import ThemeAdmin from '../components/ThemeAdmin'
import { Plus } from 'react-feather'

const AddThemeModal = ({showModal, setShowModal, confirmModal}) => {

  const initialTheme = {
    theme_name: '',
    active_item: '#FFFFFF',
    active_item_text: '#FFFFFF',
    active_presence: '#FFFFFF',
    column_bg: '#FFFFFF',
    hover_item: '#FFFFFF',
    mention_badge: '#FFFFFF',
    text_color: '#FFFFFF',
    top_nav_bg: '#FFFFFF',
    top_nav_text: '#FFFFFF',
    categories: {
      dark: true,
      light: false,
      red: false,
      blue: false,
      green: false,
      purple: false,
      pink: false,
      yellow: false,
      orange: false,
      brand: false,
      racing: false,
      syntax: false,
      minimal: false,
      material: false,
    }
  }

  const [selectedTheme, setSelectedTheme] = useState(initialTheme)

  const colorPickerClass = 'flex items-center justify-between px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer'
  const checkboxClass = 'flex items-center justify-between px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer mr-2 mt-2'

  const handleInput = (e) => {
    const { name, value } = e.target
    setSelectedTheme({
      ...selectedTheme,
      [name]: value
    })
  }

  const handleCheck = (e) => {
    const { name } = e.target
    setSelectedTheme(prev => ({
      ...prev,
      categories: { ...prev.categories, [name]: event.target.checked }
    }))
  }

  const addThemeToDB = () => {
    const themeRef = firebase.database().ref("testThemes");
    themeRef.push({
      theme_name: selectedTheme.theme_name,
      active_item: selectedTheme.active_item,
      active_item_text: selectedTheme.active_item_text,
      active_presence: selectedTheme.active_presence,
      column_bg: selectedTheme.column_bg,
      hover_item: selectedTheme.hover_item,
      mention_badge: selectedTheme.mention_badge,
      text_color: selectedTheme.text_color,
      top_nav_bg: selectedTheme.top_nav_bg,
      top_nav_text: selectedTheme.top_nav_text,
      categories: {
        dark: selectedTheme.categories.dark,
        light: selectedTheme.categories.light,
        red: selectedTheme.categories.red,
        blue: selectedTheme.categories.blue,
        green: selectedTheme.categories.green,
        purple: selectedTheme.categories.purple,
        pink: selectedTheme.categories.pink,
        yellow: selectedTheme.categories.yellow,
        orange: selectedTheme.categories.orange,
        brand: selectedTheme.categories.brand,
        racing: selectedTheme.categories.racing,
        syntax: selectedTheme.categories.syntax,
        minimal: selectedTheme.categories.minimal,
        material: selectedTheme.categories.material
      }
    })
    setShowModal(false)
    alert(selectedTheme.theme_name + ' added to database!')
    setSelectedTheme(initialTheme)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedTheme(initialTheme)
  }

  useEffect(() => {
    
  },[selectedTheme])

  return (
    <Modal
      showModal={showModal}
      setShowModal={closeModal}
      confirmModal={addThemeToDB}
      confirmText={'Add Theme'}
    >
      <h3 className="mb-4">Add New Theme?</h3>
      <p>Fill values and add theme to database:</p>
      <form className="mt-2">
        <label className="text-sm font-semibold">Theme Name</label>
        <input
          className="border border-gray-500 rounded-md mt-2 py-2 px-4 mb-2 block w-full"
          placeholder="Enter theme name..."
          value={selectedTheme.theme_name}
          name="theme_name"
          onChange={handleInput}
        />
        <label className="text-sm font-semibold">Colors</label>
        <div className="grid grid-cols-2 gap-y-1 gap-x-2 mb-2 mt-2">
          <label className={colorPickerClass}>
            <span className="text-xs">Active Item</span>
            <input type="color" name="active_item" value={selectedTheme.active_item} onChange={handleInput}/>
          </label>
          <label className={colorPickerClass}>
            <span className="text-xs">Active Item Text</span>
            <input type="color" name="active_item_text" value={selectedTheme.active_item_text} onChange={handleInput}/>
          </label>
          <label className={colorPickerClass}>
            <span className="text-xs">Active Presence</span>
            <input type="color" name="active_presence" value={selectedTheme.active_presence} onChange={handleInput}/>
          </label>
          <label className={colorPickerClass}>
            <span className="text-xs">Column BG</span>
            <input type="color" name="column_bg" value={selectedTheme.column_bg} onChange={handleInput}/>
          </label>
          <label className={colorPickerClass}>
            <span className="text-xs">Hover Item</span>
            <input type="color" name="hover_item" value={selectedTheme.hover_item} onChange={handleInput}/>
          </label>
          <label className={colorPickerClass}>
            <span className="text-xs">Mention Badge</span>
            <input type="color" name="mention_badge" value={selectedTheme.mention_badge} onChange={handleInput}/>
          </label>
          <label className={colorPickerClass}>
            <span className="text-xs">Text Color</span>
            <input type="color" name="text_color" value={selectedTheme.text_color} onChange={handleInput}/>
          </label>
          <label className={colorPickerClass}>
            <span className="text-xs">Top Nav BG</span>
            <input type="color" name="top_nav_bg" value={selectedTheme.top_nav_bg} onChange={handleInput}/>
          </label>
          <label className={colorPickerClass}>
            <span className="text-xs">Top Nav Text</span>
            <input type="color" name="top_nav_text" value={selectedTheme.top_nav_text} onChange={handleInput}/>
          </label>
        </div>
        <label className="text-sm font-semibold">Categories</label>
        <div className="flex flex-wrap">
          <label className={checkboxClass}>
            <input type="checkbox" name="dark" checked={selectedTheme.categories.dark ? 'checked' : false} onChange={handleCheck}/>
            <span className="text-xs ml-2">Dark</span>
          </label>
          <label className={checkboxClass}>
            <input type="checkbox" name="light" checked={selectedTheme.categories.light} onChange={handleCheck}/>
            <span className="text-xs ml-2">Light</span>
          </label>
          <label className={checkboxClass}>
            <input type="checkbox" name="red" checked={selectedTheme.categories.red} onChange={handleCheck}/>
            <span className="text-xs ml-2">Red</span>
          </label>
          <label className={checkboxClass}>
            <input type="checkbox" name="blue" checked={selectedTheme.categories.blue} onChange={handleCheck}/>
            <span className="text-xs ml-2">Blue</span>
          </label>
          <label className={checkboxClass}>
            <input type="checkbox" name="green" checked={selectedTheme.categories.green} onChange={handleCheck}/>
            <span className="text-xs ml-2">Green</span>
          </label>
          <label className={checkboxClass}>
            <input type="checkbox" name="purple" checked={selectedTheme.categories.purple} onChange={handleCheck}/>
            <span className="text-xs ml-2">Purple</span>
          </label>
          <label className={checkboxClass}>
            <input type="checkbox" name="pink" checked={selectedTheme.categories.pink} onChange={handleCheck}/>
            <span className="text-xs ml-2">Pink</span>
          </label>
          <label className={checkboxClass}>
            <input type="checkbox" name="yellow" checked={selectedTheme.categories.yellow} onChange={handleCheck}/>
            <span className="text-xs ml-2">Yellow</span>
          </label>
          <label className={checkboxClass}>
            <input type="checkbox" name="orange" checked={selectedTheme.categories.orange} onChange={handleCheck}/>
            <span className="text-xs ml-2">Orange</span>
          </label>
          <label className={checkboxClass}>
            <input type="checkbox" name="brand" checked={selectedTheme.categories.brand} onChange={handleCheck}/>
            <span className="text-xs ml-2">Brand</span>
          </label>
          <label className={checkboxClass}>
            <input type="checkbox" name="racing" checked={selectedTheme.categories.racing} onChange={handleCheck}/>
            <span className="text-xs ml-2">Racing</span>
          </label>
          <label className={checkboxClass}>
            <input type="checkbox" name="syntax" checked={selectedTheme.categories.syntax} onChange={handleCheck}/>
            <span className="text-xs ml-2">Syntax</span>
          </label>
          <label className={checkboxClass}>
            <input type="checkbox" name="minimal" checked={selectedTheme.categories.minimal} onChange={handleCheck}/>
            <span className="text-xs ml-2">Minimal</span>
          </label>
          <label className={checkboxClass}>
            <input type="checkbox" name="material" checked={selectedTheme.categories.material} onChange={handleCheck}/>
            <span className="text-xs ml-2">Material</span>
          </label>
        </div>
      </form>
    </Modal>
  )
}

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
  const [showAddModal, setShowAddModal] = useState(false)

  const handleInput = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const getData = (count) => {
    const themeRef = firebase.database().ref("themes");
    themeRef.orderByKey()
      /*.limitToFirst(count)*/
      .once("value", (snapshot) => {
        const themes = snapshot.val()
        const fetchedThemes = []
        for(let id in themes) {
          fetchedThemes.push(themes[id])
        }
        setLoadedThemes(fetchedThemes)
        setFilteredThemes(fetchedThemes)
    })
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
          getData(10)
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
    if(values.filterQuery.length > 0) {
      const filtered = loadedThemes.filter(theme => {
        return theme.theme_name.toLowerCase().includes(values.filterQuery.toLowerCase())
      })
      setFilteredThemes(filtered)
    } else {
      setFilteredThemes(loadedThemes)
    }
  }, [values.filterQuery])

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
                <div className="w-full md:w-1/2 mx-auto text-center mb-8 border-b pb-8">
                  <h1>Themes</h1>
                  <p className="text-xl mt-4">Edit/Add themes in the database</p>
                  <span className="text-sm text-gray-500">{filteredThemes.length} theme{filteredThemes.length !== 1 ? 's' : null}</span>
                </div>
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
      <AddThemeModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        confirmModal={() => console.log('sup')}
      />
    </Layout>
  )
}