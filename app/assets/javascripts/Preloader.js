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
		this.load.image('playButton', '/assets/play.png');
		this.load.spritesheet('tiles', '/assets/tiles.png', 16, 16);
		this.load.audio('openingMusic', '/opening.ogg');
		this.load.audio('overworldMusic', '/overworld.ogg');
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
