import React from 'react'
import { Check } from 'react-feather';

const Checkbox = ({handleClick, toggleState, label, sm}) => {

  return (
    <button
      className={`flex w-full transition items-center justify-between focus:outline-none ${sm ? 'p-2' : 'p-4'} rounded-md border ${toggleState ? 'bg-white text-gray-900' : 'text-gray-600 hover:text-gray-600 hover:bg-white'}`}
      onClick={handleClick}
    >
      <div className={`${toggleState ? 'font-semibold' : 'font-normal'} ${sm ? 'text-xs' : 'text-sm'}`}>{label}</div>
      <div className={`${sm ? 'h-6 w-6' : 'h-8 w-8'} inline-flex items-center justify-center rounded-md border ${toggleState ? 'text-green-500 border-green-200 bg-green-100' : 'text-gray-400 border-gray-200 bg-gray-200'}`}>
        {
          toggleState ? <Check size={sm ? '20' : '24'}/> : null
        }
      </div>
    </button>
  )
}

export default Checkbox;