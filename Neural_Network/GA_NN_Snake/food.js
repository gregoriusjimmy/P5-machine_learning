class Food {
   constructor(x, y, scale) {
      this.position = createVector(x, y)
      this.scale = scale;
   }

   display() {
      fill(255);
      rect(this.position.x, this.position.y, this.scale, this.scale);
   }

   clone() {
      let rows = floor(random((width / this.scale))) * this.scale;
      let cols = floor(random((height / this.scale))) * this.scale;

      let clone = new Food(rows, cols, this.scale);

      return clone;
   }
}