# LAPORAN & DOKUMENTASI LENGKAP PRAKTIKUM PEMROGRAMAN WEB
## SISTEM INFORMASI TIRAS DAN DISTRIBUSI BAHAN AJAR (SITTA) UNIVERSITAS TERBUKA

- **Mata Kuliah:** Pemrograman Web (Praktikum)
- **Instansi:** Universitas Terbuka (UT)
- **Repositori GitHub:** [https://github.com/WinnyTheFool/sitta-ut-web](https://github.com/WinnyTheFool/sitta-ut-web)

---

### I. PANDUAN PENGGUNAAN SETELAH CLONE

```bash
# 1. Clone repositori
git clone https://github.com/WinnyTheFool/sitta-ut-web.git

# 2. Masuk ke direktori proyek
cd sitta-ut-web
```

Karena proyek ini dikembangkan menggunakan **HTML5, CSS3 murni, dan Vanilla JavaScript**, tidak dibutuhkan instalasi dependensi:
1. **Membuka Langsung:** Buka berkas `index.html` dengan klik dua kali dari File Explorer.
2. **Live Server:** Buka folder di VS Code atau IDE, klik kanan `index.html` → pilih **"Open with Live Server"**.

---

### II. STRUKTUR DAN LOKASI BERKAS PROYEK

| Nama Berkas / Folder | Lokasi | Fungsi & Deskripsi |
|:---|:---|:---|
| **`index.html`** | `./index.html` | Halaman login: form email & password sederhana, alert error, modal Lupa Password & Daftar. |
| **`dashboard.html`** | `./dashboard.html` | Dashboard utama: navbar horizontal dengan dropdown Laporan, sapaan waktu dinamis (pagi/siang/sore/malam), menu card navigasi. |
| **`stok.html`** | `./stok.html` | Katalog bahan ajar dalam kartu grid dengan cover buku, form tambah stok di samping (DOM dinamis tanpa reload). |
| **`tracking.html`** | `./tracking.html` | Pelacakan DO: input No. DO, card biru hasil pencarian berisi nama mahasiswa & nomor DO, timeline perjalanan paket vertikal. |
| **`README.md`** | `./README.md` | Petunjuk cepat penggunaan, kredensial demo, dan nomor DO pengujian. |
| **`DOKUMENTASI.md`** | `./DOKUMENTASI.md` | Laporan komprehensif praktikum (file ini). |
| **`DOKUMENTASI_TUGAS.md`** | `./DOKUMENTASI_TUGAS.md` | Panduan pembuatan video penjelasan tugas praktikum. |
| **`.gitignore`** | `./.gitignore` | Pengabaian berkas sistem dan cache lokal. |
| **`css/style.css`** | `./css/style.css` | Styling sederhana: font Arial, warna navy `#1E3A8A` + kuning `#FFC107`, layout Flexbox & Grid, tanpa framework. |
| **`js/data.js`** | `./js/data.js` | Data master: `dataPengguna`, `dataBahanAjar`, `dataTracking`. |
| **`js/script.js`** | `./js/script.js` | Logika JavaScript: validasi login, greeting dinamis, render tracking + timeline, manipulasi DOM stok. |
| **`img/`** | `./img/` | Aset grafis: `logo-ut.svg`, gambar cover Buku Materi Pokok (BMP). |

---

### III. DATA MASTER & KREDENSIAL PENGUJIAN

Data master didefinisikan secara modular pada berkas `./js/data.js`:

#### 1. Data Akun Pengguna (`dataPengguna`)

| No | Nama Pengguna   | Email               | Password   | Role          | Lokasi        |
|:---|:----------------|:--------------------|:-----------|:--------------|:--------------|
| 1  | Rina Wulandari  | `rina@ut.ac.id`     | `rina123`  | UPBJJ-UT      | UPBJJ Jakarta |
| 2  | Agus Pranoto    | `agus@ut.ac.id`     | `agus123`  | UPBJJ-UT      | UPBJJ Makassar|
| 3  | Siti Marlina    | `siti@ut.ac.id`     | `siti123`  | Puslaba       | Kantor Pusat  |
| 4  | Doni Setiawan   | `doni@ut.ac.id`     | `doni123`  | Fakultas      | FISIP         |
| 5  | Admin SITTA     | `admin@ut.ac.id`    | `admin123` | Administrator | Kantor Pusat  |

#### 2. Data Bahan Ajar (`dataBahanAjar`)
Katalog yang ditampilkan pada halaman `stok.html` dalam bentuk kartu grid:

| Kode Lokasi  | Kode Barang | Nama Barang                    | Jenis | Edisi | Stok |
|:-------------|:------------|:-------------------------------|:------|:------|:-----|
| 0TMP01       | ASIP4301    | Pengantar Ilmu Komunikasi      | BMP   | 2     | 548  |
| 0JKT01       | EKMA4216    | Manajemen Keuangan             | BMP   | 3     | 392  |
| 0SBY02       | EKMA4310    | Kepemimpinan                   | BMP   | 1     | 278  |
| 0MLG01       | BIOL4211    | Mikrobiologi Dasar             | BMP   | 2     | 165  |
| 0UPBJJBDG    | PAUD4401    | Perkembangan Anak Usia Dini    | BMP   | 4     | 204  |

#### 3. Data Pelacakan Delivery Order (`dataTracking`)
Nomor DO yang dapat diuji pada halaman `tracking.html`:

| No. DO     | Nama Penerima   | Ekspedisi      | Status            |
|:-----------|:----------------|:---------------|:------------------|
| 2023001234 | Rina Wulandari  | JNE            | Dalam Perjalanan  |
| 2023005678 | Agus Pranoto    | Pos Indonesia  | Dikirim           |

---

### IV. PENJELASAN LOGIKA & IMPLEMENTASI TEKNIS JAVASCRIPT

#### 1. Mekanisme Autentikasi & Penyimpanan Sesi
- **File:** `./js/script.js`
- **Alur Kerja:**
  1. Mengambil nilai dari `#inputEmail` dan `#inputPassword`.
  2. Mencocokkan kombinasi email + password ke array `dataPengguna` di `data.js`.
  3. Jika salah → menampilkan alert merah dengan pesan *"email/password yang anda masukkan salah"*.
  4. Jika benar → data nama pengguna disimpan ke `sessionStorage` dan browser diarahkan ke `dashboard.html`.

#### 2. Sapaan Dinamis Berdasarkan Waktu Lokal
- **File:** `./js/script.js` — bagian dashboard
- **Alur Kerja:**
  - Mengambil jam lokal via `new Date().getHours()`.
  - Menetapkan sapaan:
    - `05:00 – 10:59` → **"Selamat pagi"**
    - `11:00 – 14:59` → **"Selamat siang"**
    - `15:00 – 18:59` → **"Selamat sore"**
    - `19:00 – 04:59` → **"Selamat malam"**
  - Ditampilkan di bawah judul dashboard: *"Selamat pagi, Rina Wulandari"*

#### 3. Manipulasi DOM Dinamis pada Halaman Stok
- **File:** `./js/script.js` — bagian stok
- **Alur Kerja:**
  1. Menerima input dari form di panel kanan (Kode Lokasi, Kode Barang, Nama Barang, Jenis, Edisi, Stok).
  2. Validasi kelengkapan input dan nilai numerik stok.
  3. Membuat elemen kartu buku baru (`document.createElement('div')`) secara runtime.
  4. Menambahkan kartu ke grid buku (`bookGrid.appendChild(kartuBaru)`) tanpa reload halaman.
  5. Form direset setelah submit.

#### 4. Pelacakan DO dan Render Timeline
- **File:** `./js/script.js` — bagian tracking
- **Alur Kerja:**
  1. Membaca nomor DO dari input `#inputNoDO`.
  2. Mencocokkan ke objek `dataTracking`.
  3. Jika ditemukan → menampilkan card biru (nama + nomor DO) dan mengiterasi array `perjalanan` menjadi list timeline `<ul>`.
  4. Jika tidak ditemukan → menampilkan kotak "Nomor DO tidak ditemukan".
  5. Mendukung parameter URL `?do=2023001234` untuk deep linking.

---

### V. DESAIN & TAMPILAN ANTARMUKA

Desain mengikuti panduan mockup soal praktikum:

| Aspek           | Implementasi                                                    |
|:----------------|:----------------------------------------------------------------|
| Font            | Arial / sans-serif (font standar browser, tanpa Google Fonts)   |
| Warna Utama     | Navy `#1E3A8A` untuk navbar, header, tombol primer              |
| Warna Aksen     | Kuning `#FFC107` / `#E6A100` untuk tombol Masuk, Lacak, aksen  |
| Latar Halaman   | Abu-abu terang `#f5f5f5`                                        |
| Komponen        | Card putih dengan border dan border-radius kecil (4px)          |
| Navigasi        | Bar horizontal gelap dengan dropdown menu untuk "Laporan"       |

---

### VI. KESIMPULAN
Aplikasi web SITTA UT berhasil mengimplementasikan kompetensi praktikum pemrograman web:
- **HTML5 semantik** yang rapi dan valid
- **CSS3 murni** yang sederhana dan mudah dibaca (tanpa framework, tanpa animasi berlebihan)
- **Vanilla JavaScript** untuk manipulasi DOM, validasi form, dan interaksi UI
- Desain konsisten dengan mockup soal tugas praktikum: clean, plain, mudah dibaca
