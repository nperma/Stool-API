let handler = (ev, { config, sender, args, prefix: pref, command, mc, attr, PLUGIN_REGISTER: plugins }) => {
  const categories = plugins.map(f => f.split("-")[1])
  .filter((v, i, s) => s.indexOf(v) === i && !v.startsWith("_"))

  const cargs = args[0]?.toLowerCase().trim()
  const line = "§r§7//========================//"
  
  let filler = `§eUse command §g'${pref}${command}'§e, Feature length: §a${plugins.length}\n§eAdmin length: §c${mc.world.getPlayers().filter(k => k.hasTag(config.admin_tag)).length ?? 0}\n§7${line}\n§eCommand List:§r\n`,
  nonCat = false

  const fill = categories.map(cat => `§7| §e${pref}${command} ${cat} §g(to see all ${cat} list)`).join("\n") + "\n"

  if (cargs) {
    if (categories.includes(cargs)) {
      Object.keys(attr).forEach(v => {
        const data = attr[v]
        data.commands?.forEach((cmd, i) => {
          if (v.split("-")[1] === cargs && cmd) {
            filler += `§7| §e${data.no_prefix ? "" : pref}${cmd} §6: ${pref}${data.helps?.at(i) ?? cmd}\n`
            nonCat = true
          }
        })
      })
    } else {
      Object.keys(attr).forEach(v => {
        const data = attr[v]
        data.commands?.forEach((cmd, i) => {
          if (cmd === cargs) {
            if (command == "list")
              filler += fill
            else
              filler += `§7| §e${pref}${cmd} §6: ${pref}${data.helps?.at(i) ?? cmd}\n`
            nonCat = true
          }
        })
      })
    }
  }

  if (!cargs || !nonCat) filler += fill
  
  filler += line
  sender.tell(filler, true)
  sender.playSound("random.pop")
}

handler.commands = ["help", "list"]
handler.helps = ["help [<category|command>]", "list [<category>]"]

export default handler
