var introState1 = {

    preload: function()
    {	
    },

    create: function() {
        
        game.add.sprite(0, 0, 'introBG');
        var nextButton = game.add.button(485, 485, 'nextButton', function(){game.state.start('introState2')});
        nextButton.onInputDown.add(this.tint, nextButton);
        nextButton.onInputUp.add(this.unTint, nextButton);

        var typewriter = new Typewriter();
        var text = "What happened to me?\nWhere am I?";
        typewriter.init(game, { x: 330, y: 210, fontSize: 40,fontFamily: "gem", maxWidth: 600, text: text });
                typewriter.start();
        
        buttonBGM = game.add.audio('buttonBGM');

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