let data = [];
let m = 0;
let b = 0;
let learning_rate = 0.02;

function setup() {
   createCanvas(400, 400);
}

function mousePressed() {
   let x = map(mouseX, 0, width, 0, 1);
   let y = map(mouseY, height, 0, 0, 1);

   let point = createVector(x, y)
   data.push(point);
   console.log(x, y);
}

function drawLine() {
   let x1 = 0;
   let y1 = m * x1 + b;
   let x2 = 1;
   let y2 = m * x2 + b;

   x1 = map(x1, 0, 1, 0, width);
   y1 = map(y1, 0, 1, height, 0);
   x2 = map(x2, 0, 1, 0, width);
   y2 = map(y2, 0, 1, height, 0);

   fill(255);
   stroke(255);
   line(x1, y1, x2, y2);
}

// function LinearRegression() {
//    let xsum = 0;
//    let ysum = 0;
//    for (let i = 0; i < data.length; i++) {
//       xsum = xsum + data[i].x;
//       ysum = ysum + data[i].y;
//    }
//    let xmean = xsum / data.length;
//    let ymean = ysum / data.length;

//    let num = 0;
//    let den = 0;
//    for (let i = 0; i < data.length; i++) {
//       num += (data[i].x - xmean) * (data[i].y - ymean);
//       den += (data[i].x - xmean) * (data[i].x - xmean);
//    }

//    m = num / den;
//    b = ymean - m * xmean;

// }

function draw() {
   background(52);

   for (let i = 0; i < data.length; i++) {

      let x = map(data[i].x, 0, 1, 0, width);
      let y = map(data[i].y, 0, 1, height, 0);
      fill(255);
      ellipse(x, y, 10, 10);

   }
   if (data.length > 1) {
      drawLine();
   }
   GradientDescent();
}

function GradientDescent() {
   for (let i = 0; i < data.length; i++) {
      let x = data[i].x;
      let y = data[i].y;

      let guess = m * x + b
      let error = y - guess
      m = m + (error * x) * learning_rate;
      b = b + error * learning_rate;
   }
}