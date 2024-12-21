/** @format */

let serverHandler = (ev) => ev;

serverHandler.static = (mc, {
  ui,
  plugins,
  server,
  Server,
  operatorDB,
  Database,
  config,
  tools,
  DEVS,
  OWNERS,
  attr
}) => {
  
  Server.prototype.getDatabase = function (key) {
    return key in operatorDB ? operatorDB[key] : null;
  };

  Server.prototype.isOnline = function (playerName) {
    if (typeof playerName !== "string") {
      throw new TypeError('arguments[0] must be of type string');
    }

    return this.getOnlinePlayers().some(
      (p) => p.name === playerName
    );
  };
  
  Server.prototype.getOnlinePlayerNames=function(){
    return this.getOnlinePlayers().map(p=> p.name)
  }

  Server.prototype.broadcast = function ({ message, title = config.logger_prefix }) {
    if (!message) throw new Error('Please input a message in the "message" property');

    mc.world.sendMessage(`${title}${message}`);
    return this;
  };

  Server.prototype.teleportAll = function (location, dimensionID = "minecraft:overworld") {
    this.getOnlinePlayers().forEach((player) => {
      player.teleport(location, {
        dimension: mc.world.getDimension(dimensionID)
      });
    });
    return true;
  };

  Server.prototype.findOnlinePlayer = function (PlayerOrPLAYERNAME) {
    if (
      !(PlayerOrPLAYERNAME instanceof mc.Player) &&
      typeof PlayerOrPLAYERNAME !== "string"
    ) {
      throw new TypeError('arguments[0] must be either an instance of Player or a string');
    }

    if (
      typeof PlayerOrPLAYERNAME === "string" &&
      !this.isOnline(PlayerOrPLAYERNAME)
    ) {
      return undefined;
    }

    return PlayerOrPLAYERNAME instanceof mc.Player
      ? PlayerOrPLAYERNAME
      : this.getOnlinePlayers().find(
          (p) => p.name === PlayerOrPLAYERNAME
        );
  };

  Server.prototype.getConfig = function () {
    return config;
  };

  Server.prototype.getTools = function () {
    return tools;
  };

  Server.prototype.kick = function (reason = "", PlayerOrPLAYERNAME = null) {
    const player =
      PlayerOrPLAYERNAME instanceof mc.Player
        ? PlayerOrPLAYERNAME
        : typeof PlayerOrPLAYERNAME === "string" &&
          this.isOnline(PlayerOrPLAYERNAME)
        ? this.findOnlinePlayer(PlayerOrPLAYERNAME)
        : this.sender;

    if (!player) {
      throw new Error('Player is not found');
    }

    return this.dimension.runCommand(`kick "${player.name}" ${reason}`);
  };

  Server.prototype.findRegister = function (playerNameorId) {
    playerNameorId = playerNameorId?.replaceAll(" ", "_");

    return (
      this.PLAYER_DB.entries().find(
        ([idplayer, register]) =>
          idplayer === playerNameorId || register.name === playerNameorId
      ) ?? undefined
    );
  };

  Server.prototype.reloadAll = function () {
    this.dimension.runCommand('reload all');
    return this;
  };
};

export default serverHandler;
