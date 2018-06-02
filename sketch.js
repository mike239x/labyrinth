let labyrinth;
let visible;
let player;
let roomSize = 50;
let history;
let completed = false;

function setup () {
  createCanvas(windowWidth, windowHeight);
  frameRate(10);

  labyrinth = [
    "0000000000",
    "0      0 0",
    "0  00 00 x",
    "00 0   0 0",
    "0  0k0   0",
    "0000000000"];
  visible = [
    "XXXXXXXXXX",
    "X XXXXXXXX",
    "XXXXXXXXXX",
    "XXXXXXXXXX",
    "XXXXXXXXXX",
    "XXXXXXXXXX"];
  player = {
    x : 1,
    y : 1
  };
  history = [];
}

function drawRoom (room) {
  switch (room) {
    case 'X':
      fill(100);
      break;
    case '0':
      fill(255);
      break;
    case ' ':
      fill(0);
      break;
    case 'k':
      fill(200,200,0);
      break;
    case 'x':
      fill(200,0,0);
      break;
    default:
      fill(0,0,255);
  }
  stroke(70);
  rect(0,0,roomSize,roomSize);
}

function draw () {
  var s = roomSize;
  push();
  for (let line of visible) {
    push();
    for (let room of line) {
      drawRoom(room);
      translate(s,0);
    }
    pop();
    translate(0,s);
  }
  pop();
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

function setTile (x,y,c) {
  let s = visible[y];
  visible[y] = s.slice(0,x) + c + s.slice(x+1);
}

function move (dx, dy) {
  let nx = player.x + dx;
  let ny = player.y + dy;
  let c = labyrinth[ny][nx];
  setTile(nx, ny, c);
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
      setTile(nx,ny,' ');
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
