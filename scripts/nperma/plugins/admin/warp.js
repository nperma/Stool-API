let handler = (
    ev,
    { mc, sender, database, Database, command, args, tools }
) => {
    const warpName = args[0];
    if (!database["warp_db"]) database["warp_db"] = new Database("warp_db");

    const warpDB = database["warp_db"],
        warpList = Array.from(warpDB.keys());

    if (!warpName) return sender.sendMessage("§7pls type a warpname.");

    if (tools.useSymbol(warpName))
        return sender.sendMessage("§cwarpName can't use symbol!!");

    if (command === "setwarp") {
        if (warpDB.has(warpName))
            return sender.sendMessage(
                `§7» §cwarp with name §4'${warpName}'§c is already used!`
            );

        warpDB.set(warpName, {
            location: sender.location,
            /** @type {Vector3} */ dim: sender.dimension.id,
            admin:args[1]&& args[1]==="yes"||args[1]==="true"?true:false,
            rotation: sender.getRotation() /** @type {Vector2} */
        });

        sender.sendMessage(
            `§7» §asuccessfull create warp with name §g${warpName}`
        );
        sender.playSound("random.levelup");
    } else if (command === "delwarp") {
        if (!warpDB.has(warpName))
            return sender.sendMessage(
                `§7» §cwarp with name §4'${warpName}'§c notfound.`
            );

        warpDB.delete(warpName);
        sender.sendMessage(
            `§7» §asuccessfyll delete warp with name §g${warpName}`
        );
    }
};

handler.admin = true;
handler.category = "admin";
handler.commands = ["setwarp", "delwarp"];
handler.helps = ["setwarp <warpName>", "delwarp <warpName>"];

export default handler;
