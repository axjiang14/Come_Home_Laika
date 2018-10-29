var main = document.createElement('script');
main.src = 'main.js';
document.head.appendChild(main);

var saturnState = {

preload: function() {
	everyPreload();
},

create: function() {
    game.world.setBounds(0 , 0, 2400, 600); //has to match with background siz...?
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.add.sprite(0, 0, 'saturnBackground');
	player = game.add.sprite(20, game.world.height - 70, 'laika');
	
	everyCreate();

	player.body.gravity.y = 3000;
	
	//stateLoad('states/neptune.json', platforms, aliens);
    
    //add spaceship
    spaceship = game.add.sprite(2300, 500, 'spaceship');
	game.physics.arcade.enable(spaceship);
	spaceship.enableBody = true;
},

update: function() {
	everyUpdate();
	game.physics.arcade.overlap(player, spaceship, this.spaceshipLeave, null, this);
},

spaceshipLeave: function() {
	console.log('Got to spaceship!');
	planetsUnlocked = Math.max(planetsUnlocked, 4);
	game.state.start('solarSystem');
}

}
