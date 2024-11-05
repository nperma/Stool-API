let handler = function (ev, { mc, database, args, sender, isAdmin, command }) {
    const balanceDB = database["balance_db"],
        targetName = args[0];

    if (command === ("setbalance" || "setmoney")) {
        if (!isAdmin)
            return sender.sendMessage(
                `§7» §c you dont have permission to use this command!!`
            );
        if (!targetName)
            return sender.sendMessage(
                `§7» pls type player name and startswith '@'.`
            );
        if (!targetName.startsWith("@"))
            return sender.sendMessage(
                "§7» you must type the playerName startsWith '@'"
            );

        if (!balanceDB.has(targetName.slice(1)))
            return sender.say(
                `§7player with name '${targetName.slice(1)}' notfound.`
            );

        if (isNaN(args[1]))
            return sender.sendMessage(
                `§7» §carguments[1] must type a number!!`
            );

        balanceDB.set(targetName.slice(1), parseInt(args[1]));
        sender.sendMessage(
            `§7» §asuccess set balance §g@${targetName.slice(
                1
            )} §ato §6${balanceDB.get(targetName.slice(1))}$`
        );
    } else if (command === ("addbalance" || "addmoney")) {
        if (!isAdmin)
            return sender.sendMessage(
                `§7» §c you dont have permission to use this command!!`
            );
        if (!targetName)
            return sender.sendMessage(
                `§7» pls type player name and startswith '@'.`
            );
        if (!targetName.startsWith("@"))
            return sender.sendMessage(
                "§7» you must type the playerName startsWith '@'"
            );

        if (!balanceDB.has(targetName.slice(1)))
            return sender.say(
                `§7player with name '${targetName.slice(1)}' notfound.`
            );

        if (isNaN(args[1]))
            return sender.sendMessage(
                `§7» §carguments[1] must type a number!!`
            );

        balanceDB.set(
            targetName.slice(1),
            balanceDB.get(targetName.slice(1)) + parseInt(args[1])
        );
        sender.sendMessage(
            `§7» §asuccess set balance §g@${targetName.slice(
                1
            )} §ato §6${balanceDB.get(targetName.slice(1))}$`
        );
    } else {
        if (targetName) {
            if (!targetName.startsWith("@"))
                return sender.sendMessage(
                    "§7» you must type the playerName startsWith '@'"
                );

            if (!balanceDB.has(targetName.slice(1)))
                return sender.say(
                    `§7player with name '${targetName.slice(1)}' notfound.`
                );

            return sender.sendMessage(
                `§7» §g@${targetName.slice(1)} §7: §6${balanceDB.get(
                    targetName.slice(1)
                )}$`
            );
        } else {
            return sender.sendMessage(
                `§7» §eYour Balance §7: §6${balanceDB.get(sender.name) ?? 0}$`
            );
        }
    }
};

handler.category = "economy";
handler.commands = [
    "balance",
    "setbalance",
    "addbalance",
    "money",
    "setmoney",
    "addmoney"
];
handler.helps = [
    "balance",
    "balance <@playerName>",
    "setbalance <@playerName> (perm admin)",
    "addbalance <playerName> (perm admin)"
];

export default handler;
