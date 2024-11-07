let handler = (ev, { sender, mc, config }) => {
    const rtpConf = config.rtp;
    if (sender.hasTag(rtpConf.tag))
        return sender.say(`§7you already use this command.`);

    if (
        !sender
            .getTags()
            .some(k => k.startsWith(`rtp::${config.rtp.cooldownAfter}`))
    )
        sender.addTag(
            `rtp::${
                sender.getTags().filter(k => k.startsWith("rtp::")).length +
                    1 || 1
            }`
        );
    else {
        sender
            .getTags()
            .filter(k => k.startsWith("rtp::"))
            .forEach(p => mc.system.run(() => sender.removeTag(p)));
        const date = new Date();
        date.setSeconds(config.rtp.cooldown);
        sender.addTag(`rtpcd::${date.getTime()}`);
        sender.say(
            `§7now rtp command is cooldown for §a${config.rtp.cooldown}s`
        );
        return sender.addTag(rtpConf.tag);
    }

    const tags = sender.getTags().find(k => k.startsWith("rtpcd::"));

    if (
        sender.hasTag(tags) &&
        JSON.parse(tags.split("rtpcd::")[1]) > Date.now()
    )
        return sender.say(
            `§7random teleport is cooldown, wait §a${Math.round(
                (JSON.parse(tags.split("rtpcd::")[1]) - Date.now()) / 1000
            )}s§7 for using this command again.`
        );
        else sender.removeTag(tags)

    sender.addTag(rtpConf.tag);
};

handler.static = ({ mc, config }) => {
    mc.world.afterEvents.playerJoin.subscribe(({ playerName }) => {
        if (config.rtp.teleportWhenFirstJoin)
            mc.system.run(() => {
                const player = mc.world.getPlayers({ name: playerName })[0];

                if (player) player.addTag(config.rtp.tag);
            });
    });

    mc.world.beforeEvents.playerLeave.subscribe(({ player }) => {
        if (player.hasTag(config.rtp.tag))
            mc.system.run(() => {
                const tags = player.getTags(),
                    oldLocation = tags.find(k => k.startsWith("oldloc::")),
                    newLocation = tags.find(k => k.startsWith("newloc::")),
                    loc = JSON.parse(oldLocation.split("oldloc::")[1]),
                    { location, dimension: dim } = loc;

                player.teleport(location, {
                    dimension: mc.world.getDimension(dim)
                });
                player.removeTag(config.rtp.tag);
                player.removeTag(oldLocation);
                player.removeTag(newLocation);
            });
    });
};

let dddd = {};
handler.interval = ({ player, mc, config }) => {
    const rtpConf = config.rtp,
        Range = rtpConf.teleportRange,
        CenterLobby = rtpConf.center;
    const tags = player.getTags();
    if (!dddd[player.id]) dddd[player.id] = 0;
    if (player.hasTag(rtpConf.tag)) {
        const oldLocation = tags.find(k => k.startsWith("oldloc::"));
        const newLocation = tags.find(k => k.startsWith("newloc::"));

        if (!oldLocation && !newLocation) {
            if (rtpConf.messageOption === "message")
                player.say(rtpConf.loading_rtp);
            else if (rtpConf.messageOption === "actionbar")
                player.onScreenDisplay.setActionBar(rtpConf.loading_rtp);

            const oldLoc = {
                location: {
                    x: Math.floor(player.location.x),
                    y: Math.floor(player.location.y),
                    z: Math.floor(player.location.z)
                },
                dimension: player.dimension.id
            };

            const newLoc = {
                x: CenterLobby.x + Math.floor((Math.random() * 2 - 1) * Range),
                y: 320,
                z: CenterLobby.z + Math.floor((Math.random() * 2 - 1) * Range)
            };

            player.addTag(`oldloc::${JSON.stringify(oldLoc)}`);
            player.addTag(`newloc::${JSON.stringify(newLoc)}`);
        } else {
            if (rtpConf.messageOption === "title")
                player.onScreenDisplay.setActionBar(`${rtpConf.loading_rtp}`);

            const loc = JSON.parse(newLocation.split("newloc::")[1]);

            let teleport = player.teleport(loc, {
                dimension: mc.world.getDimension(rtpConf.dimension)
            });

            let i = 320;
            let block = player.dimension.getBlock({ x: loc.x, y: i, z: loc.z });

            while (i >= -64 && (block?.isAir || i === 320)) {
                i--;
                block = player.dimension.getBlock({ x: loc.x, y: i, z: loc.z });
            }

            if (block?.isValid() && i >= -64) {
                teleport = player.teleport(
                    {
                        x: block.x + 0.5,
                        y: Math.round(block.y + 0.5),
                        z: block.z + 0.5
                    },
                    {
                        dimension: mc.world.getDimension(rtpConf.dimension)
                    }
                );

                if (rtpConf.messageOption === "title") {
                    player.onScreenDisplay.setTitle(rtpConf.title);
                    player.onScreenDisplay.updateSubtitle(
                        rtpConf.subtitle
                            ?.replace(/{x}/g, Math.round(block.x + 0.5))
                            ?.replace(/{y}/g, Math.round(block.y + 0.5))
                            ?.replace(/{z}/g, Math.round(block.z + 0.5))
                    );
                }

                if (rtpConf.messageOption === "message")
                    player.say(
                        rtpConf.message
                            ?.replace(/{x}/g, Math.round(block.x + 0.5))
                            ?.replace(/{y}/g, Math.round(block.y + 0.5))
                            ?.replace(/{z}/g, Math.round(block.z + 0.5))
                    );
                else if (rtpConf.messageOption === "actionbar")
                    player.say(
                        rtpConf.message
                            ?.replace(/{x}/g, Math.round(block.x + 0.5))
                            ?.replace(/{y}/g, Math.round(block.y + 0.5))
                            ?.replace(/{z}/g, Math.round(block.z + 0.5))
                    );
                dddd[player.id] = 1;
                player.removeTag(oldLocation);
                player.removeTag(newLocation);
                player.removeTag(rtpConf.tag);
            }
        }
    }

    if (dddd[player.id] !== 0) {
        if (dddd[player.id] < 20) dddd[player.id] = dddd[player.id] + 1;
        else {
            player.playSound("random.levelup");
            dddd[player.id] = 0;
        }
    }
};

handler.commands = handler.helps = ["rtp", "randomteleport"];
handler.category = "general";

export default handler;
