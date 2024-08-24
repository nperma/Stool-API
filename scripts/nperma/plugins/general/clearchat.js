let nanda = (ev, { sender, command }) => {
    let i = 0;
    while (i <= 100) {
        sender.sendMessage(i < 100 ? "\n" : `§asuccess ${command}`);
        i++;
    }
};

nanda.commands = nanda.helps = ["clearchat"];
nanda.commands = [...nanda.commands, "fillchat"];
nanda.category = "general";

export default nanda;
