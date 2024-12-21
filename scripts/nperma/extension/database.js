import { world } from "@minecraft/server";

export const DATABASE_PREFIX = " \u00D1\u00D1";

/**
 * Represents a dynamic database that allows setting, getting, and deleting key-value pairs.
 */
export class DynamicDatabase {
    /** @private */
    #IDENTIFIER;

    /**
     * Creates an instance of DynamicDatabase with a specific identifier.
     *
     * @param {string} id - The unique identifier for the database.
     */
    constructor(id) {
        this.#IDENTIFIER = `${DATABASE_PREFIX}${id}${DATABASE_PREFIX}`;
        
        // Define the database if it's not already defined
        if (!world.getDynamicPropertyIds().some(dbId => dbId === `${this.#IDENTIFIER}defined$$$###`)) {
            this.set("defined$$$###", true);
        }
    }

    /**
     * Sets a value for a given key in the database.
     *
     * @param {string} key - The key to set in the database.
     * @param {any} value - The value to associate with the key.
     * @throws {TypeError} If the key is not a string.
     * @returns {this}
     */
    set(key, value) {
        if (typeof key !== "string") {
            throw new TypeError(`Key (${key}) must be a string`);
        }
        world.setDynamicProperty(`${this.#IDENTIFIER}${key}`, JSON.stringify(value));
        return this;
    }

    /**
     * Gets the value associated with a given key.
     *
     * @param {string} key - The key whose value to retrieve.
     * @returns {any} The value associated with the key, or undefined if not found.
     */
    get(key) {
        const value = world.getDynamicProperty(`${this.#IDENTIFIER}${key}`);
        return this.has(key)? JSON.parse(value):undefined;
    }

    /**
     * Checks if the database contains a specific key.
     *
     * @param {string} key - The key to check for in the database.
     * @returns {boolean} True if the key exists in the database, otherwise false.
     */
    has(key) {
        return !!world.getDynamicProperty(`${this.#IDENTIFIER}${key}`);
    }

    /**
     * Deletes a key and its associated value from the database.
     *
     * @param {string} key - The key to delete.
     * @returns {boolean} True if the key was deleted, otherwise false.
     */
    delete(key) {
        if (!this.has(key)) return false;
        world.setDynamicProperty(`${this.#IDENTIFIER}${key}`, undefined);
        return true;
    }

