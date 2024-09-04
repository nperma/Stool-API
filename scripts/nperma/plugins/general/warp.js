let handler = (
    ev,
    { database, Database, mc, sender, args, command, prefix, config }
) => {
    if (!database.warpDb) database.warpDb = new Database("warp_db")
    const warpDb = database.warpDb;
    let warps = Array.from(warpDb.values())
    
    const warpName = args[0]?.toLowerCase().replace(/§.{1}/g);
    const errorMsg = "Please specify the warp name!"
    
    if (command == "warp") {
      if (!warpName || args.length > 1) return sender.fail(errorMsg)
      
      const warp = warps.find(f => f.name == warpName)
      if (!warp) return sender.fail(`Warp not found!`)
      
      sender.tpTimeout(warp, config.warp.countdown * 20)

    } else if (command == "warps") {
      if (warps.length == 0) return sender.fail("Actually, There is no warp")
      let text = `§a//=== §eList of Warp §a===//\n`
      let fill = warps.map((m, i) => `§7${i + 1}. §e${prefix}warp ${m.name} §6> §c${Math.formatPos(m.pos, 2)} §7|§6 ${m.dimension.slice(10)}`).join("\n")
      sender.tell(text + fill, true)
    }
};

handler.commands = ["warp", "warps"];
handler.helps = [
    "warp <warpName>",
    "warps"
];
handler.category = "general";

export default handler;
