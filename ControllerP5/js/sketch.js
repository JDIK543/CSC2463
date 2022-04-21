let spriteSheet;
let bugs = [];
let count = 30;
let gameState = 0;
let serialPDM;
let portName = 'COM7';
let sensors;
var score = 0;
var speed = 1.0;

let seqSynth = new Tone.FMSynth().toDestination();
var seq = new Tone.Sequence(callback, 
  //["Db3", "Eb3", "Fb3", "Gb3", "G3", "A3", "B3", "Db4"], "8n");

    //took the above Db arabic scale and changed the ending notes to make it loop beter
    ["Db3", "Eb3", "Fb3", "Gb3", "G3", "Gb3", "G3", "Eb3"], "8n");

function callback(time, pitch){
  seqSynth.triggerAttackRelease(pitch, "8n", time);
  seqSynth.volume.value = -10;
}

Tone.Transport.start()
Tone.Transport.bpm.value = 100;
Tone.Transport.loop = true; 
Tone.Transport.loopStart = 0;
Tone.Transport.loopEnd = '30:0:0';

var congrats = new Tone.Player("sounds/congrats.mp3").toDestination();
var squish = new Tone.Player("sounds/squish.mp3").toDestination();
var lose = new Tone.Player("sounds/lose.mp3").toDestination();

function preload() {
  Tone.start();
  spriteSheet = loadImage("images/bug.png");
  for(i = 0; i < count; i++){
    bugs[i] = new Bug(spriteSheet, random(1200), random(600), random([-2, -1, 1, 2]), 1);
  }
}

function setup() {
  
  serialPDM = new PDMSerial(portName);
  console.log(serialPDM.inData);
  sensors = serialPDM.sensorData;
  createCanvas(1000, 1000);
  seq.start();
  imageMode(CENTER);
}

function timer(){
  return int((millis() - startTime) / 1000);
}

// function mousePressed(){
//   for(i = 0; i < count; i++){
//     bugs[i].squish(mouseX, mouseY);
    
//   }
  
// }

function draw(){
  background(255, 255, 255);
  //startScreen
  if(gameState == 0){
    serialPDM.transmit('led', 0);
    textSize(30);
    text('Press button to start', 150, 300);
    if(sensors.button){
      startTime = millis();
      gameState = 1;
    }
  }
  //playing the game
  else if(gameState == 1){
    //drawCircle(sensors.sensorXTransmit, sensors.sensorYTransmit);
    for(i = 0; i < count; i++){
      bugs[i].draw();
    }
    let time = timer();
    let totalTime = 30;
    text("Time: " + (totalTime - time), 10, 30);
    text("Score: " + score, 10, 60);

    if(sensors.button){
      
      for(i = 0; i < count; i++){
        bugs[i].squish(sensors.sensorXTransmit, sensors.sensorYTransmit);
        
      }
      
    }

    drawCircle(sensors.sensorXTransmit, sensors.sensorYTransmit);

    if(score == count){
      congrats.start(0);
      gameState = 2;
    }
    else if(time >= totalTime){
      lose.start(0);
      gameState = 3;
    }
  }
  //win screen
  else if(gameState == 2){
    Tone.Transport.bpm.value = 100;
    
    text("Congrats, you squished all the bugs in time!", 150, 300);
    text("Score: " + score + " / " + count, 150, 400);
    text("Reload page to restart", 150, 500);
    
    
  }
  //game over screen
  else if(gameState == 3){
    Tone.Transport.bpm.value = 100;
    text("Game Over, you did not squish all the bugs in time", 150, 300);
    text("Score: " + score + " / " + count, 150, 400);
    text("Reload page to restart", 150, 500);
    serialPDM.transmit('led', 1);
    
  }
}

function drawCircle(x,y){
  fill("red");
  ellipse(x, y, 10);
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
        squish.start(0);
        Tone.Transport.bpm.value += 5;
        speed = speed + .2;
        score = score + 1;
        this.alive = 0;
      }
    }
     
  }  
}