import * as mc from "@minecraft/server";
import config from "../../config.js";

//check tps
export const checkTPS = async () => {
    let start = Date.now();
    await mc.system.waitTicks(20);
    let duration = Date.now() - start;
    let tps = (20 / (duration / 1000)).toFixed(2);
    return tps;
};

//sleep
export const sleep = async second => await mc.system.waitTicks(second * 20);

//broadcast
export const broadcast = (text, title = config.default_title) => {
    mc.world.sendMessage(`${title}${text}`);
};

//setScore
export const setScore = (player, objective, score) =>
    mc.world.scoreboard.getObjective(objective).setScore(player, score);

//getScore
export const getScore = (player, objective) =>
    mc.world.scoreboard.getObjective(objective).getScore(player);

//addScore
export const addScore = (player, objective, score) =>
    mc.world.scoreboard.getObjective(objective).addScore(player, score);

//forceOpen
export const forceOpen = async (player, form) => {
    while (true) {
        const r = await form.show(player);
        if (r.cancelationReason !== "UserBusy") return r;
    }
};

export const numericNumber = function (value) {
    const symbols = config.numeric_sysmbol;
    let tier = 0;

    while (value >= 1000 && tier < symbols.length - 1) {
        value /= 1000;
        tier++;
    }

    return Math.round(value) + symbols[tier];
};

const mathround = x => Math.round(x * 1000) / 1000;
export const isMoving = entity => {
    if (!(entity instanceof mc.Entity || entity instanceof mc.Player))
        throw new TypeError("arguments[0] must be Player or Entity");

    const vec = {
        x: mathround(entity.getVelocity().x),
        y: mathround(entity.getVelocity().y),
        z: mathround(entity.getVelocity().z)
    };

    if (vec.x === 0 && vec.y === 0 && vec.z === 0) return false;
    else return true;
}; /** @returns {boolean} */
<<<<<<< HEAD
=======

export function parseItem(json) {
    if (typeof json == "string") {
        json = JSON.parse(json);
    }

    let item = new ItemStack(json.type, json.amount);
    item.lockMode = json.lockMode;
    item.keepOnDeath = json.keepOnDeath;
    item.nameTag = json.nameTag;

    item.setCanDestroy(json.canDestroy);
    item.setCanPlaceOn(json.canPlaceOn);
    item.setLore(json.lore);

    json.properties.forEach(property => {
        item.setDynamicProperty(property.id, property.value);
    });

    if (item.getComponent("minecraft:durability")) {
        item.getComponent("minecraft:durability").damage = json.durability;
    }

    if (item.getComponent("minecraft:enchantable")) {
        item.getComponent("minecraft:enchantable").addEnchantments(
            json.enchantments.map(enc => {
                return {
                    level: enc.level,
                    type: new EnchantmentType(enc.type.id)
                };
            })
        );
    }

    if (item.getComponent("minecraft:dyeable")) {
        item.getComponent("minecraft:dyeable").color = json.dyeColor;
    }

    return item;
}

export function stringifyItem(item) {
    let json = {
        type: item.typeId,
        amount: item.amount,
        keepOnDeath: item.keepOnDeath,
        lockMode: item.lockMode,
        nameTag: item.nameTag,
        canDestroy: item.getCanDestroy(),
        canPlaceOn: item.getCanPlaceOn(),
        lore: item.getLore(),
        properties: item.getDynamicPropertyIds().map(id => {
            return {
                id: id,
                value: item.getDynamicProperty(id)
            };
        }),
        durability: item.getComponent("minecraft:durability")?.damage,
        dyeColor: item.getComponent("minecraft:dyeable")?.color,
        enchantments: GetEnchants(item) || []
    };
    return JSON.stringify(json);
}

export function GetEnchants(itemStack) {
    if (
        !itemStack ||
        !itemStack.hasComponent(ItemEnchantableComponent.componentId)
    ) {
        return [];
    }
    const enchantmentsComponent = itemStack.getComponent(
        ItemEnchantableComponent.componentId
    );
    return enchantmentsComponent.getEnchantments().map(enchant => ({
        type: enchant.type.id,
        level: enchant.level
    }));
}

export function getDataItem(player, item, slot) {
    let data = 0;
    let i = slot;
    let dataT;
    do {
        dataT = player.runCommand(
            `testfor @s[name=${player.name},hasitem={item=${
                item.typeId
            },quantity=${item.amount},location=${
                i < 9 ? "slot.hotbar" : "slot.inventory"
            },slot=${slot},data=${data}}]`
        );
        data++;
    } while (dataT.successCount != 1);
    dataT = data;
    return data;
}

export function useSymbol(text) {
    return /[^a-zA-Z0-9\s]/g.test(text);
}
>>>>>>> ebcc790 (Upload folder)
