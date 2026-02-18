# 📱 Camera App PWA - Super Smooth Stabilization

Aplikasi kamera Progressive Web App (PWA) dengan fitur stabilisasi super smooth yang bisa dikembangkan langsung dari Ubuntu!

## ✨ Fitur Utama

- ✅ **Stabilisasi Video Super Smooth** - Menggunakan gyroscope dan software stabilization
- ✅ **Multiple Stabilization Modes** - Cinematic, Standard, Auto, Off
- ✅ **Modern UI** - Interface seperti iPhone 15 camera app
- ✅ **PWA Support** - Bisa diinstall di iPhone sebagai aplikasi native
- ✅ **Real-time Preview** - Preview stabilisasi secara real-time
- ✅ **Switch Camera** - Front/Back camera
- ✅ **High Quality Recording** - Video kualitas tinggi (1080p, 60fps)
- ✅ **Offline Support** - Service Worker untuk offline capability

## 🚀 Cara Menggunakan

### 1. Jalankan di Local Server

Karena PWA membutuhkan HTTPS (atau localhost), jalankan dengan server lokal:

```bash
# Menggunakan Python 3
python3 -m http.server 8000

# Atau menggunakan Node.js (jika sudah install)
npx http-server -p 8000

# Atau menggunakan PHP
php -S localhost:8000
```

### 2. Buka di Browser

Buka browser dan akses:
```
http://localhost:8000
```

### 3. Install di iPhone

1. Buka aplikasi di Safari (iPhone)
2. Tap tombol **Share** (kotak dengan panah)
3. Pilih **"Add to Home Screen"**
4. Aplikasi akan muncul seperti app native!

## 📂 Struktur File

```
camera-app-pwa/
├── index.html          # Main HTML file
├── styles.css          # Styling modern seperti iPhone 15
├── app.js              # Main application controller
├── camera.js           # Camera manager & recording
├── stabilization.js    # Video stabilization logic
├── manifest.json       # PWA manifest
├── sw.js              # Service Worker
├── icon-192.png       # PWA icon 192x192
├── icon-512.png       # PWA icon 512x512
└── README.md          # Dokumentasi
```

## 🎯 Mode Stabilisasi

- **Cinematic** ⭐ (Recommended) - Stabilisasi super smooth untuk hasil terbaik
- **Standard** - Stabilisasi standar
- **Auto** - Mode otomatis berdasarkan kondisi
- **Off** - Tanpa stabilisasi

## 🔧 Teknologi

- **HTML5** - Struktur aplikasi
- **CSS3** - Styling modern dengan backdrop-filter
- **JavaScript (ES6+)** - Logic aplikasi
- **MediaRecorder API** - Video recording
- **MediaDevices API** - Akses kamera
- **DeviceOrientation API** - Gyroscope untuk stabilisasi
- **Service Worker** - Offline support & PWA

## 📱 Browser Support

- ✅ Chrome/Edge (Desktop & Mobile)
- ✅ Safari iOS 11.3+ (iPhone/iPad)
- ✅ Firefox (Desktop & Mobile)
- ✅ Samsung Internet

## ⚠️ Catatan Penting

1. **HTTPS Required** - PWA membutuhkan HTTPS untuk production (localhost OK untuk development)
2. **Safari iOS** - Untuk install di iPhone, harus menggunakan Safari (bukan Chrome)
3. **Permission** - Aplikasi akan meminta izin kamera dan mikrofon
4. **Gyroscope** - Stabilisasi menggunakan gyroscope, pastikan device support

## 🐛 Troubleshooting

### Kamera tidak muncul
- Pastikan sudah memberikan permission
- Pastikan menggunakan HTTPS atau localhost
- Cek console browser untuk error

### Stabilisasi tidak bekerja
- Pastikan device memiliki gyroscope
- Cek permission untuk device orientation
- Pastikan mode stabilisasi bukan "Off"

### Video tidak tersimpan
- Cek permission untuk download
- Pastikan browser support MediaRecorder API
- Cek console untuk error

## 🚀 Deploy ke Production

### Netlify (Recommended)

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
netlify deploy --prod
```

### GitHub Pages

1. Push ke GitHub
2. Enable GitHub Pages di repository settings
3. Pilih branch main/master

### Vercel

```bash
npm install -g vercel
vercel
```

## 📝 Development dari Ubuntu

✅ **Bisa dikembangkan langsung dari Ubuntu!**
- Tidak perlu Mac
- Tidak perlu Xcode
- Cukup browser dan text editor
- Test di localhost atau deploy langsung

## 🎨 Customization

Anda bisa customize:
- Warna theme di `styles.css` (CSS variables)
- Stabilization sensitivity di `stabilization.js`
- Video quality di `camera.js`
- UI layout di `index.html` dan `styles.css`

## 📄 License

Free to use and modify!

---

**Selamat mengembangkan! 🎉**
