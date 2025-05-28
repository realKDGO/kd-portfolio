// Wait for full page load (including images)
window.addEventListener('load', function() {
    const loader = document.querySelector('.page-loader');
    const content = document.querySelector('.page-content');
    
    // Exit if elements don't exist
    if (!loader || !content) return;
    
    // Minimum display time for loader (1.5 seconds)
    setTimeout(function() {
        // Fade out loader
        loader.style.opacity = '0';
        
        // Wait for fade to complete
        setTimeout(function() {
            // Hide loader completely
            loader.style.display = 'none';
            
            // Show content
            content.classList.add('visible');
        }, 800); // Must match CSS transition time
    }, 1500);
});

// Fallback in case 'load' event never fires
setTimeout(function() {
    const loader = document.querySelector('.page-loader');
    const content = document.querySelector('.page-content');
    
    if (loader && content) {
        loader.style.display = 'none';
        content.classList.add('visible');
    }
}, 5000); // 5 second absolute timeout

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

// ===== 1. Disable browser scroll restoration =====
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// ===== 2. On load: remove hash and scroll to top =====
window.addEventListener('DOMContentLoaded', () => {
  // If there's a hash in the URL, strip it and scroll to top
  if (window.location.hash) {
    const pathWithoutHash = window.location.pathname + window.location.search;

    // Remove the hash from the URL without reloading
    history.replaceState(null, '', pathWithoutHash);

    // Scroll to top after slight delay
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }

  // ===== Smooth scrolling with offset for sticky nav =====
  const OFFSET = 80;
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        const topOffset = target.getBoundingClientRect().top + window.scrollY - OFFSET;

        window.scrollTo({
          top: topOffset,
          behavior: 'smooth'
        });

        // Optional: add hash without jumping
        history.pushState(null, '', targetId);
      }
    });
  });

  // Handle direct navigation to a hash (e.g., opening the page with #about)
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - OFFSET;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 0);
    }
  }
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
