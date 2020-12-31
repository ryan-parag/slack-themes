import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className="flex flex-col lg:flex-row mx-4 items-center text-center md:mx-auto lg:mx-auto xl:mx-auto 2xl:mx-auto pt-4 pb-8 justify-between">
      <small>
        Designed and Developed by <a className="link" href="https://ryanparag.com" target="_blank">Ryan Parag</a> and <a className="link" href="https://matt-broughton.com/" target="_blank">Matthew Broughton</a>
      </small>
      <div className="inline-flex">
        <Link href="/login">
          <a className="button button--secondary mt-4 lg:mt-0 mr-2">
            Admin
          </a>
        </Link>
        <a href="https://github.com/ryan-parag/slack-themes" target="_blank" className="button button--secondary mt-4 lg:mt-0">Contribute on GitHub</a>
      </div>
    </div>
  )
}

export default Footer;