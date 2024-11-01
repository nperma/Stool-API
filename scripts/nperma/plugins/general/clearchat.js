let nanda = (ev, { sender, command }) => {
    let i = 0;
    while (i <= 100) {
<<<<<<< HEAD
<<<<<<< HEAD
        sender.sendMessage(i < 100 ? "\n" : `§asuccess ${command}`);
=======
        sender.sendMessage(i < 100 ? "\n" : `§7» §asuccess ${command}`);
>>>>>>> ebcc790 (Upload folder)
=======
        sender.sendMessage(i < 100 ? "\n" : `§7» §asuccess ${command}`);
>>>>>>> f365f73 (Menambahkan perubahan dari folder saya)
        i++;
    }
};

<<<<<<< HEAD
<<<<<<< HEAD
nanda.commands = nanda.helps = ["clearchat"];
nanda.commands = [...nanda.commands, "fillchat"];
=======
nanda.helps = ["clearchat"]
nanda.commands = ["clearchat", "fillchat"];
>>>>>>> ebcc790 (Upload folder)
=======
nanda.helps = ["clearchat"]
nanda.commands = ["clearchat", "fillchat"];
>>>>>>> f365f73 (Menambahkan perubahan dari folder saya)
nanda.category = "general";

export default nanda;
