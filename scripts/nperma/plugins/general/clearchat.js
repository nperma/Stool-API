/** @prettier */
let handler = (ev, { sender, mc }) => {
	let job;
	let i = 0;

	function* clearChatJob() {
		while (i < 100) {
			sender.sendMessage("");
			i++;
			yield;
		}

		mc.system.clearJob(job);
		job = null;
		sender.say("§aSuccess clearchat");
	}

	if (!job) job = mc.system.runJob(clearChatJob());
};

handler.commands = ["clearchat"];
handler.helps = ["clearchat"];

export default handler;
