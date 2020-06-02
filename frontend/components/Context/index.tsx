import { createContext, useState } from 'react';

const SessionCtx = createContext({});

const SessionCtxProvider = ({ children }) => {
	const [context, setContext] = useState({ sessionData: {}, poolData: {} });

	return <SessionCtx.Provider value={{ context, setContext }}>{children}</SessionCtx.Provider>;
};

const SessionCtxConsumer = SessionCtx.Consumer;

export default SessionCtxProvider;
export { SessionCtxConsumer, SessionCtx };
