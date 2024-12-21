/**
 * @format
 # TOOLS LIBRARY
 */
import * as ui from "@minecraft/server-ui";
export * from "./database";
export * from "./forms";
import {CrateUI,CrateGUI} from "./crates.js";

export function forceOpen(playerSender, formInterface) {
	while (true) {
		const form = formInterface.show(playerSender);
		if (form.cancelationReason !== "UserBusy") return form;
	}
}

export function isAlphanumeric(value) {
	return /[a-zA-Z0-9]/g.test(text);
}

export class CrateFormData extends CrateUI {
	constructor(size = "54") {
		super(size);
	}
}
