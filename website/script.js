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
