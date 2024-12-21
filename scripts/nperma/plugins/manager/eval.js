/** @format */

let handler = async (
	ev,
	{
		isDev,
		minecraftMC,
		interfaceUI,
		mc,
		ui,
		config,
		operatorDB,
		tools,
		server,
		Server,
		Database,
		Table,
		attr,
		plugins,
		text,
		context,
		args,
		event,
		attribute,
		sender,
		message,
		prefix,
		command,
		isAdmin,
		isOwner
	}
) => {
	if (!isDev) {
		ev.sender.sendMessage(
			`§cYou don't have permission to use this command.`
		);
		return;
	}

	const CONTEXT = {
		...context,
		sender: new Proxy(sender, {
			get(target, prop) {
				if (
					["log", "warn", "error", "debug", "info", "dir"].includes(
						prop
					)
				) {
					return console[prop].bind(console);
				}

				if (prop in target) {
					const value = target[prop];
					return typeof value === "function"
						? value.bind(target)
						: value;
				}

				return function (...args) {
					target.sendMessage(`[${prop}] ${args.join(" ")}`);
				};
			}
		})
	};

	let evalFunction = `(function() { return ${text}; }).call(CONTEXT)`;
	if (command === "=>") {
		evalFunction = `(async function() { return ${text}; }).call(CONTEXT)`;
	}

	try {
		const result = await eval(evalFunction);

		if (result !== undefined) {
			const output =
				typeof result === "object"
					? JSON.stringify(result, null, 2)
					: String(result);
			sender.sendMessage(output);
		}
	} catch (error) {
		if (error.message === "Native variant type conversion failed.") return;
		sender.sendMessage(`§cError: ${error.message}`);
	}
};

handler.commands = [">", "=>"];
handler.no_prefix = true;

export default handler;
