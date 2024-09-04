let handler = function (ev, { sender, config }) {
    let txt = "§6ABOUT - TOOLS ]-------------------------------------\n";
    txt += "§e+ Type: §cScriptAPI§4(§aEssentials§4)§r\n";
    txt += `§e+ Version: §a${config.version}§r\n`;
    txt += `§e+ Creator: §g@Nperma\n`;
    return sender.tell(txt, true);
};

handler.commands = handler.helps = ["about"]
handler.category = "general";

export default handler