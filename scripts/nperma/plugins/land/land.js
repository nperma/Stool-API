import * as CONF from "./CONFIG.js";
const CONFIG = CONF.default;
import { Table } from "../index.js";

function Land() {
    this.idKey = this.id = "LAND-STORAGE";

    /**
     * Generates a unique ID between 1000 and 9999.
     * Ensures no duplicates in the database.
     * @returns {number} Unique ID.
     */
    this.generateID = function () {
        let id;
        do {
            id = Math.floor(Math.random() * 9000) + 1000;
        } while (Table.findTable(this.idKey, "id", id));
        return id;
    };

    /**
     * Adds a new land to the database.
     * @param {string} owner - Owner of the land.
     * @param {{x: number, z: number}} start - Start coordinates (min x, min z).
     * @param {{x: number, z: number}} end - End coordinates (max x, max z).
     * @returns {{status: boolean, success: string | null, error: string | null}}
     */
    this.addLand = function (owner, start, end) {
        const id = this.generateID();
        const newLand = { id, owner, start, end };
        if (this.checkOverlaps(start, end)) {
            return {
                status: false,
                success: null,
                error: "Land overlaps with an existing land."
            };
        }
        Table.setTable(this.idKey, newLand);
        return {
            status: true,
            success: `Land created successfully with ID: ${id}`,
            error: null
        };
    };

    /**
     * Deletes a land by its ID.
     * @param {number} id - ID of the land to delete.
     * @returns {{status: boolean, success: string | null, error: string | null}}
     */
    this.deleteLand = function (id) {
        const land = Table.findTable(this.idKey, "id", id);
        if (!land) {
            return { status: false, success: null, error: "Land not found." };
        }
        Table.deleteTable(this.idKey, id);
        return {
            status: true,
            success: `Land with ID: ${id} has been deleted.`,
            error: null
        };
    };

    /**
     * Checks if a position is within any existing land.
     * @param {{x: number, z: number}} pos - Position to check.
     * @returns {{status: boolean, data: object | null, error: string | null}}
     */
    this.isInLand = function (pos) {
        const lands = Table.getTable(this.idKey) || [];
        const land = lands.find(
            (l) =>
                pos.x >= l.start.x &&
                pos.x <= l.end.x &&
                pos.z >= l.start.z &&
                pos.z <= l.end.z
        );
        if (!land) {
            return {
                status: false,
                data: null,
                error: "Position is not within any land."
            };
        }
        return { status: true, data: land, error: null };
    };

    /**
     * Checks if a new land overlaps with any existing lands.
     * @param {{x: number, z: number}} start - Start coordinates of the new land.
     * @param {{x: number, z: number}} end - End coordinates of the new land.
     * @returns {boolean} True if overlaps, false otherwise.
     */
    this.checkOverlaps = function (start, end) {
        const lands = Table.getTable(this.idKey) || [];
        return lands.some(
            (l) =>
                start.x <= l.end.x &&
                end.x >= l.start.x &&
                start.z <= l.end.z &&
                end.z >= l.start.z
        );
    };

    /**
     * Retrieves all lands or lands owned by a specific owner.
     * @param {string} [owner] - Optional owner name to filter lands by owner.
     * @returns {Array} - List of lands matching the criteria.
     */
    this.getLands = function (owner = undefined) {
        const lands = Table.getTable(this.idKey) || [];
        if (owner) {
            return lands.filter((land) => land.owner === owner);
        }
        return lands;
    };

    /**
     * Tests if a player is in any land.
     * @param {string} player - Player name.
     * @param {{x: number, z: number}} pos - Player's position.
     * @returns {{status: boolean, data: object | null, error: string | null}}
     */
    this.testPlayer = function (player, pos) {
        const land = this.isInLand(pos);
        if (!land.status) {
            return {
                status: false,
                data: null,
                error: `${player} is not in any land.`
            };
        }
        return { status: true, data: land.data, error: null };
    };
}

handler=(ev,{command,args})=>{}

handler.commands=["pwarp","landpwarp","landstart","lstart","landend","lend","landcreate","landbuy","myland","lands","landhere"];

export default handler;
