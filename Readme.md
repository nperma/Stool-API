<h1 align="center">STOOL-API</h1>
<p align="center">API used for Minecraft Bedrock Edition ScriptAPI development.</p>

> **Warning:** This repository is still in development. While it can be used, some functions may be less effective and are subject to future improvements.

---

## 📁 Configuration

**Path:** `scripts/config.js`

The configuration is designed for file-based management, avoiding in-game adjustments to simplify development.

```javascript
const config = {
    /** 
     * # DONT CHANGE THIS!!
     * @dev_spot 
     */
    version: "1.0.5",
    creator: "Nperma",
    github: "https://github.com/nperma",

    /** @configuration */

    prefix: ["+", "-", "?", "!"], // Default command prefixes
    admin_tag: "perm.admin", // Admin tag
    log: {
        message: true,
        teleport: true
    },
    default_title: "§l§2[§aSERVERTOOL§l§2]§r §7»§r ",
    default_balance: 2000,
    numeric_symbol: ["", "k", "M", "B", "T"],
    home: {
        countdown: 3, // 3 seconds
        homelimit: {
            /** @type {Object} @property {Tag} key @property {limithome} value */
            default: 2,
            "perm.admin": 20,
            vip: 5,
            mvp: 8,
            legend: 12
        }
    },
    warp: {
        countdown: 3,
        teleportbroadcast: true // Broadcast teleport to all players
    }
    // Under development...
};
```