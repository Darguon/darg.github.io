// Profile Component JavaScript
export function initializeProfile() {
    // Setup profile 3D effect on mousemove
    setupProfileEffect();

    // Listen for profile animation start
    document.addEventListener('startProfileAnimation', startProfileAnimation);
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

// Floating animation for profile picture
function startProfileAnimation() {
    const profilePic = document.getElementById('profile-pic');
    let y = 0;
    let direction = 0.1;

    setInterval(() => {
        y += direction;
        if (y >= 7 || y <= -7) direction *= -1;
        profilePic.style.transform = `translateY(${y}px)`;
    }, 50);
}