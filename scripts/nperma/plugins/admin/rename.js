let handler = (ev, { mc, sender, message, args, prefix, text }) => {
  const name = text
  
  if (!name) return sender.fail("Apperently you don't put the name for item after the command")

  const inv = sender.getComponent("inventory").container
  const index = sender.selectedSlotIndex
  const item = inv.getItem(index)
  if (!item) return sender.fail("You need to hold an item in your hand to rename item")
  if (!item.isMatch(inv.getItem(index))) return sender.fail("The item on your hand is not the same as when you do this command")
  item.nameTag = name
  
  inv.setItem(index, item)
  sender.playSound("random.anvil_use")
  sender.succes(`Done renaming ${item.typeId} to ${item.nameTag}`)
}

handler.commands = ["rename"]
handler.helps = ["rename <name>"]
handler.admin = true

export default handler