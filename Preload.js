var Topdong = Topdong || {};

//loading the game assets
Topdong.Preload = function(){};

Topdong.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets
    this.load.tilemap('stage0', 'resources/stage0.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.spritesheet('tiles', 'resources/map0.png', 16, 16 );
    this.load.spritesheet('guy', 'resources/char0.png', 16, 16);

  },
  create: function() {
    this.state.start('Game');
  }
};
