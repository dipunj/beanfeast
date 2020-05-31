import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';
import { defaultGetLayout } from '../components/util';

export default function MyApp(props) {
	const { Component, pageProps } = props;

	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	// use the getLayout function to get the layout of the page
	const getLayout = Component.getLayout || ((page) => defaultGetLayout(page));

	return (
		<React.Fragment>
			<Head>
				<title>{process.env.PROJECT_TITLE || 'Beanfeast'}</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Condiment&display=swap"
					rel="stylesheet"
					key="google-font-condiment"
				/>
			</Head>
			<ThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				{getLayout(<Component {...pageProps} />)}
			</ThemeProvider>
		</React.Fragment>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
};
