let handler = async function (
    ev,
    { isDev, text, sender, message, mc, ui, isAdmin,tools,attr,attr_after,attr_interval,database }
) {
    if (!isDev) return sender.sendMessage(`You are not a developer`);

    if (!text) return sender.sendMessage(`Where is the text??!`);

    try {
        const context = {
            isDev,
            sender,
            ev,
            text,
            message,
            mc,
            tools,attr,attr_after,attr_interval,database,
            ui,
            isAdmin
        };

        const functionString = `(function() {${text}}).call(context)`;

        const def = await eval(functionString);

        sender.sendMessage(def);
    } catch (e) {
        if (e.message === "Native variant type conversion failed.") return;
        sender.sendMessage(e.message);
    }
};
handler.no_prefix = true;
handler.commands = [">"];

export default handler;
