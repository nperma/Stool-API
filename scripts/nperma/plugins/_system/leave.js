let handler = ev => ev;

handler.static = function (mc, { tools }) {
    mc.world.afterEvents.playerLeave.subscribe(({ playerName }) =>
        tools.broadcast(
            `§g@${playerName}§c, leave from server!`,
            "§l§4[§c - §4]§r §7»§r "
        )
    );
};

export default handler;
