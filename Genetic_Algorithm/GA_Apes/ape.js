class Ape {

   constructor(x, y, dna) {
      this.position = createVector(x, y);
      this.velocity = createVector(0, 0);
      this.acceleration = createVector(0, 0);
      this.r = 10;
      this.maxspeed = 5;
      this.maxforce = 0.5;
      this.health = 100;
      this.mutationRate = 0.1
      this.isDebug = true;
      this.isDead = false;
      this.dna = [];

      if (dna === undefined) {
         //food perception
         this.dna[0] = random(0, 100);
         //enemy perception
         this.dna[1] = random(0, 100);
      } else {
         //mutate
         this.dna[0] = dna[0];
         if (random(1) < this.mutationRate) {
            this.dna[0] += random(-10, 10);
         }
         this.dna[1] = dna[1];
         if (random(1) < this.mutationRate) {
            this.dna[1] += random(-10, 10);
         }
      }

   }

   display() {
      if (this.isDebug) {
         noFill()
         stroke(0, 255, 0);
         ellipse(this.position.x, this.position.y, this.dna[0], this.dna[0]);
         noFill()
         stroke(255, 0, 0)
         ellipse(this.position.x, this.position.y, this.dna[1], this.dna[1]);
      }
      noStroke();
      let healthMap = map(this.health, 0, 100, 0, 255);
      fill(0, healthMap);
      ellipse(this.position.x, this.position.y, this.r, this.r);
   }

   update() {
      this.health -= 0.1;
      this.velocity.add(this.acceleration);

      this.velocity.limit(this.maxspeed);
      this.position.add(this.velocity);

      this.acceleration.mult(0);
      if (this.health < 0) {
         this.isDead = true;
      }
   }


   applyForce(force) {
      this.acceleration.add(force);
   }

   seek(target) {
      let desired = p5.Vector.sub(target, this.position);

      desired.setMag(this.maxspeed);

      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);

      return steer;
      // this.applyForce(steer);
   }
   eat(foodsList) {
      let recordFood = Infinity;
      let closestFood = null;

      for (let i = foodsList.length - 1; i >= 0; i--) {
         let df = this.position.dist(foodsList[i]);
         if (df < this.maxspeed) {
            this.health += 0.5;
            foodsList.splice(i, 1);
         } else {
            if (df < recordFood && df < this.dna[0]) {
               recordFood = df;
               closestFood = foodsList[i];
            }
         }

      }
      if (closestFood != null) {
         return closestFood;
      }
   }
   evade(predatorList) {
      let recordPredator = Infinity
      let closestPredator = null;

      for (let i = 0; i < predatorList.length; i++) {
         let dP = p5.Vector.dist(this.position, predatorList[i].position)

         if (dP < recordPredator && dP < this.dna[1]) {
            recordPredator = dP;
            closestPredator = predatorList[i].position;
         }
      }
      if (closestPredator != null) {
         return closestPredator;
      }
   }
   behaviors(foods, predators) {
      let eatthis = this.eat(foods);
      if (eatthis != undefined) {
         let steerF = this.seek(eatthis);
         this.applyForce(steerF);
      }

      let evadethis = this.evade(predators);
      if (evadethis != undefined) {
         let steerG = this.seek(evadethis);
         steerG.mult(-1)
         this.applyForce(steerG)
      }
   }

   boundaries() {
      let d = 25;

      let desired = null;

      if (this.position.x < d) {
         desired = createVector(this.maxspeed, this.velocity.y);
      } else if (this.position.x > width - d) {
         desired = createVector(-this.maxspeed, this.velocity.y);
      }

      if (this.position.y < d) {
         desired = createVector(this.velocity.x, this.maxspeed);
      } else if (this.position.y > height - d) {
         desired = createVector(this.velocity.x, -this.maxspeed);
      }

      if (desired !== null) {
         desired.normalize();
         desired.mult(this.maxspeed);
         let steer = p5.Vector.sub(desired, this.velocity);
         steer.limit(this.maxforce);
         this.applyForce(steer);
      }
   }



}