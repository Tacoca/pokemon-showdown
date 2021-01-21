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
	// ATcheron
	buffice: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Buff Ice",
		desc: "When calculating type effectiveness, this move is supereffective against Water-type Pokemon, regardless of the move's typing. If the target is Water-type, it no longer resists Ice-type attacks until it switches out.",
		shortDesc: "Freeze Dry + makes Water-types not resist Ice",
		gen: 8,
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Water') return 1;
		},
		onHit(target) {
			target.addVolatile('buffice');
		},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Ice Beam', target);
			this.add('-anim', target, 'Blizzard', target);
		},
		condition: {
			onSourceBasePowerPriority: 18,
			onSourceBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Ice') {
					return this.chainModify(2);
				}
			},
		},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		isNonstandard: "Custom",
		target: "normal",
		type: "Ice",
	},
	// bad_wolf42
	rollaround: {
		num: 813,
		accuracy: 100,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		category: "Physical",
		name: "Roll Around",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 3,
		multiaccuracy: false,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onHit(target, source) {
			this.add('-anim', source, 'Mud Sport', target);
			this.add('-anim', source, 'Spikes', target);
		},
		onAfterHit(target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		onAfterSubDamage(damage, target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		sideCondition: 'spikes',
		target: "normal",
		type: "Ground",
		zMove: {basePower: 120},
		maxMove: {basePower: 140},
	},
	// Banded Bonks
	bonk: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "bonk.",
		desc: "Has a 30% chance to make the target flinch.",
		shortDesc: "30% chance to flinch",
		gen: 8,
		pp: 15,
		priority: 0,
		flags: {contact: 1, mirror: 1, protect: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		// No move animation needed
		isNonstandard: "Custom",
		target: "normal",
		type: "Steel",
	},
	// broil
	pharaohscurse:{
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Gives the target the curse effect which causes the target to lose 1/4 of its maximum HP, rounded down, at the end of each turn while it is active. If the target uses Baton Pass, the replacement will continue to be affected. Fails if there is no target or if the target is already affected.",
		shortDesc: "Afflicts the target with curse",
		name: "Pharaoh's Curse",
		volatileStatus: 'curse',
		pp: 15,
		priority: 0,
		flags: {authentic: 1},
		target: 'randomNormal',
		type: "Ghost",
		zMove: {effect: 'curse'},
		contestType: "Tough",
	},
	// Creeperman129Poke
	haunting:{
		accuracy: 100,
		basePower: 80,
		category: "special",
		desc: "Gives the target the curse effect which causes the target to lose 1/4 of its maximum HP, rounded down, at the end of each turn while it is active. If the target uses Baton Pass, the replacement will continue to be affected. Fails if there is no target or if the target is already affected.",
		shortDesc: "Afflicts the target with curse",
		name: "Haunting",
		secondary: {
			chance: 100,
			volatileStatus: 'curse',
		},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Dark Void', target);
		},
		pp: 5,
		priority: 0,
		target: "normal",
		flags: {authentic: 1},
		type: "Ghost",
		contestType: "Tough",
	},
	// crimsonKangaroo
	stareater: {
		accuracy: 100,
		basePower: 80,
		category: "physical",
		desc: "Restores HP equal to the average of the target's Atk and SpAtk stats, and lowers whichever one is higher by one stage.",
		shortDesc: "Heals by target's (Atk+SpA)/2, -1 to higher stat.",
		name: "Star Eater",
		flags: {protect: 1, mirror: 1, heal: 1},
		onHit(target, source) {
			const stat = (target.getStat('atk', false, true) + target.getStat('spa', false, true))/2;
			const success = this.boost(target.getStat('atk', false, true) > target.getStat('spa', false, true) ? {atk: -1} : {spa: -1}, target, source, null, false, true);
			return !!(this.heal(stat, source, target) || success);
		},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Giga Drain', target);
			this.add('-anim', source, 'Sunsteel Strike', target);
		},
		secondary: null,
		pp: 10,
		priority: 0,
		target: "normal",
		type: "Steel",
	},
	// Ignoritus
	spectralterrain:{
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Summons Spectral Terrain. While Spectral Terrain is active, all Pokémon on the field gain the Ghost typing in addition to their normal typings, and removes type-based immunities to Ghost-type attacks.",
		shortDesc: "Terrain that removes type immunity to ghost moves and gives pokemon extra ghost type",
		name: "Spectral Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'spectralterrain',
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Never-Ending Nightmare', source);
			this.add('-anim', target, 'Never-Ending Nightmare', target);
		},
		condition: { // TODO: Make the adding ghost type part less cursed
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Spectral Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Spectral Terrain');
				}
			},
			onModifyMovePriority: -5,
			onTryHit(source, target, move) {
				if (!target.isSemiInvulnerable() && target.isGrounded()){ 
					if (!move.ignoreImmunity) move.ignoreImmunity = {};
					if (move.ignoreImmunity !== true) {
						move.ignoreImmunity['Ghost'] = true;
					}
				}
			},
			onBeforeMove(source, target, move){
				this.eachEvent('Terrain');
			},
			onTerrain(pokemon){
				if (pokemon.hasType('Ghost') || !pokemon.isGrounded()) return;
				if (!pokemon.addType('Ghost')) return;
				this.add('-start', pokemon, 'typeadd', 'Ghost', '[from] terrain: Spectral Terrain');
			},
			onEnd(field) { 
				var side;
				var mon;
				for (side of field.battle.sides){
					for (mon of side.pokemon){
						if (mon.addedType === 'Ghost'){
							mon.addedType = '';
						}
					}
				}
				this.add('-fieldend', 'move: Spectral Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Ghost",
		zMove: {boost: {spd: 1}},
		contestType: "Beautiful",
	},
	// MeepingtonThe3rd
	mentalbrick: {
		accuracy: true,
		basePower: 80,
		category: "Special",
		name: "Mental Brick",
		desc: "This move deals neutral damage to Dark- and Steel-types. This move cannot miss.",
		shortDesc: "Neutral dmg to Dark/Steel. Can't miss.",
		gen: 8,
		pp: 20,
		priority: 0,
		flags: {mirror: 1, protect: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Dark' || type === 'Steel') return 0;
		},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', target, 'Brick Break', target);
		},
		secondary: null,
		isNonstandard: "Custom",
		target: "normal",
		type: "Psychic",
	},
	// MightySharkVGC
	bettertrickroom: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Better Trick Room",
		desc: "For 5 turns, the Speed of every Pokemon is recalculated for the purposes of determining turn order. During the effect, each Pokemon's Speed is considered to be (10000 - its normal Speed), and if this value is greater than 8191, 8192 is subtracted from it. If this move is used during the effect, the effect ends. Additionally, if this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members.",
		shortDesc: "TR + Teleport",
		gen: 8,
		pp: 5,
		priority: -7,
		flags: {mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Trick Room', source);
			this.add('-anim', source, 'Teleport', source);
		},
		selfSwitch: true,
		pseudoWeather: 'trickroom',
		target: "self",
		type: "Psychic",
		zMove: {boost: {accuracy: 1}},
		contestType: "Clever",
	},
	// njjoltiks
	burnout: {
		accuracy: 100,
		basePower: 250,
		category: "Physical",
		desc: "The user faints after using this move, even if this move fails for having no target. This move is prevented from executing if any active Pokemon has the Damp Ability.",
		shortDesc: "User faints after use",
		name: "Burn Out",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Sacred Fire', source);
			this.add('-anim', source, 'Inferno Overdrive', target);
		},
		selfdestruct: "always",
		secondary: null,
		target: "allAdjacent",
		type: "Fire",
		contestType: "Beautiful",
	},
	// Peekz1025
	verdantblade: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Verdant Blade",
		desc: "This move is always a critical hit unless the target is under the effect of Lucky Chant or has the Battle Armor or Shell Armor Abilities.",
		shortDesc: "Always crits*",
		gen: 8,
		pp: 5,
		priority: 0,
		flags: {contact: 1, mirror: 1, protect: 1},
		willCrit: true,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Leaf Blade', target);
		},
		secondary: null,
		isNonstandard: "Custom",
		target: "normal",
		type: "Grass",
	},
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
		flags: {nonsky: 1, protect: 1, mirror: 1},
		secondary: null,
		onHit(target, pokemon) {
			this.field.setTerrain('ribbonterrain');
		},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Extreme Evoboost', target);
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		zMove: {boost: {spd: 1}},
		contestType: "Beautiful",
	},
	// RubyDragonQueen
	dragonforce: {
		accuracy: 85,
		basePower: 120,
		category: "Physical",
		name: 'Dragonforce',
		pp: 5,
		priority: 0,
		isNonstandard: 'Custom',
		desc: "A powerful Dragon-type attack that ignores screens and hits through Protect and type immunities.",
		shortDesc: "Ignores all screens and immunities.",
		flags: {contact: 1, mirror: 1},
		onTryHit(move) {
			move.infiltrates = true;
		},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Outrage', source);
			this.add('-anim', source, 'Dragon Claw', target);
		},
		ignoreImmunity: {'Dragon': true},
		secondary: null,
		target: "normal",
		type: "Dragon",
	},
	// ScarTheColossus
	balance: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: 'Balance',
		pp: 10,
		priority: 0,
		isNonstandard: 'Custom',
		desc: "Raises the user’s physical attack and defense by +1 stage and lower its speed by -1 stage. The user regains the item it last used. Fails if the user is holding an item, if the user has not held an item, if the item was a popped Air Balloon, if the item was picked up by a Pokémon with the Pickup Ability, or if the item was lost to Bug Bite, Covet, Incinerate, Knock Off, Pluck, or Thief. Items thrown with Fling can be regained. Burns the user.",
		shortDesc: "Curse + Recycle + self burn",
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Extreme Evoboost', source);
		},
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
	// TacocaT_2595
	kaboom: {
		accuracy: 100,
		basePower: 250,
		category: "Physical",
		name: 'Kaboom!',
		pp: 5,
		priority: 0,
		isNonstandard: 'Custom',
		desc: "The user faints after using this move, even if this move fails for having no target. This move is prevented from executing if any active Pokemon has the Damp Ability. Sets 1 layer of Spikes and Stealth Rocks on the opponent's side if the move succeeds.",
		shortDesc: "Explosion + Spikes + Stealth Rocks",
		flags: {protect: 1, mirror: 1},
		onTryMove(){
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source){
			this.add('-anim', source, 'Explosion', target)
			this.add('-anim', source, 'Stealth Rock', target)
			this.add('-anim', source, 'Spikes', target)
		},
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('stealthrock');
				source.side.foe.addSideCondition('spikes');
			},
		},
		selfdestruct: "always",
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	// torwildheart
	psionicslice: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		pp: 10,
		priority: 0,
		name: "Psionic Slice",
		isNonstandard: "Custom",
		desc: "This move’s base power increases by +2 for each stage the user’s stats have been raised or lowered. Resets the user’s stats after use.",
		shortDesc: "+2 BP for each stage that is non-zero (ex. -3 Spa gives +6 BP)",
		flags: {protect: 1, mirror: 1},
		onTryMove(){
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source){
			this.add('-anim', source, 'Secret Sword', target);
		},
		basePowerCallback(pokemon, target, move) {
			let boosts = 0;
			let boost: BoostName;
			for (boost in pokemon.boosts) {
				boosts += Math.abs(pokemon.boosts[boost]);
			}
			return move.basePower + 2 * boosts;
		},
		self: {
			onHit(pokemon){
				pokemon.clearBoosts();
				this.add('-clearboost', pokemon);
			}
		},
		target: "normal",
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
		onTryMove(){
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source){
			this.add('-anim', source, 'Thousand Arrows', target);
			this.add('-anim', target, 'Thousand Waves', target);
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Beautiful",//just copied this from psyshock but contest type really doesn't matter so *shrug*
	},
	// Modified moves for ATcheron's Arctic Gales
	auroraveil: {
		inherit: true,
		onTry() {
			return (this.field.isWeather('hail') || this.field.isWeather('arcticgales'));
		},
	},
	blizzard: {
		inherit: true,
		onModifyMove(move) {
			if (this.field.isWeather('hail') || this.field.isWeather('arcticgales')) move.accuracy = true;
		},
	},
	dig: {
		inherit: true,
		condition: {
			duration: 2,
			onImmunity(type, pokemon) {
				if (type === 'sandstorm' || type === 'hail' || type === 'arcticgales') return false;
			},
			onInvulnerability(target, source, move) {
				if (['earthquake', 'magnitude'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.id === 'earthquake' || move.id === 'magnitude') {
					return this.chainModify(2);
				}
			},
		},
	},
	dive: {
		inherit: true,
		condition: {
			duration: 2,
			onImmunity(type, pokemon) {
				if (type === 'sandstorm' || type === 'hail', type === 'arcticgales') return false;
			},
			onInvulnerability(target, source, move) {
				if (['surf', 'whirlpool'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.id === 'surf' || move.id === 'whirlpool') {
					return this.chainModify(2);
				}
			},
		},
	},
	moonlight: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
			case 'arcticgales':
				factor = 0.25;
				break;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
	},
	morningsun: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
			case 'arcticgales':
				factor = 0.25;
				break;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
	},
	solarbeam: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			if (['raindance', 'primordialsea', 'sandstorm', 'hail', 'arcticgales'].includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
	},
	solarblade: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			if (['raindance', 'primordialsea', 'sandstorm', 'hail', 'arcticgales'].includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
	},
	synthesis: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
			case 'arcticgales':
				factor = 0.25;
				break;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
	},
	weatherball: {
		inherit: true,
		onModifyType(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.type = 'Fire';
				break;
			case 'raindance':
			case 'primordialsea':
				move.type = 'Water';
				break;
			case 'sandstorm':
				move.type = 'Rock';
				break;
			case 'hail':
			case 'arcticgales':
				move.type = 'Ice';
				break;
			}
		},
		onModifyMove(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.basePower *= 2;
				break;
			case 'raindance':
			case 'primordialsea':
				move.basePower *= 2;
				break;
			case 'sandstorm':
				move.basePower *= 2;
				break;
			case 'hail':
			case 'arcticgales':
				move.basePower *= 2;
				break;
			}
		},
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
