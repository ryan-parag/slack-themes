import React, { useState, useEffect } from 'react'
import firebase from '../../data/firebase'
import ThemeItem from '../ThemeItem'
import TimeAgo from 'timeago-react'
import { CheckCircle } from 'react-feather'
import Checkbox from '../Checkbox'

const SubmittedItem = ({theme}) => {

  const [themeItem, setThemeItem] = useState(theme)

  const categories = ['Dark', 'Light', 'Red', 'Blue', 'Green', 'Purple', 'Yellow', 'Pink', 'Orange', 'Brand', 'Racing', 'Syntax', 'Minimal', 'Material', 'Community']

  const convertTime = secs => {
    var t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    return t;
  }

  const deleteItem = (event) => {
    event.preventDefault()
    const themeRef = firebase.firestore().collection('submitted')
    themeRef.doc(themeItem.theme_name).delete()
  }

  const addItem = (event) => {
    event.preventDefault()
    const themeRef = firebase.firestore().collection('themes')
    themeRef.doc(themeItem.theme_name).set(themeItem)
    deleteItem(event)
  }

  const removeCategory = (array, item) => {
    let index = array.indexOf(item)
    if(index > -1) {
      array.splice(index, 1)
    }
  }

  const handleChecked = e => {
    const category = categories[e.target.dataset.id].toLowerCase();
    let newCheckedValues = themeItem.groups.filter(item => item !== category);
    if (e.target.checked) newCheckedValues.push(category);
    setThemeItem(prevState => ({...prevState, groups: newCheckedValues}));
    console.log(themeItem)
  };

  useEffect(() => {
    const themeRef = firebase.firestore().collection('submitted')
    themeRef.doc(themeItem.theme_name).update(themeItem)
  }, [themeItem])

  return (
    <div
      className="p-4 shadow border rounded-md"
      key={themeItem.theme_name}
    >
      <div
        className="flex flex-col sm:flex-row"
      >
        <div className="w-full max-w-full sm:max-w-xs">
          <ThemeItem theme={themeItem}/>
        </div>
        <div className="pl-0 sm:pl-4">
          <div className="mb-4">
            <div className="text-xs text-gray-500">Submitted By:</div>
            <div><strong>{themeItem.submittedBy}</strong></div>
          </div>
          <div className="mb-4">
            <div className="text-xs text-gray-500">Date/Time Submitted:</div>
            <div>
              <strong>
                <TimeAgo
                  datetime={convertTime(themeItem.created.seconds)}
                  locale='en_US'
                />
              </strong>
            </div>
          </div>
          <div className="mb-4">
            <div className="text-xs text-gray-500">Categories:</div>
            <div><strong className="text-sm">{themeItem.groups.join(', ')}</strong></div>
          </div>
        </div>
      </div>
      <details>
        <summary className="focus:outline-none text-sm cursor-pointer link">Edit Categories</summary>
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {
            categories.map((item,id) => (
              <label
                key={id}
                className={`text-sm cursor-pointer transition inline-flex items-center p-2 border rounded-md hover:bg-gray-100 ${themeItem.groups.includes(item.toLowerCase()) ? 'bg-green-50' : 'bg-transparent'}`}
              >
                <input type="checkbox" data-id={id} onClick={handleChecked} checked={themeItem.groups.includes(item.toLowerCase())}/>
                <span className={`pl-2 ${themeItem.groups.includes(item.toLowerCase()) ? 'font-semibold' : 'font-normal text-gray-500'}`}>{item}</span>
              </label>
            ))
          }
        </div>
      </details>
      <div className="mt-4 flex flex-row">
        <button
          className="button transition border-transparent bg-red-50 text-red-500 hover:text-white hover:bg-red-500 hover:border-red-500 mr-2 w-full"
          onClick={deleteItem}
        >
          Delete
        </button>
        <button
          className="button button--primary w-full"
          onClick={addItem}
        >
          Verify & Transfer
        </button>
      </div>
    </div>
  )
}

const ThemeAdminSubmitted = () => {

  const [loadedThemes, setLoadedThemes] = useState([])

  useEffect(() => {
    firebase.firestore().collection('submitted').orderBy('created', 'desc').onSnapshot(snapshot => {
      const fetchedThemes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setLoadedThemes(fetchedThemes)
    })
  },[loadedThemes])

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {
          loadedThemes.length > 0 ? (
            loadedThemes.map(theme => (
              <SubmittedItem
                theme={theme}
                key={theme.theme_name}
              />
            ))
          )
          :
          (
            <div className="rounded-md text-center bg-gray-100 p-8 mt-4 col-span-2">
              <div className="inline-block p-3 mb-4 bg-gray-200 text-gray-800 rounded-full">
                <CheckCircle/>
              </div>
              <h4>0 Submitted Themes</h4>
            </div>
          )
        }
      </div>
    </>
  )
}

export default ThemeAdminSubmitted