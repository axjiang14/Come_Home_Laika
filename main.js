class Alien {
	constructor(x, y) {
		this.hasSight = false; /// Can we see the player?
		this.grounded = 0; // # of ticks to stay still for
		this.shootTicks = 0; // # of ticks before we shoot
		this.moveTicks = 0; // # of ticks to move for
		this.range = 250; // Our shooting range
	}
	
	handle() {
		// Decrement counters
		--this.grounded;
		--this.shootTicks;
		--this.moveTicks;
		
		// Set wrapper x/y to phaser object x/y
		this.x = this.phaserObj.x;
		this.y = this.phaserObj.y;
		
		// Stop moving
		if(this.moveTicks <= 0) {
			this.phaserObj.body.velocity.x = 0;
			this.phaserObj.animations.stop();
		}
	}
	
	move() {
		// Wait for 200-300 ticks before we move again
		this.grounded = 200 + Math.random() * 100;
		// Move for 100 ticks
		this.moveTicks = 100;
		// Move at a speed of 75-125
		this.phaserObj.body.velocity.x = 75 + 50 * Math.random();

		// Flip a coin to go right/left
		var direction = Math.random() > 0.5 ? -1 : 1

		this.phaserObj.body.velocity.x *= direction;
		if(direction == 1) {
			this.phaserObj.animations.play('right');
		}
		else {
			this.phaserObj.animations.play('left');
		}
	}
}

class Alien1 extends Alien {

	constructor(x, y) {
		super(x, y);
		this.x = x * 24;
		this.y = y * 24 - 16;
		this.spritesheet = 'alien1';
		
		this.phaserObj = _aliens.create(this.x, this.y, this.spritesheet);
		this.phaserObj.alienParent = this;
		this.sightLine = new Phaser.Line(0, 0, 0, 0);
		
		this.phaserObj.animations.add('left', [0, 1, 2, 3], 10, true);
		this.phaserObj.animations.add('right', [5, 6, 7, 8], 10, true);
	}
	
	handle() {
		super.handle();
		
		// Don't go past min/max x
		if(this.x <= this.min_x) {
			this.phaserObj.body.velocity.x = Math.max(0, this.phaserObj.body.velocity.x);
			this.phaserObj.animations.stop();
		}
		else if(this.x >= this.max_x) {
			this.phaserObj.body.velocity.x = Math.min(0, this.phaserObj.body.velocity.x);
			this.phaserObj.animations.stop();
		}
		
		// Get distance b/w this alien and the player
		var px = player.body.x;
		var py = player.body.y;
		var distance = Phaser.Math.distance(px, py, this.x, this.y);
		
		this.sightLine.start.x = px + 12;
		this.sightLine.start.y = py + 18;
		this.sightLine.end.x = this.x + 16;
		this.sightLine.end.y = this.y + 16;
		
		// Check if this alien's line of sight intersects any platforms
		var slTmp = this.sightLine;
		var intersectsAny = false;
		platforms.forEach(function(platform) {
			intersectsAny |= Phaser.Line.intersectsRectangle(slTmp, platform);
		});
		this.hasSight = !intersectsAny;
		
		// If we're in range and have sight:
		var inRange = distance < this.range;
		if(inRange && this.hasSight) {
			if(this.shootTicks <= 0) {
				console.log('I would like to shoot the player.');
				this.shootAtPlayer();
			}
		}
		// If we're not attacking, let's consider moving
		else {
			if(this.grounded <= 0) {
				console.log('I would like to move.');
				this.move();
			}
		}
		
		// Draw line-of-sight debug
		var tint = 'red';
		if(this.hasSight) {
			tint = 'yellow';
			if(inRange)
				tint = 'lime';
		}
		game.debug.geom(this.sightLine, tint, this.hasSight);
	}
	
	shootAtPlayer() {
		var bullet = alienBullets.create(this.x + 16, this.y + 16, 'bullet');
		bullet.liveTicks = 30;
		game.physics.arcade.moveToXY(bullet, player.x + 20, player.y + 20, bulletSpeed / 2);
		bullet.rotation = game.physics.arcade.angleBetween(bullet, player);
		
		// Alien reload timer
		this.shootTicks = 275 + Math.random() * 50;
		// Alien won't move
		this.grounded = 150;
	}
}

