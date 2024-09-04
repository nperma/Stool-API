let handler = (ev, { mc, sender, message, text }) => {
  let target = text
  
  target = mc.world.getPlayers().find(player => player.name === target)

  if (!target || !target.isValid()) return sender.fail(`Player not found`)
  target.applyDamage(200, { cause: "entityAttack", damagingEntity: sender })
  sender.succes(`Mengsantet ${target.name}`)
};

handler.commands = ["santet"]
handler.helps = ["santet <target>"]

export default handler
