import React from 'react'
import { motion } from 'framer-motion'
import { Loader, Search } from 'react-feather'
import Box from '../Box'

const EmptyState = ({loading}) => {

  const AvatarDefaultClasses = 'inline-block p-3 mb-4 rounded-full bg-black bg-opacity-20 text-black text-opacity-50 dark:bg-white dark:bg-opacity-20 dark:text-white dark:text-opacity-50'

  const AvatarErrorClasses = 'inline-block p-3 mb-4 rounded-full bg-red-500 bg-opacity-20 text-red-500 text-opacity-70'

  return(
    <Box
      center
      marginTop={'4'}
      state={loading ? 'default' : 'error'}
    >
      {
        loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ ease: "linear", duration: 1, loop: Infinity }}
            className={AvatarDefaultClasses}
          >
            <Loader/>
          </motion.div>
        )
        : (
          <div className={AvatarErrorClasses}>
            <Search/>
          </div>
        )
      }
      <h4>{loading ? 'Loading...' : 'Whoops'}</h4>
      {
        !loading ? (
          <p className="text-sm mt-4">Sorry, something went wrong - we're looking at correcting this error</p>
        )
        :
        null
      }
    </Box>
  )
}

export default EmptyState