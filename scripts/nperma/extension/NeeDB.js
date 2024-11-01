//not work

import * as mc from "@minecraft/server";
class NeeDB {
    /** @type {String} */
    id;
    constructor(id) {
        this.#id = id;
        this.#key = `\u1841\u1841`;
        this.__string_limit = 32e3;
        this.#keyPrefix = `${this.#key}${this.#id}${this.#key}`;
    }

    set(key, value) {
        let val =
            value instanceof String || typeof value === "string"
                ? value
                : JSON.stringify(value);

        if (val > this.__string_limit) throw Error(`Value is Overlimit`);
        mc.world.setDynamicProperty(`${this.#keyPrefix}${key}`, val);
        return this;
    }

    get(key) {
        let dddd = this.#find(key);
        return dddd ? JSON.parse(dddd) : undefined;
    }

    has(key) {
        return Boolean(this.get(key));
    }

    delete(key) {
        if (this.has(key)) this.setDynamicProperty(this.#find(key), null);
        return this;
    }

    clear() {
        mc.world.clearDynamicProperty();
    }

    #table() {
        return mc.world
            .getDynamicPropertyIds()
            .filter(k => k.startsWith(this.#keyPrefix))
            .map(k => k.split(this.#keyPrefix)[1]);
    }

    #find(key) {
        return this.#table.find(k => k.startsWith(key));
    }
}
