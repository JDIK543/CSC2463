/*Jacob Dickson
  CSC 2463
  4/20/2022
  
  Link to video: 

*/

let bombImage;
let sub;
let score;
let bombs = [];
let bombNumber = 3;
let maxBombs = 60;
//CHANGE BACK TO 0!!!!!!!!!!!!!!!!
let gameState = 0;
let tempCounter = 0;
let bombAdded = false;
let prevScore = 0;
let bombTimer = 0;
let subX = 790;
let subY = 375;

class Bomb{
  constructor(x, speed){
    this.x = x;
    this.speed = speed;
    this.y = 15;
    this.falling = 0;

  }

  draw(){
    push();
    //translate(this.x, this.y);

    // if(this.falling == 0){
    //   circle(this.x, this.y, 5);
    //   this.falling = 1;
    // }
    fill(0);
    circle(this.x, this.y, 5)
    this.y += this.speed;
    if(this.y >= 735){
      this.y = 15;
      this.x = random(405, 1175);
    }
    pop();
    //console.log('y: '+this.y + 'x: '+ this.x);
  }
  
}

class Sub{
  constructor(){
    this.x = 790;
    this.y = 375;
    this.direction = 1;
    this.xMove = 0;
    this.yMove = 0;
    this.isDead = false;
    this.isOnScreen = false;
  }

  draw(){
    push()
    fill(100);
    ellipse(this.x, this.y, 20, 10);



    pop();
  }

  go(direction){
    this.xMove = direction
  }
  
  move(x,y){
    this.x += x;
    this.y += y;
  }

}
function movement() {
  if(keyIsDown(LEFT_ARROW))
    sub.xMove = -2;
  if(keyIsDown(RIGHT_ARROW))
    sub.xMove = 2;

  if(keyIsDown(DOWN_ARROW))
    sub.yMove = 1;
  if(keyIsDown(UP_ARROW))
    sub.yMove = -1;

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
  for(i = 0; i < bombNumber; i++){
    bombs[i] = new Bomb(random(405,1175), random(1,3));
  }
  sub = new Sub;
}

function draw(){

  if(gameState == 0){
    background(255);
    textSize(30);
    fill(0);
    text('You are the last submarine of your fleet, Commander. If\nyour submarine is sunk, the data and technology the enemy\nmay gain from the wreckage could very well cost us the war.\n\n\t\t\tHelp is en route Commander, ETA 90 seconds.', 300, 100);
    fill(color(200,0,0));
    textSize(40);
    text('Press  the mouse button to begin', 380, 370);
    if(mouseIsPressed){
      startTime = millis();
      gameState = 1;
    }
  }
  else if(gameState == 1){
    
    background(209);
    fill(color(0, 0, 100, 150));
    rect(400, 10, 780, 730);
    textSize(30);
    fill(0);
    text('Objective: Survive', 10, 35);

    
    //text('\tYou are the last submarine of your fleet, Commander. If\nyour submarine is sunk, the data and technology the enemy\nmay gain from the wreckage could very well cost us the war.\nHelp is en route Commander, ETA 90 seconds.', 10, 60);

    textSize(30);
    text('Controls:', 10, 150);

    textSize(15);
    text('Left Button: move left\n\nRight Button: move right\n\nTurn Knob Left: dive\n\nTurn Knob Right: surface', 10, 170);

    let time = timer();
    let score = timer();
    bombTimer = timer() % 3;
    let totalTime = 90;

    textSize(30);
    text('ETA: ' + (totalTime - time) + ' seconds\n Score: '+ score, 10, 70);

    fill(0);
    for(i = 0; i < bombNumber; i++){
      bombs[i].draw();
      
    }
    movement();
    sub.draw();

  
    if(bombTimer != 2){
      bombAdded = false;
    }
    else if(bombTimer == 2 && !bombAdded){
      bombAdded = true;
      bombNumber++;
      bombs[bombNumber - 1] = new Bomb(random(405,1175), random(1,3));
    }

    for(i = 0; i<bombNumber; i++){
      let bombCheck = bombs[i];
      let bombLeft = bombCheck.x - 2.5;
      let bombRight = bombCheck.x + 2.5;
      let bombTop = bombCheck.y - 2.5;
      let bombBottom = bombCheck.y + 2.5;

      let subLeft = sub.x - 10;
      let subRight = sub.x + 10;
      let subTop = sub.y - 5;
      let subBottom = sub.y + 5;

      if((bombLeft >= subLeft <= bombRight)&&(bombRight <= subRight >= bombLeft)){
        
      }

      
    }

    if((totalTime - time) == 0){
      gameState = 2;
    }
  }
  else if(gameState == 2){
    background(255);
    fill(color(200,0,0));
    textSize(40);
    text('Game Over', 380, 370);
  }
}

