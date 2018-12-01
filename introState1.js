var introState1 = {

    preload: function()
    {	
    },

    create: function() {
        game.sound.stopAll();

        game.add.sprite(0, 0, 'introBG');
        var nextButton = game.add.button(485, 485, 'nextButton', function(){game.state.start('introState2')});

        var typewriter = new Typewriter();
        var text = "What happened to me?\nWhere am I?";
        typewriter.init(game, { x: 330, y: 210, fontSize: 40,fontFamily: "gem", maxWidth: 600, text: text });
                typewriter.start();

    },

    update: function()
    {	
    },


}