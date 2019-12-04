import React, {Suspense} from 'react';
import {hot} from 'react-hot-loader/root';

// Import modern-normalize & fonts
import 'modern-normalize/modern-normalize.css';

// Import Components
import GlobalStyle from './components/globals';
import Container from './components/container';
import Logo from './components/logo';
import themes from './data/themes';
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

	return (
		<Container>
			<Logo />
			<p>Example site using Styled React Boilerplate!</p>
			{themes.map(theme => (
				<div>{theme.name}</div>
			))}
			<Suspense fallback={<div>Loading...</div>}>
				<Counter/>
			</Suspense>
			<GlobalStyle/>
		</Container>
	);
};

export default hot(App);
