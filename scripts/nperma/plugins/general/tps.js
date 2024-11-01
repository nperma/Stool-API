let handler = async (ev, { sender, tools }) =>
<<<<<<< HEAD
<<<<<<< HEAD
    sender.sendMessage(`§aTPS now: ${await tools.checkTPS()}`);
=======
    sender.sendMessage(`§7» §aTPS now: ${await tools.checkTPS()}`);
>>>>>>> ebcc790 (Upload folder)
=======
    sender.sendMessage(`§7» §aTPS now: ${await tools.checkTPS()}`);
>>>>>>> f365f73 (Menambahkan perubahan dari folder saya)

handler.commands = handler.helps = ["tps"];
handler.category = "general";

export default handler