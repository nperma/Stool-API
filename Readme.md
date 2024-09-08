<h1 align="center">STOOL-API</h1>
<p align="center">An API for Minecraft Bedrock Edition ScriptAPI development.</p>

**STOOL-API** is an advanced API designed for Minecraft Bedrock Edition ScriptAPI development. This API focuses on creating powerful server tools and enhancing player interactions, providing a customizable and developer-friendly environment.

> **Note:** The API is still under development, and some features may undergo significant changes in future releases.

---

## Table of Contents

- [Features](#features)
- [Configuration](#configuration)
- [Plugin System](#plugin-system)
- [Command Handlers](#command-handlers)
  - [Command Handler Structure](#command-handler-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
  - [Custom Prefix](#custom-prefix-example)
  - [Admin Command](#admin-command-example)
- [Contributing](#contributing)
- [License](#license)
- [Creator](#creator)

---

## Features

- Easy-to-configure setup using JavaScript files.
- Flexible command system with custom prefixes and role-based access.
- Built-in support for teleportation, warps, and home systems.
- Detailed logging and broadcast features.
- Player management: handle roles, balances, and player-specific data.
- Plugin-based architecture for ease of development.

---

## Configuration

All configurations are managed through the `config.js` file. This allows you to control various aspects of the server tools, such as command prefixes, admin tags, logging options, and more.

- **Path configuration**: [config.js](https://github.com/nperma/Stool-API/blob/main/scripts/config.js)

---

## Plugin System

STOOL-API supports a plugin system that allows developers to easily add or remove functionality without modifying the core system. Plugins are registered in the `register.js` file, making it easy to organize and extend the API.

- **Path PLUGIN REGISTER**: [register.js](https://github.com/nperma/Stool-API/blob/main/scripts/nperma/register.js)

---

## Command Handlers

The command handler system is at the heart of STOOL-API. Handlers allow developers to define commands, provide help messages, and assign categories for easy grouping.

### Command Handler Structure

Each command handler is a function that processes events and executes the desired logic based on the input provided by the player. Handlers come with configurable options such as the command names, help messages, category, admin privileges, and custom prefixes.

**Structure Example:**

```javascript
/**
 * HANDLER STRUCTURE
 * @type {Command<function>}
 */
let handler = function(event, context) {
  // Your command logic here
};

handler.commands = ["command_name"];
handler.helps = ["command_name <required_arg>"];
handler.category = "category_name";
handler.admin = false; // set to true if only admins can use
handler.custom_prefix = ["!", "/"]; // optional custom prefixes
```

- **handler.commands**: An array of strings representing command names.
- **handler.helps**: An array of strings that describe how to use the command.
- **handler.category**: Defines which category the command belongs to.
- **handler.admin**: Boolean that determines if the command is restricted to admins.
- **handler.custom_prefix**: An array of custom prefixes the command can use.

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/nperma/STOOL-API.git
```

2. Install dependencies:

```bash
npm install
```

3. Configure the `config.js` file as per your requirements.

4. Register your plugins in the `register.js` file.

---

## Usage

Once installed, STOOL-API will automatically load all registered plugins. You can define commands, events, and other functionalities in the corresponding handler files.

To create a new plugin:

1. Define a new command handler.
2. Add the handler to the `register.js` file.
3. Reload(`/reload`) the server to apply the changes.

---

## Examples
- some examples Plugins: [plugins](https://github.com/nperma/Stool-API/tree/main/scripts/nperma/plugins)

### Custom Prefix Example

You can define custom prefixes for commands, allowing them to be executed with multiple prefixes.

```javascript
let handler = function(ev, { text, mc }) {
  if (text) {
    mc.world.sendMessage(text);
  } else {
    ev.sender.sendMessage("-_-");
  }
};

handler.commands = ["say"];
handler.helps = ["say <text>"];
handler.custom_prefix = ["p.", "np!"];
handler.category = "twst";

export default handler;
```

### Admin Command Example

Restrict commands to certain roles or tags by setting `handler.admin = true`. This ensures that only players with the `admin_tag` can use the command.

```javascript
let handler = function(ev, { sender, tools, text }) {
  tools.broadcast(`§d@${sender.name}§g: §e${text}`, `§5§l[§dMSB§5]§r §7»§r`);
};

handler.commands = ["msb", "modsbroadcast"];
handler.helps = ["msb <text>"];
handler.admin = true;
handler.category = "admin";

export default handler;
```

---

## Contributing

We welcome contributions to STOOL-API! If you'd like to add features or fix issues, feel free to create a pull request or open an issue on our [GitHub repository](https://github.com/nperma/STOOL-API).

### Guidelines for Contribution

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/my-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Create a new pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Creator

- [Nperma](https://github.com/nperma)

---

This version of the `README.md` provides additional detail on how the `commandHandler` structure works, ensuring a clear understanding of how to implement custom commands in STOOL-API.
