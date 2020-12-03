import React from 'react';
import ThemeItem from '../ThemeItem';

const ThemeList = ({data, neutralNav, themeLabel}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
      {
        data.map(theme => (
          <div key={Math.random()}>
            <ThemeItem
              theme={theme}
              neutralNav={neutralNav}
              themeLabel={themeLabel}
              withLikes
            />
          </div>
        ))
      }
    </div>
  )
};

export default ThemeList;