var main = document.createElement('script');
main.src = 'main.js';
document.head.appendChild(main);

var plutoState = {
preload: function() {
	game.load.image('background', 'assets/Background.png');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('platform_tile', 'assets/DPlatformS.png');
	game.load.spritesheet('alien', 'assets/Alien2.png', 32, 44);
	game.load.image('diamond', 'assets/diamond.png');
	game.load.spritesheet('laika', 'assets/laika.png', 32, 48);
    game.load.image('bullet', 'assets/Beam-Pink.PNG');
//    game.load.image('weapon', 'assets/firstaid.png');  
    game.load.audio('bgm', 'assets/spaceBGM.mp3');
	game.load.image('white_tile', 'assets/white_rect.png');
	game.load.image('spaceship', 'assets/Spaceship.PNG')
},

create: function() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	game.add.sprite(0, 0, 'background');

	platforms = game.add.group();
	platforms.enableBody = true;

	var ground = platforms.create(0, game.world.height - 10, 'ground');
	ground.scale.setTo(2, 2);
	ground.body.immovable = true;
	ground.tint = 0xff00ff;
    
    
    
	//  Walls
	for(var i = 0; i < 20; ++i)
	{
		var l_wall = platforms.create(-400, i * 30, 'ground');
		l_wall.enableBody = true;
		l_wall.body.immovable = true;
		l_wall.tint = 0xff00ff;
		
		var r_wall = platforms.create(800, i * 30, 'ground');
		r_wall.enableBody = true;
		r_wall.body.immovable = true;
		r_wall.tint = 0xff00ff;
	}
	
	// Make the actual map
	for(var i = 0; i < 20; ++i)
	{
		var tile = platforms.create(i * 24, 500, 'platform_tile');
		//tile.scale.setTo(1, 1);
		tile.enableBody = true;
		tile.body.immovable = true;
	}
	for(var i = 0; i < 12; ++i)
	{
		var tile = platforms.create(512 + i * 24, 420, 'platform_tile');
		tile.scale.setTo(1, 1);
		tile.enableBody = true;
		tile.body.immovable = true;
	}
	for(var i = 0; i < 10; ++i)
	{
		var tile = platforms.create(i * 24, 420, 'platform_tile');
		//tile.scale.setTo(1, 0.25);
		tile.enableBody = true;
		tile.body.immovable = true;
	}
	for(var i = 0; i < 5; ++i)
	{
		var tile = platforms.create(i * 24, 340, 'platform_tile');
		//tile.scale.setTo(1, 0.25);
		tile.enableBody = true;
		tile.body.immovable = true;
	}
	for(var i = 0; i < 5; ++i)
	{
		var tile = platforms.create(120 + i * 24, 252, 'platform_tile');
		//tile.scale.setTo(1, 0.25);
		tile.enableBody = true;
		tile.body.immovable = true;
	}
	for(var i = 0; i < 5; ++i)
	{
		var tile = platforms.create(i * 24, 180, 'platform_tile');
		//tile.scale.setTo(1, 0.25);
		tile.enableBody = true;
		tile.body.immovable = true;
	}
	for(var i = 0; i < 10; ++i)
	{
		var tile = platforms.create(240 + i * 24, 180, 'platform_tile');
		//tile.scale.setTo(1, 0.25);
		tile.enableBody = true;
		tile.body.immovable = true;
	}
	for(var i = 0; i < 6; ++i)
	{
		var tile = platforms.create(216, 180 + i * 24, 'platform_tile');
		//tile.scale.setTo(0.5, 1);
		tile.enableBody = true;
		tile.body.immovable = true;
	}
	for(var i = 0; i < 10; ++i)
	{
		var tile = platforms.create(560 + i * 24, 220, 'platform_tile');
		//tile.scale.setTo(1, 0.25);
		tile.enableBody = true;
		tile.body.immovable = true;
	}
	
    
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(300, 'bullet'); // NUMBER OF BULLETS ALLOWED;
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true); // if bullets leave the bounds, don't cound them. (THIS HAS TO DISAPPEAR WHEN WE LIMIT THE BULLET COUNTS)

   
    
    
	player = game.add.sprite(20, game.world.height - 70, 'laika');
	game.physics.arcade.enable(player);
	player.body.bounce.y = 0;
	player.body.gravity.y = 1800;
	
    
    
	// HP
	player.hp = 10;
	player.hpBox = game.add.sprite(300, 16, 'white_tile');
	player.hpBox.scale.setTo(10, 1);
	player.hpBox.tint = 0x20ff00;
	
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);
	
    
    weapon = game.add.sprite(player.x, player.y, 'weapon');
    weapon.scale.setTo(.8);
    weapon.anchor.setTo(player.x, player.y); // spawn weapon
    weapon.reset(player.x,player.y);
    
    
    
	scoreText = game.add.text(16, 16, 'Score: 0', {fontSize: '32px'});
	ticksText = game.add.text(600, 16, 'Ticks: ', {fontSize: '32px'});
	
	cursors = game.input.keyboard.createCursorKeys();
    //wasd
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    
	
	aliens = game.add.group();
	aliens.enableBody = true;
	
    
	alienBullets = game.add.group();
	alienBullets.enableBody = true;
    alienBullets.physicsBodyType = Phaser.Physics.ARCADE;
    alienBullets.setAll('checkWorldBounds', true);
    alienBullets.setAll('outOfBoundsKill', true);
	
	// Add enemies
	var enemy = aliens.create(500, game.world.height - 70, 'alien');
	enemy.body.gravity.y = 1800;
	enemy.shoot_ticks = 0;
	enemy.grounded = 0;
	enemy.animations.add('left', [0, 1], 10, true);
    enemy.animations.add('right', [2, 3], 10, true);
    
	// Add spaceship exit
	spaceship = game.add.sprite(800 - 64, 220 - 64, 'spaceship');
	game.physics.arcade.enable(spaceship);
	spaceship.enableBody = true;
},

update: function()
{
	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(aliens, platforms);
	game.physics.arcade.collide(diamonds, platforms);
	game.physics.arcade.overlap(player, spaceship, this.spaceshipLeave, null, this);
	game.physics.arcade.overlap(bullets, platforms, killBullet, null, this);
	game.physics.arcade.overlap(player, aliens, collectAlien, null, this);
	game.physics.arcade.overlap(player, alienBullets, killPlayer, null, this);
	game.physics.arcade.overlap(bullets, aliens, killaliens, null, this); // kill alien when hit by bullet
	game.physics.arcade.overlap(alienBullets, platforms, killBullet, null, this);
    
    
	player.body.velocity.x = 0;
	
	if(leftKey.isDown)
	{
		player.body.velocity.x = -300;
		player.animations.play('left');
	}
	else if(rightKey.isDown)
	{
		player.body.velocity.x = 300;
		player.animations.play('right');
	}
	else
	{
		player.animations.stop();
		player.frame = 4;
	}
	if(upKey.isDown && player.body.touching.down)
	{
		player.body.velocity.y = -600;
	}
	
	++ticks;
	ticksText.text = 'Ticks: ' +  ticks;
	
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
	planets_unlocked = Math.max(planetsUnlocked, 1);
	game.state.start('solarSystem');
}

}// main state
