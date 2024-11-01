let handler = function(ev,{sender,args,mc,database}) {
  if (!args[0]) return sender.sendMessage("§7pls type playerName want to teleport");
  
  const target = mc.world.getAllPlayers().find(k => k.name === args[0])
  if(!database["player_db"].has(target.name)) return sender.sendMessage(`§cplayer with the name ${args[0]} has not been registered`);
  
  if (!target) return sender.sendMessage("§7target is offline");
  
  sender.teleport(target.location, {dimension:mc.world.getDimension(target.dimension.id)})
<<<<<<< HEAD
<<<<<<< HEAD
  sender.sendMessage(`§aTeleport to ${args[0]}`)
=======
  sender.sendMessage(`§7» §aTeleport to ${args[0]}`)
>>>>>>> ebcc790 (Upload folder)
=======
  sender.sendMessage(`§7» §aTeleport to ${args[0]}`)
>>>>>>> f365f73 (Menambahkan perubahan dari folder saya)
}

handler.admin = true;
handler.commands = ["tp","teleport"];
<<<<<<< HEAD
<<<<<<< HEAD
handler.helps = ["teleport <playerName>"]
=======
handler.helps = ["teleport <playerName>"]
handler.category = "admin"

export default handler
>>>>>>> ebcc790 (Upload folder)
=======
handler.helps = ["teleport <playerName>"]
handler.category = "admin"

export default handler
>>>>>>> f365f73 (Menambahkan perubahan dari folder saya)
