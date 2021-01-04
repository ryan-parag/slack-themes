import React, { useState, useEffect } from 'react'
import ThemeItem from '../ThemeItem'
import ColorPicker from '../ColorPicker'
import Box from '../Box'
import firebase from '../../data/firebase'
import { Check } from 'react-feather'

const ThemeSubmitForm = () => {

  const initialTheme = {
    theme_name: '',
    active_item: '#5469D4',
    active_item_text: '#FFFFFF',
    active_presence:'#4CAF50',
    column_bg: '#191D27',
    hover_item: '#283040',
    mention_badge: '#F2453D',
    text_color: '#DEE5EE',
    top_nav_bg: '#000000',
    top_nav_text: '#DEE5EE',
    groups: ['community'],
    likes: 0,
    submittedBy: '',
    created: Date.now()
  }

  const [theme, setTheme] = useState(initialTheme)
  const [error, setError] = useState(false)
  const [contactError, setContactError] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInput = (e) => {
    const { name, value } = e.target
    setTheme({
      ...theme,
      [name]: value
    })
  }

  const handlePicker = (target, color) => {
    setTheme({
      ...theme,
      [target]: color
    })
  }

  const copyString = `${theme.column_bg},#121016,${theme.active_item},${theme.active_item_text},${theme.hover_item},${theme.text_color},${theme.active_presence},${theme.mention_badge},${theme.top_nav_bg},${theme.top_nav_text}`

  const handleSubmit = event => {
    event.preventDefault()
    const themeRef = firebase.firestore().collection('submitted')
    if(theme.theme_name.length === 0) {
      setError(true)
    } else if(theme.submittedBy.length === 0) {
      setContactError(true)
    } else {
      themeRef.doc(theme.theme_name).set(theme)
      setError(false)
      setSubmitted(true)
    }
  }

  const resetTheme = () => {
    setTheme(initialTheme)
    setSubmitted(false)
  }

  useEffect(() => {

  }, [theme])

  return (
    <>
      {
        !submitted ? (
          <>
            <Box
              transparent
              padding={'6'}
              marginBottom={'4'}
            >
              <div className="flex justify-between items-center mb-4">
                <h4>Create a New Theme</h4>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
                <div className="lg:col-span-2">
                  <div>
                    <label className="text-sm font-semibold">Theme Name</label>
                    <input
                      className={`border bg-white dark:bg-black ${error ? 'border-red-500' : 'border-gray-500'} rounded-md py-4 px-4 mt-2 mb-2 block w-full`}
                      placeholder="Enter theme name..."
                      value={theme.theme_name}
                      name="theme_name"
                      onChange={handleInput}
                    />
                    { error ? <span className="text-sm block mb-2 text-red-500">A theme requires a name</span> : null}
                    <label className="text-sm font-semibold">Name or Email</label>
                    <input
                      className={`border bg-white dark:bg-black ${contactError ? 'border-red-500' : 'border-gray-500'} rounded-md py-4 px-4 mt-2 mb-2 block w-full`}
                      placeholder="Let us know who you are..."
                      value={theme.submittedBy}
                      name="submittedBy"
                      onChange={handleInput}
                    />
                    <span className={`text-sm block mb-2 ${contactError ? 'text-red-500' : 'text-gray-500'}`}>
                      We won't contact you - we just want to give you credit
                    </span>
                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3 relative">
                      <ColorPicker color={theme.active_item} changeColor={handlePicker} themeTarget={"active_item"}/>
                      <ColorPicker color={theme.active_item_text} changeColor={handlePicker} themeTarget={"active_item_text"}/>
                      <ColorPicker color={theme.active_presence} changeColor={handlePicker} themeTarget={"active_presence"}/>
                      <ColorPicker color={theme.column_bg} changeColor={handlePicker} themeTarget={"column_bg"}/>
                      <ColorPicker color={theme.hover_item} changeColor={handlePicker} themeTarget={"hover_item"}/>
                      <ColorPicker color={theme.mention_badge} changeColor={handlePicker} themeTarget={"mention_badge"}/>
                      <ColorPicker color={theme.text_color} changeColor={handlePicker} themeTarget={"text_color"}/>
                      <ColorPicker color={theme.top_nav_bg} changeColor={handlePicker} themeTarget={"top_nav_bg"}/>
                      <ColorPicker color={theme.top_nav_text} changeColor={handlePicker} themeTarget={"top_nav_text"}/>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="max-w-xs w-full mx-auto mt-8 text-center">
                    <ThemeItem theme={theme}/>
                    <div className="text-xs text-gray-500 mt-2">Preview</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-8">
                <button
                  className="button button--primary button--lg mx-2"
                  onClick={handleSubmit}
                >
                  Submit Theme
                </button>
              </div>
            </Box>
          </>
        )
        :
        (
          <>
            <div
              className="w-full bg-green-100 dark:bg-green-500 dark:bg-opacity-20 text-green-700 dark:text-green-300 p-4 rounded-md max-w-screen-sm mx-auto text-center flex flex-col items-center"
            >
              <div className="rounded-full inline-block p-3 bg-green-500 text-white">
                <Check/>
              </div>
              <h4 className="mb-4 mt-4">Awesome!</h4>
              <p>Your theme was submitted and will be reviewed before being added to the list - be sure to check back!</p>
              <button
                className="button button--primary mt-4"
                onClick={resetTheme}
              >
                Create Another Theme
              </button>
            </div>
          </>
        )
      }
    </>
  )
}

export default ThemeSubmitForm