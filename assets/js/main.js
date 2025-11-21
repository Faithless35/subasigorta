// Suba Sigorta - Main JavaScript

// ===== LOADING ANIMATION (OPTIONAL) =====
// Hide loading spinner when page is fully loaded
window.addEventListener('load', function() {
    const loadingSpinner = document.querySelector('.loading-spinner');
    if (loadingSpinner) {
        setTimeout(() => {
            loadingSpinner.classList.add('hidden');
            // Remove from DOM after transition
            setTimeout(() => {
                loadingSpinner.remove();
            }, 500);
        }, 300); // Small delay for smooth transition
    }
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Suba Sigorta website loaded successfully');
    
    // ===== NAVIGATION BAR FUNCTIONALITY =====
    
    // 1. Smooth Scroll Navigation
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbar = document.querySelector('.navbar');
    
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
                
                // Smooth scroll to target section
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 2. Navbar Background Change on Scroll
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Initial check
    handleNavbarScroll();
    
    // Listen to scroll events
    window.addEventListener('scroll', handleNavbarScroll);
    
    // 3. Active Section Highlighting
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = navbar.offsetHeight;
        const scrollPosition = window.scrollY + navbarHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.navbar-nav .nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
        
        // Special case: if at the very top, highlight home
        if (window.scrollY < 100) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            const homeLink = document.querySelector('.navbar-nav .nav-link[href="#home"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
        }
    }
    
    // Initial check
    highlightActiveSection();
    
    // Listen to scroll events for active section highlighting
    window.addEventListener('scroll', highlightActiveSection);
    
    // ===== SCROLL TO TOP BUTTON =====
    
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // Show/hide scroll to top button based on scroll position
    function handleScrollToTopVisibility() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    }
    
    // Initial check
    handleScrollToTopVisibility();
    
    // Listen to scroll events
    window.addEventListener('scroll', handleScrollToTopVisibility);
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== SCROLL ANIMATIONS WITH INTERSECTION OBSERVER =====
    
    // Create Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before element enters viewport
        threshold: 0.15 // Trigger when 15% of element is visible
    };
    
    const animateOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Unobserve after animation to improve performance
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll(
        '.service-card, .team-member, .mission-vision-card, .contact-info-item, .section-title, .section-description, .about-content, .contact-form-wrapper, .contact-info-wrapper'
    );
    
    animatedElements.forEach((element, index) => {
        // Add base animation class
        element.classList.add('fade-in-up');
        
        // Add staggered delay for cards in the same section
        const delay = (index % 3) + 1; // Creates delays of 1, 2, 3, 1, 2, 3...
        if (element.classList.contains('service-card') || 
            element.classList.contains('team-member') || 
            element.classList.contains('mission-vision-card')) {
            element.classList.add(`animate-delay-${delay}`);
        }
        
        // Observe the element
        animateOnScroll.observe(element);
    });
    
    // Add slide-in animations for specific elements
    const slideLeftElements = document.querySelectorAll('.about-icon-wrapper');
    slideLeftElements.forEach(element => {
        element.classList.add('slide-in-left');
        animateOnScroll.observe(element);
    });
    
    const slideRightElements = document.querySelectorAll('.about-content');
    slideRightElements.forEach(element => {
        element.classList.add('slide-in-right');
        animateOnScroll.observe(element);
    });
    
    // ===== CONTACT FORM VALIDATION =====
    
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Check form validity
            if (contactForm.checkValidity() === false) {
                // Show validation errors
                contactForm.classList.add('was-validated');
            } else {
                // Form is valid - process submission
                contactForm.classList.add('was-validated');
                
                // Get form data
                const formData = {
                    name: document.getElementById('contactName').value,
                    email: document.getElementById('contactEmail').value,
                    phone: document.getElementById('contactPhone').value,
                    insuranceType: document.getElementById('insuranceType').value,
                    message: document.getElementById('contactMessage').value,
                    timestamp: new Date().toISOString()
                };
                
                // Log form data (in production, this would be sent to a server)
                console.log('Form submitted:', formData);
                
                // Show success message
                showFormMessage('success', 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.');
                
                // Reset form
                contactForm.reset();
                contactForm.classList.remove('was-validated');
                
                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
        
        // Real-time validation feedback
        const formInputs = contactForm.querySelectorAll('.form-control');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (contactForm.classList.contains('was-validated')) {
                    // Re-validate on blur if form was already validated
                    this.checkValidity();
                }
            });
            
            input.addEventListener('input', function() {
                if (contactForm.classList.contains('was-validated')) {
                    // Re-validate on input if form was already validated
                    this.checkValidity();
                }
            });
        });
    }
    
    // Helper function to show form messages
    function showFormMessage(type, message) {
        formMessage.className = 'mt-3 alert show';
        
        if (type === 'success') {
            formMessage.classList.add('alert-success');
        } else if (type === 'error') {
            formMessage.classList.add('alert-danger');
        }
        
        formMessage.textContent = message;
        
        // Auto-hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.remove('show');
            setTimeout(() => {
                formMessage.className = 'mt-3';
                formMessage.textContent = '';
            }, 300);
        }, 5000);
    }
    
    // ===== DYNAMIC YEAR IN FOOTER =====
    
    // Update copyright year dynamically
    const copyrightYearElements = document.querySelectorAll('.copyright-year');
    const currentYear = new Date().getFullYear();
    
    copyrightYearElements.forEach(element => {
        element.textContent = currentYear;
    });
});
