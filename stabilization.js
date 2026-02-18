/**
 * Video Stabilization Module
 * Menggunakan teknik software stabilization dengan gyroscope dan video processing
 */

class VideoStabilizer {
    constructor() {
        this.mode = 'cinematic'; // cinematic, standard, auto, off
        this.gyroscope = null;
        this.orientation = { alpha: 0, beta: 0, gamma: 0 };
        this.isStabilizing = false;
        this.stabilizationBuffer = [];
        this.maxBufferSize = 10;
        
        this.initGyroscope();
    }
    
    /**
     * Initialize device orientation (gyroscope) untuk stabilisasi
     */
    initGyroscope() {
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', (event) => {
                this.orientation = {
                    alpha: event.alpha || 0,  // Z-axis rotation
                    beta: event.beta || 0,    // X-axis rotation
                    gamma: event.gamma || 0   // Y-axis rotation
                };
            });
        }
    }
    
    /**
     * Set stabilization mode
     */
    setMode(mode) {
        this.mode = mode;
    }
    
    /**
     * Apply stabilization to video element
     */
    stabilize(videoElement) {
        if (this.mode === 'off' || !videoElement) {
            return;
        }
        
        if (!this.isStabilizing) {
            this.isStabilizing = true;
            this.startStabilization(videoElement);
        }
    }
    
    /**
     * Start stabilization process
     */
    startStabilization(videoElement) {
        const stabilizeFrame = () => {
            if (!this.isStabilizing || this.mode === 'off') {
                return;
            }
            
            // Calculate stabilization offset berdasarkan gyroscope
            const offset = this.calculateOffset();
            
            // Apply transform ke video element
            this.applyTransform(videoElement, offset);
            
            requestAnimationFrame(stabilizeFrame);
        };
        
        stabilizeFrame();
    }
    
    /**
     * Calculate stabilization offset berdasarkan mode
     */
    calculateOffset() {
        let smoothing = 1.0;
        let sensitivity = 1.0;
        
        switch (this.mode) {
            case 'cinematic':
                smoothing = 0.15;  // Smoothing tinggi untuk cinematic
                sensitivity = 0.8;  // Sensitivity sedang
                break;
            case 'standard':
                smoothing = 0.25;
                sensitivity = 1.0;
                break;
            case 'auto':
                smoothing = 0.20;
                sensitivity = 0.9;
                break;
            default:
                return { x: 0, y: 0, rotation: 0 };
        }
        
        // Calculate offset dari gyroscope data
        const gamma = this.orientation.gamma || 0;  // Left/Right tilt
        const beta = this.orientation.beta || 0;    // Front/Back tilt
        
        // Convert to pixel offset (disesuaikan dengan sensitivity)
        const xOffset = (gamma * sensitivity * smoothing).toFixed(2);
        const yOffset = (beta * sensitivity * smoothing).toFixed(2);
        
        // Smooth the values
        this.stabilizationBuffer.push({ x: xOffset, y: yOffset });
        if (this.stabilizationBuffer.length > this.maxBufferSize) {
            this.stabilizationBuffer.shift();
        }
        
        // Average untuk smoothing
        const avgX = this.stabilizationBuffer.reduce((sum, val) => sum + parseFloat(val.x), 0) / this.stabilizationBuffer.length;
        const avgY = this.stabilizationBuffer.reduce((sum, val) => sum + parseFloat(val.y), 0) / this.stabilizationBuffer.length;
        
        return {
            x: -avgX,  // Negate untuk counter movement
            y: -avgY,
            rotation: 0
        };
    }
    
    /**
     * Apply transform to video element
     */
    applyTransform(videoElement, offset) {
        if (!videoElement || this.mode === 'off') {
            videoElement.style.transform = 'translate(-50%, -50%)';
            return;
        }
        
        // Apply CSS transform untuk stabilisasi
        const transform = `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))`;
        videoElement.style.transform = transform;
        videoElement.style.transition = 'transform 0.1s ease-out';
    }
    
    /**
     * Stop stabilization
     */
    stop() {
        this.isStabilizing = false;
        this.stabilizationBuffer = [];
    }
    
    /**
     * Reset video transform
     */
    reset(videoElement) {
        if (videoElement) {
            videoElement.style.transform = 'translate(-50%, -50%)';
            videoElement.style.transition = 'transform 0.3s ease-out';
        }
        this.stop();
    }
}

// Export untuk digunakan di file lain
window.VideoStabilizer = VideoStabilizer;
