let h = ev => ev;

h.interval = ({ isOwner,mc, player, config, database }) => {
    if (
        !isOwner ||
        (player.hasTag(config.admin_tag) &&
            database["player_db"].get(player.name)?.disbandAdmin)
    ) {
        player.say("§cyou can no longer be an admin because you are blocked");
        player.removeTag(config.admin_tag);
    } else if (
        !isOwner ||
        (!player.isOp() && player.hasTag(config.admin_tag))
    ) {
        player.say(
            `§cyou dont have permission to use this tag admin!!(admintag only for operator)`
        );
        player.removeTag(config.admin_tag);
    }
};

export default h;
