var solarSystem = {
    
    preload: function(){
        game.load.image('spaceBackground', 'assets/SpaceTypeable.png');
        game.load.image('sun', 'assets/planets/Sun.png');
        
        game.load.image('mercury', 'assets/planets/mercury.png')
        game.load.image('venus', 'assets/planets/Venus.png')
        game.load.image('earth', 'assets/planets/Earth.png')
        game.load.image('mars', 'assets/planets/mars.png')
        game.load.image('jupiter', 'assets/planets/Jupiter.png')
        game.load.image('saturn', 'assets/planets/Saturn.png')
        game.load.image('uranus', 'assets/planets/uranus.png')
        game.load.image('neptune', 'assets/planets/neptune.png')
        game.load.image('pluto', 'assets/planets/pluto.png')
        game.load.image('plutoInfoSheet', 'assets/plutoInfoSheet.png')
        
        
        game.load.image('LaikaNoHelmet', 'assets/LaikaNoHelmet.png');
        
        game.load.audio('spaceBGM', 'assets/BackGroundMusic/SpaceBGM.mp3');
        game.load.audio('buttonBGM', 'assets/BackGroundMusic/buttonBGM.mp3');
        
        game.load.bitmapFont('gem', 'assets/gem.png', 'assets/gem.xml');
        
        qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        
    },
    
    create: function(){
        
        game.add.sprite(0, 0, 'spaceBackground');
        game.add.sprite(0, 0, 'sun'); // background
        
        
        var p1 = game.add.button(150, 0, 'mercury');
        var p2 = game.add.button(20, 140, 'venus');
        var p3 = game.add.button(170, 170, 'earth');
        p3.scale.setTo(0.8,0.8);
        var p4 = game.add.button(300, 40, 'mars');
        var p5 = game.add.button(300, 250, 'jupiter');
        var p6 = game.add.button(450, 50, 'saturn');
        var p7 = game.add.button(550, 260, 'uranus');
        var p8 = game.add.button(650, 90, 'neptune');
        var p9 = game.add.button(730, 370, 'pluto');
        
        
        p1.onInputDown.add(this.tint, p1);
        p1.onInputDown.add(this.changeVenus, p1);
        p2.onInputDown.add(this.tint, p2);
        p2.onInputDown.add(this.changeMercury, p2);
        p3.onInputDown.add(this.tint, p3);
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
        var plutoText = "Control Tower: Hello Laika. This is control tower from Earth. We are glad that you made it to space safely! We're about to crash land on Pluto! Here's some information about the planet: \nGravity compared to Earth: 0.06 \nVolume compared to Earth: 0.006 ";
        var neptuneText = "Great job! We've escaped from Pluto. It looks like we're headed for Neptune next. This is Neptune: \nGravity: 1.14x compared to Earth \nSize: 58x compared to Earth";
        var uranusText = "Wow that was tough! Next stop is Uranus!This is Uranus: \nGravity: 0.886x compared to Earth \nSize: 63x compared to Earth \nControl Tower: This Planet is the coldest planet of solar system. Get to the spaceship fast! Or You will freeze to death!";
        var saturnText = "Watch out for the dust! \nGravity: 1.065x compared to Earth \nSize: 764x compared to Earth ";
        var jupiterText = "This is Jupiter: \n Gravity: 2.528x compared to Earth \nSize: 1321x compared to Earth \nControl Tower: This Planet is very difficult to move, make sure you take careful steps.";
        var marsText = "This is Mars:  \nGravity: 0.376x compared to Earth \nSize: 0.151x compared to Earth \nControl Tower: This Planet is very similar to Earth, we might have to conquer this planet in the future. Special Mission: Kill all the aliens.";

               
        
        if(planetsUnlocked == 0){
            bmpText = game.add.bitmapText(160, 480, "gem", plutoText, 18); 
            bmpText.maxWidth = 620;}
        
        if(planetsUnlocked == 1){
            bmpText = game.add.bitmapText(160, 480, "gem", neptuneText, 18); 
            bmpText.maxWidth = 620;}
        
        if(planetsUnlocked == 2){
            bmpText = game.add.bitmapText(160, 480, "gem", uranusText, 18); 
            bmpText.maxWidth = 620;}
        
        if(planetsUnlocked == 3){
            bmpText = game.add.bitmapText(160, 480, "gem", saturnText, 18); 
            bmpText.maxWidth = 620;}
        
        if(planetsUnlocked == 4){
            bmpText = game.add.bitmapText(160, 480, "gem", jupiterText, 18); 
            bmpText.maxWidth = 620;}
        
        if(planetsUnlocked >= 5){
            bmpText = game.add.bitmapText(160, 480, "gem", marsText, 18); 
            bmpText.maxWidth = 620;}
        
        

        game.physics.startSystem(Phaser.Physics.ARCADE);
        console.log('solarSystem');
        console.log(planetsUnlocked);
        
        spaceBGM = game.add.audio('spaceBGM'); //has to be last for some reason
        spaceBGM.addMarker('spaceBGM', 0, 151);
        
        buttonBGM = game.add.audio('buttonBGM');
        buttonBGM.addMarker('click', 0, 1);
        
        spaceBGM.play('spaceBGM');
//        spaceBGM.repeat('spaceBGM'); //wrong code
    },
    
    tint: function(){
        this.tint = 0xbbbbbb;
        buttonBGM.play('click');
    },
    
    unTint: function(){
        this.tint = 0xFFFFFF;
    },
    
    changePluto: function() {
    	if(planetsUnlocked >= 0)
    		game.state.start('plutoState');
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
    update: function(){
        if(qKey.isDown) {
            console.log('q key pressed');
            //stateLoad('assets/state_test.json', null, null);
            game.state.start('marsState');
        }
    }
    
};// solarSystem State
