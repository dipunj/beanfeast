import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import defaultGetLayout from '../components/Layouts/NextLayout';
import SessionCtxProvider from '../components/Context';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import React from 'react';
import Providers from '../components/Providers';

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

				{/* font style for beanfeast logo */}
				<link
					href="https://fonts.googleapis.com/css2?family=Condiment&display=swap"
					rel="stylesheet"
					key="google-font-condiment"
				/>
			</Head>
			<SessionCtxProvider>
				<Providers>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline />
					{getLayout(<Component {...pageProps} />)}
				</Providers>
			</SessionCtxProvider>
		</>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
};
