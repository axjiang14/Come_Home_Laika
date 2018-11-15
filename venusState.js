var venusState = {

preload: function() {
	everyPreload();
},

create: function() {
    game.sound.stopAll();
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	var background = game.add.sprite(0, 0, 'venusBackground');
    background.fixedToCamera = true;
	player = game.add.sprite(20, game.world.height - 70, 'laika');
	
	everyCreate();
    player.hp = savedHP; // starts with old HP +1 for the coloring
    onPlayerHit(); // to color
	player.body.gravity.y = 1800; // 3 TILES JUMP 1800 = 4 TILES JUMP
    
    var tiles1 = platforms.create(84 * 24 , 1 * 24, 'platform_tile');
    var tiles1 = platforms.create(84 * 24 , 2 * 24, 'platform_tile');

//	for(var i = 0; i < 21; ++i){
//		var tile = platforms.create( 384, 24 * i , 'platform_tile'); // x = (nth tile+1) * 24
//        
//		//tile.scale.setTo(1, 0.25);
//		tile.enableBody = true;
////		tile.body.immovable = true;
//    }
    
	stateLoad('states/venus.json');
    venusBGM.play('',0,1,true);
    
},

update: function() {
	everyUpdate();
	game.physics.arcade.overlap(player, spaceship, this.spaceshipLeave, null, this);
//    if (ticks % 20){
//        tiles1.body.velocity.y = 600;
//    }
//    else {
//        tiles1.body.velocity.y = 300;
//    }
},

spaceshipLeave: function() {
    if (player.infoSheetNum == 5){
        console.log('Got to spaceship!');
        planetsUnlocked = Math.max(planetsUnlocked, 8);
        console.log('planetsUnlocked=', planetsUnlocked);
        game.state.start('solarSystem');
        savedHP = player.hp;
        player.infoSheetNum = 0;
        successBGM.play();
    }
}
}
    
