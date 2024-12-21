/** @format */

import { EnchantmentTypes, system } from "@minecraft/server";
import { ChestFormData } from "./forms";
import { TableDatabase as Table } from "./database";
import { uiManager } from "@minecraft/server-ui";

class CrateUI {
	constructor(size = "54") {
		this.form = new ChestFormData(size);
		this.title = "";
		this.buttons = [];
	}

	setTitle(titleName) {
		this.title = titleName;
		return this;
	}

	setPrize(arrayPrize) {
		const maxSlots = this.form.slotCount;
		const prizes = arrayPrize.slice(0, maxSlots);

		this.buttons = prizes.map((data) => ({
			name: data.name,
			type: data?.type,
			amount: data?.amount || 1,
			description: data?.description || [],
			enchanted: !!data.enchants
				? data.enchants
						.filter(
							(enchant) =>
								!!enchant?.type &&
								!!EnchantmentTypes.get(enchant?.type)
						)
						.map((enchant) => ({
							type: enchant.type,
							level: Boolean(
								enchant?.level >
									EnchantmentTypes.get(enchant?.type).maxLevel
							)
								? enchant?.level
								: EnchantmentTypes.get(enchant?.type)
										.maxLevel || 1
						}))
				: [] || [],
			commands: data?.commands || [],
			give: data?.give || false,
			say: data?.say || ""
		}));

		return this;
	}

	show(sender) {
		this.form.title(this.title).pattern(
			[
				"xxxxxxxxx",
				"x_______x", //10,11,12,13,14,15,16
				"x_______x", //19,20,21,22,23,24,25
				"x_______x", //28,29,30,31,32,33,34
				"x_______x", //37,38,39,40,41,42,43
				"xxxxoxxxx"
			],
			{
				x: {
					stackAmount: 1,
					itemName: "",
					texture: "minecraft:light_gray_stained_glass_pane"
				},
				o: {
					stackAmount: 1,
					itemName: "§cEXIT",
					texture: "minecraft:barrier"
				}
			}
		);

		const slotPrize = [
			10, 11, 12, 13, 14, 15, 16, 19, 20, 21, 22, 23, 24, 25, 28, 29, 30,
			31, 32, 33, 34, 37, 38, 39, 40, 41, 42, 43
		];

		this.buttons.forEach((button, index) => {
			if (index < slotPrize.length) {
				this.form.button(
					slotPrize[index],
					button.name,
					!button.enchanted
						? button.description
						: [
								...button.description,
								"",
								...button.enchanted.map(
									({ type, level }) =>
										`§7- §d${type} §a${level}§r`
								)
						  ],
					button.type,
					button.amount,
					!!button.enchanted
				);
			}
		});
		return this.form.open(sender);
	}

	open(sender) {
		const id_name = `GACHA:${this.title?.replace(/ /g, "_")}:${sender.id}`;
		if (Table.hasTable(id_name))
			return sender.say("§cYou already opened this crate!");

		const PACK = [];
		Table.setTable(id_name, PACK);

		this.form
			.title(this.title)
			.pattern(
				[
					"xxxxxxxxx",
					"x_______x",
					"x_xx&xx_x",
					"x_xxxxx_x",
					"x_______x",
					"xxxxxxxxx"
				],
				{
					x: {
						stackAmount: 1,
						itemName: "",
						texture: "minecraft:light_gray_stained_glass_pane"
					},
					"&": {
						stackAmount: 1,
						itemName: "↑",
						texture: "minecraft:compass"
					}
				}
			);

		const rollingSlot = [
			10, 11, 12, 13, 14, 15, 16, 25, 34, 43, 42, 41, 40, 39, 38, 37, 28,
			19
		];
		const prizeSlot = 13;

		let tick = 0;
		let tickIn = 18;
		let solving;

		const getRandomElement = (arr) =>
			arr[Math.floor(Math.random() * arr.length)];

		const runGacha = () => {
			if (tick >= 25) {
				if (!solving) {
					const finalPrize = PACK[prizeSlot];
					Table.deleteTable(id_name);
					uiManager.closeAllForms(sender);
					new ChestFormData("54")
						.title(this.title)
						.pattern(
							[
								"xxxxxxxxx",
								"x_______x",
								"x_xx&xx_x",
								"x_xxxxx_x",
								"x_______x",
								"xxxxxxxxx"
							],
							{
								x: {
									stackAmount: 1,
									itemName: "",
									texture:
										"minecraft:light_gray_stained_glass_pane"
								},
								"&": {
									stackAmount: 1,
									itemName: "↑",
									texture: "minecraft:compass"
								}
							}
						)
						.button(
							prizeSlot,
							finalPrize.name,
							finalPrize.description,
							finalPrize.type,
							finalPrize.amount,
							!!finalPrize.enchanted
						)
						.open(sender);
					sender.playSound("random.levelup");
					solving = true;
				} else system.clearRun(interval);
				return;
			}

			sender.playSound("random.orb");

			const prize = getRandomElement(this.buttons);
			if (PACK.length < rollingSlot.length) {
				PACK.unshift(prize);
				Table.setTable(id_name, PACK);
			} else {
				const lastIndex = PACK.pop();
				PACK.unshift(lastIndex);

				Table.setTable(id_name, PACK);
			}

			PACK.forEach((item, index) => {
				this.form.button(
					rollingSlot[index],
					item.name,
					item.description,
					item.type,
					item.amount,
					!!item.enchanted
				);
			});

			uiManager.closeAllForms(sender);
			this.form.show(sender);

			tick++;
			tickIn = Math.min(tickIn + 1, 20);
		};

		let interval = system.runInterval(runGacha, tickIn);
	}
}

class CrateGUI {
	#name;
	#location
	constructor(crate_name,location) {
		this.#name = crate_name;
		this.#location=location
	}
}

export { CrateUI,CrateGUI};