import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDown, Check, Square } from 'react-feather';

const Sort = ({ sorts, selected, setSelected }) => {

  return (
    <div className="relative w-auto z-10">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-white hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition border border-black border-opacity-10 dark:border-white dark:border-opacity-10 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            {
              selected === null ? (
                <span className="block truncate">Not selected</span>
              )
              :
              (
                <span className="flex items-center truncate">{selected.name}{selected.icon}</span>
              )
            }
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDown size={16}/>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="w-56 absolute right-0 mt-1 max-h-60 w-full overflow-auto scrollbar-hide rounded-md bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 py-1 text-base shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              <div className="px-3 py-3 flex justify-between items-center w-full border-b dark:border-white dark:border-opacity-10 border-black border-opacity-10">
                <div className="text-xs w-full flex-1">Sort by:</div>
              </div>
              {sorts.map((sort, i) => (
                <Listbox.Option
                  key={i}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 transition ${
                      active ? 'bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white' : 'text-inherit'
                    }`
                  }
                  value={sort}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate flex items-center ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {sort.name}{sort.icon}
                      </span>
                      <span className={`absolute inset-y-0 left-0 flex items-center pl-3`}>
                      {selected ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <Square size={16} className="opacity-60" />
                      )}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default Sort