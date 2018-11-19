var tutorialState = {
	preload: function()
	{
		game.load.image('background', 'assets/tutorial.png');
        game.load.image('nextButton', 'assets/buttonNext.png');
        game.load.audio('buttonBGM', 'assets/BackGroundMusic/buttonBGM.mp3');
	},
	
	create: function()
	{
        game.add.sprite(0, 0, 'background');
        
		
		
        var nextButton = game.add.button(500, 475, 'nextButton', function(){game.state.start('plutoState')});
        nextButton.scale.setTo(0.9,0.9);
        nextButton.onInputDown.add(this.tint, nextButton);
        nextButton.onInputUp.add(this.unTint, nextButton);   
        
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
};