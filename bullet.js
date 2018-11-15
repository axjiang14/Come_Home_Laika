class Bullet {
	constructor(x, y, sprite, onHitCB, collideCB) {
		this.x = x;
		this.y = y;
		this.bulletSprite = alienBullets.create(x, y, sprite);
		this.bulletSprite.bulletObj = this;
		this.cb = onHitCB;
		this.collideCB = collideCB;
		this.liveTicks = 30;
		
		game.physics.arcade.moveToXY(this.bulletSprite, player.x + 20, player.y + 20, bulletSpeed / 2);
	}
	
	handle() {
		--this.liveTicks;
		
		if(this.liveTicks <= 0) {
			this.bulletSprite.destroy();
		}
		
		this.x = this.bulletSprite.x;
		this.y = this.bulletSprite.y;
	}
}

class PlayerBullet {
	constructor(x, y, sprite, onHitCB, collideCB) {
		this.x = x;
		this.y = y;
		this.bulletSprite = bullets.create(x, y, sprite);
		this.bulletSprite.bulletObj = this;
		this.cb = onHitCB;
		this.collideCB = collideCB;
		this.liveTicks = 30;
		
		game.physics.arcade.moveToPointer(this.bulletSprite, bulletSpeed);
	}
	
	handle() {
		--this.liveTicks;
		
		if(this.liveTicks <= 0) {
			this.bulletSprite.destroy();
		}
		
		this.x = this.bulletSprite.x;
		this.y = this.bulletSprite.y;
	}
}