class Alien2 extends Alien {
	constructor(x, y) {
		super(x, y);
		this.x = x * 24;
		this.y = y * 24 - 24;
		this.spritesheet = 'alien2';
		
		this.phaserObj = _aliens.create(this.x, this.y, this.spritesheet);
		this.phaserObj.alienParent = this;
		this.sightLine = new Phaser.Line(0, 0, 0, 0);
		
		this.phaserObj.animations.add('left', [0, 1, 2, 3], 10, true);
		this.phaserObj.animations.add('right', [5, 6, 7, 8], 10, true);
		
		this.hasSight = false; /// Can we see the player?
		this.grounded = 0; // # of ticks to stay still for
		this.shootTicks = 0; // # of ticks before we shoot
		this.moveTicks = 0; // # of ticks to move for
		this.range = 250; // Our shooting range
	}
	
	handle() {
        super.handle();
		
		// Don't go past min/max x
		if(this.x <= this.min_x) {
			this.phaserObj.body.velocity.x = Math.max(0, this.phaserObj.body.velocity.x);
			this.phaserObj.animations.stop();
		}
		else if(this.x >= this.max_x) {
			this.phaserObj.body.velocity.x = Math.min(0, this.phaserObj.body.velocity.x);
			this.phaserObj.animations.stop();
		}
        
        if(this.grounded <= 0) {
				console.log('I would like to move.');
				this.move();
        }
		
	}
    
}

class Alien3 extends Alien {
	constructor(x, y) {
		super(x, y);
		this.x = x * 24;
		this.y = y * 24 - 24;
		this.spritesheet = 'alien3';
		
		this.phaserObj = _aliens.create(this.x, this.y, this.spritesheet);
		this.phaserObj.alienParent = this;
		this.sightLine = new Phaser.Line(0, 0, 0, 0);
		
		this.phaserObj.animations.add('left', [0, 1, 2, 3], 10, true);
		this.phaserObj.animations.add('right', [5, 6, 7, 8], 10, true);
		
		this.hasSight = false; /// Can we see the player?
		this.grounded = 0; // # of ticks to stay still for
		this.shootTicks = 0; // # of ticks before we shoot
		this.moveTicks = 0; // # of ticks to move for
		this.range = 250; // Our shooting range
	}
	
	handle() {
        super.handle();
		
		// Don't go past min/max x
		if(this.x <= this.min_x) {
			this.phaserObj.body.velocity.x = Math.max(0, this.phaserObj.body.velocity.x);
			this.phaserObj.animations.stop();
		}
		else if(this.x >= this.max_x) {
			this.phaserObj.body.velocity.x = Math.min(0, this.phaserObj.body.velocity.x);
			this.phaserObj.animations.stop();
		}
        
        if(this.grounded <= 0) {
				console.log('I would like to move.');
				this.move();
        }
	}
}

class Alien4 extends Alien {
	constructor(x, y) {
		super(x, y);
		this.x = x * 24;
		this.y = y * 24 - 24;
		this.spritesheet = 'alien4';
		
		this.phaserObj = _aliens.create(this.x, this.y, this.spritesheet);
		this.phaserObj.alienParent = this;
		
		this.phaserObj.animations.add('left', [0, 1, 2, 3], 10, true);
		this.phaserObj.animations.add('right', [5, 6, 7, 8], 10, true);
		
		this.grounded = 0; // # of ticks to stay still for
		this.shootTicks = 0; // # of ticks before we shoot
		this.moveTicks = 0; // # of ticks to move for
		this.range = 250; // Our shooting range
	}
	
	handle() {
        super.handle();		
		// Don't go past min/max x
		if(this.x <= this.min_x) {
			this.phaserObj.body.velocity.x = Math.max(0, this.phaserObj.body.velocity.x);
			this.phaserObj.animations.stop();
		}
		else if(this.x >= this.max_x) {
			this.phaserObj.body.velocity.x = Math.min(0, this.phaserObj.body.velocity.x);
			this.phaserObj.animations.stop();
		}
        
        if(this.grounded <= 0) {
				console.log('I would like to move.');
				this.move();
        }
	}
}

