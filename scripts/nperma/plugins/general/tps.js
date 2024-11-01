let handler = async (ev, { sender, tools }) =>
<<<<<<< HEAD
    sender.sendMessage(`§aTPS now: ${await tools.checkTPS()}`);
=======
    sender.sendMessage(`§7» §aTPS now: ${await tools.checkTPS()}`);
>>>>>>> ebcc790 (Upload folder)

handler.commands = handler.helps = ["tps"];
handler.category = "general";

export default handler