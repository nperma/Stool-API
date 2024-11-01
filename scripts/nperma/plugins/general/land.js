let sukma = {};
import { db_operator, Database } from "../../index.js";
import config from "../../../config.js";

if (!db_operator["land_db"]) db_operator["land_db"] = new Database("land_db");

let db_land = db_operator["land_db"];
let playerData = {};

sukma.getLands = function () {
    return Array.from(db_land.values());
};

sukma.findLand = function (landId) {
    return db_land.get(landId) || null;
};

sukma.checkPos = function ([pos1, pos2]) {
    const x1 = Math.min(pos1.x, pos2.x),
        z1 = Math.min(pos1.z, pos2.z),
        x2 = Math.max(pos1.x, pos2.x),
        z2 = Math.max(pos1.z, pos2.z);

    const isInside = Array.from(db_land.values()).find(
        land =>
            x1 <= Math.max(land.pos1.x, land.pos2.x) &&
            x2 >= Math.min(land.pos1.x, land.pos2.x) &&
            z1 <= Math.max(land.pos1.z, land.pos2.z) &&
            z2 >= Math.min(land.pos1.z, land.pos2.z)
    );

    return isInside
        ? { isInside: true, landAtPos: isInside }
        : { isInside: false, landAtPos: null };
};

sukma.inLand = function (player) {
    const playerPos = {
        x: Math.floor(player.location.x),
        z: Math.floor(player.location.z)
    };
    const land = sukma.checkPos([playerPos, playerPos]);
    return land.isInside
        ? { isInside: true, land: land.landAtPos }
        : { isInside: false };
};

sukma.createLand = function ([pos1, pos2], player) {
    const { isInside } = sukma.checkPos([pos1, pos2]);
    if (isInside) {
        return {
            success: false,
            message: "Area overlaps with another player's land.",
            land: null
        };
    }

    const landId = sukma.generateID();
    const size = sukma.calcSize([pos1, pos2]);
    const price = size * config.land.price_per_block;

    if (price > player.getBalance()) {
        return {
            success: false,
            message: `Insufficient balance(need ${
                price - player.getBalance()
            } balance) to purchase this land.`,
            land: null
        };
    }

    const newLand = {
        id: landId,
        owner: player.id,
        ownerName: player.name,
        pos1,
        pos2,
        invited: [player.id],
        protect: {
            place: true,
            break: true,
            interact: true,
            farmland: true
        },
        date: Date.now(),
        size,
        dimension: player.dimension.id
    };

    db_land.set(landId, newLand);
    return { success: true, message: null, land: newLand };
};

sukma.deleteLand = function (landId, player) {
    const land = sukma.findLand(landId);
    if (!land) return { success: false, message: "Land not found." };
    if (land.owner !== player.id)
        return { success: false, message: "You don't own this land." };

    db_land.delete(landId);
    return { success: true, message: "Land deleted successfully." };
};

sukma.transferLand = function (landId, newOwner, player) {
    let land = sukma.findLand(landId);
    if (!land) return { success: false, message: "Land not found." };
    if (land.owner !== player.id)
        return { success: false, message: "You don't own this land." };

    db_land.set(landId, {
        ...land,
        invited: land.invited.filter(k => k !== player.id),
        owner: newOwner
    });
    return { success: true, message: `Land transferred to ${newOwner}.` };
};

sukma.invitePlayer = function (landId, invitedPlayer) {
    const land = sukma.findLand(landId);
    if (!land) return { success: false, message: "Land not found." };
    if (land.owner !== player.id)
        return { success: false, message: "You don't own this land." };

    if (
        !land.member.includes(invitedPlayer) &&
        !player.dimension.getPlayers().find(p => p.name === invitedPlayer)
    )
        return { success: false, message: "playerName is not online." };
    else if (land.member.includes(invitedPlayer))
        return {
            success: false,
            message: "playerName already invitedMember that land."
        };

    db_land.set(landId, { ...land, invited: [...land.invited, invitedPlayer] });
    return {
        success: true,
        message: `success invited player with name '${invitedPlayer}' to your land with id: ${land.id}`
    };
};

sukma.removeInvited = function (landId, invitedPlayer) {
    const land = sukma.findLand(landId);
    if (!land) return { success: false, message: "Land not found." };
    if (land.owner !== player.id)
        return { success: false, message: "You don't own this land." };

    if (!land.invited.includes(invitedPlayer))
        return {
            success: false,
            message: "Player is not invited to this land."
        };

    const updatedInvitedList = land.invited.filter(
        playerName => playerName !== invitedPlayer
    );

    db_land.set(landId, { ...land, invited: updatedInvitedList });

    return {
        success: true,
        message: `Player '${invitedPlayer}' has been removed from the invited list of land with id: ${land.id}`
    };
};

