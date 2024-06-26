import { CommandContextData } from "../shared";
import { SyncData } from "../shared/network";
import { SharedOptions } from "../shared/options";

export interface ClientOptions extends SharedOptions {
	historyLength: number;
	interface?: () => void;
	network?: ClientNetworkOptions;
	shortcutsEnabled?: boolean;
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
		Invoke: (path: string, args: string[]) => CommandContextData;
	}
}
