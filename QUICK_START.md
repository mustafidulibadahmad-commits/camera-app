# 🚀 Quick Start - Camera App PWA

## Langkah Cepat untuk Menjalankan

### 1. Jalankan Server Lokal

```bash
cd /home/ibad/Documents/camera-app-pwa

# Pilih salah satu cara:
# A. Menggunakan script (paling mudah)
./start-server.sh

# B. Manual dengan Python
python3 -m http.server 8000

# C. Manual dengan Node.js
npx http-server -p 8000

# D. Manual dengan PHP
php -S localhost:8000
```

### 2. Buka di Browser

Buka browser dan akses:
```
http://localhost:8000
```

### 3. Test di iPhone

1. Pastikan iPhone dan Ubuntu dalam jaringan WiFi yang sama
2. Cari IP address Ubuntu:
   ```bash
   hostname -I
   ```
3. Di iPhone, buka Safari dan akses:
   ```
   http://[IP_ADDRESS]:8000
   ```
   Contoh: `http://192.168.1.100:8000`

4. Install sebagai PWA:
   - Tap tombol **Share** (kotak dengan panah)
   - Pilih **"Add to Home Screen"**
   - Aplikasi akan muncul seperti app native!

## ✅ Fitur yang Tersedia

- ✅ Record video dengan stabilisasi
- ✅ Switch camera (front/back)
- ✅ Multiple stabilization modes
- ✅ Real-time preview
- ✅ Install sebagai PWA di iPhone

## 🎯 Mode Stabilisasi

- **Cinematic** - Super smooth (recommended)
- **Standard** - Stabilisasi standar
- **Auto** - Otomatis
- **Off** - Tanpa stabilisasi

## 📱 Cara Install di iPhone

1. Buka aplikasi di **Safari** (bukan Chrome)
2. Tap tombol **Share** (kotak dengan panah di bawah)
3. Scroll dan pilih **"Add to Home Screen"**
4. Edit nama jika perlu
5. Tap **"Add"**
6. Aplikasi akan muncul di home screen seperti app native!

## 🐛 Troubleshooting

### Server tidak jalan
- Pastikan port 8000 tidak digunakan aplikasi lain
- Coba port lain: `python3 -m http.server 8080`

### Kamera tidak muncul
- Pastikan sudah berikan permission
- Pastikan menggunakan HTTPS atau localhost
- Cek console browser (F12)

### Tidak bisa akses dari iPhone
- Pastikan firewall Ubuntu tidak block port 8000
- Pastikan iPhone dan Ubuntu dalam WiFi yang sama
- Coba akses IP address langsung

### Video tidak tersimpan
- Cek permission download di browser
- Pastikan browser support MediaRecorder API
- Cek console untuk error

## 🚀 Deploy ke Production

### Netlify (Paling Mudah)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd /home/ibad/Documents/camera-app-pwa
netlify deploy --prod
```

### GitHub Pages

1. Push ke GitHub:
```bash
git init
git add .
git commit -m "Camera App PWA"
git remote add origin https://github.com/mustafidulibadahmad-commits/camera-app.git
git push -u origin main
```

2. Enable GitHub Pages di repository settings
3. Pilih branch `main` dan folder `/root`

## 💡 Tips

- Gunakan mode **Cinematic** untuk hasil terbaik
- Pastikan device memiliki gyroscope untuk stabilisasi optimal
- Untuk production, gunakan HTTPS (Netlify/Vercel menyediakan gratis)
- Test di berbagai browser untuk kompatibilitas

---

**Selamat mencoba! 🎉**