sukma.manageLandUI = function (landId, player, [forceopen, ui]) {
    const land = sukma.findLand(landId);
    if (!land) return { success: false, message: "Land not found." };
    if (land.owner !== player.id)
        return { success: false, message: "You don't own this land." };

    const uip = new ui.ModalFormData().title(`§lMANAGE §2[ §a${landId}§2 ]`);

    Object.entries(land.protect).forEach(([key, bool]) => {
        uip.toggle(key, bool);
    });

    uip.submitButton("§l[ SAVE ]");
    forceopen(player, uip).then(r => {
        if (r.canceled) return player.sendMessage("§7» cancel");

        const selectedOption = Object.keys(land.protect)[r.formValues - 1];
        db_land.set(landId, {
            ...land,
            protect: {
                ...land.protect,
                [selectedOption]: !land.protect[selectedOption]
            }
        });
    });
};

sukma.calcSize = function ([pos1, pos2]) {
    const width = Math.abs(pos2.x - pos1.x) + 1,
        depth = Math.abs(pos2.z - pos1.z) + 1;

    return width * depth;
};

sukma.generateID = function () {
    let idd;
    do {
        idd = Math.floor(Math.random() * 9000) + 1000;
    } while (db_land.has(idd));
    return idd.toString();
};

let handler = function (
    ev,
    { mc, ui, database, Database, sender, args, tools, command, prefix, config }
) {
    if (!database["land_db"]) database["land_db"] = new Database("land_db");
    db_land = database["land_db"];

    if (!playerData[sender.id])
        playerData[sender.id] = {
            ...playerData[sender.id],
            pos1: null,
            pos2: null
        };

    const subcommand = args[0]?.toLowerCase(),
        sscomand = args[1]?.toLowerCase();

    const LISTT = {
        help: "§7» see help command",
        startp: "§7» set pos1",
        endp: "§7» set pos2",
        buy: "§7» buy land",
        sell: "§7» sell land",
        check: "§7» check your position",
        manage: "§7» open manageui land",
        list: "§7» see list all your land"
    };

    if (!subcommand || subcommand === "help")
        sender.sendMessage(
            `§6§lLIST SUBCOMMAND:§r\n${Object.entries(LISTT)
                .map(([k, v]) => `§e${prefix}${command} §g${k}§r ${v}`)
                .join("\n")}`
        );
    else if (subcommand === "startp") {
        playerData[sender.id] = {
            ...playerData[sender.id],
            pos1: {
                x: Math.floor(sender.location.x),
                z: Math.floor(sender.location.z)
            }
        };
        sender.sendMessage(
            "§7» pos1: §a" +
                Object.entries(sender.location)
                    .map(([k, v]) => `${k}: ${Math.floor(v)}`)
                    .join(" ")
        );
    } else if (subcommand === "endp") {
        playerData[sender.id] = {
            ...playerData[sender.id],
            pos2: {
                x: Math.floor(sender.location.x),
                z: Math.floor(sender.location.z)
            }
        };
        sender.sendMessage(
            "§7» pos2: §a" +
                Object.entries(sender.location)
                    .map(([k, v]) => `${k}: ${Math.floor(v)}`)
                    .join(" ")
        );
    } else if (subcommand === "buy") {
        const { pos1, pos2 } = playerData[sender.id];
        if (!pos1 || !pos2)
            return sender.say(
                "§cYou must set both positions (pos1 and pos2) before buying land."
            );

        const result = sukma.createLand([pos1, pos2], sender);
        if (result.success) {
            const price = result.land.size * config.land.price_per_block;
            sender.addBalance(-price);
            sender.say(
                `§aLand purchased successfully! Land ID: ${result.land.id}, with price: §6${price}$`
            );
        } else {
            sender.say(`§cFailed to buy land: ${result.message}`);
        }
    } else if (subcommand === "sell") {
        const landId = sscomand || "here",
            findLand = sscomand
                ? sukma.findLand(landId)
                : sukma.inLand(sender).land;

        if (!findLand || findLand.owner !== sender.id)
            return sender.say(`§cyou do not own land with ID: §4${landId}`);

        const land = findLand;
        const sellPrice = land.size * config.land.price_per_block;
        const tax = (sellPrice * config.land.sell_tax) / 100; // tax percentage
        const finalSellPrice = sellPrice - tax;

        const result = sukma.deleteLand(land.id, sender);
        if (result.success) {
            sender.addBalance(finalSellPrice);
            sender.say(
                `§aLand sold successfully! You received §6${finalSellPrice}$ §afor selling this land (after §c${tax}$ §atax).`
            );
        } else {
            sender.say(`§cFailed to sell land: ${result.message}`);
        }
    } else if (subcommand === "check" || subcommand === "here") {
        const landHere = sukma.inLand(sender);
        if (!landHere.isInside)
            return sender.say("§7You are not in any defined land.");
        else sender.say(`§aYou are in land ID: §2${landHere.land.id}`);
    } else if (subcommand === "list") {
        const myLands = sukma.getLands().filter(k => k.owner === sender.id);

        if (myLands.length < 1) return sender.say(`§7You don't own any land.`);

        sender.say(
            `§aYour lands: \n${myLands
                .map(
                    l =>
                        `§b- §2${l.id} §7created at §e${new Date(
                            l.date
                        ).toLocaleString()}`
                )
                .join("\n")}`
        );
    } else if (subcommand === "manage" || subcommand === "manageui") {
        const landId = sscomand;

        if (!landId) return sender.say("§7ply type landid!!");

        const land = sukma.manageLandUI(landId, sender, [tools.forceopen, ui]);
        if (land.success) return sender.say("§7close chat to open manageui");
        else if (!land.success)
            return sender.say(`§cFailed to open manageui: ${land.message}`);
    } else {
        sender.say(`§cUnknown subcommand. Type ${prefix}land help for usage.`);
    }
};

