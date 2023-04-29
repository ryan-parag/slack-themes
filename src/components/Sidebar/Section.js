import React, { useState } from 'react'
import NavItem from "./NavItem";
import { ChevronDown } from 'react-feather';
import { useRouter } from 'next/router';

const Section = ({ items, title }) => {

  const [open, setOpen] = useState(true)
  const router = useRouter();

  if(title) {
    return(
      <ul className="border-b contrast--border py-2 px-3">
        <li>
          <button
            className="px-3 py-2 rounded-md flex mb-px items-center text-sm w-full text_color--text transition hover:hover_item--bg"
            onClick={() => setOpen(!open)}
          >
            <svg className={`transition ${!open && '-rotate-90'} transition`} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.2929 16.2929L4.70711 9.70711C4.07714 9.07714 4.52331 8 5.41421 8H18.5858C19.4767 8 19.9229 9.07714 19.2929 9.7071L12.7071 16.2929C12.3166 16.6834 11.6834 16.6834 11.2929 16.2929Z" fill="currentColor"/>
            </svg>
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
    <ul className="border-b contrast--border py-2 px-3">
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