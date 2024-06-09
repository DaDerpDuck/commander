import { Command, CommandContext, CommanderType } from "@rbxts/commander";
import { CommanderInterface, DefaultPalette } from "@rbxts/commander-ui";

export class ThemeCommand {
	@Command({
		name: "theme",
		description: "Change the interface's palette",
		arguments: [
			{
				name: "name",
				description: "The name of the palette to set",
				type: CommanderType.String,
				suggestions: ["mocha", "macchiato", "frappe", "latte"],
			},
		],
	})
	theme(ctx: CommandContext, theme: string) {
		if (!(theme in DefaultPalette)) {
			ctx.error("Invalid theme");
			return;
		}

		CommanderInterface.setOptions({
			palette: DefaultPalette[theme as never],
		});
		ctx.reply(`Set theme to '${theme}'`);
	}
}
