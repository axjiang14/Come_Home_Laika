var endingState = {

    preload: function()
    {	
    },

    create: function() {
        game.sound.stopAll();

        game.add.sprite(0, 0, 'endBG');
        var nextButton = game.add.button(485, 485, 'nextButton', function(){game.state.start('credits')});

        var typewriter = new Typewriter();
        var text = "Welcome Home, \nLaika";
        typewriter.init(game, { x: 100, y: 300, fontSize: 50,fontFamily: "gem", maxWidth: 600, text: text });
                typewriter.start();

    },

    update: function()
    {	
    },


}