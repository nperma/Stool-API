import * as mc from "@minecraft/server";
import * as ui from "@minecraft/server-ui";
import * as tools from "./tools.js";
import { JsonDatabase as Database } from "./database.js";
import {
    db_operator as database,
    SETDEV,
    LIBRARY_DIR as DIR,
    attr,
    attr_after,
    attr_static,
    attr_interval
} from "../index.js";
import config from "../../config.js";

function LoadServer(server) {
    server.database = database;
    server.Database = Database;
    server.tools = tools;
    server.config = config;
    server.plugin = {
        default: attr,
        after: attr_after,
        static: attr_static,
        interval: attr_interval
    };
    server.dir = DIR;
    server.SETDEV = SETDEV;
    server.mc = mc;
    server.ui = ui;

    server.broadcastSound = soundId => {
        if (!soundId) throw new Error("Please provide a soundId.");
        return mc.world.getAllPlayers().forEach(p => p.playSound(soundId));
    };

    server.sendBroadcast = (
        text,
        { title = null, sound = "note.pling" } = {}
    ) => {
        if (!text) return;
        tools.broadcast(text, title);
        return sound && server.broadcastSound(sound);
    };

    server.isOnline = playerName => {
        return (
            playerName &&
            !!mc.world.getAllPlayers().find(p => p.name === playerName)
        );
    };

    server.findPlayer = playerName => {
        return (
            playerName &&
            server.isOnline(playerName) &&
            mc.world.getAllPlayers().find(p => p.name === playerName)
        );
    };

    return server;
}

export default LoadServer;
