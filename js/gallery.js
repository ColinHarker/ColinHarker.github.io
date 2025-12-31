/**
 * Mulligan Masters Golf Group Website
 * Gallery JavaScript File - Dynamic Cloudinary Integration
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        once: true,
        disable: 'mobile'
    });

    // Gallery state
    let allPhotos = [];
    let currentFilter = 'all';
    let currentIndex = 0;

    // DOM elements
    const galleryContainer = document.querySelector('.gallery-container');
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const lightbox = document.querySelector('.lightbox');
    const lightboxContent = document.querySelector('.lightbox-content');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxClose = document.querySelector('.lightbox-close');

    // Fetch photos from Netlify function
    async function fetchPhotos(tag = 'all') {
        try {
            // Show loading state
            if (galleryContainer) {
                galleryContainer.innerHTML = '<div class="gallery-loading">Loading photos...</div>';
            }

            const response = await fetch(`/.netlify/functions/get-gallery-photos?tag=${tag}`);

            if (!response.ok) {
                throw new Error('Failed to fetch photos');
            }

            const photos = await response.json();
            return photos;
        } catch (error) {
            console.error('Error fetching photos:', error);
            if (galleryContainer) {
                galleryContainer.innerHTML = '<div class="gallery-error">Unable to load photos. Please try again later.</div>';
            }
            return [];
        }
    }

    // Render gallery items
    function renderGallery(photos) {
        if (!galleryContainer) return;

        if (photos.length === 0) {
            galleryContainer.innerHTML = '<div class="gallery-empty">No photos found.</div>';
            return;
        }

        galleryContainer.innerHTML = photos.map((photo, index) => `
            <div class="gallery-item" data-index="${index}" data-aos="fade-up">
                <div class="gallery-image" style="background-image: url('${photo.thumbnail}'); background-size: cover; background-position: center;"></div>
                <div class="gallery-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            </div>
        `).join('');

        // Store photos for lightbox navigation
        allPhotos = photos;

        // Attach click handlers for lightbox
        attachLightboxHandlers();

        // Reinitialize AOS for new elements
        AOS.refresh();
    }

    // Attach lightbox handlers to gallery items
    function attachLightboxHandlers() {
        const galleryItems = document.querySelectorAll('.gallery-item');

        galleryItems.forEach((item) => {
            item.addEventListener('click', () => {
                const index = parseInt(item.getAttribute('data-index'), 10);
                openLightbox(index);
            });
        });
    }

    // Open lightbox at specific index
    function openLightbox(index) {
        if (!lightbox || !lightboxContent || allPhotos.length === 0) return;

        currentIndex = index;
        showCurrentImage();
        lightbox.classList.add('active');
    }

    // Show image at current index in lightbox
    function showCurrentImage() {
        if (!lightboxContent || allPhotos.length === 0) return;

        const photo = allPhotos[currentIndex];
        lightboxContent.innerHTML = `<img src="${photo.full}" alt="Gallery Image">`;

        // Ensure image fits within viewport
        const img = lightboxContent.querySelector('img');
        if (img) {
            img.onload = function() {
                const maxWidth = window.innerWidth * 0.9;
                const maxHeight = window.innerHeight * 0.8;

                if (img.naturalWidth > maxWidth || img.naturalHeight > maxHeight) {
                    img.style.maxWidth = maxWidth + 'px';
                    img.style.maxHeight = maxHeight + 'px';
                }
            };
        }
    }

    // Close lightbox
    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
        }
    }

    // Navigate lightbox
    function navigateLightbox(direction) {
        if (allPhotos.length === 0) return;

        if (direction === 'prev') {
            currentIndex = (currentIndex - 1 + allPhotos.length) % allPhotos.length;
        } else {
            currentIndex = (currentIndex + 1) % allPhotos.length;
        }
        showCurrentImage();
    }

    // Filter button click handlers
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', async () => {
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Get filter value and fetch photos
                currentFilter = button.getAttribute('data-filter');
                const photos = await fetchPhotos(currentFilter);
                renderGallery(photos);
            });
        });
    }

    // Lightbox event handlers
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateLightbox('prev');
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateLightbox('next');
        });
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                navigateLightbox('prev');
            } else if (e.key === 'ArrowRight') {
                navigateLightbox('next');
            } else if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    });

    // Initial load - fetch all photos
    async function init() {
        const photos = await fetchPhotos('all');
        renderGallery(photos);
    }

    init();
});
