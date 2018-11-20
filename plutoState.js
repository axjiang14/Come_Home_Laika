var plutoState = {

create: function() {
    //stops sound from previous state -- seems ratchet but idk
    game.sound.stopAll();
    game.add.sprite(0, 0, 'background').fixedToCamera = false;
	player = game.add.sprite(0, 0, 'laika');
	
    
	everyCreate();
	game.world.setBounds(0 , 0, 800, 600);
	player.hp = 10;
	player.body.gravity.y = 900;
    
	stateLoad('states/pluto.json');
    plutoBGM.play("",0,1,true);
},

update: function()
{
	everyUpdate();
	game.physics.arcade.overlap(player, spaceship, this.spaceshipLeave, null, this);
},

spaceshipLeave: function() {
    if (player.infoSheetNum >= 5) {
        game.sound.stopAll();
        console.log('Got to spaceship!');
        planetsUnlocked = Math.max(planetsUnlocked, 1);
        console.log('planetsUnlocked=', planetsUnlocked);
        game.state.start('solarSystem');
        savedHP = player.hp;
        player.infoSheetNum = 0;
        successBGM.play();
    }
}

}
