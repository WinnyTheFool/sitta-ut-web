# DOKUMENTASI PROYEK SITTA UNIVERSITAS TERBUKA
## Tugas Praktikum Pemrograman Web - Front-End

Aplikasi web **SITTA UT** (Sistem Informasi Tiras dan Transaksi Bahan Ajar Universitas Terbuka) adalah aplikasi front-end interaktif yang dirancang untuk mengelola dan memantau sirkulasi Bahan Ajar / Buku Materi Pokok (BMP) UT, mencakup katalog stok bahan ajar, autentikasi multi-peran, pelacakan ekspedisi (*tracking Delivery Order*), dan navigasi dashboard modular.

---

## 🚀 Panduan Memulai Cepat (Quick Start)

Bagi siapa pun yang meng-clone repositori ini, ikuti langkah mudah berikut:

### 1. Clone Repositori
Jalankan perintah ini di terminal / command prompt komputer Anda:
```bash
git clone https://github.com/WinnyTheFool/sitta-ut-web.git
```

### 2. Masuk ke Folder Proyek
```bash
cd sitta-ut-web
```

### 3. Jalankan Aplikasi
Proyek ini dibangun menggunakan **Vanilla HTML, CSS, dan JavaScript**, sehingga tidak memerlukan instalasi dependensi (`npm install`) ataupun proses build:

- **Cara 1 (Menggunakan Live Server di VS Code / Editor lain)**:
  - Buka folder proyek di editor (VS Code, Cursor, Antigravity IDE, dll.).
  - Klik kanan pada berkas `index.html` lalu pilih **"Open with Live Server"**.
  - Aplikasi otomatis terbuka di browser pada alamat `http://127.0.0.1:5500/` atau `http://localhost:3000/`.

- **Cara 2 (Membuka Langsung di Peramban / Browser)**:
  - Buka folder hasil clone di File Explorer Anda.
  - Klik dua kali pada file `index.html`.
  - Aplikasi langsung dapat digunakan pada browser favorit Anda (Google Chrome, Edge, Firefox, Safari).

- **Cara 3 (Menggunakan Simple HTTP Server Python / Node.js)**:
  ```bash
  # Menggunakan Python
  python -m http.server 3000

  # Atau menggunakan Node.js npx
  npx serve .
  ```
  Kemudian buka browser di `http://localhost:3000`.

---

## 📁 Struktur Berkas & Direktori Proyek

Seluruh berkas berada pada folder root hasil clone:

```text
sitta-ut-web/
│
├── index.html            # Halaman Login, Autentikasi Pengguna, Modal Registrasi & Reset Sandi
├── dashboard.html        # Dashboard Utama (Sapaan Waktu, Jam Digital, Navigasi 6 Menu Layanan)
├── stok.html             # Katalog Data Bahan Ajar, Filter Pencarian & Modal Tambah Stok Dinamis
├── tracking.html         # Pelacakan Pengiriman DO (Delivery Order) Ekspedisi & Timeline Interaktif
├── README.md             # Panduan Cepat & Petunjuk Penggunaan Proyek
├── DOKUMENTASI.md        # Laporan Lengkap Praktikum & Penjelasan Teknis Logika
├── .gitignore            # Konfigurasi pengabaian berkas sistem/log
│
├── css/
│   └── style.css         # Styling Sistem Desain Modern (CSS Grid/Flexbox, Responsif, Glassmorphism)
│
├── js/
│   ├── data.js           # Database Lokal Mock (dataPengguna, dataBahanAjar, dataTracking)
│   └── script.js         # Logika Utama DOM JavaScript, Validasi Form, Event Handlers & State Storage
│
└── img/                  # Aset Media & Ikon Grafis
    ├── logo-ut.svg       # Logo Resmi Universitas Terbuka
    ├── pengantar_komunikasi.jpg # Sampul BMP Pengantar Ilmu Komunikasi
    ├── manajemen_keuangan.jpg   # Sampul BMP Manajemen Keuangan
    ├── kepemimpinan.jpg         # Sampul BMP Kepemimpinan
    ├── mikrobiologi.jpg         # Sampul BMP Mikrobiologi Dasar
    ├── paud_perkembangan.jpg    # Sampul BMP Perkembangan AUD
    └── *.svg             # Ikon-ikon visual kategori bahan ajar
```

---

## 🔑 Kredensial Akun Pengujian (Login Demo)

Data akun telah disiapkan pada `js/data.js` dan siap diuji coba di halaman `index.html`:

| No | Nama Pengguna | Alamat Email | Kata Sandi | Peran (Role) | Lokasi UPBJJ / Unit |
|:---|:---|:---|:---|:---|:---|
| 1 | **Rina Wulandari** | `rina@ut.ac.id` | `rina123` | UPBJJ-UT | UPBJJ Jakarta |
| 2 | **Agus Pranoto** | `agus@ut.ac.id` | `agus123` | UPBJJ-UT | UPBJJ Makassar |
| 3 | **Siti Marlina** | `siti@ut.ac.id` | `siti123` | Puslaba | Pusat |
| 4 | **Doni Setiawan** | `doni@ut.ac.id` | `doni123` | Fakultas | FISIP |
| 5 | **Admin SITTA** | `admin@ut.ac.id` | `admin123` | Administrator | Pusat |

---

## 📦 Nomor Delivery Order (DO) untuk Pengujian Tracking

Pada halaman `tracking.html`, Anda dapat memasukkan nomor DO berikut atau klik tombol pintasan yang tersedia:

1. **Nomor DO: `2023001234`**
   - **Penerima:** Rina Wulandari (UPBJJ Jakarta)
   - **Ekspedisi:** JNE Express
   - **Status:** *Dalam Perjalanan*
   - **Timeline:** Loket Tangsel ➔ Hub Tangsel ➔ Kantor Jaksel.

2. **Nomor DO: `2023005678`**
   - **Penerima:** Agus Pranoto (UPBJJ Bandung / Cimahi)
   - **Ekspedisi:** Pos Indonesia
   - **Status:** *Selesai Antar (Terkirim)*
   - **Timeline:** Loket Tangsel ➔ Hub Bandung ➔ Proses Antar Cimahi ➔ Selesai Antar.

---

## 🌟 Fitur Utama Aplikasi

### 1. Halaman Login (`index.html`)
- **Validasi Form**: Memeriksa kelengkapan input email dan kata sandi serta mencocokkan ke database mock `dataPengguna`.
- **Alert Notifikasi**: Peringatan visual otomatis jika kombinasi kredensial salah atau form kosong.
- **Toggle Sandi**: Tombol ikon mata untuk melihat / menyembunyikan kata sandi.
- **Modal Interaktif**: Modal bantuan reset sandi (*Lupa Password*) dan permohonan registrasi akun baru.
- **Sesi Pengguna**: Menyimpan sesi pengguna yang berhasil login ke `localStorage` (`sitta_current_user`).

### 2. Dashboard Utama (`dashboard.html`)
- **Sapaan Waktu Otomatis**: Mendeteksi waktu lokal pengguna via `new Date().getHours()` untuk menampilkan sapaan kontekstual (*Pagi / Siang / Sore / Malam*).
- **Jam Digital Real-Time**: Tampilan jam, tanggal, dan hari dalam format Bahasa Indonesia yang diperbarui setiap detik.
- **Profil Pengguna**: Menampilkan nama, peran (*role*), dan unit kerja pengguna yang aktif.
- **6 Menu Utama Layanan SITTA**: Navigasi ke modul stok bahan ajar, tracking DO, distribusi, tiras, dll.
- **Logout Terintegrasi**: Mengosongkan sesi pengguna dan kembali ke halaman login.

### 3. Katalog & Stok Bahan Ajar (`stok.html`)
- **Tabel Bahan Ajar Dinamis**: Membaca data awal modul BMP dari `js/data.js` dan memuatnya ke tabel.
- **Modal Tambah Stok Interaktif**:
  - Formulir input modul baru (Kode Lokasi, Kode Bahan Ajar, Judul, Edisi, Jumlah Stok).
  - Saat disimpan, baris baru langsung **diinjeksi ke baris teratas tabel (DOM Manipulation)** tanpa reload halaman.
  - Dilengkapi animasi sorotan (*highlight*) dan pembaruan jumlah total judul buku secara otomatis.
- **Pencarian Instan**: Menyaring katalog berdasarkan judul atau kode modul secara real-time.

### 4. Pelacakan Pengiriman DO (`tracking.html`)
- **Pencarian DO Cepat**: Mendukung pencarian manual maupun parameter URL (`?do=2023001234`).
- **Informasi Komprehensif**: Menampilkan nama penerima, ekspedisi, tanggal kirim, total biaya, dan status pengiriman.
- **Timeline Interaktif**: Garis waktu kronologis status pengantaran paket dari pengirim hingga penerima akhir.

---

## 🛠️ Teknologi yang Digunakan
- **HTML5**: Struktur semantik modern (`<main>`, `<header>`, `<nav>`, `<section>`, `<footer>`, `<dialog>`).
- **CSS3**: Sistem tata letak modern (CSS Flexbox & CSS Grid), CSS Custom Variables, desain responsif untuk ponsel/tablet/desktop, dan glassmorphism.
- **Vanilla JavaScript (ES6+)**: Manipulasi DOM, validasi formulir, penanganan event listeners, objek waktu `Date`, dan penyimpanan peramban `localStorage`.
