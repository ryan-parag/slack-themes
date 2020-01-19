import React, { Component } from 'react';
import SlackWidget from './SlackWidget';
import ThemeGrid from './ThemeGrid';
import SearchInput from './SearchInput';
import { ContainerItemLarge } from './ContainerItem';
import themes from '../data/themes';

const ThemeList = () => {
  return (
    <ContainerItemLarge>
      <SearchInput />
      <ThemeGrid>
      {themes.map(theme => (
        <SlackWidget 
          title={theme.name}
          columnBg={theme.colors.columnBg}
          menuBgHover={theme.colors.menuBgHover}
          activeItem={theme.colors.activeItem}
          activeItemText={theme.colors.activeItemText}
          hoverItem={theme.colors.hoverItem}
          textColor={theme.colors.textColor}
          activePresence={theme.colors.activePresence}
          mentionBadge={theme.colors.mentionBadge}
        />
      ))}
      </ThemeGrid>
    </ContainerItemLarge>
  )
}

export default ThemeList;