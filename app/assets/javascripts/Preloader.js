GAImmersered.Preloader = function (game) {
	this.background = null;
	this.preloadBar = null;
	this.ready = false;
};
GAImmersered.Preloader.prototype = {
	preload: function () {
		this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
		this.splash.anchor.setTo(0.5);
		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5);
		this.load.setPreloadSprite(this.preloadBar);
		this.load.image('playButton', 'assets/play.png');
		this.load.image('flame', 'assets/flame.png');
		this.load.image('sword', 'assets/sword.png');
		this.load.image('levelParticle', 'assets/level-particle.png');
		this.load.image('spellParticle', 'assets/spell-particle.png');
		this.load.image('spaceButton', 'assets/spacebarButton.png');

		this.load.spritesheet('tiles', 'assets/tiles.png', 16, 16);
		this.load.spritesheet('things', 'assets/things.png', 16, 16);
		this.load.spritesheet('characters', 'assets/characters.png', 16, 16);
		this.load.spritesheet('milo', 'assets/milo.png', 16, 16);
		this.load.spritesheet('dead', 'assets/dead.png', 16, 16);
		this.load.spritesheet('potions', 'assets/potions.png', 16, 16);
		this.load.spritesheet('dragons', 'assets/dragons.png', 32, 32);
		this.load.spritesheet('fireball', 'assets/fireball.png', 16, 16);
		this.load.spritesheet('spell', 'assets/spell.png', 12, 12);

		this.load.audio('openingMusic', 'opening.ogg');

	},
	create: function () {
		this.preloadBar.cropEnabled = false;
	},
	update: function () {
		if (this.cache.isSoundDecoded('openingMusic') && this.ready == false)
			{
		 	this.ready = true;
		 	this.state.start('MainMenu');
		}
	}
};
