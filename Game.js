var Topdong = Topdong || {};

//title screen
Topdong.Game = function() {};

Topdong.Game.prototype = {
  create: function() {
    this.map = this.game.add.tilemap('stage0');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('tiles', 'tiles');

    //create layer
    this.tilelayer = this.map.createLayer('Tilelayer');
    this.obstaclelayer = this.map.createLayer('Obstacles');

    //collision on blockedLayer
    this.map.setCollisionBetween(1, 9, true, 'Obstacles');

    //resizes the game world to match the layer dimensions
    this.tilelayer.resizeWorld();

    // Add objects to the game world
    this.rocks = this.game.add.group();
    this.rocks.enableBody = true;
    this.map.createFromObjects('Object layer', 28, 'tiles', 27, true, false, this.rocks);
    this.rocks.setAll('body.drag', new Phaser.Point(1000,1000));

    this.pots = this.game.add.group();
    this.pots.enableBody = true;
    this.map.createFromObjects('Object layer', 27, 'tiles', 26, true, false, this.pots);
    this.pots.setAll('body.immovable', true);

    this.chests = this.game.add.group();
    this.chests.enableBody = true;
    this.map.createFromObjects('Object layer', 26, 'tiles', 25, true, false, this.chests);
    this.chests.setAll('body.immovable', true);

    this.collisionObjects = this.game.add.group();
    this.collisionObjects.addMultiple([this.rocks, this.pots, this.chests]);
    this.createPlayerStart();
  },


  //find objects in a Tiled layer that containt a property called "type" equal to a certain value
  findObjectsByType: function(type, map, layer) {
    var result = [];
    map.objects[layer].forEach(function(element) {
      if (element.properties.type === type) {
        //Phaser uses top left, Tiled bottom left so we have to adjust the y position
        //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
        //so they might not be placed in the exact pixel position as in Tiled
        element.y -= map.tileHeight;
        result.push(element);
      }
    });
    return result;
  },

  // create starting area for player
  createPlayerStart: function() {
    var result = this.findObjectsByType('playerStart', this.map, 'Object layer');
    this.player = this.game.add.sprite(result[0].x, result[0].y, 'guy');
    this.game.physics.arcade.enable(this.player);

    //the camera will follow the player in the world
    this.game.camera.follow(this.player);

    //move player with cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();

  },

  // update loop
  update: function() {
    //collision
    this.game.physics.arcade.collide(this.player, this.obstaclelayer);
    this.collisionObjects.forEach(function(child){
      this.game.physics.arcade.collide(this.player, child);
    }, this);
    this.game.physics.arcade.collide(this.rocks, this.obstaclelayer);

    // player movement
    this.player.body.velocity.y = 0;
    this.player.body.velocity.x = 0;

    if (this.cursors.up.isDown) {
      this.player.body.velocity.y -= 75;
    } else if (this.cursors.down.isDown) {
      this.player.body.velocity.y += 75;
    }
    if (this.cursors.left.isDown) {
      this.player.body.velocity.x -= 75;
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x += 75;
    }
  }
};
