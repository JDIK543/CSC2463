/*Jacob Dickson
  CSC 2463
  4/20/2022
  
  Link to video: 

*/

let bombImage;
let sub;
let time;
let score;
let bombs = [];
let bombNumber = 3;
let maxBombs = 60;
let gameState = 0;
let bombAdded = false;
let bombTimer = 0;
let subX = 790;
let subY = 375;
let totalTime = 90;

let seqSynth = new Tone.FMSynth().toDestination();
var seq = new Tone.Sequence(callback, 
  
    ["Db3", "Eb3", "Fb3", "Gb3", "G3", "Gb3", "Fb3", "Eb3"], "8n");

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
var explosion = new Tone.Player("sounds/explosion.mp3").toDestination();
var lose = new Tone.Player("sounds/lose.mp3").toDestination();


function preload(){
  
  spriteSheet = loadImage('images/submarineTransparent.png');
}

class Bomb{
  constructor(x, speed){
    this.x = x;
    this.speed = speed;
    this.y = -10;
    this.falling = 0;

  }

  draw(){
    push();
    fill(0);
    circle(this.x, this.y, 5)
    this.y += this.speed;
    if(this.y >= 735 - 2){
      this.y = 0;
      this.x = random(405, 1175);
    }
    pop();
  
  }
  
}

class Sub{
  constructor(img){
    this.spriteSheet = img;
    this.x = 790;
    this.y = 375;
    this.direction = 1;
    this.xMove = 0;
    this.yMove = 0;
    this.isDead = false;
    this.isOnScreen = false;
    this.frame = 0;
  }

  draw(){
    push()
    translate(this.x, this.y);
    
    if(this.isDead){
      image(this.spriteSheet, 0, 0,80,80, 240, 0, 80,80 );
    }
    else if (this.xMove == 0) {
      image(this.spriteSheet, 0, 0, 80,80, 0,0, 80, 80);
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
        
      }
    }


    pop();
  }

  
  move(x,y){
    if(!this.isDead){
      this.x += x;
      this.y += y;
    }
  }

}
function movement() {
  if(keyIsDown(LEFT_ARROW)){
    sub.xMove = -1.5;
  }
  if(keyIsDown(RIGHT_ARROW)){
    sub.xMove = 1.5;
  }
  if(keyIsDown(DOWN_ARROW)){
    sub.yMove = 1;
  }
  if(keyIsDown(UP_ARROW)){
    sub.yMove = -1;
  }

  //left
  if(sub.x + 16 <= 405){
    sub.xMove = 1;
  }
  //right
  if(sub.x + 78 >= 1175){
    sub.xMove = -1;
  }
  //top
  if(sub.y + 27 <= 10){
    sub.yMove = 1;
  }
  //bottom
  if(sub.y + 78 >= 735){
    sub.yMove = -1;
  }

  sub.move(sub.xMove, sub.yMove);
}
function keyReleased() {
  if(!keyIsDown(LEFT_ARROW) || !keyIsDown(RIGHT_ARROW))
    sub.xMove = 0;
  if(!keyIsDown(UP_ARROW) || !keyIsDown(DOWN_ARROW))
    sub.yMove = 0;

    sub.move(sub.xMove, sub.yMove);
}


function timer(){
  return int((millis() - startTime) / 1000);
}




function setup(){
  createCanvas(1400,750);
  seq.start();
  for(i = 0; i < bombNumber; i++){
    bombs[i] = new Bomb(random(405,1175), random(1,3));
  }
  sub = new Sub(spriteSheet);
}

function draw(){

  if(gameState == 0){
    background(255);
    textSize(30);
    fill(0);
    text('You are the last submarine of your fleet, Commander. If\nyour submarine is sunk, the data and technology the enemy\nmay gain from the wreckage could very well cost us the war.\n\n\n\t\t\tHelp is en route Commander, ETA 90 seconds.', 400, 100);
    text('Getting hit by a single bomb will be enough to sink your submarine', 350, 230);
    fill(color(200,0,0));
    textSize(40);
    text('Press the mouse button to begin', 480, 360);
    if(mouseIsPressed){
      Tone.start();
      //seq.start();
      startTime = millis();
      gameState = 1;
    }
  }
  else if(gameState == 1){
    background(209);

    fill(0);
    for(i = 0; i < bombNumber; i++){
      bombs[i].draw();
      
    }

    
    
    
    score = timer();
    bombTimer = timer() % 3;
    
  

    if(bombTimer != 2){
      bombAdded = false;
    }
    else if(bombTimer == 2 && !bombAdded){
      bombAdded = true;
      bombNumber++;
      Tone.Transport.bpm.value += 5;
      bombs[bombNumber - 1] = new Bomb(random(405,1175), random(1,3));
    }
  

    fill(color(0, 0, 100, 150));
    rect(400, 0, 780, 730);
    textSize(30);
    fill(0);
    text('Objective: Survive', 10, 35);

    textSize(30);
    text('Controls:', 10, 150);

    textSize(15);
    text('Left Arrow: move left\n\nRight Arrow: move right\n\nUp Arrow: dive\n\nRight Arrow: surface', 10, 170);

    textSize(30);
    text('ETA: ' + (totalTime - score) + ' seconds', 10, 100);

    movement();
    sub.draw();

  


    for(i = 0; i<bombNumber; i++){
      let bombCheck = bombs[i];
      let bombLeft = bombCheck.x - 2.5;
      let bombRight = bombCheck.x + 2.5;
      let bombTop = bombCheck.y - 2.5;
      let bombBottom = bombCheck.y + 2.5;

      let subLeft = sub.x + 16;
      let subRight = sub.x + 78;
      let subTop = sub.y + 27;
      let subBottom = sub.y + 49;

      if((bombLeft >= subLeft && subLeft <= bombRight)&&(bombRight <= subRight && subRight >= bombLeft)){
        
        if((bombBottom >= subTop) && (bombTop <= subBottom)){
          sub.isDead = true;
        }
      }

      
    }
    if(sub.isDead){
      explosion.start(0);
      gameState = 3;
    }
    if(((totalTime - score) == 0)){
      congrats.start(0);
      gameState = 2;
    }
  }
  else if(gameState == 2){
    background(255);
    Tone.Transport.bpm.value = 100;
    fill(color(200,0,0));
    textSize(40);
    text('Great maneuvering, Commander. We\'ll take it from here.', 200, 370);
    fill(0);
    textSize(20);
    text('Reload the page to play again', 550, 400);
  }
  else if(gameState == 3){
    background(209);
    Tone.Transport.bpm.value = 60;
    fill(color(0, 0, 100, 150));
    rect(400, 0, 780, 730);
    textSize(30);
    fill(0);
    text('Objective: ', 10, 35);

    textSize(30);
    text('Controls:', 10, 150);

    textSize(15);
    text('Left Arrow: move left\n\nRight Arrow: move right\n\nUp Arrow: dive\n\nRight Arrow: surface', 10, 170);

    textSize(30);
    text('ETA: ' + (totalTime - score) + ' seconds', 10, 100);
    sub.draw();
    fill(color(200,0,0));
    textSize(40);
    text('Game Over', 700, 50);
    text('You survived for: '+ score + ' seconds', 575, 100);
    text('FAILED', 150, 35);
    fill(0);
    text('Reload the page to play again', 550, 400);
    
  }
}

