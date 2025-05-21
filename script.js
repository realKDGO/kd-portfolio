// Typing Animation
const typingName = document.querySelector('.typing-name');
const typingDesc = document.querySelector('.typing-desc');

const name = "King David";
const description = "Aspiring Software Engineer.";

const typingSpeed = 100; // milliseconds per character
const pauseAfterTyping = 1500; // pause after full text is typed

let nameCharIndex = 0;
let descCharIndex = 0;

function typeName() {
    if (nameCharIndex < name.length) {
        typingName.textContent += name.charAt(nameCharIndex);
        nameCharIndex++;
        setTimeout(typeName, typingSpeed);
    } else {
        setTimeout(typeDesc, pauseAfterTyping); // Wait before starting description
    }
}

function typeDesc() {
    if (descCharIndex < description.length) {
        typingDesc.textContent += description.charAt(descCharIndex);
        descCharIndex++;
        setTimeout(typeDesc, typingSpeed);
    }
}

// Start the typing animations
setTimeout(typeName, 500); // Initial small delay

// ===== SCROLL ANIMATIONS ===== //
const animateOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Section Titles (slide down)
                if (entry.target.classList.contains('section-title')) {
                    entry.target.classList.add('animate-title');
                }

                // About Section (left/right)
                if (entry.target.classList.contains('about-text')) {
                    entry.target.classList.add('animate-left');
                }
                if (entry.target.classList.contains('about-image')) {
                    entry.target.classList.add('animate-right');
                }

                // Contact Section (left/right)
                if (entry.target.classList.contains('contact-info')) {
                    entry.target.classList.add('animate-left');
                }
                if (entry.target.classList.contains('contact-form')) {
                    entry.target.classList.add('animate-right');
                }

                // Skills Cards (fade only)
                if (entry.target.classList.contains('skill-card')) {
                    entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
                }

                // Project Cards (fade only)
                if (entry.target.classList.contains('project-card')) {
                    entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
                }

            } else {
                // Exit animations (reverse)
                if (entry.target.classList.contains('section-title')) {
                    entry.target.classList.remove('animate-title');
                }
                if (entry.target.classList.contains('about-text')) {
                    entry.target.classList.remove('animate-left');
                }
                if (entry.target.classList.contains('about-image')) {
                    entry.target.classList.remove('animate-right');
                }
                if (entry.target.classList.contains('contact-info')) {
                    entry.target.classList.remove('animate-left');
                }
                if (entry.target.classList.contains('contact-form')) {
                    entry.target.classList.remove('animate-right');
                }
            }
        });
    }, { threshold: 0.1 });

    // Observe elements
    document.querySelectorAll(
        '.section-title, .about-text, .about-image, .contact-info, .contact-form, .skill-card, .project-card'
    ).forEach(el => {
        observer.observe(el);
    });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    
    // Handle tab changes for skills
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(() => {
                const cards = document.querySelectorAll('.tab-content.active .skill-card');
                cards.forEach(card => {
                    card.style.animation = 'fadeIn 0.8s ease-out forwards';
                });
            }, 300);
        });
    });
});

// ===== DARK MODE TOGGLE ===== //
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;
const icon = darkModeToggle.querySelector('i');

// Check for saved user preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        localStorage.setItem('theme', 'light');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// ===== MOBILE NAVIGATION ===== //
const burgerMenu = document.querySelector('.burger-menu');
const navLinks = document.querySelector('.nav-links');

burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burgerMenu.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burgerMenu.querySelector('i').classList.remove('fa-times');
    });
});

// ===== SMOOTH SCROLLING ===== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SKILLS TAB SWITCHING ===== //
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});