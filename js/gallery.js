/**
 * Mulligan Masters Golf Group Website
 * Gallery JavaScript File - Local Image Gallery
 */

// All local gallery photos organized by category
const LOCAL_PHOTOS = [
    // Northwood (25 images)
    { path: 'assets/images/Curated Northwood Pics for website -1-001/Curated Northwood Pics for website/Northwood_0001.jpg', category: 'northwood' },
    { path: 'assets/images/Curated Northwood Pics for website -1-001/Curated Northwood Pics for website/Northwood_0007.jpg', category: 'northwood' },
    { path: 'assets/images/Curated Northwood Pics for website -1-001/Curated Northwood Pics for website/Northwood_0025.jpg', category: 'northwood' },
    { path: 'assets/images/Curated Northwood Pics for website -1-001/Curated Northwood Pics for website/Northwood_0051.jpg', category: 'northwood' },
    { path: 'assets/images/Curated Northwood Pics for website -1-001/Curated Northwood Pics for website/Northwood_0061.jpg', category: 'northwood' },
    { path: 'assets/images/Curated Northwood Pics for website -1-001/Curated Northwood Pics for website/Northwood_0062.jpg', category: 'northwood' },
    { path: 'assets/images/Curated Northwood Pics for website -1-001/Curated Northwood Pics for website/Northwood_0075.jpg', category: 'northwood' },
    { path: 'assets/images/Curated Northwood Pics for website -1-001/Curated Northwood Pics for website/Northwood_0095.jpg', category: 'northwood' },
    { path: 'assets/images/Curated Northwood Pics for website -1-001/Curated Northwood Pics for website/Northwood_0096.jpg', category: 'northwood' },
    { path: 'assets/images/Curated Northwood Pics for website -1-001/Curated Northwood Pics for website/Northwood_0111.jpg', category: 'northwood' },
    { path: 'assets/images/Curated Northwood Pics for website -1-001/Curated Northwood Pics for website/Northwood_0119.jpg', category: 'northwood' },
    { path: 'assets/images/Curated Northwood Pics for website -1-001/Curated Northwood Pics for website/Northwood_0139.jpg', category: 'northwood' },
    { path: 'assets/images/Curated Northwood Pics for website -1-001/Curated Northwood Pics for website/Northwood_0149.jpg', category: 'northwood' },
    { path: 'assets/images/Curated Northwood Pics for website -1-001/Curated Northwood Pics for website/Northwood_0151.jpg', category: 'northwood' },
    { path: 'assets/images/Curated Northwood Pics for website -1-001/Curated Northwood Pics for website/Northwood_0166.jpg', category: 'northwood' },
    { path: 'assets/images/Curated Northwood Pics for website -1-001/Curated Northwood Pics for website/Northwood_0200.jpg', category: 'northwood' },
    { path: 'assets/images/Curated Northwood Pics for website -1-001/Curated Northwood Pics for website/Northwood_0228.jpg', category: 'northwood' },
    { path: 'assets/images/Curated Northwood Pics for website -1-001/Curated Northwood Pics for website/Northwood_0245.jpg', category: 'northwood' },
    { path: 'assets/images/Curated Northwood Pics for website -1-001/Curated Northwood Pics for website/Northwood_0256.jpg', category: 'northwood' },
    { path: 'assets/images/Curated Northwood Pics for website -1-001/Curated Northwood Pics for website/Northwood_Golf_01_23_2025-WEB-1.jpeg', category: 'northwood' },
    { path: 'assets/images/Curated Northwood Pics for website -1-001/Curated Northwood Pics for website/Northwood_Golf_01_23_2025-WEB-2.jpeg', category: 'northwood' },
    { path: 'assets/images/Curated Northwood Pics for website -1-001/Curated Northwood Pics for website/Northwood-Landscapes-2.jpg', category: 'northwood' },
    { path: 'assets/images/Curated Northwood Pics for website -1-001/Curated Northwood Pics for website/Northwood-Landscapes-3.jpg', category: 'northwood' },
    { path: 'assets/images/Curated Northwood Pics for website -1-001/Curated Northwood Pics for website/Northwood-Landscapes--WEB-4.jpeg', category: 'northwood' },
    { path: 'assets/images/Curated Northwood Pics for website -1-001/Curated Northwood Pics for website/Northwood-Landscapes--WEB-5.jpeg', category: 'northwood' },

    // Social Events (32 images)
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/86275891-B622-4D60-803F-760B5896CEB8.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/93603EF9-95F5-482F-9864-0D3BB08AAFAC.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/B194DBD3-EAE9-42A7-B1B0-503C3FB58EC5.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/EADCB968-3050-4D05-AF64-BA3CC68448EE.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/EEE434C1-6098-4254-98E1-6DBE88FF59A0.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/IMG_0076.jpeg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/IMG_0083.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/IMG_0088.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/IMG_0114.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/IMG_0119.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/IMG_0163.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/IMG_0166.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/IMG_0172.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/IMG_0307.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/IMG_0894.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/IMG_0904.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/IMG_0914.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/IMG_0922.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/IMG_0994.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/IMG_0995.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/IMG_0997.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/IMG_1012.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/IMG_1059.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/IMG_1195.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/IMG_1218.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/IMG_1601.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/IMG_1641.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/IMG_1673.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/IMG_1805.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/IMG_9873.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/IMG_9874.jpg', category: 'social' },
    { path: 'assets/images/Curated other for website -1-001/Curated other for website/IMG_9984.jpg', category: 'social' },

    // Poppy Hills (44 images)
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-111.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-114.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-117.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-176.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-197.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-239.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-252.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-254.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-263.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-269.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-276.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-293.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-301.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-31.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-315.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-318.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-325.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-363.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-366.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-37.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-38.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-396.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-40.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-402.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-413.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-416.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-435.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-444.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-447.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-455.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-472.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-473.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-476.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-485.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-49.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-507.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-513.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-515.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-64.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-73.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-82.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-83.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-86.jpg', category: 'poppy' },
    { path: 'assets/images/Curated Poppy for website-1-001/Curated Poppy for website/Mulligan_04-2025-87.jpg', category: 'poppy' },
];

// Get photos filtered by category
function getPhotos(category) {
    if (category === 'all') return LOCAL_PHOTOS;
    return LOCAL_PHOTOS.filter(photo => photo.category === category);
}

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

    // Render gallery items
    function renderGallery(photos) {
        if (!galleryContainer) return;

        if (photos.length === 0) {
            galleryContainer.innerHTML = '<div class="gallery-empty">No photos found.</div>';
            return;
        }

        galleryContainer.innerHTML = photos.map((photo, index) => `
            <div class="gallery-item" data-index="${index}" data-aos="fade-up">
                <div class="gallery-image" style="background-image: url('${photo.path}'); background-size: cover; background-position: center;"></div>
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
        lightboxContent.innerHTML = `<img src="${photo.path}" alt="Gallery Image">`;

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
            button.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Get filter value and load photos
                currentFilter = button.getAttribute('data-filter');
                const photos = getPhotos(currentFilter);
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

    // Initial load - render all photos
    renderGallery(getPhotos('all'));
});
