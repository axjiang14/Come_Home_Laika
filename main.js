function fire() {
    if (game.time.now > nextFire) {
        nextFire = game.time.now + fireRate;
        console.log('firing');
        
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
		alien.shoot_ticks = 100;
			
		var bullet = alienBullets.create(ax + 16, ay + 16, 'bullet');
		bullet.liveTicks = 30;
		game.physics.arcade.moveToXY(bullet, px + 20, py + 20, bulletSpeed / 2);
		bullet.rotation = game.physics.arcade.angleToXY(bullet, px, py, game.world);
		alien.grounded = 100;
	}
	else {
		if(alien.grounded <= 0) {
			alien.grounded = 200 + Math.random() * 100;
			console.log('Alien wants to move in:', alien.grounded, 'ticks.');
			alien.move = 100;
			alien.body.velocity.x = 75 + 50 * Math.random();
			// Flip a coin to go right/left
			direction = Math.random() > 0.5 ? -1 : 1
            alien.animations.add('left', [0, 1, 2, 3], 10, true);
            alien.animations.add('right', [5, 6, 7, 8], 10, true);
            console.log(direction)
//			if(alien.body.wasTouching.right) {
//				console.log('Alien has to move left.');
//				direction = -1;
//			}
//			if(alien.body.wasTouching.left) {
//				direction = 1;
//			}
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
    if(player.hp >= 10){
        
        player.hpBox.tint = 0x20ff00;
        player.hp = 10;
    }
	
	console.log('player hp is now:' + player.hp);
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
