// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans[0].classList.toggle('rotate-45');
    spans[1].classList.toggle('opacity-0');
    spans[2].classList.toggle('rotate-neg-45');
});

// Notification Bar
const notificationBar = document.getElementById('notificationBar');
const closeNotification = document.getElementById('closeNotification');

closeNotification.addEventListener('click', () => {
    notificationBar.style.transform = 'translateY(-100%)';
    document.querySelector('.navbar').style.top = '0';
});

//Enhanced Hero Slider
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds per slide

    function goToSlide(n) {
        // Add fade-out class to current slide
        slides[currentSlide].style.opacity = '0';
        dots[currentSlide].classList.remove('active');
        
        // Update current slide index
        currentSlide = (n + slides.length) % slides.length;
        
        // Add fade-in class to new slide
        slides[currentSlide].style.opacity = '1';
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Add click events to navigation dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    // Set up automatic sliding
    let slideTimer = setInterval(nextSlide, slideInterval);
/*
    // Pause slider on hover
    const heroSection = document.querySelector('.hero');
    heroSection.addEventListener('mouseenter', () => {
        clearInterval(slideTimer);
    });
*/
    heroSection.addEventListener('mouseleave', () => {
        slideTimer = setInterval(nextSlide, slideInterval);
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentSlide + 1);
        }
    });
});

// Scroll Event for Navbar
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const navbar = document.querySelector('.navbar');
    
    if (currentScroll <= 0) {
        navbar.style.top = notificationBar.style.transform === 'translateY(-100%)' ? '0' : '45px';
    } else if (currentScroll > lastScroll) {
        navbar.style.top = '-80px';
    } else {
        navbar.style.top = notificationBar.style.transform === 'translateY(-100%)' ? '0' : '45px';
    }
    lastScroll = currentScroll;
});

// Form Validation
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, errorElement) {
    input.style.borderColor = '#e31837';
    errorElement.style.display = 'block';
}

function hideError(input, errorElement) {
    input.style.borderColor = '#ddd';
    errorElement.style.display = 'none';
}

function validateField(input, errorElement, validationFn) {
    if (!validationFn(input.value)) {
        showError(input, errorElement);
        return false;
    }
    hideError(input, errorElement);
    return true;
}

// Live Form Validation
[nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
        const errorElement = document.getElementById(`${input.id}Error`);
        if (input === emailInput) {
            validateField(input, errorElement, validateEmail);
        } else {
            validateField(input, errorElement, value => value.trim().length > 0);
        }
    });
});

// Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameValid = validateField(
        nameInput, 
        document.getElementById('nameError'),
        value => value.trim().length > 0
    );

    const emailValid = validateField(
        emailInput,
        document.getElementById('emailError'),
        validateEmail
    );

    const messageValid = validateField(
        messageInput,
        document.getElementById('messageError'),
        value => value.trim().length > 0
    );

    if (nameValid && emailValid && messageValid) {
        // Here you would typically send the form data to a server
        const formData = {
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value
        };
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Message sent successfully!');
            contactForm.reset();
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }, 1500);
    }
});

// Service Cards Animation Enhancement
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Version 3

// DOM Elements
/*
const DOMElements = {
    init() {
        this.heroSlider = document.querySelector('.hero-slider');
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.slider-dot');
        this.heroSection = document.querySelector('.hero');
        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.navLinks = document.querySelector('.nav-links');
        this.contactForm = document.getElementById('contactForm');
    }
};

// Hero Slider Component
const HeroSlider = {
    currentSlide: 0,
    slideInterval: 5000,
    slideTimer: null,

    init() {
        this.setupEventListeners();
        this.startAutoSlide();
    },

    setupEventListeners() {
        // Dot navigation clicks
        DOMElements.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Pause on hover
        DOMElements.heroSection.addEventListener('mouseenter', () => this.pauseSlider());
        DOMElements.heroSection.addEventListener('mouseleave', () => this.startAutoSlide());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboardNav(e));
    },

    goToSlide(n) {
        // Remove active classes from current slide
        DOMElements.slides[this.currentSlide].style.opacity = '0';
        DOMElements.dots[this.currentSlide].classList.remove('active');
        
        // Update current slide index
        this.currentSlide = (n + DOMElements.slides.length) % DOMElements.slides.length;
        
        // Add active classes to new slide
        DOMElements.slides[this.currentSlide].style.opacity = '1';
        DOMElements.dots[this.currentSlide].classList.add('active');
    },

    nextSlide() {
        this.goToSlide(this.currentSlide + 1);
    },

    pauseSlider() {
        clearInterval(this.slideTimer);
    },

    startAutoSlide() {
        this.slideTimer = setInterval(() => this.nextSlide(), this.slideInterval);
    },

    handleKeyboardNav(e) {
        if (e.key === 'ArrowLeft') {
            this.goToSlide(this.currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            this.goToSlide(this.currentSlide + 1);
        }
    }
};

// Form Validation Component
const FormValidation = {
    fields: ['name', 'email', 'message'],

    init() {
        if (DOMElements.contactForm) {
            this.setupFormValidation();
        }
    },

    setupFormValidation() {
        // Input validation
        this.fields.forEach(field => {
            const input = document.getElementById(field);
            const error = document.getElementById(`${field}Error`);

            input.addEventListener('input', () => {
                this.validateField(field, input, error);
            });
        });

        // Form submission
        DOMElements.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validateForm()) {
                this.handleFormSubmit();
            }
        });
    },

    validateField(field, input, error) {
        let isValid = true;
        
        switch(field) {
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
                break;
            default:
                isValid = input.value.trim() !== '';
        }

        error.style.display = isValid ? 'none' : 'block';
        return isValid;
    },

    validateForm() {
        let isValid = true;
        this.fields.forEach(field => {
            const input = document.getElementById(field);
            const error = document.getElementById(`${field}Error`);
            if (!this.validateField(field, input, error)) {
                isValid = false;
            }
        });
        return isValid;
    },

    handleFormSubmit() {
        alert('Message sent successfully!');
        DOMElements.contactForm.reset();
    }
};

// Mobile Navigation Component
const MobileNavigation = {
    init() {
        this.setupEventListeners();
    },

    setupEventListeners() {
        // Toggle mobile menu
        DOMElements.mobileMenuBtn.addEventListener('click', () => {
            DOMElements.navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav')) {
                DOMElements.navLinks.classList.remove('active');
            }
        });

        // Smooth scroll for navigation links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e, link));
        });
    },

    handleNavClick(e, link) {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            DOMElements.navLinks.classList.remove('active');
        }
    }
};

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize DOM elements
    DOMElements.init();

    // Initialize components
    HeroSlider.init();
    FormValidation.init();
    MobileNavigation.init();
});
*/