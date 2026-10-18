# DOKUMENTASI PROYEK SITTA UNIVERSITAS TERBUKA
## Tugas Praktikum Pemrograman Web - Front-End

Aplikasi web **SITTA UT** (Sistem Informasi Tiras dan Distribusi Bahan Ajar Universitas Terbuka) adalah aplikasi front-end sederhana yang dibangun menggunakan HTML, CSS murni (tanpa framework), dan Vanilla JavaScript. Aplikasi ini mencakup halaman login, dashboard navigasi, tracking Delivery Order (DO), dan katalog stok bahan ajar.

---

## Panduan Memulai Cepat (Quick Start)

### 1. Clone Repositori
```bash
git clone https://github.com/WinnyTheFool/sitta-ut-web.git
```

### 2. Masuk ke Folder Proyek
```bash
cd sitta-ut-web
```

### 3. Jalankan Aplikasi
Proyek ini dibangun menggunakan **Vanilla HTML, CSS, dan JavaScript** murni, sehingga tidak memerlukan instalasi dependensi apapun.

- **Cara 1 (Live Server di VS Code / Editor lain)**:
  - Buka folder proyek di editor (VS Code, Cursor, dll.).
  - Klik kanan pada berkas `index.html` lalu pilih **"Open with Live Server"**.

- **Cara 2 (Buka Langsung di Browser)**:
  - Buka folder di File Explorer.
  - Klik dua kali pada file `index.html`.

- **Cara 3 (Python HTTP Server)**:
  ```bash
  python -m http.server 3000
  ```
  Kemudian buka browser di `http://localhost:3000`.

---

## Struktur Berkas & Direktori Proyek

```text
sitta-ut-web/
│
├── index.html            # Halaman Login dengan form sederhana, modal Lupa Password & Daftar
├── dashboard.html        # Dashboard utama dengan navbar + sapaan waktu dinamis
├── stok.html             # Katalog bahan ajar dalam kartu + form tambah stok (DOM)
├── tracking.html         # Pelacakan Delivery Order (DO) + timeline perjalanan paket
├── README.md             # Panduan penggunaan proyek (file ini)
├── DOKUMENTASI.md        # Laporan teknis lengkap praktikum
├── DOKUMENTASI_TUGAS.md  # Panduan video penjelasan tugas
├── .gitignore            # Pengabaian berkas sistem/log
│
├── css/
│   └── style.css         # Styling sederhana: Arial, warna navy #1E3A8A + kuning #FFC107
│
├── js/
│   ├── data.js           # Data master: dataPengguna, dataBahanAjar, dataTracking
│   └── script.js         # Logika JavaScript: login, greeting, tracking, DOM stok
│
└── img/                  # Aset gambar
    ├── logo-ut.svg                  # Logo Universitas Terbuka
    ├── pengantar_komunikasi.jpg     # Cover BMP Pengantar Ilmu Komunikasi
    ├── manajemen_keuangan.jpg       # Cover BMP Manajemen Keuangan
    ├── kepemimpinan.jpg             # Cover BMP Kepemimpinan
    ├── mikrobiologi.jpg             # Cover BMP Mikrobiologi Dasar
    └── paud_perkembangan.jpg        # Cover BMP Perkembangan Anak Usia Dini
```

---

## Kredensial Akun Pengujian (Login Demo)

Data akun tersedia pada `js/data.js`, digunakan untuk login di halaman `index.html`:

| No | Nama Pengguna      | Email               | Password   | Role          | Lokasi        |
|:---|:-------------------|:--------------------|:-----------|:--------------|:--------------|
| 1  | Rina Wulandari     | `rina@ut.ac.id`     | `rina123`  | UPBJJ-UT      | UPBJJ Jakarta |
| 2  | Agus Pranoto       | `agus@ut.ac.id`     | `agus123`  | UPBJJ-UT      | UPBJJ Makassar|
| 3  | Siti Marlina       | `siti@ut.ac.id`     | `siti123`  | Puslaba       | Pusat         |
| 4  | Doni Setiawan      | `doni@ut.ac.id`     | `doni123`  | Fakultas      | FISIP         |
| 5  | Admin SITTA        | `admin@ut.ac.id`    | `admin123` | Administrator | Pusat         |

> Jika login gagal, muncul pesan: *"email/password yang anda masukkan salah"*

---

## Nomor Delivery Order (DO) untuk Pengujian Tracking

Masukkan nomor berikut di halaman `tracking.html`:

1. **`2023001234`** — Rina Wulandari, JNE, Status: *Dalam Perjalanan*
   - Loket Tangsel → Hub Tangsel → Kantor Jakarta Selatan

2. **`2023005678`** — Agus Pranoto, Pos Indonesia, Status: *Dikirim*
   - Loket Tangsel → Hub Bandung → Proses Antar Cimahi → Selesai Antar

---

## Fitur Utama Aplikasi

### 1. Halaman Login (`index.html`)
- Form login sederhana di tengah halaman (card putih)
- Validasi email & password dicocokkan ke `dataPengguna` di `data.js`
- Alert merah jika kredensial salah
- Modal **Lupa Password** dan **Daftar Akun Baru**
- Sesi disimpan via `sessionStorage`

### 2. Dashboard (`dashboard.html`)
- Navbar horizontal gelap dengan menu: **Informasi Bahan Ajar** | **Tracking Pengiriman** | **Laporan** (dropdown) | **Histori Transaksi**
- Sapaan dinamis: *Selamat pagi/siang/sore/malam, [Nama]* berdasarkan waktu lokal
- 5 menu card navigasi ke fitur-fitur aplikasi

### 3. Katalog & Stok Bahan Ajar (`stok.html`)
- Menampilkan data dari `dataBahanAjar` dalam bentuk kartu (grid)
- Setiap kartu menampilkan: cover buku, Kode Lokasi, Kode Barang, Nama Barang, Jenis, Edisi, Stok
- Form tambah stok di sebelah kanan, langsung menambah kartu baru via **DOM manipulation** tanpa reload

### 4. Tracking Pengiriman DO (`tracking.html`)
- Input **No. DO/Billing** + tombol **Lacak** kuning
- Hasil: card biru berisi Nama Mahasiswa + Nomor DO
- Timeline vertikal: setiap tahap perjalanan paket ditampilkan dalam list dengan titik kuning

---

## Teknologi yang Digunakan
- **HTML5** — Struktur semantik (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- **CSS3 Murni** — Tanpa framework. Font Arial, warna UT (navy + kuning), Flexbox & Grid
- **Vanilla JavaScript** — DOM manipulation, event listeners, `Date` API, `sessionStorage`
