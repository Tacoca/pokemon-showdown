import {getName} from './conditions';
import {changeSet, changeMoves} from "./abilities";
import {ssbSets} from "./random-teams";
// Used for torwildheart
import {RandomStaffBrosTeams} from './random-teams';
import {Pokemon, EffectState} from '../../../sim/pokemon';


/**************************************************
 * Generated by the following script:
	Object.keys(Dex.data.Moves).filter(id => {
		const move = Dex.data.Moves[id];
		if (!move || move.isZ || move.isNonstandard || move.isMax || move.noSketch) return false;
		return [
			'agility', 'aromatherapy', 'auroraveil', 'autotomize', 'banefulbunker', 'batonpass', 'bellydrum', 'bulkup', 'calmmind', 'clangoroussoul', 'coil', 'cottonguard', 'courtchange', 'curse', 'defog', 'destinybond', 'detect', 'disable', 'dragondance', 'drainingkiss', 'encore', 'extremeevoboost', 'geomancy', 'glare', 'haze', 'healbell', 'healingwish', 'healorder', 'heartswap', 'honeclaws', 'kingsshield', 'irondefense', 'leechseed', 'lightscreen', 'lovelykiss', 'magiccoat', 'maxguard', 'memento', 'milkdrink', 'moonlight', 'morningsun', 'nastyplot', 'naturesmadness', 'noretreat', 'obstruct', 'painsplit', 'partingshot', 'perishsong', 'protect', 'quiverdance', 'recover', 'reflect', 'reflecttype', 'rest', 'roar', 'rockpolish', 'roost', 'shellsmash', 'shiftgear', 'slackoff', 'sleeppowder', 'sleeptalk', 'softboiled', 'spikes', 'spikyshield', 'spore', 'stealthrock', 'stickyweb', 'strengthsap', 'substitute', 'switcheroo', 'swordsdance', 'synthesis', 'tailglow', 'tailwind', 'taunt', 'thunderwave', 'toxic', 'toxicspikes', 'transform', 'trick', 'whirlwind', 'willowisp', 'wish', 'yawn',
		].includes(id) || (
			move.basePower > 75 && ![
				'accelerock', 'acrobatics', 'aquajet', 'avalanche', 'bonemerang', 'bouncybubble', 'bulletpunch', 'bulletseed', 'buzzybuzz', 'circlethrow', 'clearsmog', 'doubleironbash', 'dragondarts', 'dragontail', 'endeavor', 'facade', 'firefang', 'flipturn', 'freezedry', 'frustration', 'geargrind', 'grassknot', 'gyroball', 'hex', 'icefang', 'iceshard', 'iciclespear', 'knockoff', 'lowkick', 'machpunch', 'nightshade', 'nuzzle', 'pikapapow', 'psychocut', 'pursuit', 'quickattack', 'rapidspin', 'return', 'rockblast', 'scorchingsands', 'seismictoss', 'shadowclaw', 'shadowsneak', 'sizzlyslide', 'storedpower', 'stormthrow', 'suckerpunch', 'superfang', 'surgingstrikes', 'tailslap', 'tripleaxel', 'uturn', 'veeveevolley', 'voltswitch', 'watershuriken', 'weatherball',
			].includes(id)
		);
	});
 **************************************************/
