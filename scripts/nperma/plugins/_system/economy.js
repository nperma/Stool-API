let handler = ev => ev

handler.static = (mc, { database }) => {
  mc.Player.prototype.setBalance = function(amount) {
    if (isNaN(amount)) throw new TypeError("Native type conversion error: the amount is need to be a nunber")
    database.balance_db.set(`${this.name}:${this.id}`, amount)
  }
  
  mc.Player.prototype.getBalance = function() {
    return database.balance_db.get(`${this.name}:${this.id}`) ?? 0
  }
  
  mc.Entity.prototype.setScore = function(obj, amount) {
    return mc.world.scoreboard.getObjective(obj)?.setScore(this, amount)
  }

  mc.Entity.prototype.addScore = function(obj, amount) {
    return mc.world.scoreboard.getObjective(obj)?.addScore(this, amount)
  }

  mc.Entity.prototype.getScore = function(obj) {
    return mc.world.scoreboard.getObjective(obj)?.getScore(this) ?? 0
  }
}

export default handler