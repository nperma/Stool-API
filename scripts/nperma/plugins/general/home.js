let handler = (
    ev,
    { database, Database, mc, ui, sender, args, command, tools, config }
) => {
    if (!database["home_db"]) database["home_db"] = new Database("home_db");
    const home_db = database["home_db"];
    /** @type {Map} */
<<<<<<< HEAD
    const home_db_sender = database["home_db"].get(sender.name) || [];
=======
    const home_db_sender = database["home_db"].get(sender.id) || [];
>>>>>>> ebcc790 (Upload folder)
    const homelimit = Object.entries(config.home.homelimit)
        .sort(([, a], [, b]) => b - a)
        .find(([k]) => sender.hasTag(k));
    let homeName = args[0]?.toLowerCase();

    /** @type {Array} */
    if (command === "home") {
        if (!homeName) return sender.sendMessage(`§7pls type the homeName!!`);

        if (!home_db_sender.map(k => k?.name).includes(homeName))
            return sender.sendMessage(
                `§7you dont have home with name '${homeName}'`
            );

        const data = home_db_sender.find(
            k => k.name === homeName
        ); /** @returns {Object} */
<<<<<<< HEAD

        sender.addTag("teleported.teleport");
=======
        
>>>>>>> ebcc790 (Upload folder)
        const count = mc.system.runTimeout(() => {
            mc.system.clearRun(run);
            mc.system.clearRun(count);
            sender.teleport(data.location, {
                dimension: mc.world.getDimension(data.dimension)
            });
            sender.sendMessage(`§aSuccess Teleport to §2'${data.name}'`);
        }, config.home.countdown * 20);

        const run = mc.system.runInterval(() => {
            if (tools.isMoving(sender)) {
                mc.system.clearRun(run);
                mc.system.clearRun(count);
                sender.sendMessage(`§7cancel teleport because u move!!`);
            }
        });
    } else if (command === "listhome") {
        if (home_db_sender?.length === 0)
            sender.sendMessage("§cYou dont have any home register!!");
        else {
            const homelist = home_db_sender.map(va => {
                const { name, location, dimension } = va;

                let loc = {
                    x: location.x.toFixed(1),
                    y: location.y,
                    z: location.z.toFixed(1)
                };

                return `§b- §e${name} : ${loc.x} ${loc.y} ${loc.z}, ${dimension}`;
            });
            sender.sendMessage(
                `§gHOME-LIST(§e${
                    homelimit - home_db_sender.length
                }§g§6${homelimit}§e):\n${homelist.join("\n")}`
            );
        }
    } else if (command === "sethome") {
        if (!homeName) return sender.sendMessage(`§7pls type the homeName!!`);
<<<<<<< HEAD
=======
        
        if (tools.useSymbol(homeName)) return sender.sendMessage("§chomeName can't use symbol!!")
>>>>>>> ebcc790 (Upload folder)

        if (home_db_sender.map(k => k?.name).includes(homeName))
            return sender.sendMessage(`§cyou already register this homeName!!`);

        if (home_db_sender.length >= homelimit)
            return sender.sendMessage(
                `§Your home limit has reached the limit!!`
            );

        const data = {
            name: homeName,
            location: sender.location /** @returns {Vector3} */,
            dimension: sender.dimension.id,
            date: new Date().toLocaleString()
        };

<<<<<<< HEAD
        home_db.set(sender.name, [data, ...home_db_sender]); //register Home
=======
        home_db.set(sender.id, [data, ...home_db_sender]); //register Home
>>>>>>> ebcc790 (Upload folder)
        sender.sendMessage(`§aSuccess create home with name §2'${homeName}'`);
        sender.playSound("random.pop");
    } else if (command === "delhome") {
        if (!homeName) return sender.sendMessage(`§7pls type the homeName!!`);

        if (!home_db_sender.map(k => k?.name).includes(homeName))
            return sender.sendMessage(
                `§7you dont have home with name '${homeName}'`
            );

        home_db.set(
<<<<<<< HEAD
            sender.name,
=======
            sender.id,
>>>>>>> ebcc790 (Upload folder)
            home_db_sender.filter(k => k.name !== homeName)
        ); //delete register home
        sender.sendMessage(`§asuccess delete home with name §2'${homeName}'`);
        sender.playSound("random.anvil_break");
    }
};

handler.commands = ["home", "sethome", "delhome", "listhome"];

handler.helps = [
    "home <homeName>",
    "sethome <homeName>",
    "delhome <homeName>",
    "listhome"
];

handler.category = "general";

export default handler;
