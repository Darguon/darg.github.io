
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
    let originalTitle = document.title;
    let newTitle = "Darg";
    let delay = 1000; // Time delay between title changes in milliseconds

    function animateTitle() {
        setTimeout(function() {
            document.title = newTitle;
            setTimeout(function() {
                document.title = originalTitle;
                animateTitle();
            }, delay);
        }, delay);
    }

    animateTitle();
});
