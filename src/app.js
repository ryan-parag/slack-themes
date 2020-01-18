import React, { Suspense } from 'react';
import {hot} from 'react-hot-loader/root';


// Import modern-normalize & fonts
import 'modern-normalize/modern-normalize.css';

// Import Components
import GlobalStyle from './components/globals';
import Container from './components/Container';
import themes from './data/themes';
import Logo from './components/Logo';
import SlackWidget from './components/SlackWidget';
import ThemeGrid from './components/ThemeGrid';
import { H1,H2,H3,H4,H5,H6 } from './components/text';
import { ContainerItemSmall, ContainerItemLarge } from './components/ContainerItem';
import { ButtonBlock } from './components/Button';

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
			<Suspense fallback={<div>Loading...</div>}>
				<ContainerItemSmall>
					<Logo />
					<H2>Pick a theme for Slack</H2>
					<H5>Having trouble keeping track of all of your Slack workspaces?</H5>
					<p>Choose and copy one of the themes below to personalize a Slack workspace.</p>
					<p>How to:</p>
					<ol>
						<li>Copy a theme</li>
						<li>Paste in a Slack Channel</li>
						<li>Click the <strong>Switch sidebar theme</strong> button that Slack generates for you.</li>
					</ol>
					<Counter/>
				</ContainerItemSmall>
				<ContainerItemLarge>
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
			</Suspense>
			<GlobalStyle/>
		</Container>
	);
};

export default hot(App);
