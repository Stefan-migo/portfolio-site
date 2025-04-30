// sketch.js - Cursor Particles

let particles = [];

function setup() {
  // Create canvas matching parent container size
  let canvas = createCanvas(windowWidth, windowHeight); // Start with window size, P5Runner might resize
  canvas.parent('p5-canvas-container'); // Ensure it attaches to the div used by P5Runner
  noStroke();
}

function draw() {
  // Use background color from CSS variables if possible, otherwise default
  // This requires P5Runner or global styles to make CSS vars available
  // background(getComputedStyle(document.documentElement).getPropertyValue('--background') || '#121212'); // Example
  background(18, 18, 18, 50); // Dark background with slight transparency for trail effect

  // Create new particles at mouse position
  for (let i = 0; i < 2; i++) { // Add a few particles each frame
    particles.push(new Particle(mouseX, mouseY));
  }

  // Update and display particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isFinished()) {
      particles.splice(i, 1); // Remove finished particles
    }
  }
}

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    // Add randomness to velocity for spread effect
    this.velocity = createVector(random(-1.5, 1.5), random(-1.5, 1.5));
    // Start with a slightly larger size and shrink
    this.size = random(5, 10);
    // Fade out over time
    this.alpha = 255;
    // Use foreground color from CSS or default
    // this.color = color(getComputedStyle(document.documentElement).getPropertyValue('--foreground') || '#f2f2f2');
    this.color = color(242, 242, 242); // Off-white
  }

  update() {
    this.position.add(this.velocity);
    this.alpha -= 4; // Fade speed
    this.size *= 0.98; // Shrink speed
  }

  display() {
    fill(red(this.color), green(this.color), blue(this.color), this.alpha);
    ellipse(this.position.x, this.position.y, this.size);
  }

  isFinished() {
    return this.alpha < 0 || this.size < 0.5;
  }
}

// Adjust canvas size when window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
