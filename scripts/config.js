const config = {
    /**
     * Configuration version - DO NOT CHANGE THIS!
     * @type {string}
     */
    version: "1.0.6",

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
    prefix_rank: "§7§l[§r ",

    /**
     * Suffix symbol for displaying rank in chat
     * @type {string}
     */
    suffix_rank: " §r§7§l]§r",

    /**
     * Max Length String of Message
     * @type {number}
     */
    maxLengthString: 600,

    /**
     * Chat format template, where @RANKS is the rank, @NAME is the username, and @MSG is the message
     * @type {string}
     */
    default_format_chat: "@PREFIX@RANK@SUFFIX§r §a@NAME §r§7» §r@MSG",

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

    /** Scorehud Settings */

    scorehud: {
        /**
         * #NOTE
         * this plugin need resource pack hud for showing scorehud title into sidehud
 # list prefixs scorehud
 - <name> @type {string} - show yoursef gamerTag
 - <rank> @type {string} - show your currentRank
 - <rank_count> @type {number} - show your ranks length
 - <death_count> @type {number} - death counter
 - <kill_count> @type {number} - kill counter
 - <mute_count> @type {number} - mute counter
 - <kick_count> @type {number} - kick counter
 - <warn_count> @type {number} - warn counter
 - <admin_count> @type {number} - admin register counter
 - <admin_online_count> @type {number} - admin online counter
 - <player_count> @type {number} - player register counter
 - <player_online_count> @type {number} - player online counter
 - <balance> @type {string} - show yourself balance 
 - <afk_time> @type {number} - afkTime counter
 - <locale_date> @type {string | Date.localeDateToString()} - show locale date
 - <locale_time> @type {string | Date.localeTimeToString()} - show locale time
       */

        /**
         * Tag to Navigation Scorehud Show
         * @type {string}
         */
        tagToggle: "scorehud.toggle"
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

    /** Random Teleport Settings */

    rtp: {
        /**
         * Teleport the Player if join the Server for first time.
         * @type {boolean}
         */
        teleportWhenFirstJoin: false,

        /**
         * Center Location of Lobby Server, y set to null make location top most block
         * @type {Vector3}
         */
        center: {
            x: 0,
            y: null,
            z: 0
        },

        /**
         * Range of Random Teleport
         * @type {number}
         */
        teleportRange: 1000,

        /**
         * Random Teleport tag for support npc and command
         * @type {string}
         */
        tag: "rtp",
        
        /**
         * Random Teleport will cooldown after this rtp using
         * @default after 5 rtp will trigger cooldown
         * @type {number}
         */
         cooldownAfter: 5,
         
         /**
          * Random Teleport Cooldown
          * @type {number | second}
          */
          cooldown: 60,
          

        /**
         * Dimension Random Teleport, only support dimension OVERWORLD
         * @type {string}
         */
        dimension: "minecraft:overworld",

        /**
         * Teleport Message, option [actionbar,title,message]
         * @type {string[option]}
         */
        messageOption: "message",

        loading_rtp: "loading...",
        title: "§7[ R T P ]", //support if use title option
        subtitle: "§e{x} {y} {z}", //support if use title option
        message: "§7Teleport to §a{x} {y} {z}"
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
