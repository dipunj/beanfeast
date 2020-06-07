import { createContext, useState, useEffect } from 'react';
import { getFromLS, saveToLS } from '../../utils/localStorage';

const SessionCtx = createContext({ ctx: { darkMode: false }, setCtx: (old) => {} });

const SessionCtxProvider = ({ children }) => {
	const [ctx, setCtx] = useState({});

	useEffect(() => {
		let savedPref = getFromLS('darkMode');

		if (savedPref === null) {
			// first time visit, create darkMode in localstorage
			saveToLS('darkMode', false);
			savedPref = false;
		}

		setCtx((ctx) => ({
			...ctx,
			darkMode: savedPref,
		}));
	}, []);

	return Object.keys(ctx).length == 0 ? null : (
		<SessionCtx.Provider value={{ ctx, setCtx }}>{children}</SessionCtx.Provider>
	);
};

const SessionCtxConsumer = SessionCtx.Consumer;

export default SessionCtxProvider;
export { SessionCtxConsumer, SessionCtx };
