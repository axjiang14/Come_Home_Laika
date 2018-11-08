var debugState = {
preload: function() {
	everyPreload();
},

create: function() {
    //game.add.sprite(0, 0, 'background').fixedToCamera = false;
	player = game.add.sprite(0, 0, 'laika');
	
    
	everyCreate();
	game.world.setBounds(0 , 0, 800, 600);
	player.hp = 10;
	player.body.gravity.y = 900;
    
	stateLoad('states/debugState.json');
},

update: function()
{
	everyUpdate();
	game.physics.arcade.overlap(player, spaceship, this.spaceshipLeave, null, this);
},

spaceshipLeave: function() {
}

}
