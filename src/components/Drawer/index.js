import React from 'react'
import { motion } from "framer-motion"
import Checkbox from '../Checkbox'

const Drawer = ({toggleDrawerState, toggleThemeLabel, themeLabel, toggleNeutralNav, neutralNav}) => {
  return (
    <>
      <motion.div
        className="bg-opacity-50 bg-black fixed top-0 bottom-0 left-0 right-0 z-40"
        onClick={toggleDrawerState}
        role="button"
        intial={{ opacity: 0}}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
      />
      <motion.div
        className="bg-white px-4 py-8 fixed top-0 left-0 bottom-0 w-full md:w-1/3 z-50 shadow-2xl"
        initial={{ translateX: -600}}
        animate={{ translateX: 0 }}
        transition={{ duration: .5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h4>Settings</h4>
          <button
            className="button button--sm"
            onClick={toggleDrawerState}
          >
            Close
          </button>
        </div>
        <Checkbox
          label="Change top navigation to neutral color"
          handleClick={toggleNeutralNav}
          toggleState={neutralNav}
        />
        <Checkbox
          label="Add theme name when copying"
          handleClick={toggleThemeLabel}
          toggleState={themeLabel}
        />
        <div className="px-4 py-6 font-mono leading-loose bg-gray-100 border border-gray-300 rounded-md text-sm break-all">
          <span>Example Theme:</span>
          <br/>
          {`${themeLabel ? 'Eggplant Dark -- ' : ''}#1A1D21,#121016,#3A2D3B,#FBFAF7,#27242C,#C3C3C2,#37B57F,#BB3A56,${neutralNav ? '#1A1D21,#C3C3C2' : '#49174A,#D8CCD5'}`}
        </div>
      </motion.div>
    </>
  )
}

export default Drawer;