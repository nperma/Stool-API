/** @format */

import * as CONF from "./CONFIG";

const CONFIG_HOME = CONF.default;

let handler = (
	event,
	{ sender, args, command, operatorDB, Database, tools }
) => {
	if (!("player_db" in operatorDB))
		operatorDB["player_db"] = new Database("player_db");

	const playerDB = operatorDB["player_db"];
	const playerDATA = playerDB.get(sender.id);
	const homeDATA = playerDATA?.homes || [];
	const homeDB = new Map(
		homeDATA.map((home) => [home.name.toLowerCase(), { ...home }])
	);
	const homeName = args[0]?.toLowerCase();

	const maxHomes =
		Object.entries(CONFIG_HOME.MAX_HOME).find(([tag]) =>
			sender.hasTag(tag)
		)?.[1] ||
		CONFIG_HOME.MAX_HOME.default ||
		2;
	const isUnlimited = maxHomes === "unli";

	if (CONFIG_HOME.BANNED_GAMERTAG.includes(sender.name))
		return sender.say("§cYour gamertag is not allowed to use homes.");

	if (command === "sethome") {
		if (!homeName) return sender.say("§7Please type a home name.");
		if (homeName.length < CONFIG_HOME.MIN_LENGTH_HOME)
			return sender.say(
				`§cHome name must be at least ${CONFIG_HOME.MIN_LENGTH_HOME} characters.`
			);
		if (homeName.length > CONFIG_HOME.MAX_LENGTH_HOME)
			return sender.say(
				`§cHome name cannot exceed ${CONFIG_HOME.MAX_LENGTH_HOME} characters.`
			);
		if (!tools.isAlphanumeric(homeName))
			return sender.say("§cHome name does not support symbols!");
		if (CONFIG_HOME.BANNED_WORDS_HOME.includes(homeName))
			return sender.say(`§cThe name '${homeName}' is not allowed.`);
		if (homeDB.has(homeName))
			return sender.say(
				`§7You already have a home named §a'${homeName}'.`
			);
		if (!isUnlimited && homeDATA.length >= maxHomes)
			return sender.say(
				`§cYou have reached the maximum limit of ${maxHomes} homes.`
			);

		homeDATA.unshift({
			name: homeName,
			createDate: Date.now(),
			location: sender.getLocation("floor"),
			rotation: sender.getRotation(),
			dimension: sender.dimension.id
		});
		playerDB.set(sender.id, { ...playerDATA, homes: homeDATA });
		return sender.say(`§aHome §l'${homeName}'§r §asuccessfully set.`);
	}

	if (command === "delhome") {
		if (!homeName)
			return sender.say("§7Please specify a home name to delete.");
		if (!homeDB.has(homeName))
			return sender.say(`§cHome §l'${homeName}'§r §cnot found.`);

		playerDB.set(sender.id, {
			...playerDATA,
			homes: homeDATA.filter(
				(home) => home.name.toLowerCase() !== homeName
			)
		});
		return sender.say(`§aHome §l'${homeName}'§r §asuccessfully deleted.`);
	}

	if (command === "home") {
		if (!homeName) {
			const homeList = homeDATA.length>0?homeDATA
				.sort((a, b) => a.createDate - b.createDate)
				.map(
					({ name, location: loc, dimension }) =>
						`§a- ${name} ${loc.x} ${loc.y} ${loc.z} | ${dimension}`
				)
				.join("\n"):[];
			return sender.say(
				`§7Your homes:\n${homeList || "§cNo homes set yet."}`
			);
		}

		if (!homeDB.has(homeName))
			return sender.say(`§cHome §l'${homeName}'§r §cnot found.`);

		sender.teleport(homeDB.get(homeName).location, {
			dimension: mc.world.getDimension(homeDB.get(homeName).dimension),
			keepVelocity: false,
			rotation: homeDB.get(homeName).rotation
		});
		return sender.say(`§aTeleported to home §l'${homeName}'§r.`);
	}
};

handler.static = (mc, { config }) => {
	config = {
		...config,
		home: {
			...CONFIG_HOME
		}
	};
};

handler.commands = ["home", "sethome", "delhome"];
handler.helps = [
	"home <optional:homeName>",
	"sethome <homeName>",
	"delhome <homeName>"
];
handler.category = "general";

export default handler;
