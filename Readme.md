<h1 align="center">STOOL-API</h1>
<p align="center">An API for Minecraft Bedrock Edition ScriptAPI development.</p>

**STOOL-API** is a feature-rich API for Minecraft Bedrock Edition ScriptAPI development, designed to facilitate server tool creation and improve player interaction through customizable and developer-friendly tools.

> **Note:** This API is currently in development, so features may change in future versions.

> **Requirement:** Make sure Education Edition & Beta-API are enabled.

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
  - [Custom Prefix Example](#custom-prefix-example)
  - [Admin Command Example](#admin-command-example)
- [Contributing](#contributing)
- [License](#license)
- [Creator](#creator)

---

## Features

- Easy configuration through JavaScript files.
- Customizable command system with support for prefixes and role-based access.
- Built-in teleportation, warps, and home systems.
- Robust logging and broadcast options.
- Player management capabilities, including role assignments, balances, and custom data storage.
- Plugin-based architecture for modular development.

---

## Configuration

The API is configured via `config.js`, which manages command prefixes, admin tags, logging, and other settings.

- **Config Path**: [config.js](https://github.com/nperma/Stool-API/blob/main/scripts/config.js)

---

## Plugin System

STOOL-API supports a modular plugin system. You can easily add or remove plugins without altering core files. Plugins are registered in `register.js` for easy management.

- **Plugin Registration Path**: [register.js](https://github.com/nperma/Stool-API/blob/main/scripts/nperma/register.js)

---

## Command Handlers

The command handler system lets you define and organize commands efficiently. You can create commands with custom help messages, categories, and admin-only restrictions.

### Command Handler Structure

Each command handler is a function that defines command logic, such as what actions to execute based on player input. Handlers also allow for custom prefixes, role-based restrictions, and usage help messages.

**Handler Structure Example:**

```javascript
/**
 * Command handler structure example.
 * @type {Command<function>}
 */
let handler = function(event, context) {
  // Command logic goes here
};

handler.commands = ["command_name"];
handler.helps = ["command_name <arg>"];
handler.category = "category_name";
handler.admin = false; // Set to true for admin-only commands
handler.custom_prefix = ["!", "/"]; // Optional custom prefixes
```

- **handler.commands**: An array of command names.
- **handler.helps**: Usage examples for the command.
- **handler.category**: The category under which the command falls.
- **handler.admin**: Boolean to restrict the command to admins.
- **handler.custom_prefix**: Array of prefixes specific to the command.

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

3. Update the `config.js` file as needed.

4. Register plugins in `register.js`.

---

## Usage

STOOL-API automatically loads registered plugins. To create new plugins:

1. Define a command handler.
2. Register it in `register.js`.
3. Reload the server (`/reload`) to apply changes.

---

## Examples

Find example plugins here: [plugins](https://github.com/nperma/Stool-API/tree/main/scripts/nperma/plugins)

### Custom Prefix Example

Define custom prefixes to allow commands to be triggered with multiple options.

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

Restrict commands to admin users by setting `handler.admin = true`.

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

We welcome contributions to STOOL-API! Feel free to submit a pull request or open an issue in our [GitHub repository](https://github.com/nperma/STOOL-API).

### Contribution Guidelines

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/my-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to your branch (`git push origin feature/my-feature`).
5. Create a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Creator

- [Nperma](https://github.com/nperma)

--- 

This updated `README.md` provides clearer instructions and example handler code for implementing custom commands in STOOL-API.