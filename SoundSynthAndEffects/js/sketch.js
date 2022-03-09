var laser = new Tone.MonoSynth();
var synthSettings = {
  "oscillator": {
    "type": "fmsquare5",
    "modulationType" : "triangle",
    "modulationIndex" : 2,
    "harmonicity" : 0.501
  },
  "filter": {
    "Q": 1,
    "type": "lowpass",
    "rolloff": -24
  },
    "envelope": {
    "attack": 0.01,
    "decay": 0.1,
    "sustain": 0.4,
    "release": 2
  },
  "filterEnvelope": {
    "attack": 0.01,
    "decay": 0.1,
    "sustain": 0.8,
    "release": 1.5,
    "baseFrequency": 50,
    "octaves": 4.4
  }
};
  
laser.set(synthSettings);
  
var effect
var effect = new Tone.Chebyshev();
effectSettings = {
    "order" : 108,
    "wet": 0.5
};
effect.set(effectSettings);
  
laser.connect(effect);
effect.connect(Tone.Master);

let laserGun;
let laserGunShooting;

function preload() {
  laserGun = loadImage("images/FalloutLaserGun.jpg");
  laserGunShooting = loadImage("images/FalloutLaserGunShooting.jpg");
}

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background("white");
  
  image(laserGun, 0, 30);
  textSize(20);
  text("Press and hold the mouse button to shoot the laser gun", 10, 18);
  text("Image is of a laser rifle from Fallout 4, I added a laser in MS Paint \nto make it look like its shooting. The sound effect was created using\nthe guitar land website shown in a previous class:\nhttps://www.guitarland.com/MusicTheoryWithToneJS/Presets-gh-pages/", 10, 450);
  text("**Note** The laser will show for as long as the mouse button is held. I wanted to\nhave the sound play for as long as the mouse button is held as well, but I was\nunable to implement it this way so instead the effect will play for a half note\(\"2n\"\).", 10, 570);

  if(mouseIsPressed) {
    image(laserGunShooting, 0, 30);
  }
  
}

function mousePressed() {
  Tone.start();
  laser.triggerAttackRelease("C4","2n");
}
  


