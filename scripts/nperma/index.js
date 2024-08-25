/**
 # ServerTOOL API
 * @creator @Nperma
 */

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

/**
 # HANDLER STRUCTURE
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
import * as mc from "@minecraft/server";
import * as ui from "@minecraft/server-ui";
import { JsonDatabase as Database } from "./extension/database.js";
import config from "../config.js";
import * as tools from "./extension/tools.js";
/** @PREPARE_SPOT */

const LIBRARY_DIR = "./plugins",
    SETDEV = new Set(["NASRULGgindo", "NpermaDev"]);

const warnM = console.warn;
console.warn = (...args) => warnM("[SERVERTOOL-WARN]: ", ...args);
const logM = console.log;
console.log = (...args) => logM("[SERVERTOOL-LOG]: ", ...args);
const errorM = console.error;
console.error = (...args) => errorM("[SERVERTOOL-ERROR]: ", ...args);

/** @DATABASE_SPOT */
let db_operator = {};
const db_key = ["plugins", "manage", "balance", "player"];
db_key
    .filter(k => !db_operator[k + "_db"])
    .forEach(p => {
        if (!db_operator[p + "_db"])
            db_operator[p + "_db"] = new Database(p + "_db");
    });

/** @STARTER_SPOT */
let attr = {};
let attr_after = {};
let attr_interval = {};
let attr_static = {};
const MAP_PL = new Map();
async function start() {
    for (const plugin of PLUGIN_REGISTER) {
        try {
            var [file_path, folder_path] = plugin.split("-");
            let register = await import(
                `${LIBRARY_DIR}/${folder_path}/${file_path}`
            ); //require

            if (!register?.default) {
                console.warn(`failed to register ${plugin}`);
                continue;
            }
            register = register.default;
            if (!attr[plugin]) attr[plugin] = register;

            if (
                register?.after &&
                typeof register?.after === "function" &&
                !attr_after[plugin]
            )
                attr_after[plugin] = register?.after;

            if (
                register?.interval &&
                typeof register?.interval === "function" &&
                !attr_interval[plugin]
            )
                attr_interval[plugin] = register?.interval;

            if (
                register?.static &&
                typeof register?.static === "function" &&
                !attr_static[plugin]
            )
                attr_static[plugin] = register?.static;

            if (!MAP_PL.has(plugin))
                MAP_PL.set(plugin, {
                    commands: register.commands,
                    category: register.category,
                    custom_prefix: register?.custom_prefix ?? null,
                    no_prefix: register?.no_prefix ?? false,
                    admin: register?.admin ?? false
                });

            if (
                db_operator["plugins_db"].has(plugin) &&
                JSON.stringify(db_operator["plugins_db"].get(plugin)) ===
                    JSON.stringify(MAP_PL.get(plugin))
            ) {
                console.warn(`Loaded Plugin: ${plugin}`);
                continue;
            } else if (!db_operator["plugins_db"].has(plugin)) {
                console.warn(`Added and load Plugin: ${plugin}`);
            } else if (
                db_operator["plugins_db"].has(plugin) &&
                JSON.stringify(db_operator["plugins_db"].get(plugin)) !==
                    JSON.stringify(MAP_PL.get(plugin))
            ) {
                console.warn(`Reload plugin: ${plugin}`);
            }

            db_operator["plugins_db"].set(plugin, MAP_PL.get(plugin));
        } catch (e) {
            console.warn(
                "Failed to Register because error, " + plugin,
                e.stack
            );
            continue;
        }
    }
}

start();

if (Object.keys(attr_static).length > 0)
    for (const pl_static of Object.keys(attr_static))
        attr_static[pl_static].call(this, mc, {
            mc,
            ui,
            attr,
            attr_after,
            attr_static,
            attr_interval,
            PLUGIN_REGISTER,
            database: db_operator,
            Database,
            config,
            tools
        });

