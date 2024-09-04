let handler = (ev, { tools, text, sender, command, config }) => {
  const money = sender.getBalance()
  if (text == "") return sender.fail("The text field must be filled")
  if (money < 20000) return sender.fail(`You don't have enough money to use ${command}, you need at least 20000 to use ${command}`)
  sender.broadcast(`§g@${sender.name} §a: §r${text?.replace(/§[0-9a-zA-Z]/g, "")}`)
  sender.setBalance(money - 20000)
};

handler.commands = ["sb", "bc", "broadcast"];
handler.helps = ["sb <text>", "bc <text>", "broadcast <text>"];
handler.category = "general";

export default handler;
