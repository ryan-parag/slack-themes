import Logo from '@components/Logo'
import Link from 'next/link';
import { Search, Copy, Info, GitHub, Edit2 } from 'react-feather';
import Section from './Section';
import toast from 'react-hot-toast';

async function copyTextToClipboard(text) {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text);
  }
}

const CopyButton = () => {

  const copyTheme = () => {
    const root = document.documentElement

    const hover_item = getComputedStyle(root).getPropertyValue("--hover_item");
    const active_presence = getComputedStyle(root).getPropertyValue("--active_presence");
    const top_nav_text = getComputedStyle(root).getPropertyValue("--top_nav_text");
    const active_item = getComputedStyle(root).getPropertyValue("--active_item");
    const column_bg = getComputedStyle(root).getPropertyValue("--column_bg");
    const mention_badge = getComputedStyle(root).getPropertyValue("--mention_badge");
    const active_item_text = getComputedStyle(root).getPropertyValue("--active_item_text");
    const text_color = getComputedStyle(root).getPropertyValue("--text_color");
    const top_nav_bg = getComputedStyle(root).getPropertyValue("--top_nav_bg");

    const str = `${column_bg},#121016,${active_item},${active_item_text},${hover_item},${text_color},${active_presence},${mention_badge},${top_nav_bg},${top_nav_text}`

    copyTextToClipboard(str)

    toast.success(`Copied to your clipboard`)
  }

  return(
    <button
      className="text-sm border contrast--border text-color shadow text-center px-2 py-3 rounded-md flex w-full items-center justify-center transition hover:hover_item--bg text_color--text"
      onClick={() => copyTheme()}
    >
      <Copy size={16} className="mr-2"/>
      Copy Sidebar Theme
    </button>
  )
}

