var finalState = {
preload: function() {
	everyPreload();
},

create: function() {
    game.sound.stopAll();
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	var background = game.add.sprite(0, 0, 'venusBackground');
    background.fixedToCamera = true;
	player = game.add.sprite(20, game.world.height - 70, 'laika');
	
	player.hp = 10;//savedHP; // starts with old HP +1 for the coloring
	everyCreate();
    //onPlayerHit(); // to color
	player.body.gravity.y = 1800; // 3 TILES JUMP 1800 = 4 TILES JUMP
    
	stateLoad('states/final1.json');
	
	var boss = new Boss1(50, 10);
	boss.phaserObj.body.gravity.y = 100;
},

update: function()
{
	everyUpdate();
	game.physics.arcade.overlap(player, spaceship, this.spaceshipLeave, null, this);
},

spaceshipLeave: function() {
}

}
