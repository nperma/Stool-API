let handler = (ev, { sender, database }) => {
    const player_db = database["player_db"],
        data = player_db.get(sender.name);
    if (!sender.hasTag("is_afk")) {
        sender.addTag("is_afk");
        player_db.set(sender.name, { ...data, afkTime: Date.now() });
    } else {
        sender.removeTag("is_afk");
    }
};

let dddd = {};
handler.interval = ({ mc, player, database, config, tools }) => {
    const player_db = database["player_db"],
        data = player_db.get(player.name);

    if (
        player.hasTag("is_afk") &&
        !data?.isAfk &&
        !Boolean(
            tools.isMoving(player) || player.isJumping || player.isSneaking
        )
    ) {
        player_db.set(player.name, { ...data, isAfk: true });
        player.onScreenDisplay.setTitle("§7§l[ A F K ]");
        if (config.afk.broadcast) player.tell(`§7» ${player.name} is afk..`,{sendTo: mc.world.getAllPlayers().filter(k => k.name !== player.name).map(p => p.name)});
    } else if (
        (player.hasTag("is_afk") &&
            Boolean(
                tools.isMoving(player) || player.isJumping || player.isSneaking
            )) ||
        (!player.hasTag("is_afk") && data?.isAfk)
    ) {
        player_db.set(player.name, { ...data, isAfk: false });
        player.removeTag("is_afk");
        player.say(
            `§7» you are now not afk, you afk for: ${Math.round(
                (Date.now()-data?.afkTime) / 1000
            )}s`
        );
    } else if (
        !player.hasTag("is_afk") &&
        !Boolean(
            tools.isMoving(player) || player.isJumping || player.isSneaking
        )
    ) {
        if (!dddd[player.id]) dddd[player.id] = { t: 0, s: 0 };

        if (dddd[player.id].s < 10) {
            if (dddd[player.id].t < 20) {
                dddd[player.id] = {
                    t: dddd[player.id].t + 1,
                    ...dddd[player.id]
                };
            } else {
                dddd[player.id] = {
                    t: 0,
                    ...dddd[player.id],
                    s: dddd[player.id].s
                };
            }
        } else {
            const date = new Date();
            date.setSeconds(date.getSeconds() + dddd[player.id].s);
            player.addTag("is_afk");
            player_db.set(player.name, {
                ...data,
                afkTime: date.getTime()
            });
        }
    }
};

handler.static = mc => {
    mc.world.beforeEvents.playerLeave.subscribe(({ player }) => {
        mc.system.run(() => player.removeTag("is_afk"));
    });
};

handler.category = "general";
handler.commands = handler.helps = ["afk"];

export default handler;
