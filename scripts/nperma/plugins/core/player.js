/** @prettier */
let handler = (ev) => ev;

handler.static = (mc, { ui, tools, server, config }) => {
	mc.Player.getData = function () {
		return server.PLAYER_DB.get(this.id) || {};
	};

	mc.Player.prototype.runCommands = function (arrayCommands) {
		arrayCommands.forEach((command) => this.runCommand(command));
		return this;
	};

	mc.Player.prototype.rawMessage = function ({
		message,
		prefix = config.logger_prefix,
		send = [],
	}) {
		if (send.length === 0) send.push(this.id);

		let field = `${prefix}${message}`;

		send.length === 1 && [this.name, this.id].includes(send[0])
			? this.sendMessage(String(field))
			: mc.world
					.getAllPlayers()
					.filter((player) =>
						send.find((sender) =>
							[player.id, player.name].includes(sender)
						)
					)
					.forEach((playerSender) =>
						playerSender.sendMessage(String(field))
					);

		return this;
	};

	mc.Player.prototype.say = function (message, prefix = "§7»§r ") {
		return this.rawMessage({ message, prefix, send: [this.name] });
	};

	mc.Player.prototype.getName = function () {
		return this.name;
	};
	mc.Player.prototype.getID = function () {
		return this.id;
	};
	mc.Player.prototype.getLocation = function (makeValue = "default") {
		function valueVector(type) {
			let tttt = {};
			Object.entries(this.location).forEach(
				([key, value]) => (tttt[key] = type(value))
			);
			return tttt;
		}

		valueVector = valueVector.bind(this);

		if (makeValue === "default") return this.location;
		else if (makeValue === "floor") return valueVector(Math.floor);
		else if (makeValue === "ceil") return valueVector(Math.ceil);
		else if (makeValue === "round") return valueVector(Math.round);
	};

	mc.Player.prototype.open = async function (form) {
		return await tools.forceOpen(this, form);
	};

	mc.Player.prototype.closeForms = function () {
		return ui.uiManager.closeAllForms(this);
	};

	mc.Player.prototype.getScore = function (objective) {
		return (
			mc.world.scoreboard?.getObjective(objective)?.getScore(this) ??
			undefined
		);
	};

	mc.Player.prototype.setScore = function (objective, value) {
		if (!this.getScore(objective) && typeof value === "number")
			return false;

		mc.world.scoreboard.getObjective(objective).setScore(this, value);
		return true;
	};

	mc.Player.prototype.addScore = function (objective, value) {
		if (!this.getScore(objective) && typeof value === "number")
			return false;

		this.setScore(objective, this.getScore(objective) + value);
		return true;
	};

	mc.Player.prototype.getCurrency = function () {
		return this.getData().currency || config.economy.currency.defaultAmount;
	};
};

export default handler;
