import React from 'react'

const Footer = () => {
  return (
    <div className="flex flex-col lg:flex-row mx-4 items-center text-center md:mx-auto lg:mx-auto xl:mx-auto 2xl:mx-auto pt-4 pb-8 justify-between">
      <small>
        Designed and Developed by <a className="link" href="https://ryanparag.com" target="_blank">Ryan Parag</a> and <a className="link" href="https://matt-broughton.com/" target="_blank">Matthew Broughton</a>
      </small>
      <a href="https://github.com/ryan-parag/slack-themes" target="_blank" className="button mt-4 lg:mt-0">Contribute on GitHub</a>
    </div>
  )
}

export default Footer;