let handler = (ev, { mc, sender, args }) => {
    const targetName = args[0],
        target = mc.world.getAllPlayers().find(p => p.name === targetName);

    if (!targetName || (targetName && !target))
        return sender.sendMessage(
            `§7player with name '${targetName}' notfound.`
        );

    const inv = target.getComponent("minecraft:inventory").container;

    if (inv.emptySlotsCount === inv.size)
        return sender.sendMessage("§7Inventory Target Empty");

    const items = [];
    for (let i = 0; i < inv.size; i++) {
        if (inv.getItem(i) === undefined) continue;

        items.push({ slot: i, data: inv.getItem(i) });
    }

    return sender.sendMessage(
        `§aINVENTORY §2${sender.name}§a:\n${items
            .map(({ slot, data }) => {
                return `§bx ${slot}: §e${data?.nameTag ?? data.type.id} §g${
                    data.amount
                }`;
            })
            .join("\n")}`
    );
};

handler.admin = true;
handler.commands = ["invsee", "inventorysee"];
handler.helps = ["invsee <playerName>"];
handler.category = "admin";

export default handler;
