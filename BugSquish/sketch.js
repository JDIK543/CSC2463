let spriteSheet;
let bugs = [];
let count = 30;
let gameState = 0;
var score = 0;
var speed = 1.0;

function preload() {
  spriteSheet = loadImage("bug.png");
  for(i = 0; i < count; i++){
    bugs[i] = new Bug(spriteSheet, random(1200), random(600), random([-2, -1, 1, 2]), 1);
  }
}

function setup() {
  createCanvas(1200, 600);
  imageMode(CENTER);
}

function timer(){
  return int((millis() - startTime) / 1000);
}

function mousePressed(){
  for(i = 0; i < count; i++){
    bugs[i].squish(mouseX, mouseY);
    
  }
  speed += .2;
}

function draw(){
  background(255, 255, 255);
  //startScreen
  if(gameState == 0){
    textSize(30);
    text('Press mouse button to start', 150, 300);
    if(mouseIsPressed){
      startTime = millis();
      gameState = 1;
    }
  }
  //playing the game
  else if(gameState == 1){
    for(i = 0; i < count; i++){
      bugs[i].draw();
    }
    let time = timer();
    let totalTime = 30;
    text("Time: " + (totalTime - time), 10, 30);
    text("Score: " + score, 10, 60);
    if(time >= totalTime){
      gameState = 2;
    }
  }
  //game over scren
  else if(gameState == 2){
    text("Game Over", 150, 300);
    text("Score: " + score, 150, 400);
    text("Reload page to restart", 150, 500);
    
  }
}

class Bug {
  constructor(spriteSheet, x, y, moving, alive) {
    this.spriteSheet = spriteSheet;
    this.frame = 0;
    this.x = x;
    this.y = y;
    this.move = moving;
    this.facing = moving;
    this.alive = alive; 
  }

  draw() {
    push();
    translate(this.x, this.y);
    if (this.facing == 2){
      scale(1.0, -1.0);
    }
    if (this.facing == -1){
      rotate(-PI/2);
    }
    if (this.facing == 1){
      rotate(PI/2);   
    }

    if (this.move == 0) {
      image(this.spriteSheet, 0,0,80,80,240,0,80,80);
    }
    else {
      if (this.frame == 0){
        image(this.spriteSheet, 0,0, 80,80, 80,0,80,80);
      }
      if (this.frame == 1){
        image(this.spriteSheet, 0,0, 80,80, 0,0,80,80);
      }
      if (this.frame == 2){
        image(this.spriteSheet, 0,0, 80,80, 160,0,80,80);
      }
      if(frameCount % 4 == 0){
        this.frame = (this.frame+1)%3; 
        if (this.move == -1 || this.move == 1){
          this.x = this.x + speed * (this.move * 3); 
        }
        if (this.move == -2 || this.move == 2){
          this.y = this.y + speed * (this.move * 3);
        }
        
        if(this.x < 30){
          this.move = 1;
          this.facing = 1;
        }
        if(this.x > width-30){
          this.move = -1;
          this.facing = -1;
        }
        if(this.y < 30){
          this.move = 2;
          this.facing = 2;
        }
        if (this.y > height-30){
          this.move = -2;
          this.facing = -2;
        }
      }
    }
    pop();
  }

  go(direction){
    this.move = direction;
    this.facing = direction;
    this.sx = 3;
  }

  stop() {
    this.move = 0;
  }

  squish(x, y){
    if(this.x-30<x && x < this.x+30 && this.y-30<y && y<this.y+30){
      this.move = 0;  
      if (this.alive == 1){
        
        score = score + 1;
        this.alive = 0;
      }
    }
  }  
}