const ThemeIcon = () => {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 42 37" fill="none" className="mr-1">
      <path d="M24.4039 11.0513L20.9736 10.2957C20.896 10.2731 20.8263 10.2297 20.7722 10.1703C20.7183 10.1109 20.6822 10.0379 20.6682 9.95949C20.6542 9.88108 20.6627 9.80038 20.6927 9.72644C20.7227 9.65251 20.773 9.58826 20.8381 9.54091L23.7987 7.67789L24.5675 4.30664C24.5904 4.23029 24.6346 4.16177 24.695 4.10876C24.7556 4.05574 24.8299 4.02034 24.9096 4.00651C24.9893 3.99268 25.0715 4.001 25.1467 4.0305C25.2221 4.06001 25.2874 4.10953 25.3356 4.17355L27.2312 7.08307L30.6616 7.83862C30.7392 7.86122 30.809 7.90466 30.8629 7.96405C30.9168 8.02343 30.9529 8.09643 30.967 8.17484C30.981 8.25323 30.9727 8.33394 30.9425 8.40787C30.9125 8.48182 30.8621 8.54606 30.797 8.59342L27.8364 10.4564L27.0676 13.8277C27.0447 13.904 27.0005 13.9726 26.9401 14.0256C26.8797 14.0786 26.8053 14.114 26.7255 14.1278C26.6458 14.1416 26.5637 14.1333 26.4885 14.1038C26.4133 14.0743 26.3478 14.0248 26.2996 13.9608L24.4039 11.0513Z" fill="#FACD51"/>
      <path d="M30.2575 23.9484L33.6879 24.7038C33.7657 24.7265 33.8353 24.7699 33.8894 24.8293C33.9433 24.8887 33.9792 24.9616 33.9935 25.0402C34.0075 25.1185 33.999 25.1992 33.969 25.2731C33.939 25.347 33.8886 25.4113 33.8235 25.4586L30.8629 27.3216L30.0941 30.6929C30.071 30.7693 30.0268 30.8378 29.9664 30.8909C29.906 30.9439 29.8318 30.9792 29.752 30.9931C29.6723 31.0069 29.59 30.9986 29.5148 30.9691C29.4396 30.9396 29.3743 30.8899 29.3261 30.8261L27.4304 27.9166L24.0001 27.161C23.9223 27.1383 23.8526 27.0948 23.7987 27.0355C23.7446 26.9761 23.7087 26.9032 23.6947 26.8248C23.6805 26.7462 23.689 26.6656 23.719 26.5916C23.749 26.5177 23.7995 26.4535 23.8646 26.4062L26.8252 24.5432L27.5938 21.1719C27.6169 21.0955 27.6611 21.027 27.7215 20.9741C27.7819 20.9209 27.8562 20.8856 27.9361 20.8718C28.0158 20.8579 28.098 20.8662 28.1732 20.8957C28.2484 20.9252 28.3137 20.9748 28.3619 21.0389L30.2575 23.9484Z" fill="#FACD51"/>
      <path d="M25.3027 17.1644C25.4644 17.3425 25.5724 17.5613 25.6146 17.7963C25.6566 18.0314 25.6314 18.2733 25.5414 18.495C25.4516 18.7167 25.3006 18.9094 25.1054 19.0514L19.9777 22.7889L18.1589 28.8024C18.0898 29.0311 17.9571 29.2365 17.7759 29.3952C17.5947 29.5541 17.3721 29.6602 17.1329 29.7017C16.8938 29.743 16.6477 29.7182 16.4221 29.6299C16.1966 29.5415 16.0005 29.3933 15.8559 29.2014L12.0535 24.1621L5.93483 22.3734C5.70208 22.3055 5.49318 22.1751 5.33157 21.9971C5.16997 21.819 5.06202 21.6002 5.01985 21.3653C4.97769 21.1301 5.00298 20.8882 5.09285 20.6665C5.18274 20.4449 5.33368 20.2522 5.52875 20.1101L10.6559 16.3728L12.4753 10.3597C12.7577 9.42759 14.1886 9.17964 14.7783 9.9606L18.5802 14.9996L24.6993 16.7881C24.932 16.856 25.1411 16.9863 25.3027 17.1644Z" fill="#FACD51"/>
      <path d="M24.4039 11.0513L20.9736 10.2957C20.896 10.2731 20.8263 10.2297 20.7722 10.1703C20.7183 10.1109 20.6822 10.0379 20.6682 9.95949C20.6542 9.88108 20.6627 9.80038 20.6927 9.72644C20.7227 9.65251 20.773 9.58826 20.8381 9.54091L23.7987 7.67789L24.5675 4.30664C24.5904 4.23029 24.6346 4.16177 24.695 4.10876C24.7556 4.05574 24.8299 4.02034 24.9096 4.00651C24.9893 3.99268 25.0715 4.001 25.1467 4.0305C25.2221 4.06001 25.2874 4.10953 25.3356 4.17355L27.2312 7.08307L30.6616 7.83862C30.7392 7.86122 30.809 7.90466 30.8629 7.96405C30.9168 8.02343 30.9529 8.09643 30.967 8.17484C30.981 8.25323 30.9727 8.33394 30.9425 8.40787C30.9125 8.48182 30.8621 8.54606 30.797 8.59342L27.8364 10.4564L27.0676 13.8277C27.0447 13.904 27.0005 13.9726 26.9401 14.0256C26.8797 14.0786 26.8053 14.114 26.7255 14.1278C26.6458 14.1416 26.5637 14.1333 26.4885 14.1038C26.4133 14.0743 26.3478 14.0248 26.2996 13.9608L24.4039 11.0513Z" stroke="#E9B832" strokeWidth="2"/>
      <path d="M30.2575 23.9484L33.6879 24.7038C33.7657 24.7265 33.8353 24.7699 33.8894 24.8293C33.9433 24.8887 33.9792 24.9616 33.9935 25.0402C34.0075 25.1185 33.999 25.1992 33.969 25.2731C33.939 25.347 33.8886 25.4113 33.8235 25.4586L30.8629 27.3216L30.0941 30.6929C30.071 30.7693 30.0268 30.8378 29.9664 30.8909C29.906 30.9439 29.8318 30.9792 29.752 30.9931C29.6723 31.0069 29.59 30.9986 29.5148 30.9691C29.4396 30.9396 29.3743 30.8899 29.3261 30.8261L27.4304 27.9166L24.0001 27.161C23.9223 27.1383 23.8526 27.0948 23.7987 27.0355C23.7446 26.9761 23.7087 26.9032 23.6947 26.8248C23.6805 26.7462 23.689 26.6656 23.719 26.5916C23.749 26.5177 23.7995 26.4535 23.8646 26.4062L26.8252 24.5432L27.5938 21.1719C27.6169 21.0955 27.6611 21.027 27.7215 20.9741C27.7819 20.9209 27.8562 20.8856 27.9361 20.8718C28.0158 20.8579 28.098 20.8662 28.1732 20.8957C28.2484 20.9252 28.3137 20.9748 28.3619 21.0389L30.2575 23.9484Z" stroke="#E9B832" strokeWidth="2"/>
      <path d="M25.3027 17.1644C25.4644 17.3425 25.5724 17.5613 25.6146 17.7963C25.6566 18.0314 25.6314 18.2733 25.5414 18.495C25.4516 18.7167 25.3006 18.9094 25.1054 19.0514L19.9777 22.7889L18.1589 28.8024C18.0898 29.0311 17.9571 29.2365 17.7759 29.3952C17.5947 29.5541 17.3721 29.6602 17.1329 29.7017C16.8938 29.743 16.6477 29.7182 16.4221 29.6299C16.1966 29.5415 16.0005 29.3933 15.8559 29.2014L12.0535 24.1621L5.93483 22.3734C5.70208 22.3055 5.49318 22.1751 5.33157 21.9971C5.16997 21.819 5.06202 21.6002 5.01985 21.3653C4.97769 21.1301 5.00298 20.8882 5.09285 20.6665C5.18274 20.4449 5.33368 20.2522 5.52875 20.1101L10.6559 16.3728L12.4753 10.3597C12.7577 9.42759 14.1886 9.17964 14.7783 9.9606L18.5802 14.9996L24.6993 16.7881C24.932 16.856 25.1411 16.9863 25.3027 17.1644Z" stroke="#E9B832" strokeWidth="2"/>
    </svg>
  )
}

