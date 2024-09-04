let handler = (ev, { mc, sender, args }) => {
    const targetName = args[0];
       
       if (!targetName) return sender.fail("Please type the player name");
       
       if (!targetName.startsWith("@")) return sender.fail("The player name must be started with '@'")
       
       const target = mc.world.getAllPlayers().find(p => p.name.startsWith(targetName.slice(1))),
        { EquipmentSlot: CC } = mc;
        

    if (targetName && !target) return sender.fail(`No player with name ${targetName} found`)

    const inv = target.getComponent("minecraft:inventory").container,
        equip = target.getComponent("minecraft:equippable");

    if (inv.emptySlotsCount === inv.size) return sender.fail("Target inventory is empty");

    let items = [],
        slot = {
            head: equip.getEquipment(CC.Head),
            chest: equip.getEquipment(CC.Chest),
            legs: equip.getEquipment(CC.Legs),
            feet: equip.getEquipment(CC.Feet),
            mainhand: equip.getEquipment(CC.Mainhand),
            offhand: equip.getEquipment(CC.Offhand)
        };

    for (let i = 0; i < inv.size; i++) items.push({ slot: i + 1, item: inv.getItem(i) ?? { amount: 0 }})
    
    items = items.map((v) => `§7| §b${v.slot}: §e${v.item?.nameTag ?? v.item?.typeId?.split(":")[1] ?? "none"} §r§g${v.item?.isStackable ? v.item.amount: ""}`).join("\n")
    
    slot = Object.entries(slot).map(([slot, item]) => `§7| §a${slot.toUpperCase()}: §e${item?.nameTag ?? item?.typeId.split(":")[1] ?? "none"} §r§g ${item?.isStackable ? item.amount: ""}`).join("\n")

    return sender.tell(`§aINVENTORY §2${sender.name}§a:\n${slot}\n\n${items}`, true);
};

handler.admin = true;
handler.commands = ["invsee", "inventorysee"];
handler.helps = ["invsee <@playerName>"];
handler.category = "admin";

export default handler;
