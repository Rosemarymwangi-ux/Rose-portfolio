const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.getElementById('mobileMenu');
const passwordToggles = document.querySelectorAll('.toggle-password');
const strengthMeter = document.getElementById('strengthMeter');
const strengthLabel = strengthMeter?.querySelector('.strength-label');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmPassword');
const signupForm = document.getElementById('signupForm');
const submitButton = document.getElementById('submitButton');
const successModal = document.getElementById('successModal');
const continueBtn = document.getElementById('continueBtn');
const particleGrid = document.querySelector('.particle-grid');
const mouseGlow = document.getElementById('mouseGlow');

function toggleMenu() {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  mobileMenu.classList.toggle('open');
  mobileMenu.setAttribute('aria-hidden', String(expanded));
}

if (menuToggle) {
  menuToggle.addEventListener('click', toggleMenu);
}

document.querySelectorAll('.mobile-menu a').forEach((navLink) => {
  navLink.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

passwordToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const targetId = toggle.dataset.target;
    const input = document.getElementById(targetId);
    if (!input) return;
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    toggle.textContent = show ? 'Hide' : 'Show';
  });
});

function getPasswordStrength(value) {
  let score = 0;
  if (value.length >= 8) score += 1;
  if (/[A-Z]/.test(value)) score += 1;
  if (/[0-9]/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;
  return score;
}

function updateStrengthMeter() {
  if (!strengthMeter || !strengthLabel || !passwordInput) return;
  const score = getPasswordStrength(passwordInput.value);
  strengthMeter.className = 'strength-meter';

  if (!passwordInput.value) {
    strengthLabel.textContent = 'Enter a password';
    return;
  }

  if (score <= 1) {
    strengthMeter.classList.add('weak');
    strengthLabel.textContent = 'Weak password';
  } else if (score === 2 || score === 3) {
    strengthMeter.classList.add('medium');
    strengthLabel.textContent = 'Good strength';
  } else {
    strengthMeter.classList.add('strong');
    strengthLabel.textContent = 'Strong password';
  }
}

passwordInput?.addEventListener('input', updateStrengthMeter);

function handleFormSubmit(event) {
  event.preventDefault();
  if (!signupForm) return;

  if (!signupForm.checkValidity()) {
    signupForm.reportValidity();
    return;
  }

  if (passwordInput?.value !== confirmInput?.value) {
    alert('Passwords do not match.');
    return;
  }

  submitButton?.classList.add('loading');
  submitButton.disabled = true;

  window.setTimeout(() => {
    submitButton?.classList.remove('loading');
    if (submitButton) submitButton.disabled = false;
    successModal?.classList.add('active');
    successModal?.setAttribute('aria-hidden', 'false');
  }, 1300);
}

signupForm?.addEventListener('submit', handleFormSubmit);
continueBtn?.addEventListener('click', () => {
  successModal?.classList.remove('active');
  successModal?.setAttribute('aria-hidden', 'true');
});

function createParticles(count = 18) {
  if (!particleGrid) return;
  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement('span');
    const size = Math.random() * 8 + 6;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 12}s`;
    particle.style.animationDuration = `${12 + Math.random() * 12}s`;
    particle.style.opacity = `${0.12 + Math.random() * 0.35}`;
    particleGrid.appendChild(particle);
  }
}

function updateMouseGlow(event) {
  if (!mouseGlow) return;
  const { clientX, clientY } = event;
  mouseGlow.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
  mouseGlow.style.opacity = '1';
}

document.addEventListener('pointermove', updateMouseGlow);
document.addEventListener('pointerleave', () => {
  if (mouseGlow) mouseGlow.style.opacity = '0';
});

createParticles();
