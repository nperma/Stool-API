const HELP_CATEGORY = {
    general: "too see all general list",
    admin: "too see all admin list",
    economy: "too see all economy list"
};

let handler = function (
    ev,
    { config, sender, args, prefix, command, database, mc }
) {
    const cargs = args[0]?.toLowerCase();
    const db_ = database["plugins_db"];

    let filler = `§euse command §g'${prefix}${command}'§e, feature length: §a${
        Array.from(db_.keys()).length
    }\n§eadmin length: §c${
        mc.world.getAllPlayers().filter(k => k.hasTag(config.admin_tag))
            .length ?? 0
    }\n§7--------------------------------------------------------------------------------\n§eCommand List:§r\n`;

    let suffix = "\n§r§7--------------------------------------------------------------------------------";

    if (!cargs) {
        const body_cat = Object.entries(HELP_CATEGORY)
            .map(([k, v]) => `§7| §e${prefix}${command} ${k} §g(${v})§r`)
            .join("\n");

        filler = filler + body_cat + suffix;
    }

    sender.sendMessage(filler);
    sender.playSound("random.pop");
};

handler.commands = ["help", "list"];
handler.category = "general";

export default handler;
