var solarSystem = {
    
    preload: function(){
        qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);      
    },
    
    create: function(){
        game.add.sprite(0, 0, 'spaceBackground');
        game.add.sprite(-35, -35, 'sun'); 
        
        var p1 = game.add.button(150, 80, 'mercury');
        p1.scale.setTo(0.6,0.6);
        var p2 = game.add.button(20, 180, 'venus');
        p2.scale.setTo(0.8,0.8);
        var p3 = game.add.button(170, 230, 'earth');
        p3.scale.setTo(0.8,0.8);
        var p4 = game.add.button(320, 150, 'mars');
        p4.scale.setTo(0.7,0.7);
        var p5 = game.add.button(310, 300, 'jupiter');
        var p6 = game.add.button(450, 80, 'saturn');
        var p7 = game.add.button(540, 300, 'uranus');
        p7.scale.setTo(0.8,0.8);
        var p8 = game.add.button(670, 110, 'neptune');
        p8.scale.setTo(0.8,0.8);
        var p9 = game.add.button(725, 370, 'pluto');
        p9.scale.setTo(0.6,0.6);
        
        
        p1.onInputDown.add(this.tint, p1);
        p1.onInputDown.add(this.changeMercury, p1);
        p2.onInputDown.add(this.tint, p2);
        p2.onInputDown.add(this.changeVenus, p2);
        p3.onInputDown.add(this.tint, p3);
        p3.onInputDown.add(this.changeEarth, p3);
        p4.onInputDown.add(this.tint, p4);
        p4.onInputDown.add(this.changeMars, p4);
        p5.onInputDown.add(this.tint, p5);
        p5.onInputDown.add(this.changeJupiter, p5);
        p6.onInputDown.add(this.tint, p6);
        p6.onInputDown.add(this.changeSaturn, p6);
        p7.onInputDown.add(this.tint, p7);
        p7.onInputDown.add(this.changeUranus, p7);
        p8.onInputDown.add(this.tint, p8);
        p8.onInputDown.add(this.changeNeptune, p8);
        p9.onInputDown.add(this.tint, p9);
        p9.onInputDown.add(this.changePluto, p9);
		
		
		
		
        p1.onInputUp.add(this.unTint, p1);
        p2.onInputUp.add(this.unTint, p2);
        p3.onInputUp.add(this.unTint, p3);
        p4.onInputUp.add(this.unTint, p4);
        p5.onInputUp.add(this.unTint, p5);
        p6.onInputUp.add(this.unTint, p6);
        p7.onInputUp.add(this.unTint, p7);
        p8.onInputUp.add(this.unTint, p8);
        p9.onInputUp.add(this.unTint, p9);
        
        
        //var bmpText;
        var typewriter = new Typewriter();
        var plutoText = "Control Tower: Hello Laika. This is control tower from Earth. We are glad that you made it to space safely! We're about to crash land on Pluto! Click the planet with spaceship to enter: \nGravity compared to Earth: 0.06 \nVolume compared to Earth: 0.006 ";
        var neptuneText = "Great job! We've escaped from Pluto. It looks like we're headed for Neptune next. This is Neptune: \nGravity: 1.14x compared to Earth \nSize: 58x compared to Earth";
        var uranusText = "Wow that was tough! Next stop is Uranus! \nGravity: 0.886x compared to Earth \nSize: 63x compared to Earth \nControl Tower: This Planet is the coldest planet of solar system. Get to the spaceship fast! Or You will freeze to death!";
        var saturnText = "Watch out for the dust! \nGravity: 1.065x compared to Earth \nSize: 764x compared to Earth ";
        var jupiterText = "This is Jupiter: \n Gravity: 2.528x compared to Earth \nSize: 1321x compared to Earth \nControl Tower: This Planet is very difficult to move, make sure you take careful steps.";
        var marsText = "This is Mars:  \nGravity: 0.376x compared to Earth \nSize: 0.151x compared to Earth \nControl Tower: This Planet is very similar to Earth, we might have to conquer this planet in the future. Special Mission: Kill all the aliens.";
        var mercuryText = "Hello Laika. This is Mercury: \nGravity: 0.38x compared to Earth \nSize: 0.056x compared to Earth \nControl Tower: This Planet is your last planet. And your resources are running out.\nSpecial Mission: Kill all the aliens. You have 150 seconds.";
        var venusText = "Hello Laika. This is Venus: \nGravity: 0.904x compared to Earth \nSize: 0.815x compared to Earth \nControl Tower: This Planet has special aliens. \nSpecial Mission: Kill all the aliens.";
        var earthText = "Hello Laika. We're almost home. Set your GPS for Earth!";


            
        
        if(planetsUnlocked == 0){
            game.add.sprite(720, 306, 'spaceship');
            typewriter.init(game, { x: 160, y: 480, fontSize: 18,fontFamily: "gem", maxWidth: 620, text: plutoText });
            typewriter.start();}
            
            /*bmpText = game.add.bitmapText(160, 480, "gem", plutoText, 18); 
            bmpText.maxWidth = 620;}*/
        
        if(planetsUnlocked == 1){
            game.add.sprite(680, 50, 'spaceship');
            typewriter.init(game, { x: 160, y: 480, fontSize: 18,fontFamily: "gem", maxWidth: 620, text: neptuneText });
            typewriter.start();}
        
        if(planetsUnlocked == 2){
            game.add.sprite(550, 245, 'spaceship');
            typewriter.init(game, { x: 160, y: 480, fontSize: 18,fontFamily: "gem", maxWidth: 620, text: uranusText });
            typewriter.start();}
        
        if(planetsUnlocked == 3){
            game.add.sprite(500, 25, 'spaceship');
            typewriter.init(game, { x: 160, y: 480, fontSize: 18,fontFamily: "gem", maxWidth: 620, text: saturnText });
            typewriter.start();}
        
        if(planetsUnlocked == 4){
            game.add.sprite(340, 245, 'spaceship');
            typewriter.init(game, { x: 160, y: 480, fontSize: 18,fontFamily: "gem", maxWidth: 620, text: jupiterText });
            typewriter.start();}
        
        if(planetsUnlocked == 5){
            game.add.sprite(310, 95, 'spaceship');
            typewriter.init(game, { x: 160, y: 480, fontSize: 18,fontFamily: "gem", maxWidth: 620, text: marsText });
            typewriter.start();}
        
        if(planetsUnlocked == 6){
            game.add.sprite(143, 25, 'spaceship');
            typewriter.init(game, { x: 160, y: 480, fontSize: 18,fontFamily: "gem", maxWidth: 620, text: mercuryText });
            typewriter.start();}
        
        if(planetsUnlocked == 7){
            game.add.sprite(25, 125, 'spaceship');
            typewriter.init(game, { x: 160, y: 480, fontSize: 18,fontFamily: "gem", maxWidth: 620, text: venusText });
            typewriter.start();}
        
        if(planetsUnlocked >= 8){
            game.add.sprite(175, 175, 'spaceship');
            typewriter.init(game, { x: 160, y: 480, fontSize: 18,fontFamily: "gem", maxWidth: 620, text: earthText });
            typewriter.start();}

        game.physics.startSystem(Phaser.Physics.ARCADE);
        console.log(planetsUnlocked);
        
        spaceBGM = game.add.audio('spaceBGM'); //has to be last for some reason
        //spaceBGM.addMarker('spaceBGM', 0, 151);
               
        buttonBGM = game.add.audio('buttonBGM');
        
        spaceBGM.play('',0,1,true);

    },
    
    tint: function(){
        this.tint = 0xbbbbbb;
        buttonBGM.play();
    },
    
    unTint: function(){
        this.tint = 0xFFFFFF;
    },
    
    changePluto: function() {
    	if(planetsUnlocked >= 0)
    		game.state.start('tutorialState');
    },
    
    changeNeptune: function() {
    	console.log('trying to change to neptune w/ planetsUnlocked=', planetsUnlocked);
    	if(planetsUnlocked >= 1)
    		game.state.start('neptuneState');
    },
    
    changeUranus: function() {
    	console.log('trying to change to uranus w/ planetsUnlocked=', planetsUnlocked);
    	if(planetsUnlocked >= 2)
    		game.state.start('uranusState');
    },
    
    changeSaturn: function() {
    	console.log('trying to change to saturn w/ planetsUnlocked=', planetsUnlocked);
    	if(planetsUnlocked >= 3)
    		game.state.start('saturnState');
    },
    
   changeJupiter: function() {
    	console.log('trying to change to saturn w/ planetsUnlocked=', planetsUnlocked);
    	if(planetsUnlocked >= 4)
    		game.state.start('jupiterState');
    },
    
    changeMars: function() {
    	console.log('trying to change to saturn w/ planetsUnlocked=', planetsUnlocked);
    	if(planetsUnlocked >= 5)
    		game.state.start('marsState');
    },
    
    changeMercury: function() {
    	console.log('trying to change to saturn w/ planetsUnlocked=', planetsUnlocked);
    	if(planetsUnlocked >= 6)
    		game.state.start('mercuryState');
    },
    
    changeVenus: function() {
    	console.log('trying to change to saturn w/ planetsUnlocked=', planetsUnlocked);
    	if(planetsUnlocked >= 7)
    		game.state.start('venusState');
    },
    
    changeEarth: function() {
    	console.log('trying to change to saturn w/ planetsUnlocked=', planetsUnlocked);
    	if(planetsUnlocked >= 8)
    		game.state.start('earthState');
    },
    
    update: function(){
        if(qKey.isDown) {
            console.log('q key pressed');
            //stateLoad('assets/state_test.json', null, null);
            planetsUnlocked = 9;
        }
    }
    
};// solarSystem State
