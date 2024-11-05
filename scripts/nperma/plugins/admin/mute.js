let handler = (ev, { sender, args, tools, mc, database, command }) => {
    const player_db = database["player_db"];
    let playerName = args[0];

    if (!playerName) return sender.sendMessage("§7» Please specify a player name.");

    if (!playerName.startsWith("@"))
        return sender.sendMessage("§7» Player name must start with '@'.");

    playerName = playerName.slice(1);

    const findTarget = mc.world
        .getAllPlayers()
        .find(p => p.name === playerName);

    if (!findTarget || !player_db.has(playerName))
        return sender.sendMessage(`§7» §cPlayer with name §4'${playerName}'§c not found!`);

    const playerMuteData = player_db.get(playerName)?.mute || [];
    const activeMute = playerMuteData.find(k => k?.temporary > Date.now());
    const remainingTime = Math.round((activeMute?.temporary - Date.now()) / 1000);

    if (command === "unmute") {
        if (!activeMute)
            return sender.say(`§7» Player with name §g@${playerName} §7is not currently muted.`);

        if (activeMute?.unmute)
            return sender.say(`§7» §g@${playerName}§7 has already been unmuted.`);

        const data = { ...activeMute, unmute: true };

        player_db.set(playerName, {
            ...player_db.get(playerName),
            mute: [
                data,
                ...player_db
                    .get(playerName)
                    ?.mute.filter(k => k?.temporary !== activeMute?.temporary)
            ]
        });

        sender.say(`§aSuccessfully unmuted §g@${playerName}`);
        if (findTarget) findTarget.say(`§7You have been unmuted by §g@${sender.name}`);
    } else if (command === "mute") {
        if (activeMute)
            return sender.say(
                `§7Target with name §g@${playerName}§7 is already muted. Unmute in ${remainingTime}s.`
            );

        const muteDuration = parseInt(args[1]) || 60; // default 60 seconds
        const muteEndTime = Date.now() + muteDuration * 1000;

        const data = {
            muteBy: sender.name,
            muteSendId: sender.id,
            reason: args?.slice(2)?.join(" ") ?? "",
            temporary: muteEndTime,
            unmute: false
        };

        player_db.set(playerName, {
            ...player_db.get(playerName),
            mute: [data, ...(player_db.get(playerName)?.mute || [])]
        });

        if (findTarget)
            findTarget.sendMessage(
                `§7» You have been muted by §g@${sender.name}${
                    data.reason ? ` for: §c${data.reason}` : ""
                }§r§7, duration: ${muteDuration}s`
            );

        sender.sendMessage(`§7» §aSuccessfully muted §g${playerName}`);
    }
};

handler.static = (mc, { database }) => {
    const player_db = database["player_db"];

    mc.world.beforeEvents.chatSend.subscribe(evp => {
        const playerMuteData = player_db.get(evp.sender.name)?.mute || [];
        player_db.set(evp.sender.name, {
            ...player_db.get(evp.sender.name),
            mute: playerMuteData.filter(k => k?.temporary > Date.now())
        });

        const activeMute = playerMuteData.find(k => k?.temporary > Date.now());

        if (activeMute && !activeMute?.unmute) {
            evp.cancel = true;
            const remainingTime = Math.round((activeMute?.temporary - Date.now()) / 1000);
            evp.sender.sendMessage(
                `§7» §cYou are muted. Please wait §a${remainingTime}s §cby §g${activeMute.muteBy}.`
            );
        }
    });
};

let muteStatus = {};
handler.interval = ({ mc, player, database }) => {
    const player_db = database["player_db"];
    const playerMuteData = player_db.get(player.name)?.mute || [];
    
    if (!muteStatus[player.id]) muteStatus[player.id] = null;

    const activeMute = playerMuteData.find(k => k?.temporary > Date.now());
    const remainingTime = Math.round((activeMute?.temporary - Date.now()) / 1000);

    if (activeMute && !player_db.get(player.name)?.isMute) {
        player.runCommand(`ability ${player.name} mute true`);
        player_db.set(player.name, { ...player_db.get(player.name), isMute: true });
        muteStatus[player.id] = remainingTime;
    } else if (!activeMute && player_db.get(player.name)?.isMute || player_db.get(player.name)?.isMute && activeMute?.unmute) {
        player.runCommand(`ability ${player.name} mute false`);
        player_db.set(player.name, { ...player_db.get(player.name), isMute: false });
        muteStatus[player.id] = null;
        player.say(`§7Mute effect removed.`);
    }

    if (activeMute && [60, 30, 10, 5, 3].includes(remainingTime) && muteStatus[player.id] !== remainingTime) {
        muteStatus[player.id] = remainingTime;
        player.say(`§7Mute effect will be removed in ${remainingTime}s.`);
    }
};

handler.commands = ["mute", "unmute"];
handler.helps = [
    "mute <@playerName> <duration_in_seconds> <?reason>",
    "unmute <@playerName>"
];
handler.admin = true;
handler.category = "admin";

export default handler;
