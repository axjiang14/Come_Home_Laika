var saturnState = {

preload: function() {
},

create: function() {
    game.sound.stopAll();
    //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	var background = game.add.sprite(0, 0, 'saturnBackground');
    background.fixedToCamera = true;
	player = game.add.sprite(20, game.world.height - 70, 'laika');
	
	everyCreate();
    player.hp = savedHP // starts with old HP +1 for the coloring
    onPlayerHit(); // to color
	player.body.gravity.y = 1800; // 3 TILES JUMP 1800 = 4 TILES JUMP
	
	stateLoad('states/saturn.json');
    saturnBGM.play("",0,1,true);
    
},

update: function() {
	everyUpdate();
	game.physics.arcade.overlap(player, spaceship, this.spaceshipLeave, null, this);
},

spaceshipLeave: function() {
    if (player.infoSheetNum == 5){
        game.sound.stopAll();
        console.log('Got to spaceship!');
        planetsUnlocked = Math.max(planetsUnlocked, 4);
        console.log('planetsUnlocked=', planetsUnlocked);
        game.state.start('solarSystem');
        savedHP = player.hp;
        player.infoSheetNum = 0;
        successBGM.play();
    }
}

}
    
