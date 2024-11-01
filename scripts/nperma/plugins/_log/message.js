let handler = ev => ev;

handler.after = (ev, { config, usePlugin: plugin, prefix, command }) => {
  if(!config.log.message) return;
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
