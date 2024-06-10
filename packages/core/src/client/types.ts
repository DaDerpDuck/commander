import { CommandContextData } from "../shared";
import { SyncData } from "../shared/network";
import { SharedOptions } from "../shared/options";
import { ClientDispatcher } from "./dispatcher";
import { ClientRegistry } from "./registry";

export interface ClientAPI {
	registry: ClientRegistry;
	dispatcher: ClientDispatcher;
	options: ClientOptions;
}

export type ClientInterface = (api: ClientAPI) => void;

export interface ClientOptions extends SharedOptions {
	historyLength: number;
	interface?: ClientInterface;
	network?: ClientNetworkOptions;
}

export interface ClientNetworkOptions {
	syncStart: ClientRemotes.SyncStart;
	syncDispatch: ClientRemotes.SyncDispatch;
	execute: ClientRemotes.Execute;
}

export interface HistoryEntry {
	text: string;
	success: boolean;
	sentAt: number;
}

export namespace ClientRemotes {
	export interface SyncStart {
		Fire: () => void;
	}

	export interface SyncDispatch {
		Connect: (callback: (data: SyncData) => void) => void;
	}

	export interface Execute {
		Invoke: (path: string, text: string) => CommandContextData;
	}
}
