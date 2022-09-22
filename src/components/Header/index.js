import Logo from "@components/Logo"
import { Menu, Info, ArrowLeft } from "react-feather"
import Link from 'next/link'

const Header = ({ setOpen, open }) => {
  return(
    <header className={`h-16 flex w-full lg:hidden flex justify-between items-center px-4 py-2 column_bg--bg text_color--text border-b border-white border-opacity-10 transition ${open && 'translate-x-64'}`}>
      <div className="flex items-center">
        <button onClick={() => setOpen(!open)}>
          {
            open ? (
              <ArrowLeft size={24}/>
            )
            :
            (
              <Menu size={24}/>
            )
          }
        </button>
        {
          !open && (
            <Link href="/">
              <a className="ml-4 inline-flex items-center">
                <Logo/>
                <span className="font-bold pl-2">Slack Themes</span>
              </a>
            </Link>
          )
        }
      </div>
      <Link href="/about">
        <a>
          <Info size={24}/>
        </a>
      </Link>
    </header>
  )
}

export default Header