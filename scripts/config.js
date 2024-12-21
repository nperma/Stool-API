/**
 * CONFIGURATION
 * @type {object}
 */
const config = {
    /**
     * METADATA
     * @description Metadata that is not affected by the script and does not need to be changed.
     */
    metadata: {
        /**
         * @type {object}
         * @property {string} author - GitHub URL of the author.
         * @property {string} repository - GitHub URL of the repository.
         */
        github: {
            author: "https://github.com/nperma",
            repository: "https://github.com/nperma/Stool-API"
        },

        /**
         * @type {string}
         * @description Script version.
         */
        version: "2.0.0"
    },

    DIR_PLUGIN: "./plugins",

    /**
     * DEFAULT CONFIG
     */
    /**
     * @type {prefix: string[]}
     * @description Custom prefixes to trigger custom commands.
     */
    command_prefix: [".", "!", "+", "?"],

    /**
     * @type {gamerTag: string[]}
     * @description List of owner's gamertags.
     */
    owners: ["NpermaDev"],

    /**
     * @type {string}
     * @description Logger Prefix on message
     */
    logger_prefix: "§l§7[ §fSTOOL - §cAPI §7] §7» §r",

    /**
     * Punishment Configuration
     */
    punishment: {
        /**
         * @type {gamerTag: string[]}
         * @description Whitelist of gamertags that are banned.
         */
        banneds: [],

        /**
         * @type {gamerTag: string[]}
         * @description Gamertags that are immune to all types of punishment (e.g., ban, kick, mute, warn, etc.).
         */
        immune: ["NpermaDev"]
    },

    /**
     * Server Configuration
     */
    server: {
        /**
         * @type {string}
         * @description Server name (default: 'Stool - API').
         */
        name: "STOOL - §cAPI",

        /**
         * @type {string}
         * @description Server IP address (optional).
         */
        ip_address: "",

        /**
         * @type {number}
         * @description Server port (optional).
         */
        port: 19137,

        /**
         * @type {string | number}
         * @description Maximum number of players on the server. Can be set to a number for player limits or 'register' to restrict to registered players only.
         */
        max_player: "register"
    },

    /**
     * @type {tag: string}
     * @description Admin permission tag.
     * Note: The player must have operator permissions.
     */
    admin_permission: "perm.admin",

    /**
     * Economy Configuration
     */
    economy: {
        /**
         * @type {object}
         * @description In-game currency settings.
         * @property {string} name - Name of the currency.
         * @property {string} prefix - Prefix for the currency.
         * @property {string} suffix - Suffix for the currency.
         * @property {number} defaultAmount - Default amount of currency received.
         * @property {number} maxAmount - Maximum amount of currency allowed.
         */
        currency: {
            name: "balance",
            prefix: "$",
            suffix: "",
            defaultAmount: 2000,
            maxAmount: 1000000
        }
    },

    /**
     * Custom Chat Configuration
     */
    custom_chat: {
        /**
         * @type {tag: string}
         * @description Default rank tag prefix.
         */
        tag_rank: "rank:",

        /**
         * @type {string}
         * @description Format for custom chat.
         */
        format: "<prefix> <rank> <suffix> <name> » <msg>",

        /**
         * @type {prefix: string}
         * @description Prefix for the rank.
         */
        prefix_rank: "§7§l[ §r",

        /**
         * @type {suffix: string}
         * @description Suffix for the rank.
         */
        suffix_rank: " §r§7§l]§r",

        /**
         * @type {string}
         * @description Default rank for players.
         */
        default_rank: "§7MEMBER",

        /**
         * @type {number}
         * @description Maximum length of the chat message.
         */
        max_message: 250,

        /**
         * @type {string[]}
         * @description List of prohibited words in the chat.
         */
        banned_words: [
            "paoow",
            "juskidep",
            "misterat24",
            "maplee",
            "naktaadna",
            "belokkorek"
        ]
    }
};

export default config;
