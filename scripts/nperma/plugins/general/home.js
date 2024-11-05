let under = {}; // Store under status by player ID

let handler = (
    ev,
    { database, Database, mc, ui, sender, args, command, tools, config }
) => {
    if (!database["home_db"]) database["home_db"] = new Database("home_db");
    const home_db = database["home_db"];
    /** @type {Map} */
    const home_db_sender = home_db.get(sender.id) || [];
    const homelimit =
        Object.entries(config.home.homelimit)
            .sort(([, a], [, b]) => b - a)
            .find(([k]) => sender.hasTag(k))[1] ||
        config.home.homelimit.default ||
        2;
    let homeName = args[0]?.toLowerCase();

    if (command === "home") {
        if (!homeName) return sender.say(`§7pls type the homeName!!`);

        if (!home_db_sender.map(k => k?.name).includes(homeName))
            return sender.say(
                `§7you don't have a home with name '${homeName}'`
            );

        const data = home_db_sender.find(k => k.name === homeName);

        if (!under[sender.id]?.active) {
            under[sender.id] = { active: true, destination: homeName };
            sender.say(`§7Wait, teleporting to home... don't move!`);

            const count = mc.system.runTimeout(() => {
                mc.system.clearRun(run);
                mc.system.clearRun(count);
                sender.teleport(data.location, {
                    dimension: mc.world.getDimension(data.dimension)
                });
                sender.say(`§aSuccess! Teleported to §2'${data.name}'`);
                under[sender.id].active = false;
                sender.playSound("random.pop");
            }, config.home.countdown * 20);

            const run = mc.system.runInterval(() => {
                if (
                    tools.isMoving(sender) ||
                    sender.isSneaking ||
                    sender.isJumping
                ) {
                    mc.system.clearRun(run);
                    mc.system.clearRun(count);
                    under[sender.id] = false;
                    sender.say(`§7Teleport canceled because you moved!`);
                }
            });
        } else {
            sender.say(
                `§7You are already heading to home §a'${
                    under[sender.id].destination
                }'`
            );
        }
    } else if (command === "listhome") {
        if (home_db_sender?.length === 0) {
            sender.say("§cYou don't have any homes registered!");
        } else {
            const homelist = home_db_sender.map(va => {
                const { name, location, dimension } = va;
                let loc = {
                    x: location.x.toFixed(1),
                    y: location.y,
                    z: location.z.toFixed(1)
                };
                return `§b• §e${name} : ${loc.x} ${loc.y} ${
                    loc.z
                }, ${dimension.replace(/\minecraft:/g, "")}`;
            });
            sender.say(
                `§g§lHOME-LIST(§e${
                    home_db_sender.length
                }§g/§6${homelimit}§g):§r\n${homelist.join("\n")}`
            );
        }
    } else if (command === "sethome") {
        if (!homeName) return sender.say(`§7Please type the homeName!`);

        if (tools.useSymbol(homeName))
            return sender.say("§cHomeName can't use symbols!");

        if (home_db_sender.map(k => k?.name).includes(homeName))
            return sender.say(`§cYou already registered this homeName!`);

        if (home_db_sender.length >= homelimit)
            return sender.say(`§cYour home limit has been reached!`);

        const data = {
            name: homeName,
            location: sender.location,
            dimension: sender.dimension.id,
            date: new Date().toLocaleString()
        };

        home_db.set(sender.id, [data, ...home_db_sender]);
        sender.say(`§aSuccessfully created home with name §2'${homeName}'`);
        sender.playSound("random.pop");
    } else if (command === "delhome") {
        if (!homeName) return sender.say(`§7Please type the homeName!`);

        if (!home_db_sender.map(k => k?.name).includes(homeName))
            return sender.say(
                `§7You don't have a home with name '${homeName}'`
            );

        home_db.set(
            sender.id,
            home_db_sender.filter(k => k.name !== homeName)
        );
        sender.say(`§aSuccessfully deleted home with name §2'${homeName}'`);
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
