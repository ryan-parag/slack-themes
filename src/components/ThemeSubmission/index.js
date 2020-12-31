import React from 'react'
import TimeAgo from 'timeago-react'

const ThemeSubmission = ({theme}) => {

  const swatchClass = 'transition transform border border-gray-300 dark:border-gray-600 w-4 h-4 rounded-full inline-block mr-2'

  const convertTime = secs => {
    var t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    return t;
  }

  return (
    <div className="flex w-full">
      <div>
        {
          theme.submittedBy && theme.submittedBy !== 'Unknown'? (
            <div
              className={`rounded-full inline-flex w-10 h-10 items-center justify-center bg-white shadow bg-cover text-gray-600 border border-gray-200 font-bold`}
            >
              {theme.submittedBy.charAt(0)}
            </div>
          )
          :
          (
            <img className="rounded-full w-10 h-10" src="/slackbot.svg"/>
          )
        }
      </div>
      <div className="flex flex-col w-full pl-4 mb-2">
        <p className="text-gray-600 text-sm mb-2 dark:text-white">
          <strong>{theme.submittedBy !== 'Unknown' && theme.submittedBy ? theme.submittedBy : 'Unknown'}</strong> submitted <strong>{theme.theme_name}</strong>!
        </p>
        <div className="flex mb-2">
          <span className={swatchClass} style={{ background: theme.active_item}}></span>
          <span className={swatchClass} style={{ background: theme.active_item_text}}></span>
          <span className={swatchClass} style={{ background: theme.active_presence}}></span>
          <span className={swatchClass} style={{ background: theme.column_bg}}></span>
          <span className={swatchClass} style={{ background: theme.hover_item}}></span>
          <span className={swatchClass} style={{ background: theme.mention_badge}}></span>
          <span className={swatchClass} style={{ background: theme.text_color}}></span>
          <span className={swatchClass} style={{ background: theme.top_nav_bg}}></span>
          <span className={swatchClass} style={{ background: theme.top_nav_text}}></span>
        </div>
        <small className="text-gray-500 dark:text-gray-400 text-xs">
          {
            theme.created ? (
              <TimeAgo
                datetime={convertTime(theme.created.seconds)}
                locale='en_US'
              />
            )
            :
            null
          }
        </small>
      </div>
    </div>
  )
}

export default ThemeSubmission