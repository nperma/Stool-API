let handler = (ev, { args, server, prefix }) => {
    const CATEGORY_LIST = ["admin", "general", "economy"];
    const PluginCommand = args[0]?.toLowerCase();
    const { PLUGIN_DB } = server;

    const generateHelpField = () => {
        return CATEGORY_LIST.map((category) => {
            const pluginsInCategory = PLUGIN_DB.values()
                .filter((plugin) => plugin.category === category)
                .map((plugin) =>
                    plugin.helps
                        .map(
                            (help) =>
                                `§7- §a${
                                    !plugin.no_prefix ? prefix : ""
                                }§e${help}`
                        )
                        .join("\n")
                ).flat().sort((a,b)=> a.localeCompare(b));

            if (pluginsInCategory.length > 0) {
                return `§6§l${category.toUpperCase()}§r\n${pluginsInCategory.join(
                    "\n"
                )}`;
            }
            return null;
        })
            .filter(Boolean)
            .join("\n\n");
    };

    if (PluginCommand) {
        const FindPlugin = Array.from(PLUGIN_DB.values()).find((plugin) =>
            plugin.commands.includes(PluginCommand)
        );

        if (FindPlugin) {
            const { category, helps } = FindPlugin;
            ev.sender.say(
                `§aCategory: §l§6${category}§r\n` +
                    `§aCommands:§r\n${helps
                        .map((help) => `§7- §a${prefix}§e${help}`)
                        .join("\n")}`
            );
        } else {
            ev.sender.say(
                "§cPlugin not found. Use the command without arguments to see the plugin list."
            );
        }
    } else {
        const field = generateHelpField();
        ev.sender.say(`§a=== Help Menu ===§r\n\n${field}`);
    }
};

handler.commands = ["help"];
handler.helps = ["help <optinal:command>"];

export default handler;
