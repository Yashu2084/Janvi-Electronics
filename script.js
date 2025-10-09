// Scroll animation with staggered delay
const services = document.querySelectorAll('.service');

function revealServices() {
  const triggerBottom = window.innerHeight * 0.85;

  services.forEach((service, index) => {
    const serviceTop = service.getBoundingClientRect().top;
    if(serviceTop < triggerBottom) {
      setTimeout(() => {
        service.classList.add('animate');
      }, index * 150); // stagger delay 150ms per card
    } else {
      service.classList.remove('animate'); // optional
    }
  });
}
// Reveal services on scroll
document.addEventListener("DOMContentLoaded", () => {
  const services = document.querySelectorAll(".service");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.2 } // trigger when 20% visible
  );

  services.forEach((service) => {
    observer.observe(service);
  });
});
window.addEventListener('scroll', revealServices);

// Initial check
revealServices();
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    // Get form values
    const name = document.getElementById('name').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const address = document.getElementById('address').value.trim();
    const plan = document.getElementById('plan').value;

    if (!name || !contact || !address || !plan) {
        alert('Please fill out all fields correctly.');
        return;
    }

    // Create WhatsApp message
    const message = `Hello! I want to book a Jio AirFiber connection.\n\n` +
                    `Name: ${name}\n` +
                    `Contact: ${contact}\n` +
                    `Address: ${address}\n` +
                    `Plan: ${plan}`;

    // WhatsApp URL
    const whatsappURL = `https://wa.me/919599905016?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(whatsappURL, '_blank');
});
