function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('position', 'absolute');
  canvas.style('top', '0px');
  canvas.style('left', '0px');
  canvas.style('z-index', '10');
  canvas.style('pointer-events', 'none');
  clear();
}

function draw() {
  clear();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
