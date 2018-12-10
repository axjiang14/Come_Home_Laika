function handlePlayer() {
	player.body.bounce.y = Math.max(0, player.body.bounce.y - 0.01);
	
	// Handle player speed restore
	var delta = playerSpeedMax - playerSpeed;
	playerSpeed += .01 * delta;
	
	if(--player.onFire >= 0) {
		player.hp *= 0.999;
		colorHPBar(player.hp / 10, player.hpBox);
	}
}

function fire() {
	if(this.game != null && game.time.now > nextFire) {
		nextFire = game.time.now + fireRate;
		/*var bullet = bullets.create(player.x + 12, player.y + 18, 'bullet');
		game.physics.arcade.moveToPointer(bullet, bulletSpeed);*/
		var bullet = new PlayerBullet(player.x + 12, player.y + 18, 'bullet', null, null);
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

function colorHPBar(hpPct, hpBar) {
    //hpPct % of hp left
	// Calculate RGB values for hp bar
    hpPct10 = hpPct*10;
	var red = Math.max(66, Math.min(226, /*386*/330 - 32 * hpPct10));
	var green = Math.max(20, Math.min(255, 20 + 47 * hpPct10));
	var blue = Math.max(20, Math.min(66, 20 + 5 * hpPct10));

	console.log('red:', red, 'green:', green, 'blue:', blue);
	
	var tint = red << 16 | green << 8 | blue;

	
	hpBar.tint = tint;
	hpBar.scale.setTo(hpBar.maxScaleX * hpPct, hpBar.scale.y);
}

function onPlayerHit() {	
	player.body.bounce.y = 1;
	player.body.velocity.y -= 300;
	
	colorHPBar(player.hp / 10, player.hpBox);
}

function alienCallbackAux(alien, platform) {
	if(alien.alienParent.onCollide)
		alien.alienParent.onCollide(platform);
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


function everyCreate() {
    game.world.setBounds(0 , 0, 2400, 600);
	game.physics.startSystem(Phaser.Physics.ARCADE);
    game.sound.stopAll(); // fresh start
    
    ticks = 0;
    
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
    
    var style = { font: "bold 24px Arial Rounded Mt", fill: "#ffffff", align: "left" };
    uiBar = game.add.sprite(0, 0, 'uiBar');
    uiBar.fixedToCamera = true;
    
    player.infoSheetNum = 0; //collect to escape
    player.hp = 10;//savedHP; //has to go through Pluto to declare hp = 10
	player.hpBox = game.add.sprite(200, 5, 'white_tile');
	player.hpBox.maxScaleX = 10;
	player.hpBox.scale.setTo(player.hpBox.maxScaleX, 1);
	player.hpBox.tint = 0x20ff00;
    player.hpBox.fixedToCamera = true;
    colorHPBar(player.hp / 10, player.hpBox);
    
    playerHPtext = game.add.text(280, 4, 'HP: ', style)
    playerHPtext.fixedToCamera = true;
	
	scoreText = game.add.text(16, 4, 'Score: 0', style);
    scoreText.fixedToCamera = true;
    
    infoIcon = game.add.sprite(490,2, 'infoSheet');
    infoIcon.scale.setTo(0.9,0.9);
    infoIcon.fixedToCamera = true;
    infoText = game.add.text(520, 4, ': 0', style);
    infoText.fixedToCamera = true;
    
    
    timeText = game.add.text(650, 4, 'Time: 0', style);
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
	escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    
    
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
    collectBGM = game.add.audio('collectBGM');
    healthBGM = game.add.audio('healthBGM');
    sadTromboneBGM = game.add.audio('sadTromboneBGM');
    impactBGM = game.add.audio('impactBGM');
    bigImpactBGM = game.add.audio('bigImpactBGM');
    warningBGM = game.add.audio('warningBGM');
    plutoBGM = game.add.audio('plutoBGM');
    neptuneBGM = game.add.audio('neptuneBGM');
    uranusBGM = game.add.audio('uranusBGM');
    saturnBGM = game.add.audio('saturnBGM');
    jupiterBGM = game.add.audio('jupiterBGM');
    marsBGM = game.add.audio('marsBGM');
    mercuryBGM = game.add.audio('mercuryBGM');
    venusBGM = game.add.audio('venusBGM');
    earthBGM = game.add.audio('earthBGM');
    finalBossBGM = game.add.audio('finalBossBGM');
}

function everyUpdate() {

	// Pause lol
	console.log(escKey.isDown);
	if(escKey.isDown) {
		game.physics.isPaused = !game.physics.isPaused;
	}

	++ticks;
	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(aliens, platforms, alienCallbackAux);
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
        game.sound.stopAll();
        game.state.start('solarSystem');
    }
    if(qKey.isDown){
    	game.state.start('finalState');
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
	playerHPtext.text = 'HP: ' + Math.round(player.hp *100) /100;
    infoText.text = ': ' + player.infoSheetNum;
//	bulletText.text = 'Bullets: ' + bullets[1];
	timeText.text = 'Time: ' + Math.round((ticks/3500) * 60) *100/100;
	
}

