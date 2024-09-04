let handler = (
    ev,
    { database, Database, mc, sender, args, command, prefix, config }
) => {
    if (!database.warpDb) database.warpDb = new Database("warp_db")
    const warpDb = database.warpDb;
    const warps = Array.from(warpDb.values())

    const errorMsg = "Please specify the warp name!"
    const warpName = args[0]?.toLowerCase().replace(/§.{1}/g, "")
    
    if (!warpName || args.length > 1) return sender.fail(errorMsg)
    
    if (command == "setwarp") {
      const warp = warps.find(f => f.name == warpName)
      if (warp) return sender.fail(`Warp already created with that name! please use other name`)
      
      const data = {
        name: warpName,
        pos: sender.location,
        dimension: sender.dimension.id
      }
      
      warpDb.set(warpName, data)
      sender.succes(`Succesfully created warp with name ${warpName} in ${sender.dimension.id.slice(10)}`)
      
    } else if (command == "delwarp") {
      if (!warpName || args.length > 1) return sender.fail(errorMsg)
      
      const warp = warps.find(f => f.name == warpName)
      if (!warp) return sender.fail("There is no warp with that name")
      
      warpDb.set(warp.name)
      sender.succes(`Succesfully deleting warp with name ${warp.name}`)
    }
};

handler.admin = true
handler.commands = ["setwarp", "delwarp"];
handler.helps = [
    "setwarp <warpName>",
    "delwarp <warpName>",
];

export default handler;
