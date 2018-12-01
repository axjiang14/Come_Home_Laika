var introStateBoss = {

    preload: function()
    {	
    },

    create: function() {
        game.sound.stopAll();

        game.add.sprite(0, 0, 'space');
        var nextButton = game.add.button(275, 465, 'nextButton', function(){game.state.start('finalState')});

        var typewriter = new Typewriter();
        var text = "Laika!! \nAliens figured out where humans live! \nThey are now trying to conquer the Earth! \nPlease... Save the earth! \nIt's not just a matter of you anymore, Laika. Save the humanity!! \nGood Luck!";
        typewriter.init(game, { x: 100, y: 100, fontSize: 30,fontFamily: "gem", maxWidth: 600, text: text });
                typewriter.start();

    },

    update: function()
    {	
    },


}