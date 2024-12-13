import React, { useState } from 'react'
import Layout from '@components/Layout';
import { RefreshCcw, Clipboard } from 'react-feather';
import { toast } from 'react-hot-toast';
import ColorContrastChecker from 'color-contrast-checker';
import Theme from '@components/Theme';
import Toggle from '@components/Toggle';
import { contrastColor } from 'contrast-color'
import Color from 'color';
import ColorPicker from '@components/ColorPicker'
import Modal from '@components/Modal'
import Tooltip from '@components/Tooltip'
import { theme } from 'tailwind.config';

async function copyTextToClipboard(text) {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text);
  }
}


const ButtonBar = ({ refresh, copyTheme, publish }) => {
  return(
    <div className="inline-flex items-center">
      <Tooltip tooltipText="Reset theme">
        <button
          className="shadow transition ml-2 h-11 w-11 rounded-lg border border-black border-opacity-10 dark:border-white dark:border-opacity-10 hover:bg-zinc-100 dark:hover:bg-zinc-800 mr-1 inline-flex items-center justify-center"
          onClick={() => refresh()}
        >
          <RefreshCcw size={16}/>
        </button>
      </Tooltip>
      <Tooltip tooltipText="Copy theme">
        <button
          title={'Copy theme to clipboard'}
          className="shadow transition ml-2 h-11 w-11 rounded-lg border border-black border-opacity-10 dark:border-white dark:border-opacity-10 hover:bg-zinc-100 dark:hover:bg-zinc-800 mr-1 inline-flex items-center justify-center"
          onClick={() => copyTheme()}
        >
          <Clipboard size={16}/>
        </button>
      </Tooltip>
      <button
        className="hidden shadow-md transition ml-2 py-2 px-4 rounded-lg border border-black border-opacity-10 dark:border-white dark:border-opacity-10 text-white dark:text-zinc-900 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200"
        onClick={() => publish(true)}
      >
        Submit
      </button>
    </div>
  )
}

