let frik = () => {};

frik.static = (mc, { tools, database, config }) => {
    mc.Player.prototype.say = function (msg) {
        this.sendMessage(`§7» §r${String(msg)}`);
    };

    mc.Player.prototype.tell = function (msg, options = {}) {
        const recipients = options?.sendTo || [this.name];
        const players = mc.world.getAllPlayers().filter(p => recipients.includes(p.name));
        players.forEach(player => player.sendMessage(msg));
    };

    mc.Player.prototype.getBalance = function () {
        if (!database["balance_db"].has(this.name)) {
            database["balance_db"].set(this.name, config.default_balance);
        }
        return database["balance_db"].get(this.name);
    };

    mc.Player.prototype.setBalance = function (amount) {
        if (typeof amount !== "number") {
            throw new TypeError("Balance must be a number.");
        }
        database["balance_db"].set(this.name, amount);
    };

    mc.Player.prototype.addBalance = function (amount) {
        const newBalance = this.getBalance() + amount;
        this.setBalance(newBalance);
    };

    mc.Player.prototype.Pay = function (amount, recipientName) {
        if (!recipientName) {
            return this.say("§cYou must specify the recipient name.");
        }

        const recipient = mc.world.getAllPlayers().find(p => p.name === recipientName);

        if (!recipient || !database["balance_db"].has(recipient.name)) {
            return this.say("§cRecipient not found or not registered in the database.");
        }

        const myBalance = this.getBalance();

        if (amount > myBalance) {
            return this.say("§cInsufficient balance for payment.");
        }

        const recipientBalance = database["balance_db"].get(recipientName);
        database["balance_db"].set(recipientName, recipientBalance + amount);
        this.setBalance(myBalance - amount);

        this.say(`§aYou paid §g@${recipientName} §6${amount}$`);
        recipient.sendMessage(`§7» §aYou received §6${amount}$ from §g@${this.name}`);
    };

    mc.Player.prototype.isMoving = function () {
        return tools.isMoving(this);
    };

    mc.Player.prototype.open = async function (form) {
        return tools.forceOpen(this, form);
    };

    mc.Player.prototype.getScore = function (objectiveName) {
        const objective = mc.world.scoreboard.getObjective(objectiveName);
        if (!objective) {
            return 0;
        }
        return tools.getScore(this, objectiveName);
    };

    mc.Player.prototype.addScore = function (objectiveName, value) {
        const objective = mc.world.scoreboard.getObjective(objectiveName);
        if (!objective) {
            throw new Error("Objective not found.");
        }
        return tools.addScore(this, objectiveName, value);
    };

    mc.Player.prototype.setScore = function (objectiveName, value) {
        const objective = mc.world.scoreboard.getObjective(objectiveName);
        if (!objective) {
            throw new Error("Objective not found.");
        }
        return tools.setScore(this, objectiveName, value);
    };
};

export default frik;
