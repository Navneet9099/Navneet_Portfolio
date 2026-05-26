(function() {
  const form = document.getElementById('cyber-contact-form');
  const alertOverlay = document.getElementById('form-success-alert');
  const alertCloseBtn = document.getElementById('close-alert-btn');
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;
  const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Field Validations
    const name = document.getElementById('sender-name').value.trim();
    const email = document.getElementById('sender-email').value.trim();
    const message = document.getElementById('sender-message').value.trim();

    if (!name || !email || !message) {
      alertError("INVALID_PAYLOAD: Ensure all vectors are populated.");
      return;
    }

    // Capture destination
    const action = form.getAttribute('action');
    if (!action || action.includes('YOUR_FORM_ID')) {
      // Simulate success if Formspree is not configured yet
      simulateTransmission(name);
      return;
    }

    // Real Submission via Fetch to Formspree
    setSubmittingState(true);

    fetch(action, {
      method: 'POST',
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        setSubmittingState(false);
        showSuccessAlert();
        form.reset();
      } else {
        return response.json().then(data => {
          if (Object.hasOwnProperty.call(data, 'errors')) {
            throw new Error(data.errors.map(error => error.message).join(", "));
          } else {
            throw new Error("TRANSMIT_FAILED: Network gate refused packet.");
          }
        });
      }
    })
    .catch(error => {
      setSubmittingState(false);
      alertError(error.message);
    });
  });

  if (alertCloseBtn) {
    alertCloseBtn.addEventListener('click', function() {
      alertOverlay.classList.remove('active');
    });
  }

  function setSubmittingState(isSubmitting) {
    if (!submitBtn) return;
    if (isSubmitting) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="lucide-loader-2 animate-spin"></i> TRANSMITTING...`;
    } else {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  }

  function showSuccessAlert() {
    if (alertOverlay) {
      alertOverlay.classList.add('active');
    }
  }

  function alertError(msg) {
    alert(`[SYSTEM_ALERT] ${msg}`);
  }

  // Backup simulation for easy local testing when Formspree ID is empty
  function simulateTransmission(senderName) {
    setSubmittingState(true);
    
    // Cyber console logs simulation
    const consoleLogs = [
      "ESTABLISHING COMM CHANNEL...",
      "PACKING ID_VECTOR (NAME)...",
      "ENCRYPTING PAYLOAD DATA (MSG)...",
      "SENDING PACKET VIA SECURE GATEWAY..."
    ];

    let logIndex = 0;
    
    function logNextStep() {
      if (logIndex < consoleLogs.length) {
        submitBtn.innerHTML = `<i class="lucide-loader-2 animate-spin"></i> ${consoleLogs[logIndex]}`;
        logIndex++;
        setTimeout(logNextStep, 600);
      } else {
        setSubmittingState(false);
        showSuccessAlert();
        form.reset();
      }
    }

    setTimeout(logNextStep, 200);
  }
})();
