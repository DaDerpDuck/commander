import { CommanderClient } from "@rbxts/commander";
import { CommanderInterface } from "@rbxts/commander-ui";

CommanderClient.start(
	(registry) => {
		if (script.Parent === undefined) return;
		const commandContainer = script.Parent.WaitForChild("commands");
		registry.load(commandContainer);
		registry.register();
	},
	{
		interface: CommanderInterface.create(),
	},
)
	.catch((err) => {
		warn(`An error occurred and Commander could not be started: ${err}`);
	})
	.await();
