import React, { useState } from 'react'
import { ChromePicker } from 'react-color'

const ColorPicker = (props) => {

  const [pickerColor, setPickerColor] = useState(props.color)
  const [displayPicker, setDisplayPicker] = useState(false)

  const handleChange = (newColor) => {
    let colorVal = newColor
    setPickerColor(colorVal)
    props.changeColor(props.themeTarget, colorVal)
  }

  const handleDisplay = () => {
    setDisplayPicker(!displayPicker)
  }

  return (
    <div className="relative w-full">
      <button
        className="button flex items-center justify-start px-2 w-full"
        onClick={() => handleDisplay()}
      >
        <span style={{ background: pickerColor}}className="w-6 h-6 rounded-full inline-block mr-2 border border-gray-200 shadow-inner"/>
        <div className="text-left">
          <div className="font-normal text-xs text-gray-500 mb-0.5">{props.themeTarget}</div>
          <div className="font-bold">{pickerColor}</div>
        </div>
      </button>
      {
        displayPicker ?
          (
            <>
              <div className="absolute z-50 transform translate-x-4 -translate-y-3">
                <ChromePicker
                  color={pickerColor}
                  onChange={
                    (color) => {
                      handleChange(color.hex)
                    }
                  }
                />
              </div>
              <button className="fixed bg-transparent z-40 top-0 bottom-0 left-0 right-0 w-full h-full" onClick={() => handleDisplay()}/>
            </>
          )
          :
          null
        }
    </div>
  )
}

export default ColorPicker