var mainState = {
preload: function()
{
	game.load.image('background', 'assets/background.png');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('alien', 'assets/alien.png');
	game.load.image('diamond', 'assets/diamond.png');
	game.load.spritesheet('laika', 'assets/laika.png', 25, 32);
    game.load.image('bullet', 'assets/star.png'); // we will use firstaid for now since we don't have bullet photo.
    game.load.image('weapon', 'assets/firstaid.png');  // lets use my robot as barrel.
    game.load.audio('bgm', 'assets/spaceBGM.mp3');

},

create: function()
{  

    //  We're going to be using physics, so enable the Arcade Physics system
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//  A simple background for our game
	game.add.sprite(0, 0, 'background');

	//  The platforms group contains the ground and the 2 ledges we can jump on
	platforms = game.add.group();

	//  We will enable physics for any object that is created in this group
	platforms.enableBody = true;

	// Here we create the ground.
	var ground = platforms.create(0, game.world.height - 10, 'ground');
    
	//  Scale it to fit the width of the game (the original sprite is 400x32 in size)
	ground.scale.setTo(2, 2);

	//  This stops it from falling away when you jump on it
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
	
    
    bullets = game.add.group();// bullets shuld be first because it should be behind the player
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(300, 'bullet'); // NUMBER OF BULLETS ALLOWED;
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true); // if bullets leave the bounds, don't cound them. (THIS HAS TO DISAPPEAR WHEN WE LIMIT THE BULLET COUNTS)

    
    
    
	player = game.add.sprite(100, game.world.height - 150, 'laika');
	game.physics.arcade.enable(player);
	player.body.bounce.y = 0;
	player.body.gravity.y = 1800;
	
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);
	
    
    weapon = game.add.sprite(player.x, player.y, 'weapon');
    weapon.scale.setTo(0.8);
    weapon.anchor.setTo(0.3, 0.5); // spawn weapon
    weapon.reset(player.x,player.y);
    
    
    
	scoreText = game.add.text(64, 16, 'Score: 0', {fontSize: '32px'});
	ticksText = game.add.text(600, 16, 'Ticks: ', {fontSize: '32px'});
	spawnTicksText = game.add.text(600, 64, 'spawnTicks: ', {fontSize: '32px'});
	
	cursors = game.input.keyboard.createCursorKeys();
    //wasd
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    
	
	aliens = game.add.group();
	aliens.enableBody = true;
	
	diamonds = game.add.group();
	diamonds.enableBody = true;
    
},

update: function()
{
	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(aliens, platforms);
	game.physics.arcade.collide(diamonds, platforms);
	game.physics.arcade.overlap(player, aliens, collectAlien, null, this);
	game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this);
	game.physics.arcade.overlap(bullets, aliens, killaliens, null, this); // kill alien when hit by bullet
    
    
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
	
	if(--spawnTicks <= 0)
	{
		for(var i = 0; i < 1; ++i)
		{
			var alien = aliens.create(10 + Math.random() * 780, 0, 'alien');
			alien.body.velocity.y = 100 + ticks / 100;
			alien.body.gravity.y = 100 + ticks / 100;
			alien.falling = true;
			alien.waitTicks = 35;
		}
		
		spawnTicks = Math.floor(45 * Math.pow(Math.E, -1 * ticks / 5000)) + 5;
	}
	for(var i = 0; i < aliens.length; ++i)
	{
		alien = aliens.getChildAt(i);
		if(alien.body.velocity.y == 0)
			alien.falling = false;
		if(alien.falling == false)
			--alien.waitTicks;
		if(alien.waitTicks <= 0)
			alien.kill()
	}
	
	if(ticks % 400 == 50 && ticks > 50)
	{
		var diamond = diamonds.create(10 + Math.random() * 780, 0, 'diamond');
		diamond.body.velocity.y = 50;
		diamond.body.gravity.y = 100;
		diamond.falling = true;
		diamond.waitTicks = 150;
	}
	for(var i = 0; i < diamonds.length; ++i)
	{
		diamond = diamonds.getChildAt(i);
		if(diamond.body.velocity.y == 0)
			diamond.falling = false;
		if(diamond.falling == false)
			--diamond.waitTicks;
		if(diamond.waitTicks <= 0)
			diamond.kill()
	}
	
    weapon.rotation = game.physics.arcade.angleToPointer(weapon);
    if (game.input.activePointer.isDown) {
        this.fire();
    }

    
    
    
    
	scoreText.text = 'Score: ' + score;
	spawnTicksText.text = 'spawnTicks: ' + (Math.floor(45 * Math.pow(Math.E, -1 * ticks / 5000)) + 5);
},// update function

fire: function() {
    if (game.time.now > nextFire) {
        nextFire = game.time.now +fireRate;
        console.log('firing');
        var bullet = bullets.getFirstDead();
        bullet.reset(player.x, player.y);

        game.physics.arcade.moveToPointer(bullet, bulletSpeed); //we should use same velocity for all planets
        bullet.rotation = game.physics.arcade.angleToPointer(bullet);
    }
}

}// main state