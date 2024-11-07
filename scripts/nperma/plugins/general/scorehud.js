let handler = (ev, { sender, config }) => {
    if (sender.hasTag(config.scorehud.tagToggle)) {
        sender.removeTag(config.scorehud.tagToggle);
        sender.say(`§7disabled scorehud`);
    } else sender.addTag(config.scorehud.tagToggle);
};
let tick = 0;
handler.interval=(({player,config})=> {
  if (tick < (60*20)) tick = tick +1
  else {player.say(`§7navigation scorehud command: §e${config.prefix[0]}scorehudnav§7 to show or hide scorehud`);tick=0}
})

handler.commands = handler.helps = ["scorehudnav","schudnav"];
handler.category = "general";

export default handler;