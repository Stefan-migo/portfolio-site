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
    p5.clear(); // Explicitly clear canvas each frame
    // Read background color from CSS variable or use fallback
    const bgColor = p5.color(getComputedStyle(document.documentElement).getPropertyValue('--background').trim() || 'hsl(0, 0%, 7%)');
    p5.background(bgColor); // Use theme background color

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
      // Create position vector differently to test warning source
      this.position = p5.createVector();
      this.position.x = x;
      this.position.y = y;
      // Restore random velocity creation (warning seems unrelated to this specific call)
      this.velocity = p5.createVector(p5.random(-1.5, 1.5), p5.random(-1.5, 1.5));
      // Start with a slightly larger size and shrink
      this.size = p5.random(4, 8); // Keep slightly smaller start size
      // Fade out over time
      this.alpha = 255;
      // Read foreground color from CSS variable or use fallback
      this.color = p5.color(getComputedStyle(document.documentElement).getPropertyValue('--foreground').trim() || 'hsl(0, 0%, 95%)');
  }

  update() {
    this.position.add(this.velocity); // Use add method now that velocity is a vector
    this.alpha -= 0.8; // Very slow fade speed
    this.size *= 0.995; // Keep very slow shrink speed
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
