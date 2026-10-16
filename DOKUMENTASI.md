# LAPORAN & DOKUMENTASI LENGKAP PRAKTIKUM PEMROGRAMAN WEB
## SISTEM INFORMASI TIRAS DAN TRANSAKSI BAHAN AJAR (SITTA) UNIVERSITAS TERBUKA

- **Mata Kuliah:** Pemrograman Web (Praktikum)
- **Instansi:** Universitas Terbuka (UT)
- **Lokasi Berkas:** `c:\Users\alleg\.gemini\antigravity-ide\scratch\sitta-ut-web\`

---

### I. DESKRIPSI SISTEM
Sistem Informasi Tiras dan Transaksi Bahan Ajar (**SITTA UT**) adalah aplikasi berbasis web yang digunakan oleh sivitas akademika Universitas Terbuka (UPBJJ, Pusat Pengelolaan Bahan Ajar/Puslaba, Fakultas, dan Mahasiswa) untuk:
1. Melakukan autentikasi pengguna dengan multi-peran dan validasi hak akses.
2. Memantau ketersediaan stok Buku Materi Pokok (BMP) secara terpusat.
3. Menambahkan data stok bahan ajar baru secara interaktif langsung ke antarmuka pengguna tanpa me-reload peramban.
4. Melacak status pengiriman dan riwayat perjalanan *Delivery Order* (DO) bahan ajar ke seluruh Indonesia secara *real-time*.

---

### II. STRUKTUR DAN LOKASI FILE
Semua berkas proyek berada di dalam folder:
`c:\Users\alleg\.gemini\antigravity-ide\scratch\sitta-ut-web\`

| Nama Berkas | Lokasi Lengkap | Fungsi & Peran |
|:---|:---|:---|
| **README.md** | `sitta-ut-web/README.md` | Ringkasan teknis proyek, panduan instalasi, dan cara menjalankan. |
| **DOKUMENTASI.md** | `sitta-ut-web/DOKUMENTASI.md` | Dokumen laporan praktikum ini (arsitektur, rincian komponen, & alur logika). |
| **index.html** | `sitta-ut-web/index.html` | Antarmuka halaman masuk (*Login*), form validasi, alert, dan modal bantuan. |
| **dashboard.html** | `sitta-ut-web/dashboard.html` | Halaman beranda utama dengan sapaan waktu otomatis, jam digital, dan 6 modul navigasi. |
| **stok.html** | `sitta-ut-web/stok.html` | Tabel katalog stok modul bahan ajar UT serta form penambahan stok interaktif (DOM modal). |
| **tracking.html** | `sitta-ut-web/tracking.html` | Antarmuka pelacakan ekspedisi bahan ajar (DO), status terkini, dan timeline kronologis. |
| **style.css** | `sitta-ut-web/css/style.css` | Lembar gaya desain antarmuka, variabel warna institusional UT, tipografi, dan responsivitas. |
| **data.js** | `sitta-ut-web/js/data.js` | Modul sumber data statis: `dataPengguna`, `dataBahanAjar`, dan `dataTracking`. |
| **script.js** | `sitta-ut-web/js/script.js` | Modul skrip pengendali logika bisnis, manipulasi DOM, validasi, dan event listeners. |
| **img/** | `sitta-ut-web/img/` | Direktori aset grafis, logo UT, serta gambar sampul buku materi pokok. |

---

### III. DATA MASTER & KREDENSIAL PENGUJIAN
Sumber data didefinisikan pada berkas `js/data.js` dengan rincian berikut:

#### 1. Data Akun Pengguna (`dataPengguna`)
Digunakan untuk menguji fungsi autentikasi pada `index.html`:
- **Akun 1:** `rina@ut.ac.id` | Kata Sandi: `rina123` (Role: UPBJJ-UT, Lokasi: UPBJJ Jakarta)
- **Akun 2:** `agus@ut.ac.id` | Kata Sandi: `agus123` (Role: UPBJJ-UT, Lokasi: UPBJJ Makassar)
- **Akun 3:** `siti@ut.ac.id` | Kata Sandi: `siti123` (Role: Puslaba, Lokasi: Pusat)
- **Akun 4:** `doni@ut.ac.id` | Kata Sandi: `doni123` (Role: Fakultas, Lokasi: FISIP)
- **Akun 5:** `admin@ut.ac.id` | Kata Sandi: `admin123` (Role: Administrator, Lokasi: Pusat)

#### 2. Data Bahan Ajar (`dataBahanAjar`)
Memuat katalog awal 5 modul BMP UT:
1. `ASIP4301` - Pengantar Ilmu Komunikasi (Edisi 2, Stok: 548, Lokasi: 0TMP01)
2. `EKMA4216` - Manajemen Keuangan (Edisi 3, Stok: 392, Lokasi: 0JKT01)
3. `EKMA4310` - Kepemimpinan (Edisi 1, Stok: 278, Lokasi: 0SBY02)
4. `BIOL4211` - Mikrobiologi Dasar (Edisi 2, Stok: 165, Lokasi: 0MLG01)
5. `PAUD4401` - Perkembangan Anak Usia Dini (Edisi 4, Stok: 204, Lokasi: 0UPBJJBDG)

#### 3. Data Pelacakan Pengiriman (`dataTracking`)
Digunakan untuk menguji pelacakan paket bahan ajar pada `tracking.html`:
- **DO 2023001234**: Pengiriman JNE Express untuk Rina Wulandari (Status: *Dalam Perjalanan*).
- **DO 2023005678**: Pengiriman Pos Indonesia untuk Agus Pranoto (Status: *Selesai Antar / Terkirim*).

---

### IV. PENJELASAN LOGIKA PEMROGRAMAN & IMPLEMENTASI TEKNIS

#### 1. Mekanisme Autentikasi & Penyimpanan Sesi
- **Pemeriksaan Input**: Fungsi `handleLoginSubmit()` pada `js/script.js` memvalidasi kelengkapan isian formulir.
- **Validasi Kredensial**: Input email dan kata sandi dicocokkan dengan objek pada `dataPengguna`. Jika tidak valid, kotak peringatan kesalahan ditampilkan (`#loginAlertBox`).
- **Persistensi State**: Apabila sukses, data pengguna aktif disimpan ke `localStorage` dengan kunci `sitta_current_user`, kemudian pengguna dialihkan ke `dashboard.html`.

