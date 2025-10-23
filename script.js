// ==========================================
// SOLAR POWER SOLUTIONS - JAVASCRIPT
// ==========================================

// Smooth Scroll Animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Scroll Animation on Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .feature-card, .testimonial-card, .stat-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Inquiry Form Handler
const inquiryForm = document.getElementById('inquiryForm');
if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(inquiryForm);
        const data = Object.fromEntries(formData);
        
        // Log form data (in production, send to server)
        console.log('Inquiry Form Data:', data);
        
        // Show success modal
        const modal = document.getElementById('thankYouModal');
        if (modal) {
            modal.style.display = 'block';
        }
        
        // Reset form
        inquiryForm.reset();
    });
}

// Registration Form Handler
const registrationForm = document.getElementById('registrationForm');
if (registrationForm) {
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(registrationForm);
        const data = Object.fromEntries(formData);
        
        // Log form data (in production, send to server)
        console.log('Registration Form Data:', data);
        
        // Show success modal
        const modal = document.getElementById('confirmationModal');
        if (modal) {
            modal.style.display = 'block';
        }
        
        // Reset form
        registrationForm.reset();
    });
}

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Log form data (in production, send to server)
        console.log('Contact Form Data:', data);
        
        // Show success modal
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.style.display = 'block';
        }
        
        // Reset form
        contactForm.reset();
    });
}

// Close Modal Function
function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Close modal with X button
const closeButtons = document.querySelectorAll('.close-modal');
closeButtons.forEach(button => {
    button.addEventListener('click', closeModal);
});

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(start));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toFixed(0);
}

// Animate stats on scroll
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseFloat(entry.target.textContent.replace(/[^0-9.]/g, ''));
            const hasBeenAnimated = entry.target.dataset.animated === 'true';
            
            if (!hasBeenAnimated) {
                entry.target.dataset.animated = 'true';
                
                if (entry.target.textContent.includes('MW')) {
                    animateCounter(entry.target, target, 2000);
                    setTimeout(() => {
                        entry.target.textContent = target + 'MW';
                    }, 2000);
                } else if (entry.target.textContent.includes('$')) {
                    animateCounter(entry.target, target, 2000);
                    setTimeout(() => {
                        entry.target.textContent = '$' + target + '+';
                    }, 2000);
                } else if (entry.target.textContent.includes('+')) {
                    animateCounter(entry.target, target, 2000);
                    setTimeout(() => {
                        entry.target.textContent = target + '+';
                    }, 2000);
                } else {
                    animateCounter(entry.target, target, 2000);
                    setTimeout(() => {
                        entry.target.textContent = target + '+';
                    }, 2000);
                }
            }
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Schedule Consultation Button Handler
const scheduleButtons = document.querySelectorAll('.cta-button');
scheduleButtons.forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = 'inquiry.html';
    });
});

// Form Validation Enhancement
const inputs = document.querySelectorAll('input, textarea, select');
inputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '#E0E0E0';
        }
    });
    
    input.addEventListener('input', () => {
        if (input.value.trim()) {
            input.style.borderColor = '#4CAF50';
        }
    });
});

// Lazy Loading Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Add loading state to buttons
const buttons = document.querySelectorAll('button[type="submit"]');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        const originalText = this.textContent;
        this.textContent = 'Please wait...';
        this.disabled = true;
        
        setTimeout(() => {
            this.textContent = originalText;
            this.disabled = false;
        }, 2000);
    });
});

// Email validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Phone validation helper
function validatePhone(phone) {
    const re = /^[\d\s\-\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// SEO: Add schema markup for organization
function addSchemaMarkup() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "SolarPower Solutions",
        "description": "Professional solar installation company providing residential and commercial solar solutions",
        "url": window.location.origin,
        "logo": window.location.origin + "/logo.png",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-555-123-4567",
            "contactType": "customer service",
            "email": "info@solarpower.com"
        },
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Solar Street",
            "addressLocality": "Green City",
            "addressRegion": "CA",
            "postalCode": "94016",
            "addressCountry": "US"
        }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
}

// Initialize schema markup
document.addEventListener('DOMContentLoaded', addSchemaMarkup);

// Performance: Preload critical resources
function preloadCriticalResources() {
    const links = [
        { rel: 'preload', href: 'styles.css', as: 'style' },
        { rel: 'preload', href: 'script.js', as: 'script' }
    ];
    
    links.forEach(link => {
        const linkElement = document.createElement('link');
        Object.assign(linkElement, link);
        document.head.appendChild(linkElement);
    });
}

// Initialize preloading
preloadCriticalResources();

