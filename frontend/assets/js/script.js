// Mobile Menu Toggle
document.querySelector('.mobile-menu').addEventListener('click', function() {
  document.querySelector('nav').classList.toggle('active');
});

// Sticky Header
window.addEventListener('scroll', function() {
  const header = document.querySelector('.glass-nav');
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// Contact Form Submission
document.getElementById('contactForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const formMessage = document.getElementById('formMessage');
  
  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      formMessage.textContent = 'Message sent successfully!';
      formMessage.className = 'form-message success';
      form.reset();
    } else {
      throw new Error(data.error || 'Failed to send message');
    }
  } catch (error) {
    console.error('Error:', error);
    formMessage.textContent = error.message;
    formMessage.className = 'form-message error';
  }
  
  // Hide message after 5 seconds
  setTimeout(() => {
    formMessage.style.opacity = '0';
    setTimeout(() => {
      formMessage.style.display = 'none';
      formMessage.style.opacity = '1';
    }, 500);
  }, 5000);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      document.querySelector('nav').classList.remove('active');
    }
  });
});

// Animation on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll('.about-stats .stat-item, .project-card');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    
    if (elementPosition < screenPosition) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
}

// Set initial state for animation
document.querySelectorAll('.about-stats .stat-item, .project-card').forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);