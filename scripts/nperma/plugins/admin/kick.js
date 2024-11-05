// plugin KICK
// under development

let handler = (ev,{sender,args,database}) => {};
handler.static = (mc,{database}) => {};
handler.commands = ["kick"];
handler.helps = ["kick <@playerName> <reason>"];
handler.category = "admin";
handler.admin = true;

export default handler
