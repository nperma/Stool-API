# STOOL-API

API used for mcbe ScriptAPI development.
warning the repo is still in the development stage but can be used so if there are some functions that are less effective it may be fixed in the future.

## Configuration

path: `scripts/config.js`

The configuration is not supported for use in ingame because I will make this configuration only in files so as not to confuse things in development.

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
    //under development...
};
```

## Default Manifest
```json
{
    "format_version": 2,
    "header": {
        "name": "§l§bStool-API",
        "description": "Inspired Style Bot Whatsapp",
        "uuid": "117b23ff-ea32-407e-9a30-c5f4a890d626",
        "version": [1, 0, 0],
        "min_engine_version": [1, 21, 20]
    },
    "modules": [
        {
            "type": "data",
            "description": "For Support Realm and Server",
            "uuid": "10d70681-9c08-432e-adfe-c8c5e5da18bd",
            "version": [1, 0, 0]
        },
        {
            "description": "",
            "uuid": "59f9e579-38b3-4bce-8e20-732c2f9e82e0",
            "version": "1.1.0-beta",
            "type": "script",
            "language": "javascript",
            "entry": "scripts/nperma/index.js"
        }
    ],
    "dependencies": [
        {
            "module_name": "@minecraft/server",
            "version": "1.14.0-beta"
        },
        {
            "module_name": "@minecraft/server-ui",
            "version": "1.3.0-beta"
        }
    ],
    "capabilities": ["script_eval"]
}
```

## Default Plugins
```javascript
const PLUGIN_REGISTER = [
    /** @general */
    "help-general",
    "tps-general",
    "about-general",
    "home-general",
    "sb-general",
    "clearchat-general",
    "warp-general",
    "mods-general",
    /** @admin */
    "teleport-admin",
    /** @logger */
    "message-_log",
    /** @system */
    "join-_system",
    "leave-_system",
    "proto_openui-_system",
    /** @developer */
    "eval-dev"
];
```

## Examples

### HANDLER DEFAULT
```javascript
/**
 # HANDLER
 * @type {function}
 * 
 * @arguments
 * command {string}
 * prefix {string}
 */
```


## Creator

- [Nperma](https://www.github.com/nperma)

## About Script

This script is used in creating the latest servertool script addon with type NSS (`ServerTool-NSS`).

### Extension
- [ConDatabase](https://github.com/Con-JS-Development/Con-Database)

### Support Version
latest-update: 1.21.20+

because the module uses the stable beta version you must enable `Beta-API`

- [@minecraft/server^1.14.0-beta](https://jaylydev.github.io/scriptapi-docs/latest/modules/_minecraft_server_1_14_0_beta.html)
- [@minecraft/server-ui^1.3.0-beta](https://jaylydev.github.io/scriptapi-docs/latest/modules/_minecraft_server_ui_1_3_0_beta.html)