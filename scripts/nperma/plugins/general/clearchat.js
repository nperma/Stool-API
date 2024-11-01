let nanda = (ev, { sender, command }) => {
    let i = 0;
    while (i <= 100) {
        sender.sendMessage(i < 100 ? "\n" : `§7» §asuccess ${command}`);
        i++;
    }
};

nanda.helps = ["clearchat"]
nanda.commands = ["clearchat", "fillchat"];
nanda.category = "general";

export default nanda;
