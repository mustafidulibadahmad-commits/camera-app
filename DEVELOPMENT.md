# 💻 Development Guide - Camera App PWA

## ✅ Keuntungan PWA vs iOS Native

### Bisa Dikembangkan dari Ubuntu! 🎉
- ✅ Tidak perlu Mac
- ✅ Tidak perlu Xcode
- ✅ Cukup browser dan text editor
- ✅ Test langsung di localhost
- ✅ Deploy mudah ke berbagai platform

### Fitur yang Sama
- ✅ Stabilisasi video super smooth
- ✅ Multiple stabilization modes
- ✅ UI modern seperti iPhone 15
- ✅ Bisa diinstall sebagai app native (PWA)
- ✅ Offline support

## 🛠️ Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Frontend | HTML5 + CSS3 | UI Structure & Styling |
| Logic | JavaScript (ES6+) | Application Logic |
| Camera | MediaDevices API | Camera Access |
| Recording | MediaRecorder API | Video Recording |
| Stabilization | DeviceOrientation API | Gyroscope-based Stabilization |
| PWA | Service Worker + Manifest | Offline & Install Support |

## 📁 File Structure

```
camera-app-pwa/
├── index.html          # Main HTML structure
├── styles.css          # Modern CSS styling (iPhone 15 style)
├── app.js              # Main app controller (orchestrates everything)
├── camera.js           # Camera manager (access, recording, switch)
├── stabilization.js    # Video stabilization logic
├── manifest.json       # PWA manifest (install config)
├── sw.js              # Service Worker (offline support)
├── icon-192.png       # PWA icon 192x192
├── icon-512.png       # PWA icon 512x512
└── README.md          # Documentation
```

## 🔧 Cara Development

### 1. Edit File
Gunakan text editor favorit Anda:
- VS Code
- Vim
- Nano
- dll

### 2. Test di Browser
```bash
# Start server
python3 -m http.server 8000

# Buka di browser
# http://localhost:8000
```

### 3. Debug
- Buka Developer Tools (F12)
- Cek Console untuk error
- Cek Network tab untuk request
- Cek Application tab untuk PWA status

### 4. Test di iPhone
1. Cari IP Ubuntu: `hostname -I`
2. Buka di Safari iPhone: `http://[IP]:8000`
3. Install sebagai PWA

## 🎨 Customization

### Mengubah Warna Theme
Edit `styles.css`:
```css
:root {
    --primary-color: #ffffff;  /* Warna utama */
    --accent-color: #ff3b30;   /* Warna accent (tombol record) */
    --bg-dark: #000000;        /* Background */
}
```

### Mengubah Stabilization Sensitivity
Edit `stabilization.js`:
```javascript
case 'cinematic':
    smoothing = 0.15;  // Lebih kecil = lebih smooth
    sensitivity = 0.8;  // Lebih kecil = kurang sensitive
    break;
```

### Mengubah Video Quality
Edit `camera.js`:
```javascript
video: {
    width: { ideal: 1920 },   // 1080p
    height: { ideal: 1080 },
    frameRate: { ideal: 60 }  // 60fps
}
```

## 🚀 Deployment Options

### 1. Netlify (Recommended)
- ✅ Gratis
- ✅ HTTPS otomatis
- ✅ Deploy via CLI atau drag & drop
- ✅ Custom domain support

### 2. Vercel
- ✅ Gratis
- ✅ HTTPS otomatis
- ✅ Fast CDN
- ✅ GitHub integration

### 3. GitHub Pages
- ✅ Gratis
- ✅ HTTPS otomatis
- ✅ Terintegrasi dengan GitHub
- ⚠️ Hanya untuk public repo

### 4. Firebase Hosting
- ✅ Gratis tier
- ✅ HTTPS otomatis
- ✅ Fast CDN
- ✅ Custom domain

## 📱 Testing di Device

### iPhone/iPad
1. Buka di Safari (wajib, bukan Chrome)
2. Install sebagai PWA
3. Test semua fitur

### Android
1. Buka di Chrome
2. Install sebagai PWA
3. Test semua fitur

### Desktop
1. Buka di Chrome/Edge
2. Install sebagai PWA (tombol install di address bar)
3. Test semua fitur

## 🐛 Common Issues

### 1. Service Worker tidak register
- Pastikan menggunakan HTTPS atau localhost
- Cek console untuk error
- Clear cache dan reload

### 2. Kamera tidak muncul
- Cek permission di browser settings
- Pastikan menggunakan HTTPS atau localhost
- Cek console untuk error MediaDevices

### 3. Stabilisasi tidak bekerja
- Pastikan device memiliki gyroscope
- Cek permission untuk device orientation
- Test di device fisik (bukan emulator)

### 4. Video tidak tersimpan
- Cek permission download
- Pastikan browser support MediaRecorder
- Cek console untuk error

## 📚 Resources

- [MDN - MediaDevices API](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices)
- [MDN - MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)
- [MDN - DeviceOrientation API](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent)
- [MDN - PWA Guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_Web_Apps)

## 🎯 Next Steps

1. ✅ Test di localhost
2. ✅ Test di iPhone (via WiFi)
3. ✅ Deploy ke production (Netlify/Vercel)
4. ✅ Install sebagai PWA di iPhone
5. ✅ Test semua fitur stabilisasi

---

**Happy Coding! 🚀**
