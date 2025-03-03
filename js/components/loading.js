// Loading Screen Component
export function initializeLoading() {
    console.log('Initializing loading screen...');

    // Create the loading screen element
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';

    // Create loading animation
    const loader = document.createElement('div');
    loader.className = 'loader';

    // Add spinner circles
    for (let i = 0; i < 3; i++) {
        const circle = document.createElement('div');
        circle.className = 'loader-circle';
        loader.appendChild(circle);
    }

    // Add loading text
    const loadingText = document.createElement('div');
    loadingText.className = 'loading-text';
    loadingText.textContent = 'INITIALIZING';

    // Add progress bar
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressContainer.appendChild(progressBar);

    // Assemble the loading screen
    loadingScreen.appendChild(loader);
    loadingScreen.appendChild(loadingText);
    loadingScreen.appendChild(progressContainer);

    // Add to document
    document.body.insertBefore(loadingScreen, document.body.firstChild);

    // Start loading sequence
    simulateLoading(progressBar, loadingText, loadingScreen);
}

// Simulate loading progress
function simulateLoading(progressBar, loadingText, loadingScreen) {
    const assets = [
        'Background Video',
        'Particle Effects',
        'Spotify Integration',
        'Animation System',
        'User Interface',
        'Visual Effects'
    ];

    let progress = 0;
    const totalSteps = assets.length;
    const stepSize = 100 / totalSteps;

    // Simulate loading steps
    function loadNext(index) {
        if (index >= totalSteps) {
            // Loading complete
            progressBar.style.width = '100%';
            loadingText.textContent = 'READY';

            // Fade out loading screen
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    // Reveal enter screen
                    const enterScreen = document.getElementById('enter-screen');
                    if (enterScreen) {
                        enterScreen.style.display = 'flex';
                        console.log('Loading complete, enter screen revealed');
                    }
                }, 1000);
            }, 500);
            return;
        }

        // Update progress for current step
        progress += stepSize;
        progressBar.style.width = `${progress}%`;
        loadingText.textContent = `LOADING ${assets[index]}`;

        // Simulate varying load times
        const delay = Math.random() * 500 + 300;
        setTimeout(() => loadNext(index + 1), delay);
    }

    // Start the loading sequence
    loadNext(0);
}