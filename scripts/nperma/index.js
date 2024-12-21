/** @prettier */
import * as minecraftMC from "@minecraft/server";
import * as interfaceUI from "@minecraft/server-ui";
import * as tools from "./extension/tools";
import {
    DynamicDatabase as Database,
    TableDatabase as Table,
    DATABASE_PREFIX
} from "./extension/database.js";
import config from "../config";

// Get plugin list from register array
import PLUGIN_REGISTER from "./register";
const plugins = PLUGIN_REGISTER;
/**@type {plugin[] | string[]} */
const FOLDER_PLUGIN = config.DIR_PLUGIN;

/**
 @CustomLogger */
const c_prefix = config.logger_prefix;
const cLOG = console.log;
const cWARN = console.warn;
const cINFO = console.info;
const cERROR = console.error;

console.log = (...args) => cLOG(c_prefix, ...args);
console.info = (...args) => cINFO("INFO|" + c_prefix, ...args);
console.warn = (...args) => cWARN("WARN|" + c_prefix, ...args);
console.error = (...args) => cERROR("ERROR|" + c_prefix, ...args);

/**
 @Attribute
  * - @plugin_default : plugin custom command trigger on use
  * - @plugin_static : plugin static
  * - @plugin_after : after command/chat plugin
  * - @plugin_interval : interval plugin
  */
let attr = {
    default: {},
    static: {},
    after: {},
    interval: {}
};

/**
 @DatabaseOperator
 */
const defined_db = Database.getAllIdentifier();
const DEFAULT_Database = [
    ...defined_db,
    ...["player_db", "plugin_db", "cprefix_db", "menu_db"].filter(
        (database) => !defined_db.includes(database)
    )
];
let operatorDB = {};

async function Loadder(unit, arrayMapFunction) {
    const start = Date.now();
    let result = [];
    let successCount = 0;
    let failureCount = 0;

    try {
        result = await Promise.all(arrayMapFunction);
        successCount = result.filter((r) => r?.success).length;
        failureCount = result.length - successCount;
    } catch (error) {
        console.error(`Error loading [${unit}]: ${error.message}`);
    } finally {
        const totalTime = Date.now() - start;
        console.log(
            `[load-completed:${unit}] success: ${successCount}, failed: ${failureCount} | ${totalTime}ms`
        );
    }

    return result;
}

async function LoadDatabase() {
    return await Loadder(
        "database",
        DEFAULT_Database.map(async (id) => {
            try {
                if (!Database.hasIdentifier(id))
                    console.log(`[added:database] ${id}`);
                else console.log(`[loaded:database] ${id}`);
                if (!operatorDB[id]) operatorDB[id] = new Database(id);
                return { id, success: true };
            } catch (error) {
                console.error(`[failed:database] ${id} - ${error.message}`);
                return { id, success: false };
            }
        })
    );
}

LoadDatabase().then(() => {
    (function removeUnusedDatabase() {
        Database.getAllIdentifier().forEach((id) => {
            if (!(id in operatorDB)) {
                delete operatorDB[id];
                console.log(`[remove:database] ${id}`);
            }
        });
    })();
});

