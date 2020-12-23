import React, { useState } from 'react'
import { ArrowRight } from 'react-feather'

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

  return (
    <>
      <div className="flex flex-wrap">
        {
          items.slice(0, `${open ? items.length : 10}`).map((item) => (
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
          className="transition py-2 inline-flex items-center px-4 mb-4 text-xs font-normal rounded-full border mr-2 focus:outline-none border-transparent hover:bg-gray-200"
          onClick={() => setOpen(!open)}
        >
          { open ? 'Show Less' : 'Show More' }
          {
            open ?
            null
            :
            (
              <ArrowRight className="ml-1" size={16}/>
            )
          }
        </button>
      </div>
    </>
  )
}

export default Categories;