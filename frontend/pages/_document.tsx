import Document, { DocumentContext } from 'next/document';
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core/styles';

export default class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const styledSheet = new StyledComponentSheets();
		const materialSheet = new MaterialUiServerStyleSheets();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						styledSheet.collectStyles(materialSheet.collect(<App {...props} />)),
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{materialSheet.getStyleElement()}
						{styledSheet.getStyleElement()}
					</>
				),
			};
		} finally {
			styledSheet.seal();
		}
	}
}
