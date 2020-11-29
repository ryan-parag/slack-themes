import React from 'react'
import { Square, CheckSquare } from 'react-feather';

const Checkbox = ({handleClick, toggleState, label}) => {

  return (
    <button
      className={`flex w-full items-center p-4 mb-4 rounded-md border border-gray-500 bg-transparent hover:bg-indigo-100 ${toggleState ? 'bg-indigo-500 text-white hover:bg-indigo-600' : null}`}
      onClick={handleClick}
    >
      {
        toggleState ? (
          <CheckSquare/>
        )
        :
        (
          <Square/>
        )
      }
      <div className="pl-4 text-sm">{label}</div>
    </button>
  )
}

export default Checkbox;