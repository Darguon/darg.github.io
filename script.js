document.addEventListener('DOMContentLoaded', function () {
    const enterScreen = document.getElementById('enter-screen');
    const enterText = document.getElementById('enter-text');
    const video = document.getElementById('myVideo');
    const audio = document.getElementById('background-music');
    const profile = document.getElementById('profile');
    const songInfo = document.getElementById('song-info');
    const songSlider = document.getElementById('song-slider');
    const songSliderDot = document.getElementById('song-slider-dot');
    const currentTimeElement = document.getElementById('current-time');
    const pauseButton = document.getElementById('pause-button');
    const pauseIcon = document.getElementById('pause-icon');
    const songTitle = document.querySelector('#song-info h2');

    let songs = [
        {src: 'music.mp3', title: 'Adele - Skyfall', duration: '3:57'},
        {src: 'music2.mp3', title: 'Next Song Title', duration: '4:20'}
    ];
    let currentSongIndex = 0;

    enterText.addEventListener('click', () => {
        enterScreen.style.opacity = '0';

        // After the transition ends, hide the enter screen and start the video and audio
        setTimeout(() => {
            enterScreen.style.display = 'none';
            video.style.display = 'block';
            profile.style.display = 'block';
            songInfo.style.display = 'block';
            pauseButton.style.display = 'block';
            video.play();
            video.style.filter = 'blur(6px)'; // Reduce blur effect
            playCurrentSong();
        }, 1000); // Match this with the transition duration in CSS
    });

    function playCurrentSong() {
        audio.src = songs[currentSongIndex].src;
        songTitle.textContent = `Now Playing: ${songs[currentSongIndex].title}`;
        audio.play().catch(error => {
            // Handle autoplay restrictions
            console.log('Autoplay was prevented');
        });
    }

    audio.addEventListener('ended', () => {
        currentSongIndex++;
        if (currentSongIndex < songs.length) {
            playCurrentSong();
        }
    });

    audio.addEventListener("timeupdate", function() {
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        const progress = (currentTime / duration) * 100;
        songSlider.style.width = progress + "%";
        songSliderDot.style.left = progress + "%";

        // Update current time display
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        currentTimeElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    });

    const fullTitle = "Who is Darg?😈";
    const typingSpeed = 100; // Speed of typing (milliseconds)
    const cursorBlinkSpeed = 500; // Speed of cursor blinking (milliseconds)
    const pauseBetweenCycles = 800; // Pause between typing and deleting cycles (milliseconds)
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

    const customCursor = document.createElement("div");
    customCursor.classList.add("cursor");
    document.body.appendChild(customCursor);

    document.addEventListener("mousemove", function(e) {
        customCursor.style.left = e.pageX + "px";
        customCursor.style.top = e.pageY + "px";

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
    });

    pauseButton.addEventListener("click", function() {
        if (video.paused) {
            video.play();
            audio.play();
            pauseIcon.innerHTML = '<path d="M361 41c14.8 9.1 24.5 25.1 24.5 42.5V428c0 17.4-9.4 33.4-24.5 41.9-15.1 8.5-33.7 8.2-48.5-.9L23 297c-14.3-8.7-23-24.2-23-41s8.7-32.2 23-41L312.5 39c14.8-9.1 33.4-9.4 48.5-.9z"/>';
        } else {
            video.pause();
            audio.pause();
            pauseIcon.innerHTML = '<path d="M361 41c14.8 9.1 24.5 25.1 24.5 42.5V428c0 17.4-9.4 33.4-24.5 41.9-15.1 8.5-33.7 8.2-48.5-.9L23 297c-14.3-8.7-23-24.2-23-41s8.7-32.2 23-41L312.5 39c14.8-9.1 33.4-9.4 48.5-.9z"/>';
        }
    });
});
