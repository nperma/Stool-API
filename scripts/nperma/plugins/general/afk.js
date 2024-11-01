let handler = (ev, { mc, sender, database }) => {
    const player_db = database["player_db"].get(sender.name);
};

handler.interval = ({ mc, player, database }) => {
    const player_db = database["player_db"].get(player.name);
};
handler.after = (ev, { mc, sender, database }) => {
    const player_db = database["player_db"].get(sender.name);
    
    if (player_db?.isAfk) {
      
    }
};

handler.category = "general";
handler.commands = handler.helps = ["afk"];

export default handler;
