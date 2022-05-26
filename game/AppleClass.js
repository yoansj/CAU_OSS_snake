export default class Apple {
  constructor(blockSize) {
    this.block_size = blockSize;
    this.food = null;
    loadSprite("apple", "/assets/gameapple.png");
  }

  respawn_food() {
    let new_pos = rand(vec2(1, 1), vec2(80, 40));
    new_pos.x = Math.floor(new_pos.x);
    new_pos.y = Math.floor(new_pos.y);
    new_pos = new_pos.scale(this.block_size);
    destroyAll("food");
    let newFood = add([sprite("apple"), pos(new_pos), area(), "food"]);
    this.food = newFood;
  }
}
