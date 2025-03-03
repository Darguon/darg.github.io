// Main JavaScript entry point
import { initializeProfile } from './components/profile.js';
import { initializeSpotifyPlayer } from './components/player-spotify.js';
import { initializeControls } from './components/controls.js';
import { initializeAbout } from './components/about.js';
import { initializeCursor } from './effects/cursor.js';
import { initializeParticles } from './effects/particles.js';
import { initializeRain } from './effects/rain.js';
import { initializeTheme } from './utilities/theme.js';
import { initializeLoading } from './components/loading.js';
import { initializeParallax } from './effects/parallax.js';
import { BackgroundManager } from './utilities/background-manager.js';

document.addEventListener('DOMContentLoaded', function () {
    console.log('Initializing application...');

    // Hide enter screen initially
    const enterScreen = document.getElementById('enter-screen');
    if (enterScreen) {
        enterScreen.style.display = 'none';
    }

    // Initialize loading screen first
    initializeLoading();

    // Get main elements
    const video = document.getElementById('myVideo');
    const profile = document.getElementById('profile');
    const pauseButton = document.getElementById('pause-button');
    const controlsContainer = document.getElementById('controls-container');

    // Initialize background manager
    const backgroundManager = new BackgroundManager();
    backgroundManager.initialize();

    // Initialize particles on the enter screen
    initializeParticles(enterScreen);

    // Create rain effect
    initializeRain();

    // Initialize cursor effect
    initializeCursor();

    // Setup title animation
    initializeTitleAnimation();

    // Set up enter screen event
    setupEnterScreen(enterScreen, video, profile, pauseButton, controlsContainer, backgroundManager);

    // Initialize components
    initializeProfile();
    initializeSpotifyPlayer();
    initializeControls();
    initializeAbout();
    initializeTheme();

    // Initialize performance monitoring
    const performanceMonitor = new PerformanceMonitor();
    performanceMonitor.start();

    // Store performance monitor in window for global access
    window.performanceMonitor = performanceMonitor;

    // Initialize parallax effects - but only after enter screen
    document.addEventListener('startParallax', function() {
        setTimeout(() => {
            initializeParallax();
        }, 500);
    });

    // Store background manager in window for global access
    window.backgroundManager = backgroundManager;
});

function setupEnterScreen(enterScreen, video, profile, pauseButton, controlsContainer, backgroundManager) {
    let clicked = false;

    // Pulsing text effect
    pulseText();

    // Enter screen click handler
    enterScreen.addEventListener('click', () => {
        if (!clicked) {
            console.log('Enter screen clicked');
            clicked = true;
            enterScreen.style.opacity = '0';
            setTimeout(() => {
                enterScreen.style.display = 'none';

                // Make sure particles container exists before trying to hide it
                const particlesContainer = document.getElementById('particles-js');
                if (particlesContainer) {
                    particlesContainer.style.display = 'none';
                }

                // Show main elements
                video.style.display = 'block';
                profile.style.display = 'block';

                // Show controls
                if (controlsContainer) {
                    controlsContainer.style.display = 'block';
                    console.log('Controls container displayed');
                }

                // Show pause button
                if (pauseButton) {
                    pauseButton.style.display = 'block';
                    console.log('Pause button displayed');
                }

                // Show Spotify player and make sure it's visible
                const spotifyPlayer = document.getElementById('spotify-player');
                if (spotifyPlayer) {
                    spotifyPlayer.style.display = 'block';
                    spotifyPlayer.style.visibility = 'visible';
                    spotifyPlayer.style.opacity = '1';
                    console.log('Spotify player displayed with full visibility');
                } else {
                    console.error('Spotify player element not found');
                }

                // Play background video
                video.play();
                video.style.filter = 'blur(6px)';

                // Initialize player and animations
                document.dispatchEvent(new CustomEvent('startPlayer'));
                document.dispatchEvent(new CustomEvent('startProfileAnimation'));

                // Start parallax effects
                document.dispatchEvent(new CustomEvent('startParallax'));

                console.log('All elements initialized after enter screen');
            }, 1000);
        }
    });
}

function pulseText() {
    const enterText = document.getElementById('enter-text');
    if (!enterText) return;

    let opacity = 1;
    let direction = -0.02;

    setInterval(() => {
        opacity += direction;
        if (opacity <= 0.4 || opacity >= 1) direction *= -1;
        enterText.style.opacity = opacity;
    }, 50);
}

function initializeTitleAnimation() {
    const fullTitle = "Who is Darg?😈";
    const typingSpeed = 100;
    const cursorBlinkSpeed = 500;
    const pauseBetweenCycles = 800;
    let currentTitle = "";
    let index = 0;
    let cursorVisible = true;
    const cursor = "⏐";
    let typingForward = true;

    function typeWriter() {
        if (typingForward) {
            if (index < fullTitle.length) {
                currentTitle += fullTitle.charAt(index);
                document.title = currentTitle + cursor;
                index++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                setTimeout(reverseTypeWriter, pauseBetweenCycles);
            }
        }
    }

    function reverseTypeWriter() {
        if (!typingForward) {
            if (index > 0) {
                currentTitle = currentTitle.slice(0, -1);
                document.title = currentTitle + cursor;
                index--;
                setTimeout(reverseTypeWriter, typingSpeed);
            } else {
                typingForward = true;
                setTimeout(typeWriter, pauseBetweenCycles);
            }
        }
    }

    function blinkCursor() {
        if (cursorVisible) {
            document.title = currentTitle;
            cursorVisible = false;
        } else {
            document.title = currentTitle + cursor;
            cursorVisible = true;
        }
        setTimeout(blinkCursor, cursorBlinkSpeed);
    }

    function startTyping() {
        if (typingForward) {
            typeWriter();
        } else {
            reverseTypeWriter();
        }
    }

    blinkCursor();
    startTyping();
    setInterval(() => {
        typingForward = !typingForward;
        startTyping();
    }, fullTitle.length * typingSpeed * 2 + pauseBetweenCycles * 2);
}