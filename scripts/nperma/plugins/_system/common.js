let handler = ev => ev;

handler.static = (v, { mc, config }) => {
  mc.World.prototype.broadcast = function(text, title = "§7[§aServer§eTool§7] §r") {
    this.sendMessage(`${title}${text}`);
  }

  mc.System.prototype.getTps = async () => {
    let start = Date.now();
    await mc.system.waitTicks(20);
    let duration = Date.now() - start;
    let tps = (20 / (duration / 1000)).toFixed(2);
    return tps;
  };

  mc.System.prototype.sleep = async function(tick, second = false) {
    await this.waitTicks(second ? tick * 20 : tick)
  }

  Math.formatNumber = function(value) {
    const types = config.numericSysmbol;
    const selectType = (this.log10(value) / 3) | 0;

    if (selectType == 0) return value;
    let scaled = value / this.pow(10, selectType * 3);

    return scaled.toFixed(2) + types[selectType];
  }

  mc.ItemStack.prototype.isMatch = function(item) {
    if (!(item instanceof mc.ItemStack)) throw new TypeError("Native type conversion error")

    if (this.typeId == item.typeId || this.amount == item.amount) return true

    return false
  }
  
  Math.formatPos = function(pos, mode = 0) {
    if (isNaN(mode)) throw new TypeError("Native type conversion error")
    let { x, y, z } = pos;

    if (mode === 1) {
      return {
       x: Math.round(x) + 0.5,
       y: parseFloat(y.toFixed(2)),
       z: Math.round(z) + 0.5
      }
    } else if (mode === 2) {
      return `§c${x.toFixed(2)} §a${y.toFixed(2)} §b${z.toFixed(2)}`;
    } else {
      return {
         x: parseFloat(x.toFixed(2)),
         y: parseFloat(y.toFixed(2)),
         z: parseFloat(z.toFixed(2))
      }
    }
  }
}

export default handler