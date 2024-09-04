let handler = (ev, { mc, sender, message, command, args }) => {
  const dim = args[0]?.toLowerCase()
  const dims = ["overworld", "nether", "the_end"]
  if (!dim) return sender.fail(`Well you actually can't switch between dimension if you don't specify the dimension which is one of the ${dims.join(", ")}`)
  const dimension = dims.find(f => f.startsWith(dim))
  sender.tpTimeout({ name: dimension, pos: sender.location, dimension})
}

handler.admin = true
handler.commands = ["dim","dimension"]
handler.helps = ["dim <dimension>", "dimension <dimension>"]

export default handler