#### 2. Sapaan Berbasis Waktu & Jam Digital
- Pada `dashboard.html`, fungsi `updateDashboardGreeting()` mengeksekusi metode `new Date().getHours()`.
  - Pukul `04:00 - 10:59`: "Selamat Pagi"
  - Pukul `11:00 - 14:59`: "Selamat Siang"
  - Pukul `15:00 - 17:59`: "Selamat Sore"
  - Pukul `18:00 - 03:59`: "Selamat Malam"
- Jam digital dinamis diperbarui secara berulang setiap 1000 milidetik via `setInterval()`.

#### 3. Manipulasi DOM Dinamis pada Penambahan Stok
- Pada `stok.html`, tombol "Tambah Stok Bahan Ajar" memicu pembukaan elemen dialog modal `#modalTambahStok`.
- Ketika form disubmit via `handleTambahStokSubmit()`:
  1. Data input divalidasi tidak boleh kosong dan jumlah stok harus berupa angka positif.
  2. Objek bahan ajar baru dibentuk dan ditambahkan ke memori lokal (`localStorage`).
  3. Baris tabel HTML baru (`<tr>`) dibuat secara dinamis menggunakan elemen DOM (`document.createElement('tr')`) dan diinjeksi ke urutan paling atas (`tbody.prepend(row)`).
  4. Efek visual sorotan (*highlight*) diberikan pada baris baru selama beberapa detik untuk memberikan umpan balik langsung kepada pengguna.
  5. Jumlah total judul pada kartu ringkasan langsung bertambah secara reaktif.

#### 4. Pelacakan Ekspedisi Interaktif
- Pada `tracking.html`, fungsi `lacakNomorDO(nomorDO)` membaca data dari `dataTracking`.
- Jika nomor ditemukan, seluruh rincian pengiriman ditampilkan beserta rute riwayat perjalanan berupa garis waktu vertikal (*timeline stepper*).
- Jika nomor tidak ditemukan, sistem menampilkan pesan status *"Nomor DO tidak ditemukan"*.

---

### V. KESIMPULAN
Aplikasi web SITTA UT telah memenuhi seluruh kaidah pemrograman web berbasis HTML5, CSS3 murni, dan Vanilla JavaScript (DOM Manipulation). Aplikasi dapat dijalankan langsung di berbagai peramban modern tanpa konfigurasi server yang rumit.
