import React from 'react';
import ThemeItem from '../ThemeItem';
import { Loader } from 'react-feather'
import { motion } from 'framer-motion'

const ThemeList = ({data, neutralNav, themeLabel, updateQueryAmount, dataSize, loading}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
        {
          data.map(theme => (
            <div key={Math.random()}>
              <ThemeItem
                theme={theme}
                neutralNav={neutralNav}
                themeLabel={themeLabel}
                withLikes
              />
            </div>
          ))
        }
      </div>
      {
        data.length < dataSize ? (
          <div className="flex justify-center">
            <button
              className="button"
              onClick={() => updateQueryAmount()}
            >
              {
                loading ? (
                  <div className="inline-flex items-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ ease: "linear", duration: 1, loop: Infinity }}
                    >
                      <Loader size={'20'} />
                    </motion.div>
                    <span className="ml-2">Loading...</span>
                  </div>
                )
                :
                <span>Show me more</span>
              }
            </button>
          </div>
        )
        :
        null
      }
    </>
  )
};

export default ThemeList;