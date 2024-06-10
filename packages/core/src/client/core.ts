import { RunService } from "@rbxts/services";
import { getRemotes } from "../shared/network";
import { ClientDispatcher } from "./dispatcher";
import { DEFAULT_CLIENT_OPTIONS } from "./options";
import { ClientRegistry } from "./registry";
import { ClientOptions } from "./types";

export namespace CenturionClient {
	let started = false;
	const registryInstance = new ClientRegistry();
	const dispatcherInstance = new ClientDispatcher(registryInstance);
	let optionsObject = DEFAULT_CLIENT_OPTIONS;

	const IS_CLIENT = RunService.IsClient();

	/**
	 * Starts {@link CenturionClient}.
	 *
	 * @param callback The run callback
	 * @param options Client options
	 */
	export async function start(
		callback?: (registry: ClientRegistry) => void,
		options: Partial<ClientOptions> = {},
	) {
		assert(IS_CLIENT, "CenturionClient can only be started from the client");
		assert(!started, "Centurion has already been started");

		optionsObject = {
			...DEFAULT_CLIENT_OPTIONS,
			...options,
		};

		if (optionsObject.network === undefined) {
			const remotes = getRemotes();
			optionsObject.network = {
				syncStart: {
					Fire: () => remotes.syncStart.FireServer(),
				},
				syncDispatch: {
					Connect: (callback) => {
						remotes.syncDispatch.OnClientEvent.Connect(callback);
					},
				},
				execute: {
					Invoke: (path, text) => remotes.execute.InvokeServer(path, text),
				},
			};
		}

		dispatcherInstance.init(optionsObject);
		registryInstance.init(optionsObject);

		callback?.(registryInstance);
		await registryInstance.sync();
		started = true;
		options.interface?.({
			registry: registryInstance,
			dispatcher: dispatcherInstance,
			options: optionsObject,
		});
	}

	export function registry() {
		assertAccess("registry");
		return registryInstance;
	}

	export function dispatcher() {
		assertAccess("dispatcher");
		return dispatcherInstance;
	}

	export function options() {
		assertAccess("options");
		return optionsObject;
	}

	function assertAccess(name: string) {
		assert(IS_CLIENT, `Client ${name} cannot be accessed from the server`);
		assert(started, "Centurion has not been started yet");
	}
}
