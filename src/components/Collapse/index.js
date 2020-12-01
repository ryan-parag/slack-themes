import React, { useState } from 'react'

const Collapse = ({label, children}) => {

  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div>
      <button
        className="link text-sm focus:outline-none py-2"
        onClick={handleClick}
      >
        {label}{open ? <span className="pl-1 font-normal text-xs">(Close)</span> : null}
      </button>
      <div className={open ? 'block' : 'hidden'}>
        {children}
      </div>
    </div>
  )
}

export default Collapse