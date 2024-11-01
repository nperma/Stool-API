let nanda = (ev, { sender, command }) => {
    let i = 0;
    while (i <= 100) {
<<<<<<< HEAD
        sender.sendMessage(i < 100 ? "\n" : `§asuccess ${command}`);
=======
        sender.sendMessage(i < 100 ? "\n" : `§7» §asuccess ${command}`);
>>>>>>> ebcc790 (Upload folder)
        i++;
    }
};

<<<<<<< HEAD
nanda.commands = nanda.helps = ["clearchat"];
nanda.commands = [...nanda.commands, "fillchat"];
=======
nanda.helps = ["clearchat"]
nanda.commands = ["clearchat", "fillchat"];
>>>>>>> ebcc790 (Upload folder)
nanda.category = "general";

export default nanda;