const USEFUL_MOVES = [
	"agility", "anchorshot", "appleacid", "aquatail", "aromatherapy", "attackorder", "aurasphere", "aurawheel", "auroraveil",
	"autotomize", "banefulbunker", "batonpass", "behemothbash", "behemothblade", "belch", "bellydrum", "blastburn", "blazekick",
	"blizzard", "blueflare", "bodypress", "bodyslam", "boltbeak", "boltstrike", "boomburst", "bounce", "bravebird", "bugbuzz",
	"bulkup", "burnup", "calmmind", "clangingscales", "clangoroussoul", "closecombat", "coil", "cottonguard", "courtchange",
	"crabhammer", "crosschop", "crunch", "curse", "darkestlariat", "darkpulse", "dazzlinggleam", "defog", "destinybond", "detect",
	"dig", "disable", "discharge", "dive", "doomdesire", "doubleedge", "dracometeor", "dragonclaw", "dragondance", "dragonhammer",
	"dragonpulse", "dragonrush", "drainingkiss", "dreameater", "drillpeck", "drillrun", "drumbeating", "dynamaxcannon",
	"dynamicpunch", "earthpower", "earthquake", "encore", "energyball", "eruption", "eternabeam", "expandingforce", "explosion",
	"extrasensory", "extremespeed", "falsesurrender", "fierydance", "fireblast", "firelash", "firepledge", "firstimpression",
	"fishiousrend", "flamethrower", "flareblitz", "flashcannon", "fleurcannon", "fly", "flyingpress", "focusblast", "focuspunch",
	"foulplay", "freezeshock", "frenzyplant", "fusionbolt", "fusionflare", "futuresight", "gigaimpact", "glare", "grasspledge",
	"gravapple", "gunkshot", "hammerarm", "haze", "headcharge", "headsmash", "healbell", "healingwish", "heatwave",
	"highhorsepower", "highjumpkick", "honeclaws", "hurricane", "hydrocannon", "hydropump", "hyperbeam", "hypervoice",
	"icebeam", "iceburn", "iciclecrash", "inferno", "irondefense", "ironhead", "irontail", "jawlock", "kingsshield",
	"lastresort", "lavaplume", "leafblade", "leafstorm", "leechlife", "leechseed", "lightscreen", "liquidation",
	"lunge", "magiccoat", "megahorn", "megakick", "megapunch", "memento", "meteorassault", "meteorbeam", "meteormash",
	"milkdrink", "mistyexplosion", "moonblast", "moongeistbeam", "moonlight", "morningsun", "muddywater", "multiattack",
	"nastyplot", "nightdaze", "noretreat", "obstruct", "outrage", "overdrive", "overheat", "painsplit", "partingshot",
	"perishsong", "petalblizzard", "petaldance", "phantomforce", "photongeyser", "plasmafists", "playrough", "poisonjab",
	"pollenpuff", "poltergeist", "powergem", "powerwhip", "prismaticlaser", "protect", "psychic", "psychicfangs", "psyshock",
	"psystrike", "pyroball", "quiverdance", "recover", "reflect", "reflecttype", "rest", "roar", "rockpolish", "rockwrecker",
	"roost", "sacredsword", "scald", "secretsword", "seedbomb", "selfdestruct", "shadowball", "shadowbone", "shellsidearm",
	"shellsmash", "shelltrap", "shiftgear", "skullbash", "skyattack", "slackoff", "slam", "sleeppowder", "sleeptalk",
	"sludgebomb", "sludgewave", "snipeshot", "softboiled", "solarbeam", "solarblade", "sparklingaria", "spectralthief",
	"spikes", "spikyshield", "spiritshackle", "spore", "stealthrock", "steelbeam", "steelroller", "stickyweb",
	"stoneedge", "strangesteam", "strength", "strengthsap", "submission", "substitute", "sunsteelstrike", "superpower",
	"surf", "switcheroo", "swordsdance", "synthesis", "tailwind", "takedown", "taunt", "thrash", "throatchop", "thunder",
	"thunderbolt", "thunderwave", "toxic", "toxicspikes", "transform", "triattack", "trick", "uproar", "vcreate",
	"volttackle", "waterfall", "waterpledge", "waterspout", "whirlwind", "wickedblow", "wildcharge", "willowisp", "wish",
	"woodhammer", "xscissor", "yawn", "zapcannon", "zenheadbutt", "zingzap",
];

