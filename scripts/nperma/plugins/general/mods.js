let handler = function (ev, { mc, config, sender }) {
    sender.tell(`§dMODS-LIST:\n${mc.world.getAllPlayers().filter(k => k.hasTag(config.admin_tag)).map(k => "§e- §g@" + k.name).join("\n")}`, true);
};

handler.commands = handler.helps = ["mods", "admins"];

export default handler;