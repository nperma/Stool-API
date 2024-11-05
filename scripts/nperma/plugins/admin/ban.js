let handler = (ev, { sender, args, database, tools, config, command}) => {
    const player_db = database["player_db"];
    let playerName = args[0];

    const option = {
        "1h": Date.now() + 3600000,
        "24h": Date.now() + 86400000,
        "7d": Date.now() + 604800000,
        "30d": Date.now() + 2592000000
    };

    if (!playerName)
        return sender.sendMessage("§7» Please specify a player name.");

    if (!playerName.startsWith("@"))
        return sender.sendMessage("§7» The player name must start with '@'.");

    playerName = playerName.slice(1);

    if (config.owners.includes(playerName))
        return sender.say("§7You cannot ban an owner.");

    if (config.antibans.includes(playerName))
        return sender.say(
            `§7The player §g@${playerName} §7is protected from bans.`
        );

    const findTarget = mc.world
        .getAllPlayers()
        .find(p => p.name === playerName);

    if (!findTarget || !player_db.has(playerName))
        return sender.sendMessage(
            `§7» §cPlayer named §4'${playerName}'§c was not found.`
        );

    if (command === "ban") {
        if (!args[1])
            return sender.say(
                `§7Please provide a ban duration. Available options: [${Object.keys(
                    option
                ).join(", ")}].`
            );

        const duration = option[args[1]];
        const cause = args.slice(2).join(" ");

        if (!cause)
            return sender.say("§7Please specify a reason for banning this player.");

        const dataTarget = player_db.get(playerName);

        if (dataTarget.ban?.temporary && dataTarget.ban?.temporary > Date.now())
            return sender.say(
                `§g@${playerName} §7is currently banned for: §c"${
                    dataTarget.ban?.cause
                }"§c by §g${dataTarget.ban?.by}§7. Unban scheduled for ${new Date(
                    dataTarget.ban?.temporary
                ).toLocaleString()}.`
            );

        player_db.set(playerName, {
            ...dataTarget,
            ban: {
                temporary: duration,
                by: sender.name,
                cause
            }
        });

        sender.say(`§aSuccessfully banned player §g@${playerName}`);
        server.runCommand(
            `kick ${playerName} §cYou have been banned from this server for: §4${cause}\n§cYou will be unbanned on §a${new Date(
                duration
            ).toLocaleString()}.`
        );

        tools.broadcast(`§g@${playerName} §chas been banned from this server.`);
        server.broadcastSound("item.trident.hit");

    } else if (command === "unban") {
        const dataTarget = player_db.get(playerName);

        if (!dataTarget?.ban || dataTarget.ban.temporary < Date.now())
            return sender.say(`§7» §g@${playerName} §7is not currently banned.`);

        player_db.set(playerName, {
            ...dataTarget,
            ban: null
        });

        sender.say(`§aSuccessfully unbanned player §g@${playerName}`);
        tools.broadcast(`§g@${playerName} §ahas been unbanned from this server.`);
    }
};

handler.static = (mc, { database, config }) => {
    const player_db = database["player_db"];

    mc.world.afterEvents.playerSpawn.subscribe(({ initialSpawn, player }) => {
        if (initialSpawn) {
            if (
                config.owners.includes(player.name) ||
                config.antibans.includes(player.name)
            )
                return;

            const data = player_db.get(player.name);

            if (config.whitelist_banned.includes(player.name))
                return server.runCommand(
                    `kick ${player.name} §cYou have been banned due to violations.`
                );

            if (data.ban?.temporary && data.ban?.temporary > Date.now())
                return server.runCommand(
                    `kick ${
                        player.name
                    } §cYou are banned from this server for: §4${data.ban.cause}\n§cUnban scheduled for §a${new Date(
                        data.ban.temporary
                    ).toLocaleString()}.`
                );
        }
    });
};

handler.category = "admin";
handler.commands = ["ban", "unban"];
handler.helps = [
    "ban <@playerName> <duration[1h,24h,7d,30d]> <cause>",
    "unban <@playerName>"
];
handler.admin = true;

export default handler;
