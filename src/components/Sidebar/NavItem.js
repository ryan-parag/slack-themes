import Link from 'next/link';
import Image from 'next/image';

const NavItem = ({ label, link, icon, active, badge, user }) => {
  if(link.includes('http')) {
    return(
      <a href={link} target="_blank" className={`flex items-center px-3 py-2 text-sm transition ${active ? 'active_item--bg active_item_text--text ': 'text_color--text hover:hover_item--bg'}`}>
        <div className="h-5 w-5 relative">
          {
            user ? (
              <>
                <div className="h-5 w-5 bg-blue-500 bg-gradient-to-tl from-indigo-300 via-green-300 to-yellow-200 relative rounded-md overflow-hidden">
                  <Image src={`/profiles/${user}.png`} layout="fill"/>
                </div>
                <span className={`h-2 w-2 ${label.toLowerCase().includes('ryan') ? 'active_presence--bg' : 'border border-current text_color--text column_bg--bg'} rounded-full absolute -bottom-0.5 -right-0.5 z-10`}/>
              </>
            )
            :
            (
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="m9 3.75-2.5 14.5m7.25-14.5-2.5 14.5m-7.5-10.5h13.5m-14.5 7h13.5"></path>
              </svg>
            )
          }
        </div>
        <div className="pl-3 flex w-full">
          {label}
        </div>
        {
          badge && (
            <div className={`text-xs mention_badge--bg contrast inline-flex items-center h-5 px-2 rounded-full`}>
              {badge}
            </div>
          )
        }
      </a>
    )
  }
  return(
    <Link href={link}>
      <a className={`flex items-center px-3 py-2 text-sm transition ${active ? 'active_item--bg active_item_text--text ': 'text_color--text hover:hover_item--bg'}`}>
        <div className="h-5 w-5 relative">
          {
            user ? (
              <div className="h-5 w-5 relative bg-white rounded-md overflow-hidden">
                <Image src={`/profile/${user}.png`}/>
              </div>
            )
            :
            (
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="m9 3.75-2.5 14.5m7.25-14.5-2.5 14.5m-7.5-10.5h13.5m-14.5 7h13.5"></path>
              </svg>
            )
          }
        </div>
        <div className="pl-3 flex w-full">
          {label}
        </div>
        {
          badge && (
            <div className="text-xs mention_badge--bg contrast inline-flex items-center h-5 px-2 rounded-full">
              {badge}
            </div>
          )
        }
      </a>
    </Link>
  )
}

export default NavItem;