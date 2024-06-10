import { ClientAPI } from "@rbxts/commander";
import React, { createContext } from "@rbxts/react";

interface ApiProviderProps extends React.PropsWithChildren {
	api: ClientAPI;
}

export const ApiContext = createContext<ClientAPI>({} as never);

export function ApiProvider({ api, children }: ApiProviderProps) {
	return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
}
