
document.addEventListener('DOMContentLoaded', function () {
    const enterScreen = document.getElementById('enter-screen');
    const enterText = document.getElementById('enter-text');
    const video = document.getElementById('myVideo');
    const audio = document.getElementById('background-music');
    const profile = document.getElementById('profile');

    enterText.addEventListener('click', () => {
        enterScreen.style.opacity = '0';

        // After the transition ends, hide the enter screen and start the video and audio
        setTimeout(() => {
            enterScreen.style.display = 'none';
            video.style.display = 'block';
            profile.style.display = 'block';
            video.play();
            video.style.filter = 'blur(6px)'; // Remove blur effect
            audio.play().catch(error => {
                // Handle autoplay restrictions
                console.log('Autoplay was prevented');
            });
        }, 1000); // Match this with the transition duration in CSS
    });
});
document.addEventListener("DOMContentLoaded", function() {
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
});

document.addEventListener("DOMContentLoaded", function() {
    const fullTitle = "Who is Darg?😈";
    const typingSpeed = 150; // Speed of typing (milliseconds)
    const cursorBlinkSpeed = 500; // Speed of cursor blinking (milliseconds)
    const pauseBetweenCycles = 1000; // Pause between typing and deleting cycles (milliseconds)
    let currentTitle = "";
    let index = 0;
    let cursorVisible = true;
    const cursorChar = "⏐";
    let typingForward = true;

    // Create custom cursor element
    const customCursor = document.createElement("div");
    customCursor.classList.add("cursor");
    document.body.appendChild(customCursor);

    // Handle cursor trail effect
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

    function typeWriter() {
        if (typingForward) {
            if (index < fullTitle.length) {
                currentTitle += fullTitle.charAt(index);
                document.title = currentTitle + cursorChar;
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
                document.title = currentTitle + cursorChar;
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
            document.title = currentTitle + cursorChar;
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

