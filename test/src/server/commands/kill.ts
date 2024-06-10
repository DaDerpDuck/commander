import {
	BuiltInType,
	Centurion,
	Command,
	CommandContext,
} from "@rbxts/centurion";

@Centurion
export class KillCommand {
	@Command({
		name: "kill",
		description: "Kill players",
		arguments: [
			{
				name: "players",
				description: "Players to kill",
				type: BuiltInType.Players,
			},
		],
	})
	kill(ctx: CommandContext, players: Player[]) {
		for (const player of players) {
			this.killPlayer(player);
		}

		ctx.reply(`Successfully killed ${players.size()} player(s)`);
	}

	private killPlayer(player: Player) {
		const humanoid = player.Character?.FindFirstChildOfClass("Humanoid");
		if (humanoid === undefined) {
			return;
		}

		humanoid.Health = 0;
	}
}
