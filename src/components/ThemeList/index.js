import React, { Component } from 'react';
import SlackWidget from '../SlackWidget';
import ThemeGrid from '../ThemeGrid';
import SearchInput from '../SearchInput';
import { ContainerItemLarge } from '../ContainerItem';
import EmptyState from '../EmptyState';

class ThemeList extends Component {
  render() {
    const { themes, filterText } = this.props;
    const filteredThemes = themes.filter(theme => {
      return theme.name.toLowerCase().indexOf(filterText.toLowerCase()) >= 0
    })
    const themesList = filteredThemes
      .map(theme => {
        return (
          <SlackWidget 
            theme={theme}
            key={theme.name}
            isNeutralNav={this.props.isNeutralNav}
          />
        )
      })

    return (
      <ContainerItemLarge>
        <SearchInput
          filterText={this.props.filterText}
          filterUpdate={this.props.filterUpdate.bind(this)}
        />
        { filteredThemes.length === 0 ?
          <EmptyState filterText={filterText} />
          :
          <ThemeGrid>
            {themesList}
          </ThemeGrid>
        }
      </ContainerItemLarge>
    )

  }
}

export default ThemeList;