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

    // Add health
    /*var healthKit1 = healthKits.create(700, 330, 'healthKit')
    healthKit1.body.gravity.y = 900;
    var healthKit2 = healthKits.create(650, 110, 'healthKit')
    healthKit2.body.gravity.y = 900;*/
    
	stateLoad('states/pluto.json');   
    
	// Add spaceship exit
	/*spaceship = game.add.sprite(720, 178, 'spaceship');
	game.physics.arcade.enable(spaceship);
	spaceship.enableBody = true;
	console.log('canvas is:', game.canvas);*/
},

update: function()
{
	//console.log('sprite at:', selector.x, selector.y);
	everyUpdate();
	//selector.x = game.input.x;
	//selector.y = game.input.y;
	//console.log(game.input.x);
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
