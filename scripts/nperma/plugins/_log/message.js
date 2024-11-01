let handler = ev => ev;

handler.after = (ev, { config, usePlugin: plugin, prefix, command }) => {
<<<<<<< HEAD
    if (!config.log.message) return;
=======
  if(!config.log.message) return;
>>>>>>> ebcc790 (Upload folder)
    console.log(`\nSENDER: ${ev.sender.name}\nUSE-PL: ${
        plugin ? true : false
    }\n${
        plugin
            ? `plugin: ${plugin}\ncommand: ${command}\nprefix: ${
                  prefix ?? "none"
              }\n`
            : ""
    }message: ${ev.message}
  `);
};

export default handler;
