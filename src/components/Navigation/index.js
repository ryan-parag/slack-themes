import React from 'react'
import Link from 'next/link'

const Navigation = ({active}) => {

  const navItems = [
    { name: 'Themes', href: '/'},
    { name: 'About', href: '/about'},
    { name: 'Submit a Theme', href: '/submit-theme'},
  ]

  return(
    <div className="flex mt-8">
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
    </div>
  )
}

export default Navigation