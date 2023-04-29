import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

function Modal({ isOpen, setIsOpen }) {

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-white dark:bg-opacity-20" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold"
                  >
                    Submit Theme
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm mb-4">
                      Add your theme to the list of Slack themes on the directory:
                    </p>
                    <div className="flex w-full flex-col mb-4">
                      <label className="text-sm mb-2 text-zinc-600 dark:text-zinc-400">Theme name</label>
                      <input type="text" placeholder="Enter a theme name..." className="bg-transparent p-3 rounded-lg border border-black border-opacity-10 dark:border-white dark:border-opacity-10 shadow"/>
                    </div>
                  </div>

                  <div className="mt-4 flex w-full justify-end">
                    <button
                      type="button"
                      className="shadow transition px-4 py-2 rounded-lg border border-black border-opacity-10 dark:border-white dark:border-opacity-10 hover:bg-zinc-100 dark:hover:bg-zinc-800 mr-1 inline-flex items-center justify-center"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="shadow transition ml-2 py-2 px-4 rounded-lg border border-black border-opacity-10 dark:border-white dark:border-opacity-10 text-white dark:text-zinc-900 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200"
                      onClick={closeModal}
                    >
                      Submit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Modal