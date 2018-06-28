var config = {
  type: Phaser.AUTO,
  width: 590,
  height: 360,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var player;
var enem;
var aid;
var bombs;
var platforms;
var cursors;
var life = 3;
var gameOver = false;
var lifeText;
var message;
var tree;
var tree1;
var tree2;
var trees;
var trees1;
var trees2;
var pine;
var pine1;
var pines;
var pines1;
var mushrooms;

//game creation
var game = new Phaser.Game(config);

function preload() {
  this.load.image("background", "assets/background.png");
  this.load.image("ground", "assets/platform.png");
  this.load.image("player", "assets/player.png");
  this.load.image("enemy", "assets/dragon.png");
  this.load.image("treasure", "assets/treasure.png");
  this.load.image("bomb", "assets/fireball.png");
  this.load.image("aid", "assets/firstaid.png");
  this.load.image("tree", "assets/tree.png");
  this.load.image("tree2", "assets/tree.png");
  this.load.image("tree1", "assets/tree.png");
  this.load.image("trees", "assets/trees.png");
  this.load.image("trees1", "assets/trees.png");
  this.load.image("trees2", "assets/trees.png");
  this.load.image("pines", "assets/pines.png");
  this.load.image("pines1", "assets/pines.png");
  this.load.image("pine", "assets/pine.png");
  this.load.image("pine1", "assets/pine.png");
  this.load.image("mushrooms", "assets/mushrooms.png");
  this.load.image("mushrooms1", "assets/mushrooms.png");
  this.load.image("mushrooms2", "assets/mushrooms.png");
}

//creation
function create() {
  let bg = this.add.sprite(0, 0, "background");
  bg.setPosition(640 / 2, 360 / 2);

  tree = this.physics.add.sprite(50, 330, 'tree');
  tree.body.immovable = true;tree.body.moves = false;

  tree1 = this.physics.add.sprite(60, 80, 'tree');
  tree1.body.immovable = true;tree1.body.moves = false;

  tree2 = this.physics.add.sprite(300, 100, 'tree');
  tree2.body.immovable = true;tree2.body.moves = false;

  trees = this.physics.add.sprite(170, 150, 'trees');
  trees.body.immovable = true;trees.body.moves = false;

  trees1 = this.physics.add.sprite(440, 30, 'trees');
  trees1.body.immovable = true;trees1.body.moves = false;

  trees2 = this.physics.add.sprite(410, 330, 'trees');
  trees2.body.immovable = true;trees2.body.moves = false;

  pine = this.physics.add.sprite(310, 230, 'pine');
  pine.body.immovable = true;pine.body.moves = false;

  pine1 = this.physics.add.sprite(150, 270, 'pine');
  pine1.body.immovable = true;pine1.body.moves = false;

  pines = this.physics.add.sprite(270, 330, 'pines');
  pines.body.immovable = true;pines.body.moves = false;

  pines1 = this.physics.add.sprite(560, 90, 'pines');
  pines1.body.immovable = true;pines1.body.moves = false;

  mushrooms = this.physics.add.sprite(200, 40, 'mushrooms');
  mushrooms.body.immovable = true;mushrooms.body.moves = false;

  mushrooms1 = this.physics.add.sprite(420, 150, 'mushrooms');
  mushrooms1.body.immovable = true;mushrooms1.body.moves = false;
  
  mushrooms2 = this.physics.add.sprite(520, 340, 'mushrooms');
  mushrooms2.body.immovable = true;mushrooms2.body.moves = false;

  enem = this.physics.add.sprite(560, 270, "enemy");
  enem.setScale(0.75);
  enem.setCollideWorldBounds(true);
  enem.flipX = true;

  prize = this.add.sprite(570, 340, "treasure");
  prize.setScale(0.5);

  aid = this.physics.add.sprite(445, 90, "aid");
  aid.setScale(1.5);
  aid.body.immovable = true;
  aid.body.moves = false;

  player = this.physics.add.sprite(50, 180, "player");
  player.setScale(0.5);
  //player.flipX = true;

  //  Player physics properties.
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  bombs = this.physics.add.sprite(560, 265, "bomb");
  bombs.setScale(1);
  bombs.setCollideWorldBounds(false);

  //  The score
  lifeText = this.add.text(16, 16, "Life: 3", {
    fontSize: "32px",
    fill: "#FFFFFF"
  });

  //  Collide the player and the stars with the platforms
  //this.physics.add.collider(player, platforms);
  this.physics.add.collider(player, enem, hitenem, null, this);
  this.physics.add.collider(enem, prize);
  //this.physics.add.collider(bombs, platforms);

  //  Checks to see if the player overlaps with any of the aid, if he does call the collectaid function
  this.physics.add.overlap(player, aid, collectaid, null, this);

  this.physics.add.collider(player, bombs, hitBomb, null, this);

  //checks player with trees and stuff
  this.physics.add.collider(player, tree);
  this.physics.add.collider(player, tree1);
  this.physics.add.collider(player, tree2);
  this.physics.add.collider(player, trees);
  this.physics.add.collider(player, trees1);
  this.physics.add.collider(player, trees2);
  this.physics.add.collider(player, pine);
  this.physics.add.collider(player, pine1);
  this.physics.add.collider(player, pines);
  this.physics.add.collider(player, pines1);
  this.physics.add.collider(player, mushrooms);
  this.physics.add.collider(player, mushrooms1);
  this.physics.add.collider(player, mushrooms2);

  // checks the trees and stuff
  this.physics.add.collider(bombs, tree, hitp, null, this);
  this.physics.add.collider(bombs, tree1, hitp, null, this);
  this.physics.add.collider(bombs, tree2, hitp, null, this);
  this.physics.add.collider(bombs, trees, hitp, null, this);
  this.physics.add.collider(bombs, trees1, hitp, null, this);
  this.physics.add.collider(bombs, tree2, hitp, null, this);
  this.physics.add.collider(bombs, pine, hitp, null, this);
  this.physics.add.collider(bombs, pine1, hitp, null, this);
  this.physics.add.collider(bombs, pines, hitp, null, this);
  this.physics.add.collider(bombs, pines1, hitp, null, this);
  this.physics.add.collider(bombs, mushrooms, hitp, null, this);
  this.physics.add.collider(bombs, mushrooms1, hitp, null, this);
  this.physics.add.collider(bombs, mushrooms2, hitp, null, this);

  cursors = this.input.keyboard.createCursorKeys();
}

let direction = "UP"; // UP and DOWN as literals

function update() {
  if (gameOver) {
    return;
  }
  bombs.setVelocityY(0);
  if (!bombs.active) {
    bombs.body.enable = true;
  }
  if (bombs.x < 0) {
    bombs.y = enem.y;
    bombs.x = 560;
  } else {
    bombs.setVelocityX(-100);
  }

  // console.log(bombs);

  if (parseInt(enem.y) <= 140) {
    direction = "DOWN";
  } else if (parseInt(enem.y) >= 300) {
    direction = "UP";
  }
  direction == "UP" ? enem.setVelocityY(-70) : enem.setVelocityY(70);

  if (cursors.left.isDown) {
    player.flipX = true;
    player.setVelocityX(-150);
  } else if (cursors.right.isDown) {
    player.flipX = false;
    player.setVelocityX(150);
  } else {
    player.setVelocityX(0);
  }

  if (cursors.up.isDown) {
    player.setVelocityY(-150);
  }

  if (player.y >= 320) {
    if (player.x >= 550) {
      message = this.add.text(250, 170, "YOU WIN", {
        fontSize: "32px",
        fill: "#000"
      });

      this.physics.pause();
      gameOver = true;
      setTimeout(window.location.reload(false), 50000);
    }
  }
}

function collectaid(player, aid) {
  //  Add and update the score
  if (life < 3) {
    life += 1;
  }
  lifeText.setText("Life: " + life);
  aid.disableBody(true,true);
}

function hitBomb(player, bombs) {
  life -= 1;
  lifeText.setText("Life: " + life);
  if (life == 0) {
    this.physics.pause();

    player.setTint(0xff0000);

    message = this.add.text(250, 170, "GAME OVER", {
      fontSize: "32px",
      fill: "#000"
    });
    gameOver = true;
    setTimeout(window.location.reload(false), 50000);
  }
  // bombs.disableBody(true, true);
  bombs.y = enem.y;
  bombs.x = 560;
}

function hitenem(player, enem) {
  this.physics.pause();
  player.setTint(0xff0000);
  message = this.add.text(250, 170, "GAME OVER", {
    fontSize: "32px",
    fill: "#000"
  });
  gameOver = true;
  setTimeout(window.location.reload(false), 50000);
  
}

//hitting plants

function hitp(bombs, tree){
  bombs.y = enem.y;
  bombs.x = 560;
}
function hitp(bombs, tree1){
  bombs.y = enem.y;
  bombs.x = 560;
}
function hitp(bombs, tree2){
  bombs.y = enem.y;
  bombs.x = 560;
}
function hitp(bombs, trees){
  bombs.y = enem.y;
  bombs.x = 560;
}
function hitp(bombs, trees1){
  bombs.y = enem.y;
  bombs.x = 560;
}
function hitp(bombs, trees2){
  bombs.y = enem.y;
  bombs.x = 560;
}
function hitp(bombs, pines){
  bombs.y = enem.y;
  bombs.x = 560;
}
function hitp(bombs, pines1){
  bombs.y = enem.y;
  bombs.x = 560;
}
function hitp(bombs, pines){
  bombs.y = enem.y;
  bombs.x = 560;
}
function hitp(bombs, pin){
  bombs.y = enem.y;
  bombs.x = 560;
}
function hitp(bombs, mushrooms){
  bombs.y = enem.y;
  bombs.x = 560;
}
function hitp(bombs, mushrooms1){
  bombs.y = enem.y;
  bombs.x = 560;
}
function hitp(bombs, mushrooms2){
  bombs.y = enem.y;
  bombs.x = 560;
}
