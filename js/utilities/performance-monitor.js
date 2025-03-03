// Performance Monitoring and Optimization
export class PerformanceMonitor {
    constructor(options = {}) {
        // Configuration
        this.options = Object.assign({
            sampleSize: 20,        // Number of frames to average FPS over
            warningThreshold: 30,  // FPS below this will trigger performance warning
            criticalThreshold: 15, // FPS below this will trigger critical performance measures
            checkInterval: 2000,   // Check performance every 2 seconds
            autoAdjust: true       // Whether to automatically adjust effects based on performance
        }, options);

        // State
        this.frames = 0;
        this.lastTime = performance.now();
        this.fpsHistory = [];
        this.averageFps = 60;
        this.isMonitoring = false;
        this.warningIssued = false;
        this.effectsReduced = false;

        // Track performance score (0-100)
        this.performanceScore = 100;

        // Reference to our interval
        this.monitorInterval = null;

        // Effects that can be disabled
        this.effects = {
            parallax: true,
            particles: false,
            rain: true,
            complexCursor: true,
            blur: true
        };

        // Bind methods
        this.frameHandler = this.frameHandler.bind(this);
        this.checkPerformance = this.checkPerformance.bind(this);
    }

    // Start monitoring performance
    start() {
        if (this.isMonitoring) return;

        console.log('Starting performance monitoring...');
        this.isMonitoring = true;

        // Reset state
        this.frames = 0;
        this.lastTime = performance.now();
        this.fpsHistory = [];

        // Start listening for animation frames
        window.requestAnimationFrame(this.frameHandler);

        // Start periodic performance checks
        this.monitorInterval = setInterval(this.checkPerformance, this.options.checkInterval);

        // Initial system detection
        this.detectSystemCapabilities();
    }

    // Stop monitoring
    stop() {
        if (!this.isMonitoring) return;

        console.log('Stopping performance monitoring');
        this.isMonitoring = false;

        // Clear interval
        if (this.monitorInterval) {
            clearInterval(this.monitorInterval);
            this.monitorInterval = null;
        }
    }

    // Handle animation frame for FPS calculation
    frameHandler(timestamp) {
        if (!this.isMonitoring) return;

        // Increment frame counter
        this.frames++;

        // Calculate actual elapsed time
        const elapsed = timestamp - this.lastTime;

        // If we've collected enough data points (1 second)
        if (elapsed >= 1000) {
            // Calculate FPS
            const fps = (this.frames * 1000) / elapsed;

            // Update history
            this.fpsHistory.push(fps);

            // Keep history at desired sample size
            if (this.fpsHistory.length > this.options.sampleSize) {
                this.fpsHistory.shift();
            }

            // Calculate average FPS
            this.averageFps = this.fpsHistory.reduce((total, fps) => total + fps, 0) / this.fpsHistory.length;

            // Reset counters
            this.frames = 0;
            this.lastTime = timestamp;
        }

        // Continue monitoring
        window.requestAnimationFrame(this.frameHandler);
    }

    // Check performance and take action if needed
    checkPerformance() {
        if (!this.options.autoAdjust) return;

        // Calculate performance score (0-100)
        // Map FPS from typical 10-60 range to 0-100 score
        this.performanceScore = Math.min(100, Math.max(0,
            ((this.averageFps - 10) / 50) * 100
        ));

        console.log(`Performance check: ${this.averageFps.toFixed(1)} FPS, Score: ${this.performanceScore.toFixed(0)}`);

        // Handle critical performance issues
        if (this.averageFps < this.options.criticalThreshold && !this.effectsReduced) {
            console.warn(`Critical performance detected: ${this.averageFps.toFixed(1)} FPS. Reducing effects.`);
            this.effectsReduced = true;

            // Disable heavy effects
            this.disableHeavyEffects();

            // Show notification to user
            this.showPerformanceNotification('critical');

        // Handle performance warnings
        } else if (this.averageFps < this.options.warningThreshold && !this.warningIssued) {
            console.warn(`Low performance detected: ${this.averageFps.toFixed(1)} FPS.`);
            this.warningIssued = true;

            // Show notification to user
            this.showPerformanceNotification('warning');

        // Reset warning if performance improves
        } else if (this.averageFps > this.options.warningThreshold + 10) {
            this.warningIssued = false;
        }
    }

