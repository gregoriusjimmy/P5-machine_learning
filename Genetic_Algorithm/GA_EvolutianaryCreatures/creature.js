class Creature {
   constructor(x, y, species, dna) {
      this.position = createVector(x, y);
      this.velocity = createVector(0, -0.2);
      this.acceleration = createVector(0, 0);
      this.health = 100;
      this.mutationRate = 0.1
      this.isDead = false;
      this.animationSpeed = 0;

      //passing dna to child if parameter has dna on it
      if (dna) {
         this.dna = new DNA(species, dna);
      } else {
         //create creature with random new dna
         this.dna = new DNA(species);
      };
   }
   display(sprites) {

      // calculate how fast animation depends on maxspeed
      this.animationSpeed += this.dna.maxspeed * 0.05;
      if (this.animationSpeed <= 0) {
         this.animationSpeed = 0.01;
      }
      let indexAnimation = floor(this.animationSpeed % sprites.length)

      // showing health bar
      let healthBar = map(this.health, 0, 100, 0, this.dna.body);
      let green = color(0, 255, 0);
      let red = color(255, 0, 0);
      let lerpMap = map(this.health, 0, 100, 0, 1);
      let healthColor = lerpColor(red, green, lerpMap);

      //displaying animation
      let angle = this.velocity.heading();
      push();

      translate(this.position.x, this.position.y);

      if (angle > 1.5 || angle < -1.5) {
         scale(1, 1);

      } else {
         scale(-1, 1);
      }
      imageMode(CENTER);
      image(sprites[indexAnimation], 0, 0, this.dna.body * 2, this.dna.body * 2);
      fill(healthColor);
      rect(-this.dna.body / 2, this.dna.body * 1.1, healthBar, 2);

      pop();

   }

   update() {
      this.health -= 0.1;
      if (this.health >= 100) {
         this.health = 100;
      }
      this.velocity.add(this.acceleration);

      this.velocity.limit(this.dna.maxspeed);
      this.position.add(this.velocity);

      this.acceleration.mult(0);
      if (this.health < 0) {
         this.isDead = true;
      }
   }


   applyForce(force) {
      this.acceleration.add(force)
   }

   seek(target) {
      let desired = p5.Vector.sub(target, this.position);

      desired.setMag(this.dna.maxspeed);

      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.dna.maxforce);

      return steer;
      // this.applyForce(steer);
   }


   // creatures cannot go through outside canvas
   boundaries() {
      let d = 25;

      let desired = null;

      if (this.position.x < d) {
         desired = createVector(this.dna.maxspeed, this.velocity.y);
      } else if (this.position.x > width - d) {
         desired = createVector(-this.dna.maxspeed, this.velocity.y);
      }

      if (this.position.y < d) {
         desired = createVector(this.velocity.x, this.dna.maxspeed);
      } else if (this.position.y > height - d) {
         desired = createVector(this.velocity.x, -this.dna.maxspeed);
      }

      if (desired !== null) {
         desired.normalize();
         desired.mult(this.dna.maxspeed);
         let steer = p5.Vector.sub(desired, this.velocity);
         steer.limit(this.dna.maxforce);
         this.applyForce(steer);
      }
   }
}