import React from 'react'
import { Square, CheckSquare } from 'react-feather';

const Checkbox = ({handleClick, toggleState, label, sm}) => {

  return (
    <button
      className={`flex w-full transition items-center justify-between focus:outline-none ${sm ? 'p-2' : 'p-4'} rounded-md border ${toggleState ? 'bg-white text-gray-900' : 'text-gray-600 hover:text-gray-600 hover:bg-gray-200'}`}
      onClick={handleClick}
    >
      <div className={`text-sm ${toggleState ? 'font-semibold' : 'font-normal'}`}>{label}</div>
      <div className={toggleState ? 'text-green-500' : 'text-gray-400'}>
        {
          toggleState ? <CheckSquare/> : <Square/>
        }
      </div>
    </button>
  )
}

export default Checkbox;