
const synth = new Tone.FMSynth();
const reverb = new Tone.JCReverb(0.4).toDestination();
synth.connect(reverb);

let notes = {
  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5'
}

function setup() {
  createCanvas(600, 400);
  
  slider = createSlider(0., 1., 0, 0.05);
  slider.position(200, 200);
  
  
}

function draw() {
  background(220);

  textSize(18);
  text("Use the a, s, d, f, g, h, j, and k keys on the keyboard to play notes!", 10, 20);

  textSize(15);
  text("Use this slider to adjust reverb", 190, 180);
  reverb.roomSize.value = slider.value();
}

function keyPressed() {
  let toPlay = notes[key];
  console.log(toPlay);
  synth.triggerAttackRelease(toPlay, 0.5);
}