let apes = [];
let foods = [];
let predators = [];

function setup() {
   createCanvas(600, 600);
   for (let i = 0; i < 15; i++) {
      let x = random(width);
      let y = random(height);

      apes[i] = new Ape(x, y);
   }

   for (let i = 0; i < 5; i++) {
      let x = random(width);
      let y = random(height);

      predators[i] = new Predator(x, y);
   }
   for (let i = 0; i < 20; i++) {
      foods.push(createVector(random(width), random(height)));
   }

}

function draw() {


   background(255);

   for (let i = 0; i < apes.length; i++) {
      apes[i].display();
      apes[i].update();
      apes[i].behaviors(foods, predators);
      apes[i].boundaries();

      if (apes[i].isDead) {
         apes.splice(i, 1)
      }

      // if (apes[i].position.x > width) {
      //    apes[i].position.x = 0;
      // }
      // if (apes[i].position.x < 0) {
      //    apes[i].position.x = width;
      // }
      // if (apes[i].position.y > height) {
      //    apes[i].position.y = 0;
      // }
      // if (apes[i].position.y < 0) {
      //    apes[i].position.y = height;
      // }

   }
   for (let i = 0; i < predators.length; i++) {
      predators[i].display();
      predators[i].update();
      predators[i].behaviors(apes)
      predators[i].boundaries();
      if (predators[i].isDead) {
         predators.splice(i, 1)
      }
      // predators[i].behaviors(foods, predators);

      // if (predators[i].position.x > width) {
      //    predators[i].position.x = 0;
      // }
      // if (predators[i].position.x < 0) {
      //    predators[i].position.x = width;
      // }
      // if (predators[i].position.y > height) {
      //    predators[i].position.y = 0;
      // }
      // if (predators[i].position.y < 0) {
      //    predators[i].position.y = height;
      // }

   }

   if (random(1) < 0.1) {
      foods.push(createVector(random(width), random(height)));
   }

   for (let i = 0; i < foods.length; i++) {

      let x = foods[i].x;
      let y = foods[i].y;

      fill(0, 255, 0);
      ellipse(x, y, 3, 3);
   }
   // for (let i = 0; i < predators.length; i++) {

   //    let x = predators[i].x;
   //    let y = predators[i].y;

   //    fill(255, 0, 0);
   //    ellipse(x, y, 6, 6);
   // }


}