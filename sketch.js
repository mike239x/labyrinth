let labyrinth;
let visible;
let player;
let roomSize = 64;
let history;
let completed = false;
let pencil;
let floorTiles;
let wallTiles;

function preload() {
  pencil = loadImage('tiles/pencil.png');
}

function setup () {

  createCanvas(640, 448);

  frameRate(10);

  labyrinth = new Array2D(10,7);
  labyrinth.load([
    "0000000000",
    "0      0 0",
    "0  0   0 x",
    "00 0k0 0 0",
    "0   0    0",
    "00     000",
    "0000000000"
  ]);

  floorTiles = new Layer(pencil, 64, 10, 7);
  floorTiles.rules = BASIC_PENCIL;
  floorTiles.f = c => c == ' ';
  floorTiles.outside = 0;
  wallTiles = new Layer(pencil, 64, 10, 7);
  wallTiles.rules = RED_PENCIL;
  wallTiles.f = c => c == '0';
  wallTiles.outside = 0;

  visible = new Map(64, 10, 7);
  visible.load([
    "XXXXXXXXXX",
    "X XXXXXXXX",
    "XXXXXXXXXX",
    "XXXXXXXXXX",
    "XXXXXXXXXX",
    "XXXXXXXXXX",
    "XXXXXXXXXX"
  ]);
  visible.layers.push(floorTiles);
  visible.layers.push(wallTiles);
  visible.compile();

  player = {
    x : 1,
    y : 1
  };
  history = [];
}

function draw () {
  background(255);
  visible.draw(320,224, player.x, player.y, 0.5);
  var s = roomSize;
  stroke(255,0,0);
  fill(255,0,0);
  ellipse(320, 228, 20);
  // ellipse(player.x*s +s/2, player.y*s +s/2, 20);
}

function moveChar (dx, dy) {
  let nx = player.x + dx;
  let ny = player.y + dy;
  player.x = nx;
  player.y = ny;
}

function move (dx, dy) {
  let nx = player.x + dx;
  let ny = player.y + dy;
  let c = labyrinth.get(nx,ny);
  // let c = labyrinth[ny][nx];
  visible.set(c, nx, ny);
  switch (c) {
    case 'x':
      if (player.gotKey) {
        completed = true;
        console.log('escaped the labyrinth!');
      } else {
        console.log('the door is locked...');
      }
    case '0':
      break;
    case 'k':
      player.gotKey = true;
      console.log('got the key!');
      visible.set(' ', nx, ny);
    case ' ':
      moveChar(dx,dy);
    default:
  }
}

function keyTyped () {
  switch (key) {
    case 'w':
      move(0,-1);
      break;
    case 'a':
      move(-1,0);
      break;
    case 's':
      move(0,1);
      break;
    case 'd':
      move(1,0);
      break;
    default:
  }
  if ("wasd".includes(key)) history.push(key);
    // switch (gameState) {
    //     case -1:
    //     case 1:
    //         if (keyCode == ENTER) {
    //             gameState = 0;
    //             restartGame();
    //         }
    //         break;
    //     default: //case 0:
    //         if (keysPressed.hasOwnProperty(key)) {
    //             keysPressed[key] = true;
    //         }
    // }
}
