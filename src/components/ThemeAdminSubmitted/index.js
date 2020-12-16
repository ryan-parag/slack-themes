import React, { useState, useEffect } from 'react'
import firebase from '../../data/firebase'
import ThemeItem from '../ThemeItem'
import TimeAgo from 'timeago-react'
import Modal from '../Modal'
import { CheckCircle } from 'react-feather'

const SubmittedItem = ({theme}) => {

  const convertTime = secs => {
    var t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    return t;
  }

  const deleteItem = (event) => {
    event.preventDefault()
    const themeRef = firebase.firestore().collection('submitted')
    themeRef.doc(theme.theme_name).delete()
  }

  const addItem = (event) => {
    event.preventDefault()
    const themeRef = firebase.firestore().collection('themes')
    themeRef.doc(theme.theme_name).set(theme)
    deleteItem(event)
  }

  return (
    <div
      className="p-4 shadow border rounded-md"
      key={theme.theme_name}
    >
      <div
        className="flex flex-col sm:flex-row"
      >
        <div className="w-full max-w-full sm:max-w-xs">
          <ThemeItem theme={theme}/>
        </div>
        <div className="pl-0 sm:pl-4">
          <div className="mb-4">
            <div className="text-xs text-gray-500">Submitted By:</div>
            <div><strong>{theme.submittedBy}</strong></div>
          </div>
          <div className="mb-4">
            <div className="text-xs text-gray-500">Date/Time Submitted:</div>
            <div>
              <strong>
                <TimeAgo
                  datetime={convertTime(theme.created.seconds)}
                  locale='en_US'
                />
              </strong>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-row">
        <button
          className="button button--danger mr-2 w-full"
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

  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')

  const deleteItem = (name) => {
    console.log(name)
    /*firebase.firestore().collection('submitted').doc(name).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });*/
  }

  const handleSubmit = event => {
    event.preventDefault()
    const themeRef = firebase.firestore().collection('submitted')
    themeRef.doc(selectedItem).delete()
  }

  const openDelete = (name) => {
    setSelectedItem(name)
    console.log(selectedItem)
    //setShowModal(!showModal)
  }

  const convertTime = secs => {
    var t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    return t;
  }

  const sup = (name) => {
    setSelectedItem(name)
    console.log(selectedItem)
  }

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