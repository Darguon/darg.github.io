// Background Manager with lazy loading and smooth transitions
export class BackgroundManager {
    constructor() {
        this.videoSources = [
            'assets/videos/rain.mp4',
            'assets/videos/clouds.mp4',
            'assets/videos/space.mp4'
        ];
        this.currentIndex = 0;
        this.isTransitioning = false;
        this.preloadedVideos = {};
        this.currentVideo = null;

        // Initialize preloaded index
        this.preloadedIndex = 1; // We'll start by preloading the second video
    }

    // Initialize the background video
    initialize() {
        console.log('Initializing background manager...');

        // Get or create the main video element
        this.currentVideo = document.getElementById('myVideo');

        if (!this.currentVideo) {
            console.error('Video element not found');
            return;
        }

        // Start preloading the next video
        this.preloadNextVideo();

        // Add event listener to change background button
        const changeBackgroundBtn = document.getElementById('change-background');
        if (changeBackgroundBtn) {
            changeBackgroundBtn.addEventListener('click', () => this.changeBackground());
        }
    }

    // Preload the next video in sequence
    preloadNextVideo() {
        const nextIndex = (this.currentIndex + 1) % this.videoSources.length;
        const videoSrc = this.videoSources[nextIndex];

        if (!this.preloadedVideos[videoSrc]) {
            console.log(`Preloading next video: ${videoSrc}`);

            // Create a video element for preloading
            const videoElement = document.createElement('video');
            videoElement.muted = true;
            videoElement.loop = true;
            videoElement.style.display = 'none';

            const source = document.createElement('source');
            source.src = videoSrc;
            source.type = 'video/mp4';

            videoElement.appendChild(source);
            document.body.appendChild(videoElement);

            // Start preloading
            videoElement.load();

            // Store the preloaded video
            this.preloadedVideos[videoSrc] = videoElement;

            // Update preloaded index
            this.preloadedIndex = nextIndex;
        }
    }

    // Change the background with smooth transition
    changeBackground() {
        if (this.isTransitioning) {
            console.log('Transition already in progress, ignoring request');
            return;
        }

        this.isTransitioning = true;
        console.log('Changing background with smooth transition...');

        // Get next video index
        const nextIndex = (this.currentIndex + 1) % this.videoSources.length;
        const nextVideoSrc = this.videoSources[nextIndex];

        // Create the new video element (either use preloaded or create new)
        let newVideo;
        if (this.preloadedVideos[nextVideoSrc]) {
            newVideo = this.preloadedVideos[nextVideoSrc];
            delete this.preloadedVideos[nextVideoSrc];
        } else {
            // If not preloaded, create new video element
            newVideo = document.createElement('video');
            newVideo.muted = true;
            newVideo.loop = true;

            const source = document.createElement('source');
            source.src = nextVideoSrc;
            source.type = 'video/mp4';

            newVideo.appendChild(source);
            document.body.appendChild(newVideo);
        }

        // Set up the new video for display
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
        newVideo.style.display = 'block';

        // Play the new video
        newVideo.play().then(() => {
            // Fade in new video
            setTimeout(() => {
                newVideo.style.opacity = '1';

                // Fade out old video
                this.currentVideo.style.opacity = '0';
                setTimeout(() => {
                    // Remove old video
                    this.currentVideo.remove();

                    // Update current video
                    this.currentVideo = newVideo;
                    this.currentIndex = nextIndex;

                    // Preload the next video in sequence
                    this.preloadNextVideo();

                    // Transition complete
                    this.isTransitioning = false;
                    console.log('Background transition complete');
                }, 2000);
            }, 100);
        }).catch(error => {
            console.error('Error playing video:', error);
            this.isTransitioning = false;
        });
    }

    // Add a new video source
    addVideoSource(src) {
        if (!this.videoSources.includes(src)) {
            this.videoSources.push(src);
            console.log(`Added new video source: ${src}`);
        }
    }

    // Apply visual effects to the current background
    applyEffect(effect) {
        if (!this.currentVideo) return;

        switch(effect) {
            case 'blur':
                const currentBlur = parseInt(this.currentVideo.style.filter.match(/blur\((\d+)px\)/)?.[1] || '6');
                const newBlur = (currentBlur + 2) % 12; // Cycle through 0-10px blur
                this.currentVideo.style.filter = `blur(${newBlur}px)`;
                break;

            case 'invert':
                if (this.currentVideo.style.filter.includes('invert(1)')) {
                    this.currentVideo.style.filter = 'blur(6px)';
                } else {
                    this.currentVideo.style.filter = 'blur(6px) invert(1)';
                }
                break;

            case 'grayscale':
                if (this.currentVideo.style.filter.includes('grayscale(1)')) {
                    this.currentVideo.style.filter = 'blur(6px)';
                } else {
                    this.currentVideo.style.filter = 'blur(6px) grayscale(1)';
                }
                break;

            default:
                this.currentVideo.style.filter = 'blur(6px)';
        }
    }
}