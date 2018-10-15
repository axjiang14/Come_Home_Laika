var gameOverState = {
	preload: function()
	{
		game.load.image('background', 'assets/background.png');
		game.load.image('ground', 'assets/platform.png');
		game.load.spritesheet('laika', 'assets/laika.png', 32, 48);
        game.load.image('restartButton', 'assets/restartButton.png');
        game.load.audio('buttonBGM', 'assets/backGroundMusic/buttonBGM.mp3');
	},
	
	create: function()
	{
		game.physics.startSystem(Phaser.Physics.ARCADE);
		platforms = game.add.group();
		platforms.enableBody = true;
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
		
		player = game.add.sprite(100, game.world.height - 150, 'laika');
		game.physics.arcade.enable(player);
		player.body.bounce.y = 0;
		player.body.gravity.y = 1800;
		
		player.animations.add('left', [0, 1, 2, 3], 10, true);
		player.animations.add('right', [5, 6, 7, 8], 10, true);
		
		
        var restartButton = game.add.button(game.world.centerX - 50, game.world.centerY + 25, 'restartButton', function(){game.state.start('solarSystem')});// go back to solarSystem.
        restartButton.onInputDown.add(this.tint, restartButton);
        restartButton.onInputUp.add(this.unTint, restartButton);
        
        
        scoreText = game.add.text(16, 16, 'Score: ' + score, {fontSize: '32px', fill: '#ffffff'});
		gameOverText = game.add.text(255, game.world.centerY - 50, 'Game Over', {font: '72px Arial', fill: '#ffffff', align: 'center'});
        
	},
	
	update: function()
	{
		game.physics.arcade.collide(player, platforms);
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
	},
    
    tint: function(){
        this.tint = 0xbbbbbb;
        //buttonBGM.play('click');
    },
    
    unTint: function(){
        this.tint = 0xFFFFFF;
    },
}; //game overState