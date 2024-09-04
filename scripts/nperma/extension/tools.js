import * as mc from "@minecraft/server";
import config from "../../config.js";

export const numericNumber = function (value) {
    const symbols = config.numericSysmbol;
    let tier = 0;
    while (value >= 1000 && tier < symbols.length - 1) {
        value /= 1000;
        tier++;
    }

    return Math.round(value) + symbols[tier];
};

const mathround = x => Math.round(x * 1000) / 1000;

export const tpTimeout = (player, data, timeout = 100) => {
  if (player.getDynamicProperty("teleporting")) return player.sendMessage(`§cYou have pending teleportation, move to cancel`)
  player.setDynamicProperty("teleporting", true)
  
  player.sendMessage(`§aDon't move you will be teleported to §e${data.name}`)
  const tp = mc.system.runTimeout(() => {
    mc.system.clearRun(tp)
    mc.system.clearRun(cancel)
    player.sendMessage(`§aTeleported to §e${data.name}`)
    player.teleport(data.pos)
    player.setDynamicProperty("teleporting", false)
  }, timeout)
  
  const cancel = mc.system.runInterval(() => {
    if (isMoving(player)) {
      mc.system.clearRun(tp)
      mc.system.clearRun(cancel)
      player.sendMessage(`§cPending teleportation has been canceled for moving`)
    player.setDynamicProperty("teleporting", false)
    }
  })
}