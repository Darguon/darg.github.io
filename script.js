document.addEventListener('DOMContentLoaded', function () {
    const enterScreen = document.getElementById('enter-screen');
    let video = document.getElementById('myVideo');
    const profile = document.getElementById('profile');
    const songInfo = document.getElementById('song-info');
    const pauseButton = document.getElementById('pause-button');
    const particlesContainer = document.createElement('div');
    particlesContainer.style.position = 'absolute';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.zIndex = '1';
    enterScreen.appendChild(particlesContainer);
    particlesContainer.id = 'particles-js';

    // About Section Element
    const aboutSection = document.getElementById('about-section');
    const aboutToggle = document.getElementById('about-toggle');
    const aboutContent = document.getElementById('about-content');

    // Initialize raindrops
    createRaindrops();

    // Enhanced Particles Configuration - Interactive on hover
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": ["#ffffff", "#ff0000", "#ff00ff"]
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "repulse": {
                    "distance": 100,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });

    let clicked = false;
    const audio = document.getElementById('background-music');
    const songTitle = document.querySelector('#song-info h2');
    const songSlider = document.getElementById('song-slider');
    const songSliderDot = document.getElementById('song-slider-dot');
    const currentTimeElement = document.getElementById('current-time');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeIcon = document.getElementById('volume-icon');
    const sliderContainer = document.querySelector('#song-info .slider-container');
    const pauseIcon = document.getElementById('pause-icon');
    const visualizerToggle = document.getElementById('visualizer-toggle');
    const profilePic = document.getElementById('profile-pic');

    // Extended song library
    let songs = [
        { src: 'music.mp3', title: 'Nuteh Jonez - Automatic', duration: '2:32' },
        { src: 'music2.mp3', title: 'Sigue - (Slowed + Reverb)', duration: '4:20' },
    ];
    let currentSongIndex = 0;

    // Enhanced enter screen with pulsing text
    function pulseText() {
        const enterText = document.getElementById('enter-text');
        let opacity = 1;
        let direction = -0.02;

        setInterval(() => {
            opacity += direction;
            if (opacity <= 0.4 || opacity >= 1) direction *= -1;
            enterText.style.opacity = opacity;
        }, 50);
    }

    pulseText();

    // Rain effect
    function createRaindrops() {
        const rainContainer = document.getElementById('rain-effect');
        const numDrops = 100;

        // Clear any existing raindrops
        rainContainer.innerHTML = '';

        for (let i = 0; i < numDrops; i++) {
            const drop = document.createElement('div');
            drop.classList.add('drop');

            // Random positioning and animation
            drop.style.left = `${Math.random() * 100}%`;
            drop.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
            drop.style.animationDelay = `${Math.random() * 2}s`;
            drop.style.opacity = Math.random() * 0.3 + 0.1;

            rainContainer.appendChild(drop);
        }
    }

    // 3D effect for profile
    function setupProfileEffect() {
        const profile = document.getElementById('profile');

        // Mouse move effect for 3D perspective
        profile.addEventListener('mousemove', function(e) {
            const rect = profile.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Calculate rotation based on mouse position
            const rotateX = y / 10 * -1;
            const rotateY = x / 10;

            // Apply 3D transformation
            profile.style.transform = `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        // Reset position when mouse leaves
        profile.addEventListener('mouseleave', function() {
            profile.style.transform = 'translate(-50%, -50%)';
        });
    }

    // Toggle theme
    document.getElementById('theme-toggle').addEventListener('click', function() {
        document.body.classList.toggle('alt-theme');
    });

    // Toggle effects
    let effectsEnabled = true;
    document.getElementById('effects-toggle').addEventListener('click', function() {
        const scanlines = document.querySelector('.scanlines');
        const vignette = document.querySelector('.vignette');
        const rain = document.getElementById('rain-effect');

        effectsEnabled = !effectsEnabled;

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

    // Enhanced enter screen click handler
    enterScreen.addEventListener('click', () => {
        if (!clicked) {
            clicked = true;
            enterScreen.style.opacity = '0';
            setTimeout(() => {
                enterScreen.style.display = 'none';
                particlesContainer.style.display = 'none';
                video.style.display = 'block';
                profile.style.display = 'block';
                songInfo.style.display = 'block';
                pauseButton.style.display = 'block';
                document.getElementById('controls-container').style.display = 'block';
                video.play();
                video.style.filter = 'blur(6px)';
                playCurrentSong();

                // Start floating animation for profile pic
                startProfileAnimation();

                // Initialize 3D effects
                setupProfileEffect();
            }, 1000);
        }
    });

    // Floating animation for profile picture
    function startProfileAnimation() {
        let y = 0;
        let direction = 0.1;

        setInterval(() => {
            y += direction;
            if (y >= 7 || y <= -7) direction *= -1;
            profilePic.style.transform = `translateY(${y}px)`;
        }, 50);
    }

    // Song playback functions with enhanced transitions
    function playCurrentSong() {
        audio.src = songs[currentSongIndex].src;
        songTitle.textContent = `Now Playing: ${songs[currentSongIndex].title}`;

        // Smooth transition for song change
        audio.volume = 0;
        audio.play().catch(error => {
            console.log('Autoplay was prevented');
        });

        // Fade in audio
        let vol = 0;
        const targetVol = parseFloat(volumeSlider.value);
        const fadeIn = setInterval(() => {
            vol += 0.05;
            if (vol >= targetVol) {
                audio.volume = targetVol;
                clearInterval(fadeIn);
            } else {
                audio.volume = vol;
            }
        }, 100);

        // Setup audio visualizer if it's visible
        if (document.getElementById('visualizer-container').style.display === 'block') {
            setupAudioVisualizer();
        }
    }

    function toggleSong() {
        // Fade out current song
        const fadeOut = setInterval(() => {
            if (audio.volume <= 0.05) {
                audio.volume = 0;
                clearInterval(fadeOut);

                // Switch song and play
                currentSongIndex = (currentSongIndex + 1) % songs.length;
                playCurrentSong();
            } else {
                audio.volume -= 0.05;
            }
        }, 100);
    }

    // Add next/previous song buttons functionality
    document.getElementById('prev-song').addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        playCurrentSong();
    });

    document.getElementById('next-song').addEventListener('click', () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        playCurrentSong();
    });

    songTitle.addEventListener("click", toggleSong);

    audio.addEventListener('ended', () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        playCurrentSong();
    });

    audio.addEventListener("timeupdate", function () {
        updateSongProgress();
    });

    function updateSongProgress() {
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        const progress = (currentTime / duration) * 100;
        requestAnimationFrame(() => {
            songSlider.style.width = progress + "%";
            songSliderDot.style.left = progress + "%";
        });

        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        currentTimeElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    let sliderDragging = false;
    let seekPosition = null;
    sliderContainer.addEventListener("mousedown", function (e) {
        sliderDragging = true;
        const sliderRect = sliderContainer.getBoundingClientRect();

        function mousemoveHandler(e) {
            seekPosition = (e.clientX - sliderRect.left) / sliderRect.width;
            requestAnimationFrame(() => {
                songSlider.style.width = (seekPosition * 100) + "%";
                songSliderDot.style.left = (seekPosition * 100) + "%";
            });
        }

        function mouseupHandler() {
            if (seekPosition !== null) {
                audio.currentTime = seekPosition * audio.duration;
                updateSongProgress();
            }
            seekPosition = null;
            sliderDragging = false;
            document.removeEventListener("mousemove", mousemoveHandler);
            document.removeEventListener("mouseup", mouseupHandler);
        }
        document.addEventListener("mousemove", mousemoveHandler);
        document.addEventListener("mouseup", mouseupHandler);
    });

    // Toggle about section
    aboutToggle.addEventListener('click', function() {
        if (aboutContent.style.maxHeight) {
            aboutContent.style.maxHeight = null;
            aboutContent.style.padding = "0";
            aboutToggle.textContent = "Show About";
        } else {
            aboutContent.style.maxHeight = aboutContent.scrollHeight + "px";
            aboutContent.style.padding = "20px";
            aboutToggle.textContent = "Hide About";
        }
    });

    volumeSlider.addEventListener('input', function () {
        audio.volume = volumeSlider.value;
        if (audio.volume === 0) {
            volumeIcon.src = 'volumeoff.svg';
        } else {
            volumeIcon.src = 'volumeon.svg';
        }
    });

    // Enhanced cursor with pulse effect
    const customCursor = document.createElement("div");
    customCursor.classList.add("cursor");
    document.body.appendChild(customCursor);

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener("mousemove", function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
        requestAnimationFrame(()=>{
            customCursor.style.left = mouseX + "px";
            customCursor.style.top = mouseY + "px";
        });
    });

    // Enhanced trail effect with color variation
    const trailInterval = 10;
    let lastTrailTime = 0;
    let hue = 0;

    document.addEventListener("mousemove", function(e) {
        const currentTime = Date.now();
        if (currentTime - lastTrailTime > trailInterval) {
            lastTrailTime = currentTime;
            const trail = document.createElement("div");
            trail.classList.add("trail");
            trail.style.left = e.pageX + "px";
            trail.style.top = e.pageY + "px";

            // Color variation for trails
            hue = (hue + 5) % 360;
            trail.style.boxShadow = `0 0 5px hsl(${hue}, 100%, 70%)`;

            document.body.appendChild(trail);

            setTimeout(() => {
                trail.style.opacity = "0";
                setTimeout(() => {
                    if (document.body.contains(trail)) {
                        document.body.removeChild(trail);
                    }
                }, 1000);
            }, 0);
        }
    });

    // Enhanced pause/play button with transition
    pauseButton.addEventListener("click", function() {
        if (video.paused) {
            video.play();

            // Fade in audio
            let vol = 0;
            const targetVol = parseFloat(volumeSlider.value);
            const fadeIn = setInterval(() => {
                vol += 0.05;
                if (vol >= targetVol) {
                    audio.volume = targetVol;
                    clearInterval(fadeIn);
                } else {
                    audio.volume = vol;
                }
            }, 50);

            audio.play();
            pauseIcon.innerHTML = `<path fill="white" d="M4 4h4v16H4V4zm12 0h4v16h-4V4z"/>`;

            // Resume visualizer if it's active
            if (document.getElementById('visualizer-container').style.display === 'block') {
                setupAudioVisualizer();
            }
        } else {
            video.pause();

            // Fade out audio
            const fadeOut = setInterval(() => {
                if (audio.volume <= 0.05) {
                    audio.volume = 0;
                    audio.pause();
                    clearInterval(fadeOut);
                } else {
                    audio.volume -= 0.05;
                }
            }, 50);

            pauseIcon.innerHTML = `<path fill="white" d="M3 22V2l18 10L3 22z"/>`;

            // Stop visualizer
            stopVisualizer();
        }
    });

    // Dynamic title animation (enhanced)
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

    // Handle window resize for visualizer
    window.addEventListener('resize', function() {
        if (canvas) {
            canvas.width = window.innerWidth;
        }
    });

    // Change background video on interval
    let videoSources = ['rain.mp4', 'clouds.mp4', 'space.mp4'];
    let currentVideoIndex = 0;

    document.getElementById('change-background').addEventListener('click', function() {
        currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;

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
                video = newVideo;
            }, 2000);
        }, 100);
    });
});
