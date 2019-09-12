let population;

function setup() {
   frameRate(10);
   createCanvas(600, 600);
   tf.setBackend('cpu');
   population = new Population(500);

}

function draw() {

   background(0);
   population.update();
   population.display();

   // population.snakes[0].control();

   // if (snake.death()) {
   //    console.log('New Game');
   //    createSnake();
   // }

   // population.displayFood();
   // population.control();

   // if (snake.eat(food)) {
   //    createFood();
   // }


}