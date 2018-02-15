GAImmersered.Game = function(game) {};
GAImmersered.Game.prototype = {

  saveGame: function() {
    console.log('IN saveGame');
    let saveObject = {};
    saveObject.player = {
      position: this.player.position
    };
    console.log(this.player.position);

    let json = JSON.stringify(saveObject);
    $.ajax(saveGame, {
      slot_1: json
    })
    .done();
  },

  preload: function(){
    console.log('PRELOAD HERE');
    this.game.load.image('mapTiles1', '/assets/Interior_1.png');
    this.game.load.image('mapTiles2', '/assets/Interior_3.png');
    this.game.load.image('mapTiles3', '/assets/BlueCarpetTileset.png');
    this.game.load.tilemap('Gav2.2', '/assets/Gav2.2.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.world.setBounds(0, 0, 1800, 1400);
    console.log('PRELOAD DONE');
  },

  create: function() {

    this.object = this.game.add.group();
    this.object.enableBody = true;

    // other objects, etc
    this.level1 = this.game.add.tilemap('Gav2.2'); // step 1
    this.level1.addTilesetImage('Pokemon Interior',  'mapTiles1');
    this.level1.addTilesetImage('Interior_3',        'mapTiles2');
    this.level1.addTilesetImage('BlueCarpetTileset', 'mapTiles3');

    // step 3
    this.bgLayer = this.level1.createLayer('Floor');
    this.bgFurniture = this.level1.createLayer('Lower Background Furniture');
    this.bgFurniture = this.level1.createLayer('Lower Foreground Furniture');
    this.wallsLayer = this.level1.createLayer('Walls');
    this.bgFurniture = this.level1.createLayer('Upper Furniture');

    // Loop over each object layer
    for (var ol in this.level1.objects) {
    	// Loop over each object in the object layer
    for (var o in this.level1.objects[ol]) {
    		var object = this.level1.objects[ol][o];
        // Make a Phaser game object from the objects in this Tiled JSON list
        if( object.type === 'object' ){
          // Make an enemy object
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

    this.npc1 = this.generateNpc1(); // Generate NPC
    this.npc2 = this.generateNpc2(); // Generate NPC
    this.milo = this.generateMilo(); //Generate Milo
    // this.luke = this.generateLuke(); //Generate Milo


    this.generateCollectables();

    this.generateEnemies(2);
    this.playerAttacks = this.generateAttacks('sword', 1);

    this.notification = ''; // Generate Notification
    this.gold = 0; // Generate Gold
    this.showLabels();
    // enemy.scale.setTo(2);
    this.miloCounter = 0;
    this.lukeSpawned = false;

    this.game.camera.follow(this.player); // Camera Following Players
    this.controls = {
    up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
    left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
    down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
    right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
    spell: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
    enter: this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
  }; // Set Contrwoller

  },

  update: function() {
    this.playerHandler();
    this.collisionHandler();
    this.enemyHandler();
    this.notificationLabel.text = this.notification;
  },

  // ** PLAYER GENERATOR AND HANDLER **

  playerHandler: function() {
    // Attack towards mouse click
    // if (this.game.input.activePointer.isDown) {
    //     this.playerAttacks.rate = 1000 - (this.player.speed * 4);
    //         if (this.playerAttacks.rate < 200) {
    //             this.playerAttacks.rate = 200;
    //         }
    //     this.playerAttacks.range = this.player.strength * 3;
    //     this.attack(this.player, this.playerAttacks);
    // }

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

    var player = this.game.add.sprite(770, 850, 'characters');
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

    var player = this.game.add.sprite(770, 850, 'characters');
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

    var player = this.game.add.sprite(770, 850, 'characters');
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
    var player = this.game.add.sprite(770, 850, 'characters');
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
    // this.game.physics.arcade.collide(this.obstacles, this.player, null, null, this);
    this.game.physics.arcade.collide(this.player, this.object, null, null, this);
    this.game.physics.arcade.overlap(this.collectables, this.player, this.collect, null, this);
    this.game.physics.arcade.collide(this.player, this.npc1, this.npc1Collision, null, this);
    this.game.physics.arcade.collide(this.player, this.npc2, this.npc2Collision, null, this);
    this.game.physics.arcade.collide(this.player, this.milo, this.miloCollision, null, this);
    this.game.physics.arcade.collide(this.player, this.enemies, this.hit, null, this);
    this.game.physics.arcade.collide(this.enemies, this.playerAttacks, this.hit, null, this);

    // this.game.physics.arcade.collide(this.object, this.enemies, null, null, this);

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
      text = this.game.add.text(136, 73, 'Check Room 1!',{font: '12px Arial', fill:'#FFFFFF', backgroundColor: '#000000'});
      text.outOfCameraBoundsKill = true;
      text.autoCull = true;
    // }
  },

  npc2Collision: function(player, npc2){
    this.miloCounter += 1;
    console.log(this.miloCounter)
      text = this.game.add.text(864, 402, 'Scriptsss.... ',{font: '12px Arial', fill:'#FFFFFF', backgroundColor: '#000000'});
      text.outOfCameraBoundsKill = true;
      text.autoCull = true;
      return this.hasSpokenToNpc2;
  },

  miloCollision: function(player, milo){
    console.log(this.miloCounter);
    if(this.miloCounter > 1){
      text = this.game.add.text(695, 599, "Luke has spawned \nin Data Science!!",{font: '12px Arial', fill:'#FFFFFF', backgroundColor: '#000000'});
      text.outOfCameraBoundsKill = true;
      text.autoCull = true;
      this.generateLuke();
    }
    else{
      text = this.game.add.text(695, 599, 'Ask the UX ghost..',{font: '12px Arial', fill:'#FFFFFF', backgroundColor: '#000000'});
      text.outOfCameraBoundsKill = true;
      text.autoCull = true;
    }
  },

  // ** GENERATE CHARACTERS **

  generateNpc1: function() {
    npc1 = this.game.add.sprite(208, 71, 'characters');
    this.game.physics.arcade.enable(npc1);
    npc1.game.inputEnabled = true;
    npc1.body.immovable = true;
    npc1.frame = 55;
    npc1.scale.setTo(2);
    return npc1;
  },

  generateNpc2: function() {
    npc2 = this.game.add.sprite(832, 384, 'characters');
    this.game.physics.arcade.enable(npc2);
    // npc2.game.inputEnabled = true;
    npc2.body.immovable = true;
    npc2.frame = 55;
    npc2.scale.setTo(2);
    return npc2;
  },

  generateMilo: function() {
    milo = this.game.add.sprite(736, 619, 'characters');
    this.game.physics.arcade.enable(milo);
    milo.game.inputEnabled = true;
    milo.body.immovable = true;
    milo.frame = 30;
    milo.scale.setTo(2);
    return milo;
  },

  generateLuke: function() {
    luke = this.game.add.sprite(1400, 691, 'dragons');
    this.game.physics.arcade.enable(luke);
    luke.game.inputEnabled = true;
    luke.body.immovable = true;
    luke.frame = 1;
    luke.scale.setTo(2);
    return luke;
  },

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
    this.generateChest3();
    this.generateChest4();
    this.generateChest5();
    this.generateChest6();
  },

  generateChest1: function () {
    const collectable = this.collectables.create(10, 768, 'things');
    collectable.scale.setTo(2);
    collectable.animations.add('idle', [6], 0, true);
    collectable.animations.add('open', [18, 30, 42], 10, false);
    collectable.animations.play('idle');
    collectable.name = 'chest'
    collectable.value = 'SHIT?! IS THAT AMIRS GITHUB ACCOUNT! OH WAIT ITS A REDIRECT URL TO A WEBSITE FULL OF VIRUS';
    return collectable;
  },

  generateChest2: function () {
    const collectable = this.collectables.create(512, 107, 'things');
    collectable.scale.setTo(2);
    collectable.animations.add('idle', [6], 0, true);
    collectable.animations.add('open', [18, 30, 42], 10, false);
    collectable.animations.play('idle');
    collectable.name = 'chest'
    collectable.value = 'OH FUCK! AMIR SABOTAGED YOUR WORK!';
    return collectable
  },

  generateChest3: function () {
    const collectable = this.collectables.create(1568, 192, 'things');
    collectable.scale.setTo(2);
    collectable.animations.add('idle', [6], 0, true);
    collectable.animations.add('open', [18, 30, 42], 10, false);
    collectable.animations.play('idle');
    collectable.name = 'chest'
    collectable.value = 'YES ! SAHANA HAS LEFT SOME GOOD CODE BEHIND!';
    return collectable
  },

  generateChest4: function () {
    const collectable = this.collectables.create(320, 73, 'things');
    collectable.scale.setTo(2);
    collectable.animations.add('idle', [6], 0, true);
    collectable.animations.add('open', [18, 30, 42], 10, false);
    collectable.animations.play('idle');
    collectable.name = 'chest'
    collectable.value = 'FUCK AMIR JUST INFECTED MY WORK AGAIN!';
    return collectable
  },

  generateChest5: function () {
    const collectable = this.collectables.create(768, 408, 'things');
    collectable.scale.setTo(2);
    collectable.animations.add('idle', [6], 0, true);
    collectable.animations.add('open', [18, 30, 42], 10, false);
    collectable.animations.play('idle');
    collectable.name = 'chest'
    collectable.value = 'LOL Priyaka left her Github password behind. Time to steal her code';
    return collectable
  },
  generateChest6: function () {
    const collectable = this.collectables.create(609, 640, 'things');
    collectable.scale.setTo(2);
    collectable.animations.add('idle', [6], 0, true);
    collectable.animations.add('open', [18, 30, 42], 10, false);
    collectable.animations.play('idle');
    collectable.name = 'chest'
    collectable.value = 'WOW - is that Lindas code?! Let me steal that.';
    return collectable
  },

  // ** GENERATE MOVING CHARACTER **

  enemyHandler: function() {
    this.enemies.forEachAlive(function(enemy) {
        if (enemy.visible && enemy.inCamera) {
            this.game.physics.arcade.moveToObject(enemy, this.player, enemy.speed)
            this.enemyMovementHandler(enemy);
        }
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
    this.enemies.enableBody = true;
    this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < amount; i++) {
        this.generateEnemy();
    }
  },

  generateEnemy: function () {
    enemy = this.enemies.create(this.game.world.randomX, this.game.world.randomY, 'characters');
    enemy.scale.setTo(2);
    enemy.speed = 2;

    this.generateSkeleton(enemy);
    this.generateSpider(enemy);
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

  generateAttacks: function (name, amount, rate, range) {
    // Generate the group of attack objects
    var attacks = this.game.add.group();
    attacks.enableBody = true;
    attacks.physicsBodyType = Phaser.Physics.ARCADE;
    attacks.createMultiple(amount, name);

    if (name === 'spell') {
        attacks.callAll('animations.add', 'animations', 'particle', [0, 1, 2, 3,4 ,5], 10, true);
        attacks.callAll('animations.play', 'animations', 'particle');
    } else if (name === 'fireball') {
        attacks.callAll('animations.add', 'animations', 'particle', [0, 1, 2, 3], 10, true);
        attacks.callAll('animations.play', 'animations', 'particle');
    }

    attacks.setAll('anchor.x', 0.5);
    attacks.setAll('anchor.y', 0.5);
    attacks.setAll('outOfBoundsKill', true);
    attacks.setAll('checkWorldBounds', true);

    attacks.rate = rate;
    attacks.range = range;
    attacks.next = 0;
    attacks.name = name;

    return attacks;
  },

  hit: function (target, attacker) {

    if (this.game.time.now > target.invincibilityTime) {
        target.invincibilityTime = this.game.time.now + target.invincibilityFrames;
        target.damage(attacker.strength)
        if (target.health < 0) {
            target.health = 0;
        }
        this.notification = 'AMIR IS SENDING YOU BAD CODE! RUN!';
    }
  },

};
