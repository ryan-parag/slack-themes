import React, { useState, useEffect } from 'react'
import firebase from '../../data/firebase'
import { CheckCircle } from 'react-feather'

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
    <div className="p-4 rounded-md shadow border border-gray-200 flex justify-between">
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
  )
}

const ThemeAdminList = () => {

  const [loadedThemes, setLoadedThemes] = useState([])

  useEffect(() => {
    firebase.firestore().collection('themes').orderBy('theme_name', 'asc').onSnapshot(snapshot => {
      const fetchedThemes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setLoadedThemes(fetchedThemes)
    })
  },[loadedThemes])

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          loadedThemes.length > 0 ? (
            loadedThemes.map(theme => (
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
                <CheckCircle/>
              </div>
              <h4>No Themes in Database</h4>
            </div>
          )
        }
      </div>
    </>
  )
}

export default ThemeAdminList