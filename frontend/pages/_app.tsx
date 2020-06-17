import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import defaultGetLayout from '../components/Layouts/NextLayout';
import Providers from './Providers';
import SessionCtxProvider from '../components/Context';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import React from 'react';

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
	whyDidYouRender(React, {
		trackAllPureComponents: true,
	});
}

export default function MyApp(props) {
	const { Component, pageProps } = props;
	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	// use the getLayout function to get the layout of the page
	const getLayout = Component.getLayout || ((page) => defaultGetLayout(page));

	return (
		<>
			<Head>
				<title>{process.env.NEXT_PUBLIC_PROJECT_TITLE || 'Beanfeast'}</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Condiment&display=swap"
					rel="stylesheet"
					key="google-font-condiment"
				/>
				<link
					rel="stylesheet"
					href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
					integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
					crossOrigin=""
				/>
			</Head>
			<SessionCtxProvider>
				<Providers>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline />
					{getLayout(<Component {...pageProps} />)}
				</Providers>
			</SessionCtxProvider>
			<script
				src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
				integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
				crossOrigin=""
			/>
		</>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
};
