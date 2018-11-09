class Alien {
	constructor(x, y) {
		this.hasSight = false; /// Can we see the player?
		this.grounded = 0; // # of ticks to stay still for
		this.shootTicks = 0; // # of ticks before we shoot
		this.moveTicks = 0; // # of ticks to move for
		this.range = 250; // Our shooting range
		
		// Get distance b/w this alien and the player
		var px = player.body.x;
		var py = player.body.y;
		this.distance = Phaser.Math.distance(px, py, x, y);
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
		
		// Get distance b/w this alien and the player
		var px = player.body.x;
		var py = player.body.y;
		this.distance = Phaser.Math.distance(px, py, this.x, this.y);
		
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
	
	shoot() {
	}
}

class Alien1 extends Alien {

	constructor(x, y) {
		super(x, y);
		this.x = x * 24;
		this.y = y * 24 - 16;
		this.spritesheet = 'alien1';
		
		this.phaserObj = aliens.create(this.x, this.y, this.spritesheet);
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
		
		// If we're in range and have sight:
		var inRange = this.distance < this.range;
		if(inRange && this.hasSight) {
			if(this.shootTicks <= 0) {
				console.log('I would like to shoot the player.');
				this.shoot();
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
	
	shoot() {
		var bullet = new Bullet(this.x + 16, this.y + 16, 'bullet', this.bulletCB);
		bullet.liveTicks = 30;
		
		// Alien reload timer
		this.shootTicks = 275 + Math.random() * 50;
		// Alien won't move
		this.grounded = 150;
	}
	
	bulletCB() {
		--player.hp;
	}
}

class Alien2 extends Alien {
	constructor(x, y) {
		super(x, y);
		this.x = x * 24;
		this.y = y * 24 - 24;
		this.spritesheet = 'alien2';
		
		this.phaserObj = aliens.create(this.x, this.y, this.spritesheet);
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
        
        // If we're in range and have sight:
		var inRange = this.distance < this.range;
		if(inRange && this.hasSight) {
			if(this.shootTicks <= 0) {
				console.log('I would like to shoot the player.');
				this.shoot();
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
	
	shoot() {
		var bullet = new Bullet(this.x + 16, this.y + 16, 'ice', this.iceBulletCB);
		
		// Alien reload timer
		this.shootTicks = 75 + Math.random() * 50;
		// Alien won't move
		this.grounded = 150;
	}
	
	iceBulletCB() {
		playerSpeed *= 0.1;
		--player.hp;
		colorHPBar();
	}
}

class Alien3 extends Alien {
	constructor(x, y) {
		super(x, y);
		this.x = x * 24;
		this.y = y * 24 - 24;
		this.spritesheet = 'alien3';
		
		this.phaserObj = aliens.create(this.x, this.y, this.spritesheet);
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
		
		this.phaserObj = aliens.create(this.x, this.y, this.spritesheet);
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

class Alien6 extends Alien {
	constructor(x, y) {
		super(x, y);
		this.x = x * 24;
		this.y = y * 24 - 24;
		this.spritesheet = 'alien6';
		
		this.phaserObj = aliens.create(this.x, this.y, this.spritesheet);

		this.phaserObj.alienParent = this;
		
		this.phaserObj.animations.add('left', [0, 1, 2, 3], 10, true);
		this.phaserObj.animations.add('right', [5, 6, 7, 8], 10, true);
		
		this.grounded = 0; // # of ticks to stay still for
		this.shootTicks = 175 + Math.random() * 150; // # of ticks before we shoot
		this.moveTicks = 0; // # of ticks to move for
		this.range = 10000; // Our shooting range
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
		}
		
        this.phaserObj.animations.play('left');
		
		// We fly so don't care about min/max_x      
        if(this.grounded <= 0) {
				console.log('I would like to fly.');
				this.move();
        }
        
        if(this.shootTicks <= 0) {
        	this.shoot();
        }
	}
	
	shoot() {
		var bullet = new Bullet(this.x + 16, this.y + 16, 'flame', this.fireBulletCB);
		bullet.bulletSprite.body.velocity.y = 300;
		bullet.bulletSprite.body.velocity.x = 0;
		bullet.liveTicks = 1000;
		var bulletLeft = new Bullet(this.x + 16, this.y + 16, 'flame', this.fireBulletCB);
		bulletLeft.bulletSprite.body.velocity.y = 300;
		bulletLeft.bulletSprite.body.velocity.x = -150;
		bulletLeft.liveTicks = 1000;
		var bulletRight = new Bullet(this.x + 16, this.y + 16, 'flame', this.fireBulletCB);
		bulletRight.bulletSprite.body.velocity.y = 300;
		bulletRight.bulletSprite.body.velocity.x = 150;
		bulletRight.liveTicks = 1000;
		
		// Alien reload timer
		this.shootTicks = 275 + Math.random() * 50;
	}
	
	fireBulletCB() {
		player.onFire = 100;
	}
}

