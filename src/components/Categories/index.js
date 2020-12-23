import React, { useState } from 'react'
import { MoreHorizontal } from 'react-feather'

const Categories = ({activeQuery, updateQuery}) => {

  const [open, setOpen] = useState(false)

  const items = [
    { name: 'All Themes', value: ''},
    { name: 'Dark', value: 'dark'},
    { name: 'Light', value: 'light'},
    { name: 'Red', value: 'red'},
    { name: 'Blue', value: 'blue'},
    { name: 'Green', value: 'green'},
    { name: 'Purple', value: 'purple'},
    { name: 'Yellow', value: 'yellow'},
    { name: 'Pink', value: 'pink'},
    { name: 'Orange', value: 'orange'},
    { name: 'Brand', value: 'brand'},
    { name: 'Racing', value: 'racing'},
    { name: 'Syntax', value: 'syntax'},
    { name: 'Minimal', value: 'minimal'},
    { name: 'Material', value: 'material'},
    { name: 'Community', value: 'community'}
  ]

  const defaultLength = 8

  return (
    <>
      <div className="flex flex-wrap">
        {
          items.slice(0, `${open ? items.length : defaultLength}`).map((item) => (
            <button
              className={`transition py-2 px-4 mb-4 text-sm font-semibold rounded-full border mr-2 focus:outline-none ${activeQuery === item.value ? 'border-gray-900 bg-gray-800 text-white hover:bg-gray-700' : 'border-gray-400 hover:bg-gray-200'}`}
              key={item.name}
              onClick={() => updateQuery(item.value)}
            >
              {item.name}
            </button>
          ))
        }
        <button
          className="transition py-1 px-1 h-auto text-gray-500 hover:text-gray-900 inline-flex items-center mb-4 text-xs font-normal focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          { open ? 'Show Less' : `More (${items.length - defaultLength})` }
          {
            open ?
            null
            :
            (
              <MoreHorizontal className="ml-1" size={16}/>
            )
          }
        </button>
      </div>
    </>
  )
}

export default Categories;