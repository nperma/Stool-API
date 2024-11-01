let handler = function (ev, { isDev, args, database }) {
    if (!isDev) return sender.sendMessage(`You are not a developer`);

    if (args[0] === "all")
        return Object.keys(database)
            .map(k => ({ p: database[k], c: k }))
            .forEach(({ p, c }) => {
                console.warn(`clear ${c}`);
                p.clear();
            });
    else if (args[0]) {
        if (
            Object.keys(database).find(
                k.toLowerCase() === args[0].toLowerCase()
            )
        ) {
            console.warn(
                `clear ${Object.keys(database).find(
                    k.toLowerCase() === args[0].toLowerCase()
                )}`
            );
            database[
                Object.keys(database).find(
                    k.toLowerCase() === args[0].toLowerCase()
                )
            ].clear();
            return;
        } else return console.warn("database notfound!!");
    } else return console.warn("pls type the database name!!")
};

handler.commands = ["resetdb"];

export default handler;
