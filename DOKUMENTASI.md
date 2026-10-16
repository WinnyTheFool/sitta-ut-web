# LAPORAN & DOKUMENTASI LENGKAP PRAKTIKUM PEMROGRAMAN WEB
## SISTEM INFORMASI TIRAS DAN TRANSAKSI BAHAN AJAR (SITTA) UNIVERSITAS TERBUKA

- **Mata Kuliah:** Pemrograman Web (Praktikum)
- **Instansi:** Universitas Terbuka (UT)
- **Repositori GitHub:** [https://github.com/WinnyTheFool/sitta-ut-web](https://github.com/WinnyTheFool/sitta-ut-web)
- **Lokasi Berkas:** Direktori root hasil clone (`./sitta-ut-web/`)

---

### I. PANDUAN PENGGUNAAN SETELAH CLONE

Setelah pengguna atau penguji meng-clone proyek dari GitHub:

```bash
# 1. Clone repositori
git clone https://github.com/WinnyTheFool/sitta-ut-web.git

# 2. Masuk ke direktori proyek
cd sitta-ut-web
```

Karena proyek ini dikembangkan secara murni menggunakan teknologi standar web front-end (**HTML5, CSS3, dan Vanilla JavaScript**), tidak dibutuhkan dependensi tambahan (`npm install` atau compiler):
1. **Membuka Langsung:** Buka berkas `index.html` dengan klik dua kali dari file manager atau peramban pilihan Anda.
2. **Menggunakan Live Server:** Buka folder `sitta-ut-web` pada VS Code atau IDE Anda, lalu klik kanan `index.html` ➔ pilih **"Open with Live Server"**.

---

### II. STRUKTUR DAN LOKASI BERKAS PROYEK

Seluruh berkas terorganisasi secara rapi dan relatif terhadap folder root repositori (`./`):

| Nama Berkas / Folder | Lokasi Relatif | Fungsi & Deskripsi Teknis |
|:---|:---|:---|
| **`index.html`** | `./index.html` | Halaman autentikasi / login pengguna, validasi input, kotak alert error, dan dialog modal reset sandi & daftar. |
| **`dashboard.html`** | `./dashboard.html` | Dashboard utama pengguna yang memuat sapaan waktu otomatis, jam digital waktu nyata, profil user aktif, dan 6 navigasi menu. |
| **`stok.html`** | `./stok.html` | Modul informasi katalog stok modul BMP dan modal interaktif penambahan baris data stok baru ke DOM tabel tanpa reload. |
| **`tracking.html`** | `./tracking.html` | Halaman pelacakan Delivery Order (DO) bahan ajar, informasi ekspedisi (JNE / Pos Indonesia), dan alur timeline pengiriman. |
| **`README.md`** | `./README.md` | Petunjuk cepat penggunaan aplikasi, kredensial demo, dan informasi umum proyek. |
| **`DOKUMENTASI.md`** | `./DOKUMENTASI.md` | Laporan komprehensif praktikum, penjelasan arsitektur, data master, dan logika teknis pemrograman. |
| **`.gitignore`** | `./.gitignore` | Berkas konfigurasi untuk mengabaikan berkas sistem dan berkas cache lokal. |
| **`css/style.css`** | `./css/style.css` | Lembar gaya desain antarmuka terpusat (CSS Variables, Flexbox, Grid, Glassmorphism, dan responsivitas). |
| **`js/data.js`** | `./js/data.js` | Modul penyimpan database statis terpisah: `dataPengguna`, `dataBahanAjar`, dan `dataTracking`. |
| **`js/script.js`** | `./js/script.js` | Modul pengendali logika interaksi JavaScript, manipulasi DOM, validasi formulir, dan Web Storage API (`localStorage`). |
| **`img/`** | `./img/` | Direktori aset grafis: `logo-ut.svg`, gambar sampul Buku Materi Pokok (BMP), serta ikon SVG kategori modul. |

---

### III. DATA MASTER & KREDENSIAL PENGUJIAN

Data master didefinisikan secara modular pada berkas `./js/data.js`:

#### 1. Data Akun Pengguna (`dataPengguna`)
Dapat langsung digunakan untuk menguji fungsionalitas login pada `index.html`:

| No | Nama Pengguna | Alamat Email | Kata Sandi | Peran (Role) | Lokasi Unit Kerja |
|:---|:---|:---|:---|:---|:---|
| 1 | **Rina Wulandari** | `rina@ut.ac.id` | `rina123` | UPBJJ-UT | UPBJJ Jakarta |
| 2 | **Agus Pranoto** | `agus@ut.ac.id` | `agus123` | UPBJJ-UT | UPBJJ Makassar |
| 3 | **Siti Marlina** | `siti@ut.ac.id` | `siti123` | Puslaba | Kantor Pusat |
| 4 | **Doni Setiawan** | `doni@ut.ac.id` | `doni123` | Fakultas | FISIP |
| 5 | **Admin SITTA** | `admin@ut.ac.id` | `admin123` | Administrator | Kantor Pusat |

#### 2. Data Bahan Ajar (`dataBahanAjar`)
Katalog awal yang dimuat pada halaman `stok.html`:
1. `ASIP4301` - Pengantar Ilmu Komunikasi (Edisi 2, Stok: 548, Lokasi: 0TMP01)
2. `EKMA4216` - Manajemen Keuangan (Edisi 3, Stok: 392, Lokasi: 0JKT01)
3. `EKMA4310` - Kepemimpinan (Edisi 1, Stok: 278, Lokasi: 0SBY02)
4. `BIOL4211` - Mikrobiologi Dasar (Edisi 2, Stok: 165, Lokasi: 0MLG01)
5. `PAUD4401` - Perkembangan Anak Usia Dini (Edisi 4, Stok: 204, Lokasi: 0UPBJJBDG)

#### 3. Data Pelacakan Delivery Order (`dataTracking`)
Nomor DO pengujian pada halaman `tracking.html`:
- **DO `2023001234`**: Penerima Rina Wulandari (UPBJJ Jakarta), Ekspedisi JNE Express, Status: *Dalam Perjalanan*.
- **DO `2023005678`**: Penerima Agus Pranoto (UPBJJ Bandung), Ekspedisi Pos Indonesia, Status: *Selesai Antar / Terkirim*.

---

### IV. PENJELASAN LOGIKA & IMPLEMENTASI TEKNIS JAVASCRIPT

#### 1. Mekanisme Autentikasi & Penyimpanan Sesi
- **File Pengendali:** `./js/script.js` (Fungsi `handleLoginSubmit()`)
- **Alur Kerja:**
  1. Mengambil nilai dari input `#inputEmail` dan `#inputPassword`.
  2. Melakukan verifikasi apakah kombinasi email dan password cocok dengan data pada array `dataPengguna`.
  3. Jika kredensial salah, sistem menampilkan peringatan `#loginAlertBox` dengan pesan *"email/password yang anda masukkan salah"*.
  4. Jika sukses, data pengguna aktif disimpan ke browser melalui `localStorage.setItem('sitta_current_user', JSON.stringify(user))` dan pengguna diarahkan ke `./dashboard.html`.

#### 2. Sapaan Berbasis Waktu & Jam Digital Waktu Nyata
- **File Pengendali:** `./js/script.js` (Fungsi `updateDashboardGreeting()` & `startRealtimeClock()`)
- **Alur Kerja:**
  - Mengambil jam lokal saat ini menggunakan metode JavaScript `new Date().getHours()`.
  - Mengatur ucapan sapaan secara dinamis:
    - `04:00 - 10:59`: "Selamat Pagi"
    - `11:00 - 14:59`: "Selamat Siang"
    - `15:00 - 17:59`: "Selamat Sore"
    - `18:00 - 03:59`: "Selamat Malam"
  - `startRealtimeClock()` memanfaatkan `setInterval(..., 1000)` untuk memperbarui detak jam, hari, dan tanggal bahasa Indonesia secara real-time.

#### 3. Manipulasi DOM Dinamis pada Penambahan Stok
- **File Pengendali:** `./js/script.js` (Fungsi `handleTambahStokSubmit()`)
- **Alur Kerja:**
  1. Menerima data input dari form modal dialog `#modalTambahStok` (Kode Lokasi, Kode Bahan Ajar, Judul, Edisi, Stok).
  2. Melakukan validasi kelengkapan nilai dan memastikan jumlah stok merupakan bilangan bulat positif.
  3. Menyimpan item baru ke penyimpanan persisten `localStorage`.
  4. Membuat elemen baris tabel baru (`document.createElement('tr')`) secara runtime dan menempatkannya ke posisi paling atas (`tbody.prepend(newRow)`).
  5. Menambahkan kelas efek visual (`highlight-new-row`) untuk memberikan umpan balik visual animasi kepada pengguna bahwa baris telah berhasil masuk tanpa reload halaman.
  6. Memperbarui total judul modul pada kartu ringkasan secara reaktif.

#### 4. Pelacakan Ekspedisi Interaktif
- **File Pengendali:** `./js/script.js` (Fungsi `lacakNomorDO()`)
- **Alur Kerja:**
  - Membaca nomor DO dari input pencarian atau dari parameter URL `window.location.search`.
  - Mencocokkan nomor DO pada objek `dataTracking`.
  - Jika ditemukan, merender data ringkasan pengiriman dan mengiterasi array perjalanan (`perjalanan.map()`) menjadi elemen HTML timeline interaktif.
  - Jika tidak ditemukan, menampilkan kotak status kesalahan dengan rekomendasi nomor pengujian.

---

### V. KESIMPULAN
Aplikasi web SITTA UT berhasil mengimplementasikan seluruh kompetensi praktikum pemrograman web: struktur semantik HTML5 yang rapi, lembar gaya CSS3 responsif modern, pemisahan data modular di JavaScript, serta manipulasi DOM dan penanganan event listeners secara interaktif. Berkas proyek siap dijalankan di berbagai peramban modern setelah di-clone dari repositori GitHub.
