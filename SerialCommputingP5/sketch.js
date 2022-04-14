

let serialPDM;
let portName = 'COM7';
let sensors;

beenPressed = false;

function setup() {
  
  
  serialPDM = new PDMSerial(portName);
  console.log(serialPDM.inData);
  sensors = serialPDM.sensorData;
  
  createCanvas(800,600);
  
}


function mousePressed(){
  if(!beenPressed){
    serialPDM.transmit('led', 1);
    console.log("on");
    beenPressed = true;
  }
  else{
    serialPDM.transmit('led', 0);
    console.log("off");
    beenPressed = false;
  }
}

function draw(){
  background(255);
  textSize(32);
  fill(32, 140, 110);
  text("sensor: " + sensors.sensorTransmit, 10, 30);

  
  drawCircle(400, 300, sensors.sensorTransmit);
  
}

function drawCircle(x,y,size){
  fill("purple");
  ellipse(x, y, size + 50);
}