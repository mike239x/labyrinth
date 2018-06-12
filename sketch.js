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

  floorTiles = new Tilemap(pencil, 64, 10, 7);
  wallTiles = new Tilemap(pencil, 64, 10, 7);

  createCanvas(640, 448);

  frameRate(10);
  labyrinth = new Map(10,7);
  labyrinth.load([
    "0000000000",
    "0      0 0",
    "0  0   0 x",
    "00 0k0 0 0",
    "0   0    0",
    "00     000",
    "0000000000"
  ]);
  visible = new Map(10,7);
  visible.load([
    "XXXXXXXXXX",
    "X XXXXXXXX",
    "XXXXXXXXXX",
    "XXXXXXXXXX",
    "XXXXXXXXXX",
    "XXXXXXXXXX",
    "XXXXXXXXXX"
  ]);

  player = {
    x : 1,
    y : 1
  };
  history = [];
}

function drawFloor () {
  let floor_ = visible.clone(c => (c == ' ') ? 1 : 0);
  let rules = [
    { pattern : [[1,1,1],[1,1,1],[1,1,1]],
      tile : 1 },
    { pattern : [[_,0,_],[0,1,1],[_,1,1]],
      tile : 16 },
    { pattern : [[_,0,_],[1,1,0],[1,1,_]],
      tile : 17 },
    { pattern : [[_,1,1],[0,1,1],[_,0,_]],
      tile : 32 },
    { pattern : [[1,1,_],[1,1,0],[_,0,_]],
      tile : 33 },
    { pattern : [[1,1,_],[1,1,0],[1,1,_]],
      tile : 48 },
    { pattern : [[_,0,_],[1,1,1],[1,1,1]],
      tile : 49 },
    { pattern : [[_,1,1],[0,1,1],[_,1,1]],
      tile : 64 },
    { pattern : [[1,1,1],[1,1,1],[_,0,_]],
      tile : 65 },
    { pattern : [[1,1,1],[1,1,1],[1,1,0]],
      tile : 80 },
    { pattern : [[1,1,1],[1,1,1],[0,1,1]],
      tile : 81 },
    { pattern : [[1,1,0],[1,1,1],[1,1,1]],
      tile : 96 },
    { pattern : [[0,1,1],[1,1,1],[1,1,1]],
      tile : 97 },
    { pattern : [[_,0,_],[1,1,1],[_,0,_]],
      tile : 112 },
    { pattern : [[_,1,_],[0,1,0],[_,1,_]],
      tile : 113 },
    { pattern : [[_,0,_],[0,1,1],[_,0,_]],
      tile : 128 },
    { pattern : [[_,1,_],[0,1,0],[_,0,_]],
      tile : 129 },
    { pattern : [[_,0,_],[0,1,0],[_,1,_]],
      tile : 144 },
    { pattern : [[_,0,_],[1,1,0],[_,0,_]],
      tile : 145 },
    { pattern : [[0,1,1],[1,1,1],[0,1,1]],
      tile : 160 },
    { pattern : [[1,1,1],[1,1,1],[0,1,0]],
      tile : 161 },
    { pattern : [[0,1,0],[1,1,1],[1,1,1]],
      tile : 176 },
    { pattern : [[1,1,0],[1,1,1],[1,1,0]],
      tile : 177 },
    { pattern : [[0,1,1],[1,1,1],[1,1,0]],
      tile : 192 },
    { pattern : [[1,1,0],[1,1,1],[0,1,1]],
      tile : 193 },
    { pattern : [[_,0,_],[0,1,0],[_,0,_]],
      tile : 208 },
    { pattern : [[0,1,0],[1,1,1],[0,1,0]],
      tile : 209 },
    { pattern : [[_,0,_],[0,1,1],[_,1,0]],
      tile : 224 },
    { pattern : [[_,0,_],[1,1,0],[0,1,_]],
      tile : 225 },
    { pattern : [[_,1,0],[0,1,1],[_,0,_]],
      tile : 240 },
    { pattern : [[0,1,_],[1,1,0],[_,0,_]],
      tile : 241 },
    { pattern : [[1,1,0],[1,1,1],[_,0,_]],
      tile : 26 },
    { pattern : [[0,1,1],[1,1,1],[_,0,_]],
      tile : 27 },
    { pattern : [[1,1,_],[1,1,0],[0,1,_]],
      tile : 28 },
    { pattern : [[_,1,1],[0,1,1],[_,1,0]],
      tile : 29 },
    { pattern : [[0,1,_],[1,1,0],[0,1,_]],
      tile : 30 },
    { pattern : [[_,0,_],[1,1,1],[0,1,0]],
      tile : 31 },
    { pattern : [[_,0,_],[1,1,1],[1,1,0]],
      tile : 42 },
    { pattern : [[_,0,_],[1,1,1],[0,1,1]],
      tile : 43 },
    { pattern : [[0,1,_],[1,1,0],[1,1,_]],
      tile : 44 },
    { pattern : [[_,1,0],[0,1,1],[_,1,1]],
      tile : 45 },
    { pattern : [[_,1,0],[0,1,1],[_,1,0]],
      tile : 46 },
    { pattern : [[0,1,0],[1,1,1],[_,0,_]],
      tile : 47 },
    { pattern : [[0,1,0],[1,1,1],[0,1,1]],
      tile : 186 },
    { pattern : [[0,1,1],[1,1,1],[0,1,0]],
      tile : 187 },
    { pattern : [[1,1,0],[1,1,1],[0,1,0]],
      tile : 188 },
    { pattern : [[0,1,0],[1,1,1],[1,1,0]],
      tile : 189 },
    { pattern : [[_,_,_],[_,0,_],[_,_,_]],
      tile : 0 }
  ];
  floorTiles.generateFrom(rules, floor_);
  floorTiles.draw(0,0);
}

