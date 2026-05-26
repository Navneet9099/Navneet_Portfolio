(function() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };

  // Adjust canvas size to window viewport
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }

  // Particle Blueprint
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1; // 1px to 3px
      this.speedX = (Math.random() - 0.5) * 0.35; // Slow kinetic movement
      this.speedY = (Math.random() - 0.5) * 0.35;
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Bounce off walls
      if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
      if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;

      // Mouse interactive push/pull effect
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          // Subtle attraction
          this.x += dx * 0.005;
          this.y += dy * 0.005;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${this.alpha})`;
      ctx.fill();
    }
  }

  // Populate network relative to view area size
  function initParticles() {
    particles = [];
    const area = canvas.width * canvas.height;
    // Calculate balanced particle quantity
    const count = Math.floor(area / 16000); 
    const clampedCount = Math.min(Math.max(count, 30), 120);

    for (let i = 0; i < clampedCount; i++) {
      particles.push(new Particle());
    }
  }

  // Render loops drawing connecting grid lines
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    // Connect close nodes
    connectNodes();
    
    requestAnimationFrame(animate);
  }

  function connectNodes() {
    const maxDistance = 110;
    
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        let dx = particles[a].x - particles[b].x;
        let dy = particles[a].y - particles[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          // Dynamic alpha depending on distance (closer = brighter)
          let alpha = (1 - (distance / maxDistance)) * 0.15;
          ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }

      // Connect node to mouse if nearby
      if (mouse.x !== null && mouse.y !== null) {
        let dx = particles[a].x - mouse.x;
        let dy = particles[a].y - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          let alpha = (1 - (distance / mouse.radius)) * 0.12;
          ctx.strokeStyle = `rgba(123, 47, 190, ${alpha})`; // Purple connection lines for cursor
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }
  }

  // Listeners
  window.addEventListener('resize', resizeCanvas);
  
  // Track cursor coordinates globally
  window.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', function() {
    mouse.x = null;
    mouse.y = null;
  });

  // Setup Initializer
  resizeCanvas();
  animate();
})();
