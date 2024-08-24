let handler = function(ev,{sender,args,mc,database}) {
  if (!args[0]) return sender.sendMessage("§7pls type playerName want to teleport");
  
  const target = mc.world.getAllPlayers().find(k => k.name === args[0])
  if(!database["player_db"].has(target.name)) return sender.sendMessage(`§cplayer with the name ${args[0]} has not been registered`);
  
  if (!target) return sender.sendMessage("§7target is offline");
  
  sender.teleport(target.location, {dimension:mc.world.getDimension(target.dimension.id)})
  sender.sendMessage(`§aTeleport to ${args[0]}`)
}

handler.admin = true;
handler.commands = ["tp","teleport"];
handler.helps = ["teleport <playerName>"]