const directions = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
};

/**
 * Represents a snake
 */
export default class Snake {
  constructor(direction, length, name, block_size, pos) {
    // Snake member variables
    this.current_direction = direction;
    this.length = length;
    this.body = [];
    this.name = name;
    this.score = 0;
    this.running = true;
    this.move_delay = 0.1;
    this.block_size = block_size;
    this.spawned = false;
    this.pos = pos;
    // Snake member variables

    // Functions to call
    this.respawnFood = () => {};
    this.goToScores = () => {};
    // Functions to call

    // Collision with wall
    onCollide(this.name, "wall", (s, w) => {
      this.running = false;
      shake(12);
      this.goToScores();
    });

    // Collision with itself
    onCollide(this.name, this.name, (s, t) => {
      this.running = false;
      shake(12);
      this.goToScores();
    });
  }

  /**
   * Respawns the snake
   * @param {String} direction - Respawn direction
   */
  respawn(direction) {
    destroyAll(this.name);
    this.body = [];
    this.length = 3;

    for (let i = 1; i <= this.length; i++) {
      let segment = add([
        rect(this.block_size, this.block_size),
        pos(this.pos.x, this.pos.y + this.block_size * i),
        color(173, 216, 230),
        area(),
        this.name,
      ]);
      this.body.push(segment);
    }
    this.current_direction = direction;
    this.running = true;
    this.spawned = true;
  }

  /**
   * Changes the direction of the snake
   * @param {String} direction
   */
  changeDirection(direction) {
    if (direction === directions.UP) {
      if (this.current_direction != directions.DOWN) {
        this.current_direction = directions.UP;
      }
    }
    if (direction === directions.DOWN) {
      if (this.current_direction != directions.UP) {
        this.current_direction = directions.DOWN;
      }
    }
    if (direction === directions.LEFT) {
      if (this.current_direction != directions.RIGHT) {
        this.current_direction = directions.LEFT;
      }
    }
    if (direction === directions.RIGHT) {
      if (this.current_direction != directions.LEFT) {
        this.current_direction = directions.RIGHT;
      }
    }
  }

  update() {
    if (!this.running) return;
    if (!this.spawned) return;

    let move_x = 0;
    let move_y = 0;

    switch (this.current_direction) {
      case directions.DOWN:
        move_x = 0;
        move_y = this.block_size;
        break;
      case directions.UP:
        move_x = 0;
        move_y = -1 * this.block_size;
        break;
      case directions.LEFT:
        move_x = -1 * this.block_size;
        move_y = 0;
        break;
      case directions.RIGHT:
        move_x = this.block_size;
        move_y = 0;
        break;
    }

    let snake_head = this.body[this.body.length - 1];

    this.body.push(
      add([
        rect(this.block_size, this.block_size),
        pos(snake_head.pos.x + move_x, snake_head.pos.y + move_y),
        color(173, 216, 230),
        area(),
        this.name,
      ])
    );

    if (this.body.length > this.length) {
      let tail = this.body.shift();
      destroy(tail);
    }
  }
}