export const Moves: {[k: string]: ModdedMoveData} = {
	/*
	// Example
	moveid: {
		accuracy: 100, // a number or true for always hits
		basePower: 100, // Not used for Status moves, base power of the move, number
		category: "Physical", // "Physical", "Special", or "Status"
		desc: "", // long description
		shortDesc: "", // short description, shows up in /dt
		name: "Move Name",
		isNonstandard: "Custom",
		gen: 8,
		pp: 10, // unboosted PP count
		priority: 0, // move priority, -6 -> 6
		flags: {}, // Move flags https://github.com/smogon/pokemon-showdown/blob/master/data/moves.js#L1-L27
		onTryMove() {
			this.attrLastMove('[still]'); // For custom animations
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Move Name 1', source);
			this.add('-anim', source, 'Move Name 2', source);
		}, // For custom animations
		secondary: {
			status: "tox",
			chance: 20,
		}, // secondary, set to null to not use one. Exact usage varies, check data/moves.js for examples
		target: "normal", // What does this move hit?
		// normal = the targeted foe, self = the user, allySide = your side (eg light screen), foeSide = the foe's side (eg spikes), all = the field (eg raindance). More can be found in data/moves.js
		type: "Water", // The move's type
		// Other useful things
		noPPBoosts: true, // add this to not boost the PP of a move, not needed for Z moves, dont include it otherwise
		isZ: "crystalname", // marks a move as a z move, list the crystal name inside
		zMove: {effect: ''}, // for status moves, what happens when this is used as a Z move? check data/moves.js for examples
		zMove: {boost: {atk: 2}}, // for status moves, stat boost given when used as a z move
		critRatio: 2, // The higher the number (above 1) the higher the ratio, lowering it lowers the crit ratio
		drain: [1, 2], // recover first num / second num % of the damage dealt
		heal: [1, 2], // recover first num / second num % of the target's HP
	},
	*/
	// Please keep sets organized alphabetically based on staff member name!
	// PseudoPhysics
	therest: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "User uses the moves Charm, Amnesia, Safeguard, Splash, Tickle, and Destiny Bond, in that order.",
		shortDesc: "Charm > Amnesia > Safeguard > Splash > Tickle > Destiny Bond",
		name: "{the rest}",
		isNonstandard: "Custom",
		gen: 8,
		pp: 5,
		priority: 0,
		flags: {authentic: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Extreme Evoboost', source);
		},
		onHit(target) {
			this.useMove("Charm", target);
			this.useMove("Amnesia", target);
			this.useMove("Safeguard", target);
			this.useMove("Splash", target);
			this.useMove("Tickle", target);
			this.useMove("Destiny Bond", target);
		},
		secondary: null,
		target: "self",
		type: "Psychic",
	},
	// RibbonNymph
	ribbonsurge: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "For 5 turns, the terrain becomes Ribbon Terrain. During the effect, the power of Fairy type moves is multiplied by 1.3, the power of Dragon type moves is halved, and grounded Pokémon are protected from non-volatile status afflictions.",
		shortDesc: "5 turns. Fairy 1.3x dmg, Dragon 0.5x dmg. Blocks status afflictions.",
		name: "Ribbon Surge",
		pp: 10,
		isNonstandard: "Custom",
		gen: 8,
		priority: 0,
		flags: {nonsky: 1},
		secondary: null,
		onHit(target, pokemon) {
			this.field.setTerrain('ribbonterrain');
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		zMove: {boost: {spd: 1}},
		contestType: "Beautiful",
	},
	// ScarTheColossus
	balance:{
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: 'Balance',
		pp: 10,
		isNonstandard: 'Custom',
		desc: "Raises the user’s physical attack and defense by +1 stage and lower its speed by -1 stage. The user regains the item it last used. Fails if the user is holding an item, if the user has not held an item, if the item was a popped Air Balloon, if the item was picked up by a Pokémon with the Pickup Ability, or if the item was lost to Bug Bite, Covet, Incinerate, Knock Off, Pluck, or Thief. Items thrown with Fling can be regained. Burns the user.",
		shortDesc: "Curse + Recycle + self burn",
		flags: {snatch: 1},
		boosts: {atk: 1, def: 1, spe: -1},
		onHit(pokemon) {
			if (pokemon.item || !pokemon.lastItem) return false;
			const item = pokemon.lastItem;
			pokemon.lastItem = '';
			this.add('-item', pokemon, this.dex.getItem(item), '[from] move: Balance');
			pokemon.setItem(item);
		},
		secondary: {
			chance: 100,
			status: 'brn',
		},
		target: "self",
		type: "Normal",
		zMove: {boost: {atk: 1}},
		contestType: "Clever",
	},
	//torwildheart
	imgonnatryanewteam:{
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Replaces every non-fainted member of the user's team with a Super Tiger Bros. set that is randomly selected from all sets, except those with the move Wonder Trade. Remaining HP and PP percentages, as well as status conditions, are transferred onto the replacement sets. This move fails if it's used by a Pokemon that does not originally know this move. This move fails if the user is not Asheviere.",
		shortDesc: "Replaces user's team with random STB sets.",
		name: "I'm Gonna Try a New Team",
		isNonstandard: "Custom",
		pp: 2,
		noPPBoosts: true,
		priority: 0,
		flags: {},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Amnesia', source);
			this.add('-anim', source, 'Double Team', source);
		},
		onTryHit(target, source) {
			if (source.name !== 'torwildheart') {
				this.add('-fail', source);
				this.hint("Only torwildheart can use I'm Gonna Try a New Team.");
				return null;
			}
		},
		onHit(target, source) {
			// Store percent of HP left, percent of PP left, and status for each pokemon on the user's team
			const carryOver: {hp: number, status: ID, statusData: EffectState, pp: number[]}[] = [];
			const currentTeam = source.side.pokemon.slice();
			for (const pokemon of currentTeam) {
				carryOver.push({
					hp: pokemon.hp / pokemon.maxhp,
					status: pokemon.status,
					statusData: pokemon.statusData,
					pp: pokemon.moveSlots.slice().map(m => {
						return m.pp / m.maxpp;
					}),
				});
				// Handle pokemon with less than 4 moves
				while (carryOver[carryOver.length - 1].pp.length < 4) {
					carryOver[carryOver.length - 1].pp.push(1);
				}
			}
			// Generate a new team
			let team: Pokemon[] = this.teamGenerator.getTeam({name: source.side.name, inBattle: true});
			// Remove Asheviere from generated teams to not allow duplicates
			team = team.filter(pokemon => !(pokemon.name === 'torwildheart'));
			// Overwrite un-fainted pokemon other than the user
			for (const [i, mon] of currentTeam.entries()) {
				if (mon.fainted || !mon.hp || mon.position === source.position) continue;
				let set = team.shift();
				if (!set) throw new Error('Not enough pokemon left to wonder trade to.');
				const oldSet = carryOver[i];

				// Bit of a hack so client doesn't crash when formeChange is called for the new pokemon
				const effect = this.effect;
				this.effect = {id: ''} as Effect;
				const pokemon = new Pokemon(set, source.side);
				this.effect = effect;

				pokemon.hp = Math.floor(pokemon.maxhp * oldSet.hp) || 1;
				pokemon.status = oldSet.status;
				if (oldSet.statusData) pokemon.statusData = oldSet.statusData;
				for (const [j, moveSlot] of pokemon.moveSlots.entries()) {
					moveSlot.pp = Math.floor(moveSlot.maxpp * oldSet.pp[j]);
				}
				pokemon.position = mon.position;
				currentTeam[i] = pokemon;
			}
			source.side.pokemon = currentTeam;
			this.add('message', `${source.name} is trying a new team!`);
		},
		target: "self",
		type: "Psychic",
	},
	//VolticHalberd
	halburst: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		defensiveCategory: "Physical",
		name: "Halburst",
		pp: 5,
		isNonstandard: 'Custom',
		desc: "Deals damage to the target based on its Defense instead of Special Defense.",
		shortDesc: "Uses def instead of spd",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Beautiful",//just copied this from psyshock but contest type really doesn't matter so *shrug*
	},
	// used for RibbonNymph's move
	ribbonterrain: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the terrain becomes Ribbon Terrain. During the effect, the power of Fairy type moves is multiplied by 1.3, the power of Dragon type moves is halved, and grounded Pokémon are protected from non-volatile status afflictions.",
		shortDesc: "5 turns. Fairy 1.3x dmg, Dragon 0.5x dmg. Blocks status afflictions.",
		name: "Ribbon Terrain",
		pp: 10,
		isNonstandard: "Custom",
		gen: 8,
		priority: 0,
		flags: {nonsky: 1},
		secondary: null,
		terrain: 'ribbonterrain',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (effect && ((effect as Move).status || effect.id === 'yawn')) {
					this.add('-activate', target, 'move: Ribbon Terrain');
				}
				return false;
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'confusion') {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Ribbon Terrain');
					return null;
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Dragon' && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('ribbon terrain weaken');
					return this.chainModify(0.5);
				}
				if (move.type === 'Fairy' && attacker.isGrounded()) {
					this.debug('ribbon terrain boost');
					return this.chainModify(1.3);
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Ribbon Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Ribbon Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd(side) {
				this.add('-fieldend', 'Ribbon Terrain');
			},
		},
		target: "all",
		type: "Fairy",
		zMove: {boost: {spd: 1}},
		contestType: "Beautiful",
	},
	// Support for RibbonNymph's Ribbon Surge
	camouflage: {
		inherit: true,
		onHit(target) {
			let newType = 'Normal';
			if (this.field.isTerrain('electricterrain')) {
				newType = 'Electric';
			} else if (this.field.isTerrain('grassyterrain')) {
				newType = 'Grass';
			} else if (this.field.isTerrain('mistyterrain') || this.field.isTerrain('ribbonterrain')) {
				newType = 'Fairy';
			} else if (this.field.isTerrain('psychicterrain')) {
				newType = 'Psychic';
			}

			if (target.getTypes().join() === newType || !target.setType(newType)) return false;
			this.add('-start', target, 'typechange', newType);
		},
	},
	mistyexplosion: {
		inherit: true,
		onBasePower(basePower, source) {
			if ((this.field.isTerrain('mistyterrain') || this.field.isTerrain('ribbonterrain')) && source.isGrounded()) {
				this.debug('misty terrain boost');
				return this.chainModify(1.5);
			}
		},
	},
	naturepower: {
		inherit: true,
		onTryHit(target, pokemon) {
			let move = 'triattack';
			if (this.field.isTerrain('electricterrain')) {
				move = 'thunderbolt';
			} else if (this.field.isTerrain('grassyterrain')) {
				move = 'energyball';
			} else if (this.field.isTerrain('mistyterrain') || this.field.isTerrain('ribbonterrain')) {
				move = 'moonblast';
			} else if (this.field.isTerrain('psychicterrain')) {
				move = 'psychic';
			}
			this.useMove(move, pokemon, target);
			return null;
		},
	},
	secretpower: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (this.field.isTerrain('')) return;
			move.secondaries = [];
			if (this.field.isTerrain('electricterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'par',
				});
			} else if (this.field.isTerrain('grassyterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'slp',
				});
			} else if (this.field.isTerrain('mistyterrain') || this.field.isTerrain('ribbonterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spa: -1,
					},
				});
			} else if (this.field.isTerrain('psychicterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spe: -1,
					},
				});
			}
		},
	},
	terrainpulse: {
		inherit: true,
		onModifyType(move, pokemon) {
			if (!pokemon.isGrounded()) return;
			switch (this.field.terrain) {
			case 'electricterrain':
				move.type = 'Electric';
				break;
			case 'grassyterrain':
				move.type = 'Grass';
				break;
			case 'mistyterrain':
			case 'ribbonterrain':
				move.type = 'Fairy';
				break;
			case 'psychicterrain':
				move.type = 'Psychic';
				break;
			}
		},
	},
	// Utility for torwildheart's ability
	doublesspreadreduction: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the terrain becomes Ribbon Terrain. During the effect, the power of Fairy type moves is multiplied by 1.3, the power of Dragon type moves is halved, and grounded Pokémon are protected from non-volatile status afflictions.",
		shortDesc: "5 turns. Fairy 1.3x dmg, Dragon 0.5x dmg. Blocks status afflictions.",
		name: "Doubles Spread Reduction",
		pp: 10,
		isNonstandard: "Custom",
		gen: 8,
		priority: 0,
		flags: {nonsky: 1},
		secondary: null,
		pseudoWeather: "doublesspreadreduction",
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				return 5;
			},
			onStart(target, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Doubles Spread Reduction', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Doubles Spread Reduction');
				}
			},
			onBasePowerPriority: 7,
			onBasePower(basePower, attacker, defender, move){
				if (move.target === 'allAdjacent' || move.target === 'allAdjacentFoes'){
					this.debug('doubles spread reduction weaken');
					return this.chainModify(0.75);
				}
			},
			onResidualOrder: 25,
			onEnd() {
				this.add('-fieldend', 'move: Doubles Spread Reduction', '[of] ' + this.effectData.source);
			},
		},
		target: "all",
		type: "Psychic",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
	// TestMon
	tacklex: {
		num: 33,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Tackle X",
		pp: 35,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
};