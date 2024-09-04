let handler = ev => ev;

handler.static = (mc, { config }) => {
  mc.Player.prototype.tell = function(msg, plain = false) {
    this.sendMessage(`${(!plain ? "§7[§aServer§eTool§7] §r": "")}${msg ?? "§c" + msg}`)
  }

  mc.Player.prototype.fail = function(msg) {
    this.tell("§c" + msg)
  }

  mc.Player.prototype.succes = function(msg) {
    this.tell("§a" + msg)
  }

  mc.Player.prototype.running = function(msg) {
    this.tell("§e" + msg)
  }

  mc.Player.prototype.broadcast = function(text, title = "§7[§aServer§eTool§7] §r") {
    mc.world.sendMessage(`${title}${text}`)
  }
  
  mc.Entity.prototype.isMoving = function() {
    let v = this.getVelocity(), r = this.getViewDirection(), dr = this.getDynamicProperty("deltaRotation")
    if (dr && (v.x != 0 || v.y != 0 || v.z != 0 || r.x != dr?.x || r.y != dr?.y || r.z != dr?.z)) {
      this.setDynamicProperty("deltaRotation")
      return true
    }
    this.setDynamicProperty("deltaRotation", r)
    return false
  }
  
  mc.Player.prototype.tpTimeout = function(data, timeout = 100) {
    if (this.getDynamicProperty("teleporting")) return this.sendMessage(`§cYou have pending teleportation, move to cancel`)
    
    this.setDynamicProperty("teleporting", true)
    this.setDynamicProperty("deltaRotation")

    if (timeout != 0) this.sendMessage(`§aDon't move you will be teleported to §e${data.name}`)
    const tp = mc.system.runTimeout(() => {
      mc.system.clearRun(tp)
      mc.system.clearRun(cancel)
      this.setDynamicProperty("teleporting", false)
      this.teleport(data.pos, { dimension: mc.world.getDimension(data.dimension ?? "overworld") })
      this.sendMessage(`§aTeleported to §e${data.name}`)
      this.playSound("random.levelup", { location: data.pos })
    }, timeout)

    const cancel = mc.system.runInterval(() => {
      if (this.isMoving()) {
        mc.system.clearRun(tp)
        mc.system.clearRun(cancel)
        this.sendMessage(`§cPending teleportation has been canceled for moving`)
        this.setDynamicProperty("teleporting", false)
      }
    })
  }
}

export default handler