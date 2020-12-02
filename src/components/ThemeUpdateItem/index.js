import React, { useState } from 'react'
import Checkbox from '../Checkbox'
import Collapse from '../Collapse'
import { Trash } from 'react-feather'

const ColorPicker = ({name,color}) => {
  return (
    <label role="button" title={name} className="transition transform border border-gray-300 w-6 h-6 rounded-full inline-block mr-2 hover:scale-110 hover:shadow-lg" style={{ background: color}}>
      <input type="color" value={color} className="w-0 h-0 opacity-0"/>
    </label>
  )
}

const ThemeUpdateItem = ({theme, onDelete, onCheck}) => {

  const initialCategories = [
    { name: 'Dark', value: theme.categories.dark },
    { name: 'Light', value: theme.categories.light },
    { name: 'Red', value: theme.categories.red },
    { name: 'Blue', value: theme.categories.blue },
    { name: 'Green', value: theme.categories.green },
    { name: 'Purple', value: theme.categories.purple },
    { name: 'Pink', value: theme.categories.pink },
    { name: 'Yellow', value: theme.categories.yellow },
    { name: 'Orange', value: theme.categories.orange },
    { name: 'Brand', value: theme.categories.brand },
    { name: 'Racing', value: theme.categories.racing },
    { name: 'Syntax', value: theme.categories.syntax },
    { name: 'Minimal', value: theme.categories.minimal },
    { name: 'Material', value: theme.categories.material }
  ]

  const [categories, setCategories] = useState(initialCategories)

  return (
    <div
      key={theme.theme_name}
      className="rounded-md p-4 border border-gray-200 shadow flex flex-col"
    >
      <div className="flex flex-col w-full mb-2 justify-between">
        <div className="flex flex-row items-center justify-between">
          <span title="theme_name" className="font-bold">{theme.theme_name}</span>
          <button
            className="transition transform text-xs bg-gray-100 text-gray-500 rounded-md hover:text-red-500 hover:bg-red-50 inline-flex items-center px-2 h-8 hover:rotate-3 hover:scale-110 focus:outline-none"
            onClick={onDelete}
          >
            <Trash size="16"/>
            <span className="ml-1">Delete</span>
          </button>
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
      <Collapse label="Edit Categories">
        <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 rounded-md gap-y-1 gap-x-2 mt-2 p-2 bg-gray-100">
          {
            categories.map(item => (
              <Checkbox
                label={item.name}
                handleClick={onCheck(item.value)}
                toggleState={item.value}
                sm
              />
            ))
          }
        </div>
      </Collapse>
    </div>
  )
}

export default ThemeUpdateItem