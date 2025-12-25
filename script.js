// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const icon = themeToggle.querySelector('i');

// Check for saved user preference
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
updateIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    if (theme === 'dark') {
        icon.classList.remove('bi-moon-fill');
        icon.classList.add('bi-sun-fill');
    } else {
        icon.classList.remove('bi-sun-fill');
        icon.classList.add('bi-moon-fill');
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Skip if it's just a hash or doesn't point to a section
        if (href === '#' || !href.startsWith('#')) {
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }

            // Smooth scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-nav-item');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    mobileLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
            // Update icon to filled version for active state if available
            const icon = link.querySelector('i');
            if (icon && icon.classList.contains('bi-house')) icon.className = 'bi bi-house-fill';
            if (icon && icon.classList.contains('bi-grid')) icon.className = 'bi bi-grid-fill';
            if (icon && icon.classList.contains('bi-briefcase')) icon.className = 'bi bi-briefcase-fill';
            if (icon && icon.classList.contains('bi-chat-dots')) icon.className = 'bi bi-chat-dots-fill';
        } else {
            // Revert to outline
            const icon = link.querySelector('i');
            if (icon && icon.classList.contains('bi-house-fill')) icon.className = 'bi bi-house';
            if (icon && icon.classList.contains('bi-grid-fill')) icon.className = 'bi bi-grid';
            if (icon && icon.classList.contains('bi-briefcase-fill')) icon.className = 'bi bi-briefcase';
            if (icon && icon.classList.contains('bi-chat-dots-fill')) icon.className = 'bi bi-chat-dots';
        }
    });
});
