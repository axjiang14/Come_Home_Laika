var finalState = {
preload: function() {
},

create: function() {
    game.sound.stopAll();
    //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	var background = game.add.sprite(0, 0, 'earthBackground');
    background.fixedToCamera = true;
	player = game.add.sprite(20, game.world.height - 70, 'laika');
	
	player.hp = 10;//savedHP; // starts with old HP +1 for the coloring
	everyCreate();
    game.world.setBounds(0 , 0, 816, 600);
	player.body.gravity.y = 1800; // 3 TILES JUMP 1800 = 4 TILES JUMP
    
    game.sound.stopAll();
    finalBossBGM.play("",0,1,true);
	stateLoad('states/final1.json');
	
	var boss = new Boss1(25, 10);
	boss.phaserObj.body.gravity.y = 100;
    console.log(boss.hp);
    
   // spaceship = game.add.sprite(750, 520, 'spaceship');
},

update: function()
{
	everyUpdate();
	game.physics.arcade.overlap(player, spaceship, this.spaceshipLeave, null, this);
    
    
},

spaceshipLeave: function() {
    game.state.start('endingState')
}

}
