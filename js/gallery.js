/**
 * Mulligan Masters Golf Group Website
 * Gallery JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Gallery filtering functionality
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
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
    
    // Lazy loading for gallery images
    const lazyImages = document.querySelectorAll('.gallery-image[data-src]');
    
    if (lazyImages.length > 0) {
        // Create intersection observer
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.style.backgroundImage = `url(${src})`;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
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
            const columns = getComputedStyle(galleryContainer).gridTemplateColumns.split(' ').length;
            
            // Set heights for items to create masonry effect
            items.forEach((item, index) => {
                // This is a simple pattern, you might want to randomize this more
                if (index % 3 === 0) {
                    item.style.gridRowEnd = 'span 1';
                } else if (index % 3 === 1) {
                    item.style.gridRowEnd = 'span 2';
                } else {
                    item.style.gridRowEnd = 'span 1';
                }
            });
        }
    }
    
    // Call masonry setup after images are loaded
    window.addEventListener('load', setupMasonry);
    window.addEventListener('resize', setupMasonry);
});
