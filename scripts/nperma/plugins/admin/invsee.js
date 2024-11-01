let handler = (ev, { mc, sender, args }) => {
    const targetName = args[0];
       
       if (!targetName) return sender.sendMessage("§7plss type the playername");
       
       if (!targetName.startsWith("@")) return sender.sendMessage("§7you must type the playerName startsWith '@'")
       
       
       const target = mc.world.getAllPlayers().find(p => p.name === targetName.slice(1)),
        { EquipmentSlot: CC } = mc;
        

    if ((targetName && !target))
        return sender.sendMessage(
            `§7player with name '${targetName}' notfound.`
        );

    const inv = target.getComponent("minecraft:inventory").container,
        equip = target.getComponent("minecraft:equippable");

    if (inv.emptySlotsCount === inv.size)
        return sender.sendMessage("§7Inventory Target Empty");

    const items = [],
        slot = {
            head: equip.getEquipment(CC.Head),
            chest: equip.getEquipment(CC.Chest),
            legs: equip.getEquipment(CC.Legs),
            feet: equip.getEquipment(CC.Feet),
            mainhand: equip.getEquipment(CC.Mainhand),
            offhand: equip.getEquipment(CC.Offhand)
        };

    for (let i = 0; i < inv.size; i++) {
        if (inv.getItem(i) === undefined)
            items.push({
                slot: i,
                data: { amount: 0, nameTag: "NONE" }
            });
        else items.push({ slot: i, data: inv.getItem(i) });
    }

    return sender.sendMessage(
<<<<<<< HEAD
        `§aINVENTORY §2${sender.name}§a:\n${Object.entries(slot)
=======
        `§7» §aINVENTORY §2${sender.name}§a:\n${Object.entries(slot)
>>>>>>> ebcc790 (Upload folder)
            .map(
                ([t, v]) =>
                    `§bx- ${t.toUpperCase()}: §e${
                        v?.nameTag ?? v?.typeId ?? "NONE"
                    }${v?.isStackable ? `§r§g : ${v.amount}` : ""}`
            )
            .join("\n")}\n\n${items
            .map(({ slot, data }) => {
                return `§bx ${slot}: §e${data?.nameTag ?? data?.typeId} §r§g${
                    data?.isStackable ? data.amount : ""
                }`;
            })
            .join("\n")}`
    );
};

handler.admin = true;
handler.commands = ["invsee", "inventorysee"];
handler.helps = ["invsee <@playerName>"];
handler.category = "admin";

export default handler;
