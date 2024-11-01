let handler = async function (
    ev,
<<<<<<< HEAD
<<<<<<< HEAD
    { isDev, text, sender, message, mc, ui, isAdmin,tools,attr,attr_after,attr_interval,database }
) {
    if (!isDev) return sender.sendMessage(`You are not a developer`);

=======
=======
>>>>>>> f365f73 (Menambahkan perubahan dari folder saya)
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
<<<<<<< HEAD
>>>>>>> ebcc790 (Upload folder)
=======
>>>>>>> f365f73 (Menambahkan perubahan dari folder saya)
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
<<<<<<< HEAD
            tools,attr,attr_after,attr_interval,database,
=======
=======
>>>>>>> f365f73 (Menambahkan perubahan dari folder saya)
            tools,
            attr,
            config,
            attr_after,
            attr_interval,
            database,
<<<<<<< HEAD
>>>>>>> ebcc790 (Upload folder)
=======
>>>>>>> f365f73 (Menambahkan perubahan dari folder saya)
            ui,
            isAdmin
        };

<<<<<<< HEAD
<<<<<<< HEAD
        const functionString = `(function() {${text}}).call(context)`;

        const def = await eval(functionString);

        sender.sendMessage(def);
=======
=======
>>>>>>> f365f73 (Menambahkan perubahan dari folder saya)
        let functionString = `(function() { ${text} }).call(context)`;

        if (command === "=>")
            functionString = `(async function() {${text} }).call(context)`;

        const def = await eval(functionString);

        if (def !== undefined) {
            sender.sendMessage(String(def));
            console.warn(`${sender.name} evaled: `+String(def));
        }
<<<<<<< HEAD
>>>>>>> ebcc790 (Upload folder)
=======
>>>>>>> f365f73 (Menambahkan perubahan dari folder saya)
    } catch (e) {
        if (e.message === "Native variant type conversion failed.") return;
        sender.sendMessage(e.message);
    }
};
<<<<<<< HEAD
<<<<<<< HEAD
handler.no_prefix = true;
handler.commands = [">"];
=======

handler.no_prefix = true;
handler.commands = [">", "=>"];
>>>>>>> ebcc790 (Upload folder)
=======

handler.no_prefix = true;
handler.commands = [">", "=>"];
>>>>>>> f365f73 (Menambahkan perubahan dari folder saya)

export default handler;
