import React, { useState } from 'react'
import { Heart } from 'react-feather'

async function addLike(data) {
  const parsedData = JSON.stringify(data)

  const response = await fetch('/api/themes/add-like', {
    method: 'POST',
    body: parsedData
  })

  if(!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();

  console.log(parsedData)
}

const SlackIcon = ({ presence, theme, bg }) => {
  return(
    <div className="h-5 w-5 mr-2 relative">
      <div className="h-5 w-5 overflow-hidden rounded">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 80 80" fill="none">
          <g clipPath="url(#clip0)">
            <rect width="80" height="80" fill="white"/>
            <circle cx="-2.875" cy="-2.875" r="40.875" fill="#62C2EB"/>
            <circle cx="82.875" cy="-2.875" r="40.875" fill="#5BB181"/>
            <circle cx="-2.875" cy="82.875" r="40.875" fill="#CE375B"/>
            <circle cx="82.875" cy="82.875" r="40.875" fill="#E4B34C"/>
            <circle cx="66.3193" cy="40.3438" r="7.46875" fill="#38133B" stroke="white" strokeWidth="2.5"/>
            <circle cx="68.6318" cy="37.9062" r="2.23438" fill="white"/>
            <path d="M63.1768 22.6875C67.2881 22.25 71.6631 23.625 74.0867 26.125" stroke="#38133B" strokeWidth="9" strokeLinecap="round"/>
            <circle cx="13.6804" cy="40.3438" r="7.46875" fill="#38133B" stroke="white" strokeWidth="2.5"/>
            <circle cx="15.9929" cy="37.9062" r="2.23438" fill="white"/>
            <path d="M16.823 22.6875C12.7117 22.25 8.33667 23.625 5.91301 26.125" stroke="#38133B" strokeWidth="9" strokeLinecap="round"/>
            <path d="M35.5625 53.9419C36.4937 54.2398 38.133 54.4375 39.9998 54.4375C41.8667 54.4375 43.506 54.2398 44.4372 53.9419" stroke="#E8E8E8" strokeWidth="5" strokeLinecap="round"/>
            <path d="M28.9373 43.125C31.2588 45.1912 35.3457 46.5625 39.9999 46.5625C44.6541 46.5625 48.7411 45.1912 51.0626 43.125" stroke="#38133B" strokeWidth="5" strokeLinecap="round"/>
            </g>
          <defs>
            <clipPath id="clip0">
              <rect width="80" height="80" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </div>
      {
        presence ? (
          <div
            className="h-2 w-2 z-2 rounded-full absolute -bottom-1 -right-1"
            style={{ backgroundColor: theme.active_presence }}
          />
        )
        :
        (
          <div
            className="h-2 w-2 z-2 border border-current rounded-full absolute -bottom-1 -right-1"
            style={{ backgroundColor: bg, color: theme.text_color }}
          />
        )
      }
    </div>
  )
}

const ListItem = ({ label, active, theme, badge, presence }) => {

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  if(active) {
    return(
      <div
        className={`px-4 h-10 flex items-center text-left text-base transition w-full flex-start relative`}
        style={{
          backgroundColor: theme.active_item,
          color: theme.active_item_text
        }}
      >
        <SlackIcon presence={presence} theme={theme} bg={theme.active_item} />
        <div className="h-2 rounded-full w-1/2 bg-current opacity-80"/>
        {
          badge && (
            <div className="h-2 rounded-full w-8 bg-current opacity-80 ml-4 absolute top-1/2 -translate-y-1/2 right-4" style={{ color: theme.mention_badge }}/>
          )
        }
      </div>
    )
  }

  return(
    <div
      className={`px-4 h-10 flex items-center text-left text-base transition w-full flex-start relative`}
      style={{
        backgroundColor: isHovering ? theme.hover_item : 'transparent',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SlackIcon presence={presence} theme={theme} bg={theme.column_bg} />
      <div className="h-2 rounded-full w-1/2 bg-current opacity-80"/>
      {
        badge && (
          <div className="h-2 rounded-full w-8 bg-current opacity-80 ml-4 absolute top-1/2 -translate-y-1/2 right-4" style={{ color: theme.mention_badge }}/>
        )
      }
    </div>
  )
}

const Theme = ({theme, changeTheme, minimalHeader, favorite}) => {

  const [isHovering, setIsHovering] = useState(false);
  const [copied, setCopied] = useState(false)
  const [likes, setLikes] = useState(theme.likes)

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleClick = (theme) => {
    changeTheme(theme)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  return(
    <div className="flex flex-col">
      <button
        className="rounded-lg flex flex-col transition hover:scale-105 shadow hover:shadow-xl overflow-hidden border border-black border-opacity-10 dark:border-white dark:border-opacity-10"
        style={{ background: theme.column_bg, color: theme.text_color}}
        onClick={changeTheme ? () => handleClick(theme) : () => console.log(theme)}
      >
        <div
          className="p-2 text-xs w-full text-center uppercase tracking-wider"
          style={{
            backgroundColor: minimalHeader ? 'transparent' : theme.top_nav_bg,
            color: minimalHeader ? 'inherit' : theme.top_nav_text
          }}
        >
          {
            changeTheme ? (
              <span className="opacity-60">{copied ? 'Copied' : 'Click to Copy'}</span>
            )
            :
            (
              <span className="opacity-60">Preview</span>
            )
          }
        </div>
        <div
          className="px-4 py-2 text-left text-base transition w-full"
          style={{
            backgroundColor: isHovering ? theme.hover_item : 'transparent',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {theme.name ? theme.name : 'Sidebar Theme'}
        </div>
        <ListItem theme={theme} active/>
        <ListItem theme={theme} badge presence/>
        <ListItem theme={theme}/>
      </button>
      <div className="mt-3">
        {
          favorite && (
            <button
              className="inline-flex items-center text-sm px-2 py-1 transition bg-zinc-100 dark:bg-zinc-800 rounded-md border dark:border-white dark:border-opacity-10 border-black border-opacity-10 hover:bg-pink-500 hover:bg-opacity-20 hover:scale-105 hover:rotate-6 dark:text-zinc-400 hover:dark:text-pink-500 hover:text-pink-700 hover:border-pink-500 hover:border-opacity-20"
              onClick={async () => {
                try {
                  await addLike(theme.id);
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              <Heart size={16} className="mr-1"/>
              {likes}
            </button>
          )
        }
      </div>
    </div>
  )
}

export default Theme