var main = document.createElement('script');
main.src = 'main.js';
document.head.appendChild(main);

var uranusState = {
preload: function() {
	everyPreload();
},

create: function() {
	game.add.sprite(0, 0, 'uranusBackground').fixedToCamera = true;
	player = game.add.sprite(0, 0, 'laika');
	
	everyCreate();
	player.hp = 10;
	player.body.gravity.y = 1800;
    
	stateLoad('states/uranus.json');
},

update: function()
{
	everyUpdate();
	game.physics.arcade.overlap(player, spaceship, this.spaceshipLeave, null, this);
},

spaceshipLeave: function() {
	console.log('Got to spaceship!');
	planetsUnlocked = Math.max(planetsUnlocked, 3);
	console.log('planetsUnlocked=', planetsUnlocked);
	game.state.start('solarSystem');
}

}
