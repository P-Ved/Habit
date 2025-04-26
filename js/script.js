// Main JavaScript file for the landing page

document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.footer-bottom p');
    if (copyrightElement) {
        copyrightElement.textContent = `© ${currentYear} HabitHub. All rights reserved.`;
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Form submission for contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For now, we'll just show a success message
            alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
            contactForm.reset();
        });
    }

    // Mobile navigation toggle (for responsive design)
    const createMobileNav = () => {
        const header = document.querySelector('header');
        if (!header) return;

        const mobileNavBtn = document.createElement('button');
        mobileNavBtn.classList.add('mobile-nav-toggle');
        mobileNavBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        const nav = document.querySelector('nav');
        
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-nav-toggle')) {
            header.insertBefore(mobileNavBtn, nav);
            nav.style.display = 'none';
            
            mobileNavBtn.addEventListener('click', function() {
                if (nav.style.display === 'none') {
                    nav.style.display = 'block';
                    this.innerHTML = '<i class="fas fa-times"></i>';
                } else {
                    nav.style.display = 'none';
                    this.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        } else if (window.innerWidth > 768) {
            const existingBtn = document.querySelector('.mobile-nav-toggle');
            if (existingBtn) {
                existingBtn.remove();
            }
            nav.style.display = 'block';
        }
    };

    // Call on load
    createMobileNav();
    
    // Call on resize
    window.addEventListener('resize', createMobileNav);

    // Testimonial slider (if we had multiple testimonials)
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    if (testimonials.length > 3) {
        setInterval(() => {
            testimonials[currentTestimonial].style.display = 'none';
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].style.display = 'block';
        }, 5000);
    }

    // Animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .about-content, .about-image, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // Call on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Call once on load
    animateOnScroll();
});
