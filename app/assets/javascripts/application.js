// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require phaser
//= require Boot
//= require Preloader
//= require MainMenu
//= require Game
//= require_tree .
// If the object exists already, we�ll use it, otherwise we�ll use a new object
var GAImmersered = GAImmersered || {};

// Initiate a new game and set the size of the entire windows
// Phaser.AUTO means that whether the game will be rendered on a CANVAS element or using WebGL will depend on the browser
GAImmersered.game = new Phaser.Game(512, 384, Phaser.AUTO, '', null, false, false);

GAImmersered.game.state.add('Boot', GAImmersered.Boot);
GAImmersered.game.state.add('Preloader', GAImmersered.Preloader);
GAImmersered.game.state.add('MainMenu', GAImmersered.MainMenu);
GAImmersered.game.state.add('Game', GAImmersered.Game);

GAImmersered.game.state.start('Boot');
