import React, { useState } from "react"
import { PrismaClient, Theme, Prisma } from "@prisma/client"
import themes from '../data/themes'

const prisma = new PrismaClient();

export async function getServerSideProps() {
  //let data = await prisma.theme.findMany();
  let dataCat = await prisma.categories.findMany()
  let data = themes.themes
  data = JSON.parse(JSON.stringify(data))
  dataCat = JSON.parse(JSON.stringify(dataCat))
  return {
    props: {
      initialThemes: data,
      categories: dataCat
    }
  };
}

async function deleteAll(data) {
  const parsedData = JSON.stringify(data)

  const response = await fetch('/api/themes/remove', {
    method: 'POST',
    body: parsedData
  })

  if(!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

async function saveTheme(theme, dataCat) {

  const getGroups = (groups) => {

    const categories = []

    dataCat.map(group => {
      if(groups.includes(group.name.toLowerCase())) {
        categories.push(group.id)
      }
    })

    return categories.join(', ')

  }

  const data = {
    name: theme.id,
    hover_item: theme.hover_item,
    active_presence: theme.active_presence,
    top_nav_text: theme.top_nav_text,
    active_item: theme.active_item,
    column_bg: theme.column_bg,
    mention_badge: theme.mention_badge,
    active_item_text: theme.active_item_text,
    text_color: theme.text_color,
    top_nav_bg: theme.top_nav_bg,
    likes: theme.likes,
    groups: getGroups(theme.groups)
  }

  const parsedData = JSON.stringify(data)

  const response = await fetch('/api/themes/add', {
    method: 'POST',
    body: parsedData
  })

  if(!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export default function Page({ initialThemes, categories }) {

  const [stuff, setStuff] = useState(initialThemes)
  const [cat, setCat] = useState(categories)
  
  const handleAll = async (themes) => {
    return await themes.map((theme) => {
      saveTheme(theme, cat)
    })
  }

  return (
    <div className="w-full grid grid-cols-2">
      <div className="p-4">
        sup
      </div>
      <div className="p-4">
        <button
          className="p-2 rounded bg-green-600"
          onClick={() => handleAll(stuff)}
        >
          Send All
        </button>
        <button
          onClick={async () => {
            try {
              await deleteAll(stuff);
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Delete All
        </button>
        {
          stuff.map((item,i) => (
            <div key={i} className="my-2 p-2 text-sm bg-gray-900 text-white flex items-center justify-between">
              {item.id}
              <button
                className="p-2 text-sm bg-indigo-500"
                onClick={async () => {
                  try {
                    await saveTheme(item, cat);
                  } catch (err) {
                    console.log(err);
                  }
                }}
              >
                Send
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );
}