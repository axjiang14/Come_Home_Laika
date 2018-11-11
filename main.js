function handlePlayer() {
	player.body.bounce.y = Math.max(0, player.body.bounce.y - 0.01);
	
	// Handle player speed restore
	var delta = playerSpeedMax - playerSpeed;
	playerSpeed += .01 * delta;
	
	if(--player.onFire >= 0) {
		player.hp *= 0.999;
		colorHPBar();
	}
}

function fire() {
	if(this.game != null && game.time.now > nextFire) {
		nextFire = game.time.now + fireRate;
		var bullet = bullets.create(player.x + 12, player.y + 18, 'bullet');
		game.physics.arcade.moveToPointer(bullet, bulletSpeed);
        gunBGM.play();
	}
}

function handleAlienBullets() {
	alienBullets.forEach(function(bullet) {
		if(--bullet.liveTicks <= 0){
			bullet.destroy();
		}
		
		if(bullet.bulletObj) {
			bullet.bulletObj.handle();
		}
	});
}

function colorHPBar() {
	// Calculate RGB values for hp bar
	var red = Math.max(66, Math.min(226, /*386*/330 - 32 * player.hp));
	var green = Math.max(20, Math.min(255, 20 + 47 * player.hp));
	var blue = Math.max(20, Math.min(66, 20 + 5 * player.hp));
	//console.log('red:', red, 'green:', green, 'blue:', blue);
	
	var tint = red << 16 | green << 8 | blue;
	
	player.hpBox.tint = tint;
	player.hpBox.scale.setTo(player.hp, 1);
}

function onPlayerHit() {	
	player.body.bounce.y = 1;
	player.body.velocity.y -= 300;
	
	colorHPBar();
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
	}
	
	// Add spaceship exit
	if(data.spaceship) {
		spaceship = game.add.sprite(data.spaceship.x * 24, data.spaceship.y * 24 - 40, 'spaceship');
		game.physics.arcade.enable(spaceship);
		spaceship.enableBody = true;
	}
	
	// Create Aliens
	data.aliens.forEach(function(a) {
		var alien;
		switch(a.sprite) {
			case 'alien1':
				alien = new Alien1(a.x, a.y);
				break;
			case 'alien2':
				alien = new Alien2(a.x, a.y);
				break;
            case 'alien3':
				alien = new Alien3(a.x, a.y);
				break;
            case 'alien4':
				alien = new Alien4(a.x, a.y);
				break;
			case 'alien6':
				alien = new Alien6(a.x, a.y);
				break;
			default:
				break;
		}
		alien.min_x = a.min_x * 24;
		alien.max_x = a.max_x * 24;
		//aliens.push(alien);
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
    
    data.infoSheets.forEach(function(infoSheet) {
		var infoSheet = infoSheets.create(infoSheet.x * 24, infoSheet.y * 24 - 8, 'infoSheet');
		infoSheet.body.gravity.y = 900;
		infoSheet.enableBody = true;
	});
    
}

function everyPreload() {
	game.load.image('background', 'assets/BGPluto.png');
	game.load.image('neptuneBackground', 'assets/NeptuneBackground_test.png');
	game.load.image('uranusBackground', 'assets/BGUranus.png');
	game.load.image('saturnBackground', 'assets/BGSaturn.png');
    game.load.image('jupiterBackground', 'assets/BGJupiter.png');
    game.load.image('marsBackground', 'assets/BGMars.png');
    game.load.image('venusBackground', 'assets/BGVenus.png');
    game.load.image('mercuryBackground', 'assets/BGMercury.png');
    game.load.image('earthBackground', 'assets/BGEarth.png');
    
	game.load.image('ground', 'assets/platform.png');
	game.load.image('platform_tile', 'assets/DPlatformS.png');
	game.load.image('tile_light', 'assets/LPlatformS.PNG');
    
	game.load.spritesheet('alien1', 'assets/AlienBasic.png', 32, 40);
	game.load.spritesheet('alien2', 'assets/AlienLong.png', 32, 48);
    game.load.spritesheet('alien3', 'assets/AlienBouncy.png', 32, 48);
    game.load.spritesheet('alien4', 'assets/AlienFlame.png', 32, 48);
    game.load.spritesheet('alien5', 'assets/AlienSpaceship.png', 32, 32);
    game.load.spritesheet('alien6', 'assets/AlienFlying.png', 48, 48);
    game.load.spritesheet('boss1', 'assets/BossBasic.png', 60, 64);
    game.load.spritesheet('bossSquid', 'assets/BossSquid.png', 51, 96);
	game.load.spritesheet('laika', 'assets/laika.png', 32, 48);
    
	game.load.image('bullet', 'assets/Beam-Pink.png');
    game.load.image('flame', 'assets/Beam-Fire.png');
    game.load.image('ice', 'assets/Beam-Ice.png');
    
    game.load.image('infoSheet', 'assets/diamond.png');// need to be changed to InformationSheet.
	game.load.image('healthKit', 'assets/firstaid.png');
	
	game.load.image('white_tile', 'assets/white_rect.png');
	game.load.image('spaceship', 'assets/Spaceship.PNG');
	game.load.image('crosshair', 'assets/crosshair.png');
    
    
    game.load.audio('gunBGM', 'assets/BackGroundMusic/gunBGM.mp3');
    game.load.audio('spaceBGM', 'assets/BackGroundMusic/SpaceBGM.mp3');
    game.load.audio('buttonBGM', 'assets/BackGroundMusic/buttonBGM.mp3');
    game.load.audio('successBGM', 'assets/BackGroundMusic/starBGM.wav');
}

function everyCreate() {
    game.world.setBounds(0 , 0, 2400, 600);
	game.physics.startSystem(Phaser.Physics.ARCADE);
    game.sound.stopAll(); // fresh start
    
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
    
    var style = { font: "bold 32px Arial Rounded Mt", fill: "#000000", align: "left" };
    
    player.infoSheetNum = 0; //collect to escape
    player.hp = savedHP; //has to go through Pluto to declare hp = 10
	player.hpBox = game.add.sprite(200, 19, 'white_tile');
	player.hpBox.scale.setTo(10, 1);
	player.hpBox.tint = 0x20ff00;
    player.hpBox.fixedToCamera = true;
    
    playerHPtext = game.add.text(280, 16, 'HP: ', style)
    playerHPtext.fixedToCamera = true;
	
	scoreText = game.add.text(16, 16, 'Score: 0', style);
    scoreText.fixedToCamera = true;
    
    bulletText = game.add.text(500, 16, 'Bullets: ', style);
    bulletText.fixedToCamera = true;
    
    timeText = game.add.text(650, 16, 'Time: ', style);
    timeText.fixedToCamera = true;
    
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);
	
	crosshair = game.add.sprite(400, 300, 'crosshair');
	
	cursors = game.input.keyboard.createCursorKeys();
	//wasd
	leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
	rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
	upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
	qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    pKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
    
    
	//aliens = []
	aliens = game.add.group();
	aliens.enableBody = true;
	
	healthKits = game.add.group();
	healthKits.enableBody = true;
    
    infoSheets = game.add.group();
    infoSheets.enableBody = true;
	
	alienBullets = game.add.group();
	alienBullets.enableBody = true;
	alienBullets.physicsBodyType = Phaser.Physics.ARCADE;
	alienBullets.setAll('checkWorldBounds', true);
	alienBullets.setAll('outOfBoundsKill', true);
    
    //audio
    gunBGM = game.add.audio('gunBGM');
    successBGM = game.add.audio('successBGM');
}

