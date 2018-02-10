GAImmersered.MainMenu = function(game) {};

GAImmersered.MainMenu.prototype = {
  create: function() {
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'tiles', 8);
    this.background.autoScroll(-10, 0);
    this.splash = this.add.image(this.game.width / 2, this.game.height / 2.4, 'logo');
    this.splash.anchor.setTo(0.5);
    text = "Welcome, {NAME}" ;
    style = {
      font: "10px Press Start 2P",
      fill: "#ffffff",
      align: "center"
    };
    this.score = this.game.add.text(this.game.width / 2, this.game.height - 50, text, style);
    this.score.anchor.set(0.5);
    text = "Version 1.0";
    style = {
      font: "7px Press Start 2P",
      fill: "#ffffff",
      align: "center"
    };
    this.instructions = this.game.add.text(this.game.width / 2, this.game.height - 25, text, style);
    this.instructions.anchor.set(0.5);
    this.playButton = this.add.button(this.game.width / 2, this.game.height / 2 + 100, 'playButton', this.startGame, this);
    this.playButton.anchor.setTo(0.5);
  },

  update: function() {},
  
  startGame: function(pointer) {
    this.state.start('Game');
  },

  shutdown: function() {
    this.splash = null;
    this.score = null;
    this.instructions = null;
    this.background = null;
    this.playButton = null;
  }
};