    // Detect system capabilities to preset performance options
    detectSystemCapabilities() {
        // Simple heuristic: check if device is mobile or has a small screen
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isSmallScreen = window.innerWidth < 768 || window.innerHeight < 600;

        // Check for low memory (only works in Chrome)
        const isLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;

        // Check for reasonable GPU (not perfect, but helpful)
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        let isLowPowerGPU = true;

        if (gl) {
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            if (debugInfo) {
                const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                // Detect low power GPUs (simplified check)
                isLowPowerGPU = /(Intel|Microsoft|Basic)/i.test(renderer);
            }
        }

        // If we detect a potentially lower-power system, preset some options
        if (isMobile || isSmallScreen || isLowMemory || isLowPowerGPU) {
            console.log('Detected potential performance constraints, optimizing effects');

            // Pre-disable some effects
            this.effects.parallax = !isMobile;
            this.effects.complexCursor = !isMobile;
            this.effects.rain = !(isMobile || isLowMemory);

            // Apply these settings
            this.applyEffectsSettings();
        }
    }

    // Disable heavy effects during performance issues
    disableHeavyEffects() {
        // Reduce effects in order of their performance impact

        // 1. Disable parallax (heavy)
        if (this.effects.parallax) {
            this.effects.parallax = false;
            this.disableParallax();
        }

        // 2. Disable particles
        if (this.effects.particles) {
            this.effects.particles = false;
            this.disableParticles();
        }

        // 3. Disable rain
        if (this.effects.rain) {
            this.effects.rain = false;
            this.disableRain();
        }

        // 4. Simplify cursor
        if (this.effects.complexCursor) {
            this.effects.complexCursor = false;
            this.simplifyCursor();
        }

        // 5. Reduce blur
        if (this.effects.blur) {
            this.effects.blur = false;
            this.reduceBlur();
        }
    }

    // Apply current effects settings
    applyEffectsSettings() {
        if (!this.effects.parallax) this.disableParallax();
        if (!this.effects.particles) this.disableParticles();
        if (!this.effects.rain) this.disableRain();
        if (!this.effects.complexCursor) this.simplifyCursor();
        if (!this.effects.blur) this.reduceBlur();
    }

    // Helpers for disabling specific effects
    disableParallax() {
        const parallaxWrapper = document.getElementById('parallax-wrapper');
        if (parallaxWrapper) parallaxWrapper.style.display = 'none';

        // Also disable profile parallax
        const profile = document.getElementById('profile');
        if (profile) {
            profile.style.transform = 'translate(-50%, -50%)';
            profile.style.transition = 'none';

            // Remove event listeners (simplified approach - could be more careful)
            const newProfile = profile.cloneNode(true);
            profile.parentNode.replaceChild(newProfile, profile);
        }
    }

    disableParticles() {
        const particles = document.getElementById('particles-js');
        if (particles) particles.style.display = 'none';
    }

    disableRain() {
        const rain = document.getElementById('rain-effect');
        if (rain) rain.style.display = 'none';
    }

    simplifyCursor() {
        // Remove custom cursor and trails
        const cursor = document.querySelector('.cursor');
        if (cursor) cursor.remove();

        // Remove all trails
        document.querySelectorAll('.trail').forEach(trail => trail.remove());

        // Reset cursor style
        document.body.style.cursor = 'auto';
    }

    reduceBlur() {
        const video = document.getElementById('myVideo');
        if (video) video.style.filter = 'blur(2px)';
    }

    // Show a notification about performance
    showPerformanceNotification(level) {
        // Create notification element if it doesn't exist
        let notification = document.getElementById('performance-notification');

        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'performance-notification';
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.left = '50%';
            notification.style.transform = 'translateX(-50%)';
            notification.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            notification.style.color = 'white';
            notification.style.padding = '10px 20px';
            notification.style.borderRadius = '5px';
            notification.style.zIndex = '9999';
            notification.style.transition = 'opacity 0.5s ease';
            notification.style.opacity = '0';
            document.body.appendChild(notification);
        }

        // Set message based on level
        if (level === 'critical') {
            notification.textContent = 'Performance issues detected. Some effects have been reduced.';
            notification.style.borderLeft = '4px solid red';
        } else {
            notification.textContent = 'Performance issues detected. Consider disabling some effects.';
            notification.style.borderLeft = '4px solid orange';
        }

        // Show notification
        notification.style.opacity = '1';

        // Hide after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
        }, 5000);
    }

    // Get current FPS
    getFPS() {
        return this.averageFps;
    }

    // Get performance score (0-100)
    getPerformanceScore() {
        return this.performanceScore;
    }
}