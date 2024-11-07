let handler = (ev, { database, sender, args }) => {
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

    if (!findTarget || !player_db.has(playerName))
        return sender.sendMessage(
            `§7» §cPlayer with name §4'${playerName}'§c not found!`
        );

    const data = player_db.get(playerName),
        dataWarn = data?.warn;

    const cause = args.slice(1).join(" ");

    if (!cause)
        return sender.say("§7Please specify a reason for warn this player.");

    player_db.set(playerName, {
        ...data,
        warn: [
            { by: sender.name, reason: cause, timeStamp: Date.now() },
            ...dataWarn
        ]
    });

    sender.say(`§ewarn §g@${playerName}`);
    if (findTarget)
        findTarget.say(
            `§eyou got warn from §g@${sender.name}§e, cause: §c${cause}`
        );
};

handler.commands = ["warn"];
handler.helps = ["warn <@playerName> <reason>"];
handler.admin =true;
handler.category = "admin"

export default handler;