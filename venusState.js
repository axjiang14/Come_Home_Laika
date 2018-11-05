var main = document.createElement('script');
main.src = 'main.js';
document.head.appendChild(main);

var venusState = {

preload: function() {
	everyPreload();
},

create: function() {
    game.world.setBounds(0 , 0, 2400, 600); //has to match with background siz...?
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	var background = game.add.sprite(0, 0, 'venusBackground');
    background.fixedToCamera = true;
	player = game.add.sprite(20, game.world.height - 70, 'laika');
	
	everyCreate();
    player.hp = savedHP + 1; // starts with old HP +1 for the coloring
    onPlayerHit(); // to color
	player.body.gravity.y = 1800; // 3 TILES JUMP 1800 = 4 TILES JUMP
    
//	for(var i = 0; i < 21; ++i){
//		var tile = platforms.create( 384, 24 * i , 'platform_tile'); // x = (nth tile+1) * 24
//        
//		//tile.scale.setTo(1, 0.25);
//		tile.enableBody = true;
//		tile.body.immovable = true;
//    }
    
	stateLoad('states/venus.json');
    
},

update: function() {
	everyUpdate();
	game.physics.arcade.overlap(player, spaceship, this.spaceshipLeave, null, this);
},

spaceshipLeave: function() {
	console.log('Got to spaceship!');
	planetsUnlocked = Math.max(planetsUnlocked, 7);
    console.log('planetsUnlocked=', planetsUnlocked);
	game.state.start('solarSystem');
    savedHP = player.hp;
}
}
    