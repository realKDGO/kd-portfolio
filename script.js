// Typing Animation
const typingName = document.querySelector('.typing-name');
const typingDesc = document.querySelector('.typing-desc');

const name = "King David";
const descriptions = [
  "Computer Science Student.",
  "Aspiring Software Engineer."
];

const typingSpeed = 100; // milliseconds per character while typing
const deletingSpeed = 50; // milliseconds per character while deleting
const pauseAfterTyping = 1500; // pause after full text is typed
const pauseAfterDeleting = 500; // pause after full text is deleted

let nameCharIndex = 0;
let descIndex = 0;
let descCharIndex = 0;
let isDeleting = false;

function typeName() {
    if (nameCharIndex < name.length) {
        typingName.textContent += name.charAt(nameCharIndex);
        nameCharIndex++;
        setTimeout(typeName, typingSpeed);
    } else {
        setTimeout(typeDescLoop, pauseAfterTyping);
    }
}

function typeDescLoop() {
    const currentText = descriptions[descIndex];

    if (isDeleting) {
        descCharIndex--;
        typingDesc.textContent = currentText.substring(0, descCharIndex);
    } else {
        descCharIndex++;
        typingDesc.textContent = currentText.substring(0, descCharIndex);
    }

    if (!isDeleting && descCharIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeDescLoop, pauseAfterTyping);
    } else if (isDeleting && descCharIndex === 0) {
        isDeleting = false;
        descIndex = (descIndex + 1) % descriptions.length;
        setTimeout(typeDescLoop, pauseAfterDeleting);
    } else {
        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(typeDescLoop, speed);
    }
}

// Start the typing animation
setTimeout(typeName, 500);

// ===== SCROLL ANIMATIONS ===== //
const animateOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('section-title')) {
                    entry.target.classList.add('animate-title');
                }
                if (entry.target.classList.contains('about-text')) {
                    entry.target.classList.add('animate-left');
                }
                if (entry.target.classList.contains('about-image')) {
                    entry.target.classList.add('animate-right');
                }
                if (entry.target.classList.contains('contact-info')) {
                    entry.target.classList.add('animate-left');
                }
                if (entry.target.classList.contains('contact-form')) {
                    entry.target.classList.add('animate-right');
                }
                if (entry.target.classList.contains('skill-card')) {
                    entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
                }
                if (entry.target.classList.contains('project-card')) {
                    entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
                }
            } else {
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

    document.querySelectorAll(
        '.section-title, .about-text, .about-image, .contact-info, .contact-form, .skill-card, .project-card'
    ).forEach(el => observer.observe(el));
};

document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();

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
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});
