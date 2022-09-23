import { useState } from 'react'
import { Switch } from '@headlessui/react'

const Toggle = ({ toggle, setToggle, toggleLabel }) => {

  return(
    <Switch
      checked={toggle}
      onChange={setToggle}
      className={`${
        toggle ? 'bg-green-500' : 'bg-zinc-300 dark:bg-zinc-600'
      } relative inline-flex h-5 w-9 items-center rounded-full`}
    >
      <span className="sr-only">{toggleLabel}</span>
      <span
        className={`${
          toggle ? 'translate-x-5' : 'translate-x-1'
        } shadow inline-block h-3 w-3 transform rounded-full bg-white transition`}
      />
    </Switch>
  )
}

export default Toggle;