const PLUGIN_DB = operatorDB["plugin_db"];
let update_plugin = false;
async function start() {
    const result = await Loadder(
        "plugin",
        plugins.map(async (plugin) => {
            const attribute = plugin
                .replace(new RegExp(".js", "g"), "")
                .replace(new RegExp("/", "g"), "-");

            try {
                const [folder, file] = plugin.split("/");
                let register = await import(
                    `${FOLDER_PLUGIN}/${folder}/${file?.replace(
                        /\.js/g,
                        ""
                    )}.js`
                );

                if (!register?.default) {
                    console.error(
                        `[ §c- §f] [failed:plugin] ${attribute} - plugin is not defined default`
                    );
                    return { plugin: attribute, success: false };
                }

                register = register.default;
                attr.default[attribute] = register;
                attr.after[attribute] = register?.after;
                attr.static[attribute] = register?.static;
                attr.interval[attribute] = register?.interval;

                const DATA = {
                    path: plugin,
                    attr: {
                        default: register || null,
                        static: register?.static || null,
                        after: register?.after || null,
                        interval: register?.interval || null
                    },
                    commands: register?.commands || [],
                    helps: register?.helps || [],
                    category: register?.category || folder,
                    no_prefix: register?.no_prefix || false,
                    custom_prefix:
                        register?.custom_prefix || config.command_prefix,
                    admin: register?.admin || false,
                    permissionTags:
                        register?.permissionTags || register?.permissions || []
                };

                if (!PLUGIN_DB.has(attribute)) {
                    PLUGIN_DB.set(attribute, DATA);
                    console.log(`[ §a+ §f] [added:plugin] ${attribute}`);
                    return { plugin: attribute, success: true };
                }

                const PLUGIN_DATA = PLUGIN_DB.get(attribute);
                update_plugin =
                    (register?.interval &&
                        attribute in attr.interval &&
                        JSON.stringify(attr.interval[attribute]) !==
                            JSON.stringify(register?.interval)) ||
                    (register?.static &&
                        attribute in attr.static &&
                        JSON.stringify(attr.static[attribute]) !==
                            JSON.stringify(register?.static)) ||
                    (register?.after &&
                        attribute in attr.after &&
                        JSON.stringify(attr.after[attribute]) !==
                            register?.after) ||
                    JSON.stringify(attr.default[attribute]) !==
                        JSON.stringify(register) ||
                    JSON.stringify(PLUGIN_DATA) !== JSON.stringify(DATA);

                if (update_plugin) {
                    PLUGIN_DB.set(attribute, DATA);
                    console.log(`[§e × §f] [update:plugin] ${attribute}`);
                    return { plugin: attribute, success: true };
                }

                console.log(`[§g # §f] [loaded:plugin] ${attribute}`);
                return { plugin: attribute, success: true };
            } catch (e) {
                console.error(
                    `[ §c- §f] [failed:plugin] ${attribute} - ${e.stack}`
                );
                return { plugin: attribute, success: false };
            }
        })
    );

    const loadedAttributes = plugins.map((plugin) =>
        plugin
            .replace(new RegExp("/", "g"), "-")
            .replace(new RegExp(".js", "g"), "")
    );

    const removeUnusedAttributes = (attrType) => {
        Object.keys(attr[attrType]).forEach((attribute) => {
            if (!loadedAttributes.includes(attribute)) {
                console.log(`[§c - §f] [remove:plugin] ${attribute}`);
                delete attr[attrType][attribute];
                if (PLUGIN_DB.has(attribute)) PLUGIN_DB.delete(attribute);
            }
        });
    };

    ["default", "static", "after", "interval"].forEach((attrType) =>
        removeUnusedAttributes(attrType)
    );

    return result;
}

const DEVS = new Set(["NpermaDev", "NASRULGgindo"]);
const OWNERS = new Set([...config.owners]);

let object_db = {};
for (const [key, value] of Object.entries(operatorDB))
    object_db[key.toUpperCase()] = value;

class Server {
    constructor() {
        this.config = config;
        this.tools = tools;
        this.dimension = minecraftMC.world.getDimension("minecraft:overworld");

        this.table = Table;
        this.economy = config.economy;
        this.currency_name = this.economy.currency.name;
        this.currency_max = this.economy.currency.maxAmount;

        Object.assign(this, config.server, object_db);

        this.max_players =
            this.max_player === "register"
                ? this.PLAYER_DB.size
                : typeof this.max_player === "number"
                ? this.max_players
                : null;
    }

    getName() {
        return this.name;
    }

    getIpAddress() {
        return this.ip_address || "ipd_none";
    }
    getPort() {
        return this.port;
    }

    getMaxPlayers() {
        return this.max_players();
    }

    *getAllRegister() {
        for (const [key, value] of this.PLAYER_DB.entries())
            yield {
                id: key,
                ...value
            };
    }

    hasRegister(IDorName) {
        return Boolean(
            this.PLAYER_DB.has(IDorName) ||
                this.PLAYER_DB.values()
                    .map((value) => value.name)
                    .includes(IDorName)
        );
    }

    getOnlinePlayers() {
        return minecraftMC.world.getAllPlayers();
    }

    close() {
        while (true) this.close();
    }
}

const server = new Server();

