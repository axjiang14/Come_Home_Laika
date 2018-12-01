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
        
        
        var bmpText;
        bmpText = game.add.bitmapText(115, 453, "gem", "Control Tower", 20);
        
        var typewriter = new Typewriter();
        var plutoText = "Hurry Laika! You’re about to run out of fuel. According to your coordinates, the closest planet is Pluto. Land there and find more fuel. Be careful when you jump. Pluto's gravity is only 0.06 compared to Earth's. \nClick the planet with the spaceship to begin the level." 
        var neptuneText = "Great job! We've escaped from Pluto. Our fuel won’t last long. Let’s head to Neptune next. Your spacesuit isn’t designed to handle Neptune’s extreme temperatures. Complete the level quickly or else you’ll freeze to death. Here is some information about Neptune: \nGravity: 1.14x compared to Earth";
        var uranusText = "Wow that was tough! It looks like Uranus is nearby; let’s stop there next.  Here is some information about Uranus: \nGravity: 0.886x compared to Earth";
        var saturnText = "Welcome to Saturn, Laika. Saturn has a lot of rings, so make sure you explore every layer of the planet carefully. Here is some information about Saturn. \nGravity: 1.065x compared to Earth";
        var jupiterText = "Laika, you’ve made it to Jupiter. You're already halfway home. From what we know, Jupiter is densely populated. Watch out for alien legions. Here is some information about Jupiter: \n Gravity: 2.528x compared to Earth \nDang that’s high!";
        var marsText = "Finally, we made it to Mars. Wow we can almost see Earth from here! We’ve sent many rovers here. Maybe you’ll see something that reminds you of home. Here is some information about Mars: \nGravity: 0.376x compared to Earth";
        var mercuryText = "Wooah! What happened? It looks like our coordinates were off. You ended up on Mercury instead of Earth. Let’s clear this quickly. Here is some information about Mercury: \nGravity: 0.38x compared to Earth";
        var venusText = "Last stop: Venus! It looks like your spacesuit has suffered some damage. You won’t be able to withstand Venus’ toxic atmosphere for long. Gather your fuel quickly and let’s head home. Here is some information about Venus: \nGravity: 0.904x compared to Earth";
        var earthText = "Laika. We're almost home. Set your coordinates for Earth!";


            
        
        if(planetsUnlocked == 0){
            game.add.sprite(720, 306, 'spaceship');
            typewriter.init(game, { x: 120, y: 485, fontSize: 18,fontFamily: "gem", maxWidth: 620, text: plutoText });
            typewriter.start();}
            
            /*bmpText = game.add.bitmapText(160, 480, "gem", plutoText, 18); 
            bmpText.maxWidth = 620;}*/
        
        if(planetsUnlocked == 1){
            game.add.sprite(680, 50, 'spaceship');
            typewriter.init(game, { x: 120, y: 485, fontSize: 18,fontFamily: "gem", maxWidth: 620, text: neptuneText });
            typewriter.start();}
        
        if(planetsUnlocked == 2){
            game.add.sprite(550, 245, 'spaceship');
            typewriter.init(game, { x: 120, y: 485, fontSize: 18,fontFamily: "gem", maxWidth: 620, text: uranusText });
            typewriter.start();}
        
        if(planetsUnlocked == 3){
            game.add.sprite(500, 25, 'spaceship');
            typewriter.init(game, { x: 120, y: 485, fontSize: 18,fontFamily: "gem", maxWidth: 620, text: saturnText });
            typewriter.start();}
        
        if(planetsUnlocked == 4){
            game.add.sprite(340, 245, 'spaceship');
            typewriter.init(game, { x: 120, y: 485, fontSize: 18,fontFamily: "gem", maxWidth: 620, text: jupiterText });
            typewriter.start();}
        
        if(planetsUnlocked == 5){
            game.add.sprite(310, 95, 'spaceship');
            typewriter.init(game, { x: 120, y: 485, fontSize: 18,fontFamily: "gem", maxWidth: 620, text: marsText });
            typewriter.start();}
        
        if(planetsUnlocked == 6){
            game.add.sprite(143, 25, 'spaceship');
            typewriter.init(game, { x: 120, y: 485, fontSize: 18,fontFamily: "gem", maxWidth: 620, text: mercuryText });
            typewriter.start();}
        
        if(planetsUnlocked == 7){
            game.add.sprite(25, 125, 'spaceship');
            typewriter.init(game, { x: 120, y: 485, fontSize: 18,fontFamily: "gem", maxWidth: 620, text: venusText });
            typewriter.start();}
        
        if(planetsUnlocked >= 8){
            game.add.sprite(175, 175, 'spaceship');
            typewriter.init(game, { x: 120, y: 485, fontSize: 18,fontFamily: "gem", maxWidth: 620, text: earthText });
            typewriter.start();}

        game.physics.startSystem(Phaser.Physics.ARCADE);
        console.log(planetsUnlocked);
        
        game.sound.stopAll();
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
    		game.state.start('introStateBoss');
    },
    
    update: function(){
        if(qKey.isDown) {
            console.log('q key pressed');
            //stateLoad('assets/state_test.json', null, null);
            planetsUnlocked = 9;
        }
    }
    
};// solarSystem State
