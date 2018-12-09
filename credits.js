var credits = {

    preload: function()
    {	
    },

    create: function() {
        game.sound.stopAll();

        game.add.sprite(0, 0, 'space');

        var typewriter = new Typewriter();
        var text = "\nThank You For Playing! \n\nProducer \nPaul Toprac \n\nTeam 7: No Pain No Game \nAndrea Jiang, Conner Newman, Yeoman Yoon";
        typewriter.init(game, { x: 100, y: 100, fontSize: 30,fontFamily: "gem", maxWidth: 600, text: text });
                typewriter.start();
        
        var bonusButton = game.add.button(285, 485, 'bonusButton', function(){game.state.start('earthState')});
        bonusButton.onInputDown.add(this.tint, bonusButton);
        bonusButton.onInputUp.add(this.unTint, bonusButton); 
        spaceBGM.play();

    },

    update: function()
    {	
    },
    
    tint: function(){
        this.tint = 0xbbbbbb;
        buttonBGM.play();
    },
    
    unTint: function(){
        this.tint = 0xFFFFFF;
    },


}