let dk = ev => ev;

dk.static = (mc, { database, Database, config }) => {
    mc.world.afterEvents.playerSpawn.subscribe(({ initialSpawn, player }) => {
        if (initialSpawn) {
            if (
                !database["balance_db"].has(player.name) &&
                !database["player_db"].has(player.name)
            ) {
                player.sendMessage("§7» §aRegister Your Data to Storage");
                database["balance_db"].set(player.name, config.default_balance);
                player.sendMessage(
                    `§7 §aset your §6balance §ato §6${database[
                        "balance_db"
                    ].get(player.name)}$`
                );
                database["player_db"].set(player.name, {
                    joinDate: Date.now(),
                    kill: 0,
                    death: 0,
                    mute: [],
                    ban: { cause: null, temporary: null,by:null },
                    kick: [],
                    warn: [],
                    afkTime: 0,
                    isAfk: false,
                    admin: player.hasTag(config.admin_tag) ? true : false,
                    disbandAdmin: false,
                    clanInvites: []
                });
            }
        }
    });
};

export default dk;
