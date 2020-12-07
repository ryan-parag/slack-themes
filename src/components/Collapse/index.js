import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'react-feather'

const Collapse = ({label, children}) => {

  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div>
      <button
        className="link text-sm focus:outline-none hover:no-underline py-2 inline-flex items-center"
        onClick={handleClick}
      >
        <span className="pr-1">{open ? 'Hide' : 'Show'}{' '}{label}</span>
        {
          open ? (
            <ChevronUp size={'16'}/>
          )
          :
          (
            <ChevronDown size={'16'}/>
          )
        }
      </button>
      <div className={`${open ? 'block' : 'hidden'} w-full`}>
        {children}
      </div>
    </div>
  )
}

export default Collapse