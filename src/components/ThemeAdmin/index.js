import React, { useState } from 'react'
import { Search } from 'react-feather';
import Modal from '../Modal'
import ThemeUpdateItem from '../ThemeUpdateItem'

const DeleteModal = ({showModal, setShowModal, confirmModal, theme}) => {

  const [inputName ,setInputName] = useState('')
  const [error ,setError] = useState(false)

  const handleInput = (e) => {
    setInputName(e.target.value)
  } 

  const validateConfirm = () => {
    if(inputName === theme.theme_name) {
      setInputName('')
      setError(false)
      setShowModal(false)
      confirmModal()
    } else {
      setError(true)
    }
  }

  const closeModal = () => {
    setInputName('')
    setError(false)
    setShowModal(false)
  }


  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      validateConfirm()
    }
  }

  return (
    <Modal
      showModal={showModal}
      setShowModal={closeModal}
      confirmModal={validateConfirm}
      confirmText={'Delete'}
      theme={theme}
      danger
    >
      <h3 className="mb-4">Delete <i>{theme.theme_name}</i>?</h3>
      <p className="mb-4">Type the theme name, <strong className="text-red-500">{theme.theme_name}</strong>, to confirm removal from the database:</p>
      <input
        type="text"
        value={inputName}
        onChange={handleInput}
        onKeyPress={handleKeyPress}
        placeholder="Enter theme name..."
        className={`border ${error ? 'border-red-500' : 'border-gray-500'} rounded-md mt-4 py-2 px-4 mb-4 block w-full`}
      />
      {
        error ? (
          <span className="text-sm block mb-2 text-red-500">Hmm... that theme name doesn't match</span>
        )
        :
        null
      }
    </Modal>
  )
}

const ThemeAdmin = ({data}) => {

  const initialTheme = {
    theme_name: '',
    active_item: '',
    active_item_text: '',
    active_presence: '',
    column_bg: '',
    hover_item: '',
    mention_badge: '',
    text_color: '',
    top_nav_bg: '',
    top_nav_text: '',
    categories: {
      dark: false,
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
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const deleteModalToggle = (item) => {
    setSelectedTheme(item)
    setShowDeleteModal(prev => !prev)
  }

  const testConfirm = () => {
    alert('sup')
  }

  const test = (asdf) => {
    console.log(asdf)
  }

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
        {
          data && data.length > 0 ? (
            data.map(theme => (
              <ThemeUpdateItem
                theme={theme}
                onDelete={() => deleteModalToggle(theme)}
                onCheck={() => test}
                key={theme.theme_name}
              />
            ))
          )
          :
          (
            <div className="rounded-md text-center bg-gray-100 p-8 mt-4 col-span-3">
              <div className="inline-block p-3 mb-4 bg-gray-200 text-gray-800 rounded-full">
                <Search/>
              </div>
              <h4>No Results</h4>
            </div>
          )
        }
      </div>
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        confirmModal={testConfirm}
        theme={selectedTheme}
      />
    </>
  )
}

export default ThemeAdmin