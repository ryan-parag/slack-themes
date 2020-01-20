import React, { Suspense } from "react";
import {hot} from "react-hot-loader/root";
import {Helmet} from "react-helmet";


// Import modern-normalize & fonts
import "modern-normalize/modern-normalize.css";

// Import Components
import GlobalStyle from "./components/Globals";
import Container from "./components/Container";
import Intro from "./components/Intro";
import ThemeList from "./components/ThemeList";
import Footer from "./components/Footer";

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
		<div>
			<Container>
				<Helmet>
						<meta charSet="utf-8" />
						<title>Slack Themes</title>
				</Helmet>
				<Suspense fallback={<div>Loading...</div>}>
					<Intro />
					<ThemeList />
				</Suspense>
				<GlobalStyle/>
			</Container>
			<Footer />
		</div>
	);
};

export default hot(App);
