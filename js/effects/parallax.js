// Parallax and 3D Effects
export function initializeParallax() {
    console.log('Initializing parallax effects...');

    // Set up the profile container for parallax
    enhanceProfileWith3D();

    // Create global parallax effect
    createGlobalParallax();

    // Track mouse for parallax
    trackMouseForParallax();
}

// Enhance profile with 3D effects
function enhanceProfileWith3D() {
    const profile = document.getElementById('profile');
    if (!profile) {
        console.error('Profile element not found');
        return;
    }

    // Add enhanced 3D classes
    profile.classList.add('profile-3d-enhanced', 'parallax-container');

    // Get profile elements
    const flipContainer = profile.querySelector('.flip-container');
    const profileName = profile.querySelector('#profile-name');
    const socialIcons = profile.querySelector('.social-icons');

    if (flipContainer) {
        flipContainer.classList.add('flip-container-enhanced');
        const flipper = flipContainer.querySelector('.flipper');
        if (flipper) {
            flipper.classList.add('flipper-enhanced', 'profile-element');
        }
    }

    if (profileName) {
        profileName.classList.add('profile-element');
    }

    if (socialIcons) {
        socialIcons.classList.add('profile-element');

        // Enhance social icons with floating parallax
        const icons = socialIcons.querySelectorAll('.icon');
        icons.forEach(icon => {
            icon.classList.add('floating-parallax');
        });
    }

    // Create layers for depth
    createProfileLayers(profile);
}

// Create layers for profile depth effect
function createProfileLayers(profile) {
    // Create profile background layers for depth effect
    const layerDeep = document.createElement('div');
    layerDeep.className = 'parallax-layer layer-deep';
    layerDeep.style.boxShadow = '0 0 30px rgba(255, 0, 0, 0.3)';
    layerDeep.style.borderRadius = '20px';
    layerDeep.style.backgroundColor = 'rgba(20, 0, 0, 0.3)';

    const layerMid = document.createElement('div');
    layerMid.className = 'parallax-layer layer-mid';
    layerMid.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.6)';
    layerMid.style.borderRadius = '20px';
    layerMid.style.backgroundColor = 'rgba(40, 0, 0, 0.4)';

    // Insert layers to the profile as first children
    profile.insertBefore(layerMid, profile.firstChild);
    profile.insertBefore(layerDeep, profile.firstChild);

    // Enhanced depth effect on mousemove
    profile.addEventListener('mousemove', handleProfileParallax);
}

// Handle parallax movement for profile
function handleProfileParallax(e) {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();

    // Calculate mouse position relative to the element center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate distance from center (0 to 1)
    const distanceX = (mouseX - centerX) / centerX;
    const distanceY = (mouseY - centerY) / centerY;

    // Apply rotation based on mouse position
    const rotateY = distanceX * 15; // Max 15 degrees rotation
    const rotateX = -distanceY * 15; // Negative because up = negative Y

    // Apply transform to profile
    container.style.transform = `
        translate(-50%, -50%)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
    `;

    // Apply parallax to layers
    const layers = container.querySelectorAll('.parallax-layer');
    layers.forEach(layer => {
        if (layer.classList.contains('layer-deep')) {
            layer.style.transform = `
                translateZ(-100px)
                scale(1.1)
                translateX(${distanceX * -30}px)
                translateY(${distanceY * -30}px)
            `;
        } else if (layer.classList.contains('layer-mid')) {
            layer.style.transform = `
                translateZ(-50px)
                scale(1.05)
                translateX(${distanceX * -15}px)
                translateY(${distanceY * -15}px)
            `;
        }
    });

    // Apply parallax to profile elements
    const elements = container.querySelectorAll('.profile-element');
    elements.forEach(element => {
        element.style.transform = `
            translateX(${distanceX * 10}px)
            translateY(${distanceY * 10}px)
            translateZ(10px)
        `;
    });
}

// Create a global parallax effect container
function createGlobalParallax() {
    // Create wrapper and scene for global parallax
    const wrapper = document.createElement('div');
    wrapper.id = 'parallax-wrapper';

    const scene = document.createElement('div');
    scene.id = 'parallax-scene';

    // Create floating elements for parallax background
    for (let i = 0; i < 10; i++) {
        const element = document.createElement('div');
        element.className = 'parallax-floating-element';

        // Random styling
        element.style.position = 'absolute';
        element.style.width = `${Math.random() * 100 + 50}px`;
        element.style.height = `${Math.random() * 100 + 50}px`;
        element.style.top = `${Math.random() * 100}%`;
        element.style.left = `${Math.random() * 100}%`;
        element.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.3)';
        element.style.borderRadius = '50%';
        element.style.opacity = '0.1';
        element.style.transform = `translateZ(${-Math.random() * 500}px)`;

        scene.appendChild(element);
    }

    wrapper.appendChild(scene);
    document.body.appendChild(wrapper);
}

// Track mouse position for global parallax
function trackMouseForParallax() {
    document.addEventListener('mousemove', function(e) {
        const scene = document.getElementById('parallax-scene');
        if (!scene) return;

        // Calculate mouse position as a percentage of screen width/height
        const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
        const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1

        // Move the scene slightly based on mouse position
        scene.style.transform = `
            translateX(${x * -30}px)
            translateY(${y * -30}px)
            rotateX(${y * 5}deg)
            rotateY(${-x * 5}deg)
        `;

        // Move individual floating elements
        const elements = scene.querySelectorAll('.parallax-floating-element');
        elements.forEach(element => {
            // Extract the current Z translation
            const zDistance = element.style.transform.match(/translateZ\((.*?)px\)/)?.[1] || -300;

            // Calculate parallax factor based on Z distance
            const factor = Math.abs(parseInt(zDistance)) / 500; // 0 to 1

            // Apply movement based on distance (further elements move more)
            element.style.transform = `
                translateZ(${zDistance}px)
                translateX(${x * factor * 100}px)
                translateY(${y * factor * 100}px)
            `;
        });
    });
}