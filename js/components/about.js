// About Section Component JavaScript
export function initializeAbout() {
    // Get about section elements
    const aboutToggle = document.getElementById('about-toggle');
    const aboutContent = document.getElementById('about-content');

    // Toggle about section
    aboutToggle.addEventListener('click', function() {
        if (aboutContent.style.maxHeight) {
            aboutContent.style.maxHeight = null;
            aboutContent.style.padding = "0";
            aboutToggle.textContent = "Show About";
        } else {
            aboutContent.style.maxHeight = aboutContent.scrollHeight + "px";
            aboutContent.style.padding = "20px";
            aboutToggle.textContent = "Hide About";
        }
    });
}