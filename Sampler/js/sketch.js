
let sounds = new Tone.Players({
  'bird': 'media/birdchirp.mp3',
  'cat': 'media/catmeowing.mp3',
  'dog': 'media/dogbark.mp3',
  'dragon': 'media/dragonroar.mp3'
})

let button1, button2, button3, button4;
let slider;


function setup() {
  createCanvas(800, 400);
  sounds.toDestination();

  button1 = createButton('bird');
  button1.position(50, 100);
  button1.mousePressed(  ()=>playSound('bird')   );

  button2 = createButton('cat');
  button2.position(250, 100);
  button2.mousePressed(  ()=>playSound('cat')   );

  button3 = createButton('dog');
  button3.position(450, 100);
  button3.mousePressed(  ()=>playSound('dog')   );

  button4 = createButton('dragon');
  button4.position(650, 100);
  button4.mousePressed(  ()=>playSound('dragon')   );
}

function draw() {
  background(220);
  textSize(25);
  text("Click the buttons below to play an animal noise", 100, 50);
}


function playSound(whichSound) {
  if (whichSound === 'bird'){
    sounds.player('bird').start();
  } 
  else if (whichSound === 'cat') {
    sounds.player('cat').start();
  }
  else if (whichSound === 'dog') {
    sounds.player('dog').start();
  }
  else if (whichSound === 'dragon') {
    sounds.player('dragon').start();
  }
}
