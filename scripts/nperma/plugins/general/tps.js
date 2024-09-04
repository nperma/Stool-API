let handler = async (ev, { mc, sender }) =>
    sender.sendMessage(`§aTPS now: ${await mc.system.getTps()}`);

handler.commands = handler.helps = ["tps"];
handler.category = "general";

export default handler