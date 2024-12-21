/** @prettier */

let handler = (ev) => ev;

handler.static = (mc, { operatorDB, server, Database, config }) => {
    if (!("player_db" in operatorDB))
        operatorDB["player_db"] = new Database("player_db");
    const PLAYER_DB = server?.PLAYER_DB || operatorDB["player_db"];

    mc.world.afterEvents.worldInitialize.subscribe(() => {
        for (const sender of server.getOnlinePlayers()) {
            const isRegister = PLAYER_DB.has(sender.id);
            const DATA = PLAYER_DB.get(sender.id) || {};
            if (
                isRegister &&
                !DATA._changeCurrency &&
                DATA.currency !== config.economy.currency.defaultAmount
            ) {
                sender.rawMessage({
                    message: `§eupdate ${server.currency_name} default §7${DATA.currency} §r-> §a${config.economy.currency.defaultAmount}`
                });
            }
        }
    });
    mc.world.afterEvents.playerSpawn.subscribe(
        ({ initialSpawn: join, player: sender }) => {
            if (join) {
                const Platform = sender.clientSystemInfo.platformType;
                const Memory = sender.clientSystemInfo.memoryTier;
                const isRegister = PLAYER_DB.has(sender.id);
                const DATA = PLAYER_DB.get(sender.id) || {};

                if (
                    isRegister &&
                    !DATA._changeCurrency &&
                    DATA.currency !== config.economy.currency.defaultAmount
                ) {
                    sender.rawMessage({
                        message: `§eupdate ${server.currency_name} default §7${DATA.currency} §r-> §a${config.economy.currency.defaultAmount}`
                    });

                    DATA.currency = config.economy.currency.defaultAmount;
                    PLAYER_DB.set(sender.id, DATA);
                }

                if (isRegister && DATA.platform !== Platform) {
                    sender.rawMessage({
                        send: server.getOnlinePlayerNames(),
                        message: `§g@${DATA.name} §eupdate platform §7${DATA.platform} §r-> §b${Platform}`
                    });

                    DATA.platform = Platform;
                    PLAYER_DB.set(sender.id, DATA);
                }

                if (isRegister && DATA.memory !== Memory) {
                    DATA.memory = Memory;
                    PLAYER_DB.set(sender.id, DATA);
                }

                if (!isRegister) {
                    PLAYER_DB.set(sender.id, {
                        name: sender.name?.replace(new RegExp(" ", "g"), "_"),
                        date: Date.now(),
                        currency: config.economy.currency.defaultAmount,
                        _changeCurrency: false,
                        platform: Platform,
                        memory: Memory,
                        admin: false,
                        kills: [],
                        deaths: [],
                        homes: [],
                        afk: { timestamp: -1, status: false },
                        warns: [],
                        mutes: [],
                        bans: [],
                        suspend: { reason: null }
                    });
                    server.table.setTable("register", [
                        {
                            name: sender.name,
                            id: sender.id,
                            timestamp: Date.now()
                        },
                        ...server.table.getTable("register")
                    ]);
                    sender.rawMessage({
                        message: `§aRegister you into database`
                    });
                }
            }
        }
    );
    
    
};

handler.after = (
    event,
    { message: msg, sender, config, usePlugin, operatorDB, mc }
) => {
    if (usePlugin) return;

    let message = msg;

    if (/§[0-9a-zA-Z]/g.test(message) || /\\n/g.test(message)) {
        sender.say(`§cChat not support '\\n'newline and \'\§symbolHex\'`);
        message = message?.replace(/§[0-9a-zA-Z]/g, "")?.replace(/\\n/g, "");
    }

    const ranks =
        sender
            .getTags()
            .filter((tag) => tag.startsWith(config.custom_chat.tag_rank))
            .map((rank) => rank.split(config.custom_chat.tag_rank)[1]) || [];
    const currentRank = ranks.length
        ? ranks[ranks.length - 1]
        : config.custom_chat.default_rank;

    const maxLengthMessage = config.custom_chat.max_message || 100;

    const truncatedMessage =
        msg?.length > maxLengthMessage
            ? `${message.slice(0, maxLengthMessage)}... (${
                  msg?.length - maxLengthMessage
              } more)`
            : message;

    const PLAYER_DB = operatorDB["player_db"];
    const playerData = PLAYER_DB?.get(sender.id) || {};
    const accountAge = playerData.date
        ? (() => {
              const now = Date.now();
              const ageInMillis = now - playerData.date;
              const ageInMinutes = Math.floor(ageInMillis / (1000 * 60));
              const ageInHours = Math.floor(ageInMillis / (1000 * 60 * 60));
              const ageInDays = Math.floor(ageInMillis / (1000 * 60 * 60 * 24));

              if (ageInDays > 0) return `${ageInDays} days`;
              if (ageInHours > 0) return `${ageInHours} hours`;
              if (ageInMinutes > 0) return `${ageInMinutes} minutes`;
              return "less than minute";
          })()
        : "unknown";

    const formattedMessage = config.custom_chat.format
        ?.replace(/<age>/g, `${accountAge}`)
        ?.replace(/<prefix>/g, config.custom_chat.prefix_rank)
        ?.replace(/<suffix>/g, config.custom_chat.suffix_rank)
        ?.replace(/<rank>/g, currentRank)
        ?.replace(/<name>/g, sender.name)
        ?.replace(/<msg>/g, truncatedMessage)
        ?.replace(
            /<date>/g,
            new Date(Date.now()).toLocaleDateString().replace(/\//g, "-")
        )
        ?.replace(
            /<time>/g,
            new Date(Date.now()).toLocaleTimeString().replace(/:/g, ":")
        );

    mc.world.sendMessage(String(formattedMessage));
};

export default handler;
