// sketch.js - Cursor Particles

// Export the sketch function directly for dynamic import
export const sketch = (p5) => {
  let particles = [];

  p5.setup = () => {
    // Create canvas matching parent container size
    let canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight); // Use p5 instance methods
    // canvas.parent('p5-canvas-container'); // p5-wrapper handles parenting
    p5.noStroke();
  };

  p5.draw = () => {
    // Use background color from CSS variables if possible, otherwise default
    // background(getComputedStyle(document.documentElement).getPropertyValue('--background') || '#121212'); // Example
    p5.background(255, 255, 255, 100); // Dark background with slight transparency for trail effect

    // Create new particles at mouse position
    for (let i = 0; i < 2; i++) { // Add a few particles each frame
      particles.push(new Particle(p5.mouseX, p5.mouseY)); // Use p5 instance properties
  }

  // Update and display particles
  for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].display();
      if (particles[i].isFinished()) {
        particles.splice(i, 1); // Remove finished particles
      }
    }
  };

  class Particle {
    constructor(x, y) {
      this.position = p5.createVector(x, y); // Use p5 instance methods
      // Add randomness to velocity for spread effect - Explicitly assign random values
      let velX = p5.random(-1.5, 1.5);
      let velY = p5.random(-1.5, 1.5);
      this.velocity = p5.createVector(velX, velY);
      // Start with a slightly larger size and shrink
      this.size = p5.random(5, 10);
      // Fade out over time
      this.alpha = 255;
      // Use foreground color from CSS or default
      this.color = p5.color(getComputedStyle(document.documentElement).getPropertyValue('--foreground') || '#f2f2f2');
      // this.color = p5.color(0); // Off-white
  }

  update() {
    this.position.add(this.velocity);
    this.alpha -= 3; // Fade speed
    this.size *= 0.98; // Shrink speed
    }

    display() {
      p5.fill(p5.red(this.color), p5.green(this.color), p5.blue(this.color), this.alpha); // Use p5 instance methods
      p5.ellipse(this.position.x, this.position.y, this.size);
    }

    isFinished() {
    return this.alpha < 0 || this.size < 0.5;
  }
  }

  // Adjust canvas size when window is resized
  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight); // Use p5 instance methods
  };
};
