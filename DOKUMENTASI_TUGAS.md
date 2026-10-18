# Panduan Video Penjelasan Tugas Praktikum Pemrograman Web (maks 15 menit)

## 1. Pembuka & Perkenalan Diri
- Salam pembuka, contoh: *"Halo semua, perkenalkan saya [Nama] dengan NIM [NIM]. Hari ini saya akan menjelaskan hasil tugas praktikum Pemrograman Web."*
- Sebutkan nama aplikasi: **SITTA UT** – Sistem Informasi Tiras dan Distribusi Bahan Ajar Universitas Terbuka.
- Ringkas alur yang akan ditunjukkan: **login → dashboard → tracking DO → stok bahan ajar**.

---

## 2. Alur Demo Aplikasi

### 2.1 Halaman Login (`index.html`)
- Tunjukkan tampilan form login: judul **"Selamat Datang"**, input Email dengan ikon, input Password dengan ikon, link **"Lupa password ?"**, dan tombol **"Masuk"** berwarna kuning.
- Demo validasi: coba login dengan email/password salah → muncul alert merah *"email/password yang anda masukkan salah"*.
- Tunjukkan modal **Lupa Password** (klik link "Lupa password ?") dan modal **Daftar** (klik "Belum punya akun?").
- Login berhasil menggunakan salah satu akun di `js/data.js`, misalnya `rina@ut.ac.id / rina123`.

### 2.2 Halaman Dashboard (`dashboard.html`)
- Tunjukkan navbar horizontal gelap dengan menu:
  - **Informasi Bahan Ajar** (link ke stok.html)
  - **Tracking Pengiriman** (link ke tracking.html)
  - **Laporan** (dropdown: *Monitoring Progress DO* dan *Rekap Bahan Ajar*)
  - **Histori Transaksi Bahan Ajar** (membuka modal)
- Tunjukkan sapaan dinamis di bawah navbar, misalnya *"Selamat sore, Rina Wulandari"*, yang berubah sesuai waktu lokal (pagi/siang/sore/malam).
- Jelaskan bahwa sapaan dihasilkan dari `new Date().getHours()` di JavaScript.
- Tunjukkan 5 menu card navigasi ke fitur-fitur aplikasi.

### 2.3 Halaman Tracking DO (`tracking.html`)
- Tampilkan form input sederhana: label **"No. DO/Billing:"** + kolom input + tombol **"Lacak"** kuning.
- Masukkan nomor DO `2023001234` → klik Lacak.
- Tunjukkan hasil: **card biru** berisi nama mahasiswa (RINA WULANDARI) dan nomor DO, diikuti info ekspedisi/tanggal/total/status.
- Scroll ke bawah untuk melihat **Perjalanan Paket** — list timeline vertikal dengan titik kuning dan waktu di tiap tahap.
- Coba juga nomor DO `2023005678` untuk data berbeda (Agus Pranoto, Pos Indonesia, status Dikirim).
- Coba nomor DO yang tidak ada → tampil pesan "Nomor DO tidak ditemukan".

### 2.4 Halaman Stok Bahan Ajar (`stok.html`)
- Tunjukkan tampilan halaman: judul di atas, lalu layout dua kolom — **grid kartu buku** di kiri dan **form tambah stok** di kanan.
- Jelaskan setiap kartu buku menampilkan: gambar cover, Kode Lokasi, Kode Barang, Nama Barang, Jenis Barang, Edisi, dan Stok.
- Demo penambahan stok baru: isi form di kanan (Kode Lokasi, Kode Barang, Nama, Jenis, Edisi, Stok) → klik **Tambah Stok**.
- Tunjukkan bahwa kartu baru langsung muncul di grid **tanpa reload halaman** — ini adalah **manipulasi DOM** menggunakan JavaScript.
- Klik **Reset Data Awal** untuk kembali ke 5 data awal dari `dataBahanAjar`.

---

## 3. Penjelasan Teknis Singkat

- **HTML Semantik**: Menggunakan elemen `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` untuk struktur yang rapi dan valid.
- **CSS Eksternal** (`css/style.css`):
  - Murni CSS tanpa framework (tidak ada Tailwind, Bootstrap, dsb.)
  - Font: Arial / sans-serif
  - Warna: Navy `#1E3A8A` (navbar, tombol primer) + Kuning `#FFC107` (tombol aksi, aksen)
  - Layout: Flexbox untuk navbar dan tracking, CSS Grid untuk kartu buku dan menu dashboard
- **JavaScript DOM** (`js/script.js`):
  - Data dibaca dari `js/data.js` (array/objek statis, tidak ada backend)
  - Login: `addEventListener('submit')` + loop cari cocok di `dataPengguna`
  - Dashboard: `new Date().getHours()` untuk tentukan salam waktu
  - Tracking: cari kunci di `dataTracking`, render `<li>` timeline via `createElement`
  - Stok: `formTambahStok.addEventListener('submit')` membuat kartu baru dan `appendChild` ke grid
- **Modal**: Buka/tutup dengan toggle class `.active` pada elemen `.modal-overlay`
- **sessionStorage**: Menyimpan nama pengguna login agar tampil di navbar tiap halaman

---

## 4. Penutup
- Ringkas fitur yang telah didemonstrasikan: Login → Dashboard → Tracking DO → Stok Bahan Ajar.
- Tekankan bahwa semua halaman terhubung, desain konsisten dengan mockup soal, dan semua data diproses di sisi klien tanpa backend.
- Ucapkan terima kasih.

---
*Catatan:* Sesuaikan durasi tiap bagian agar total tidak melebihi 15 menit. Pastikan suara jelas dan layar terlihat penuh saat melakukan demo interaksi.
