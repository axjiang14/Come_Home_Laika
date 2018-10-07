function fire() {
    if (game.time.now > nextFire) {
        nextFire = game.time.now + fireRate;
        console.log('firing');
        
        var bullet = bullets.create(player.x + 12, player.y + 18, 'bullet');
        game.physics.arcade.moveToPointer(bullet, bulletSpeed);
    }
}

function onPlayerHit() {
	console.log('player hp is now:' + --player.hp);
	player.hpBox.scale.setTo(player.hp, 1);
	
	// Do pretty hp box coloring
	var red = Math.max(0x42, Math.min(0xff - 0xff * (5 - player.hp) / 10, 0xff));
	console.log('red:', (red).toString(16));
	red <<= 16;
	var green = 0xff * player.hp / 10;
	//console.log('green:', (green).toString(16));
	green <<= 8;
	var blue = 0x000000;
	//console.log('set color to:', (red | green | blue).toString(16));
	player.hpBox.tint = red | green | blue;
}
