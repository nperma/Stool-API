let handler = (ev, { sender, args, database, server, config }) => {
    const player_db = database["player_db"];
    let playerName = args[0];

    if (!playerName)
        return sender.sendMessage("§7» Please specify a player name.");

    if (!playerName.startsWith("@"))
        return sender.sendMessage("§7» Player name must start with '@'.");

    playerName = playerName.slice(1);

    const findTarget = mc.world
        .getAllPlayers()
        .find(p => p.name === playerName);

    if (!findTarget)
        return sender.sendMessage(
            `§7» §cPlayer with name §4'${playerName}'§c not found!`
        );

    if (config.owners.includes(playerName))
        return sender.say("§7You cannot kick an owner.");

    if (config.antikicks.includes(playerName))
        return sender.say(
            `§7The player §g@${playerName} §7is protected from kicks.`
        );

    const data = player_db.get(playerName),
        dataKick = data?.kick;

    const cause = args.slice(1).join(" ");

    if (!cause)
        return sender.say("§7Please specify a reason for kicking this player.");

    player_db.set(playerName, {
        ...data,
        kick: [
            { by: sender.name, reason: cause, timeStamp: Date.now() },
            ...dataKick
        ]
    });

    server.runCommand(
        `kick ${playerName} §cyou just kick by §g@${sender.name}§c cause §4${cause}`
    );
};

handler.commands = ["kick"];
handler.helps = ["kick <@playerName> <reason>"];
handler.category = "admin";
handler.admin = true;

export default handler