/**
 * Mulligan Masters Golf Group Website
 * Gallery JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        once: true,
        disable: 'mobile'
    });
    
    // Gallery filtering functionality
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Ensure all gallery items are visible by default and remove AOS attributes
    galleryItems.forEach(item => {
        item.style.display = 'block';
        // Remove AOS attributes to prevent animation issues
        item.removeAttribute('data-aos');
        item.removeAttribute('data-aos-delay');
    });
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filterValue = button.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else {
                        if (item.classList.contains(filterValue)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Lightbox navigation functionality
    const lightbox = document.querySelector('.lightbox');
    const lightboxContent = document.querySelector('.lightbox-content');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    if (lightbox && lightboxContent && lightboxPrev && lightboxNext && galleryItems.length > 0) {
        let currentIndex = 0;
        
        // Function to show image at current index
        function showImage(index) {
            const imgSrc = galleryItems[index].getAttribute('data-img-src');
            if (imgSrc) {
                lightboxContent.innerHTML = `<img src="${imgSrc}" alt="Gallery Image">`;
                currentIndex = index;
                
                // Make sure the image is fully loaded before showing
                const img = lightboxContent.querySelector('img');
                if (img) {
                    img.onload = function() {
                        // Ensure image fits within viewport
                        const maxWidth = window.innerWidth * 0.9;
                        const maxHeight = window.innerHeight * 0.8;
                        
                        if (img.naturalWidth > maxWidth || img.naturalHeight > maxHeight) {
                            img.style.maxWidth = maxWidth + 'px';
                            img.style.maxHeight = maxHeight + 'px';
                        }
                    };
                }
            }
        }
        
        // Previous button click
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            showImage(currentIndex);
        });
        
        // Next button click
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % galleryItems.length;
            showImage(currentIndex);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('active')) {
                if (e.key === 'ArrowLeft') {
                    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                    showImage(currentIndex);
                } else if (e.key === 'ArrowRight') {
                    currentIndex = (currentIndex + 1) % galleryItems.length;
                    showImage(currentIndex);
                } else if (e.key === 'Escape') {
                    lightbox.classList.remove('active');
                }
            }
        });
        
        // Open lightbox with correct index
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentIndex = index;
                showImage(currentIndex);
                lightbox.classList.add('active');
            });
        });
    }
    
    // Enhanced lazy loading for gallery images with caching
    const lazyImages = document.querySelectorAll('.gallery-image');
    
    if (lazyImages.length > 0) {
        // Create intersection observer with options
        const observerOptions = {
            root: null, // viewport
            rootMargin: '100px', // load images 100px before they enter viewport
            threshold: 0.1 // trigger when 10% of the element is visible
        };
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const bgImage = img.style.backgroundImage;
                    
                    // Only process if not already loaded
                    if (bgImage && !img.classList.contains('loaded')) {
                        // Extract the URL from the background-image style
                        const urlMatch = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/);
                        if (urlMatch && urlMatch[1]) {
                            const imageUrl = urlMatch[1];
                            
                            // Create a new image to preload
                            const preloadImg = new Image();
                            
                            // Set up load event
                            preloadImg.onload = function() {
                                // Apply the loaded image with cache control
                                img.style.backgroundImage = `url(${imageUrl})`;
                                img.classList.add('loaded');
                                
                                // Add cache control headers via fetch API
                                fetch(imageUrl, {
                                    method: 'GET',
                                    headers: {
                                        'Cache-Control': 'max-age=31536000' // Cache for 1 year
                                    },
                                    mode: 'no-cors' // Avoid CORS issues with static files
                                }).catch(() => {
                                    // Silently fail - image is already loaded anyway
                                });
                            };
                            
                            // Start loading the image
                            preloadImg.src = imageUrl;
                        }
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, observerOptions);
        
        // Observe each image
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Masonry layout (if needed)
    // This is a simplified version, for a more robust solution consider using a library like Masonry.js
    function setupMasonry() {
        const galleryContainer = document.querySelector('.gallery-container');
        
        if (galleryContainer && galleryContainer.classList.contains('masonry')) {
            const items = galleryContainer.querySelectorAll('.gallery-item');
            
            // Set all items to span 1 to ensure square layout and make sure they're visible
            items.forEach((item) => {
                item.style.gridRowEnd = 'span 1';
                item.style.display = 'block'; // Ensure all items are visible
            });
        }
    }
    
    // Call masonry setup after images are loaded
    window.addEventListener('load', setupMasonry);
    window.addEventListener('resize', setupMasonry);
});
