/* ============================================================
   NEXIZY — main.js
   All interactive behaviour for the NEXIZY portfolio website
   ============================================================ */

/* ── SCROLL REVEAL ── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const EMAILJS_PUBLIC_KEY  = 'NO0rqmDpuVy6x7h1k';       
const EMAILJS_SERVICE_ID  = 'service_qwj3wt6';       
const EMAILJS_TEMPLATE_ID = 'template_71hlafm';      

/* Initialise EmailJS with your public key */
(function () {
  emailjs.init(NO0rqmDpuVy6x7h1k);
})();

/* Form submit handler */
const btnForm   = document.querySelector('.btn-form');
const nameInput = document.querySelector('.form-group input[type="text"]');
const emailInput= document.querySelector('.form-group input[type="email"]');
const typeInput = document.querySelectorAll('.form-group input[type="text"]')[1];
const msgInput  = document.querySelector('.form-group textarea');

btnForm.addEventListener('click', function () {
  const name    = nameInput ? nameInput.value.trim() : '';
  const email   = emailInput ? emailInput.value.trim() : '';
  const project = typeInput ? typeInput.value.trim() : '';
  const message = msgInput ? msgInput.value.trim() : '';

  /* Basic validation */
  if (!name || !email || !message) {
    showFormState(this, 'error', '⚠ Please fill in all fields');
    return;
  }
  if (!isValidEmail(email)) {
    showFormState(this, 'error', '⚠ Please enter a valid email');
    return;
  }

  /* Send via EmailJS */
  showFormState(this, 'loading', 'Sending...');

  const templateParams = {
    to_email:     'supportnexizytech@gmail.com',
    from_name:    name,
    from_email:   email,
    project_type: project || 'Not specified',
    message:      message,
    reply_to:     email,
  };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => {
      showFormState(btnForm, 'success', '✓ Message Sent!');
      /* Clear fields on success */
      if (nameInput)  nameInput.value  = '';
      if (emailInput) emailInput.value = '';
      if (typeInput)  typeInput.value  = '';
      if (msgInput)   msgInput.value   = '';
      /* Reset button after 4 seconds */
      setTimeout(() => showFormState(btnForm, 'reset', 'Send Message →'), 4000);
    })
    .catch((err) => {
      console.error('EmailJS error:', err);
      showFormState(btnForm, 'error', '✗ Failed — try WhatsApp instead');
      setTimeout(() => showFormState(btnForm, 'reset', 'Send Message →'), 4000);
    });
});

/* Helper — update button state */
function showFormState(btn, state, text) {
  btn.textContent = text;
  btn.disabled = (state === 'loading');
  btn.style.background =
    state === 'success' ? '#00a050' :
    state === 'error'   ? '#c0392b' :
    state === 'loading' ? '#0f4acc' : '';
}

/* Helper — email validation */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ── ACTIVE NAV HIGHLIGHT ON SCROLL ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach((a) => {
    a.style.color = a.getAttribute('href') === '#' + current ? '#fff' : '';
  });
});
