import { CenturionClient } from "@rbxts/centurion";
import { CenturionInterface } from "@rbxts/centurion-ui";

CenturionClient.start(
	(registry) => {
		if (script.Parent === undefined) return;
		const commandContainer = script.Parent.WaitForChild("commands");
		registry.load(commandContainer);
		registry.register();
	},
	{
		interface: CenturionInterface.create(),
	},
)
	.catch((err) => {
		warn(`An error occurred and Centurion could not be started: ${err}`);
	})
	.await();
