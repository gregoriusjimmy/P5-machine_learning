class Predator {
   constructor(x, y, dna) {
      this.position = createVector(x, y);
      this.velocity = createVector(0, 0);
      this.acceleration = createVector(0, 0);
      this.r = 10;
      this.maxspeed = 5;
      this.maxforce = 0.5;
      this.health = 100;
      this.dna = [];
      this.mutationRate = 0.1;
      this.isDebug = true;
      this.isDead = false;

      if (dna === undefined) {
         //kill perception
         this.dna[0] = random(50, 150);

      } else {
         //mutate
         this.dna[0] = dna[0];
         if (random(1) < this.mutationRate) {
            this.dna[0] += random(-30, 30);
         }
      }
   }

   display() {
      if (this.isDebug) {
         noFill()
         stroke(136, 29, 242);
         ellipse(this.position.x, this.position.y, this.dna[0], this.dna[0]);
      }
      noStroke();
      let health = map(this.health, 0, 100, 0, 255);
      fill(255, 0, 0, health);
      ellipse(this.position.x, this.position.y, this.r, this.r);
   }
   update() {
      this.health -= 0.1
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
   kill(apeList) {
      let recordApe = Infinity;
      let closestApe = null;

      for (let i = apeList.length - 1; i >= 0; i--) {
         let df = this.position.dist(apeList[i].position);
         if (df < this.maxspeed) {
            this.health += 1;
            apeList.splice(i, 1);
         } else {
            if (df < recordApe && df < this.dna[0]) {
               recordApe = df;
               closestApe = apeList[i].position;
            }
         }

      }
      if (closestApe != null) {
         return closestApe;
      }
   }
   behaviors(apes) {
      let killthis = this.kill(apes);
      if (killthis != undefined) {
         let steerK = this.seek(killthis);
         this.applyForce(steerK);
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