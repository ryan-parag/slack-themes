import React, { useState, useEffect } from 'react'
import { PrismaClient } from "@prisma/client"
import Layout from '@components/Layout';
import ColorContrastChecker from 'color-contrast-checker';
import toast from 'react-hot-toast';
import ThemeList from '@components/ThemeList';
import { ArrowDown, ArrowUp } from 'react-feather';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  let data = await prisma.theme.findMany({
    orderBy: [
      {
        name: 'asc',
      },
    ],
  });
  let dataCat = await prisma.categories.findMany()
  data = JSON.parse(JSON.stringify(data))
  dataCat = JSON.parse(JSON.stringify(dataCat))
  return {
    props: {
      initialThemes: data,
      categories: dataCat
    }
  };
}

async function copyTextToClipboard(text) {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text);
  }
}

export default function Home({ initialThemes, categories }) {

  const sorts = [
    {
      name: 'Name',
      icon: <ArrowDown size={16} className="ml-2"/>,
      type: 'name',
      order: 'desc'
    }, {
      name: 'Name',
      icon: <ArrowUp size={16} className="ml-2"/>,
      type: 'name',
      order: 'asc'
    }, {
      name: 'Likes',
      icon: <ArrowDown size={16} className="ml-2"/>,
      type: 'likes',
      order: 'desc'
    }, {
      name: 'Likes',
      icon: <ArrowUp size={16} className="ml-2"/>,
      type: 'likes',
      order: 'asc'
    }
  ]

  const [themes, setThemes] = useState(initialThemes)
  const [filters, setFilters] = useState(categories)
  const [minimalHeader, setMinimalHeader] = useState(true)
  const [selected, setSelected] = useState(null)
  const [filteredThemes, setFilteredThemes] = useState(themes)
  const [copyString, setCopyString] = useState('')
  const [sorting, setSorting] = useState(sorts[0])

  const changeTheme = (theme) => {
    let root

    if(typeof window !== "undefined") {
      root = document.documentElement

      const ccc = new ColorContrastChecker();

      root.style.setProperty('--hover_item', theme.hover_item);
      root.style.setProperty('--active_presence', theme.active_presence);
      root.style.setProperty('--top_nav_text', theme.top_nav_text);
      root.style.setProperty('--active_item', theme.active_item);
      root.style.setProperty('--column_bg', theme.column_bg);
      root.style.setProperty('--mention_badge', theme.mention_badge);
      root.style.setProperty('--active_item_text', theme.active_item_text);
      root.style.setProperty('--text_color', theme.text_color);
      root.style.setProperty('--top_nav_bg', theme.top_nav_bg);

      if (ccc.isLevelCustom("#FFFFFF", theme.mention_badge, 4)) {
        root.style.setProperty('--contrast', "#FFFFFF");
      } else {
        root.style.setProperty('--contrast', "#000000");
      }

      if (ccc.isLevelCustom("#000000", theme.column_bg, 8)) {
        root.style.setProperty('--contrast_border', "rgba(0,0,0,0.1)");
      } else {
        root.style.setProperty('--contrast_border', "rgba(255,255,255,0.1)");
      }

      const str = `${theme.column_bg},#121016,${theme.active_item},${theme.active_item_text},${theme.hover_item},${theme.text_color},${theme.active_presence},${theme.mention_badge},${minimalHeader ? theme.column_bg : theme.top_nav_bg},${minimalHeader ? theme.text_color : theme.top_nav_text}`

      setCopyString(str)

      copyTextToClipboard(str)

      toast.success(`${theme.name} copied to your clipboard`)
    }
  }

  useEffect(() => {


    if(selected !== null) {
      const filtered = []

      themes.map(theme => {
        if(theme.groups.includes(selected.id)) {
          filtered.push(theme)
        }
  
        setFilteredThemes(filtered)
      })
    } else {
      setFilteredThemes(themes)
    }

  },[selected])

  return (
    <Layout
      title={'Explore Themes'}
      toggleLabel={'Minimal Header'}
      toggleState={minimalHeader}
      setToggle={setMinimalHeader}
    >
      <ThemeList
        copyString={copyString}
        minimalHeader={minimalHeader}
        filteredThemes={filteredThemes}
        selected={selected}
        setSelected={setSelected}
        filters={filters}
        changeTheme={changeTheme}
        sorts={sorts}
        sorting={sorting}
        setSorting={setSorting}
      />
    </Layout>
  );
}