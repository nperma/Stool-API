let handler = (ev, { mc, sender, text, prefix, args }) => {
  const cmd = args[0]?.toLowerCase()
  const amount = args[1]

  if (cmd == "set") {
    if (!amount || amount < 0) return sender.fail("The amount is need to be positive number")
    const trgt = text.slice(cmd.length + amount.length + 1).trim()
    if (!trgt) return sender.fail("You need to fill the player name")
    sender.tell(trgt)
    let target = mc.world.getPlayers().find(f => f.name.startsWith(trgt))
    if (!target) return sender.fail("Player not found")
    
    target.setBalance(amount)
    sender.succes(`Succesfully set ${target.name}'s balance to ${amount}, now ${target.name}'s balance is ${target.getBalance()}`)
  } else if (cmd == "get") {
    let trgt = text.slice(cmd.length).trim()
    if (!trgt) return sender.fail("You need to fill the player name")
    
    let target = mc.world.getPlayers().find(f => f.name.startsWith(trgt))
    if (!target) return sender.fail("Player not found")
    
    sender.succes(`The balance of ${target.name} is: ${target.getBalance()}`)
  } else if (cmd == "add") {
     if (!amount || amount < 0) return sender.fail("The amount is need to be positive number")
    let trgt = text.slice(cmd.length + amount.length + 1).trim()
    if (!trgt) return sender.fail("You need to fill the player name")
    
    let target = mc.world.getPlayers().find(f => f.name.startsWith(trgt))
    if (!target) return sender.fail("Player not found")
    
    target.setBalance(parseInt(amount) + parseInt(target.getBalance()))
    sender.succes(`Succesfully added ${amount} to ${target.name}'s balance, now ${target.name}'s balance is ${target.getBalance()}`)
  } else {
    return sender.fail(`The correct usage of eco command is ${prefix}eco <set|get|add> <amount|target|amount> <target>`)
  }
}

handler.admin = true
handler.commands = ["eco"]
handler.helps = ["eco <set|get|add> <amount|target|amount> <target>"]

export default handler