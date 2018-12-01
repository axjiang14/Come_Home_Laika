var credits = {

    preload: function()
    {	
    },

    create: function() {
        game.sound.stopAll();

        game.add.sprite(0, 0, 'space');

        var typewriter = new Typewriter();
        var text = "\nThank You For Playing! \n\nProducer \nPaul Toprac \n\nTeam 7: No Pain No Gain \nAndrea Jiang, Conner Newman, Yeoman Yoon";
        typewriter.init(game, { x: 100, y: 100, fontSize: 30,fontFamily: "gem", maxWidth: 600, text: text });
                typewriter.start();

    },

    update: function()
    {	
    },


}