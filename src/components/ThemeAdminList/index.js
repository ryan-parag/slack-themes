import React, { useState, useEffect } from 'react'
import firebase from '../../data/firebase'
import { Search, Plus, Minus } from 'react-feather'

const ListItem = ({theme}) => {

  const [themeItem, setThemeItem] = useState(theme)
  const swatchClass = 'transition transform border border-gray-300 w-4 h-4 rounded-full inline-block mr-2'

  const deleteItem = (event) => {
    event.preventDefault()
    const themeRef = firebase.firestore().collection('themes')
    themeRef.doc(themeItem.theme_name).delete()
  }

  const addLike = () => {
    let updatedLikes = themeItem.likes + 1
    setThemeItem(prevState => ({...prevState, likes: updatedLikes}));
    console.log(themeItem)
  }

  const removeLike = () => {
    let updatedLikes = themeItem.likes - 1
    setThemeItem(prevState => ({...prevState, likes: updatedLikes}));
    console.log(themeItem)
  }

  useEffect(() => {
    const themeRef = firebase.firestore().collection('themes')
    themeRef.doc(themeItem.theme_name).update(themeItem)
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
            className="button transition text-sm px-2 py-1 border-transparent bg-red-50 text-red-500 hover:text-white hover:bg-red-500 hover:border-red-500"
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
        <div>
          <div className="text-gray-500 text-xs">Likes:</div>
          <div className="inline-flex items-center text-sm">
            {
              themeItem.likes === 0 ? (
                <span className="text-gray-400">None</span>
              )
              :
              (
                <>
                  <svg height="20" width="20" className="text-gray-300 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  {themeItem.likes}
                </>
              )
            }
            <div className="inline-flex items-center ml-2">
              <button 
                className={`transition focus:outline-none p-1 rounded-full ${themeItem.likes > 0 ? 'text-gray-500 hover:text-gray-900 hover:bg-gray-200' : 'text-gray-300 cursor-not-allowed'}`}
                onClick={removeLike}
                disabled={themeItem.likes > 0 ? false : true}
              >
                <Minus size={16}/>
              </button>
              <button
                className="transition p-1 focus:outline-none rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-200"
                onClick={addLike}
              >
                <Plus size={16}/>
              </button>
            </div>
          </div>
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
      <div className="flex justify-between">
        <div className="flex w-full items-center mb-4 flex-col md:flex-row">
          <input
            name="filterQuery"
            value={filterQuery}
            className="border border-gray-500 rounded-md py-2 px-4 w-full max-w-sm text-lg mr-2 mb-2 md:mt-0"
            onChange={handleInput}
            placeholder="Filter themes..."
          />
          {
            filteredThemes.length > 0 ? (
              <span className="text-sm text-gray-500">{filteredThemes.length} result{filteredThemes.length === 1 ? null : 's'}</span>
            )
            :
            null
          }
        </div>
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