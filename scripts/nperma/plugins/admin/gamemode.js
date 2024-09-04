let handler = (ev, { sender, args }) => {
  let gms = ["survival", "creative", "adventure", "spectator"];
const gm = args[0]?.toLowerCase()
  let selGm = gms.find(f => f.startsWith(gm))  

  if (!gm || !selGm) return sender.fail(`Gamemode not found, make sure you're using the first letter from one of ${gms.join(", ")}`)
  
  sender.succes(`Your gamemode has been updated to ${selGm}`)
  sender.setGameMode(selGm)  
}

handler.admin = true
handler.category = "admin"
handler.commands = ["gm", "gamemode"]
handler.helps = ["gm <gamemode>", "gamemode <gamemode>"]

export default handler