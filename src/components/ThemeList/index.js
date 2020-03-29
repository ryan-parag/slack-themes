import React, { Component } from 'react';
import SlackWidget from '../SlackWidget';
import ThemeGrid from '../ThemeGrid';
import SearchInput from '../SearchInput';
import { ContainerItemLarge } from '../ContainerItem';

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
            theme={theme}
            key={theme.name}
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