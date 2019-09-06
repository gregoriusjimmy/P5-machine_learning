class Snake {
   constructor(x, y, brain) {
      this.xspeed = 1;
      this.yspeed = 0;
      this.scale = 40;
      this.body = [];
      this.body[0] = createVector(x, y);
      this.len = 0;
      //TODO: brain = new NeuralNetwork(input,hidden,output);
   }
   eat(food) {

      // if (d < this.scale) {
      let x = this.body[this.body.length - 1].x;
      let y = this.body[this.body.length - 1].y;
      let d = dist(x, y, food.x, food.y);
      if (d < this.scale) {
         console.log('eated');
         // TODO : add tail
         this.addTail();
         return true;
      }
   }
   update() {
      let head = this.body[this.body.length - 1].copy();
      this.body.shift();
      head.x += this.xspeed * this.scale;
      head.y += this.yspeed * this.scale;
      this.body.push(head);
      // for (let i = 0; i < this.totalTail; i++) {
      //    this.body[i + 1].x = this.body[i].x;
      //    this.body[i + 1].y = this.body[i].y;

      //    // this.body[i + 1].x += this.xspeed * this.scale;
      //    // this.body[i + 1].y += this.yspeed * this.scale;
      // }
      // console.log(this.body[0].x, this.body[0].y)
      // if (this.totalTail > 0) {
      //    console.log('B  ' + this.body[1].x, this.body[1].y)
      // }
      // if (this.totalTail > 1) {
      //    console.log('C  ' + this.body[2].x, this.body[2].y)
      // }
      // let head = this.body[0];


      // head.x = constrain(head.x, 0, width - this.scale);
      // head.y = constrain(head.y, 0, height - this.scale);

   }

   display() {

      for (let i = 0; i < this.body.length; i++) {
         fill(255);
         rect(this.body[i].x, this.body[i].y, this.scale, this.scale);
      }
      let test = this.body[0];
      fill('yellow');
      rect(test.x, test.y, this.scale, this.scale);
      let head = this.body[this.body.length - 1];
      fill('red');
      rect(head.x, head.y, this.scale, this.scale);
   }

   turn(x, y) {
      this.xspeed = x;
      this.yspeed = y;
   }
   death() {
      let head = this.body[this.body.length - 1];

      if (head.y > height || head.y < 0 || head.x > width || head.x < 0) {

         console.log('DIEEE WALL STUPID');
         return true;

      }

      for (let i = 0; i < this.body.length - 1; i++) {
         let d = dist(head.x, head.y, this.body[i].x, this.body[i].y);
         if (d < this.scale) {

            console.log('DIEE');
            return true;


         }
      }


   }
   addTail() {
      let head = this.body[this.body.length - 1].copy();
      this.body.push(head);
      this.len++;
   }
}