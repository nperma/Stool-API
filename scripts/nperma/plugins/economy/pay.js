let handler = (ev, { sender: player, args }) => {
    player.Pay(parseInt(args[0]), args[1]);
};

handler.category="economy";
handler.commands = ["pay","transfer"]
handler.helps = ["pay <amount> <playerName>"]

export default handler;