mc.world.beforeEvents.chatSend.subscribe(ev => {
    let usePlugin = "";
    const { sender, message } = ev;
    let usePrefix = config.prefix.find(k => message.startsWith(k));

    for (const plugin of Array.from(db_operator["plugins_db"].keys())) {
        const handler = db_operator["plugins_db"].get(plugin);

        if (!handler?.commands) continue;

        if (handler?.custom_prefix && Array.isArray(handler?.custom_prefix))
            usePrefix = handler?.custom_prefix.find(k => message.startsWith(k));

        if (
            handler?.no_prefix &&
            typeof handler?.no_prefix === "boolean" &&
            handler?.no_prefix === true
        ) {
            const command = message.trim().split(" ").shift().toLowerCase();

            if (handler.commands.includes(command)) {
                usePlugin = plugin;
                usePrefix = "";
                break;
            }
        }

        if (usePrefix) {
            const command = message
                .slice(usePrefix.length)
                .trim()
                .split(" ")
                .shift()
                .toLowerCase();

            if (handler.commands.includes(command)) {
                if (handler?.admin && handler?.admin === true) {
                    sender.sendMessage(
                        config.warn.isnotadmin
                    );
                    break;
                }
                usePlugin = plugin;
                usePrefix = usePrefix;
                break;
            }
        }
    }

    if (usePlugin) {
        ev.cancel = true;
        mc.system.run(() => {
            const isAdmin = sender.hasTag(config.admin_tag),
                isDev = SETDEV.has(sender.name),
                args = message
                    ?.slice(usePrefix.length ?? 0)
                    .trim()
                    .split(" "),
                command = args.shift().toLowerCase();
            let text = args.slice(0).join(" ");
            /**
           # CALLBACK ARGS
           * 
           * how to use:
           * @type {handler = (mc,{args}) => {}}
           * @param {@minecraft/server} mc
           * @param {Player} sender
           * @param {string} message
           * @param {@minecraft/server-ui} ui
           * @param {boolean} isAdmin
           * @param {boolean} isDev
           * @param {Database[]} database
           * @param {plugin[]} attr
           * @param {plugin_after[]} attr_after
           * @param {plugin_interval[]} attr_interval
           * @param {string} command
           * @param {string} prefix
           * @param {string[]} args
           * @param {string} text
           * @param {object} config
           * @param {Map} Database
           * 
           **/
            attr[usePlugin].call(this, ev, {
                sender,
                message,
                ui,
                mc,
                attr,
                database: db_operator,
                config,
                tools,
                prefix: usePrefix,
                isAdmin,
                text,
                isDev,
                PLUGIN_REGISTER,
                args,
                command,
                attr_after,
                attr_interval,
                Database
            });
        });
    }

    if (Object.keys(attr_after).length > 0) {
        for (const plugin_after of Object.keys(attr_after)) {
            mc.system.run(() => {
                const isAdmin = sender.hasTag(config.admin_tag),
                    isDev = new Set(["NASRULGgindo", "NpermaDev"]).has(
                        sender.name
                    ),
                    args = message
                        ?.slice(usePrefix?.length ?? 0)
                        .trim()
                        .split(" "),
                    command = args.shift().toLowerCase();
                let text = args.slice(0).join(" ");
                /** @underDevelopment */
                attr_after[plugin_after].call(this, ev, {
                    mc,
                    sender,
                    message,
                    ui,
                    args,
                    prefix: usePrefix,
                    command,
                    isAdmin,
                    tools,
                    config,
                    PLUGIN_REGISTER,
                    isDev,
                    text,
                    usePlugin,
                    attr,
                    database: db_operator,
                    attr_after,
                    attr_interval
                });
            });
        }
    }
});

mc.system.runInterval(() => {
    if (Object.keys(attr_interval).length > 0)
        for (const plugin of Object.keys(attr_interval))
            for (const player of mc.world.getPlayers())
                attr_interval[plugin].call(this, {
                    mc,
                    ui,
                    player,
                    attr,
                    attr_after,
                    attr_interval,
                    PLUGIN_REGISTER,
                    database: db_operator,
                    Database,
                    config,
                    tools,
                    isAdmin: player.hasTag(config.admin_tag),
                    isDev: SETDEV.has(player.name)
                });
});
