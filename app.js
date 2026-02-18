/**
 * Main Application Controller
 * Mengatur UI dan koordinasi antara camera manager dan stabilizer
 */

class CameraApp {
    constructor() {
        this.cameraManager = new CameraManager();
        this.stabilizer = new VideoStabilizer();
        this.recordingStartTime = null;
        this.recordingTimer = null;
        
        this.initializeElements();
        this.setupEventListeners();
        this.checkPermissions();
    }
    
    /**
     * Initialize DOM elements
     */
    initializeElements() {
        this.elements = {
            videoPreview: document.getElementById('videoPreview'),
            recordBtn: document.getElementById('recordBtn'),
            switchCameraBtn: document.getElementById('switchCameraBtn'),
            flashBtn: document.getElementById('flashBtn'),
            stabilizationBtn: document.getElementById('stabilizationBtn'),
            stabilizationLabel: document.getElementById('stabilizationLabel'),
            modeSelector: document.getElementById('modeSelector'),
            recordingOverlay: document.getElementById('recordingOverlay'),
            recordingTime: document.getElementById('recordingTime'),
            permissionPrompt: document.getElementById('permissionPrompt'),
            requestPermissionBtn: document.getElementById('requestPermissionBtn'),
            errorMessage: document.getElementById('errorMessage')
        };
    }
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Record button
        this.elements.recordBtn.addEventListener('click', () => this.toggleRecording());
        
        // Switch camera
        this.elements.switchCameraBtn.addEventListener('click', () => this.switchCamera());
        
        // Flash button (placeholder - web tidak support flash control langsung)
        this.elements.flashBtn.addEventListener('click', () => this.toggleFlash());
        
        // Stabilization mode button
        this.elements.stabilizationBtn.addEventListener('click', () => this.toggleModeSelector());
        
        // Mode selector options
        const modeOptions = this.elements.modeSelector.querySelectorAll('.mode-option');
        modeOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const mode = e.target.dataset.mode;
                this.setStabilizationMode(mode);
            });
        });
        
        // Request permission
        this.elements.requestPermissionBtn.addEventListener('click', () => this.requestPermission());
        
        // Close mode selector when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.elements.stabilizationBtn.contains(e.target) && 
                !this.elements.modeSelector.contains(e.target)) {
                this.elements.modeSelector.classList.remove('active');
            }
        });
    }
    
    /**
     * Check camera permissions
     */
    async checkPermissions() {
        try {
            const available = await CameraManager.isAvailable();
            if (!available) {
                this.showError('Kamera tidak tersedia di perangkat ini');
                return;
            }
            
            // Check if permission already granted
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            stream.getTracks().forEach(track => track.stop()); // Stop immediately
            
            // Permission granted, start camera
            this.elements.permissionPrompt.classList.add('hidden');
            await this.startCamera();
        } catch (error) {
            // Permission not granted
            this.elements.permissionPrompt.classList.remove('hidden');
        }
    }
    
    /**
     * Request camera permission
     */
    async requestPermission() {
        try {
            await this.startCamera();
            this.elements.permissionPrompt.classList.add('hidden');
        } catch (error) {
            this.showError('Tidak dapat mengakses kamera. Pastikan izin sudah diberikan.');
        }
    }
    
    /**
     * Start camera
     */
    async startCamera() {
        try {
            await this.cameraManager.startCamera();
            this.stabilizer.stabilize(this.elements.videoPreview);
        } catch (error) {
            console.error('Error starting camera:', error);
            this.showError('Error: ' + error.message);
        }
    }
    
    /**
     * Toggle recording
     */
    async toggleRecording() {
        if (this.cameraManager.isRecording) {
            this.stopRecording();
        } else {
            await this.startRecording();
        }
    }
    
    /**
     * Start recording
     */
    async startRecording() {
        try {
            await this.cameraManager.startRecording(this.stabilizer);
            
            // Update UI
            this.elements.recordBtn.classList.add('recording');
            this.elements.recordingOverlay.classList.add('active');
            this.recordingStartTime = Date.now();
            
            // Start timer
            this.startRecordingTimer();
        } catch (error) {
            console.error('Error starting recording:', error);
            this.showError('Error memulai recording: ' + error.message);
        }
    }
    
    /**
     * Stop recording
     */
    stopRecording() {
        this.cameraManager.stopRecording();
        
        // Update UI
        this.elements.recordBtn.classList.remove('recording');
        this.elements.recordingOverlay.classList.remove('active');
        
        // Stop timer
        this.stopRecordingTimer();
        
        // Reset stabilization
        this.stabilizer.reset(this.elements.videoPreview);
    }
    
    /**
     * Start recording timer
     */
    startRecordingTimer() {
        this.recordingTimer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.recordingStartTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            this.elements.recordingTime.textContent = 
                `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }, 1000);
    }
    
    /**
     * Stop recording timer
     */
    stopRecordingTimer() {
        if (this.recordingTimer) {
            clearInterval(this.recordingTimer);
            this.recordingTimer = null;
        }
        this.elements.recordingTime.textContent = '00:00';
    }
    
    /**
     * Switch camera
     */
    async switchCamera() {
        try {
            this.stabilizer.reset(this.elements.videoPreview);
            await this.cameraManager.switchCamera();
            this.stabilizer.stabilize(this.elements.videoPreview);
        } catch (error) {
            console.error('Error switching camera:', error);
            this.showError('Error mengganti kamera: ' + error.message);
        }
    }
    
    /**
     * Toggle flash (placeholder - web tidak support langsung)
     */
    toggleFlash() {
        this.showError('Kontrol flash tidak tersedia di browser. Gunakan kontrol perangkat.');
    }
    
    /**
     * Toggle mode selector
     */
    toggleModeSelector() {
        this.elements.modeSelector.classList.toggle('active');
    }
    
    /**
     * Set stabilization mode
     */
    setStabilizationMode(mode) {
        this.stabilizer.setMode(mode);
        this.stabilizer.reset(this.elements.videoPreview);
        this.stabilizer.stabilize(this.elements.videoPreview);
        
        // Update UI
        const modeLabels = {
            cinematic: 'Cinematic',
            standard: 'Standard',
            auto: 'Auto',
            off: 'Off'
        };
        this.elements.stabilizationLabel.textContent = modeLabels[mode];
        
        // Update active mode
        const modeOptions = this.elements.modeSelector.querySelectorAll('.mode-option');
        modeOptions.forEach(option => {
            option.classList.remove('active');
            if (option.dataset.mode === mode) {
                option.classList.add('active');
            }
        });
        
        // Close selector
        this.elements.modeSelector.classList.remove('active');
    }
    
    /**
     * Show error message
     */
    showError(message) {
        this.elements.errorMessage.textContent = message;
        this.elements.errorMessage.classList.add('show');
        
        setTimeout(() => {
            this.elements.errorMessage.classList.remove('show');
        }, 3000);
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.app = new CameraApp();
    });
} else {
    window.app = new CameraApp();
}

// Register service worker untuk PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('Service Worker registered:', registration);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
