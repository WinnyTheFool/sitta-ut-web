# DOKUMENTASI PROYEK SITTA UNIVERSITAS TERBUKA
## Tugas Praktikum Pemrograman Web

Aplikasi web **SITTA UT** (Sistem Informasi Tiras dan Transaksi Bahan Ajar Universitas Terbuka) adalah aplikasi front-end interaktif yang dirancang untuk mengelola dan memantau sirkulasi Bahan Ajar / Buku Materi Pokok (BMP) UT, mencakup katalog stok bahan ajar, autentikasi multi-peran, pelacakan ekspedisi (*tracking Delivery Order*), dan navigasi dashboard modular.

---

## 📁 Struktur Direktori & File Proyek

Folder proyek berlokasi di:
`c:\Users\alleg\.gemini\antigravity-ide\scratch\sitta-ut-web\`

```text
sitta-ut-web/
│
├── index.html            # Halaman Login, Autentikasi Pengguna, Modal Registrasi & Reset Sandi
├── dashboard.html        # Dashboard Utama (Sapaan Waktu, Jam Digital, Navigasi 6 Menu Layanan)
├── stok.html             # Katalog Data Bahan Ajar, Filter Pencarian & Modal Tambah Stok Dinamis
├── tracking.html         # Pelacakan Pengiriman DO (Delivery Order) Ekspedisi & Timeline Interaktif
├── README.md             # Dokumentasi Lengkap Proyek & Petunjuk Penggunaan
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

Semua akun terdaftar di file `js/data.js` dan siap diuji coba pada halaman `index.html`:

| No | Nama Pengguna | Alamat Email | Kata Sandi | Peran (Role) | Lokasi UPBJJ / Unit |
|:---|:---|:---|:---|:---|:---|
| 1 | **Rina Wulandari** | `rina@ut.ac.id` | `rina123` | UPBJJ-UT | UPBJJ Jakarta |
| 2 | **Agus Pranoto** | `agus@ut.ac.id` | `agus123` | UPBJJ-UT | UPBJJ Makassar |
| 3 | **Siti Marlina** | `siti@ut.ac.id` | `siti123` | Puslaba | Pusat |
| 4 | **Doni Setiawan** | `doni@ut.ac.id` | `doni123` | Fakultas | FISIP |
| 5 | **Admin SITTA** | `admin@ut.ac.id` | `admin123` | Administrator | Pusat |

---

## 📦 Nomor Delivery Order (DO) untuk Pengujian Tracking

Pada halaman `tracking.html`, masukkan salah satu nomor DO berikut atau klik chip pintasan:

1. **Nomor DO: `2023001234`**
   - **Penerima:** Rina Wulandari (UPBJJ Jakarta)
   - **Ekspedisi:** JNE Express
   - **Status:** *Dalam Perjalanan*
   - **Timeline:** Penerimaan di loket Tangsel ➔ Hub Tangsel ➔ Kantor Jaksel.

2. **Nomor DO: `2023005678`**
   - **Penerima:** Agus Pranoto (UPBJJ Bandung / Cimahi)
   - **Ekspedisi:** Pos Indonesia
   - **Status:** *Selesai Antar (Terkirim)*
   - **Timeline:** Loket Tangsel ➔ Hub Bandung ➔ Proses Antar Cimahi ➔ Selesai Antar.

---

## 🌟 Fitur Utama & Rincian Implementasi

### 1. Halaman Autentikasi (`index.html`)
- **Validasi Form**: Validasi format email UT (`@ut.ac.id`) dan pengecekan kata sandi secara lokal.
- **Alert & Notifikasi**: Alert interaktif muncul saat format salah atau kredensial tidak cocok.
- **Toggle Sandi**: Tombol intip sandi (*Show / Hide Password*) dengan ikon mata interaktif.
- **Modal Interaktif**:
  - Modal **Lupa Password**: Panduan reset kata sandi ke helpdesk UT.
  - Modal **Daftar Akun Baru**: Formulir permohonan akun staf UPBJJ / Dosen UT.
- **Penyimpanan Sesi**: Pengguna yang berhasil login disimpan ke `localStorage` (`sitta_current_user`).

