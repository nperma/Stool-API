let clan = function isClan888(
    { sender },
    { database, Database, args, prefix, command, config, tools }
) {
    if (!database["clan_db"]) database["clan_db"] = new Database("clan_db");
    const ClanDB = database["clan_db"],
        [ss1, ss2] = args;

    const player_db = database["player_db"];

    const message_perm_clan = `§7you must have a ${command} first to use this subcommand!!`;

    let structure = {
        help: "§aSee list of subcommands",
        create: `§aCreate a ${command}`,
        join: `§aJoin a ${command}`,
        mail: `§acheck request`
    };

    const playerClan = Array.from(ClanDB.entries()).find(([, clan]) =>
        clan.members.includes(sender.name)
    );

    if (playerClan)
        structure = {
            help: "§aSee list of subcommands",
            invite: `§aInvite players to your ${command}`,
            list: `§aList members of your ${command}`
        };

    if (playerClan && playerClan[1]?.owner === sender.name)
        structure = {
            help: "§aSee list of subcommands",
            disband: `§aDisband ${command}`,
            invite: `§aInvite players to your ${command}`,
            mail: "§aCheck mail", //belom
            manage: `§aManage ${command}`, //belom
            kick: `§akick member from your ${command}`,
            list: `§aList members of your ${command}`
        };

    if (!ss1)
        return sender.say(
            `§cUnknown subcommand. Available commands: ${Object.entries(
                structure
            )
                .map(
                    ([key, value]) =>
                        `§7• §e${prefix}${command} §g${key} §7<${value?.toLowerCase()}>`
                )
                .join("\n")}`
        );

    switch (ss1) {
        case "help":
            sender.say(
                `§7Available commands:\n${Object.entries(structure)
                    .map(
                        ([key, value]) =>
                            `§7• §e${prefix}${command} §g${key} §7<${value?.toLowerCase()}>`
                    )
                    .join("\n")}`
            );
            break;

        case "create":
            {
                if (playerClan)
                    return sender.say(`§cYou are already in a ${command}!`);
                if (!ss2)
                    return sender.say(`§cPlease provide a ${command} name.`);

                if (tools.useSymbol(ss2))
                    return sender.say(`§c${command} name can't use symbol!!`);

                if (ss2.length < 3)
                    return sender.say(`§c${command} name minimum is 3 words!!`);
                if (ss2.length > 10)
                    return sender.say(`§c${command} name max is 10 words!!`);

                if (ClanDB.has(ss2))
                    return sender.say(
                        `§c${command} with name §4${ss2} §calready used!!`
                    );
                ClanDB.set(ss2, {
                    owner: sender.name,
                    members: [sender.name],
                    clanName: ss2,
                    invitesMail: [],
                    logActivity: [],
                    creationDate: Date.now()
                });
                return sender.say(`§aClan '§2${ss2}§a' created successfully.`);
            }
            break;

        case "disband":
            {
                if (!playerClan) return sender.say(message_perm_clan);
                if (playerClan[1].owner !== sender.name)
                    return sender.say(
                        `§4You are not the owner of any ${command}!`
                    );
                ClanDB.delete(playerClan[0]);
                return sender.say(
                    `§aClan '§2${playerClan[0]}§a' has been disbanded.`
                );
            }
            break;

        case "invite":
            {
                if (!playerClan) return sender.say(message_perm_clan);
                if (playerClan[1].owner !== sender.name)
                    return sender.say(
                        `§4Only the ${command} owner can invite players.`
                    );
                if (!ss2)
                    return sender.say(`§cPlease specify the player to invite.`);
                if (
                    Array.from(ClanDB.values()).some(clan =>
                        clan.members.includes(ss2)
                    )
                )
                    return sender.say(`§4${ss2} is already in a ${command}!`);

                if (!player_db.has(ss2))
                    return sender.say(
                        `§7not defined player with name §g${ss2}§7 in this server/world`
                    );

                player_db.set(ss2, {
                    ...player_db.get(ss2),
                    clanInvites: [
                        playerClan[0],
                        ...player_db.get(ss2).clanInvites
                    ]
                });
                return sender.say(
                    `§ainvite §g@${ss2}§a to this ${command} wait to accept.`
                );
            }
            break;

        case "join":
            {
                if (playerClan)
                    return sender.say(`§cYou are already in a ${command}!`);

                if (!ss2) return sender.say(`§7pls type ${command} name.`);

                if (!ClanDB.has(ss2))
                    return sender.say(
                        `§c${command} with name §4'${ss2}'§c not defined!!`
                    );

                ClanDB.set(ss2, {
                    ...ClanDB.get(ss2),
                    invitesMail: ClanDB.get(ss2).invitesMail.push(sender.name)
                });

                if (player_db.get(sender.name).clanInvites.includes(ss2)) {
                    ClanDB.set(ss2, {
                        ...ClanDB.get(ss2),
                        members: [...ClanDB.get(ss2).members, sender.name]
                    });
                    
                    sender.say(`§ajoined ${command} with name §2${ss2}`)
                }
            }
            break;

        case "kick":
            {
                if (!playerClan || playerClan[1].owner !== sender.name)
                    return sender.say(
                        `§4Only the ${command} owner can kick players.`
                    );
                if (!ss2)
                    return sender.say(`§cPlease specify the player to kick.`);
                if (!playerClan[1].members.includes(ss2))
                    return sender.say(`§4${ss2} is not in your ${command}.`);
                playerClan[1].members = playerClan[1].members.filter(
                    member => member !== ss2
                );
                ClanDB.set(playerClan[0], playerClan[1]);
                return sender.say(
                    `§a${ss2} has been kicked from your ${command}.`
                );
            }
            break;

        case "list":
            {
                if (!playerClan)
                    return sender.say(`§4You are not in a ${command}.`);
                return sender.say(
                    `§aMembers of your ${command} '§2${
                        playerClan[0]
                    }§a':\n${playerClan[1].members
                        .map(k => `§7• §g${k}`)
                        .join("\n")}`
                );
            }
            break;

        default:
            return sender.say(
                `§cUnknown subcommand. Available commands: ${Object.entries(
                    structure
                ).map(
                    ([key, value]) =>
                        `§7• §e${prefix}${command} §g${key} §7<${value?.toLowerCase()}>`
                )}`
            );
    }
};

clan.commands = ["guild", "clan", "faction", "team"];
clan.helps = ["guild help", "guild <subCommand>"];
clan.category = "general";

export default clan;

//kurang join,mail,checkmail
