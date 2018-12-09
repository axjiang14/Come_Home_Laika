var introState2 = {

    preload: function()
    {	
    },

    create: function() {

        game.add.sprite(0, 0, 'space');
        var nextButton = game.add.button(485, 485, 'nextButton', function(){game.state.start('solarSystem')});
        nextButton.onInputDown.add(this.tint, nextButton);
        nextButton.onInputUp.add(this.unTint, nextButton);


        var typewriter = new Typewriter();
        var text = "Hello Laika. This is the Control Tower from Earth. You have been sent into space on a special mission: Become the first dog to orbit Earth. Ah . . . well our calculations were wrong and you are now lost in space. Don’t worry we’ve found a planet for you to land safely on. We don’t know what you’ll find out there. Don’t trust the aliens and return home safely. \nGood Luck!";
        typewriter.init(game, { x: 100, y: 100, fontSize: 30,fontFamily: "gem", maxWidth: 600, text: text });
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