### 2. Halaman Dashboard (`dashboard.html`)
- **Sapaan Dinamis Berbasis Waktu**: Menggunakan metode JavaScript `new Date().getHours()` untuk menampilkan sapaan otomatis ("Selamat Pagi", "Selamat Siang", "Selamat Sore", atau "Selamat Malam").
- **Jam Digital Real-time**: Menampilkan waktu, hari, dan tanggal bahasa Indonesia yang berdetak setiap detik.
- **Profil Pengguna**: Menampilkan nama, email, role, serta unit kerja pengguna yang sedang aktif login.
- **6 Menu Utama Layanan SITTA**:
  1. *Katalog & Stok Bahan Ajar* (Menuju `stok.html`)
  2. *Lacak Pengiriman DO* (Menuju `tracking.html`)
  3. *Distribusi UPBJJ*
  4. *Permintaan Bahan Ajar (BMP)*
  5. *Laporan Sirkulasi Tiras*
  6. *Pengaturan Akun & Bantuan*
- **Aksi Logout**: Menghapus data sesi dan mengarahkan kembali ke halaman login.

### 3. Halaman Stok Bahan Ajar (`stok.html`)
- **Render Data Otomatis**: Menampilkan seluruh data Buku Materi Pokok dari array `dataBahanAjar` di `js/data.js`.
- **Informasi Lengkap**: Kode Lokasi, Kode BMP, Judul Buku, Jenis (BMP), Edisi, Jumlah Stok, dan Status (Aman / Menipis).
- **Modal Tambah Stok Dinamis**:
  - Pengguna dapat mengklik tombol **"Tambah Stok Bahan Ajar"** untuk membuka modal formulir.
  - Form dilengkapi validasi input (Kode Lokasi, Kode Barang, Judul, Edisi, Jumlah Stok).
  - Saat disimpan, baris baru **langsung diinjeksi ke baris teratas tabel DOM tanpa me-reload halaman** dan disimpan ke `localStorage`.
  - Dilengkapi animasi sorotan (*highlight row animation*) dan indikator pembaruan total judul.
- **Filter Pencarian Real-Time**: Fitur pencarian instan berdasarkan judul buku atau kode mata kuliah.

### 4. Halaman Tracking Pengiriman (`tracking.html`)
- **Pencarian Nomor DO**: Input pencarian nomor Delivery Order dilengkapi dukungan parameter URL (`?do=...`).
- **Chip Pintasan**: Tombol cepat untuk menguji nomor DO yang sering dicari.
- **Data Binding Lengkap**: Menampilkan informasi nomor DO, nama penerima, ekspedisi, tanggal kirim, nomor paket, total biaya, dan status pengiriman.
- **Timeline Interaktif**: Visualisasi riwayat perjalanan paket dari loket asal hingga status pengantaran terakhir.

---

## 🚀 Panduan Menjalankan Aplikasi

Aplikasi dibangun dengan arsitektur standar web murni (**Vanilla HTML, CSS, dan JavaScript**) tanpa membutuhkan build tool atau instalasi compiler khusus:

1. **Menggunakan Live Server (VS Code / Antigravity IDE)**:
   - Klik kanan pada file [index.html](file:///c:/Users/alleg/.gemini/antigravity-ide/scratch/sitta-ut-web/index.html).
   - Pilih **"Open with Live Server"**.
   - Buka browser pada alamat `http://127.0.0.1:5500/` atau `http://localhost:3000/`.

2. **Membuka Langsung di Browser**:
   - Anda juga dapat langsung mengklik dua kali file [index.html](file:///c:/Users/alleg/.gemini/antigravity-ide/scratch/sitta-ut-web/index.html) untuk membukanya di browser favorit Anda (Google Chrome, Microsoft Edge, Mozilla Firefox).

---

## 🛠️ Teknologi yang Digunakan
- **HTML5**: Semantik standar web modern (`<main>`, `<section>`, `<nav>`, `<header>`, `<footer>`, `<dialog>`).
- **CSS3**: Layouting fleksibel dengan CSS Grid & Flexbox, variabel tema kustom HSL, glassmorphism, serta transisi animasi halus.
- **Vanilla JavaScript (ES6+)**: Manipulasi DOM terstruktur, penanganan event listeners, Date object, JSON parsing, dan Web Storage API (`localStorage`).