export default function Playground() {

  const [toggle,setToggle] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  const currentTheme = () => {
    let root

    if(typeof window !== "undefined") {
      root = document.documentElement

      return {
        hover_item: getComputedStyle(root).getPropertyValue("--hover_item"),
        active_presence: getComputedStyle(root).getPropertyValue("--active_presence"),
        top_nav_text: getComputedStyle(root).getPropertyValue("--top_nav_text"),
        active_item: getComputedStyle(root).getPropertyValue("--active_item"),
        column_bg: getComputedStyle(root).getPropertyValue("--column_bg"),
        mention_badge: getComputedStyle(root).getPropertyValue("--mention_badge"),
        active_item_text: getComputedStyle(root).getPropertyValue("--active_item_text"),
        text_color: getComputedStyle(root).getPropertyValue("--text_color"),
        top_nav_bg: getComputedStyle(root).getPropertyValue("--top_nav_bg"),
        contrast: getComputedStyle(root).getPropertyValue("--contrast"),
        contrast_border: getComputedStyle(root).getPropertyValue("--contrast_border")
      }
    } else {
      return {
        hover_item: '#ffffff',
        active_presence: '#ffffff',
        top_nav_text: '#ffffff',
        active_item: '#ffffff',
        column_bg: '#ffffff',
        mention_badge: '#ffffff',
        active_item_text: '#ffffff',
        text_color: '#ffffff',
        top_nav_bg: '#ffffff',
        contrast: '#ffffff',
        contrast_border: '#ffffff',
      }
    }
  }

  const [defaultTheme, setDefaultTheme] = useState(currentTheme())

  const [createTheme, setCreateTheme] = useState({
    hover_item: defaultTheme.hover_item,
    active_presence: defaultTheme.active_presence,
    top_nav_text: defaultTheme.top_nav_text,
    active_item: defaultTheme.active_item,
    column_bg: defaultTheme.column_bg,
    mention_badge: defaultTheme.mention_badge,
    active_item_text: defaultTheme.active_item_text,
    text_color: defaultTheme.text_color,
    top_nav_bg: defaultTheme.top_nav_bg,
    contrast: defaultTheme.contrast,
    contrast_border: defaultTheme.contrast_border,
    name: 'Custom Theme'
  })

  const changeTheme = (theme) => {

    let root

    if(typeof window !== "undefined") {
      root = document.documentElement

      root.style.setProperty('--hover_item', theme.hover_item);
      root.style.setProperty('--active_presence', theme.active_presence);
      root.style.setProperty('--top_nav_text', theme.top_nav_text);
      root.style.setProperty('--active_item', theme.active_item);
      root.style.setProperty('--column_bg', theme.column_bg);
      root.style.setProperty('--mention_badge', theme.mention_badge);
      root.style.setProperty('--active_item_text', theme.active_item_text);
      root.style.setProperty('--text_color', theme.text_color);
      root.style.setProperty('--top_nav_bg', theme.top_nav_bg);
      root.style.setProperty('--contrast', theme.contrast);
      root.style.setProperty('--contrast_border', theme.contrast_border);
    }
  }

  const contrastColors = (badge, columnBg) => {
    const ccc = new ColorContrastChecker();

    const bg = contrastColor({ bgColor: badge })
    const border = Color(contrastColor({ bgColor: columnBg })).fade(.88)

    return { bg: bg, border: border }
  }

  const changeCreateTheme = (target, value) => {

    const contrastCheck = contrastColors(createTheme.mention_badge, createTheme.column_bg)

    if(target === 'top_nav_text') {
      setCreateTheme(existingValues => ({
        ...existingValues,
        top_nav_text: toggle ? createTheme.text_color : value,
        contrast: contrastCheck.bg,
        contrast_Border: contrastCheck.border,
      }))
    } else if(target === 'top_nav_bg') {
      setCreateTheme(existingValues => ({
        ...existingValues,
        top_nav_bg: toggle ? createTheme.column_bg : value,
        contrast: contrastCheck.bg,
        contrast_Border: contrastCheck.border,
      }))
    } else {
      setCreateTheme(existingValues => ({
        ...existingValues,
        [target]: value,
        contrast: contrastCheck.bg,
        contrast_Border: contrastCheck.border,
      }))
    }

    changeTheme(createTheme)
  }

  const copyTheme = () => {
    let root

    if(typeof window !== "undefined") {
      root = document.documentElement

      const hover_item = getComputedStyle(root).getPropertyValue("--hover_item");
      const active_presence = getComputedStyle(root).getPropertyValue("--active_presence");
      const top_nav_text = getComputedStyle(root).getPropertyValue("--top_nav_text");
      const active_item = getComputedStyle(root).getPropertyValue("--active_item");
      const column_bg = getComputedStyle(root).getPropertyValue("--column_bg");
      const mention_badge = getComputedStyle(root).getPropertyValue("--mention_badge");
      const active_item_text = getComputedStyle(root).getPropertyValue("--active_item_text");
      const text_color = getComputedStyle(root).getPropertyValue("--text_color");
      const top_nav_bg = getComputedStyle(root).getPropertyValue("--top_nav_bg");

      const str = `${column_bg},#121016,${active_item},${active_item_text},${hover_item},${text_color},${active_presence},${mention_badge},${toggle ? column_bg : top_nav_bg},${toggle ? text_color : top_nav_text}`

      copyTextToClipboard(str)

      toast.success(`Copied to your clipboard`)
    }
  }

  const refresh = () => {
    changeTheme(defaultTheme)
    setCreateTheme(defaultTheme)
    toast(`Sidebar theme reset`)
  }

  return (
    <Layout
      title={'Create a Theme'}
      actions={<ButtonBar refresh={refresh} copyTheme={copyTheme} publish={setIsOpen}/>}
    >
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}/>
      <div className="flex w-full h-full">
        <div className="w-full md:w-1/2 xl:w-1/3 h-full border-r border-black border-opacity-10 dark:border-white dark:border-opacity-10 overflow-y-hidden">
          <h2 className="col-span-2 text-sm border-b border-black border-opacity-10 dark:border-white dark:border-opacity-10 py-4 px-4 xl:px-8">Customize Theme Colors</h2>
          <div className="grid grid-col-1 gap-4 py-4 px-4 xl:px-8 h-full overflow-y-scroll scrollbar-hide pb-96 relative">
            <div className="flex w-full items-center rounded-lg border border-black border-opacity-10 dark:border-white dark:border-opacity-10">
              <div className="w-1/3 relative h-12 bg-transparent border-r border-black border-opacity-10 dark:border-white dark:border-opacity-10">
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                  <Toggle
                    toggle={toggle}
                    setToggle={setToggle}
                    toggleLabel={'Minimal Header'}
                  />
                </div>
              </div>
              <div className={`text-base px-4 ${!toggle && 'opacity-60'}`}>{'Minimal Header'}</div>
            </div>
            <ColorPicker field={'column_bg'} label={'Column BG'} value={createTheme.column_bg} onChange={changeCreateTheme} />
            <ColorPicker field={'active_item'} label={'Active Item'} value={createTheme.active_item} onChange={changeCreateTheme} />
            <ColorPicker field={'active_item_text'} label={'Active Item Text'} value={createTheme.active_item_text} onChange={changeCreateTheme} />
            <ColorPicker field={'hover_item'} label={'Hover Item'} value={createTheme.hover_item} onChange={changeCreateTheme} />
            <ColorPicker field={'text_color'} label={'Text Color'} value={createTheme.text_color} onChange={changeCreateTheme} />
            <ColorPicker field={'active_presence'} label={'Active Presence'} value={createTheme.active_presence} onChange={changeCreateTheme} />
            <ColorPicker field={'mention_badge'} label={'Mention Badge'} value={createTheme.mention_badge} onChange={changeCreateTheme} />
            {
              !toggle && (
                <>
                  <ColorPicker field={'top_nav_bg'} label={'Top Nav BG'} value={createTheme.top_nav_bg} onChange={changeCreateTheme} />
                  <ColorPicker field={'top_nav_text'} label={'Top Nav Text'} value={createTheme.top_nav_text} onChange={changeCreateTheme} />
                </>
              )
            }
          </div>
        </div>
        <div className="hidden md:block w-full flex-1 h-full bg-zinc-100 dark:bg-zinc-800 relative">
        <div class="bg-info-0 border-l-4 border-info-500 text-info-900 p-4" role="alert">
          <p class="font-bold">Be Warned</p>
          <p>Something not ideal might be happening.</p>
        </div>
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-64">
            <Theme
              minimalHeader={toggle}
              theme={createTheme}
              favorite={false}
            />
          </div>
          <div className="bg-red-500 absolute bottom-0 left-0 right-0 overflow-x-hidden h-48">
            <div className="relative w-full">
              <textarea style={{ resize: 'none' }} wrap="hard" disabled rows="2" readOnly className="p-4 text-sm lg:text-base shadow bg-white dark:bg-zinc-900 w-full text-zinc-900 dark:text-white text-opacity-60 dark:text-opacity-60 absolute top-0 bottom-0 right-0 left-0 h-40 rounded-none" value={`${createTheme.column_bg},#121016,${createTheme.active_item},${createTheme.active_item_text},${createTheme.hover_item},${createTheme.text_color},${createTheme.active_presence},${createTheme.mention_badge},${toggle ? createTheme.column_bg : createTheme.top_nav_bg},${toggle ? createTheme.text_color : createTheme.top_nav_text}`}/>
              <button onClick={() => copyTheme()} className="shadow absolute top-4 right-4 border border-black border-opacity-10 dark:border-white dark:border-opacity-10 hover:bg-zinc-100 dark:hover:bg-zinc-800 px-2 py-1 text-base rounded-lg text-zinc-900 dark:text-white">Copy</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}