function everyUpdate() {
	++ticks;
	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(aliens, platforms);
	game.physics.arcade.collide(healthKits, platforms);
	game.physics.arcade.collide(infoSheets, platforms);
	game.physics.arcade.collide(aliens, aliens);
	
	game.physics.arcade.overlap(bullets, platforms, killBullet, null, this);
	game.physics.arcade.overlap(alienBullets, platforms, killBullet, null, this);
	game.physics.arcade.overlap(player, aliens, collectAlien, null, this);
	game.physics.arcade.overlap(player, alienBullets, killPlayer, null, this);
	game.physics.arcade.overlap(player, healthKits, healthRestore, null, this);
	game.physics.arcade.overlap(player, infoSheets, collectInfoSheets, null, this);
	
    game.physics.arcade.overlap(bullets, aliens, killaliens, null, this); // kill alien when hit by bullet
	
	player.body.velocity.x = 0;
	handlePlayer();
	crosshair.x = game.input.x - 2 + game.camera.x;
	crosshair.y = game.input.y - 7 + game.camera.y;
	
	if(leftKey.isDown)
	{
		player.body.velocity.x = -playerSpeed;
		player.animations.play('left');
	}
	else if(rightKey.isDown)
	{
		player.body.velocity.x = playerSpeed;
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
	
    if(pKey.isDown){
        game.state.start('solarSystem');
    }
    if(qKey.isDown){
    	game.state.start('debugState');
    }
    
	if (game.input.activePointer.isDown) {
		fire();
	}
	
	aliens.forEach(function(alien) {
		alien.alienParent.handle();
	});
	
	alienBullets.forEach(function(bullet) {
		bullet.bulletObj.handle();
	});
	
	scoreText.text = 'Score: ' + score;
	playerHPtext.text = 'HP: ' + player.hp;
//	bulletText.text = 'Bullets: ' + bullets[1];
	timeText.text = 'Time: ' + ticks;
	
}

