// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== SMOOTH SCROLL =====
function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}
function scrollTo(selector) {
  document.querySelector(selector).scrollIntoView({ behavior: 'smooth' });
}

// ===== SELECT PLAN =====
function selectPlan(plan) {
  document.getElementById('fplan').value = plan;
  scrollToContact();
  setTimeout(() => {
    document.getElementById('fplan').style.borderColor = 'var(--primary)';
    setTimeout(() => document.getElementById('fplan').style.borderColor = '', 1500);
  }, 600);
}

// ===== MODAL =====
function closeModal() {
  document.getElementById('successModal').classList.remove('active');
}

// ===== FORM SUBMISSION =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const btn = document.getElementById('submitBtn');
  const text = document.getElementById('submitText');

  // Gather form data
  const customer = {
    id: 'ORD-' + Date.now(),
    timestamp: new Date().toISOString(),
    name: document.getElementById('fname').value.trim(),
    phone: document.getElementById('fphone').value.trim(),
    email: document.getElementById('femail').value.trim(),
    business: document.getElementById('fbusiness').value.trim(),
    service: document.getElementById('fservice').value,
    plan: document.getElementById('fplan').value,
    website: document.getElementById('fwebsite').value.trim(),
    message: document.getElementById('fmessage').value.trim(),
    status: 'New',
    date: new Date().toLocaleDateString('en-PK', {day:'2-digit',month:'short',year:'numeric'})
  };

  // Validation
  if (!customer.name || !customer.phone || !customer.business || !customer.service || !customer.plan) {
    alert('Please fill all required fields!');
    return;
  }

  // Loading state
  btn.disabled = true;
  text.textContent = '⏳ Submitting...';

  // Save to localStorage (simulated backend)
  setTimeout(() => {
    const existing = JSON.parse(localStorage.getItem('nexads_customers') || '[]');
    existing.push(customer);
    localStorage.setItem('nexads_customers', JSON.stringify(existing));

    // Reset
    btn.disabled = false;
    text.textContent = '🚀 Submit My Request';
    this.reset();

    // Show success modal
    document.getElementById('successModal').classList.add('active');
    console.log('Customer saved:', customer);
  }, 1200);
});

// ===== ANIMATE ON SCROLL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .pricing-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
