class Alien {
	constructor(x, y) {
		this.hasSight = false; /// Can we see the player?
		this.inRange = false;
		this.grounded = 0; // # of ticks to stay still for
		this.shootTicks = 0; // # of ticks before we shoot
		this.moveTicks = 0; // # of ticks to move for
		this.range = 250; // Our shooting range
		
		// Get distance b/w this alien and the player
		var px = player.body.x;
		var py = player.body.y;
		this.distance = Phaser.Math.distance(px, py, x, y);
		this.sightLine = new Phaser.Line(0, 0, 0, 0);
		
		this.hp = 1;
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
		
		this.inRange = this.distance < this.range;
		
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
		
		// Draw line-of-sight debug
//		var tint = 'red';
//		if(this.hasSight) {
//			tint = 'yellow';
//			if(this.inRange)
//				tint = 'lime';
//		}
//		game.debug.geom(this.sightLine, tint, this.hasSight);
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
	
	onHit() {
		if(--this.hp <= 0)
			this.phaserObj.destroy();
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
		if(this.inRange && this.hasSight) {
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
		if(this.inRange && this.hasSight) {
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
		colorHPBar(player.hp / 10, player.hpBox);
	}
}

class Alien3 extends Alien {
	constructor(x, y) {
		super(x, y);
		this.x = x * 24;
		this.y = y * 24 - 24;
		this.spritesheet = 'alien3';
		
		this.phaserObj = aliens.create(this.x, this.y, this.spritesheet);
		this.phaserObj.body.gravity.y = 300;
		this.phaserObj.alienParent = this;
		
		this.phaserObj.animations.add('left', [0, 1, 2, 3], 10, true);
		this.phaserObj.animations.add('right', [5, 6, 7, 8], 10, true);
		
		this.hitRight = false;
		this.hitLeft = false;
		
		this.leftFoot = new Phaser.Point(this.x - 5, this.y + 53);
		this.rightFoot = new Phaser.Point(this.x + 37, this.y + 53);
	}
	
	handle() {
		super.handle();
		
		var tooLeft = this.x < player.x - 10; //Yeoman changed to 0 so aliens will come all the way to collide
		var tooRight = this.x > player.x + 10;
		var tooHigh = this.y < player.y;
		var tooLow = this.y > player.y;
		
		this.leftFoot.x = this.x - 5;
		this.leftFoot.y = this.y + 53;
		this.rightFoot.x = this.x + 37;
		this.rightFoot.y = this.y + 53;
		
		//game.debug.geom(this.leftFoot);
		//game.debug.geom(this.rightFoot);
        
        // If we're in range and have sight:
		if(this.inRange && this.hasSight) {
			if(this.shootTicks <= 0) {
				console.log('I would like to shoot the player.');
				this.shoot();
			}
		}
		
		if(tooLeft) {
			//console.log('Im too far left!');
			var canMoveRight = false;
			var rf = this.rightFoot;
			platforms.forEach(function(platform) {
				if(platform.getBounds().contains(rf.x, rf.y)) {
					canMoveRight = true;
					return;
				}
			});
			
			if(canMoveRight)
				this.phaserObj.body.velocity.x = 50;
		}
		else if(tooRight) {
			//console.log('too far right');
			var canMoveLeft = false;
			var lf = this.leftFoot;
			platforms.forEach(function(platform) {
				if(platform.getBounds().contains(lf.x, lf.y)) {
					canMoveLeft = true;
					return;
				}
			});
			
			if(canMoveLeft)
				this.phaserObj.body.velocity.x = -50;
		}
		else
			this.phaserObj.body.velocity.x = 0;
	}
    
	shoot() {
		var bullet = new Bullet(this.x + 16, this.y + 16, 'purple', this.bulletCB);
		bullet.liveTicks = 30;
		
		// Alien reload timer
		this.shootTicks = 100 + Math.random() * 50;
		// Alien won't move
		this.grounded = 150;
	}
	
	bulletCB() {
		--player.hp;
	}
	onCollide(platform) {
		//console.log('I hit:', platform);
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
		if(this.inRange && this.hasSight) {
			if(this.shootTicks <= 0) {
				console.log('I would like to shoot the player.');
				this.shoot();
			}
		}
        
		if(this.grounded <= 0) {
			console.log('I would like to move.');
			this.move();
		}
        
	}
    
    shoot() {
		var bullet1 = new Bullet(this.x + 16, this.y + 16, 'orange', this.bulletCB);
		bullet1.liveTicks = 30;
		
		// Alien reload timer
		this.shootTicks = 75 + Math.random() * 50;
		// Alien won't move
		this.grounded = 150;
	}
	
	bulletCB() {
		--player.hp;
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
		var bullet = new Bullet(this.x + 16, this.y + 16, 'flame', this.fireBulletCB, this.collideCB);
		bullet.bulletSprite.body.velocity.y = 300;
		bullet.bulletSprite.body.velocity.x = 0;
		bullet.liveTicks = 1000;
		var bulletLeft = new Bullet(this.x + 16, this.y + 16, 'flame', this.fireBulletCB, null);
		bulletLeft.bulletSprite.body.velocity.y = 300;
		bulletLeft.bulletSprite.body.velocity.x = -150;
		bulletLeft.liveTicks = 1000;
		
		var bulletRight = new Bullet(this.x + 16, this.y + 16, 'flame', this.fireBulletCB, null);
		bulletRight.bulletSprite.body.velocity.y = 300;
		bulletRight.bulletSprite.body.velocity.x = 150;
		bulletRight.liveTicks = 1000;
		
		// Alien reload timer
		this.shootTicks = 275 + Math.random() * 50;
	}
	
	fireBulletCB() {
		player.onFire = 100;
	}
	
	collideCB() {
	}
}

class Boss1 extends Alien {
	constructor(x, y) {
		super(x, y);
		this.range = 1000;
		this.hp = 50;

		
		this.x = x * 24;
		this.y = y * 24 - 40;
		this.spritesheet = 'boss1';
		
		this.phaserObj = aliens.create(this.x, this.y, this.spritesheet);
		this.phaserObj.alienParent = this;
		
		this.phaserObj.animations.add('left', [0, 1, 2, 3], 10, true);
		this.phaserObj.animations.add('right', [5, 6, 7, 8], 10, true);
		
		this.hpBar = game.make.sprite(-10, -10, 'white_tile');
		this.hpBar.maxScaleX = 3;
		this.hpBar.scale.setTo(this.hpBar.maxScaleX, 0.5);
		this.hpBar.tint = 0x00ff20;
		this.phaserObj.addChild(this.hpBar);
		
		this.grounded = 250; // # of ticks to stay still for
		this.shootTicks = 50 + Math.random() * 25; // # of ticks before we shoot
		this.moveTicks = 0; // # of ticks to move for
		this.range = 10000; // Our shooting range
		
		this.states = ['pokeballAttack', 'spiralAttack'];
		this.state_idx = Math.floor(Math.random() * this.states.length);
		this.state = this.states[this.state_idx];
		console.log('lets start in state:', this.state);
		
		// For spiral attack
		this.shots = 25;
	}
	
	handle() {
		super.handle();
		
		if(this.shootTicks <= 0) {			
			switch(this.state) {
				case 'pokeballAttack':
					console.log('Gotta catch \'em all!');
					this.pokeballAttack();
					this.shootTicks = 200;
					this.changeState();
					break;
				case 'spiralAttack':
					this.shootTicks = 7;
					var angle = -1 * Math.PI / 25 * this.shots;
					--this.shots;
					
					var bullet = new Bullet(this.x + 30, this.y + 32, 'bullet', null, null);
					bullet.cb = bullet.dmgPlayer;
					bullet.dmg = 1;
					bullet.bulletSprite.body.velocity.x = Math.cos(angle) * 400;
					bullet.bulletSprite.body.velocity.y = Math.sin(angle) * 400;
					bullet.liveTicks = 10000;
					
					if(this.shots <= 0) {
						this.shots = 25;
						this.shootTicks = 200;
						this.changeState();
					}
					break;
				default:
					break;
			}
		}
	}
	
	changeState() {
		var state_idx_delta = Math.floor(Math.random() * (this.states.length - 1)) + 1;
		this.state_idx += state_idx_delta;
		this.state_idx %= this.states.length;
		this.state = this.states[this.state_idx];
		console.log('Changing to:', this.state);
	}
	
	pokeballAttack() {
		var hit = function() {
			player.hp -= 4;
		};
	
		var bullet = new Bullet(this.x + 16, this.y + 16, 'red', hit, this.pokeballCollideCB);
		bullet.liveTicks = 1000;
	}
	
	pokeballCollideCB() {
		if(this.alienSingleton == undefined || this.alienSingleton == null) {
			//console.log('Making new Alien at:', this.x / 24, this.y / 24 - 1);
			this.alienSingleton = new Alien1(this.x / 24, this.y / 24 - 1);
			this.alienSingleton.phaserObj.body.gravity.y = 600;
		}
	}
	
	onHit() {
		super.onHit();
		colorHPBar(this.hp / 50, this.hpBar);
	}
}

