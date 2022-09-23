import React, { useState } from 'react'
import { ChromePicker } from 'react-color';
import { contrastColor } from 'contrast-color'

const ColorPicker = ({ label, value, onChange, field }) => {

  const [open, setOpen] = useState(false)
  const [pickerColor, setPickerColor] = useState(value)

  const handleChange = (color) => {
    onChange(field, color)
    setPickerColor(color)
  }

  return(
    <div>
      <button
        className="transition flex w-full items-center rounded-lg border border-black border-opacity-10 dark:border-white dark:border-opacity-10 hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow overflow-hidden"
        onClick={ () => setOpen(!open )}>
          <div className="h-12 w-1/3 relative border-r border-black border-opacity-10 dark:border-white dark:border-opacity-10" style={{ backgroundColor: value }}>
            <span className="text-sm absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" style={{ color: contrastColor({ bgColor: value }) }}>{value.toUpperCase()}</span>
          </div>
          <div className="flex flex-1 w-full text-left flex-col items-start px-4">
            <span className="text-base">{label}</span>
          </div>
      </button>
      {
        open ? (
          <div className="absolute z-10">
            <div className="fixed top-0 bottom-0 left-0 right-0" onClick={ () => setOpen(false) }/>
            <ChromePicker color={pickerColor} onChange={(color) => handleChange(color.hex)} />
          </div>
        )
        :
        null
      }
    </div>
  )
}

export default ColorPicker