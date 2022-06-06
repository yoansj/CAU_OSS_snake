export default class Apple {

  constructor(blockSize, name) {
    this.block_size = blockSize;
    this.food = null;
    this.name = name;
    loadSprite("apple", "/assets/gameapple.png");
  }

  respawn_food() {
    this.new_pos = rand(vec2(1, 1), vec2(40, 40));
    this.new_pos.x = Math.floor(this.new_pos.x);
    this.new_pos.y = Math.floor(this.new_pos.y);
    this.new_pos = this.new_pos.scale(this.block_size);
    destroyAll(this.name);
    let newFood = add([sprite("apple"), pos(this.new_pos), area(), this.name]);
    this.food = newFood;
  }

  getPos() {
    return this.new_pos;
  }
}
