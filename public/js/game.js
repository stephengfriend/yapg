var game = new Phaser.Game(700, 700, Phaser.CANVAS, 'yapg', {
	preload: preload,
	create: create,
	update: update,
	render: render
});

let cursors;
let player;
let platforms;

function preload() {
		game.load.image('grass', 'assets/Tiles/grassMid.png');
		game.load.image('grassLeftEnd', 'assets/Tiles/grassCliffRight.png');
		game.load.image('grassRightEnd', 'assets/Tiles/grassCliffLeft.png');
		game.load.image('boxItem', 'assets/Tiles/boxItem.png');
		game.load.image('star', 'assets/Items/star.png');

		game.load.spritesheet('player', 'assets/Player/p1_spritesheet.png', 72, 97);

}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);

	platforms = game.add.group();
	platforms.enableBody = true;

	const ground = [];

	for (let i = 0; i < 10; i++) {
		ground.push(platforms.create(i * 70, game.world.height - 70, 'grass'));
	}

	ground.forEach((val) => {
		val.body.immovable = true;
	});

	player = game.add.sprite(72, game.world.height - 164, 'player');

	game.physics.arcade.enable(player);

	player.body.bounce.y = 0.2;
	player.body.gravity.y = 300;
	player.body.collideWorldBounds = true;

	//  Our two animations, walking left and right.
	player.animations.add('left', [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11], 10, true);
	player.animations.add('right', [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11], 10, true);

	const ledge = [];

	for (let i = 0; i < 2; i++) {
		ledge.push(platforms.create(i * 70, game.world.height - 400, 'grass'));
	}
	ledge.push(platforms.create(140, 300, 'grassLeftEnd'));

	ledge.push(platforms.create(400, 450, 'grassRightEnd'));
	ledge.push(platforms.create(470, 450, 'grass'));
	ledge.push(platforms.create(540, 450, 'grass'));
	ledge.push(platforms.create(610, 450, 'grassLeftEnd'));

	ledge.forEach((val) => {
		val.body.immovable = true;
	});

	var box = platforms.create(50, 100, 'boxItem');
	box.body.immovable = true;

	stars = game.add.group();
	stars.enableBody = true;

	//  Here we'll create 12 of them evenly spaced apart
	for (var i = 0; i < 12; i++) {
		//  Create a star inside of the 'stars' group
		var star = stars.create(i * 70, 0, 'star');

		//  Let gravity do its thing
		star.body.gravity.y = 6;

		//  This just gives each star a slightly random bounce value
		star.body.bounce.y = 0.7 + Math.random() * 0.2;
	}
}


function update() {
	cursors = game.input.keyboard.addKeys( { 'up': Phaser.KeyCode.SPACEBAR, 'down': Phaser.KeyCode.DOWN, 'left': Phaser.KeyCode.LEFT, 'right': Phaser.KeyCode.RIGHT } );


	const hitPlatform = game.physics.arcade.collide(player, platforms);
	const starPlatform = game.physics.arcade.collide(stars, platforms);
	const hitStars = game.physics.arcade.overlap(player, stars, (player, star) => star.kill(), null, this);

	player.body.velocity.x = 0;

	if (cursors.left.isDown)
	{
		//  Move to the left
		player.body.velocity.x = -150;

		player.animations.play('left');
	}
	else if (cursors.right.isDown)
	{
		//  Move to the right
		player.body.velocity.x = 150;

		player.animations.play('right');
	}
	else
	{
		//  Stand still
		player.animations.stop();

		player.frame = 15;
	}

	//  Allow the player to jump if they are touching the ground.
	if (cursors.up.isDown && player.body.touching.down && hitPlatform)
	{
		player.body.velocity.y = -350;
	}
}

function render() {
}
