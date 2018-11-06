var plutoState = {
preload: function() {
	everyPreload();
},

create: function() {
	game.add.sprite(0, 0, 'background').fixedToCamera = true;
	player = game.add.sprite(0, 0, 'laika');
	
	everyCreate();
	player.hp = 10;
	player.body.gravity.y = 900;
    
	stateLoad('states/pluto.json');
},

update: function()
{
	everyUpdate();
	game.physics.arcade.overlap(player, spaceship, this.spaceshipLeave, null, this);
},

spaceshipLeave: function() {
    if (player.infoSheetNum == 5){
        console.log('Got to spaceship!');
        planetsUnlocked = Math.max(planetsUnlocked, 1);
        console.log('planetsUnlocked=', planetsUnlocked);
        game.state.start('solarSystem');
        savedHP = player.hp;
    }
    player.infoSheetNum = 0;
}

}
