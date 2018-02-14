
// this.generateCharacter1();

GAImmersered.Game = function(game) {};

GAImmersered.Game.prototype = {

  saveGame: function () {
    console.log('IN saveGame');

    let saveObject = {};

    saveObject.player = {
      position: this.player.position
    };

    let json = JSON.stringify(saveObject);

    $.ajax(saveGame, {
      slot_1: json
    })
    .done();

    // saveObject.player = this.player.map(function(player) {
    //   return JSON.parse(player.serialize());
    // });
    debugger;
  },

  preload: function(){
    console.log('PRELOAD HERE');
    this.game.load.image('mapTiles', 'assets/all_tiles.png');
    this.game.load.tilemap('mapRoom', 'assets/finalTest.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.world.setBounds(0, 0, 650, 600);
    console.log('PRELOAD DONE');
  },

  create: function() {
    this.object = this.game.add.group();
    this.object.enableBody = true;

    console.log('PHASER create()');

    // Step 1 - Add Tilemap to Game
    this.level1 = this.game.add.tilemap('mapRoom');

    // Step 2 - Add Splice Image to Game
    this.level1.addTilesetImage('Pokemon Interior', 'mapTiles');

    // Step 3 - Create Layers to Game
    this.bgLayer = this.level1.createLayer('Background');
    this.bgFurniture = this.level1.createLayer('Furniture');
    this.bgFurniture.enableBody = true; // Enable Physics to Game

    // Loop Over Objects Generated
    for (var ol in this.level1.objects) {
    	for (var o in this.level1.objects[ol]) {
    		var object = this.level1.objects[ol][o];
    		console.log('obj:', object);
        // Make a Phaser game object from the objects in this Tiled JSON list
        if( object.type === 'object' ){
          this.objectCollision(object)
        }
      }
    };

    var playerSprites = {
      character1: 'generateCharacter1',
      character2: 'generateCharacter2',
      character3: 'generateCharacter3',
      character4: 'generateCharacter4',
    };
    var playerFunc = playerSprites[ selectedPlayer ];
    this.player = this[playerFunc]();  // this.generateCharacter1();
    console.log('THIS', this);
    // Step 4 - Generate Remaining Game
    // this.player = this.generatePlayer(); // Generate Player
    // this.player = this.generateCharacter2();

    this.npc1 = this.generateNpc1(); // Generate NPC
    this.npc2 = this.generateNpc2(); // Generate NPC
    // this.amir = this.generateAmir();

    this.generateCollectables();
    this.generateEnemies(1);
    this.notification = ''; // Generate Notification
    this.gold = 0; // Generate Gold
    this.showLabels();
    enemy.scale.setTo(2);

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
    this.enemyHandler();
    this.notificationLabel.text = this.notification;
  },

  // ** PLAYER GENERATOR AND HANDLER **

  playerHandler: function() {
    if (this.player.alive) {
      this.playerMovementHandler();
      if (this.player.health > this.player.vitality) {
        this.player.health = this.player.vitality;
      }
    }

    if (!this.player.alive) {
            this.deathHandler(this.player);
            this.game.time.events.add(1000, this.gameOver, this);
        }
  },

  generateCharacter1: function() {

    var player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'characters');
    player.animations.add('down', [ 0, 1, 2 ], 10, true);
    player.animations.add('left', [ 12, 13, 14 ], 10, true);
    player.animations.add('right', [ 24, 25, 26 ], 10, true);
    player.animations.add('up', [ 36, 37, 38 ], 10, true);
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

  generateCharacter2: function() {

    var player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'characters');
    player.animations.add('down', [ 3, 4, 5 ], 10, true);
    player.animations.add('left', [ 15, 16, 17 ], 10, true);
    player.animations.add('right', [ 27, 28, 29 ], 10, true);
    player.animations.add('up', [ 39, 40, 41 ], 10, true);
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
  generateCharacter3: function() {

    var player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'characters');
    player.animations.add('down', [ 6, 7, 8 ], 10, true);
    player.animations.add('left', [ 18, 19, 20 ], 10, true);
    player.animations.add('right', [ 30, 31, 32 ], 10, true);
    player.animations.add('up', [ 42, 43, 44 ], 10, true);
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
  generateCharacter4: function() {
    var player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'characters');
    player.animations.add('down', [ 9, 10, 11 ], 10, true);
    player.animations.add('left', [ 21, 22, 23 ], 10, true);
    player.animations.add('right', [ 33, 34, 35 ], 10, true);
    player.animations.add('up', [ 45, 46, 47 ], 10, true);
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

  // ** COLLISION FUNCTION **

  collisionHandler: function() {
    this.game.physics.arcade.collide(this.obstacles, this.player, null, null, this);
    this.game.physics.arcade.collide(this.player, this.object, null, null, this);
    this.game.physics.arcade.overlap(this.collectables, this.player, this.collect, null, this);
    this.game.physics.arcade.collide(this.player, this.npc1, this.npc1Collision, null, this);
    this.game.physics.arcade.collide(this.player, this.npc2, this.npc2Collision, null, this);
    // this.game.physics.arcade.collide(this.player, this.amir, this.amirCollision, null, this);
  },

  objectCollision: function(obj) {
    let object = this.object.create(obj.x, obj.y, 'tiles');
    this.game.physics.arcade.enable(object);
    object.scale.setTo(obj.width/16,obj.height/16);
    object.body.moves = false;
    return object;
  },

  npc1Collision: function(player, npc1) {
    // if(this.controls.enter.isDown){
      text = this.game.add.text(50, 60, 'The scripts are located...',{font: '15px Arial', fill:'#FFFFFF', backgroundColor: '#000000'});
      text.outOfCameraBoundsKill = true;
      text.autoCull = true;
    // }
  },

  npc2Collision: function(player, npc2){
      text = this.game.add.text(480, 570, 'Scriptsss.... ',{font: '15px Arial', fill:'#FFFFFF', backgroundColor: '#000000'});
      text.outOfCameraBoundsKill = true;
      text.autoCull = true;
  },

  // amirCollision: function(player, amir){
  //   console.log('happening');
  //   amir.text = this.game.add.text(230, 200, 'Hey, want some scripts?',{font: '15px Arial', fill:'#FFFFFF', backgroundColor: '#000000'});
  // },

  // ** GENERATE CHARACTERS **

  generateNpc1: function() {
    npc1 = this.game.add.sprite(15, 60, 'characters');
    this.game.physics.arcade.enable(npc1);
    npc1.game.inputEnabled = true;
    npc1.body.immovable = true;
    npc1.frame = 55;
    npc1.scale.setTo(2);
    return npc1;
  },

  generateNpc2: function() {
    npc2 = this.game.add.sprite(450, 570, 'characters');
    this.game.physics.arcade.enable(npc2);
    npc2.game.inputEnabled = true;
    npc2.body.immovable = true;
    npc2.frame = 55;
    npc2.scale.setTo(2);
    return npc2;
  },

  // generateAmir: function() {
  //   amir = this.game.add.sprite(200, 200, 'characters');
  //   this.game.physics.arcade.enable(amir);
  //   amir.body.immovable = true;
  //   amir.frame = 110;
  //   amir.scale.setTo(2);
  //   return amir;
  // },

  // ** GENERATE CHEST/COLLECT CHEST **

  showLabels: function() {
    var text = '0';
    style = { font: '15px Arial', fill: '#fff', align: 'center', backgroundColor: '#000000' };
    this.notificationLabel = this.game.add.text(25, 25, text, style);
    this.notificationLabel.fixedToCamera = true;
  },

  collect: function(player, collectable) {
    if (!collectable.collected) {
      collectable.collected = true;
      if (collectable.name === 'chest') {
          collectable.animations.play('open');
          this.notification = collectable.value;
          collectable.lifespan = 5000;
      }
    }
  },

  generateCollectables: function () {
    this.collectables = this.game.add.group();
    this.collectables.enableBody = true;
    this.collectables.physicsBodyType = Phaser.Physics.ARCADE;
    this.generateChest1();
    this.generateChest2();
  },

  generateChest1: function () {
    const collectable = this.collectables.create(150, 500, 'things');
    collectable.scale.setTo(2);
    collectable.animations.add('idle', [6], 0, true);
    collectable.animations.add('open', [18, 30, 42], 10, false);
    collectable.animations.play('idle');
    collectable.name = 'chest'
    collectable.value = 'Oh no! Amir has sabotaged your code!!! VIRUS!!';
    return collectable;
  },

  generateChest2: function () {
    const collectable = this.collectables.create(100, 500, 'things');
    collectable.scale.setTo(2);
    collectable.animations.add('idle', [6], 0, true);
    collectable.animations.add('open', [18, 30, 42], 10, false);
    collectable.animations.play('idle');
    collectable.name = 'chest'
    collectable.value = 'SOME GREAT CODE!';
    return collectable;
  },

  // ** GENERATE MOVING CHARACTER **

  enemyHandler: function() {
        this.enemies.forEachAlive(function(enemy) {
            if (enemy.visible && enemy.inCamera) {
                this.game.physics.arcade.moveToObject(enemy, this.player, enemy.speed)
                this.enemyMovementHandler(enemy);
            }
        }, this);

        this.enemies.forEachDead(function(enemy) {
            if (this.rng(0, 5)) {
                this.generateGold(enemy);
            } else if (this.rng(0, 2)) {
                this.generatePotion(enemy);
                this.notification = 'The ' + enemy.name + ' dropped a potion!';
            }
            this.xp += enemy.reward;
            this.generateEnemy(this.enemies);
            this.deathHandler(enemy);
        }, this);
    },

    deathHandler: function (target) {

        var corpse = this.corpses.create(target.x, target.y, 'dead')
        corpse.scale.setTo(2);
        corpse.animations.add('idle', [target.corpseSprite], 0, true);
        corpse.animations.play('idle');
        corpse.lifespan = 3000;
        target.destroy();
    },

    generateEnemies: function (amount) {

        this.enemies = this.game.add.group();

        // Enable physics in them
        this.enemies.enableBody = true;
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i = 0; i < amount; i++) {
            this.generateEnemy();
        }
    },

    generateEnemy: function () {


        enemy = this.enemies.create(this.game.world.randomX, this.game.world.randomY, 'characters');

        do {
            enemy.reset(this.game.world.randomX, this.game.world.randomY);
        } while (Phaser.Math.distance(this.player.x, this.player.y, enemy.x, enemy.y) <= 400)

        var rnd = Math.random();
        if (rnd >= 0 && rnd < .3) enemy = this.generateSkeleton(enemy);
        else if (rnd >= .3 && rnd < .4) enemy = this.generateSpider(enemy);


        return enemy;
    },

    generateSkeleton: function (enemy) {

        enemy.animations.add('down', [9, 10, 11], 10, true);
        enemy.animations.add('left', [21, 22, 23], 10, true);
        enemy.animations.add('right', [33, 34, 35], 10, true);
        enemy.animations.add('up', [45, 46, 47], 10, true);


    },

    generateSpider: function (enemy) {

        enemy.animations.add('down', [57, 58, 59], 10, true);
        enemy.animations.add('left', [69, 70, 71], 10, true);
        enemy.animations.add('right', [81, 82, 83], 10, true);
        enemy.animations.add('up', [93, 94, 95], 10, true);

    },

    enemyMovementHandler: function (enemy) {

        // Left
        if (enemy.body.velocity.x < 0 && enemy.body.velocity.x <= -Math.abs(enemy.body.velocity.y)) {
             enemy.animations.play('left');

        // Right
        } else if (enemy.body.velocity.x > 0 && enemy.body.velocity.x >= Math.abs(enemy.body.velocity.y)) {
             enemy.animations.play('right');

        // Up
        } else if (enemy.body.velocity.y < 0 && enemy.body.velocity.y <= -Math.abs(enemy.body.velocity.x)) {
            enemy.animations.play('up');

        // Down
        } else {
            enemy.animations.play('down');
        }
    },

};
