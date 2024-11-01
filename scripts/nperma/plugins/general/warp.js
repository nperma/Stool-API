let handler = function (ev, { command, sender, database, Database,isAdmin, args,mc }) {
    const warpName = args[0];
    if (!database["warp_db"]) database["warp_db"] = new Database("warp_db");

    const warpDB = database["warp_db"],
        warpList = Array.from(warpDB.keys());

    if (warpList.length === 0)
        return sender.sendMessage("§7» no warp in this world/server..");
    else {
        if (
            !warpName ||
            (warpName && !warpDB.has(warpName))
        ) {
            return sender.sendMessage(
                `§6§lWARP-LIST:\n${warpList
                    .sort((a, b) => a.localeCompare(b))
                    .map(memeki => `§a- §2${memeki}`)}`
            );
        } else {
          const warpData = warpDB.get(warpName);
          
          if(warpData.admin&&!isAdmin) return sender.sendMessage("§7» this warp need admin permission.")
          
          sender.teleport(warpData.location, {dimension: mc.world.getDimension(warpData.dim)})
          sender.sendMessage(`§7» §aTeleported to Warp §2${warpName}`)
        }
    }
};

handler.commands = ["warp", "warplist"];
handler.helps = ["warp <warpName>"];
handler.category = "general";

export default handler;
