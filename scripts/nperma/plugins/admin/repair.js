let handler = (ev, { mc, sender, message, args, prefix, text }) => {
  const inv = sender.getComponent("inventory").container
  const index = sender.selectedSlotIndex
  
  const item = inv.getItem(index)
  if (!item) return sender.fail("You need to hold an item in your hand to rename item")
  if (!item.isMatch(inv.getItem(index))) return sender.fail("The item on your hand is not the same as when you do this command")
  
  const durability = item.getComponent("durability")
  if (!durability) return sender.fail("Please hold an item that has durability")
  if (durability.damage == 0) return sender.fail("Your item is fine")
  durability.damage = 0
  
  inv.setItem(index, item)
  sender.playSound("random.anvil_use")
  sender.succes(`Done repairing your item`)
}

handler.commands = ["repair"]
handler.helps = ["repair"]
handler.admin = true

export default handler