function LoadSender([sender, ext]) {
    const { config, mc, ui,database,Balance,tools } = ext;

    // if (!database["balance_db"])
    //         database["balance_db"] = new Database("balance_db");

    sender.say = function (msg) {
        return this.sendMessage("§7» §r" + String(msg));
    };

    sender.tell = function (msg, { sendTo = [this.id] } = {}) {
        mc.world
            .getAllPlayers()
            .filter(p => sendTo.includes(p.id))
            .forEach(ply => ply.sendMessage(msg));
    };

    sender.getBalance = function () {
        if (database["balance_db"].has(this.name))
            return database["balance_db"].get(this.name);
        else {
            database["balance_db"].set(this.name, config.default_balance);
            return database["balance_db"].get(this.name);
        }
    };

    sender.setBalance = function (value) {
        if (typeof value !== "number")
            throw new TypeError("value type must be a number!!");
        return database["balance_db"].set(this.name, value);
    };

    sender.addBalance = function (value) {
        return this.setBalance(this.getBalance() + value);
    };

    sender.Pay = function (value, toTargetGamerTag) {
        if (!toTargetGamerTag)
            return this.say(`§cYou must type.. the targetName(arguments[1])`);

        const target = mc.world
            .getAllPlayers()
            .find(p => p.name === toTargetGamerTag);

        if (!database["balance_db"].has(target?.name) && !target)
            return this.say("§cTarget not defined!!");

        const balanceTarget = database["balance_db"].get(toTargetGamerTag),
            myBalance = this.getBalance();

        if (value > myBalance)
            return this.say("§cnot enough balance to pay target.");

        database["balance_db"].set(toTargetGamerTag, balanceTarget + value);
        this.addBalance(-value);

        this.say(`§apay §g@${toTargetGamerTag} §6${value}$`);
        target.sendMessage(
            `§7» §ayou got §6${value}$ balance §afrom §g@${this.name}`
        );
    };

    sender.isMoving = function () {
        return tools.isMoving(this) ? true : false;
    };

<<<<<<< HEAD
<<<<<<< HEAD
    // sender.data = function () {
    //         return database["player_db"].get(this.name) ?? {};
    //     };

    // sender.isRegister = function () {
    //         return database["player_db"].has(this.name);
    //     };
    //
    //     sender.register = function () {
    //         if (!this.isRegister()) {
    //             database["player_db"].set(this.name, {
    //                 name: this.name,
    //                 id: this.id,
    //                 dateRegister: Date.now(),
    //                 balance:
    //                     this.getBalance() ??
    //                     this.setBalance(config.default_balance),
    //                 home: database["home_db"].get(this.name) ?? [],
    //                 death: 0,
    //                 kill: 0,
    //                 mute: { temporaryTime: null, reason: null },
    //                 ban: { temporaryTime: null, reason: null },
    //                 warn: {},
    //                 land: database["land_db"].get(this.name) ?? []
    //             });
    //
    //             return database["player_db"].get(this.name);
    //         } else return database["player_db"].get(this.name);
    //     };

=======
>>>>>>> ebcc790 (Upload folder)
=======
>>>>>>> f365f73 (Menambahkan perubahan dari folder saya)
    sender.open = async function (uiform) {
        return await tools.forceOpen(this, uiform);
    };

    sender.getScore = function (objective) {
        try {
            if (!mc.world.scoreboard.getObjective(objective))
                throw Error("Objective not Found!!");
            return tools.getScore(this, objective);
        } catch {
            return 0;
        }
    };

    sender.addScore = function (objective, value) {
        if (!mc.world.scoreboard.getObjective(objective))
            throw Error("Objective not Found!!");
        return tools.addScore(this, objective, value);
    };

    sender.setScore = function (objective, value) {
        if (!mc.world.scoreboard.getObjective(objective))
            throw Error("Objective not Found!!");
        return tools.setScore(this, objective, value);
    };

    return sender;
}

export default LoadSender;
