// Controls Component JavaScript
export function initializeControls() {
    console.log('Initializing controls...');

    // Get control elements
    const changeBackgroundBtn = document.getElementById('change-background');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const effectsToggleBtn = document.getElementById('effects-toggle');
    const pauseButton = document.getElementById('pause-button');

    // Log if any elements are missing
    if (!changeBackgroundBtn) console.error('Change background button not found');
    if (!themeToggleBtn) console.error('Theme toggle button not found');
    if (!effectsToggleBtn) console.error('Effects toggle button not found');
    if (!pauseButton) console.error('Pause button not found');

    // Initialize background changer
    if (changeBackgroundBtn) {
        initializeBackgroundChanger(changeBackgroundBtn);
    }

    // Initialize theme toggle
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            document.body.classList.toggle('alt-theme');
            console.log('Theme toggled');
        });
    }

    // Initialize effects toggle
    if (effectsToggleBtn) {
        initializeEffectsToggle(effectsToggleBtn);
    }

    // Initialize pause/play button for background video
    if (pauseButton) {
        pauseButton.addEventListener("click", function() {
            const video = document.getElementById('myVideo');
            const pauseIcon = document.getElementById('pause-icon');

            if (video && pauseIcon) {
                if (video.paused) {
                    video.play();
                    pauseIcon.innerHTML = `<path fill="white" d="M4 4h4v16H4V4zm12 0h4v16h-4V4z"/>`;
                    console.log('Video playing');
                } else {
                    video.pause();
                    pauseIcon.innerHTML = `<path fill="white" d="M3 22V2l18 10L3 22z"/>`;
                    console.log('Video paused');
                }
            } else {
                console.error('Video or pause icon element not found');
            }
        });
    }
}

function initializeBackgroundChanger(changeBackgroundBtn) {
    let videoSources = ['assets/videos/rain.mp4', 'assets/videos/clouds.mp4', 'assets/videos/space.mp4'];
    let currentVideoIndex = 0;

    changeBackgroundBtn.addEventListener('click', function() {
        console.log('Changing background video...');
        let video = document.getElementById('myVideo');
        if (!video) {
            console.error('Video element not found');
            return;
        }

        currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
        console.log(`New video: ${videoSources[currentVideoIndex]}`);

        // Create a new video element
        const newVideo = document.createElement('video');
        newVideo.autoplay = true;
        newVideo.loop = true;
        newVideo.muted = true;
        newVideo.style.position = 'absolute';
        newVideo.style.top = '0';
        newVideo.style.left = '0';
        newVideo.style.width = '100%';
        newVideo.style.height = '100%';
        newVideo.style.objectFit = 'cover';
        newVideo.style.filter = 'blur(6px)';
        newVideo.style.opacity = '0';
        newVideo.style.transition = 'opacity 2s ease-in-out';
        newVideo.style.zIndex = '4';
        newVideo.id = 'myVideo';

        const source = document.createElement('source');
        source.src = videoSources[currentVideoIndex];
        source.type = 'video/mp4';

        newVideo.appendChild(source);
        document.body.appendChild(newVideo);

        // Fade in new video
        setTimeout(() => {
            newVideo.style.opacity = '1';
        }, 100);

        // Fade out and remove old video
        setTimeout(() => {
            video.style.opacity = '0';
            setTimeout(() => {
                video.remove();
                console.log('Old video removed');
            }, 2000);
        }, 100);
    });
}

function initializeEffectsToggle(effectsToggleBtn) {
    let effectsEnabled = true;

    effectsToggleBtn.addEventListener('click', function() {
        const scanlines = document.querySelector('.scanlines');
        const vignette = document.querySelector('.vignette');
        const rain = document.getElementById('rain-effect');

        if (!scanlines || !vignette || !rain) {
            console.error('Some effect elements are missing');
            return;
        }

        effectsEnabled = !effectsEnabled;
        console.log(`Effects ${effectsEnabled ? 'enabled' : 'disabled'}`);

        if (effectsEnabled) {
            scanlines.style.display = 'block';
            vignette.style.display = 'block';
            rain.style.display = 'block';
            this.textContent = 'Toggle Effects';
        } else {
            scanlines.style.display = 'none';
            vignette.style.display = 'none';
            rain.style.display = 'none';
            this.textContent = 'Enable Effects';
        }
    });
}