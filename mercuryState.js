var main = document.createElement('script');
main.src = 'main.js';
document.head.appendChild(main);

var mercuryState = {

preload: function() {
	everyPreload();
},

create: function() {

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	var background = game.add.sprite(0, 0, 'mercuryBackground');
    background.fixedToCamera = true;
	player = game.add.sprite(20, game.world.height - 70, 'laika');
	
	everyCreate();
    player.hp = savedHP + 1; // starts with old HP +1 for the coloring
    onPlayerHit(); // to color
	player.body.gravity.y = 1200; // 3 TILES JUMP 1800 = 4 TILES JUMP
	
	stateLoad('states/mercury.json');
    
},

update: function() {
	everyUpdate();
	game.physics.arcade.overlap(player, spaceship, this.spaceshipLeave, null, this);
},

spaceshipLeave: function() {
    if (player.infoSheetNum == 5){
        console.log('Got to spaceship!');
        planetsUnlocked = Math.max(planetsUnlocked, 8);
        console.log('planetsUnlocked=', planetsUnlocked);
        game.state.start('solarSystem');
        savedHP = player.hp;
        player.infoSheetNum = 0;
    }
}

}
    