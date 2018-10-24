var gameStartState = {
	preload: function()
	{
		game.load.image('homeScreen', 'assets/HomeScreen.png');
        game.load.image('startButton', 'assets/Start.png');
        
	},
	
	create: function()
	{
        game.add.sprite(0, 0, 'homeScreen');
		
		
        var startButton = game.add.button(game.world.centerX + 50, game.world.centerY + 125, 'startButton', function(){game.state.start('solarSystem')});// go to solarSystem.
        startButton.onInputDown.add(this.tint, startButton);
        startButton.onInputUp.add(this.unTint, startButton);        
        
	},
	
	update: function(){},
    
    tint: function(){
        this.tint = 0xbbbbbb;
        //buttonBGM.play('click');
    },
    
    unTint: function(){
        this.tint = 0xFFFFFF;
    },
}; //game start state
