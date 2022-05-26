import kaboom from "kaboom";
import "/style.css";
import "../index.css";
import Snake from "./SnakeClass";
import Apple from "./AppleClass";

kaboom();

const directions = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
};

const block_size = 15;

const player1 = new Snake(directions.RIGHT, 3, "player1", block_size);
const apple1 = new Apple(block_size, "apple");
const scorePlayer1 = add([text("Score: 0", {size: 25, width: 320}), pos(block_size * 84, block_size * 1), { value: 0 }]);

// When the snake "eats" (runs into) an apple, it gets longer.
onCollide("player1", "apple", (s, f) => {
  player1.length++;
  player1.score++;
  scorePlayer1.value++;
  scorePlayer1.text = "Score player 1:" + scorePlayer1.value;
  apple1.respawn_food();
});


onCollide("player1", "apple2", (s, f) => {
  player1.length++;
  player1.score++;
  scorePlayer1.value++;
  scorePlayer1.text = "Score player 1:" + scorePlayer1.value;
  apple2.respawn_food();
});

//########################################################  MAP CREATE  ##############################################//
loadSprite("grass", "/assets/grass.png");

layers(["grass", "game"], "game");

add([sprite("grass"), layer("grass")]);

// The size of the board is 40 x 40.
const map = addLevel(
  [
    "==================================================================================",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "=                                                                                =",
    "==================================================================================",
  ],
  {
    width: block_size,
    height: block_size,
    pos: vec2(0, 0),
    "=": () => [rect(block_size, block_size), color(255, 0, 0), area(), "wall"],
  }
);

// Once the snake dies, the final score is calculated based on the number of apples eaten by the snake.

const saveGame = () => {
  localStorage.setItem(
    "cau-snake-save",
    JSON.stringify({
      snake_length,
      score: score.value,
    })
  );
  window.location.href = "/";
};

const loadGame = () => {
  const data = JSON.parse(localStorage.getItem("cau-snake-save"));

  if (data) {
    // destroyAll("snake");
    // score.value = data.score;
    // snake_body = [];
    // snake_length = data.snake_length;
    // let mapCenter = block_size * 20;
    // for (let i = 1; i <= snake_length; i++) {
    //   let segment = add([
    //     rect(block_size, block_size),
    //     pos(mapCenter, mapCenter - block_size * i),
    //     color(173, 216, 230),
    //     area(),
    //     "snake",
    //   ]);
    //   snake_body.push(segment);
    // }
    // current_direction = directions.UP;
    // score.text = "Score:" + score.value;
    // ! Agrandir le snake quand le jeu charge
  }
};

//########################################################  SNAKE SPAWN  ##############################################//

function respawn_all() {
  player1.running = false;
  player1.spawned = false;

  wait(0.5, function () {
    apple1.respawn_food();
    player1.respawn(directions.UP);
    scorePlayer1.value = 0;
    scorePlayer1.text = "Score player 1:" + scorePlayer1.value;
  });
}

respawn_all();

// Player 1 Move //
// player1.moveAuto();
// onKeyPress("up", () => player1.changeDirection("up"));
// onKeyPress("down", () => player1.changeDirection("down"));
// onKeyPress("left", () => player1.changeDirection("left"));
// onKeyPress("right", () => player1.changeDirection("right"));
// Player 1 Move //

let move_delay = 0.035; // The snake moves at a constant speed.
let timer = 0;

onUpdate(() => {
  timer += dt();
  if (timer < move_delay) return;
  timer = 0;
  player1.update(apple1.getPos());
});

//########################################################  FOOD SPAWN  ##############################################//

//########################################################  COLLIDE  ##############################################//
// When the snake "eats" (runs into) an apple, it gets longer.
// onCollide("snake", "food", (s, f) => {
// snake_length++;
// score.value++;
// score.text = "Score:" + score.value;
//   apple1.destroy_food();

//   apple1.respawn_food();
// });

const goToScores = () => {
  wait(1.5, () => {
    localStorage.setItem("cau-snake-lastScore", JSON.stringify(score.value));
    window.location.href = "/scores/";
  });
};

onLoad(() => {
  const body = document.querySelector("body");
  body.style = "overflow: hidden;";

  const loadGameData = JSON.parse(localStorage.getItem("cau-snake-needs-load"));

  if (loadGameData === true) {
    wait(0.5, () => {
      loadGame();
      localStorage.setItem("cau-snake-needs-load", JSON.stringify(false));
    });
  }

  document.querySelector("canvas").focus();
});

//########################################################  IN GAME MENU  ##############################################//
const escape = document.getElementById("in-game-escape");
let onPause = false;

escape.style.display = "none";

onKeyPress("escape", () => {
  onPause = !onPause;
  player1.running = !player1.running;
  if (onPause) {
    escape.style.display = "block";
  } else {
    escape.style.display = "none";
  }
});

focus();
document.getElementById("button-resume").onclick = function () {
  onPause = false;
  escape.style.display = "none";
  focus();
};

document.getElementById("button-restart").onclick = function () {
  onPause = false;
  escape.style.display = "none";
  respawn_all();
  focus();
};

document.getElementById("button-save").onclick = function () {
  saveGame();
};

document.getElementById("button-exit").onclick = function () {
  window.location.href = "/";
};

// player1.goToScores = goToScores;
player1.respawnFood = apple1.respawn_food;