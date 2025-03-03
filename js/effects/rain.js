// Rain Effect Generator
export function initializeRain() {
    createRaindrops();
}

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