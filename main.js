var Topdong = Topdong || {};

Topdong.game = new Phaser.Game(720, 360, Phaser.AUTO, '');

Topdong.game.state.add('Boot', Topdong.Boot);
Topdong.game.state.add('Preload', Topdong.Preload);
Topdong.game.state.add('Game', Topdong.Game);

Topdong.game.state.start('Boot');
