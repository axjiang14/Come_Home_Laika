var main = document.createElement('script');
main.src = 'main.js';
document.head.appendChild(main);

var plutoState = {
preload: function() {
	everyPreload();
},

create: function() {
	game.add.sprite(0, 0, 'background');
	player = game.add.sprite(0, 0, 'laika');
	console.log('player is:', player);
	
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
	console.log('Got to spaceship!');
	planetsUnlocked = Math.max(planetsUnlocked, 1);
	console.log('planetsUnlocked=', planetsUnlocked);
	game.state.start('solarSystem');
    savedHP = player.hp;
}

}// main state