    /**
     * Retrieves all dynamic property IDs associated with the database.
     *
     * @returns {string[]} An array of all dynamic property IDs.
     */
    getIds() {
        return world
            .getDynamicPropertyIds()
            .filter(id => id.startsWith(this.#IDENTIFIER) && id !== `${this.#IDENTIFIER}defined$$$###`);
    }

    /**
     * Retrieves all the keys in the database as an array.
     *
     * @returns {string[]} An array of keys from the database.
     */
    keys() {
        return Array.from(this.#getIndexedIterator("key"));
    }

    /**
     * Retrieves all the values in the database as an array.
     *
     * @returns {any[]} An array of values from the database.
     */
    values() {
        return Array.from(this.#getIndexedIterator("value"));
    }

    /**
     * Retrieves all the key-value pairs in the database as an array of arrays.
     *
     * @returns {[string, any][]} An array of key-value pairs from the database.
     */
    entries() {
        return Array.from(this.#getIndexedIterator("entry"));
    }

    /**
     * Helper function to return an indexed iterator for keys, values, or entries.
     *
     * @param {string} type - The type of data to yield ('key', 'value', or 'entry').
     * @returns {Generator} A generator yielding keys, values, or entries.
     */
    #getIndexedIterator(type) {
        const ids = this.getIds();
        let u_idx = 0;
        const len = ids.length;

        return function* () {
            while (u_idx < len) {
                const id = ids[u_idx];
                const key = id.split(this.#IDENTIFIER)[1];
                const value = world.getDynamicProperty(id);
                switch (type) {
                    case "key":
                        yield key;
                        break;
                    case "value":
                        yield this.has(key)?JSON.parse(value):undefined;
                        break;
                    case "entry":
                        yield [key, JSON.parse(value)];
                        break;
                }
                u_idx++;
            }
        }.bind(this)();
    }

    /**
     * Clears all entries in the database.
     */
    clear() {
        for (const id of this.getIds()) {
            this.delete(id);
        }
    }

    /**
     * Returns the total size (number of entries) in the database.
     *
     * @returns {number} The number of entries in the database.
     */
    get size() {
        return this.getIds().length;
    }

    /**
     * Iterates over each key-value pair in the database and executes a callback function.
     *
     * @param {(value: any, key: string, db: this) => void} callback - The function to execute for each entry.
     */
    forEach(callback) {
        for (const [key, value] of this.entries()) {
            callback(value, key, this);
        }
    }

    /**
     * Creates a new array populated with the results of calling a provided function on every entry.
     *
     * @param {(value: any, key: string, db: this) => any} callback - The function to execute for each entry.
     * @returns {any[]} A new array with each element being the result of the callback function.
     */
    map(callback) {
        const result = [];
        for (const [key, value] of this.entries()) {
            result.push(callback(value, key, this));
        }
        return result;
    }

    /**
     * Creates a new array with all entries that pass the test implemented by the provided function.
     *
     * @param {(value: any, key: string, db: this) => boolean} callback - The function to test each entry.
     * @returns {any[]} A new array with entries that pass the test.
     */
    filter(callback) {
        const result = [];
        for (const [key, value] of this.entries()) {
            if (callback(value, key, this)) {
                result.push(value);
            }
        }
        return result;
    }

    /**
     * Executes a reducer function on each entry of the database, resulting in a single output value.
     *
     * @param {(accumulator: any, value: any, key: string, db: this) => any} callback - The function to execute for each entry.
     * @param {any} [initialValue] - The initial value to start accumulation.
     * @returns {any} The final accumulated value.
     */
    reduce(callback, initialValue) {
        let accumulator = initialValue;
        for (const [key, value] of this.entries()) {
            accumulator = callback(accumulator, value, key, this);
        }
        return accumulator;
    }

    // Static methods that are independent of any instance

    /**
     * Checks if a specific database identifier exists.
     *
     * @param {string} id - The database identifier to check.
     * @returns {boolean} True if the identifier exists, otherwise false.
     */
    static hasIdentifier(id) {
        return world
            .getDynamicPropertyIds()
            .some(identifier => identifier.startsWith(DATABASE_PREFIX) && identifier.split(DATABASE_PREFIX)[1] === id);
    }

    /**
     * Retrieves all unique database identifiers.
     *
     * @returns {string[]} An array of all unique identifiers.
     */
    static getAllIdentifier() {
        const identifiers = world.getDynamicPropertyIds()
            .filter(id => id.startsWith(DATABASE_PREFIX))
            .map(id => id.split(DATABASE_PREFIX)[1]);

        return [...new Set(identifiers)];
    }

    /**
     * Clears all dynamic properties in the world.
     */
    static clearAll() {
        world.clearDynamicProperties();
    }
}

export class TableDatabase extends Map {
    /**
     * Saves a table with a specific key.
     *
     * @param {string} key - The key for the table.
     * @param {any[]} data - The table data to save.
     * @throws {TypeError} If the data is not an array.
     * @returns {void}
     * @example
     * TableDatabase.setTable("users", [
     *     { id: 1, name: "Alice" },
     *     { id: 2, name: "Bob" }
     * ]);
     */
    static setTable(key, data) {
        if (!Array.isArray(data)) {
            throw new TypeError("Data must be an array.");
        }
        world.setDynamicProperty(`${key}::table`, JSON.stringify(data));
    }

    /**
     * Retrieves a table by its key.
     *
     * @param {string} key - The key for the table.
     * @returns {any[]} The table data, or an empty array if not found.
     * @example
     * const users = TableDatabase.getTable("users");
     * console.log(users); // [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]
     */
    static getTable(key) {
        const table = world.getDynamicProperty(`${key}::table`);
        return table ? JSON.parse(table) : [];
    }
    
    static hasTable(key) {
      return !!world.getDynamicProperty(`${key}::table`);
    }

    /**
     * Finds a specific entry in a table based on a property and value.
     *
     * @param {string} key - The key for the table.
     * @param {string} prop - The property name to search for.
     * @param {any} value - The value of the property to match.
     * @returns {any|null} The matching entry, or null if not found.
     * @example
     * const user = TableDatabase.findTable("users", "id", 2);
     * console.log(user); // { id: 2, name: "Bob" }
     */
    static findTable(key, prop, value) {
        return this.getTable(key).find(item => item[prop] === value) || null;
    }

    /**
     * Deletes a table by its key.
     *
     * @param {string} key - The key for the table.
     * @returns {void}
     * @example
     * TableDatabase.deleteTable("users");
     */
    static deleteTable(key) {
        world.setDynamicProperty(`${key}::table`, undefined);
    }

    /**
     * Clears all tables with keys ending in `::table`.
     *
     * @returns {void}
     * @example
     * TableDatabase.clearAllTables();
     */
    static clearAllTables() {
        world.getDynamicPropertyIds()
            .filter(id => id.endsWith("::table"))
            .forEach(id => world.setDynamicProperty(id, undefined));
    }

    /**
     * Updates a specific entry in a table by finding it with a property and value, then merging the new data.
     *
     * @param {string} key - The key for the table.
     * @param {string} prop - The property name to search for.
     * @param {any} value - The value of the property to match.
     * @param {object} newData - The new data to merge with the existing entry.
     * @returns {boolean} True if the update was successful, false otherwise.
     * @example
     * TableDatabase.updateTable("users", "id", 2, { name: "Charlie" });
     * const user = TableDatabase.findTable("users", "id", 2);
     * console.log(user); // { id: 2, name: "Charlie" }
     */
    static updateTable(key, prop, value, newData) {
        const table = this.getTable(key);
        const entry = table.find(item => item[prop] === value);
        if (!entry) return false;

        Object.assign(entry, newData);
        this.setTable(key, table);
        return true;
    }
    
    static updateValuesTable(key, prop, newValue,noChange=false) {
    const table = this.getTable(key);
    const updatedTable = table.map(item => {
        if (prop in item) {
            return { ...item, [prop]: !noChange?newValue:item[orop]+newValue };
        }
        return item;
    });
    
    this.setTable(key, updatedTable);
}

static pushIndexTable(key) {
        const table = this.getTable(key);

        if (table.length === 0) return table;

        const lastItem = table.pop();
        table.unshift(lastItem);

        this.setTable(key, table);

        return table;
    }



    /**
     * Adds a new entry to a table.
     *
     * @param {string} key - The key for the table.
     * @param {object} entry - The new entry to add.
     * @returns {void}
     * @example
     * TableDatabase.addToTable("users", { id: 3, name: "Eve" });
     * const users = TableDatabase.getTable("users");
     * console.log(users); // [{ id: 3, name: "Eve" },{ id: 2, name: "Bob" },{ id: 1, name: "Alice" }]
     */
    static addToTable(key, entry) {
        const table = this.getTable(key);
        table.unshift(entry);
        this.setTable(key, table);
    }
}