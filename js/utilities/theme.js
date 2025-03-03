// Theme Switching Functionality
export function initializeTheme() {
    // Theme functionality is already handled in controls.js
    // This module can be extended for additional theme settings

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'alt') {
        document.body.classList.add('alt-theme');
    }

    // Listen for theme changes to save preference
    document.addEventListener('themeChanged', function(e) {
        const isAltTheme = document.body.classList.contains('alt-theme');
        localStorage.setItem('theme', isAltTheme ? 'alt' : 'default');
    });

    // Create a mutation observer to detect theme changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                document.dispatchEvent(new CustomEvent('themeChanged'));
            }
        });
    });

    // Start observing the body for class changes
    observer.observe(document.body, { attributes: true });
}