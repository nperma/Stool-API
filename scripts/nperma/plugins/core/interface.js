/** @prettier */

let nakata = (event) => event;

nakata.static = (mcModule, { ui: interfaceModule, tools }) => {
	const { ActionFormData, ModalFormData, MessageFormData } = interfaceModule;

	ActionFormData.prototype.open = async function (player) {
		return await tools.forceOpen(player, this);
	};
	ModalFormData.prototype.open = async function (player) {
		return await tools.forceOpen(player, this);
	};
	MessageFormData.prototype.open = async function (player) {
		return await tools.forceOpen(player, this);
	};
};

export default nakata;
