import React, { Component } from 'react';
import SlackWidget from '../SlackWidget';
import ThemeGrid from '../ThemeGrid';
import SearchInput from '../SearchInput';
import { ContainerItemLarge } from '../ContainerItem';
import themes from '../../data/themes';

class ThemeList extends Component {
  render() {
    const { themes, filterText } = this.props;
    const themesList = themes
      .filter(theme => {
        return theme.name.toLowerCase().indexOf(filterText.toLowerCase()) >= 0
      })
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
        <SearchInput
          filterText={this.props.filterText}
          filterUpdate={this.props.filterUpdate.bind(this)}
        />
        <ThemeGrid>
          {themesList}
        </ThemeGrid>
      </ContainerItemLarge>
    )

  }
}

export default ThemeList;