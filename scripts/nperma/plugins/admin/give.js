let handler = (ev, { mc, sender, message, args, prefix, text }) => {
  try {
    const id = args[0]
    const amount = parseInt(text.slice(id?.length))
    const lores = message.match(/"([^"]*)"/g)?.map(f => f.slice(1, -1))
    const name = message.match(/'([^']*)'/g)
    
    if (!id || !amount) return sender.fail(`Invalid syntax at the item id or the amount, you should do it like this §e${prefix}give <id> <amount> [<lore>]`)
    
    if (amount < 1 || amount > 255) return sender.fail("The allowed amount is 1-255")
    
    const item = new mc.ItemStack(id, amount)
    if (!item) return console.warn(`${sender.name} creating invalid item with command give`)
    if (lores?.length > 0) item.setLore(lores)
    if (name) item.nameTag = name[0].slice(1, -1)
    sender.getComponent("inventory").container.addItem(item)
    sender.succes(`You have been given ${id} * ${amount}`)
  } catch (e) {
    sender.fail(`Failed to create the item, either the id is invalid or other reason`)
   console.error(e, e.stack)
  }
}

handler.commands = ["give"]
handler.helps = ["give <id> <amount> 'name' [\"lores\"]"]
handler.admin = true

export default handler


//!give 'tes' 255 "tes"