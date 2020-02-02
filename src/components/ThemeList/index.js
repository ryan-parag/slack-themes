import React, { Component } from 'react';
import SlackWidget from '../SlackWidget';
import ThemeGrid from '../ThemeGrid';
import SearchInput from '../SearchInput';
import { ContainerItemLarge } from '../ContainerItem';
import themes from '../../data/themes';

class ThemeList extends Component {
  render() {

    const { themes } = this.props;
    const themesList = themes
      .map(theme => {
        return (
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
        )
      })

    return (
      <ContainerItemLarge>
        <SearchInput />
        <ThemeGrid>
          {themesList}
        </ThemeGrid>
      </ContainerItemLarge>
    )

  }
}

export default ThemeList;