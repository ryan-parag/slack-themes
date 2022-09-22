import React, { useState } from 'react'
import NavItem from "./NavItem";
import { ChevronDown } from 'react-feather';
import { useRouter } from 'next/router';

const Section = ({ items, title }) => {

  const [open, setOpen] = useState(true)
  const router = useRouter();

  if(title) {
    return(
      <ul className="border-b contrast--border py-2">
        <li>
          <button
            className="px-3 py-1 flex items-center text-sm w-full text_color--text transition hover:hover_item--bg"
            onClick={() => setOpen(!open)}
          >
            <ChevronDown size={16} className={`${!open && '-rotate-90'} transition`}/>
            <div className="pl-3">{title}</div>
          </button>
        </li>
        {
          open && (
            <>
              {
                items.map((item, i) => (
                  <li key={i}>
                    <NavItem
                      label={item.label}
                      link={item.link}
                      active={router.pathname === item.link}
                      icon={item.icon}
                      badge={item.badge && item.badge}
                      user={item.user && item.user}
                    />
                  </li>
                ))
              }
            </>
          )
        }
      </ul>
    )
  }

  return(
    <ul className="border-b contrast--border py-2">
      {
        items.map((item, i) => (
          <li key={i}>
            <NavItem
              label={item.label}
              link={item.link}
              active={router.pathname === item.link}
              icon={item.icon}
              badge={item.badge && item.badge}
            />
          </li>
        ))
      }
    </ul>
  )
}

export default Section;