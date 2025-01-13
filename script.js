document.addEventListener('DOMContentLoaded', function () {
    const enterScreen = document.getElementById('enter-screen');
    const video = document.getElementById('myVideo');
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
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
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
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": false
                    },
                    "onclick": {
                        "enable": false
                    },
                    "resize": true
                },
                "modes": {}
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

    let songs = [
        { src: 'Music/music.mp3', title: 'SEREBRO - Сладко', duration: '3:57' },
        { src: 'Music/music2.mp3', title: 'MORAD & GIMS - SEYA', duration: '4:20' }
    ];
    let currentSongIndex = 0;

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
                video.play();
                  video.style.filter = 'blur(6px)';
                playCurrentSong();
            }, 1000);
        }
    });


    function playCurrentSong() {
        audio.src = songs[currentSongIndex].src;
        songTitle.textContent = `Now Playing: ${songs[currentSongIndex].title}`;
        audio.play().catch(error => {
            console.log('Autoplay was prevented');
        });
    }

    function toggleSong() {
        currentSongIndex = (currentSongIndex === 0) ? 1 : 0;
        playCurrentSong();
    }

    songTitle.addEventListener("click", toggleSong);

    audio.addEventListener('ended', () => {
        currentSongIndex++;
        if (currentSongIndex < songs.length) {
            playCurrentSong();
        } else {
            currentSongIndex = 0;
            playCurrentSong();
        }
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


    volumeSlider.addEventListener('input', function () {
        audio.volume = volumeSlider.value;
        if (audio.volume === 0) {
            volumeIcon.src = 'volumeoff.svg';
        } else {
            volumeIcon.src = 'volumeon.svg';
        }
    });

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


    const trailInterval = 10;
    let lastTrailTime = 0;

    document.addEventListener("mousemove", function(e) {
        const currentTime = Date.now();
        if (currentTime - lastTrailTime > trailInterval) {
            lastTrailTime = currentTime;
            const trail = document.createElement("div");
            trail.classList.add("trail");
            trail.style.left = e.pageX + "px";
            trail.style.top = e.pageY + "px";
            document.body.appendChild(trail);

            setTimeout(() => {
                trail.style.opacity = "0";
                setTimeout(() => {
                    document.body.removeChild(trail);
                }, 1000);
            }, 0);
        }
    });

     pauseButton.addEventListener("click", function() {
        if (video.paused) {
            video.play();
            audio.play();
            pauseIcon.innerHTML = `<path fill="white" d="M4 4h4v16H4V4zm12 0h4v16h-4V4z"/>`;
        } else {
            video.pause();
            audio.pause();
             pauseIcon.innerHTML = `<path fill="white" d="M3 22V2l18 10L3 22z"/>`;
        }
    });

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
});
