import React, {Suspense} from 'react';
import {hot} from 'react-hot-loader/root';
import styled from 'styled-components';


// Import modern-normalize & fonts
import 'modern-normalize/modern-normalize.css';

// Import Components
import GlobalStyle from './components/globals';
import Container from './components/container';
import { H1,H2,H3,H4,H5,H6 } from './components/text';
import themes from './data/themes';
import slackWidget from './components/slackWidget';
import ThemeGrid from './components/themeGrid';

const Counter = React.lazy(() => import('./components/counter'));

// Main page
const App = () => {
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

const SlackTheme = styled.div`
	color: ${props => props.color || "inherit"};
	background: ${props => props.background || "transparent"};
	padding: 8px;
	margin-bottom: 8px;
	font-size: 1.4rem;
`;

	return (
		<Container>
			<H1>Header 1</H1>
			<H2>Header 2</H2>
			<H3>Header 3</H3>
			<H4>Header 4</H4>
			<H5>Header 5</H5>
			<H6>Header 6</H6>
			<p>Example site using Styled React Boilerplate!</p>
			{themes.map(theme => {
				<slackWidget title={theme.name} />
			})}
			<Suspense fallback={<div>Loading...</div>}>
				<Counter/>
			</Suspense>
			<GlobalStyle/>
		</Container>
	);
};

export default hot(App);