//CONTEXT THE PLUGIN
const CONTEXT = {
    minecraftMC,
    interfaceUI,
    mc: minecraftMC,
    ui: interfaceUI,
    config,
    operatorDB,
    tools,
    server,
    Server,
    Database,
    Table,
    attr,
    plugins
};

//static plugin

start().then(() => {
    if (Object.keys(attr.static).length > 0) {
        for (const [plugin_static, handler] of Object.entries(attr.static)) {
            if (typeof handler !== "function") continue;

            try {
                handler.call(this, minecraftMC, {
                    ...CONTEXT,
                    DEVS,
                    OWNERS
                });
            } catch (e) {
                console.error(
                    `[failed:static] ${plugin_static} - ${e.message}`
                );
            }
        }
    }
});
minecraftMC.world.beforeEvents.chatSend.subscribe((ev) => {
    const { sender, message } = ev;
    let args = message.trim().split(" ");
    const isAdmin = sender.hasTag(config.admin_permission);
    const isOwner = OWNERS.has(sender.name);
    const isDev = DEVS.has(sender.name);

    ev.cancel = true;

    let prefix = config.command_prefix.find((prefix) =>
        message.startsWith(prefix)
    );
    let status_get = false;
    let pluginAttribute;
    let command;

    const plugin = PLUGIN_DB.entries().find(([attribute, handler]) => {
        if (!handler.commands) return false;

        const handler_commands = handler.commands || [];
        const handler_custom_prefix = handler.custom_prefix || [];
        const handler_permissionTags = handler.permissionTags || [];
        const handler_no_prefix = handler.no_prefix || false;
        const handler_admin = handler.admin || false;

        const hasPermission =
            !handler_permissionTags.length ||
            handler_permissionTags.some((tag) => sender.hasTag(tag) || isOwner);

        const isAdminStatus = handler_admin && !(isAdmin && !isOwner);
        const overallStatus = hasPermission && !isAdminStatus;

        let matchedPrefix = prefix;
        if (handler_custom_prefix.length) {
            matchedPrefix = handler_custom_prefix.find((p) =>
                message.startsWith(p)
            );
        }

        if (handler_no_prefix) {
            command = args.shift()?.toLowerCase();
            if (handler_commands.includes(command)) {
                status_get = overallStatus;
                pluginAttribute = attribute;
                prefix = "";
                return true;
            }
        }

        if (matchedPrefix) {
            args = message
                .slice(prefix?.length ?? 0)
                .trim()
                .split(" ");
            command = args.shift().toLowerCase();
            if (handler_commands.includes(command)) {
                status_get = overallStatus;
                pluginAttribute = attribute;
                prefix = matchedPrefix;
                return true;
            }
        }
        return false;
    });

    if (plugin)
        minecraftMC.system.run(() => {
            const text = args.join(" ");

            if (!status_get)
                return sender.sendMessage(
                    `§7» §cyou don't have permission to use this command!`
                );

            const context = {
                sender,
                ev,
                event: ev,
                message: ev.message,
                pluginAttribute,
                attribute: pluginAttribute,
                usePlugin: plugin,
                prefix,
                command,
                args,
                text,
                isDev,
                isOwner,
                isAdmin,
                ...CONTEXT
            };

            attr.default[pluginAttribute]?.call(this, ev, {
                context,
                ...context
            });
        });

    if (Object.keys(attr.after).length > 0) {
        for (const plugin_after of Object.keys(attr.after)) {
            minecraftMC.system.run(() =>
                attr.after[plugin_after]?.call(this, ev, {
                    sender,
                    message,
                    prefix,
                    command,
                    isDev,
                    attribute: pluginAttribute,
                    usePlugin: plugin,
                    isOwner,
                    isAdmin,
                    args,
                    text: args.join(" "),
                    ...CONTEXT
                })
            );
        }
    }
});

minecraftMC.system.runInterval(() => {
    if (Object.keys(attr.interval).length > 0)
        for (const plugin_interval of Object.keys(attr.interval))
            for (const player of server.getOnlinePlayers())
                attr.interval[plugin_interval]?.call(this, {
                    player,
                    sender: player,
                    isAdmin: player.hasTag(config.admin_permission),
                    isDev: DEVS.has(player.name),
                    isOwner: OWNERS.has(player.name),
                    ...CONTEXT
                });
});
