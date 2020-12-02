import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Modal = ({children, showModal, setShowModal, confirmText, confirmModal, danger}) => {
  return (
    <>
      {
        showModal ? (
          <>
            <motion.div
              className="bg-black fixed top-0 bottom-0 left-0 right-0 z-40"
              initial={{ opacity: 0}}
              animate={{ opacity: .5 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowModal(false)}
              role="button"
            ></motion.div>
            <div
              className="fixed w-full md:w-1/2 lg:w-1/3 p-2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-50"
            >
              <motion.div
                className="p-4 rounded-md shadow-2xl block bg-white w-full transform"
                initial={{ opacity: 0, y: 200 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .3 }}
              >
                {children}
                <div className="flex justify-end mt-4">
                  <button
                    className="button mr-2"
                    onClick={() => setShowModal(false)}
                  >
                    {confirmText ? 'Cancel' : 'Close'}
                  </button>
                  {
                    confirmModal ? (
                      <button
                        onClick={() => confirmModal()}
                        className={`button ${danger ? 'button--danger' : 'button--primary'} ml-1`}
                      >
                        {confirmText ? confirmText : 'Confirm'}
                      </button>
                    )
                    :
                    null
                  }
                </div>
              </motion.div>
            </div>
          </>
        )
        :
        null
      } 
    </>
  )
}

export default Modal