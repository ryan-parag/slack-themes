import React, { useState, useEffect } from 'react'
import Checkbox from '../Checkbox'
import Collapse from '../Collapse'
import { Trash, Edit2 } from 'react-feather'
import firebase from 'firebase'

const ColorPicker = ({name,color}) => {
  return (
    <span title={name} className="transition transform border border-gray-300 w-6 h-6 rounded-full inline-block mr-2" style={{ background: color}}>
    </span>
  )
}

const ThemeUpdateItem = ({theme}) => {

  const allCategories = ['dark', 'light', 'red', 'blue', 'green', 'purple', 'yellow', 'pink', 'orange', 'brand', 'racing', 'syntax', 'minimal', 'material', 'community']

  const [updateTheme, setUpdateTheme] = useState(theme)

  const categories = updateTheme.groups

  useEffect(() => {

  }, [updateTheme])

  return (
    <div
      key={theme.theme_name}
      className="rounded-md p-4 border border-gray-200 shadow flex flex-col"
    >
      <div className="flex flex-col w-full mb-2 justify-between">
        <div className="flex flex-row items-center justify-between">
          <div className="inline-flex items-center">
            <span title="theme_name" className="font-bold">{theme.theme_name}</span>
            <span className="text-xs font-semibold ml-2 inline-flex items-center text-gray-500">
              <svg height="16" width="16" className="mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              {theme.likes} {theme.likes === 1 ? 'Like' : 'Likes'}
            </span>
          </div>
          <div>
            <button
              className="transition transform mr-2 text-xs bg-gray-100 text-gray-500 rounded-md hover:text-blue-500 hover:bg-blue-50 inline-flex items-center px-2 h-8 hover:rotate-3 hover:scale-110 focus:outline-none"
              onClick={() => console.log(updateTheme.theme_name)}
            >
              <Edit2 size="16"/>
              <span className="ml-1">Edit</span>
            </button>
              <button
              className="transition transform text-xs bg-gray-100 text-gray-500 rounded-md hover:text-red-500 hover:bg-red-50 inline-flex items-center px-2 h-8 hover:rotate-3 hover:scale-110 focus:outline-none"
              onClick={() => console.log(updateTheme.theme_name)}
            >
              <Trash size="16"/>
              <span className="ml-1">Delete</span>
            </button>
          </div>
        </div>
        <div className="inline-flex mt-4">
          <ColorPicker name={'active_item'} color={theme.active_item}/>
          <ColorPicker name={'active_item_hover'} color={theme.active_item_text}/>
          <ColorPicker name={'active_presence'} color={theme.active_presence}/>
          <ColorPicker name={'column_bg'} color={theme.column_bg}/>
          <ColorPicker name={'hover_item'} color={theme.hover_item}/>
          <ColorPicker name={'mention_badge'} color={theme.mention_badge}/>
          <ColorPicker name={'text_color'} color={theme.text_color}/>
          <ColorPicker name={'top_nav_bg'} color={theme.top_nav_bg}/>
          <ColorPicker name={'top_nav_text'} color={theme.top_nav_text}/>
        </div>
      </div>
      <Collapse label="Categories">
        <div className="flex w-full rounded-md text-xs mt-2">
          {
            categories.map(item => (
              <div className="py-1 px-2 mr-1 rounded-md bg-gray-200 border border-gray-300 text-gray-700" key={item}>{item}</div>
            ))
          }
        </div>
      </Collapse>
    </div>
  )
}

export default ThemeUpdateItem