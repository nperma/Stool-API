let handler = (ev, { sender, args, tools, mc, database }) => {
    const player_db = database["player_db"];
    const playerName = args[0];

    if (!playerName) return sender.sendMessage("§7» pls type a playerName.");

    const findTarget = mc.world
        .getAllPlayers()
        .find(p => p.name === playerName);

    if (!findTarget && !player_db.has(playerName))
        return sender.sendMessage(
            `§7» §cplayer with name §4'${playerName}'§c not found!!`
        );

    const muteDuration = parseInt(args[1]) ?? 60; // default 60 seconds
    const muteEndTime = Date.now() + muteDuration * 1000;

    const data = {
        muteBy: sender.name,
        muteSendId: sender.id,
        reason: args?.slice(2)?.join(" ") ?? "",
        temporary: muteEndTime
    };

    player_db.set(playerName, {
        ...player_db.get(playerName),
        mute: [data, ...(player_db.get(playerName)?.mute || [])]
    });

    if (findTarget) {
        findTarget.sendMessage(
            `§7» you just muted by §g@${sender.name}${
                data.reason ? ` cause: §c${data.reason}` : ""
            }`
        );
    }

    sender.sendMessage(`§7» §asuccess mute §g${playerName}`);
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

        if (activeMute) {
            evp.cancel = true;
            const remainingTime = Math.round(
                (activeMute.temporary - Date.now()) / 1000
            );
            evp.sender.sendMessage(
                `§7» §cyou are muted, wait §a${remainingTime}s seconds§c by §g${activeMute.muteBy}`
            );
        }
    });
};

handler.interval = ({ mc, player, database }) => {
    const player_db = database["player_db"];
    const playerMuteData = player_db.get(player.name)?.mute || [];

    const activeMute = playerMuteData.find(k => k?.temporary > Date.now());

    if (activeMute && !player_db.get(player.name)?.isMute) {
        player.runCommand(`ability ${player.name} mute true`);
        player_db.set(player.name, {
            ...player_db.get(player.name),
            isMute: true
        });
    } else if (!activeMute && player_db.get(player.name)?.isMute) {
        player.runCommand(`ability ${player.name} mute false`);
        player_db.set(player.name, {
            ...player_db.get(player.name),
            isMute: false
        });
    }
};

handler.commands = ["mute"];
handler.helps = ["mute <@playerName> <duration_in_seconds> [reason]"];
handler.admin = true;
handler.category = "admin";

export default handler;
