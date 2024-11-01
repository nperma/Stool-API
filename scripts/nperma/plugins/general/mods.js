let handler = function (ev, { mc, config, sender }) {
    sender.sendMessage(
<<<<<<< HEAD
        `§dMODS-LIST:\n${mc.world
=======
        `§7» §dMODS-LIST:\n${mc.world
>>>>>>> ebcc790 (Upload folder)
            .getAllPlayers()
            .filter(k => k.hasTag(config.admin_tag))
            .map(k => "§e- §g@" + k.name)
            .join("\n")}`
    );
};

handler.commands = handler.helps = ["mods", "admins"];

export default handler;