function setup() {
    createCanvas(600, 600);
  }
  
  function draw() {
    background(0, 0, 120);
    stroke(color(255, 255, 255));
    strokeWeight(5);
    fill(0, 125, 0);
    circle(300, 300, 300);

    fill(255, 0, 0);
    beginShape();
    vertex(300, 148);
    vertex(350, 250);
    vertex(440, 250);
    vertex(375, 320);
    vertex(400, 415);
    vertex(300, 350); 
    vertex(200, 415);
    vertex(225, 320);
    vertex(160, 250);
    vertex(250, 250);
    endShape(CLOSE);
  }