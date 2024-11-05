let handler = (ev, { sender: player, args,command,prefix }) => {
  
  if(!args[0]) return sender.say(`§7pls input a arguments, like: §a${prefix}${command} @NASRULGgindo 2000`)
  
  if (!args[0].startsWith("@"))
            return sender.sendMessage(
                "§7» you must type the playerName startsWith '@'"
            );
            
            
  
    if (isNaN(args[1]))
        return sender.sendMessage(`§7» §carguments[1] must type a number!!`);

    player.Pay(parseInt(args[1]), args[0]?.slice(1));
};

handler.category = "economy";
handler.commands = ["pay", "transfer"];
handler.helps = ["pay <@playerName> <amount>"];

export default handler;
