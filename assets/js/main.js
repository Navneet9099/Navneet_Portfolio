document.addEventListener('DOMContentLoaded', () => {
  /* --- CUSTOM CROSSHAIR CURSOR --- */
  const cursor = document.querySelector('.custom-cursor');
  const ring = document.querySelector('.custom-cursor-ring');

  if (cursor && ring) {
    document.addEventListener('mousemove', (e) => {
      // Direct positioning for center dot
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      
      // Smooth delayed transition for outer ring
      ring.animate({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`
      }, { duration: 100, fill: 'forwards' });
    });

    // Cursor interaction triggers
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .cyber-card, .timeline-dot-center');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('hovered');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('hovered');
      });
    });
  }

  /* --- MOBILE NAVIGATION PANEL TOGGLE --- */
  const mobileToggle = document.getElementById('mobile-nav-trigger');
  const navHud = document.getElementById('nav-sidebar-hud');

  if (mobileToggle && navHud) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navHud.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navHud.classList.contains('active')) {
          icon.className = 'lucide-x'; // Swaps hamburger icon to Close X
        } else {
          icon.className = 'lucide-menu';
        }
      }
    });

    // Close mobile drawer when clicking links
    const navLinksList = document.querySelectorAll('.nav-item a');
    navLinksList.forEach(link => {
      link.addEventListener('click', () => {
        navHud.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'lucide-menu';
      });
    });

    // Close when clicking outside HUD
    document.addEventListener('click', (e) => {
      if (navHud.classList.contains('active') && !navHud.contains(e.target) && e.target !== mobileToggle) {
        navHud.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'lucide-menu';
      }
    });
  }

  /* --- TERMINAL SEQUENCE BOOT --- */
  const terminalLines = document.querySelectorAll('.terminal-line');
  
  function bootTerminal() {
    let delay = 100;
    
    terminalLines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add('active');
        
        // Typing prompt sound simulation (visual cue only)
        const prompt = line.querySelector('.terminal-prompt');
        if (prompt) {
          prompt.style.textShadow = '0 0 10px var(--accent-primary)';
        }
      }, delay);
      
      // Incremental typing delay per command line
      delay += 800; 
    });
  }

  // Kickoff terminal simulation
  bootTerminal();

  /* --- SCROLL REVEALS & ACTIVE HUD TRACKS --- */
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-item');
  const revealElements = document.querySelectorAll('.reveal-element, .timeline-item');
  const skillsSection = document.getElementById('skills');

  // Trigger skill bars loading when in view
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  let skillsTriggered = false;

  function loadSkillBars() {
    if (skillsTriggered) return;
    skillBars.forEach(bar => {
      const percentage = bar.getAttribute('data-percentage');
      bar.style.width = percentage;
    });
    skillsTriggered = true;
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        
        // Specifically load skill gauges when entering the skills board
        if (entry.target === skillsSection) {
          loadSkillBars();
        }
      }
    });
  }, {
    threshold: 0.15, // Reveal when 15% visible
    rootMargin: '0px 0px -50px 0px' // Offset triggers slightly
  });

  revealElements.forEach(el => revealObserver.observe(el));
  if (skillsSection) revealObserver.observe(skillsSection);

  // Smooth scroll tracking to highlight navigation item in HUD
  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 300)) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      const href = item.querySelector('a').getAttribute('href');
      if (href === `#${currentSectionId}`) {
        item.classList.add('active');
      }
    });
  });
});
