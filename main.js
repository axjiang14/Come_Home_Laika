var Alien1 = class {

	constructor(x, y) {
		this.x = x * 24;
		this.y = y * 24 - 12;
		this.spritesheet = 'alien1';
		
		this.phaserObj = _aliens.create(this.x, this.y, this.spritesheet);
		this.sightLine = new Phaser.Line(0, 0, 0, 0);
		
		this.hasSight = false; /// Can we see the player?
		this.grounded = 0; // # of ticks to stay still for
		this.shootTicks = 0; // # of ticks before we shoot
	}
	
	handle() {
		// Get distance b/w this alien and the player
		var px = player.body.x;
		var py = player.body.y;
		var distance = Phaser.Math.distance(px, py, this.x, this.y);
		
		this.sightLine.start.x = px;
		this.sightLine.start.y = py;
		this.sightLine.end.x = this.x;
		this.sightLine.end.y = this.y;
		
		var intersectsAny = false;
		var slTmp = this.sightLine;
		platforms.forEach(function(platform) {
			intersectsAny |= Phaser.Line.intersectsRectangle(slTmp, platform);
		});
		
		this.hasSight = !intersectsAny;
		var tint = this.hasSight != 0 ? 'lime' : 'red';
		game.debug.geom(this.sightLine, tint, this.hasSight);
	}
}

function handlePlayer() {
	player.body.bounce.y = Math.max(0, player.body.bounce.y - 0.01);
}

function fire() {
    if(this.game != null && game.time.now > nextFire) {
        nextFire = game.time.now + fireRate;
    	var bullet = bullets.create(player.x + 12, player.y + 18, 'bullet');
    	game.physics.arcade.moveToPointer(bullet, bulletSpeed);
    }
}

function handle_alien(player, alien, alienBullets) {
	px = player.body.x;
	py = player.body.y;
	ax = alien.body.x;
	ay = alien.body.y;
	
	var distance = Phaser.Math.distance(px, py, ax, ay);
	if(distance <= 250 && alien.shoot_ticks <= 0) {
		alien.shoot_ticks = 300;
			
		var bullet = alienBullets.create(ax + 16, ay + 16, 'bullet');
		bullet.liveTicks = 30;
		game.physics.arcade.moveToXY(bullet, px + 20, py + 20, bulletSpeed / 2);
		bullet.rotation = game.physics.arcade.angleToXY(bullet, px, py, game.world);
		alien.grounded = 100;
	}
	else {
		if(alien.grounded <= 0) {
			alien.grounded = 200 + Math.random() * 100;
			
			//console.log('Alien wants to move in:', alien.grounded, 'ticks.');
			
			alien.move = 100;
			alien.body.velocity.x = 75 + 50 * Math.random();
			
			// Flip a coin to go right/left
			direction = Math.random() > 0.5 ? -1 : 1
            alien.animations.add('left', [0, 1, 2, 3], 10, true);
            alien.animations.add('right', [5, 6, 7, 8], 10, true);
            
            //console.log(direction);
            
			alien.body.velocity.x *= direction;
            if (direction == 1){
                alien.animations.play('right')
            }
            else {
                alien.animations.play('left')
            }
		}
	}
	if(--alien.move <= 0)
	{
		alien.body.velocity.x = 0;
		alien.animations.stop();
	}
	
	--alien.shoot_ticks;
	--alien.grounded;
	
	//console.log('ax is:', ax);
	//console.log('alien.min_x is:', alien.min_x);
	if(ax <= alien.min_x) {
		//console.log('Alien got away!');
		alien.body.velocity.x = Math.max(0, alien.body.velocity.x);
	}
	if(ax >= alien.max_x) {
		alien.body.velocity.x = Math.min(0, alien.body.velocity.x);
	}
}

function handleAlienBullets(alienBullets) {
	alienBullets.forEach(function(bullet) {
		if(--bullet.liveTicks <= 0){
			bullet.destroy();
		}
	});
}

function onPlayerHit() {
	--player.hp;
	if(player.hp >= 10) {
		player.hpBox.tint = 0x20ff00;
		player.hp = 10;
	}
	
	player.body.bounce.y = 1;
	player.body.velocity.y = -300;
	
	//console.log('player hp is now:' + player.hp);
	player.hpBox.scale.setTo(player.hp, 1);
	
	// Do pretty hp box coloring
	var red = Math.max(0x42, Math.min(0xff - 0xff * (5 - player.hp) / 10, 0xff));
	//console.log('red:', (red).toString(16));
	red <<= 16;
	var green = 0xff * player.hp / 10;
	//console.log('green:', (green).toString(16));
	green <<= 8;
	var blue = 0x000000;
	//console.log('set color to:', (red | green | blue).toString(16));
	player.hpBox.tint = red | green | blue;
	if(player.hp >= 10){
		player.hpBox.tint = 0x20ff00;
		player.hp = 10;
    }
}

