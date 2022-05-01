import kaboom from "kaboom";

kaboom();

const block_size = 20;

const directions = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
};

let current_direction = directions.RIGHT;
let run_action = false;
let snake_length = 3;
let snake_body = [];

const map = addLevel(
  [
    "==========================================",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "=                                        =",
    "==========================================",
  ],
  {
    width: block_size,
    height: block_size,
    pos: vec2(0, 0),
    "=": () => [rect(block_size, block_size), color(255, 0, 0), area(), "wall"],
  }
);

function respawn_snake() {
  destroyAll("snake");

  snake_body = [];
  snake_length = 3;

  for (let i = 1; i <= snake_length; i++) {
    let segment = add([
      rect(block_size, block_size),
      pos(block_size, block_size * i),
      color(0, 0, 255),
      area(),
      "snake",
    ]);
    snake_body.push(segment);
  }
  current_direction = directions.RIGHT;
}

function respawn_all() {
  run_action = false;
  wait(0.5, function () {
    respawn_snake();
    run_action = true;
  });
}

respawn_all();

onKeyPress("up", () => {
  if (current_direction != directions.DOWN) {
    current_direction = directions.UP;
  }
});

onKeyPress("down", () => {
  if (current_direction != directions.UP) {
    current_direction = directions.DOWN;
  }
});

onKeyPress("left", () => {
  if (current_direction != directions.RIGHT) {
    current_direction = directions.LEFT;
  }
});

onKeyPress("right", () => {
  if (current_direction != directions.LEFT) {
    current_direction = directions.RIGHT;
  }
});
