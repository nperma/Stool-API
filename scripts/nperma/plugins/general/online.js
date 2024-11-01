let SukmaBottle = function mueki(ev, { config, mc }) {
    ev.sender.sendMessage(
        `§7» §aONLINE NOW at time §2${new Date().toLocaleString(
            config.default_time.utc,
            { timeZone: config.default_time.timezone }
        )}:\n${mc.world
            .getAllPlayers()
            .map(p => "§a- §g@" + p.name)
            .join("\n")}`
    );
};

SukmaBottle.commands = SukmaBottle.helps = ["online"]
SukmaBottle.category = "general";

export default SukmaBottle