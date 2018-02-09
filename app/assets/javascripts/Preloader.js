GAImmersered.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;
};

GAImmersered.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
		this.splash.anchor.setTo(0.5);

		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5);

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		this.load.image('playButton', '/assets/play.png');
		this.load.image('flame', '/assets/flame.png');
		this.load.image('sword', '/assets/sword.png');
		this.load.image('levelParticle', '/assets/level-particle.png');
		this.load.image('spellParticle', '/assets/spell-particle.png');

		this.load.spritesheet('tiles', '/assets/tiles.png', 16, 16);
		this.load.spritesheet('things', '/assets/things.png', 16, 16);
		this.load.spritesheet('characters', '/assets/characters.png', 16, 16);
		this.load.spritesheet('dead', '/assets/dead.png', 16, 16);
		this.load.spritesheet('potions', '/assets/potions.png', 16, 16);
		this.load.spritesheet('dragons', '/assets/dragons.png', 32, 32);
		this.load.spritesheet('fireball', '/assets/fireball.png', 16, 16);
		this.load.spritesheet('spell', '/assets/spell.png', 12, 12);

		this.load.audio('openingMusic', '/opening.ogg');
		this.load.audio('overworldMusic', '/overworld.ogg');
		this.load.audio('attackSound', '/attack.wav');
		this.load.audio('playerSound', '/player.wav');
		this.load.audio('skeletonSound', '/skeleton.wav');
		this.load.audio('slimeSound', '/slime.wav');
		this.load.audio('batSound', '/bat.wav');
		this.load.audio('ghostSound', '/ghost.wav');
		this.load.audio('spiderSound', '/spider.wav');
		this.load.audio('goldSound', '/gold.wav');
		this.load.audio('potionSound', '/potion.ogg');
		this.load.audio('levelSound', '/level.ogg');
		this.load.audio('fireballSound', '/fireball.wav');
		this.load.audio('dragonSound', '/dragon.wav');
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;
	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.

		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.

		if (this.cache.isSoundDecoded('openingMusic') && this.ready == false)
			{
		 	this.ready = true;
		 	this.state.start('MainMenu');
		}
	}
};