function handlePlayer() {
	player.body.bounce.y = Math.max(0, player.body.bounce.y - 0.01);
	
	// Handle player speed restore
	var delta = playerSpeedMax - playerSpeed;
	playerSpeed += .01 * delta;
}

function fire() {
	if(this.game != null && game.time.now > nextFire) {
		nextFire = game.time.now + fireRate;
		var bullet = bullets.create(player.x + 12, player.y + 18, 'bullet');
		game.physics.arcade.moveToPointer(bullet, bulletSpeed);
	}
}

function handleAlienBullets(alienBullets) {
	alienBullets.forEach(function(bullet) {
		if(--bullet.liveTicks <= 0){
			bullet.destroy();
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
	--player.hp;
	if(player.hp >= 10) {
		player.hpBox.tint = 0x20ff00;
		player.hp = 10;
	}
	
	player.body.bounce.y = 1;
	player.body.velocity.y = -300;
	
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
		switch(a.sprite) {
			case 'alien1':
				var alien = new Alien1(a.x, a.y);
				alien.min_x = a.min_x * 24;
				alien.max_x = a.max_x * 24;
				aliens.push(alien);
				break;
			case 'alien2':
				var alien = new Alien2(a.x, a.y);
				alien.min_x = a.min_x * 24;
				alien.max_x = a.max_x * 24;
				aliens.push(alien);
				break;
            case 'alien3':
				var alien = new Alien3(a.x, a.y);
				alien.min_x = a.min_x * 24;
				alien.max_x = a.max_x * 24;
				aliens.push(alien);
				break;
            case 'alien4':
				var alien = new Alien4(a.x, a.y);
				alien.min_x = a.min_x * 24;
				alien.max_x = a.max_x * 24;
				aliens.push(alien);
				break;
			default:
				break;
		}
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
	game.load.spritesheet('alien1', 'assets/AlienBasic.png', 32, 40);
	game.load.spritesheet('alien2', 'assets/AlienLong.png', 32, 48);
    game.load.spritesheet('alien3', 'assets/AlienBouncy.png', 32, 48);
    game.load.spritesheet('alien4', 'assets/AlienFlame.png', 32, 48);
	game.load.image('diamond', 'assets/diamond.png');
    game.load.spritesheet('alien5', 'assets/AlienSpaceship.png', 32, 32);
    game.load.spritesheet('alien6', 'assets/AlienFlying.png', 48, 48);
    game.load.spritesheet('alienBoss1', 'assets/AlienSquid.png', 51, 96);
	game.load.image('diamond', 'assets/diamond.png');
	game.load.spritesheet('laika', 'assets/laika.png', 32, 48);
	game.load.image('bullet', 'assets/Beam-Pink.png');
    game.load.image('flame', 'assets/Beam-Fire.png');
    game.load.image('ice', 'assets/Beam-Ice.png');
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
    
    var style = { font: "bold 32px Arial Rounded Mt", fill: "#000000", align: "left" };
    
    player.hp = 10;
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
	++ticks;
	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(_aliens, platforms);
	game.physics.arcade.collide(healthKits, platforms);
	game.physics.arcade.collide(_aliens, _aliens);
	
	game.physics.arcade.overlap(bullets, platforms, killBullet, null, this);
	game.physics.arcade.overlap(alienBullets, platforms, killBullet, null, this);
	game.physics.arcade.overlap(player, _aliens, collectAlien, null, this);
	game.physics.arcade.overlap(player, alienBullets, killPlayer, null, this);
	game.physics.arcade.overlap(player, healthKits, healthRestore, null, this);
	game.physics.arcade.overlap(bullets, _aliens, killaliens, null, this); // kill alien when hit by bullet
	
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
//	bulletText.text = 'Bullets: ' + bullets[1];
//	timeText.text = 'Time: ' + ticks;
	
}

