class Snake {
   constructor(x, y, brain) {
      this.xspeed = 1;
      this.yspeed = 0;
      this.scale = 20;
      this.body = [];
      this.body[0] = createVector(x, y);
      this.score = 0;
      this.fitness = 0;
      this.len = 1;
      this.lifetime = 0;
      this.isAlive = true;
      // this.vision = [];
      this.food = this.createFood();
      if (brain) {
         this.brain = brain.copy();
      } else {
         this.brain = new NeuralNetwork(24, 48, 4);
      }
   }

   createFood() {
      let rows = width / this.scale;
      let cols = height / this.scale;

      let food = new Food(floor(random(rows)), floor(random(cols)), this.scale);
      food.position.mult(this.scale);
      return food
   }
   eat() {

      // if (d < this.scale) {

      let x = this.body[this.body.length - 1].x;
      let y = this.body[this.body.length - 1].y;
      // let d = dist(x, y, this.food.position.x, this.food.position.y);
      // if (d < 1) {
      if (this.foodCollide(x, y)) {
         // console.log('eated');
         this.lifetime = 0;
         this.addTail();
         this.score += 10;
         this.food = this.food.clone();
         // console.log(this.score);
         return true;
      }

   }

   foodCollide(x, y) {
      // let d = dist(x, y, this.food.position.x, this.food.position.y);
      if (x == this.food.position.x && y == this.food.position.y) {
         // if (d < this.scale) {
         return true;
         // }
      }

   }
   shift() {

      let head = this.body[this.body.length - 1].copy();
      this.body.shift();
      head.x += this.xspeed * this.scale;
      head.y += this.yspeed * this.scale;
      this.body.push(head);
      this.lifetime++;

      // head.x = constrain(head.x, 0, width - this.scale);
      // head.y = constrain(head.y, 0, height - this.scale);
   }

   display() {

      for (let i = 0; i < this.body.length; i++) {
         fill(255);
         rect(this.body[i].x, this.body[i].y, this.scale, this.scale);
      }
      // let test = this.body[0];
      // fill('yellow');
      // rect(test.x, test.y, this.scale, this.scale);
      // let head = this.body[this.body.length - 1];
      // fill('red');
      // rect(head.x, head.y, this.scale, this.scale);
      fill(255);
      rect(this.food.position.x, this.food.position.y, this.scale, this.scale);
   }

   turn(x, y) {
      this.xspeed = x;
      this.yspeed = y;
   }
   death() {
      let head = this.body[this.body.length - 1];
      if (this.wallCollide(head.x, head.y) || this.bodyCollide(head.x, head.y) || this.lifetime > 300) {
         // console.log('die uy')
         return true;

      }

   }
   mutate() {
      this.brain.mutate(0.1);
   }
   wallCollide(x, y) {
      // let head = this.body[this.body.length - 1];
      if (y > height || y < 0 || x > width || x < 0) {
         // console.log('DIEEE WALL STUPID');
         return true;
      }
   }
   bodyCollide(x, y) {
      // let head = this.body[this.body.length - 1];

      for (let i = 0; i < this.body.length - 1; i++) {
         // let d = dist(x, y, this.body[i].x, this.body[i].y);
         // if (d < 1) {
         // if (x == this.body[this.body.length - 1].x && y == this.body[this.body.length - 1].y) {
         //    continue;
         // }
         if (x === this.body[i].x && y === this.body[i].y) {
            // console.log('DIEE body');
            return true;
         }

      }

   }
   think() {
      let lookhere;
      let vision = [];
      lookhere = this.lookInDirection(createVector(0, -this.scale));
      vision[0] = lookhere[0];
      vision[1] = lookhere[1];
      vision[2] = lookhere[2];

      lookhere = this.lookInDirection(createVector(this.scale, -this.scale));
      vision[3] = lookhere[0];
      vision[4] = lookhere[1];
      vision[5] = lookhere[2];

      lookhere = this.lookInDirection(createVector(this.scale, 0));
      vision[6] = lookhere[0];
      vision[7] = lookhere[1];
      vision[8] = lookhere[2];

      lookhere = this.lookInDirection(createVector(this.scale, this.scale));
      vision[9] = lookhere[0];
      vision[10] = lookhere[1];
      vision[11] = lookhere[2];

      lookhere = this.lookInDirection(createVector(0, this.scale));
      vision[12] = lookhere[0];
      vision[13] = lookhere[1];
      vision[14] = lookhere[2];

      lookhere = this.lookInDirection(createVector(-this.scale, this.scale));
      vision[15] = lookhere[0];
      vision[16] = lookhere[1];
      vision[17] = lookhere[2];

      lookhere = this.lookInDirection(createVector(-this.scale, 0));
      vision[18] = lookhere[0];
      vision[19] = lookhere[1];
      vision[20] = lookhere[2];

      lookhere = this.lookInDirection(createVector(-this.scale, -this.scale));
      vision[21] = lookhere[0];
      vision[22] = lookhere[1];
      vision[23] = lookhere[2];


      let inputs = vision;
      // console.log(inputs);
      let output = this.brain.predict(inputs);
      // console.log(output);
      let max = 0;
      let maxIndex;
      for (let i = 0; i < output.length; i++) {
         if (output[i] > max) {
            max = output[i];
            maxIndex = i;

         }

      }
      // console.log(max, maxIndex);
      if (maxIndex == 0) {
         this.turn(0, -1);
      }
      if (maxIndex == 1) {
         this.turn(1, 0);
      }
      if (maxIndex == 2) {
         this.turn(0, 1);
      }
      if (maxIndex == 3) {
         this.turn(-1, 0);
      }
   }

   lookInDirection(direction) {
      let head = this.body[this.body.length - 1];
      let look = createVector(head.x, head.y)
      let found = [];
      found[0] = 0;
      found[1] = 0;
      found[2] = 0;
      let foodIsFound = false;
      let bodyisFound = false;
      let distance = 0;
      look.add(direction);
      distance++;
      noStroke();

      // console.log(look);
      while (!this.wallCollide(look.x, look.y)) {
         if (this.foodCollide(look.x, look.y) && !foodIsFound) {
            // console.log('found food');

            found[0] = 1;
            foodIsFound = true;
         }
         if (this.bodyCollide(look.x, look.y) && !bodyisFound) {
            found[1] = 1;
            bodyisFound = true;

         }
         // if (this.wallCollide(look.x, look.y)) {
         // console.log('wall over there');
         found[2] = 1 / distance;
         // }


         look.add(direction);
         distance++;

      }
      // console.log(found);
      return found;

   }
   addTail() {
      let head = this.body[this.body.length - 1].copy();
      this.len++;
      this.body.push(head);
   }
   control() {
      if (keyCode === UP_ARROW) {
         this.turn(0, -1);
      } else if (keyCode === DOWN_ARROW) {
         this.turn(0, 1);
      }
      if (keyCode === LEFT_ARROW) {
         this.turn(-1, 0);
      } else if (keyCode === RIGHT_ARROW) {
         this.turn(1, 0);
      }
   }

   clone() {
      let cloneBrain = this.brain;
      return cloneBrain;
   }


}