import React, { useState, useEffect } from 'react'
import firebase from '../../data/firebase'
import { Search } from 'react-feather'

const ListItem = ({theme}) => {

  const [themeItem, setThemeItem] = useState(theme)
  const swatchClass = 'transition transform border border-gray-300 w-4 h-4 rounded-full inline-block mr-2'

  const deleteItem = (event) => {
    event.preventDefault()
    const themeRef = firebase.firestore().collection('themes')
    themeRef.doc(themeItem.theme_name).delete()
  }

  useEffect(() => {

  }, [themeItem])

  return (
    <div className="p-4 rounded-md shadow border border-gray-200 ">
      <div className="flex justify-between">
        <div>
          <p className="mb-2">
            <strong>{themeItem.theme_name}</strong>
          </p>
          <div className="flex mb-2">
            <span className={swatchClass} style={{ background: themeItem.active_item}}></span>
            <span className={swatchClass} style={{ background: themeItem.active_item_text}}></span>
            <span className={swatchClass} style={{ background: themeItem.active_presence}}></span>
            <span className={swatchClass} style={{ background: themeItem.column_bg}}></span>
            <span className={swatchClass} style={{ background: themeItem.hover_item}}></span>
            <span className={swatchClass} style={{ background: themeItem.mention_badge}}></span>
            <span className={swatchClass} style={{ background: themeItem.text_color}}></span>
            <span className={swatchClass} style={{ background: themeItem.top_nav_bg}}></span>
            <span className={swatchClass} style={{ background: themeItem.top_nav_text}}></span>
          </div>
        </div>
        <div>
          <button
            className="button button--danger button--sm opacity-40 hover:opacity-100"
            onClick={deleteItem}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="mt-2 flex justify-between">
        <div className="text-sm">
          <div className="text-gray-500 text-xs">Categories:</div>
          { themeItem.groups.join(", ") }
        </div>
        <div className="inline-flex items-center text-sm">
          <svg height="20" width="20" className="text-gray-300 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          {themeItem.likes}
        </div>
      </div>
    </div>
  )
}

const ThemeAdminList = () => {

  const [filterQuery, setFilterQuery] = useState('')
  const [loadedThemes, setLoadedThemes] = useState([])
  const [filteredThemes, setFilteredThemes] = useState([])

  const handleInput = (e) => {
    setFilterQuery(e.target.value)
  }

  useEffect(() => {
    firebase.firestore().collection('themes').orderBy('theme_name', 'asc').onSnapshot(snapshot => {
      const fetchedThemes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setLoadedThemes(fetchedThemes)
    })

    if(filterQuery.length > 0) {
      const filtered = loadedThemes.filter(theme => {
        return theme.theme_name.toLowerCase().includes(filterQuery.toLowerCase())
      })
      setFilteredThemes(filtered)
    } else {
      setFilteredThemes(loadedThemes)
    }
  },[loadedThemes, filterQuery])

  return (
    <>
      <div className="flex justify-center">
        <input
          name="filterQuery"
          value={filterQuery}
          className="border border-gray-500 rounded-md py-2 px-4 w-full max-w-sm mb-4 text-center text-lg"
          onChange={handleInput}
          placeholder="Filter themes..."
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          filteredThemes.length > 0 ? (
            filteredThemes.map(theme => (
              <ListItem
                theme={theme}
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
              <h4>{filteredThemes.length === 0 ? 'Nothing Found' : 'No Themes in Database'}</h4>
            </div>
          )
        }
      </div>
    </>
  )
}

export default ThemeAdminList