const heroTitle = document.querySelector('#hero-title');

if (heroTitle) {
  const text = heroTitle.textContent;
  const hoverText = 'Welcome to Rose Portfolio';

  heroTitle.addEventListener('mouseover', () => {
    heroTitle.textContent = hoverText;
    heroTitle.style.color = '#b76245';
  });

  heroTitle.addEventListener('mouseout', () => {
    heroTitle.textContent = text;
    heroTitle.style.color = '';
  });
}

const contactForm = document.querySelector('#contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = contactForm.querySelector('#name');
    const email = contactForm.querySelector('#email');
    const message = contactForm.querySelector('#message');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      alert('Please complete every field before sending your message.');
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    window.setTimeout(() => {
      contactForm.reset();
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';

      const successMessage = document.createElement('p');
      successMessage.textContent = 'Thank you for contacting me! Your message has been sent.';
      successMessage.style.marginTop = '1rem';
      successMessage.style.color = '#2e1f18';
      successMessage.style.fontWeight = '700';
      contactForm.appendChild(successMessage);

      window.setTimeout(() => {
        successMessage.remove();
      }, 5000);
    }, 800);
  });
}

const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('#mobileNav');

if (navToggle && mobileNav) {
  const navLinks = mobileNav.querySelectorAll('a');

  navToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    mobileNav.setAttribute('aria-hidden', String(!isOpen));
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    navToggle.classList.toggle('open', isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      mobileNav.setAttribute('aria-hidden', 'true');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open navigation menu');
      navToggle.classList.remove('open');
    });
  });
}

