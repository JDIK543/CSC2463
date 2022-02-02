
var brushColor;

function setup() {
  createCanvas(1200, 1000);
  strokeWeight(4);
  background(240, 240, 240);

}

function draw() {

  //red pallet
  fill(201, 40, 28);
  rect(0, 0, 100, 100);

  //orange pallet
  fill(184, 73, 18);
  rect(0, 100, 100, 100);
  
  //yellow pallet
  fill(242, 221, 31);
  rect(0, 200, 100, 100);

  //green pallet
  fill(46, 207, 14);
  rect(0, 300, 100, 100);

  //cyan pallet
  fill(18, 204, 195);
  rect(0, 400, 100, 100);

  //blue pallet
  fill(18, 33, 199);
  rect(0, 500, 100, 100);

  //magenta pallet
  fill(176, 57, 212);
  rect(0, 600, 100, 100);

  //brown pallet
  fill(79, 33, 13);
  rect(0, 700, 100, 100);

  //white pallet
  fill(255, 255, 255);
  rect(0, 800, 100, 100);

  //black pallet
  fill(0, 0, 0);
  rect(0, 900, 100, 100);






  if (mouseIsPressed) {

    if (mouseX <= 100) {

      if (mouseY <= 100) {
        //red
        brushColor = color(201, 40, 28);

      } 
      else if (mouseY <= 200) {
        //orange
        brushColor = color(184, 73, 18);

      } 
      else if (mouseY <= 300) {
        //yellow
        brushColor = color(242, 221, 31);

      } 
      else if (mouseY <= 400) {
        //green
        brushColor = color(46, 207, 14);

      } 
      else if (mouseY <= 500) {
        //cyan
        brushColor = color(18, 204, 195);

      } 
      else if (mouseY <= 600) {
        //blue
        brushColor = color(18, 33, 199);

      } 
      else if (mouseY <= 700) {
        //magenta
        brushColor = color(176, 57, 212);
      }
      else if (mouseY <= 800) {
        //brown
        brushColor = color(79, 33, 13);

      } 
      else if (mouseY <= 900) {
        //white
        brushColor = color(255, 255, 255);

      } 
      else if (mouseY <= 1000) {
        //black
        brushColor = color(0, 0, 0);

      } 
    }
    stroke(brushColor)
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
  print(brushColor)
}