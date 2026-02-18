/**
 * Camera Manager
 * Mengelola akses kamera, recording, dan video capture
 */

class CameraManager {
    constructor() {
        this.stream = null;
        this.mediaRecorder = null;
        this.recordedChunks = [];
        this.isRecording = false;
        this.currentDeviceId = null;
        this.videoDevices = [];
        this.currentFacingMode = 'environment'; // 'user' untuk front, 'environment' untuk back
        
        this.videoElement = document.getElementById('videoPreview');
    }
    
    /**
     * Request camera permission dan start camera
     */
    async startCamera() {
        try {
            // Request permission
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: this.currentFacingMode,
                    width: { ideal: 1920 },
                    height: { ideal: 1080 },
                    frameRate: { ideal: 60 }
                },
                audio: true
            });
            
            this.stream = stream;
            this.videoElement.srcObject = stream;
            this.currentDeviceId = stream.getVideoTracks()[0].getSettings().deviceId;
            
            // Load available devices
            await this.loadVideoDevices();
            
            return true;
        } catch (error) {
            console.error('Error accessing camera:', error);
            throw error;
        }
    }
    
    /**
     * Load available video devices
     */
    async loadVideoDevices() {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            this.videoDevices = devices.filter(device => device.kind === 'videoinput');
        } catch (error) {
            console.error('Error loading video devices:', error);
        }
    }
    
    /**
     * Switch between front and back camera
     */
    async switchCamera() {
        try {
            // Stop current stream
            if (this.stream) {
                this.stream.getTracks().forEach(track => track.stop());
            }
            
            // Switch facing mode
            this.currentFacingMode = this.currentFacingMode === 'environment' ? 'user' : 'environment';
            
            // Start new stream
            await this.startCamera();
            
            return true;
        } catch (error) {
            console.error('Error switching camera:', error);
            throw error;
        }
    }
    
    /**
     * Start recording video
     */
    async startRecording(stabilizer) {
        if (this.isRecording) {
            return;
        }
        
        try {
            // Get video stream
            const videoTrack = this.stream.getVideoTracks()[0];
            const audioTrack = this.stream.getAudioTracks()[0];
            
            // Create MediaStream untuk recording
            const recordingStream = new MediaStream([videoTrack, audioTrack]);
            
            // Setup MediaRecorder dengan options untuk kualitas tinggi
            const options = {
                mimeType: 'video/webm;codecs=vp9,opus',
                videoBitsPerSecond: 8000000, // 8 Mbps untuk kualitas tinggi
            };
            
            // Fallback ke codec yang lebih kompatibel
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                options.mimeType = 'video/webm;codecs=vp8,opus';
            }
            
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                options.mimeType = 'video/webm';
            }
            
            this.mediaRecorder = new MediaRecorder(recordingStream, options);
            this.recordedChunks = [];
            
            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data && event.data.size > 0) {
                    this.recordedChunks.push(event.data);
                }
            };
            
            this.mediaRecorder.onstop = () => {
                this.handleRecordingStop();
            };
            
            // Start recording
            this.mediaRecorder.start(100); // Collect data every 100ms
            this.isRecording = true;
            
            // Start stabilization jika mode bukan 'off'
            if (stabilizer && stabilizer.mode !== 'off') {
                stabilizer.stabilize(this.videoElement);
            }
            
            return true;
        } catch (error) {
            console.error('Error starting recording:', error);
            throw error;
        }
    }
    
    /**
     * Stop recording
     */
    stopRecording() {
        if (!this.isRecording || !this.mediaRecorder) {
            return;
        }
        
        this.mediaRecorder.stop();
        this.isRecording = false;
    }
    
    /**
     * Handle recording stop
     */
    handleRecordingStop() {
        const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
        this.downloadVideo(blob);
    }
    
    /**
     * Download recorded video
     */
    downloadVideo(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `video-${Date.now()}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    /**
     * Stop camera
     */
    stopCamera() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        
        if (this.videoElement) {
            this.videoElement.srcObject = null;
        }
    }
    
    /**
     * Check if camera is available
     */
    static async isAvailable() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }
}

// Export untuk digunakan di file lain
window.CameraManager = CameraManager;
