let handler = (ev, { sender, args, config, database, Database, mc }) => {
    if (!database.scorehud_db) {
        database.scorehud_db = new Database("scorehud_db");
    }

    const scorehudDB = database.scorehud_db;
    const text = args.join(" ");
    const match = text.match(/^"([\s\S]+)"$/);

    if (!match)
        return sender.say("§7The text must start and end with double quotes.");

    const displayText = match[1];
    const existingData = scorehudDB.get("scorehud") || {};

    scorehudDB.set("scorehud", {
        firstMakeTimestamp: existingData.firstMakeTimestamp || Date.now(),
        lastUpdateTimestamp: Date.now(),
        texts: [displayText, ...(existingData.texts || [])],
        lastUpdateBy: sender.name
    });

    sender.say(`§aScorehud updated`);
    sender.tell(`§7» §g@${sender.name}§a updated scoreHud`, {
        sendTo: mc.world
            .getAllPlayers()
            .filter(
                player =>
                    player.hasTag(config.admin_tag) &&
                    player.name !== sender.name
            )
            .map(player => player.name)
    });
};

let tick = 0;
handler.interval = ({ mc, player, database, config, Database }) => {
    if (!database.scorehud_db) {
        database.scorehud_db = new Database("scorehud_db");
    }
    if (!database.player_db) {
        database.player_db = new Database("player_db");
    }

    const scorehudDB = database.scorehud_db;
    const playerDB = database.player_db;

    if (tick < 20) {
        tick++;
    } else {
        const scorehudData = scorehudDB.get("scorehud");
        const playerData = playerDB.get(player.name) || {};

        if (scorehudData) {
            const latestText = scorehudData.texts?.[0];
            const ranks = [
                config.default_rank,
                ...player
                    .getTags()
                    .filter(tag => tag.startsWith(config.default_prefix_rank))
                    .map(rank => rank.slice(config.default_prefix_rank.length))
            ];
            const rank = ranks[ranks.length - 1];

            if (!player.hasTag(config.scorehud.tagToggle)) {
                player.onScreenDisplay.setActionBar(
                    latestText
                        ?.replace(/<name>/g, player.name)
                        ?.replace(/<rank>/g, rank)
                        ?.replace(/<rank_count>/g, ranks.length)
                        ?.replace(/<death_count>/g, playerData.death || 0)
                        ?.replace(/<kill_count>/g, playerData.kill || 0)
                        ?.replace(/<mute_count>/g, playerData.mute?.length || 0)
                        ?.replace(/<kick_count>/g, playerData.kick?.length || 0)
                        ?.replace(/<warn_count>/g, playerData.warn?.length || 0)
                        ?.replace(
                            /<admin_count>/g,
                            Array.from(playerDB.entries()).filter(
                                ([, value]) => value.admin === true
                            ).length
                        )
                        ?.replace(
                            /<admin_online_count>/g,
                            mc.world
                                .getAllPlayers()
                                .filter(p => p.hasTag(config.admin_tag)).length
                        )
                        ?.replace(
                            /<player_count>/g,
                            Array.from(playerDB.keys()).length
                        )
                        ?.replace(
                            /<player_online_count>/g,
                            mc.world.getAllPlayers().length
                        )
                        ?.replace(
                            /<balance>/g,
                            database.balance_db?.get(player.name) ??
                                config.default_balance
                        )
                        ?.replace(
                            /<afk_time>/g,
                            Math.round(
                                (Date.now() -
                                    playerDB.get(player.name)?.afkTime) /
                                    1000
                            ) || 0
                        )
                        ?.replace(
                            /<locale_date>/g,
                            new Date().toLocaleDateString()
                        )
                        ?.replace(
                            /<locale_time>/g,
                            new Date().toLocaleTimeString()
                        )?.replace(/\n/g, "\n")
                );
            }
        }

        tick = 0;
    }
};

handler.commands = ["scorehud"];
handler.helps = ['scorehud <"display_text">'];
handler.admin = true;

export default handler;
