/**
 * Mulligan Masters Golf Group Website
 * Main JavaScript File
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Events page tabs functionality
    const eventsTabs = document.querySelectorAll('.events-tab');
    const eventsContainers = document.querySelectorAll('.events-content');
    
    if (eventsTabs.length > 0 && eventsContainers.length > 0) {
        eventsTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                eventsTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Hide all content sections
                eventsContainers.forEach(container => {
                    container.style.display = 'none';
                });
                
                // Show the corresponding content section
                const targetId = tab.getAttribute('data-target');
                document.getElementById(targetId).style.display = 'grid';
            });
        });
    }
    
    // Gallery lightbox functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxContent = document.querySelector('.lightbox-content');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    if (galleryItems.length > 0 && lightbox && lightboxContent && lightboxClose) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.getAttribute('data-img-src');
                if (imgSrc) {
                    lightboxContent.innerHTML = `<img src="${imgSrc}" alt="Gallery Image">`;
                    lightbox.classList.add('active');
                }
            });
        });
        
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }
    
    // Mobile menu close on click
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
    
    // Video background functionality
    // This will be implemented when the actual video is available
    // For now, we're using a placeholder
    
    // Function to handle contact form submission (if implemented later)
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the data to a server
            // Since we're using GitHub Pages, we'll just open the mail client
            
            const subject = encodeURIComponent('Contact from Mulligan Masters Website');
            const body = encodeURIComponent(`Name: ${formObject.name}\nEmail: ${formObject.email}\nMessage: ${formObject.message}`);
            
            window.location.href = `mailto:mulliganmasters@gmail.com?subject=${subject}&body=${body}`;
            
            // Reset form
            contactForm.reset();
        });
    }
});