handler.static = function (mc, { tools }) {
    mc.world.beforeEvents.itemUseOn.subsribe(ev => {
        const { source: player, itemStack: item, block, blockFace } = ev;
        if (item.typeId === "minecraft:flint_and_steel") {
            const testBlock = sukma.checkPos([
                blockFace.location,
                blockFace.location
            ]);
            if (testBlock.isInside) {
                const { owner, ownerName, protect, invited } =
                    testBlock.landAtPos;
                if (owner !== player.id && !invited.includes(player.id)) {
                    if (block.typeId !== "minecraft:tnt") {
                        ev.cancel = true;
                        player.sendMessage(
                            `§7» you can use flint at this land, own by §g@${ownerName}`
                        );
                    } else {
                        const tntcb =
                            mc.world.afterEvents.blockExplode.subscribe(
                                ({
                                    block: bb,
                                    dimension,
                                    source,
                                    explodedBlockPermutation
                                }) => {
                                    if (
                                        block.location !== bb.location ||
                                        source?.location !== block.location
                                    )
                                        return;

                                    player.sendMessage(
                                        `§7» you can't explod this land.`
                                    );
                                    dimension.setBlockPermutation(
                                        bb.location,
                                        explodedBlockPermutation
                                    );
                                }
                            );

                        mc.world.afterEvents.blockExplode.unsubscribe(tntcb);
                    }
                }
            }
        }
    });

    mc.world.beforeEvents.playerPlaceBlock.subscribe(ev => {
        const testBlock = sukma.checkPos([
            ev.block.location,
            ev.block.location
        ]);

        if (testBlock.isInside) {
            const { owner, ownerName, invited, protect } = testBlock.landAtPos;

            if (protect?.place)
                if (ev.player.id !== owner || !invited.includes(ev.player.id)) {
                    ev.cancel = true;
                    ev.player.sendMessage(
                        `§7» §cyou can't place block in land owned by §g@${ownerName}`
                    );
                }
        }
    });

    mc.world.beforeEvents.playerBreakBlock.subscribe(ev => {
        const testBlock = sukma.checkPos([
            ev.block.location,
            ev.block.location
        ]);

        if (testBlock.isInside) {
            const { owner, ownerName, invited, protect } = testBlock.landAtPos;

            if (protect?.break)
                if (ev.player.id !== owner || !invited.includes(ev.player.id)) {
                    ev.cancel = true;
                    ev.player.sendMessage(
                        `§7» §cyou can't break block in land owned by §g@${ownerName}`
                    );
                }
        }
    });

    mc.world.beforeEvents.playerInteractWithBlock.subscribe(ev => {
        const testBlock = sukma.checkPos([
            ev.block.location,
            ev.block.location
        ]);

        if (testBlock.isInside) {
            const { owner, ownerName, invited, protect } = testBlock.landAtPos;

            if (protect?.interact)
                if (ev.player.id !== owner || !invited.includes(ev.player.id)) {
                    ev.cancel = true;
                    ev.player.sendMessage(
                        `§7» §cyou can't interact block in land owned by §g@${ownerName}`
                    );
                }
        }
    });
};

