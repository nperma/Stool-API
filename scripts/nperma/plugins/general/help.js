const HELP_CATEGORY = {
    general: "too see all general list",
    admin: "too see all admin list",
    economy: "too see all economy list"
};

let handler = function (
    ev,
<<<<<<< HEAD
<<<<<<< HEAD
    { config, sender, args, prefix, command, database, mc }
=======
    { config, sender, args, prefix, command, database, mc, PLUGIN_REGISTER }
>>>>>>> ebcc790 (Upload folder)
=======
    { config, sender, args, prefix, command, database, mc, PLUGIN_REGISTER }
>>>>>>> f365f73 (Menambahkan perubahan dari folder saya)
) {
    const cargs = args[0]?.toLowerCase();
    const db_ = database["plugins_db"];

    let filler = `§euse command §g'${prefix}${command}'§e, feature length: §a${
        Array.from(db_.keys()).length
    }\n§eadmin length: §c${
        mc.world.getAllPlayers().filter(k => k.hasTag(config.admin_tag))
            .length ?? 0
<<<<<<< HEAD
<<<<<<< HEAD
    }\n§7--------------------------------------------------------------------------------\n§eCommand List:§r\n`;

    let suffix = "\n§r§7--------------------------------------------------------------------------------";

    if (!cargs) {
=======
=======
>>>>>>> f365f73 (Menambahkan perubahan dari folder saya)
    }\n§7---------------------------------------------------------------------------\n§eCommand List:§r\n`;

    let suffix =
        "\n§r§7---------------------------------------------------------------------------";

    if (
        !cargs ||
        (cargs &&
            !Array.from(db_.keys())
                .map(k => k.split("-")[1])
                .filter(k => Object.keys(HELP_CATEGORY).includes(k))
                .find(k => k.toLowerCase() === cargs))
    ) {
        if (
            cargs &&
            !Array.from(db_.keys())
                .map(k => k.split("-")[1])
                .filter(k => Object.keys(HELP_CATEGORY).includes(k))
                .find(k => k.toLowerCase() === cargs)
        )
            sender.sendMessage(
                `§7category with name §c'${cargs}'§7 not found!!`
            );
<<<<<<< HEAD
>>>>>>> ebcc790 (Upload folder)
=======
>>>>>>> f365f73 (Menambahkan perubahan dari folder saya)
        const body_cat = Object.entries(HELP_CATEGORY)
            .map(([k, v]) => `§7| §e${prefix}${command} ${k} §g(${v})§r`)
            .join("\n");

        filler = filler + body_cat + suffix;
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> f365f73 (Menambahkan perubahan dari folder saya)
    } else {
        const catg = PLUGIN_REGISTER.filter(
            k => k.split("-")[1].toLowerCase() === cargs.toLowerCase()
        );
        filler = `§euse command §g'${prefix}${command} ${cargs}'§e, category: §6${cargs}§e, feature length: §a${
            catg.length
        }\n§eadmin length: §c${
            mc.world.getAllPlayers().filter(k => k.hasTag(config.admin_tag))
                .length ?? 0
        }\n§7---------------------------------------------------------------------------\n§eCommand List:§r\n`;

        const helps = catg
            .filter(k => db_.get(k)?.helps && Array.isArray(db_.get(k)?.helps))
            .map(p =>
                db_
                    .get(p)
                    .helps.map(k => `§7| §e${prefix}${k}`)
                    .join("\n")
            )
            .join("\n");

        filler = filler + helps + suffix;
<<<<<<< HEAD
>>>>>>> ebcc790 (Upload folder)
=======
>>>>>>> f365f73 (Menambahkan perubahan dari folder saya)
    }

    sender.sendMessage(filler);
    sender.playSound("random.pop");
};

handler.commands = ["help", "list"];
<<<<<<< HEAD
<<<<<<< HEAD
=======
handler.helps = ["help", "help <category>"];
>>>>>>> ebcc790 (Upload folder)
=======
handler.helps = ["help", "help <category>"];
>>>>>>> f365f73 (Menambahkan perubahan dari folder saya)
handler.category = "general";

export default handler;
