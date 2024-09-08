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
