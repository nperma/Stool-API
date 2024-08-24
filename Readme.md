# STOOL-API

API used for mcbe ScriptAPI development.
warning the repo is still in the development stage but can be used so if there are some functions that are less effective it may be fixed in the future.

# Configuration

path: `scripts/config.js`
```javascript
const config = {
    /** 
  # DONT CHANGE THIS!!
  @dev_spot */
    version: "1.0.5",
    creator: "Nperma",
    github: "https://github.com/nperma",

    /** @configuration */

    prefix: ["+", "-", "?", "!"], //prefix default command
    admin_tag: "perm.admin", //admin tag
    log: {
        message: true,
        teleport: true
    },
    default_title: "§l§2[§aSERVERTOOL§l§2]§r §7»§r ",
    default_balance: 2000,
    numeric_sysmbol: ["", "k", "M", "B", "T"],
    home: {
        countdown: 3, //3second
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
      teleportbroadcast: true //will sent teleport to all player
    }
};
```