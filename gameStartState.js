var gameStartState = {
	preload: function()
	{
	},
	
	create: function()
	{
        game.add.sprite(0, 0, 'homeScreen');
        
		
		
        var startButton = game.add.button(game.world.centerX + 50, game.world.centerY + 125, 'startButton', function(){game.state.start('introState')});// go to solarSystem
        startButton.onInputDown.add(this.tint, startButton);
        startButton.onInputUp.add(this.unTint, startButton);   
        
        buttonBGM = game.add.audio('buttonBGM');
        
	},
	
	update: function(){
        
    },
    
    tint: function(){
        this.tint = 0xbbbbbb;
        buttonBGM.play();
    },
    
    unTint: function(){
        this.tint = 0xFFFFFF;
    },
}; //game start state
