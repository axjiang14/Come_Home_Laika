var earthState = {

preload: function() {
},

create: function() {
    game.world.setBounds(0 , 0, 2400, 600); //has to match with background siz...?
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.add.sprite(0, 0, 'earthBackground').fixedToCamera = true;
	player = game.add.sprite(20, game.world.height - 70, 'laika');
	
	everyCreate();
    player.hp = savedHP; // starts with old HP +1 for the coloring
    onPlayerHit(); // to color
    
	player.body.gravity.y = 1800;
	
	stateLoad('states/earth.json');
},

update: function() {
	everyUpdate();
	game.physics.arcade.overlap(player, spaceship, this.spaceshipLeave, null, this);
},

spaceshipLeave: function() {
    if (player.infoSheetNum >= 5) {
        game.sound.stopAll();
        console.log('Got to spaceship!');
        planetsUnlocked = Math.max(planetsUnlocked, 8);
        console.log('planetsUnlocked=', planetsUnlocked);
        game.state.start('solarSystem');// ENDING!!!
        savedHP = player.hp;
        player.infoSheetNum = 0;
        successBGM.play();
    }
}
}
