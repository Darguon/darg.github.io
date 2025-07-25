// Audio setup
let backgroundMusic;
let audioInitialized = false;

// Initialize audio
function initAudio() {
    // Replace 'assets/background-music.mp3' with your actual music file
    backgroundMusic = new Audio('assets/background-music.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;

    // Handle volume control
    const volumeSlider = document.querySelector('.slider');
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            if (backgroundMusic) {
                backgroundMusic.volume = e.target.value / 100;
            }
        });
    }
}

// Start music function - guaranteed to work when called from user interaction
function startMusic() {
    if (backgroundMusic && !audioInitialized) {
        backgroundMusic.play()
            .then(() => {
                console.log('🎵 Music started successfully!');
                audioInitialized = true;
            })
            .catch(e => {
                console.log('Music failed to start:', e);
            });
    }
}

// Handle enter overlay
function handleEnterOverlay() {
    const overlay = document.getElementById('enter-overlay');

    if (!overlay) {
        console.error('Enter overlay not found');
        return;
    }

    // Make sure overlay is clickable
    overlay.style.cursor = 'pointer';

    // Click anywhere on overlay to enter
    overlay.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('🎯 Click to enter triggered');

        // Start music immediately (this works because it's a direct user click)
        startMusic();

        // Increment page views
        const newCount = incrementPageViews();
        console.log(`📊 Page views: ${newCount}`);

        // Animate overlay out
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';

        // Remove overlay after animation
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 500);

        // Start other animations
        setTimeout(() => {
            createParticles();
            animateCounter();
        }, 300);
    });

    // Also listen for any key press as alternative
    document.addEventListener('keydown', (e) => {
        if (overlay.style.display !== 'none') {
            overlay.click();
        }
    }, { once: true });
}

// Page view functionality
function incrementPageViews() {
    const STORAGE_KEY = 'darg_portfolio_views';
    const LAST_VISIT_KEY = 'darg_portfolio_last_visit';
    const BASE_COUNT = 1250; // Starting number to make it look established

    const now = new Date();
    const today = now.toDateString();
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);

    let currentViews = parseInt(localStorage.getItem(STORAGE_KEY)) || BASE_COUNT;

    // If it's a new day since last visit, simulate some organic growth
    if (lastVisit && lastVisit !== today) {
        const lastVisitDate = new Date(lastVisit);
        const daysDiff = Math.floor((now - lastVisitDate) / (1000 * 60 * 60 * 24));

        // Add 3-7 views per day that passed (simulate organic traffic)
        const organicViews = daysDiff * Math.floor(Math.random() * 5 + 3);
        currentViews += organicViews;
    }

    // Increment for this visit
    currentViews += 1;

    // Store updated values
    localStorage.setItem(STORAGE_KEY, currentViews.toString());
    localStorage.setItem(LAST_VISIT_KEY, today);

    return currentViews;
}

// Get current page views without incrementing
function getCurrentPageViews() {
    const STORAGE_KEY = 'darg_portfolio_views';
    const BASE_COUNT = 1250;
    return parseInt(localStorage.getItem(STORAGE_KEY)) || BASE_COUNT;
}

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');

    if (!particlesContainer) {
        console.error('Particles container not found');
        return;
    }

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random size
        const size = Math.random() * 4 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Random animation duration
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';

        particlesContainer.appendChild(particle);
    }
}

// Animate visitor counter
function animateCounter() {
    const counter = document.getElementById('visitor-count');

    if (!counter) {
        console.error('Visitor counter not found');
        return;
    }

    let count = 0;
    const target = getCurrentPageViews();
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
            counter.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(count).toLocaleString();
        }
    }, 16);
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfolio initializing...');

    initAudio();
    handleEnterOverlay();

    // Update social links
    const links = document.querySelectorAll('.social-link');
    const profiles = {
        0: 'https://discord.com/users/mrdarg.', // Discord
        1: '#', // TikTok
        2: 'https://github.com/darguon', // GitHub
        3: 'mailto:contact@darg.dev' // Email
    };

    links.forEach((link, index) => {
        if (profiles[index]) {
            link.href = profiles[index];
        }
    });

    console.log('✅ Portfolio ready - click to enter!');
});

// Mouse move effect for background
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    document.body.style.background = `linear-gradient(${135 + x * 10}deg, 
        rgba(15, 23, 42, ${0.9 + y * 0.1}) 0%, 
        rgba(30, 41, 59, ${0.8 + x * 0.1}) 25%,
        rgba(51, 65, 85, ${0.7 + y * 0.1}) 50%,
        rgba(71, 85, 105, ${0.6 + x * 0.1}) 75%,
        rgba(100, 116, 139, ${0.5 + y * 0.1}) 100%)`;
});