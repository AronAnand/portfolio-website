// ===============================================
// Smooth Scrolling & Navigation
// ===============================================
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active Navigation Link
    const sections = document.querySelectorAll('section[id]');

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = window.scrollY;
    });

    // ===============================================
    // Scroll Animations
    // ===============================================
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.stat-card, .project-card, .skill-category, .timeline-item, .achievement-card, .education-card, .contact-card');

        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    animationObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            animationObserver.observe(element);
        });
    };

    animateOnScroll();

    // ===============================================
    // Typing Effect for Hero Title
    // ===============================================
    const typeWriter = (element, text, speed = 100) => {
        let i = 0;
        element.textContent = '';

        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };

        type();
    };

    // Uncomment to enable typing effect
    // const heroTitle = document.querySelector('.gradient-text');
    // if (heroTitle) {
    //     const originalText = heroTitle.textContent;
    //     typeWriter(heroTitle, originalText, 100);
    // }

    // ===============================================
    // Dynamic Stats Counter
    // ===============================================
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + (element.dataset.suffix || '');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (element.dataset.suffix || '');
            }
        };

        updateCounter();
    };

    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                const number = parseInt(text.match(/\d+/)[0]);
                const suffix = text.replace(/\d+/, '');
                entry.target.dataset.suffix = suffix;
                animateCounter(entry.target, number);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));

    // ===============================================
    // Parallax Effect for Hero Section
    // ===============================================
    const hero = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroContent = document.querySelector('.hero-content');

        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });

    // ===============================================
    // Skill Tags Interactive Highlight
    // ===============================================
    const skillTags = document.querySelectorAll('.skill-tag');

    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) translateY(-2px)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });

    // ===============================================
    // Project Tags Interactive Highlight
    // ===============================================
    const projectTags = document.querySelectorAll('.tag');

    projectTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.4)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // ===============================================
    // Copy Email on Click
    // ===============================================
    const emailLink = document.querySelector('a[href^="mailto:"]');

    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            const email = 'aronc.anand3@gmail.com';

            // Copy to clipboard
            navigator.clipboard.writeText(email).then(() => {
                // Show toast notification
                showToast('Email copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy email:', err);
            });
        });
    }

    // ===============================================
    // Toast Notification
    // ===============================================
    const showToast = (message, duration = 3000) => {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            font-weight: 600;
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    };

    // Add toast animations to CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ===============================================
    // Cursor Trail Effect (Optional - commented out for performance)
    // ===============================================
    /*
    const createCursorTrail = () => {
        const coords = { x: 0, y: 0 };
        const circles = [];
        const colors = ['#6366f1', '#8b5cf6', '#ec4899'];

        for (let i = 0; i < 20; i++) {
            const circle = document.createElement('div');
            circle.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: ${colors[i % colors.length]};
                pointer-events: none;
                z-index: 9999;
                opacity: ${1 - i / 20};
                transition: opacity 0.3s;
            `;
            circles.push(circle);
            document.body.appendChild(circle);
        }

        window.addEventListener('mousemove', (e) => {
            coords.x = e.clientX;
            coords.y = e.clientY;
        });

        const animateCircles = () => {
            let x = coords.x;
            let y = coords.y;

            circles.forEach((circle, index) => {
                circle.style.left = x - 5 + 'px';
                circle.style.top = y - 5 + 'px';
                circle.style.transform = `scale(${(20 - index) / 20})`;

                const nextCircle = circles[index + 1] || circles[0];
                x += (nextCircle.offsetLeft - x) * 0.3;
                y += (nextCircle.offsetTop - y) * 0.3;
            });

            requestAnimationFrame(animateCircles);
        };

        animateCircles();
    };

    // Uncomment to enable cursor trail
    // createCursorTrail();
    */

    // ===============================================
    // Performance Optimization: Debounce Scroll Events
    // ===============================================
    const debounce = (func, wait = 10) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // ===============================================
    // Lazy Loading Images (if any images are added later)
    // ===============================================
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    };

    lazyLoadImages();

    // ===============================================
    // Back to Top Button (Optional)
    // ===============================================
    const createBackToTop = () => {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            border: none;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
        `;

        button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });

        window.addEventListener('scroll', debounce(() => {
            if (window.scrollY > 500) {
                button.style.display = 'flex';
            } else {
                button.style.display = 'none';
            }
        }));

        document.body.appendChild(button);
    };

    createBackToTop();

    // ===============================================
    // Console Message
    // ===============================================
    console.log('%c👋 Hi there! Thanks for checking out my portfolio!', 'font-size: 16px; color: #6366f1; font-weight: bold;');
    console.log('%cInterested in the code? Check out my GitHub: https://github.com/AronAnand', 'font-size: 14px; color: #8b5cf6;');
});

// ===============================================
// Theme Toggle (Optional - for future dark/light mode)
// ===============================================
/*
const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
};

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
*/
