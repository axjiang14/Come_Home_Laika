var main = document.createElement('script');
main.src = 'main.js';
document.head.appendChild(main);

var plutoState = {
preload: function() {
	everyPreload();
},

create: function() {
	game.add.sprite(0, 0, 'background');
	player = game.add.sprite(20, game.world.height - 70, 'laika');
	
	everyCreate();
	
	player.body.gravity.y = 900;

    // Add health
    var healthKit1 = healthKits.create(700, 330, 'healthKit')
    healthKit1.body.gravity.y = 900;
    var healthKit2 = healthKits.create(700, 110, 'healthKit')
    healthKit2.body.gravity.y = 900;
    
	stateLoad('states/pluto.json', platforms, aliens);   
    
	// Add spaceship exit
	spaceship = game.add.sprite(720, 178, 'spaceship');
	game.physics.arcade.enable(spaceship);
	spaceship.enableBody = true;
},

update: function()
{
	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(aliens, platforms);
	game.physics.arcade.collide(healthKits, platforms);
	game.physics.arcade.collide(aliens, aliens);
	game.physics.arcade.overlap(player, spaceship, this.spaceshipLeave, null, this);
	game.physics.arcade.overlap(bullets, platforms, killBullet, null, this);
	game.physics.arcade.overlap(player, aliens, collectAlien, null, this);
	game.physics.arcade.overlap(player, alienBullets, killPlayer, null, this);
    game.physics.arcade.overlap(player, healthKits, healthRestore, null, this);
	game.physics.arcade.overlap(bullets, aliens, killaliens, null, this); // kill alien when hit by bullet
	game.physics.arcade.overlap(alienBullets, platforms, killBullet, null, this);
    
	player.body.velocity.x = 0;
	
	if(qKey.isDown) {
		console.log('q key pressed');
		//stateLoad('assets/state_test.json', null, null);
		game.state.start('neptuneState');
	}
	
	if(leftKey.isDown)
	{
		player.body.velocity.x = -300; // can be gravity
		player.animations.play('left');
	}
	else if(rightKey.isDown)
	{
		player.body.velocity.x = 300; // can be gravity
		player.animations.play('right');
	}
	else
	{
		player.animations.stop();
		player.frame = 4;
	}
	if(upKey.isDown && player.body.touching.down)
	{
		player.body.velocity.y = - 600; //some what like gravitiy
	}
	
	for(var i = 0; i < aliens.length; ++i)
	{
		var enemy = aliens.getChildAt(i);
		handle_alien(player, enemy, alienBullets);
	}
	
    weapon.rotation = game.physics.arcade.angleToPointer(weapon);
    if (game.input.activePointer.isDown) {
        fire();
    }
    
    handleAlienBullets(alienBullets);
    
	scoreText.text = 'Score: ' + score;
},

spaceshipLeave: function() {
	console.log('Got to spaceship!');
	planetsUnlocked = Math.max(planetsUnlocked, 1);
	console.log('planetsUnlocked=', planetsUnlocked);
	game.state.start('solarSystem');
}

}// main state
