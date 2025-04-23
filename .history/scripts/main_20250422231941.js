/*==================== MAIN JS ====================*/
document.addEventListener('DOMContentLoaded', () => {
    // Add page transition class to main content
    const main = document.querySelector('main');
    if (main) {
        main.classList.add('page-transition');
    }

    // Initialize all components
    initNavMenu();
    initScrollActiveLink();
    initProjectsFilter();
    initContactForm();
});

/*==================== NAVIGATION MENU ====================*/
function initNavMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        // Toggle menu on click
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.header__nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show-menu');
                navToggle.classList.remove('active');
            });
        });
    }
}

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
function initScrollActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    
    const scrollActive = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 50;
            const sectionId = current.getAttribute('id');
            const sectionLink = document.querySelector(`.header__nav-link[href*="${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                sectionLink?.classList.add('active');
            } else {
                sectionLink?.classList.remove('active');
            }
        });
    };
    
    window.addEventListener('scroll', scrollActive);
}

/*==================== PROJECTS FILTER ====================*/
function initProjectsFilter() {
    const filterButtons = document.querySelectorAll('.projects__filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length && projectCards.length) {
        // Add click event to each filter button
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filterValue = button.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || filterValue === cardCategory) {
                        card.style.display = 'block';
                        
                        // Add animation
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        
                        // Hide after animation
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

/*==================== CONTACT FORM ====================*/
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = Object.fromEntries(formData);
            
            // For now, just log the form data (this would be replaced with actual form submission)
            console.log('Form submission:', formObject);
            
            // Show success message (this is a placeholder - would be replaced with actual feedback)
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
}

/*==================== PAGE TRANSITIONS ====================*/
// /** Simple page transitions for now 
// My goal is to try to add more complex animations later
*/
function initPageTransitions() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('a:not([target="_blank"])');
    
    navLinks.forEach(link => {
        // Only add transition to internal links
        if (link.href.includes(window.location.origin)) {
            link.addEventListener('click', (e) => {
                // Don't apply to anchor links
                if (!link.href.includes('#')) {
                    e.preventDefault();
                    const destination = link.href;
                    
                    // Add fade out animation
                    const main = document.querySelector('main');
                    if (main) {
                        main.classList.add('fade-out');
                        
                        // Navigate after animation completes
                        setTimeout(() => {
                            window.location.href = destination;
                        }, 300); // Match the CSS animation duration
                    } else {
                        // Fallback to regular navigation
                        window.location.href = destination;
                    }
                }
            });
        }
    });
}

/*==================== SCROLL REVEAL ANIMATION ====================*/
// This is a placeholder for future implementation
// You might want to use a library like ScrollReveal for this
function initScrollReveal() {
    // This would be implemented later
    console.log('ScrollReveal not implemented yet');
}

/*==================== INTERSECTION OBSERVER FOR LAZY LOADING ====================*/
// This is a placeholder for future implementation with React components
function initLazyLoading() {
    // This would be implemented later
    console.log('Lazy loading not implemented yet');
}

/*==================== UTILITY FUNCTIONS ====================*/
// These will be useful when migrating to React components

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - Function to debounce
 * @param {number} wait - Time to wait in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait = 100) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @returns {string} - Formatted date string
 */
function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Validate email address format
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}