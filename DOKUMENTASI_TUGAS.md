# Panduan Video Penjelasan Tugas Praktikum Pemrograman Web (maks 15 menit)

## 1. Pembuka & Perkenalan Diri
- Salam pembuka (contoh: "Halo semua, perkenalkan saya [Nama Mahasiswa] dengan NIM [NIM]. Hari ini saya akan menjelaskan hasil tugas praktikum Pemrograman Web untuk mata kuliah STSI4209.")
- Sebutkan tujuan aplikasi: **SITTA UT** – Sistem Informasi Tiras dan Transaksi Bahan Ajar Universitas Terbuka.
- Ringkas alur yang akan ditunjukkan: login → dashboard → tracking DO → manajemen stok.

## 2. Alur Pengerjaan & Demo Aplikasi
### 2.1 Membuka `index.html`
- Jelaskan tampilan login, field email & password, serta modal bantuan.
- Tunjukkan proses validasi (cek email & password ada di `js/data.js`).
- Setelah berhasil, aplikasi otomatis mengarahkan ke `dashboard.html`.

### 2.2 Dashboard (`dashboard.html`)
- Tampilkan sapaan waktu (pagi/siang/sore/malam) yang di‑generate oleh JavaScript berdasarkan zona waktu lokal.
- Demo jam digital yang terus berjalan.
- Jelaskan tombol navigasi ke **Tracking DO** dan **Stok**.

### 2.3 Tracking DO (`tracking.html`)
- Tampilkan tabel daftar Delivery Order (DO) yang di‑ambil dari data statis `js/data.js`.
- Perlihatkan fitur pencarian/filter yang bekerja secara real‑time menggunakan event `input` pada kolom pencarian.
- Tekankan bahwa semua data diproses di sisi klien tanpa backend.

### 2.4 Stok Bahan Ajar (`stok.html`)
- Tampilkan tabel stok modul dengan kolom: Kode Modul, Nama Modul, Kuota, dan Status.
- Demonstrasikan penambahan stok baru melalui tombol **Tambah Stok** yang membuka modal form.
- Setelah mengisi data, modal menutup dan baris baru langsung muncul di tabel (manipulasi DOM).

## 3. Penjelasan Teknis Singkat
- **HTML Semantik**: Penggunaan elemen `<header>`, `<nav>`, `<main>`, `<section>`, dan `<footer>` untuk struktur halaman yang mudah dipahami mesin pencari dan pembaca layar.
- **CSS Eksternal** (`css/style.css`): Semua styling berada di satu berkas, memisahkan presentasi dari markup. Menggunakan CSS Grid & Flexbox untuk layout responsif, serta variabel warna untuk konsistensi.
- **JavaScript DOM** (`js/script.js`):
  - Mengambil data dari `js/data.js` (array objek).
  - Menggunakan `document.querySelector` & `addEventListener` untuk interaksi UI.
  - Update UI secara dinamis (tabel, greeting, jam) tanpa reload halaman.
- **Modal**: Implementasi modal sederhana dengan toggling kelas CSS (`.show`) yang dikontrol lewat JavaScript.
- **Live Server**: Karena aplikasi berbasis file statis, cukup dijalankan dengan ekstensi Live Server di VS Code.

## 4. Penutup
- Ringkas kembali apa yang telah ditunjukkan.
- Sampaikan bahwa seluruh kode ditulis sendiri, mengacu pada standar praktik web modern.
- Ucapkan terima kasih dan harapkan penilaian yang baik.

---
*Catatan:* Sesuaikan durasi tiap bagian agar total tidak melebihi 15 menit. Pastikan suara jelas, layar terlihat penuh, dan contoh interaksi dijalankan secara real‑time.
