let handler = ev => ev;

handler.after = (
    ev,
    { usePlugin, sender, message, config, isAdmin, isOwner, mc, isDev }
) => {
    if (usePlugin) return;

    const ranks = [
        config.default_rank,
        ...sender
            .getTags()
            .filter(k => k.startsWith(config.default_prefix_rank))
            .map(r => r?.slice(config.default_prefix_rank.length))
    ];
    const rank = ranks[ranks.length - 1];

    const badwords = config.badwords || [];
    const maxLength = config.maxLengthString || 100;

    let filteredMessage = message;
    badwords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        filteredMessage = filteredMessage.replace(regex, '*'.repeat(word.length));
    });

    if (filteredMessage.length > maxLength) {
        const remainingLength = filteredMessage.length - maxLength;
        filteredMessage = `${filteredMessage.slice(0, maxLength)} (${remainingLength} more)`;
    }

    mc.world.sendMessage(
        config.default_format_chat
            ?.replaceAll("@RANK", rank)
            ?.replaceAll("@PREFIX", config.prefix_rank)
            ?.replaceAll("@SUFFIX", config.suffix_rank)
            ?.replaceAll(
                "@RANKS",
                ranks
                    .sort((a, b) => b - a)
                    .map(r => `${config.prefix_rank}${r}${config.suffix_rank}§r`)
                    .join(" ")
            )
            ?.replaceAll(
                "@NAME",
                `${isDev
                    ? "§d"
                    : isOwner
                    ? "§6"
                    : isAdmin
                    ? "§c"
                    : ""}${sender.name}§r`
            )
            ?.replaceAll(
                "@MSG",
                filteredMessage.replace(/§[0-9a-zA-Z]/g, "").replace(/\n/g, "")
            )
    );
};

export default handler;
