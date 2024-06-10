import {
	BuiltInType,
	Centurion,
	Command,
	CommandContext,
} from "@rbxts/centurion";
import { CenturionInterface, DefaultPalette } from "@rbxts/centurion-ui";

@Centurion
export class ThemeCommand {
	@Command({
		name: "theme",
		description: "Change the interface's palette",
		arguments: [
			{
				name: "name",
				description: "The name of the palette to set",
				type: BuiltInType.String,
				suggestions: ["mocha", "macchiato", "frappe", "latte"],
			},
		],
	})
	theme(ctx: CommandContext, theme: string) {
		if (!(theme in DefaultPalette)) {
			ctx.error("Invalid theme");
			return;
		}

		CenturionInterface.setOptions({
			palette: DefaultPalette[theme as never],
		});
		ctx.reply(`Set theme to '${theme}'`);
	}
}
