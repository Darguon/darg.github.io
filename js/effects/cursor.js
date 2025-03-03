// Custom Cursor and Trail Effects
export function initializeCursor() {
    // Create custom cursor
    const customCursor = document.createElement("div");
    customCursor.classList.add("cursor");
    document.body.appendChild(customCursor);

    let mouseX = 0;
    let mouseY = 0;

    // Update cursor position
    document.addEventListener("mousemove", function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
        requestAnimationFrame(()=>{
            customCursor.style.left = mouseX + "px";
            customCursor.style.top = mouseY + "px";
        });
    });

    // Create trail effect
    createTrailEffect();
}

function createTrailEffect() {
    // Enhanced trail effect with color variation
    const trailInterval = 10;
    let lastTrailTime = 0;
    let hue = 0;

    document.addEventListener("mousemove", function(e) {
        const currentTime = Date.now();
        if (currentTime - lastTrailTime > trailInterval) {
            lastTrailTime = currentTime;
            const trail = document.createElement("div");
            trail.classList.add("trail");
            trail.style.left = e.pageX + "px";
            trail.style.top = e.pageY + "px";

            // Color variation for trails
            hue = (hue + 5) % 360;
            trail.style.boxShadow = `0 0 5px hsl(${hue}, 100%, 70%)`;

            document.body.appendChild(trail);

            setTimeout(() => {
                trail.style.opacity = "0";
                setTimeout(() => {
                    if (document.body.contains(trail)) {
                        document.body.removeChild(trail);
                    }
                }, 1000);
            }, 0);
        }
    });
}