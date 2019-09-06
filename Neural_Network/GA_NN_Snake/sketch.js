let snake;
let food;
let scale = 40;

function setup() {
   frameRate(10);
   createCanvas(400, 400);
   createSnake();

   createFood();

}

function draw() {

   background(0);
   snake.update();
   snake.display();
   if (snake.death()) {
      console.log('New Game');
      createSnake();
   }

   displayFood();
   control();

   if (snake.eat(food)) {
      createFood();
   }


}

function displayFood() {
   fill(255);
   rect(food.x, food.y, scale, scale);
}

function createFood() {
   let rows = width / scale;
   let cols = height / scale;

   food = createVector(floor(random(rows)), floor(random(cols)));
   food.mult(scale);
}

function control() {
   if (keyCode === UP_ARROW) {
      snake.turn(0, -1);
   } else if (keyCode === DOWN_ARROW) {
      snake.turn(0, 1);
   }
   if (keyCode === LEFT_ARROW) {
      snake.turn(-1, 0);
   } else if (keyCode === RIGHT_ARROW) {
      snake.turn(1, 0);
   }
}

function createSnake() {
   let rows = floor(random(width / scale));
   let cols = floor(random(height / scale));
   rows = rows * scale
   cols = cols * scale;
   snake = new Snake(rows, cols);
}