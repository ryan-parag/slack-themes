import React from 'react'

const Categories = ({activeQuery, updateQuery}) => {

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
    { name: 'Material', value: 'material'}
  ]

  return (
    <>
      <div className="flex flex-wrap">
        {
          items.map(item => (
            <button
              className={`transition py-2 px-4 mb-4 text-sm font-semibold rounded-full border mr-2 focus:outline-none ${activeQuery === item.value ? 'border-indigo-600 bg-indigo-500 text-white hover:bg-indigo-600' : 'border-gray-400 hover:bg-gray-200'}`}
              key={item.name}
              onClick={() => updateQuery(item.value)}
            >
              {item.name}
            </button>
          ))
        }
      </div>
    </>
  )
}

export default Categories;