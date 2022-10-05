import React from 'react'
import Layout from '@components/Layout';
import Logo from '@components/Logo';
import Link from 'next/link';
import Image from 'next/image';
import { GitHub } from 'react-feather';

const ListLink = ({ img, title, description, link }) => {
  return(
    <div className="flex w-full border-b border-black border-opacity-10 dark:border-white dark:border-opacity-10">
      {
        img && (
          <div className="py-6">
            <div className="relative mt-1 h-10 w-10 bg-zinc-200 dark:bg-zinc-700 rounded-lg overflow-hidden shadow inline-flex items-center justify-center">
              {img}
            </div>
          </div>
        )
      }
      <div className="w-full flex-1 flex flex-col items-start pl-4 py-6">
        <span className="text-left text-base block mb-1">
          <a className="text-link text-link--icon" href={link} target="_blank">{title}</a>
        </span>
        <span className="mt-0 mb-0 text-sm leading-normal text-zinc-600 dark:text-zinc-400">{description}</span>
      </div>
    </div>
  )
}

export default function About() {

  const links = [
    {
      title: 'Contribute',
      description: 'Are you a designer or developer? Do you have an idea to add to this site or want to chip in with design updates? Hop in on the fun if you\'d like to learn as well!',
      img: <GitHub size={24}/>,
      link: 'https://github.com/ryan-parag/slack-themes'
    }, {
      title: 'Ryan Parag',
      description: 'I\'m a product designer living in Sunny 🌞 Tampa Bay. I strive to help build useful products with an interdisciplinary skillset, bred from my fascination of systems, art, and code.',
      img: <Image src={'/profiles/ryan.png'} layout="fill"/>,
      link: 'https://ryanparag.com'
    }, {
      title: 'Matt Broughton',
      description: 'Hi there. I\'m Matt Broughton. I design and build user interfaces for the web and apps.',
      img: <Image src={'/profiles/matt.png'} layout="fill"/>,
      link: 'https://matt-broughton.com/'
    }
  ]

  return (
    <Layout title={'About'}>
      <div className="w-full h-full overflow-y-scroll overflow-x-hidden pb-32">
        <div className="mx-auto max-w-screen-md prose p-4 xl:p-8">
          <div className="relative inline-block transform transition hover:scale-110 hover:-rotate-12">
            <Logo/>
          </div>
          <h2>Beautiful, curated themes to help personalize all of your different Slack workspaces.</h2>
          <p>Having trouble keeping track of all of your Slack workspaces? Choose and copy <Link href="/"><a>one of the themes in the list</a></Link> to personalize a Slack workspace.</p>
          <p>Thanks for visiting 👍!</p>
          <h3 id="tutorial">How to use a Slack theme:</h3>
          <ol>
            <li>
              <h4>Choose a Theme</h4>
              <p>Explore from the <Link href="/"><a>list of Slack themes</a></Link> and click the theme item to copy the HEX code string to your clipboard.</p>
              <figure>
                <img src="/step1.gif" className="block w-full border border-black border-opacity-10 dark:border-white dark:border-opacity-10" alt="Copy theme from list"/>
                <figcaption>Find a theme and click to copy</figcaption>
              </figure>
            </li>
            <li>
              <h4>Paste in your Workspace</h4>
              <p>Paste the copied HEX string into any text box in the Slack workspace in which you would like to change themes.</p>
              <figure>
                <img src="/step2.gif" className="block w-full border border-black border-opacity-10 dark:border-white dark:border-opacity-10" alt="Paste in Slack and change theme"/>
                <figcaption>Paste in Slack and change theme by clicking the generated button</figcaption>
              </figure>
            </li>
            <li>
              <h4>Change Theme</h4>
              <p>Submit the message in the text box and click the <span className="py-1 px-2 text-sm border border-black border-opacity-10 bg-black bg-opacity-5 dark:border-white dark:border-opacity-10 dark:bg-white dark:bg-opacity-5 rounded-md mx-1 shadow-sm">Switch sidebar theme</span> button that Slack generates underneath your posted message.</p>
            </li>
          </ol>
          <h3>Links</h3>
          {
            links.map((item, i) => (
              <ListLink
                key={i}
                title={item.title}
                img={item.img}
                description={item.description}
                link={item.link}
              />
            ))
          }
        </div>
      </div>
    </Layout>
  );
}