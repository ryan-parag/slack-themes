import React from 'react'
import Link from 'next/link'

const Navigation = ({active, signOut, session}) => {

  const navItems = [
    { name: 'Explore', href: '/'},
    { name: 'About', href: '/about'},
    { name: 'Submit a Theme', href: '/submit-theme'},
  ]

  return(
    <div className="flex items-center">
      {
        navItems.map((item, i) => (
          <Link
            href={item.href}
            key={i}
          >
            <a
              className={`transition pb-0.5 border-b-2 focus:outline-none ${active === item.name ? 'font-semibold border-current' : 'text-gray-400 hover:text-gray-600 border-transparent'} ${i === 0 ? 'ml-0' : 'ml-4'}`}
            >
              {item.name}
            </a>
          </Link>
        ))
      }
      {
        session ? (
          <button
            className="transition pb-0.5 ml-4 border-b-2 border-transparent focus:outline-none text-red-500 hover:text-red-700"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        )
        :
        null
      }
    </div>
  )
}

export default Navigation