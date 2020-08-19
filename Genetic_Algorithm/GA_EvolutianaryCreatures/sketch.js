let slimes = [];
let foods = [];
let predators = [];
let spritesPredator = [];
let spritesSlime = [];
let loadSpritesSlime;
let foodSize = 10;
let foodPic;
let grass;
let isDebug = true;
let button;
let = screenEdge = 25;

function preload() {
  //load all sprites
  for (let i = 0; i < 11; i++) {
    spritesPredator[i] = loadImage(`assets/predator/B Flame ${i + 1}.png`);
  }
  loadSpritesSlime = loadImage('assets/slime/SlimeA.png');
  foodPic = loadImage('assets/food.png');
  grass = loadImage('assets/grass.png');
}

function setup() {
  createCanvas(windowWidth, 600);

  //get each slime's frame from sprites
  let offset = 0;
  for (let i = 0; i < 15; i++) {
    let img = loadSpritesSlime.get(0 + offset, 0, 16, 16);
    spritesSlime.push(img);
    offset += 16;
  }

  //generate startingSlime slime
  let startingSlime = 20;
  for (let i = 0; i < startingSlime; i++) {
    let x = random(width);
    let y = random(height);

    slimes[i] = new Slime(x, y);
  }
  //generate startingPredator predator
  let startingPredator = 10;
  for (let i = 0; i < startingPredator; i++) {
    let x = random(width);
    let y = random(height);

    predators[i] = new Predator(x, y);
  }
  //generate startingFood as a vector
  let startingFood = 30;
  for (let i = 0; i < startingFood; i++) {
    foods.push(
      createVector(
        random(screenEdge, width - screenEdge),
        random(screenEdge, height - screenEdge)
      )
    );
  }

  button = createButton('debug');
}

// function calcAvrgHealth(creatures) {

//    let healthSum = 0;
//    for (let i = creatures.length - 1; i >= 0; i--) {
//       healthSum += creatures[i].health;

//    }
//    let avrgHealth = healthSum / creatures.length;
//    let mapAvrgHealth = map(avrgHealth, 0, 100, 0, 1);
//    return mapAvrgHealth;

// }

function draw() {
  background(grass);
  // let canBreedSlime = calcAvrgHealth(slimes);
  // let canBreedPredator = calcAvrgHealth(predators);

  //what slimes do each frame
  for (let i = slimes.length - 1; i >= 0; i--) {
    slimes[i].display(spritesSlime);
    slimes[i].update();
    slimes[i].behaviors(foods, predators);
    slimes[i].boundaries();
    // if (canBreedSlime < 0.3) {
    if (slimes.length < 50) {
      let newSlime = slimes[i].breed();
      if (newSlime != null) {
        slimes.push(newSlime);
      }
    }
    // }
    if (slimes[i].isDead) {
      slimes.splice(i, 1);
    }
    if (isDebug) {
      noFill();
      stroke(0, 255, 0);
      strokeWeight(2);
      ellipse(
        slimes[i].position.x,
        slimes[i].position.y,
        slimes[i].dna.foodPerception,
        slimes[i].dna.foodPerception
      );
      noFill();
      stroke(255, 0, 0);
      ellipse(
        slimes[i].position.x,
        slimes[i].position.y,
        slimes[i].dna.dangerPerception,
        slimes[i].dna.dangerPerception
      );
    }
  }

  //what predators do each frame
  for (let i = predators.length - 1; i >= 0; i--) {
    predators[i].display(spritesPredator);
    predators[i].update();
    predators[i].behaviors(slimes);
    predators[i].boundaries();
    // if (canBreedPredator < 0.2) {
    if (predators.length < 35) {
      let newPredator = predators[i].breed();
      if (newPredator != null) {
        predators.push(newPredator);
      }
    }
    // }
    if (predators[i].isDead) {
      predators.splice(i, 1);
    }
    if (isDebug) {
      noFill();
      stroke(136, 29, 242);
      ellipse(
        predators[i].position.x,
        predators[i].position.y,
        predators[i].dna.killPerception,
        predators[i].dna.killPerception
      );
    }
  }
  //generate new food with probability
  let foodProb = 0.5;
  if (random(1) < foodProb) {
    foods.push(
      createVector(
        random(screenEdge, width - screenEdge),
        random(screenEdge, height - screenEdge)
      )
    );
  }

  //display food
  for (let i = foods.length - 1; i >= 0; i--) {
    let x = foods[i].x;
    let y = foods[i].y;

    image(foodPic, x, y, foodSize, foodSize);
  }

  button.mousePressed(() => {
    isDebug = !isDebug;
  });
}
