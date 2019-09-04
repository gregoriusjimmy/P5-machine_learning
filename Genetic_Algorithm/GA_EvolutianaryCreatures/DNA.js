class DNA {
   constructor(species, genes) {
      if (genes === undefined) {
         //randomize dna
         this.maxspeed = random(1, 3);
         this.body = random(10, 16);
         this.maxforce = random(1, 5);
         this.mutationRate = 0.1;
         if (species == 'Slime') {
            this.foodPerception = random(0, 300);
            this.dangerPerception = random(0, 150);
         }
         if (species == 'Predator') {
            this.killPerception = random(0, 300);
         }
      } else {
         //passing dna to child and add mutation
         this.maxspeed = genes.maxspeed;
         this.body = genes.body;
         this.maxforce = genes.maxforce;
         this.mutationRate = genes.mutationRate;

         if (species == 'Slime') {
            this.foodPerception = genes.foodPerception;
            this.dangerPerception = genes.dangerPerception;
            if (random(1) < this.mutationRate) {
               this.foodPerception += random(-50, 50);
            }
            if (random(1) < this.mutationRate) {
               this.dangerPerception += random(-20, 20);
            }
         }
         if (species == 'Predator') {
            this.killPerception = genes.killPerception;
            if (random(1) < this.mutationRate) {
               this.killPerception += random(-50, 50);
            }
         }
         if (random(1) < this.mutationRate) {
            this.maxforce += random(-0.2, 0.2);
         }
         if (random(1) < this.mutationRate) {
            this.body += random(-1, 1);
         }
         if (random(1) < this.mutationRate) {
            this.maxspeed += random(-2, 2);
         }


      }
   }
}