var uranusState = {
preload: function() {
	everyPreload();
},

create: function() {
	game.sound.stopAll();
    game.add.sprite(0, 0, 'uranusBackground').fixedToCamera = true;
	player = game.add.sprite(0, 0, 'laika');
	
	everyCreate();
    player.hp = savedHP; // starts with old HP +1 for the coloring
    onPlayerHit(); // to color
	player.body.gravity.y = 1800;
    
	stateLoad('states/uranus.json');
    uranusBGM.play("",0,1,true);
},

update: function()
{
	everyUpdate();
	game.physics.arcade.overlap(player, spaceship, this.spaceshipLeave, null, this);
},

spaceshipLeave: function() {
    if (player.infoSheetNum == 5){
        game.sound.stopAll();
        console.log('Got to spaceship!');
        planetsUnlocked = Math.max(planetsUnlocked, 3);
        console.log('planetsUnlocked=', planetsUnlocked);
        game.state.start('solarSystem');
        savedHP = player.hp;
        player.infoSheetNum = 0;
        successBGM.play();
    }
}

}