const Sidebar = () => {

  const sidebarItems = [
    {
      label: 'Explore Themes',
      link: '/',
      icon: <Search size={16}/>
    }, {
      label: 'Playground',
      link: '/create-a-theme',
      icon: <Edit2 size={16}/>
    }, {
      label: 'About',
      link: '/about',
      icon: <Info size={16}/>
    }, {
      label: 'Contribute',
      link: 'https://github.com/ryan-parag/slack-themes',
      icon: <GitHub size={16}/>,
      badge: 3
    }
  ]

  const creators = [
    {
      label: 'Ryan Parag',
      link: 'https://ryanparag.com',
      user: 'ryan'
    }, {
      label: 'Matt Broughton',
      link: 'https://matt-broughton.com/',
      user: 'matt'
    }
  ]

  return(
    <div className="w-full h-full column_bg--bg border-r contrast--border overflow-y-scroll scrollbar-hide flex flex-col justify-between">
      <div className="w-full">
        <Link href="/">
          <a className="flex items-center px-3 py-4 hover:hover_item--bg transition border-b contrast--border ">
            <Logo/>
            <div className="pl-3 text-lg text_color--text font-semibold">Slack Themes</div>
          </a>
        </Link>
        <ul className="border-b contrast--border py-2">
          <li className="px-3">
            <Link href="/create-a-theme">
              <a className="text-sm border contrast--border text-color shadow text-center px-2 py-2 rounded-md flex w-full items-center justify-center transition hover:hover_item--bg text_color--text">
                <ThemeIcon/>
                Create a Theme
              </a>
            </Link>
          </li>
        </ul>
        <Section items={sidebarItems}/>
        <Section items={creators} title={'Created By'}/>
      </div>
      <div className="px-3 pt-3 pb-8 border-t contrast--border">
        <CopyButton/>
      </div>
    </div>
  )
}

export default Sidebar;