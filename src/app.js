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
import { Badge } from './components/Badge';
import SearchInput from './components/SearchInput';

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
						<li>Click the <Badge>Switch sidebar theme</Badge> button that Slack generates for you.</li>
					</ol>
					<p>
						<small>
							Don't see a theme you're looking for? <a href="#" target="_blank">Submit a theme</a>.
							<br />
							Designed and Developed by <a href="#" target="_blank">Ryan Parag</a>
						</small>
					</p>
				</ContainerItemSmall>
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
			</Suspense>
			<GlobalStyle/>
		</Container>
	);
};

export default hot(App);
