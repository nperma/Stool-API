let h = ev => ev;

h.interval = ({ isOwner, mc, player, config, database,tools }) => {
  
  const player_db = database["player_db"],data=player_db.get(player.name),boolAdmin=data?.admin;
    if (
        !isOwner &&
        player.hasTag(config.admin_tag) &&
        database["player_db"].get(player.name)?.disbandAdmin
    ) {
        player.say("§cyou can no longer be an admin because you are blocked");
        player_db.set(player.name,{...data,admin:false})
        player.removeTag(config.admin_tag);
    } else if (
        !isOwner &&
        (!player.isOp() && player.hasTag(config.admin_tag))
    ) {
        player.say(
            `§cyou dont have permission to use this tag admin!!(admintag only for operator)`
        );
        player_db.set(player.name,{...data,admin:false})
        player.removeTag(config.admin_tag);
    }
    
    if(player.isOp()&&player.hasTag(config.admin_tag)&&!boolAdmin) {
      tools.broadcast(`§aPromote §g@${player.name} §ainto §cadmin`)
      player_db.set(player.name,{...data,admin:true})
    } else if (player.isOp()&&!player.hasTag(config.admin_tag)&&boolAdmin) {
      tools.broadcast(`§aDemote §g@${player.name} §ainto §cadmin`)
      player_db.set(player.name,{...data,admin:false})
    }
};

export default h;