function stateLoad(filename) {
	var rawFile = new XMLHttpRequest();
	var allText;
	rawFile.open("GET", filename, false);
	rawFile.onreadystatechange = function ()
	{
		if(rawFile.readyState === 4)
		{
			if(rawFile.status === 200 || rawFile.status == 0)
			{
				allText = rawFile.responseText;
			}
		}
	}
	rawFile.send(null);
	
	var data = JSON.parse(allText);
	
	if(data.laika) {
		player.x = data.laika.x * 24;
		player.y = data.laika.y * 24 - 24;
		console.log('putting player at:', player.x, player.y);
	}
	
	if(data.spaceship) {
		// Add spaceship exit
		spaceship = game.add.sprite(data.spaceship.x * 24, data.spaceship.y * 24 - 40, 'spaceship');
		game.physics.arcade.enable(spaceship);
		spaceship.enableBody = true;
	}
	
	data.aliens.forEach(function(a) {
		var alien = new Alien1(a.x, a.y);
		aliens.push(alien);
		//var alien = aliens.create(a.x * 24, a.y * 24 - 12, a.sprite);
		//alien.body.gravity.y = 1800;
		//alien.shoot_ticks = 0;
		//alien.grounded = 0;
		//alien.animations.add('left', [0, 1, 2, 3], 10, true);
		//alien.animations.add('right', [5, 6, 7, 8], 10, true);
		
		//alien.min_x = a.min_x * 24;
		//alien.max_x = a.max_x * 24;
	});
	
	data.tiles.forEach(function(tile) {
		var platform = platforms.create(tile.x * 24, tile.y * 24, tile.sprite);
		platform.enableBody = true;
		platform.body.immovable = true;
	});
	
	data.healthKits.forEach(function(healthKit) {
		var healthKit = healthKits.create(healthKit.x * 24, healthKit.y * 24 - 8, 'healthKit');
		healthKit.body.gravity.y = 900;
		healthKit.enableBody = true;
	});
}

function everyPreload() {
	game.load.image('background', 'assets/BGPluto.png');
	game.load.image('neptuneBackground', 'assets/NeptuneBackground_test.png');
    game.load.image('uranusBackground', 'assets/BGUranus.png');
    game.load.image('saturnBackground', 'assets/BGSaturn.png');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('platform_tile', 'assets/DPlatformS.png');
	game.load.image('tile_light', 'assets/LPlatformS.PNG');
	game.load.spritesheet('alien1', 'assets/Alien1.png', 32, 40);
    game.load.spritesheet('alien2', 'assets/LongAlien.png', 32, 48);
	game.load.image('diamond', 'assets/diamond.png');
	game.load.spritesheet('laika', 'assets/laika.png', 32, 48);
    game.load.image('bullet', 'assets/Beam-Pink.png');
    game.load.image('healthKit', 'assets/firstaid.png');  
    game.load.audio('bgm', 'assets/spaceBGM.mp3');
	game.load.image('white_tile', 'assets/white_rect.png');
	game.load.image('spaceship', 'assets/Spaceship.PNG');
	game.load.image('crosshair', 'assets/crosshair.png');
}

function everyCreate() {

	game.physics.startSystem(Phaser.Physics.ARCADE);

	platforms = game.add.group();
	platforms.enableBody = true;

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(300, 'bullet'); // NUMBER OF BULLETS ALLOWED;
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
	
	game.physics.arcade.enable(player);
    //player.body.collideWorldBounds= true;
	game.camera.follow(player);
	player.body.bounce.y = 0;
	
	// User Interface
    player.hp = 10;
	player.hpBox = game.add.sprite(200, 18, 'white_tile');
	player.hpBox.scale.setTo(10, 1);
	player.hpBox.tint = 0x20ff00;
    player.hpBox.fixedToCamera = true;
    
    playerHPtext = game.add.text(280, 16, 'HP: ', '16px')
    playerHPtext.fixedToCamera = true;
	
	scoreText = game.add.text(16, 16, 'Score: 0', {fontSize: '32px'});
    scoreText.fixedToCamera = true;
    
    bulletText = game.add.text(500, 16, 'Bullets: ', '16px');
    bulletText.fixedToCamera = true;
    
    timeText = game.add.text(650, 16, 'Time: ', '16px');
    timeText.fixedToCamera = true;
    
    //
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);
	
    weapon = game.add.sprite(player.x, player.y, 'weapon');
    weapon.scale.setTo(.8);
    weapon.anchor.setTo(player.x, player.y); // spawn weapon
    weapon.reset(player.x,player.y);
    
    crosshair = game.add.sprite(400, 300, 'crosshair');
	
	cursors = game.input.keyboard.createCursorKeys();
    //wasd
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    
	aliens = []
	_aliens = game.add.group();
	_aliens.enableBody = true;
	
    healthKits = game.add.group();
    healthKits.enableBody = true;
    
	alienBullets = game.add.group();
	alienBullets.enableBody = true;
    alienBullets.physicsBodyType = Phaser.Physics.ARCADE;
    alienBullets.setAll('checkWorldBounds', true);
    alienBullets.setAll('outOfBoundsKill', true);
}

function everyUpdate() {
	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(_aliens, platforms);
	game.physics.arcade.collide(healthKits, platforms);
	game.physics.arcade.collide(_aliens, _aliens);
	
    game.physics.arcade.overlap(bullets, platforms, killBullet, null, this);
	game.physics.arcade.overlap(player, _aliens, collectAlien, null, this);
	game.physics.arcade.overlap(player, alienBullets, killPlayer, null, this);
    game.physics.arcade.overlap(player, healthKits, healthRestore, null, this);
	game.physics.arcade.overlap(bullets, _aliens, killaliens, null, this); // kill alien when hit by bullet
	game.physics.arcade.overlap(alienBullets, platforms, killBullet, null, this);
    
	player.body.velocity.x = 0;
	handlePlayer();
	crosshair.x = game.input.x - 2 + game.camera.x;
	crosshair.y = game.input.y - 7 + game.camera.y;
	
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
	
	/*aliens.forEach(function(enemy) {
		handle_alien(player, enemy, alienBullets);
	});*/
	aliens.forEach(function(alien) {
		alien.handle();
	});
	
    weapon.rotation = game.physics.arcade.angleToPointer(weapon);
    if (game.input.activePointer.isDown) {
        fire();
    }
    
    handleAlienBullets(alienBullets);
    
	scoreText.text = 'Score: ' + score;
    playerHPtext.text = 'HP: ' + player.hp;
//    bulletText.text = 'Bullets: ' + bullets[1];
//    timeText.text = 'Time: ' + ticks;
    
}

