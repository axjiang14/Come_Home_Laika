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
        
//        game.add.sprite(190, 460, 'plutoInfoSheet')
        
        p1.onInputDown.add(this.tint, p1);
        p2.onInputDown.add(this.tint, p2);
        p3.onInputDown.add(this.tint, p3);
        p4.onInputDown.add(this.tint, p4);
        p5.onInputDown.add(this.tint, p5);
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

        game.physics.startSystem(Phaser.Physics.ARCADE);
        console.log('solarSystem');
        
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
    
    update: function(){
        
    }
    
};// solarSystem State
