let handler = function (ev, { mc, tools, ui, text }) {
    if (!text) return ev.sender.sendMessage("§7you must type the text!!");

    const UI_MSB = new ui.MessageFormData()
        .title(`§lBROADCAST §d@${ev.sender.name}`)
        .body(text)
        .button2(`MSB: ${ev.sender.name}`)
        .button1("CLOSE");

    mc.world.getAllPlayers().forEach(p => {
        p.playSound("note.pling");
        tools.forceOpen(p, UI_MSB);
    });
};

handler.admin = true;
handler.commands = ["msb"];
handler.helps = ["msb <text>"];
handler.category = "admin";

export default handler;
