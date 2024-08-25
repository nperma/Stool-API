<h1 align="center">STOOL-API</h1>
<p align="center">An API for Minecraft Bedrock Edition ScriptAPI development.</p>

> **Warning:** This repository is still under development. While it can be used, some functions may not be fully optimized and are subject to future updates.

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
    },
    
    message: {
        isnotadmin: "you dont have permission to use this command!!"
    }
    // Under development...
};
```

## 📝 Default Manifest

```json
{
    "format_version": 2,
    "header": {
        "name": "§l§bStool-API",
        "description": "Inspired by WhatsApp Bot Style",
        "uuid": "117b23ff-ea32-407e-9a30-c5f4a890d626",
        "version": [1, 0, 0],
        "min_engine_version": [1, 21, 20]
    },
    "modules": [
        {
            "type": "data",
            "description": "Supports Realm and Server",
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

## 🔌 Default Plugins

```javascript
//format <file>-<folder>
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

// require(`${LIBRARY_DIR}/${folder}/${file}`)
```

## ⚙️ HANDLER Structure

```javascript
/**
 * # HANDLER STRUCTURE
 * @type {Command<function>}
 * @property {boolean} admin
 * @property {string[]} commands
 * @property {string} category
 * @property {string[]} help
 * @property {string[]} custom_prefix
 * @property {boolean} no_prefix
 * @property {afterCommand<function>} after
 * @property {Interval<function>} interval
 * @property {Static<function>} static
 */
```

**Path:** `scripts/nperma/index.js`  
**Library:** `./plugins`

### HANDLER Command/Default

Type `@function` (*required)

```markdown
### CALLBACK ARGUMENTS
**0**
- ev = eventData.chatSend
**1**
- mc = @minecraft/server
- ui = @minecraft/server-ui
- tools = ./extension/tools
- sender = Sender @type {Player}
- message = Message By Sender @type {string}
- text = Text after command @type {string}
- prefix = Prefix used @type {string}
- command = Command used by Sender @type {string}
- args = Arguments @type {string[]}
- isAdmin = Check if sender is Admin @type {boolean}
- isDev = Check if sender is Developer @type {boolean}
- database = Database object
- Database = Database @type {Map}
- attr = Plugin Default Saver @type {Command<function>}
- attr_after = Plugin After Saver @type {AfterCommand<function>}
- attr_interval = Plugin Interval Saver @type {Interval<function>}
- PLUGIN_REGISTER = Plugins
```

### HANDLER After/afterCommand

Type `@function`

```markdown
### CALLBACK ARGUMENTS 1
**0**
- ev = eventData.chatSend
**1**
- mc = @minecraft/server
- ui = @minecraft/server-ui
- tools = ./extension/tools
- sender = Sender @type {Player}
- message = Message By Sender @type {string}
- text = Text after command @type {string}
- prefix = Prefix used @type {string}
- command = Command used by Sender @type {string}
- args = Arguments @type {string[]}
- isAdmin = Check if sender is Admin @type {boolean}
- isDev = Check if sender is Developer @type {boolean}
- database = Database object
- Database = Database @type {Map}
- attr = Plugin Default Saver @type {Command<function>}
- attr_after = Plugin After Saver @type {AfterCommand<function>}
- attr_interval = Plugin Interval Saver @type {Interval<function>}
- PLUGIN_REGISTER = Plugins
```

### HANDLER Static

Type `@function`

```markdown
### CALLBACK ARGUMENTS 1
**0**
- mc = @minecraft/server
**1**
- ui = @minecraft/server-ui
- tools = ./extension/tools
- config = Config @type {Object}
- database = Database object
- Database = Database @type {Map}
- PLUGIN_REGISTER = Plugins
- attr = Plugin Default Saver @type {Command<function>}
- attr_after = Plugin After Saver @type {AfterCommand<function>}
- attr_static = Plugin Static Saver @type {Static<function>}
- attr_interval = Plugin Interval Saver @type {Interval<function>}
```

### HANDLER Interval

Type `@function`

```markdown
### CALLBACK ARGUMENTS
**0**
- mc = @minecraft/server
- ui = @minecraft/server-ui
- tools = ./extension/tools
- player = Player @type {Player}
- config = Config @type {Object}
- database = Database object
- Database = Database @type {Map}
- attr = Plugin Default Saver @type {Command<function>}
- attr_after = Plugin After Saver @type {AfterCommand<function>}
- attr_interval = Plugin Interval Saver @type {Interval<function>}
- PLUGIN_REGISTER = Plugins
- isAdmin = Check if player is Admin @type {boolean}
- isDev = Check if player is Developer @type {boolean}
```

### Example Usage Plugins Handler

default plugin examples:
```javascript
//you can use module from outside the handler or you can use args from callback
import {world} from "@minecraft/server";
let handler = function(ev,{mc,command,text}) {
  if (!text) return ev.sender.sendMessage("§7pls type the text!!")
  if (command === "mc") return mc.world.sendMessage(text)
  else if (command === "world") return world.sendMessage(text)
}

handler.commands = 
handler.helps = ["mc <text>","world <text>"]
handler.category = "twst";

export default handler;
```

```javascript
//You can name the variable anything as long as it is connected and according to use, each plugin file can only export 1 variable, not more!!
let puelli = (ev,{text,mc}) => {
  if(!text) return ev.sender.sendMessage("§7pls type the text!!")
  
  const {world} = mc //advance js
  return world.sendMessage(text)
}

puelli.commands = puelli.helps = ["tes"]
puelli.category = "twst";

export default puelli
```

using property `custom_prefix` example:

```
type in game:
p.say hai
//result: hai

np!say hallo
//result: hallo

!say hai
//result: 
```

```javascript
let handler = function(ev,{text,mc}) {
  if(text) mc.world.sendMessage(text)
  else ev.sender.sendMessage("-_-")
}

handler.commands = ["say"]
handler.helps = ["say <text>"]
handler.custom_prefix = ["p.","np!"]
handler.category = "twst";

export default handler;
```

```javascript

```

```javascript
let handler = (ev,{sender,config,args,isAdmin,command, database}) => {
  const balanceDB = database["balance_db"];
  if (command === "balance") {
    const myBalance = balanceDB.get(sender.name)??0;
    
    return sender.sendMessage(`§emy balance: §6${myBalance}`)
  } else if (command === "setbalance") {
    if (!isAdmin) return sender.sendMessage(config.message.isnotadmin)
    
    if (!args[0]) return sender.sendMessage(`§7pls type the amount!!`)
    
    if (isNaN(args[0])) return sender.sendMessage(`§camount must be number!!`)
    
    balanceDB.set(sender.name, args[0])
    return sender.sendMessage(`§aset your balance to §6${args[0]}`)
  }
}

handler.commands = ["balance","setbalance"]
handler.helps = ["balance","setbalance <amount>"];
handler.category = "economy";

export default handler;
```

example eval plugin:
```
type in game:
> console.warn("example")
```
example [eval-plugin](https://github.com/nperma/Stool-API/blob/main/scripts/nperma/plugins/dev/eval.js)
eval plugin using `property`:
- no_prefix

admin example plugin:
```javascript
//attr/path: msb-admin/(admin/msb.js)
let handler = function(ev,{sender,tools,text}) {
  tools.broadcast(`§d@${sender.name}§g: §e${text}`,`§5§l[§dMSB§5]§r §7»§r`)
}

handler.commands = ["msb","modsbroadcast"];
handler.helps = ["msb <text>"];
handler.admin = true; //set to true will only admin or player with tags 'config.admin_tag' can use the command
handler.category = "admin";

export default handler;
```

after example plugins:
```
wait
```
## 👤 Creator

- [Nperma](https://www.github.com/nperma)

## ℹ️ About Script

This script is used for creating the latest server tool script addon with type NSS (`ServerTool-NSS`).

### Extension

- [ConDatabase](https://github.com/Con-JS-Development/Con-Database)

### Supported Version

**Latest Update:** 1.21.20+  
**Important:** Since the module uses the stable beta version, you must enable `Beta-API`.

- [@minecraft/server^1.14.0-beta](https://jaylydev.github.io/scriptapi/@minecraft/server)
- [@minecraft/server-ui^1.3.0-beta](https://jaylydev.github.io/scriptapi/@minecraft/server-ui)

## 📝 License

This project is licensed under the MIT License.

---