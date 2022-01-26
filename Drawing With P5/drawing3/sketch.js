function setup() {
    createCanvas(800, 400);
  }
  
  function draw() {
    background(0, 0, 0);
    
    fill(227, 219, 77);
    noStroke();
    arc(200, 200, 350, 350, PI + QUARTER_PI, PI - QUARTER_PI, PIE);

    fill(235, 68, 68);
    noStroke();
    rect(450, 200, 300, 175);
    ellipse(600, 200, 300, 350);

    fill(0, 0, 255);
    stroke(color(255, 255, 255));
    strokeWeight(18);
    circle(525, 200, 75);
    circle(675, 200, 75);
  }