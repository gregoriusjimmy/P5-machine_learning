class Slime extends Creature {

   constructor(x, y, dna) {
      super(x, y, 'Slime', dna);
   }

   breed() {
      let breedRate = 0.002;
      if (random(1) < breedRate) {
         return new Slime(this.position.x, this.position.y, this.dna);
      } else {
         return null;
      }
   }

   //eat closestFood
   eat(foodsList) {
      let recordFood = Infinity;
      let closestFood = null;

      for (let i = foodsList.length - 1; i >= 0; i--) {
         let df = this.position.dist(foodsList[i]);
         if (df < this.dna.maxspeed) {
            //time to eat!
            this.health += 10;
            foodsList.splice(i, 1);
         } else {
            if (df < recordFood && df < this.dna.foodPerception) {
               recordFood = df;
               closestFood = foodsList[i];
            }
         }

      }
      if (closestFood != null) {
         return closestFood;
      }
   }

   //evade closestPredator
   evade(predatorList) {
      let recordPredator = Infinity
      let closestPredator = null;

      for (let i = predatorList.length - 1; i >= 0; i--) {
         let dP = p5.Vector.dist(this.position, predatorList[i].position)

         if (dP < recordPredator && dP < this.dna.dangerPerception) {
            recordPredator = dP;
            closestPredator = predatorList[i].position;
         }
      }
      if (closestPredator != null) {
         return closestPredator;
      }
   }

   behaviors(foods, predators) {

      //applying force 

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

}