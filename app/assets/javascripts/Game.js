GAImmersered.Game = function(game) {};

GAImmersered.Game.prototype = {

  preload: function(){
    console.log('PRELOAD HERE');
    this.game.load.image('mapTiles', '/assets/all_tiles.png');
    this.game.load.tilemap('mapRoom', '/assets/finalTest.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.world.setBounds(0, 0, 600, 600);
    console.log('PRELOAD DONE');
  },

  create: function() {
    this.wall = this.game.add.group();
    this.wall.enableBody = true;

    // Step 1 - Add Tilemap to Game
    this.level1 = this.game.add.tilemap('mapRoom');

    // Step 2 - Add Splice Image to Game
    this.level1.addTilesetImage('Pokemon Interior', 'mapTiles');

    // Step 3 - Create Layers to Game
    this.bgLayer = this.level1.createLayer('Background');
    this.bgFurniture = this.level1.createLayer('Furniture');
    this.bgFurniture.enableBody = true; // Enable Physics to Game
    // this.wallsLayer = this.level1.createLayer('Walls');

    // Loop Over Objects Generated
    for (var ol in this.level1.objects) {
    	for (var o in this.level1.objects[ol]) {
    		var object = this.level1.objects[ol][o];
    		console.log('obj:', object);
        // Make a Phaser game object from the objects in this Tiled JSON list
        if( object.type === 'wall' ){
          // Make an Table Object
          this.generateWallFromTiledObject(object)
        }
      }
    };

    // Step 4 - Generate Remaining Game
    this.player = this.generatePlayer(); // Generate Player
    this.npc1 = this.generateNpc1(); // Generate NPC
    this.npc2 = this.generateNpc2(); // Generate NPC
    // this.amir = this.generateAmir();

    this.game.camera.follow(this.player); // Camera Following Players
    this.controls = {
      up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
      left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
      down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
      right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
      spell: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
      enter: this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
    }; // Set Controller
  },

  update: function() {
    this.playerHandler();
    this.collisionHandler();
  },

  playerHandler: function() {
    if (this.player.alive) {
      this.playerMovementHandler();
      if (this.player.health > this.player.vitality) {
        this.player.health = this.player.vitality;
      }
    }
  },

  generatePlayer: function() {
    var player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'characters');
    player.animations.add('down', [
      3, 4, 5
    ], 10, true);
    player.animations.add('left', [
      15, 16, 17
    ], 10, true);
    player.animations.add('right', [
      27, 28, 29
    ], 10, true);
    player.animations.add('up', [
      39, 40, 41
    ], 10, true);
    player.animations.play('down');
    player.scale.setTo(2);
    this.game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true
    player.alive = true;
    player.name = 'Grant';
    player.speed = 125;
    player.invincibilityFrames = 500;
    player.invincibilityTime = 0;
    return player;
  },

  playerMovementHandler: function() {
      // Up-Left
    if (this.controls.up.isDown && this.controls.left.isDown) {
      this.player.body.velocity.x = -this.player.speed;
      this.player.body.velocity.y = -this.player.speed;
      this.player.animations.play('left');
      // Up-Right
    } else if (this.controls.up.isDown && this.controls.right.isDown) {
      this.player.body.velocity.x = this.player.speed;
      this.player.body.velocity.y = -this.player.speed;
      this.player.animations.play('right');
      // Down-Left
    } else if (this.controls.down.isDown && this.controls.left.isDown) {
      this.player.body.velocity.x = -this.player.speed;
      this.player.body.velocity.y = this.player.speed;
      this.player.animations.play('left');
      // Down-Right
    } else if (this.controls.down.isDown && this.controls.right.isDown) {
      this.player.body.velocity.x = this.player.speed;
      this.player.body.velocity.y = this.player.speed;
      this.player.animations.play('right');
      // Up
    } else if (this.controls.up.isDown) {
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = -this.player.speed;
      this.player.animations.play('up');
      // Down
    } else if (this.controls.down.isDown) {
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = this.player.speed;
      this.player.animations.play('down');
      // Left
    } else if (this.controls.left.isDown) {
      this.player.body.velocity.x = -this.player.speed;
      this.player.body.velocity.y = 0;
      this.player.animations.play('left');
      // Right
    } else if (this.controls.right.isDown) {
      this.player.body.velocity.x = this.player.speed;
      this.player.body.velocity.y = 0;
      this.player.animations.play('right');
      // Still
    } else {
      this.player.animations.stop();
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;
    }
  },

  collisionHandler: function() {
    this.game.physics.arcade.collide(this.obstacles, this.player, null, null, this);
    this.game.physics.arcade.collide(this.collectables, this.player, this.collectableCollision, null, this);
    this.game.physics.arcade.collide(this.player, this.wall, null, null, this);
    this.game.physics.arcade.collide(this.player, this.npc1, this.npc1Collision, null, this);
    this.game.physics.arcade.collide(this.player, this.npc2, this.npc2Collision, null, this);
    // this.game.physics.arcade.collide(this.player, this.amir, this.amirCollision, null, this);
  },

  npc1Collision: function(player, npc1) {
    if(this.controls.enter.isDown){
      // console.log('enterrrr');
      npc1.text = this.game.add.text(50, 60, 'Fark yeah',{font: '15px Arial', fill:'#FFFFFF', backgroundColor: '#000000'});
    }

  },

  npc2Collision: function(player, npc2){
    npc2.text = this.game.add.text(330, 410, 'Yoyo ',{font: '15px Arial', fill:'#FFFFFF', backgroundColor: '#000000'});
  },

  // amirCollision: function(player, amir){
  //   console.log('happening');
  //   amir.text = this.game.add.text(230, 200, 'Hey, want some scripts?',{font: '15px Arial', fill:'#FFFFFF', backgroundColor: '#000000'});
  // },

  collectableCollision: function(player, collectable){
    collectable.events.onInputDown.add(this.collectListener, this);
    return this.collectable;
  },

  generateWallFromTiledObject: function(obj) {
    let wall = this.wall.create(obj.x, obj.y, 'tiles');
    this.game.physics.arcade.enable(wall);
    wall.scale.setTo(obj.width/16,obj.height/16);
    wall.body.moves = false;
    return wall;
  },

  generateNpc1: function() {
    npc1 = this.game.add.sprite(15, 60, 'characters');
    this.game.physics.arcade.enable(npc1);
    npc1.body.immovable = true;
    npc1.frame = 10;
    npc1.scale.setTo(2);
    return npc1;
  },

  generateNpc2: function() {
    npc2 = this.game.add.sprite(450, 570, 'characters');
    this.game.physics.arcade.enable(npc2);
    npc2.body.immovable = true;
    npc2.frame = 10;
    npc2.scale.setTo(2);
    return npc2;
  }

  // generateAmir: function() {
  //   amir = this.game.add.sprite(200, 200, 'characters');
  //   this.game.physics.arcade.enable(amir);
  //   amir.body.immovable = true;
  //   amir.frame = 110;
  //   amir.scale.setTo(2);
  //   return amir;
  // },


};
