let handler = (ev, { tools, text, sender, database }) => {
    if (!database["balance_db"])
        return sender.sendMessage(`§7Wait Economy System...`);
        const myMoney = database["balance_db"].get(sender.name);
        
        if (myMoney >= 20000) {
    tools.broadcast(
        `§g@${sender.name} §a: §r${text?.replace(/§[0-9a-zA-Z]/g, "")}`
    );
    database["balance_db"].set(sender.name, myMoney- 20000)
        } else sender.sendMessage(`§cYou dont Have enough balance to use this command!!`)
};

handler.commands = ["sb", "bc", "broadcast"];
handler.helps = ["sb <text>", "broadcast <text>"];
handler.category = "general";

export default handler;
