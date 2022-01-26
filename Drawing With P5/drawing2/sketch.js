function setup() {
    createCanvas(600, 600);
  }
  
  function draw() {
    background(255, 255, 255);
    
    fill(255, 0, 0, 100);
    noStroke();
    circle(300, 200, 300);

    fill(0, 0, 255, 100);
    circle(200, 400, 300);

    fill(0, 255, 0, 100);
    circle(400, 400, 300);

  }