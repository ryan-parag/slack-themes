import React, { Component,Suspense } from "react";
import {hot} from "react-hot-loader/root";
import {Helmet} from "react-helmet";
import { ThemeProvider } from 'styled-components';

// Import Components
import GlobalStyle from "./components/Globals";
import Container from "./components/Container";
import Intro from "./components/Intro";
import ThemeList from "./components/ThemeList";
import Footer from "./components/Footer";
import Drawer from "./components/Drawer";
import { lightTheme, darkTheme } from './theme/theme';

// Main page
class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			filterText: '',
			isNeutralNav: false,
			themeLabel: false,
			show: true,
			theme: 'dark',
		}
	}

	filterUpdate(value) {
		this.setState({
			filterText: value
		})
	}

	neutralNavToggle() {
		this.setState({
			isNeutralNav: !this.state.isNeutralNav
		})
	}

	themeLabelToggle() {
		this.setState({
			themeLabel: !this.state.themeLabel
		})
	}

	toggleTheme() {
		this.setState({
			theme: this.state.theme === 'light' ? 'dark' : 'light'
		})
	}
	
	showDrawer() {
    this.setState({
			show: !this.state.show
		});
  };

	render() {
		// Register service worker
		if ('serviceWorker' in navigator) {
			window.addEventListener('load', () => {
				navigator.serviceWorker.register('/sw.js').then(registration => {
					console.log('SW registered:', registration);
				}).catch(error => {
					console.log('SW registration failed:', error);
				});
			});
		}

		return (
			<ThemeProvider theme={this.state.theme === 'light' ? lightTheme : darkTheme}>
				<GlobalStyle/>
				{
					this.state.show ? 
					(
						<Drawer
							show={this.state.show}
							showDrawer={this.showDrawer.bind(this)}
							isNeutralNav={this.state.isNeutralNav}
							neutralNavToggle={this.neutralNavToggle.bind(this)}
							themeLabel={this.state.themeLabel}
							themeLabelToggle={this.themeLabelToggle.bind(this)}
							toggleTheme={this.toggleTheme.bind(this)}
							theme={this.state.theme}
						/>
					)
					:
					null
				}
				<Container>
					<Helmet>
							<meta charSet="utf-8" />
							<title>Slack Themes</title>
					</Helmet>
					<Suspense fallback={<div>Loading...</div>}>
						<Intro
							show={this.state.show}
							showDrawer={this.showDrawer.bind(this)}
						/>
						<ThemeList
							themes={this.props.themes}
							filterText={this.state.filterText}
							filterUpdate={this.filterUpdate.bind(this)}
							isNeutralNav={this.state.isNeutralNav}
							themeLabel={this.state.themeLabel}
						/>
					</Suspense>
				</Container>
				<Footer />
			</ThemeProvider>
		);
	}
};

export default hot(App);
