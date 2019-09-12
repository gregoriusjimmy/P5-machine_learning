class Population {
   constructor(popmax) {
      this.popmax = popmax;
      this.snakes = [];
      this.savedSnakes = [];
      this.scale = 20;
      this.createStartingSnakes();
      this.generation = 0;
   }

   display() {

      // for (let i = 0; i < this.popmax; i++) {
      //    let snake = this.snakes[i];
      //    let food = this.foods[i];
      //    snake.display();
      //    rect(food.x, food.y, this.scale, this.scale);
      // }
      this.snakes[0].display();
      // this.foods[0].display();
   }
   update() {
      // if (this.snakes[0].death()) {

      //    for (let i = 0; i < this.snakes.length; i++) {
      //       this.savedSnakes.push(this.snakes[i]);
      //    }
      //    this.snakes = [];
      //    this.nextGeneration();
      // }
      if (this.allDead()) {
         this.snakes = [];
         this.nextGeneration();
      }
      for (let i = 0; i < this.snakes.length; i++) {
         if (this.snakes[i].death()) {
            this.snakes[i].isAlive = false;
            this.savedSnakes[i] = this.snakes[i];
            // this.savedSnakes.push(this.snakes[i])
            // this.snakes.splice(i, 1);
            continue;
         }
         this.snakes[i].eat();
         this.snakes[i].think();
         this.snakes[i].shift();
      }


      // this.death();
      // this.eat();
   }

   allDead() {
      let countDead = 0;
      for (let i = 0; i < this.snakes.length; i++) {
         if (!this.snakes[i].isAlive) {
            countDead++
         } else {
            break
         }
      }
      if (countDead == this.snakes.length) {
         return true;
      }

   }
   createStartingSnakes() {
      for (let i = 0; i < this.popmax; i++) {
         let rows = floor(random(width / this.scale));
         let cols = floor(random(height / this.scale));
         rows = rows * this.scale
         cols = cols * this.scale;
         let snake = new Snake(rows, cols); //brain here
         this.snakes.push(snake);
      }
   }

   calculateFitness() {
      let sum = 0;
      for (let i = 0; i < this.savedSnakes.length; i++) { //saved snakes here
         sum += this.savedSnakes[i].score;
      }

      for (let i = 0; i < this.savedSnakes.length; i++) {
         this.savedSnakes[i].fitness = this.savedSnakes[i].score / sum;
         // console.log(this.savedSnakes[i].fitness)
      }
   }

   nextGeneration() {
      console.log('next generation');
      this.calculateFitness();

      for (let i = 1; i < this.popmax; i++) {
         this.snakes[i] = this.pickOne();
      }
      this.snakes[0] = this.setBest();
      this.savedSnakes = [];
      this.generation++;

   }

   pickOne() {
      let index = 0;
      let r = random(1);
      while (r > 0) {
         r = r - this.savedSnakes[index].fitness;
         index++;
      }
      index--;
      // for(let i = 0 ; i < this.savedSnakes.length ; i++){
      //    if(r)
      // }
      // console.log(index);
      let snake = this.savedSnakes[index];

      let rows = floor(random(width / this.scale));
      let cols = floor(random(height / this.scale));
      rows = rows * this.scale
      cols = cols * this.scale;


      let child = new Snake(rows, cols, snake.brain)
      child.mutate()

      return child;
   }

   pickBest() {
      let indexBest;
      let bestScore = 0;
      if (this.generation == 0) {
         indexBest = floor(random(this.savedSnakes.length));
      } else {
         for (let i = 0; i < this.savedSnakes.length; i++) {
            if (this.savedSnakes[i].score > bestScore) {
               bestScore = this.savedSnakes[i].score;
               indexBest = i;
            }
         }
      }
      return indexBest;
   }

   setBest() {
      let rows = floor(random(width / this.scale));
      let cols = floor(random(height / this.scale));
      rows = rows * this.scale
      cols = cols * this.scale;

      let bestIndex = this.pickBest();
      let newBestBrain = this.savedSnakes[bestIndex].clone();
      let newBest = new Snake(rows, cols, newBestBrain);
      return newBest;
   }
   // selectParent() {  //selects a random number in range of the fitnesssum and if a snake falls in that range then select it
   //     let rand = random(fitnessSum);
   //     let summation = 0;
   //    for(let  i = 0; i < this.savedSnakes.length; i++) {
   //       summation += this.savedSnakes[i].fitness;
   //       if(summation > rand) {
   //         return this.savedSnakes[i];
   //       }
   //    }
   // return this.savedSnakes[0];
   // }
}