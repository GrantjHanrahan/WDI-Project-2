var GAImmersered = {};

GAImmersered.Boot = function(game) {};

GAImmersered.Boot.prototype = {
  init: function() {
    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = true;
    if (this.game.device.desktop) {
      this.scale.pageAlignHorizontally = true;
    } else {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.setMinMax(480, 260, 1024, 768);
      this.scale.forceLandscape = true;
      this.scale.pageAlignHorizontally = true;
    }
  },
  preload: function() {
    this.load.image('logo', '/assets/logo.png');
    this.load.image('preloaderBar', '/assets/preload-bar.png');
  },
  create: function() {
    this.state.start('Preloader');
  }
};
