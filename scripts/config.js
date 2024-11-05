const config = {
    /**
     * Configuration version - DO NOT CHANGE THIS!
     * @type {string}
     */
    version: "1.0.5",

    /**
     * Creator or developer's name
     * @type {string}
     */
    creator: "Nperma",

    /**
     * GitHub repository link for the project
     * @type {string}
     */
    github: "https://github.com/nperma",

    /** @configuration - Core settings for the application */

    /**
     * Command prefixes that trigger bot commands
     * @type {string[]}
     * @example ["+", "-", "?", "!"]
     */
    prefix: ["+", "-", "?", "!"],

    /**
     * Tag required for admin privileges
     * @type {string}
     */
    admin_tag: "perm.admin",

    /**
     * Settings to enable or disable specific logs
     * @type {Object}
     * @property {boolean} message - Log messages
     * @property {boolean} teleport - Log teleport actions
     */
    log: {
        message: true,
        teleport: true
    },

    /**
     * Default title prefix for server messages
     * @type {string}
     */
    default_title: "§l§2[§aSERVERTOOL§l§2]§r §7»§r ",

    /**
     * List of owner gamertags with full permissions
     * @type {string[]}
     */
    owners: ["NpermaDev"],

    /**
     * List of gamertags banned from the server
     * @type {string[]}
     */
    whitelist_banned: [],

    /**
     * List of gamertags exempt from being banned
     * @type {string[]}
     */
    antibans: ["NpermaDev"],
    
    /**
     * List of gamertags exempt from being kick
     * @type {string[]}
     **/
     antikicks: ["NpermaDev"],

    /**
     * Starting balance for new players
     * @type {number}
     */
    default_balance: 2000,

    /** Rank Configuration */

    /**
     * Prefix for ranks to identify player ranks in code
     * @type {string}
     */
    default_prefix_rank: "rank:",

    /**
     * Default rank assigned to new players
     * @type {string}
     */
    default_rank: "MEMBER",

    /**
     * Prefix symbol for displaying rank in chat
     * @type {string}
     */
    prefix_rank: "§7§l[ ",

    /**
     * Suffix symbol for displaying rank in chat
     * @type {string}
     */
    suffix_rank: " §r§7§l]",

    /**
     * Chat format template, where @RANKS is the rank, @NAME is the username, and @MSG is the message
     * @type {string}
     */
    default_format_chat: "@RANKS§r §a@NAME §r§7» §r@MSG",

    /**
     * List of words to be filtered as inappropriate language
     * @type {string[]}
     */
    badwords: ["kontol", "memek", "nigga", "blacki", "whitei"],

    /**
     * Numeric symbols used to shorten large numbers (thousands, millions, etc.)
     * @type {string[]}
     * @example ["", "k", "M", "B", "T"]
     */
    numeric_sysmbol: ["", "k", "M", "B", "T"],

    /** Home Configuration */

    home: {
        /**
         * Countdown in seconds before home teleport executes
         * @type {number}
         */
        countdown: 3,

        /**
         * Limit on the number of homes a player can set, based on rank or permission tag
         * @type {Object.<string, number>}
         * @property {number} default - Default home limit for regular players
         * @example { "default": 2, "perm.admin": 20 }
         */
        homelimit: {
            default: 2,
            "perm.admin": 20,
            vip: 5,
            mvp: 8,
            legend: 12
        }
    },

    /** Default Time Settings */

    default_time: {
        /**
         * Locale setting for date and time formatting
         * @type {string}
         */
        utc: "id-ID",

        /**
         * Time offset in minutes from UTC
         * @type {number}
         */
        offset: 7 * 60,

        /**
         * Timezone for displaying server time
         * @type {string}
         */
        timezone: "asia/Jakarta"
    },

    /** Warp (Teleport) Configuration */

    warp: {
        /**
         * Cooldown in seconds between warp (teleport) uses
         * @type {number}
         */
        cooldown: 3,

        /**
         * Broadcast teleportation messages to all players
         * @type {boolean}
         */
        teleportbroadcast: true
    },

    /** Land Management Configuration */

    land: {
        tools: {
            /**
             * Tool item ID for checking land ownership
             * @type {string}
             */
            checkland: "minecraft:stick",

            /**
             * Tool item ID for setting land positions
             * @type {string}
             */
            setpos: "minecraft:golden_shovel"
        },

        /**
         * Cost per block for claiming land
         * @type {number}
         */
        price_per_block: 100,

        /**
         * Tax percentage applied when selling land
         * @type {number}
         */
        sell_tax: 30
    },

    /** AFK (Away From Keyboard) Settings */

    afk: {
        /**
         * Broadcast AFK messages to all players
         * @type {boolean}
         */
        broadcast: true,

        /**
         * Time in seconds before a player is considered AFK
         * @type {number}
         */
        afkTime: 10
    },

    /** Guild Settings */

    guild: {
        /**
         * Minimum character length for guild names
         * @type {number}
         */
        minLength: 3,

        /**
         * Maximum character length for guild names
         * @type {number}
         */
        maxLength: 25,

        /**
         * List of words or abbreviations prohibited in guild names
         * @type {string[]}
         */
        badSletter: [
            "pdi",
            "kontol",
            "bokep",
            "memek",
            "anjing",
            "nanda",
            "adit",
            "nperma",
            "lol",
            "nigga",
            "alok"
        ]
    },

    /** Custom Messages */

    message: {
        /**
         * Message shown to non-admins who attempt to use restricted commands
         * @type {string}
         */
        isnotadmin: "You do not have permission to use this command!",

        /**
         * Message shown to players attempting to use developer-only commands
         * @type {string}
         */
        isnotdev: "You are not a developer!"
    }
};

export default config;
