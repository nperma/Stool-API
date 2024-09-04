let handler = ev => ev;

handler.static = function (mc, { database, tools, config }) {
  const playerDB = database.player_db;

  mc.world.afterEvents.playerSpawn.subscribe(async ({ player, initialSpawn }) => {
    if (initialSpawn) {
      if (playerDB.has(player.id)) {
        player.broadcast(`§aWelcome to server!, §g@${player.name}`,"§2§l[§a+§l§2]§r §7»§r ")
      } else {
        player.broadcast(`§aWelcome to server for first time!!, §g@${player.name}`,"§2§l[§a+§l§2]§r §7»§r ");
        player.setBalance(config.default_balance)
        playerDB.set(player.id, true)
      }
      if (player.getDynamicProperty("teleporting")) {
        player.setDynamicProperty("teleporting", false)
        player.fail("Your pending teleportation is canceled due to leaving before teleported")
      }
      
    }
  });
};

export default handler;
