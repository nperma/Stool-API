let handler = async (ev, { sender, tools }) =>
    sender.sendMessage(`§7» §aTPS now: ${await tools.checkTPS()}`);

handler.commands = handler.helps = ["tps"];
handler.category = "general";

export default handler