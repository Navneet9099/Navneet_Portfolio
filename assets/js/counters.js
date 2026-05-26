(function() {
  const metricSection = document.getElementById('metrics');
  if (!metricSection) return;

  const counters = document.querySelectorAll('.metric-number');
  
  const options = {
    root: null, // Viewport
    threshold: 0.25, // Trigger when 25% of section is visible
  };

  const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounters();
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, options);

  observer.observe(metricSection);

  function startCounters() {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 2000; // 2 seconds total count duration
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing out quadratic
        const easedProgress = progress * (2 - progress);
        const currentValue = Math.floor(easedProgress * target);

        counter.textContent = currentValue + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + suffix;
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }
})();
