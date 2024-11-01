let handler = async function (
    ev,
<<<<<<< HEAD
    { isDev, text, sender, message, mc, ui, isAdmin,tools,attr,attr_after,attr_interval,database }
) {
    if (!isDev) return sender.sendMessage(`You are not a developer`);

=======
    {
        isDev,
        text,
        command,
        sender,
        message,
        mc,
        ui,
        config,
        isAdmin,
        tools,
        attr,
        attr_after,
        attr_interval,
        database
    }
) {
    if (!isDev) return sender.sendMessage(`You are not a developer`);
>>>>>>> ebcc790 (Upload folder)
    if (!text) return sender.sendMessage(`Where is the text??!`);

    try {
        const context = {
            isDev,
            sender,
            ev,
            text,
            message,
            mc,
<<<<<<< HEAD
            tools,attr,attr_after,attr_interval,database,
=======
            tools,
            attr,
            config,
            attr_after,
            attr_interval,
            database,
>>>>>>> ebcc790 (Upload folder)
            ui,
            isAdmin
        };

<<<<<<< HEAD
        const functionString = `(function() {${text}}).call(context)`;

        const def = await eval(functionString);

        sender.sendMessage(def);
=======
        let functionString = `(function() { ${text} }).call(context)`;

        if (command === "=>")
            functionString = `(async function() {${text} }).call(context)`;

        const def = await eval(functionString);

        if (def !== undefined) {
            sender.sendMessage(String(def));
            console.warn(`${sender.name} evaled: `+String(def));
        }
>>>>>>> ebcc790 (Upload folder)
    } catch (e) {
        if (e.message === "Native variant type conversion failed.") return;
        sender.sendMessage(e.message);
    }
};
<<<<<<< HEAD
handler.no_prefix = true;
handler.commands = [">"];
=======

handler.no_prefix = true;
handler.commands = [">", "=>"];
>>>>>>> ebcc790 (Upload folder)

export default handler;
