let handler = (
    ev,
    { database, Database, mc, sender, args, command, prefix, config }
) => {
    if (!database.homeDb) database.homeDb = new Database("home_db")
    const homeDb = database.homeDb;
    const playerHome = homeDb.get(sender.id) || [];

    const homeLimit = Object.entries(config.home.homelimit)
    .find(([tag]) => sender.hasTag(tag))[1]

    const homeName = args[0]?.toLowerCase().replace(/§.{1}/g);
    const errorMsg = "Please specify the home name!"
    
    if (command == "home") {
      if (!homeName || args.length > 1) return sender.fail(errorMsg)
      
      const home = playerHome.find(f => f.name == homeName)
      if (!home) return sender.fail(`Home not found!`)
      
      sender.tpTimeout(home, config.home.countdown * 20)
      
    } else if (command == "sethome") {
    
      if (!homeName || args.length > 1) return sender.fail(errorMsg)
      
      if (playerHome.length >= homeLimit) return sender.fail("You can't make more home, you've reached the limit")
      
      const home = playerHome.find(f => f.name == homeName)
      if (home) return sender.fail(`Home already created with that name! please use other name`)
      
      const data = {
        name: homeName,
        pos: sender.location,
        dimension: sender.dimension.id
      }
      
      homeDb.set(sender.id, [data, ...playerHome])
      sender.succes(`Succesfully created home with name ${homeName} in ${sender.dimension.id.slice(10)}`)
      
    } else if (command == "delhome") {
    
      if (playerHome.length == 0) return sender.fail("You can't delete any home if YOU'RE NOT HAVE ANY HOME")
      if (!homeName || args.length > 1) return sender.fail(errorMsg)
      
      const home = playerHome.find(f => f.name == homeName)
      if (!home) return sender.fail("You don't have home with that name")
      
      homeDb.set(sender.id, playerHome.filter(f => f.name != home.name))
      sender.succes(`Succesfully deleting home with name ${home.name}`)
      
    } else if (command == "homes") {
    
      if (playerHome.length == 0) return sender.fail("Actually, you don't have any home SO I CAN'T GIVE YOU THE LIST")
      let text = `§a//=== §eList of Home §a===//\n`
      let homes = playerHome.map((m, i) => `§7${i + 1}. §e${prefix}home ${m.name} §6> §c${Math.formatPos(m.pos, 2)} §7|§6 ${m.dimension.slice(10)} §7|§6 ${i + 1} out of ${homeLimit}`).join("\n")
      sender.tell(text + homes, true)
    }
};

handler.commands = ["home", "sethome", "delhome", "homes"];
handler.helps = [
    "home <homeName>",
    "sethome <homeName>",
    "delhome <homeName>",
    "homes"
];
handler.category = "general";

export default handler;
