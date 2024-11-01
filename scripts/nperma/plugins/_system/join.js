<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> f365f73 (Menambahkan perubahan dari folder saya)
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
                    ban: { cause: null, temporary: null },
                    kick: [],
                    warn: [],
                    afkTime: 0,
                    isAfk: false,
                    admin: player.hasTag(config.admin_tag)?true:false,
                    disbandAdmin: false,
                    clanInvites: [],
                });
            }
<<<<<<< HEAD
>>>>>>> ebcc790 (Upload folder)
=======
>>>>>>> f365f73 (Menambahkan perubahan dari folder saya)
        }
    });
};

<<<<<<< HEAD
<<<<<<< HEAD
export default handler;
=======
export default dk;
>>>>>>> ebcc790 (Upload folder)
=======
export default dk;
>>>>>>> f365f73 (Menambahkan perubahan dari folder saya)