function drawWalls () {
  let walls = visible.clone(c => (c == '0') ? 1 : 0);
  let rules = [
    { pattern : [[1,1,1],[1,1,1],[1,1,1]],
      tile : 4 },
    { pattern : [[_,0,_],[0,1,1],[_,1,1]],
      tile : 20 },
    { pattern : [[_,0,_],[1,1,0],[1,1,_]],
      tile : 21 },
    { pattern : [[_,1,1],[0,1,1],[_,0,_]],
      tile : 36 },
    { pattern : [[1,1,_],[1,1,0],[_,0,_]],
      tile : 37 },
    { pattern : [[1,1,_],[1,1,0],[1,1,_]],
      tile : 52 },
    { pattern : [[_,0,_],[1,1,1],[1,1,1]],
      tile : 53 },
    { pattern : [[_,1,1],[0,1,1],[_,1,1]],
      tile : 68 },
    { pattern : [[1,1,1],[1,1,1],[_,0,_]],
      tile : 69 },
    { pattern : [[1,1,1],[1,1,1],[1,1,0]],
      tile : 84 },
    { pattern : [[1,1,1],[1,1,1],[0,1,1]],
      tile : 85 },
    { pattern : [[1,1,0],[1,1,1],[1,1,1]],
      tile : 100 },
    { pattern : [[0,1,1],[1,1,1],[1,1,1]],
      tile : 101 },
    { pattern : [[_,0,_],[1,1,1],[_,0,_]],
      tile : 116 },
    { pattern : [[_,1,_],[0,1,0],[_,1,_]],
      tile : 117 },
    { pattern : [[_,0,_],[0,1,1],[_,0,_]],
      tile : 132 },
    { pattern : [[_,1,_],[0,1,0],[_,0,_]],
      tile : 133 },
    { pattern : [[_,0,_],[0,1,0],[_,1,_]],
      tile : 148 },
    { pattern : [[_,0,_],[1,1,0],[_,0,_]],
      tile : 149 },
    { pattern : [[0,1,1],[1,1,1],[0,1,1]],
      tile : 164 },
    { pattern : [[1,1,1],[1,1,1],[0,1,0]],
      tile : 165 },
    { pattern : [[0,1,0],[1,1,1],[1,1,1]],
      tile : 180 },
    { pattern : [[1,1,0],[1,1,1],[1,1,0]],
      tile : 181 },
    { pattern : [[0,1,1],[1,1,1],[1,1,0]],
      tile : 196 },
    { pattern : [[1,1,0],[1,1,1],[0,1,1]],
      tile : 197 },
    { pattern : [[_,0,_],[0,1,0],[_,0,_]],
      tile : 212 },
    { pattern : [[0,1,0],[1,1,1],[0,1,0]],
      tile : 213 },
    { pattern : [[_,0,_],[0,1,1],[_,1,0]],
      tile : 228 },
    { pattern : [[_,0,_],[1,1,0],[0,1,_]],
      tile : 229 },
    { pattern : [[_,1,0],[0,1,1],[_,0,_]],
      tile : 244 },
    { pattern : [[0,1,_],[1,1,0],[_,0,_]],
      tile : 245 },
    { pattern : [[1,1,0],[1,1,1],[_,0,_]],
      tile : 26+64 },
    { pattern : [[0,1,1],[1,1,1],[_,0,_]],
      tile : 27+64 },
    { pattern : [[1,1,_],[1,1,0],[0,1,_]],
      tile : 28+64 },
    { pattern : [[_,1,1],[0,1,1],[_,1,0]],
      tile : 29+64 },
    { pattern : [[0,1,_],[1,1,0],[0,1,_]],
      tile : 30+64 },
    { pattern : [[_,0,_],[1,1,1],[0,1,0]],
      tile : 31+64 },
    { pattern : [[_,0,_],[1,1,1],[1,1,0]],
      tile : 42+64 },
    { pattern : [[_,0,_],[1,1,1],[0,1,1]],
      tile : 43+64 },
    { pattern : [[0,1,_],[1,1,0],[1,1,_]],
      tile : 44+64 },
    { pattern : [[_,1,0],[0,1,1],[_,1,1]],
      tile : 45+64 },
    { pattern : [[_,1,0],[0,1,1],[_,1,0]],
      tile : 46+64 },
    { pattern : [[0,1,0],[1,1,1],[_,0,_]],
      tile : 47+64 },
    { pattern : [[0,1,0],[1,1,1],[0,1,1]],
      tile : 186+32 },
    { pattern : [[0,1,1],[1,1,1],[0,1,0]],
      tile : 187+32 },
    { pattern : [[1,1,0],[1,1,1],[0,1,0]],
      tile : 188+32 },
    { pattern : [[0,1,0],[1,1,1],[1,1,0]],
      tile : 189+32 },
    { pattern : [[_,_,_],[_,0,_],[_,_,_]],
      tile : 0 }
  ];
  wallTiles.generateFrom(rules, walls);
  wallTiles.draw(0,0);
}

function draw () {
  background(255);
  drawFloor();
  drawWalls();
  var s = roomSize;
  stroke(255,0,0);
  fill(255,0,0);
  ellipse(player.x*s +s/2, player.y*s +s/2, 20);
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
