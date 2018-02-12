  GAImmersered.Game = function(game) {};

GAImmersered.Game.prototype = {

  preload: function(){
    console.log('PRELOAD HERE');
    this.game.load.image('mapTiles', '/assets/all_tiles.png');
    // this.game.load.tilemap('PokemonTestRoom', '/assets/PokemonTestRoom.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.tilemap('PokemonTestRoom', '/assets/finalTest.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.world.setBounds(0, 0, 600, 600);
    console.log('PRELOAD DONE');
  },

  //Create Game Handler
  create: function() {
    // var worldSize = 550; //Edit Map Size
    // this.game.world.setBounds(0, 0, worldSize, worldSize);
    // this.background = this.game.add.tileSprite(0, 0, this.game.world.width / 2, this.game.world.height / 2, 'tiles', 65); //Background Selector
    // this.background.scale.setTo(2); //Background Scale
    // console.log('got here');

    // other objects, etc
       this.level1 = this.game.add.tilemap('PokemonTestRoom'); // step 1
       this.level1.addTilesetImage('Pokemon Interior', 'mapTiles'); // step 2

       // step 3
       this.bgLayer = this.level1.createLayer('Background');
       this.bgFurniture = this.level1.createLayer('Furniture');
       this.bgFurniture.enableBody = true;

       this.wallsLayer = this.level1.createLayer('Walls');

       // var map = game.make.tilemap('map');

        // Loop over each object layer
        for (var ol in this.level1.objects) {
        	// Loop over each object in the object layer
        	for (var o in this.level1.objects[ol]) {
        		var object = this.level1.objects[ol][o];

        		console.log('obj:', object);
            // Make a Phaser game object from the objects in this Tiled JSON list
            if( object.type === 'enemy' ){
              // Make an enemy object
            }


          }
        }


       // step 4 will be described soon


    this.player = this.generatePlayer(); //Generate Player
    this.game.camera.follow(this.player); //Camera Following Players
    this.generateObstacles();// Generate Obstacle/ item
    this.enemy = this.generateEnemy(); //Generate Enemy/ other  character

    this.controls = {
      up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
      left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
      down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
      right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
      spell: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    }; // Set Controller
  },

  //Update Game Handler
  update: function() {
    this.playerHandler();
    this.collisionHandler();
  },

  //Game Function
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
      this.game.physics.arcade.collide(this.player, this.enemy, this.spriteCollision, null, this);// Call spriteCollision when the player collides with the other character
    },

    collect: function(collectable) {
        console.log(collectable);
        if (!collectable.collected) {
            collectable.collected = true;
            var gain;
            if (collectable.name === 'chest') {
                collectable.animations.play('open');
                this.gold += collectable.value;
                this.notification = 'You open a chest and find ' + collectable.value + ' gold!';
            }
        }
    },

    spriteCollision: function(player, enemy) {
      // this.generateButton(); show button when player walks into skeleton
      enemy.events.onInputDown.add(this.listener, this); //only show text after player has collied with enemy
    },

    collectableCollision: function(player, collectable){
      collectable.events.onInputDown.add(this.collectListener, this);
      return this.collectable;
      // console.log('collision:' + this.collectable)
    },

    //Generate Obstacles Group
    generateObstacles: function() {
      this.obstacles = this.game.add.group();
      this.obstacles.enableBody = true;
      this.generateObstacle();
    },

    //Generate Specific Obstacles
    generateObstacle: function() {
      obstacle = this.obstacles.create(0, 440, 'tiles');
      obstacle.animations.add('tree', [14], 0, true);
      obstacle.animations.play('tree');
      obstacle.scale.setTo(10, 1);
      obstacle.body.moves = false;
      return obstacle;
    },
    generateClassRoom2: function() {
      // obstacle = this.obstacles.create(145, 440, 'tiles');
      // obstacle.animations.add('tree', [14], 0, true);
      // obstacle.animations.play('tree');
      // obstacle.scale.setTo(1, -10);
      // obstacle.body.moves = false;
      return obstacle;
    },
    generateShrub: function() {
      obstacle = this.obstacles.create(64, 32, 'tiles');
      obstacle.animations.add('shrub', [20], 0, true);
      obstacle.animations.play('shrub');
      obstacle.scale.setTo(2);
      obstacle.body.moves = false;
      return obstacle;
    },

    generateEnemies: function () {
      this.enemies = this.game.add.group();
      // Enable physics in them
      this.enemies.enableBody = true;
      this.generateEnemy();
    },

    generateEnemy: function() {
      enemy = this.game.add.sprite(15, 30, 'characters');
      this.game.physics.arcade.enable(enemy);
      enemy.body.immovable = true;
      enemy.frame = 10;
      enemy.scale.setTo(2);
      return enemy;
    },

    generateButton: function() {
      this.button = this.game.add.button(this.game.world.centerX, 30, 'spaceButton');
      // button.actionOnClick();
    },

    collectListener: function(collectable){
      collectable.animations.add('open', [18, 30, 42], 10, false);
      collectable.animations.play('open',[6], 0, true);
      console.log('arrrr');
      // this.collect(); not adding yet
    }

};
