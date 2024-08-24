let handler = ev => ev;

handler.static = function (mc, { database, tools, config }) {
    const playerDB = database["player_db"];
    const balanceDB = database["balance_db"];

    mc.world.afterEvents.playerSpawn.subscribe(({ player, initialSpawn }) => {
        if (initialSpawn) {
            if (!playerDB.has(player.name)) {
                tools.broadcast(
                    `§awelcome to server for first time!!, §g@${player.name}`,
                    "§2§l[ §a+ §l§2]§r §7»§r "
                );
                if (!balanceDB.has(player.name)) {
                  player.sendMessage(`§aadded balance §2${config.default_balance}+`)
                    balanceDB.set(config.default_balance);
                }
            } else
                tools.broadcast(
                    `§awelcome to server!, §g@${player.name}`,
                    "§2§l[ §a+ §l§2]§r §7»§r "
                );
        }
    });
};

export default handler;
