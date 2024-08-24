let handler = async (ev, { sender, tools }) =>
    sender.sendMessage(`§aTPS now: ${await tools.checkTPS()}`);

handler.commands = handler.helps = ["tps"];
handler.category = "general";

export default handler