let pppp = {};
let saver = {};
const mathround = x => Math.round(x * 1000) / 1000;

handler.interval = function ({ mc, tools, player }) {
    if (!pppp[player.id]) pppp[player.id] = [false, "", 0];
    if (!saver[player.id]) saver[player.id] = [{}, {}];

    const lands = sukma.inLand(player);

    if (lands.isInside) {
        const { owner, ownerName, invited, id, protect } = lands.land;

        if (player.isJumping || player.isFalling) {
            pppp[player.id] = [
                pppp[player.id][0],
                pppp[player.id][1],
                mathround(player.getVelocity().y)
            ];

            let block = player.dimension.getBlockBelow({
                x: Math.floor(player.location.x),
                y: Math.floor(player.location.y),
                z: Math.floor(player.location.z)
            });

            if (
                (block.typeId !== "minecraft:farmland" &&
                    block.below(1).typeId === "minecraft:farmland") ||
                block.hasTag("minecraft:crop")
            )
                block = block.below(1);

            if (block.typeId === "minecraft:farmland") {
                saver[player.id] = [
                    block?.typeId,
                    block.location,
                    block.above(1)?.location,
                    block.above(1).permutation.getState("growth") === 0 ||
                    block.above(1).permutation.getState("growth") > 0
                        ? true
                        : false,
                    block.above(1)?.permutation
                ];
            }
        }

        if (
            protect?.farmland &&
            owner !== player.id &&
            !invited.includes(player.id) &&
            saver[player.id][0] === "minecraft:farmland" &&
            player.dimension.getBlock(saver[player.id][1])?.typeId ===
                "minecraft:dirt"
        ) {
            try {
                player.dimension.setBlockType(
                    saver[player.id][1],
                    "minecraft:farmland"
                );
            } catch (e) {
            } finally {
                if (saver[player.id][3]) {
                    player.dimension.setBlockPermutation(
                        saver[player.id][2],
                        saver[player.id][4]
                    );
                    const entities = player.dimension.getEntities({
                        location: saver[player.id][2],
                        minDistance: 0,
                        maxDistance: 3,
                        type: "minecraft:item",
                        excludeTags: [
                            "minecraft:arrow",
                            "minecraft:banner",
                            "minecraft:boat",
                            "minecraft:boats",
                            "minecraft:bookshelf_books",
                            "minecraft:coals",
                            "minecraft:crimson_stems",
                            "minecraft:decorated_pot_sherds",
                            "minecraft:digger",
                            "minecraft:door",
                            "minecraft:hanging_actor",
                            "minecraft:hanging_sign",
                            "minecraft:horse_armor",
                            "minecraft:is_armor",
                            "minecraft:is_fish",
                            "minecraft:is_food",
                            "minecraft:is_hoe",
                            "minecraft:is_minecart",
                            "minecraft:is_tool",
                            "minecraft:is_sword",
                            "minecraft:logs",
                            "minecraft:is_trident",
                            "minecraft:lectern_books",
                            "minecraft:planks",
                            "minecraft:sand",
                            "minecraft:sign",
                            "minecraft:stone_bricks"
                        ]
                    });
                    entities.forEach(entity => {
                        entity.kill();
                    });
                }
                player.sendMessage(
                    `§7» you can't grief this land, own by §g@${ownerName}`
                );
                saver[player.id] = [];
            }
        }

        if (!pppp[player.id][0] || pppp[player.id][1] !== id) {
            player.sendMessage(
                `§ainland ${
                    owner === player.id
                        ? `§g[your land]`
                        : owner !== player.id && invited.includes(player.id)
                        ? `§2[Owner: §g@${ownerName}§2]`
                        : `§7[Owner: §g@${ownerName}§7]`
                }`
            );
            pppp[player.id] = [true, id, pppp[player.id][2]];
        }
    } else {
        if (pppp[player.id][0]) {
            player.sendMessage("§7no own land.");
            pppp[player.id] = [false, "", 0];
        }
    }
};

handler.commands = ["land"];
handler.helps = ["land <subcommand>", "land help"];
handler.category = "general";

export default handler;
