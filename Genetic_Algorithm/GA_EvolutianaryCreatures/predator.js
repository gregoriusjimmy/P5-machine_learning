class Predator extends Creature {

   constructor(x, y, dna) {
      super(x, y, 'Predator', dna);
   }

   //find closestSlime and kill it
   kill(slimeList) {
      let recordSlime = Infinity;
      let closestSlime = null;

      for (let i = slimeList.length - 1; i >= 0; i--) {
         let df = this.position.dist(slimeList[i].position);
         if (df < this.dna.maxspeed) {
            //kill time!
            this.health += 30;
            slimeList.splice(i, 1);
         } else {
            if (df < recordSlime && df < this.dna.killPerception) {
               recordSlime = df;
               closestSlime = slimeList[i].position;
            }
         }
      }
      if (closestSlime != null) {
         return closestSlime;
      }
   }
   behaviors(slimes) {
      //applying force
      let killthis = this.kill(slimes);
      if (killthis != undefined) {
         let steerK = this.seek(killthis);
         this.applyForce(steerK);
      }

   }
   breed() {
      let breedRate = 0.001;
      if (random(1) < breedRate) {
         return new Predator(this.position.x, this.position.y, this.dna);
      } else {
         return null;
      }
   }
}