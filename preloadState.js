var preloadState= {
    preload: function() {
        game.load.image('background', 'assets/BGPluto.png');
        game.load.image('neptuneBackground', 'assets/NeptuneBackground_test.png');
        game.load.image('uranusBackground', 'assets/BGUranus.png');
        game.load.image('saturnBackground', 'assets/BGSaturn.png');
        game.load.image('jupiterBackground', 'assets/BGJupiter.png');
        game.load.image('marsBackground', 'assets/BGMars.png');
        game.load.image('venusBackground', 'assets/BGVenus.png');
        game.load.image('mercuryBackground', 'assets/BGMercury.png');
        game.load.image('earthBackground', 'assets/BGEarth.png');
        game.load.image('space', 'assets/Spacee.png');
        game.load.image('endBG', 'assets/enddBG.png');
        game.load.image('introBG', 'assets/introoBG.png');
        
        //start state assets
        game.load.image('homeScreen', 'assets/HomeScreen.png');
        game.load.image('startButton', 'assets/buttonStart.png');
        
        //tutorial state assets
        game.load.image('tutBackground', 'assets/tutorial.png');
        game.load.image('nextButton', 'assets/buttonNext.png');
        game.load.image('bonusButton', 'assets/buttonBonus.png');
        
        //game over state assets
        game.load.image('overScreen', 'assets/GameOverScreen.png');
		game.load.image('ground', 'assets/platform.png');
        game.load.image('restartButton', 'assets/buttonRestart.png');
        
        //game.load.video('demo','assets/demo.mp4');
        
        //solar system assets
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
        game.load.image('LaikaNoHelmet', 'assets/LaikaNoHelmett.png');
        game.load.audio('spaceBGM', 'assets/BackGroundMusic/SpaceBGM.mp3');
        game.load.bitmapFont('gem', 'assets/gem.png', 'assets/gem.xml');
        

        game.load.image('ground', 'assets/platform.png');
        game.load.image('platform_tile', 'assets/DPlatformS.png');
        game.load.image('tile_light', 'assets/LPlatformS.PNG');
        game.load.image('uiBar', 'assets/uiBar.png');

        game.load.spritesheet('alien1', 'assets/AlienBasic.png', 32, 40);
        game.load.spritesheet('alien2', 'assets/AlienLong.png', 32, 48);
        game.load.spritesheet('alien3', 'assets/AlienBouncy.png', 32, 48);
        game.load.spritesheet('alien4', 'assets/AlienFlame.png', 32, 48);
        game.load.spritesheet('alien5', 'assets/AlienSpaceship.png', 32, 32);
        game.load.spritesheet('alien6', 'assets/AlienFlying.png', 48, 48);
        game.load.spritesheet('boss1', 'assets/BossBasic.png', 60, 64);
        game.load.spritesheet('alien4', 'assets/BossSquid.png', 51, 96);
        game.load.spritesheet('laika', 'assets/laika.png', 32, 48);

        game.load.image('bullet', 'assets/Beam-Pink.png');
        game.load.image('flame', 'assets/Beam-Fire.png');
        game.load.image('ice', 'assets/Beam-Ice.png');
        game.load.image('red', 'assets/Beam-Red.png');
        game.load.image('purple', 'assets/Beam-Purple.png');
        game.load.image('orange', 'assets/Beam-Orange.png');

        game.load.image('infoSheet', 'assets/battery.png');// need to be changed to InformationSheet.
        game.load.image('healthKit', 'assets/Health.png');

        game.load.image('white_tile', 'assets/white_rect.png');
        game.load.image('spaceship', 'assets/Spaceship.PNG');
        game.load.image('crosshair', 'assets/crosshair.png');


        game.load.audio('gunBGM', 'assets/BackGroundMusic/gunBGM.mp3');
        game.load.audio('spaceBGM', 'assets/BackGroundMusic/SpaceBGM.mp3');
        game.load.audio('buttonBGM', 'assets/BackGroundMusic/buttonBGM.mp3');
        game.load.audio('successBGM', 'assets/BackGroundMusic/takeoffBGM.mp3');
        game.load.audio('collectBGM', 'assets/BackGroundMusic/starBGM.wav');
        game.load.audio('healthBGM', 'assets/BackGroundMusic/healthBGM.mp3');
        game.load.audio('sadTromboneBGM', 'assets/BackGroundMusic/sadTromboneBGM.mp3');
        game.load.audio('impactBGM', 'assets/BackGroundMusic/impactBGM.mp3');
        game.load.audio('bigImpactBGM', 'assets/BackGroundMusic/bigImpactBGM.mp3');
        game.load.audio('warningBGM', 'assets/BackGroundMusic/warningBGM.mp3');
        game.load.audio('plutoBGM', 'assets/BackGroundMusic/plutoBGM.wav');
        game.load.audio('neptuneBGM', 'assets/BackGroundMusic/neptuneBGM.mp3');
        game.load.audio('uranusBGM', 'assets/BackGroundMusic/uranusBGM.mp3');
        game.load.audio('saturnBGM', 'assets/BackGroundMusic/saturnBGM.wav');
        game.load.audio('jupiterBGM', 'assets/BackGroundMusic/jupiterBGM.wav');
        game.load.audio('marsBGM', 'assets/BackGroundMusic/marsBGM.wav');
        game.load.audio('mercuryBGM', 'assets/BackGroundMusic/mercuryBGM.mp3');
        game.load.audio('venusBGM', 'assets/BackGroundMusic/venusBGM.mp3');
        game.load.audio('earthBGM', 'assets/BackGroundMusic/earthBGM.mp3');
        game.load.audio('finalBossBGM', 'assets/BackGroundMusic/finalBossBGM.wav');
	
    },
    
    create: function() {
        game.state.start('gameStartState');
    }
	
    
}