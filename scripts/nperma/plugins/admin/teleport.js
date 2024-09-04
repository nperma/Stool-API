let handler = function(ev,{sender,args,mc}) {
  if (!args[0]) return sender.fail("Please type the player name started with '@'")
  if (!args[0].startsWith("@")) return sender.fail("The player name must be started with '@'")
  
  const target = mc.world.getAllPlayers().find(k => k.name.startsWith(args[0].slice(1)))
  if (!target) return sender.fail("Player with that name is no where to be foud");
  
  sender.tpTimeout({ name: target.name, pos: target.location, dimension: target.dimension.id }, 0)
}

handler.admin = true;
handler.commands = ["tp","teleport"];
handler.helps = ["teleport <playerName>"]

export default handler