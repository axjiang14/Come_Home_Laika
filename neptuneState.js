var startTicks;
var neptuneState = {

preload: function() {
	everyPreload();
},

create: function() {
    console.log('hello world');
    console.log('set start ticks to:', ticks);
	startTicks = ticks;
    game.sound.stopAll();
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.add.sprite(0, 0, 'neptuneBackground').fixedToCamera = true;
	player = game.add.sprite(20, game.world.height - 70, 'laika');
	
	everyCreate();
    player.hp = savedHP; // starts with old HP +1 for the coloring
    onPlayerHit(); // to acolo
    
	player.body.gravity.y = 1800;
	
	stateLoad('states/neptune.json');
    neptuneBGM.play("",0,0.3,true);
    
//    var timeLimit = game.time.events.add(Phaser.Timer.SECOND * 4, gameOver, this);

},

update: function() {
	everyUpdate();
	game.physics.arcade.overlap(player, spaceship, this.spaceshipLeave, null, this);

    if(ticks - startTicks == 5700){
        warningBGM.play();
    }
    if(ticks - startTicks > 6000){
        console.log('ran out of time');
        game.state.start('gameOverState');
    }

//    //else
//    	//console.log(ticks, startTicks);
},

spaceshipLeave: function() {
    if (player.infoSheetNum == 5){
        game.sound.stopAll();
        console.log('Got to spaceship!');
        planetsUnlocked = Math.max(planetsUnlocked, 2);
        console.log('planetsUnlocked=', planetsUnlocked);
        game.state.start('solarSystem');
        savedHP = player.hp;
        player.infoSheetNum = 0;
        successBGM.play();
    }
}

}
