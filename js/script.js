/**
 * ==============================================================================
 * TUGAS PRAKTIKUM PEMROGRAMAN WEB - SITTA UNIVERSITAS TERBUKA
 * LOGIKA JAVASCRIPT DOM, VALIDASI, & INTERAKSI UI (js/script.js)
 * ==============================================================================
 * Arsitektur front-end murni (Vanilla JavaScript DOM Manipulation):
 * 1. Manajemen State Sesi & LocalStorage
 * 2. Fungsi Helper UI (Toast, Modal, Format Data)
 * 3. Halaman Login (index.html): Validasi Kredensial, Alert Pop-up, & Modal
 * 4. Halaman Dashboard (dashboard.html): Date Methods (Sapaan Waktu), Clock, 6 Menus
 * 5. Halaman Tracking (tracking.html): Pencarian DO, Data Binding, Dynamic Timeline
 * 6. Halaman Stok (stok.html): Render data.js, Penambahan Baris DOM Tanpa Reload
 * 7. Inisialisasi & Penanganan Logout Global
 * ==============================================================================
 */

// ==============================================================================
// 1. MANAJEMEN STATE & STORAGE
// ==============================================================================
const STORAGE_KEYS = {
  CURRENT_USER: 'sitta_current_user',
  STOCK_LIST: 'sitta_stock_list'
};

/**
 * Mengambil data bahan ajar dari localStorage atau default dari js/data.js
 * @returns {Array} Daftar bahan ajar
 */
function getStockData() {
  const stored = localStorage.getItem(STORAGE_KEYS.STOCK_LIST);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Gagal membaca data stok dari localStorage:", e);
    }
  }

  // Jika belum ada di localStorage, gunakan data default dari data.js
  if (typeof dataBahanAjar !== 'undefined' && Array.isArray(dataBahanAjar)) {
    const defaultData = JSON.parse(JSON.stringify(dataBahanAjar));
    localStorage.setItem(STORAGE_KEYS.STOCK_LIST, JSON.stringify(defaultData));
    return defaultData;
  }
  return [];
}

/**
 * Menyimpan data bahan ajar ke localStorage
 * @param {Array} list - Array data bahan ajar yang akan disimpan
 */
function saveStockData(list) {
  localStorage.setItem(STORAGE_KEYS.STOCK_LIST, JSON.stringify(list));
}

/**
 * Mengambil data sesi pengguna aktif saat ini
 * @returns {Object} Data user yang login
 */
function getCurrentUser() {
  const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Gagal membaca session user:", e);
    }
  }

  // Default fallback user (Rina Wulandari - UPBJJ Jakarta)
  if (typeof dataPengguna !== 'undefined' && dataPengguna.length > 0) {
    return dataPengguna[0];
  }

  return {
    nama: "Rina Wulandari",
    email: "rina@ut.ac.id",
    role: "UPBJJ-UT",
    lokasi: "UPBJJ Jakarta"
  };
}

// ==============================================================================
// 2. HELPER UI: TOAST NOTIFIKASI, MODAL BOX, & QUICK FILL
// ==============================================================================

/**
 * Menampilkan pesan toast melayang di pojok kanan atas
 * @param {string} title - Judul notifikasi
 * @param {string} message - Isi pesan
 * @param {string} type - 'success' | 'danger' | 'warning' | 'info'
 */
function showToast(title, message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: '✅',
    danger: '⚠️',
    warning: '🔔',
    info: 'ℹ️'
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || 'ℹ️'}</span>
    <div class="toast-message">
      <div class="toast-title">${title}</div>
      <div>${message}</div>
    </div>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 50);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

/**
 * Membuka Modal Box berdasarkan ID
 * @param {string} modalId - ID elemen modal
 */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'flex';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Menutup Modal Box berdasarkan ID
 * @param {string} modalId - ID elemen modal
 */
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// Ekspos fungsi modal dan helper ke window agar selalu dapat dipanggil dari atribut onclick HTML
window.openModal = openModal;
window.closeModal = closeModal;
window.fillLoginForm = fillLoginForm;

// Event listener global untuk menutup modal jika klik di luar box
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Event listener global untuk menutup modal dengan tombol keyboard Escape
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.style.overflow = '';
  }
});

/**
 * Mengisi cepat kolom login (Bantuan Pengujian Dosen/Penilai Praktikum)
 */
function fillLoginForm(email, password) {
  const emailInput = document.getElementById('inputEmail');
  const passwordInput = document.getElementById('inputPassword');
  if (emailInput && passwordInput) {
    emailInput.value = email;
    passwordInput.value = password;
    showToast("Akun Terpilih", `Email ${email} telah diisikan ke formulir login.`, "info");
  }
}

// ==============================================================================
// 3. LOGIKA HALAMAN LOGIN (index.html)
// ==============================================================================
function initLogin() {
  const formLogin = document.getElementById('formLogin');
  const inputEmail = document.getElementById('inputEmail');
  const inputPassword = document.getElementById('inputPassword');
  const btnTogglePwd = document.getElementById('btnTogglePassword');
  const btnLupaPassword = document.getElementById('btnLupaPassword');
  const btnDaftar = document.getElementById('btnDaftar');
  const formLupaPassword = document.getElementById('formLupaPassword');
  const formDaftar = document.getElementById('formDaftar');
  const alertBox = document.getElementById('loginAlertBox');
  const alertText = document.getElementById('loginAlertText');

  // Fitur Toggle Tampilkan / Sembunyikan Password
  if (btnTogglePwd && inputPassword) {
    btnTogglePwd.addEventListener('click', () => {
      const isPassword = inputPassword.type === 'password';
      inputPassword.type = isPassword ? 'text' : 'password';
      btnTogglePwd.textContent = isPassword ? '🙈' : '👁️';
    });
  }

  // Tombol Modal Lupa Password
  if (btnLupaPassword) {
    btnLupaPassword.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('modalLupaPassword');
    });
  }

  // Tombol Modal Daftar Baru
  if (btnDaftar) {
    btnDaftar.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('modalDaftar');
    });
  }

  // Penanganan Submit Form Login
  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailVal = inputEmail.value.trim();
      const passwordVal = inputPassword.value.trim();

      // KETENTUAN WAJIB:
      // "Validasi dengan dataPengguna di data.js. Jika kosong/salah, munculkan alert/pop-up
      // 'email/password yang anda masukkan salah'."

      const pesanKesalahan = "email/password yang anda masukkan salah";

      // 1. Validasi Input Kosong
      if (!emailVal || !passwordVal) {
        if (alertBox && alertText) {
          alertText.textContent = pesanKesalahan;
          alertBox.style.display = 'flex';
        }
        alert(pesanKesalahan);
        showToast("Autentikasi Gagal", pesanKesalahan, "danger");
        return;
      }

      // 2. Pencocokan Kredensial dengan array dataPengguna di data.js
      let userDitemukan = null;
      if (typeof dataPengguna !== 'undefined' && Array.isArray(dataPengguna)) {
        userDitemukan = dataPengguna.find(u => 
          u.email.toLowerCase() === emailVal.toLowerCase() && u.password === passwordVal
        );
      }

      // 3. Evaluasi Hasil Pencocokan
      if (userDitemukan) {
        // Sembunyikan pesan kesalahan jika sebelumnya ada
        if (alertBox) alertBox.style.display = 'none';

        // Simpan sesi pengguna yang berhasil login ke localStorage
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userDitemukan));

        showToast("Login Berhasil", `Selamat datang, ${userDitemukan.nama} (${userDitemukan.role})!`, "success");

        // Alihkan halaman ke dashboard.html
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 700);
      } else {
        // Jika tidak cocok, munculkan alert sesuai ketentuan tugas
        if (alertBox && alertText) {
          alertText.textContent = pesanKesalahan;
          alertBox.style.display = 'flex';
        }
        alert(pesanKesalahan);
        showToast("Akses Ditolak", pesanKesalahan, "danger");
      }
    });
  }

  // Penanganan Form Lupa Password
  if (formLupaPassword) {
    formLupaPassword.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailReset = document.getElementById('inputResetEmail').value.trim();
      if (!emailReset) {
        alert("Silakan masukkan email Anda!");
        return;
      }
      closeModal('modalLupaPassword');
      alert(`Tautan pemulihan kata sandi telah dikirim ke email: ${emailReset}`);
      showToast("Terkirim", "Silakan periksa kotak masuk email Anda.", "success");
      formLupaPassword.reset();
    });
  }

  // Penanganan Form Registrasi Akun Baru
  if (formDaftar) {
    formDaftar.addEventListener('submit', (e) => {
      e.preventDefault();
      const nama = document.getElementById('regNama').value.trim();
      const role = document.getElementById('regRole').value;
      const lokasi = document.getElementById('regLokasi').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const password = document.getElementById('regPassword').value.trim();

      if (!nama || !email || !password || !lokasi) {
        alert("Semua field formulir pendaftaran wajib diisi!");
        return;
      }

      // Buat objek pengguna baru dan tambahkan ke memory dataPengguna
      const userBaru = {
        id: Date.now(),
        nama,
        email,
        password,
        role: role || "UPBJJ-UT",
        lokasi: lokasi || "UPBJJ Jakarta"
      };

      if (typeof dataPengguna !== 'undefined') {
        dataPengguna.push(userBaru);
      }

      closeModal('modalDaftar');
      alert(`Pendaftaran Berhasil!\nSelamat datang, ${nama}. Akun Anda siap digunakan.`);
      showToast("Registrasi Berhasil", "Akun baru telah dibuat. Silakan login.", "success");

      // Otomatis isikan ke form login
      if (inputEmail && inputPassword) {
        inputEmail.value = email;
        inputPassword.value = password;
      }
      formDaftar.reset();
    });
  }
}

// ==============================================================================
// 4. LOGIKA HALAMAN DASHBOARD (dashboard.html)
// ==============================================================================
function initDashboard() {
  const user = getCurrentUser();

  // Tampilkan Informasi User ke Navbar & Elemen Profil
  const navUserName = document.getElementById('navUserName');
  const navUserRole = document.getElementById('navUserRole');
  const navAvatarInitial = document.getElementById('navAvatarInitial');
  const displayUserLokasi = document.getElementById('displayUserLokasi');
  const displayUserRolePill = document.getElementById('displayUserRolePill');

  if (user) {
    if (navUserName) navUserName.textContent = user.nama;
    if (navUserRole) navUserRole.textContent = `${user.role} - ${user.lokasi}`;
    if (navAvatarInitial) navAvatarInitial.textContent = user.nama.charAt(0).toUpperCase();
    if (displayUserLokasi) displayUserLokasi.textContent = user.lokasi;
    if (displayUserRolePill) displayUserRolePill.textContent = `Portal Terpadu • ${user.role} (${user.lokasi})`;
  }

  /**
   * KETENTUAN WAJIB:
   * "Buat fungsi JavaScript Date Methods untuk menampilkan teks sapaan otomatis
   * ('Selamat pagi', 'Selamat siang', 'Selamat sore', 'Selamat malam') berdasarkan waktu lokal"
   */
  function updateGreetingAndClock() {
    const waktuSekarang = new Date();
    const jam = waktuSekarang.getHours(); // Mengambil jam lokal (0 - 23)

    let sapaan = "Selamat malam";
    let icon = "🌙";

    // Rentang waktu sapaan:
    // Pagi  : 04.00 - 10.59
    // Siang : 11.00 - 14.59
    // Sore  : 15.00 - 17.59
    // Malam : 18.00 - 03.59
    if (jam >= 4 && jam < 11) {
      sapaan = "Selamat pagi";
      icon = "🌅";
    } else if (jam >= 11 && jam < 15) {
      sapaan = "Selamat siang";
      icon = "☀️";
    } else if (jam >= 15 && jam < 18) {
      sapaan = "Selamat sore";
      icon = "🌇";
    } else {
      sapaan = "Selamat malam";
      icon = "🌙";
    }

    // Update Elemen Sapaan Dinamis
    const greetingTextEl = document.getElementById('greetingText');
    const greetingIconEl = document.getElementById('greetingIcon');

    if (greetingTextEl) {
      const namaPanggilan = user ? user.nama : 'Pengguna SITTA';
      greetingTextEl.textContent = `${sapaan}, ${namaPanggilan}!`;
    }

    if (greetingIconEl) {
      greetingIconEl.textContent = icon;
    }

    // Jam Digital Real-time dengan JavaScript Date Methods
    const clockTimeEl = document.getElementById('liveClockTime');
    const clockDateEl = document.getElementById('liveClockDate');

    if (clockTimeEl) {
      const hh = String(waktuSekarang.getHours()).padStart(2, '0');
      const mm = String(waktuSekarang.getMinutes()).padStart(2, '0');
      const ss = String(waktuSekarang.getSeconds()).padStart(2, '0');
      clockTimeEl.textContent = `${hh}:${mm}:${ss} WIB`;
    }

    if (clockDateEl) {
      const opsiFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      clockDateEl.textContent = waktuSekarang.toLocaleDateString('id-ID', opsiFormat);
    }
  }

  // Eksekusi fungsi sapaan saat halaman dimuat dan perbarui setiap 1 detik
  updateGreetingAndClock();
  setInterval(updateGreetingAndClock, 1000);

  // Quick Tracking Form di Beranda
  const formQuickTrack = document.getElementById('formQuickTrack');
  if (formQuickTrack) {
    formQuickTrack.addEventListener('submit', (e) => {
      e.preventDefault();
      const noDO = document.getElementById('inputQuickDO').value.trim();
      if (noDO) {
        window.location.href = `tracking.html?do=${encodeURIComponent(noDO)}`;
      }
    });
  }
}

// ==============================================================================
// 5. LOGIKA HALAMAN TRACKING (tracking.html)
// ==============================================================================
function initTracking() {
  const formTracking = document.getElementById('formTracking');
  const inputNoDO = document.getElementById('inputNoDO');
  const trackingResultContainer = document.getElementById('trackingResultContainer');
  const notFoundContainer = document.getElementById('trackingNotFound');

  /**
   * KETENTUAN WAJIB:
   * "Kolom input nomor DO dan tombol 'Cari'. Hubungkan dengan objek dataTracking di data.js.
   * Tampilkan nama mahasiswa, status pengiriman, ekspedisi, tanggal kirim, total, dan
   * detail linimasa/perjalanan paket secara dinamis."
   */
  function renderTracking(nomorDOPencarian) {
    if (!nomorDOPencarian) return;

    // Bersihkan spasi dan ambil data dari objek dataTracking
    const key = nomorDOPencarian.trim();
    let dataDO = null;

    if (typeof dataTracking !== 'undefined') {
      dataDO = dataTracking[key];
    }

    // Jika Nomor DO tidak ditemukan di dataTracking
    if (!dataDO) {
      if (trackingResultContainer) trackingResultContainer.style.display = 'none';
      if (notFoundContainer) {
        notFoundContainer.style.display = 'block';
        const notFoundQueryEl = document.getElementById('notFoundQuery');
        if (notFoundQueryEl) notFoundQueryEl.textContent = key;
      }
      showToast("DO Tidak Ditemukan", `Nomor DO "${key}" tidak ada pada basis data.`, "warning");
      return;
    }

    // Jika Ditemukan: Tampilkan Kontainer Hasil Pelacakan
    if (notFoundContainer) notFoundContainer.style.display = 'none';
    if (trackingResultContainer) {
      trackingResultContainer.style.display = 'block';

      // 1. Nomor DO & Kode Paket
      const resNoDO = document.getElementById('resNoDO');
      const resPaket = document.getElementById('resPaket');
      if (resNoDO) resNoDO.textContent = dataDO.nomorDO || key;
      if (resPaket) resPaket.textContent = dataDO.paket || '-';

      // 2. Status Pengiriman & Badge Warna
      const resStatusBadge = document.getElementById('resStatusBadge');
      if (resStatusBadge) {
        resStatusBadge.textContent = dataDO.status;
        if (dataDO.status.toLowerCase().includes('selesai') || dataDO.status.toLowerCase().includes('terima')) {
          resStatusBadge.className = 'badge badge-success';
        } else if (dataDO.status.toLowerCase().includes('perjalanan') || dataDO.status.toLowerCase().includes('kirim')) {
          resStatusBadge.className = 'badge badge-warning';
        } else {
          resStatusBadge.className = 'badge badge-info';
        }
      }

      // 3. Nama Mahasiswa, Ekspedisi, Tanggal Kirim, & Total
      const resNama = document.getElementById('resNama');
      const resEkspedisi = document.getElementById('resEkspedisi');
      const resTglKirim = document.getElementById('resTglKirim');
      const resTotal = document.getElementById('resTotal');

      if (resNama) resNama.textContent = dataDO.nama;
      if (resEkspedisi) resEkspedisi.textContent = dataDO.ekspedisi;
      if (resTglKirim) resTglKirim.textContent = dataDO.tanggalKirim;
      if (resTotal) resTotal.textContent = dataDO.total;

      // 4. Detail Linimasa / Riwayat Perjalanan Paket Secara Dinamis
      const timelineContainer = document.getElementById('resTimeline');
      if (timelineContainer) {
        timelineContainer.innerHTML = '';

        if (Array.isArray(dataDO.perjalanan) && dataDO.perjalanan.length > 0) {
          dataDO.perjalanan.forEach((step, index) => {
            const isLatest = index === dataDO.perjalanan.length - 1;
            const itemLi = document.createElement('li');
            itemLi.className = `timeline-item ${isLatest ? 'active' : 'completed'}`;

            itemLi.innerHTML = `
              <div class="timeline-dot">${isLatest ? '●' : '✓'}</div>
              <div class="timeline-time">${step.waktu}</div>
              <div class="timeline-desc" style="font-size: 0.92rem; color: #1e293b; font-weight: ${isLatest ? '700' : '500'};">
                ${step.keterangan}
              </div>
            `;
            timelineContainer.appendChild(itemLi);
          });
        } else {
          timelineContainer.innerHTML = '<li style="color: #64748b;">Belum ada riwayat perjalanan paket.</li>';
        }
      }

      // Animasi scroll lembut ke hasil tracking
      trackingResultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      showToast("Data Ditemukan", `Informasi pengiriman DO ${dataDO.nomorDO} berhasil ditampilkan.`, "success");
    }
  }

  // Handle Submit Form Pencarian
  if (formTracking) {
    formTracking.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputVal = inputNoDO.value.trim();
      if (!inputVal) {
        alert("Silakan ketik nomor Delivery Order (DO) terlebih dahulu!");
        return;
      }
      renderTracking(inputVal);
    });
  }

  // Handle Klik Cepat pada Tombol Chip Contoh (2023001234 & 2023005678)
  document.querySelectorAll('.chip-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const doVal = e.target.dataset.do || e.target.textContent.trim();
      if (inputNoDO) inputNoDO.value = doVal;
      renderTracking(doVal);
    });
  });

  // Deteksi Otomatis Parameter URL (contoh: tracking.html?do=2023001234)
  const urlParams = new URLSearchParams(window.location.search);
  const doFromUrl = urlParams.get('do');
  if (doFromUrl) {
    if (inputNoDO) inputNoDO.value = doFromUrl;
    renderTracking(doFromUrl);
  } else if (inputNoDO && inputNoDO.value) {
    // Render default jika sudah ada value
    renderTracking(inputNoDO.value);
  }
}

// ==============================================================================
// 6. LOGIKA HALAMAN STOK BAHAN AJAR (stok.html)
// ==============================================================================
function initStok() {
  let stockData = getStockData();
  let currentView = 'table'; // 'table' (default) atau 'grid'

  const tableBody = document.getElementById('stockTableBody');
  const tableCard = document.getElementById('stockTableCard');
  const gridContainer = document.getElementById('bookCardsGrid');
  const inputSearch = document.getElementById('inputSearchStock');
  const selectLokasi = document.getElementById('selectLokasiFilter');
  const btnViewGrid = document.getElementById('btnViewGrid');
  const btnViewTable = document.getElementById('btnViewTable');
  const formTambahStok = document.getElementById('formTambahStok');
  const btnResetData = document.getElementById('btnResetData');
  const btnOpenTambahStok = document.getElementById('btnOpenTambahStok');

  // Buka Modal Tambah Stok
  if (btnOpenTambahStok) {
    btnOpenTambahStok.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('modalTambahStok');
    });
  }

  // Metrik Statistik Ringkasan
  const statTotalJudul = document.getElementById('statTotalJudul');
  const statTotalFisik = document.getElementById('statTotalFisik');
  const statTotalLokasi = document.getElementById('statTotalLokasi');

  /**
   * Menghitung dan memperbarui kartu metrik stok di bagian atas
   */
  function updateMetrics() {
    if (statTotalJudul) statTotalJudul.textContent = stockData.length;

    const totalFisik = stockData.reduce((acc, item) => acc + (Number(item.stok) || 0), 0);
    if (statTotalFisik) statTotalFisik.textContent = totalFisik.toLocaleString('id-ID');

    // Hitung variasi lokasi unik
    const uniqueLocations = new Set(stockData.map(item => item.kodeLokasi));
    if (statTotalLokasi) statTotalLokasi.textContent = `${uniqueLocations.size} Titik Lokasi`;
  }

  /**
   * KETENTUAN WAJIB:
   * "Render dataBahanAjar secara dinamis dari data.js ke dalam tabel atau kartu
   * lengkap dengan gambar cover dari folder img/."
   */
  function renderTableView(items) {
    if (!tableBody) return;
    tableBody.innerHTML = '';

    if (items.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align: center; padding: 40px; color: #64748b;">
            🔍 Tidak ditemukan bahan ajar yang cocok dengan kata kunci pencarian.
          </td>
        </tr>
      `;
      return;
    }

    items.forEach((item, index) => {
      const tr = document.createElement('tr');
      tr.id = `row-stock-${item.kodeBarang}`;

      // Tentukan status stok
      const isCritical = Number(item.stok) < 200;
      const statusBadge = isCritical 
        ? '<span class="badge badge-warning">Stok Terbatas</span>' 
        : '<span class="badge badge-success">Tersedia</span>';

      tr.innerHTML = `
        <td style="text-align: center;">
          <img 
            src="${item.cover || 'img/default-book.svg'}" 
            alt="Cover ${item.namaBarang}" 
            class="table-cover-thumb"
            onerror="this.src='img/default-book.svg'"
          >
        </td>
        <td>
          <span style="font-family: monospace; font-weight: 700; color: #003f7a; background: #eff6ff; padding: 3px 8px; border-radius: 4px;">
            ${item.kodeLokasi}
          </span>
        </td>
        <td>
          <strong style="color: #002b5c;">${item.kodeBarang}</strong>
        </td>
        <td>
          <div style="font-weight: 600; color: #0f172a;">${item.namaBarang}</div>
          <div style="font-size: 0.76rem; color: #64748b;">Buku Materi Pokok Universitas Terbuka</div>
        </td>
        <td>
          <span class="badge badge-info">${item.jenisBarang || 'BMP'}</span>
        </td>
        <td>
          <span style="font-weight: 600;">Edisi ${item.edisi}</span>
        </td>
        <td>
          <span style="font-size: 1rem; font-weight: 800; color: ${isCritical ? '#b45309' : '#047857'};">
            ${Number(item.stok).toLocaleString('id-ID')}
          </span>
        </td>
        <td>${statusBadge}</td>
        <td style="text-align: center;">
          <div style="display: inline-flex; gap: 4px;">
            <button 
              type="button" 
              class="table-action-btn" 
              onclick="adjustStock('${item.kodeBarang}', 10)" 
              title="Tambah 10 stok fisik"
            >+10</button>
            <button 
              type="button" 
              class="table-action-btn" 
              onclick="adjustStock('${item.kodeBarang}', -10)" 
              title="Kurang 10 stok fisik"
            >-10</button>
            <button 
              type="button" 
              class="table-action-btn btn-delete" 
              onclick="deleteStock('${item.kodeBarang}')" 
              title="Hapus baris data ini"
            >🗑️</button>
          </div>
        </td>
      `;

      tableBody.appendChild(tr);
    });
  }

  /**
   * Render Mode Kartu (Grid View)
   */
  function renderGridView(items) {
    if (!gridContainer) return;
    gridContainer.innerHTML = '';

    if (items.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px; background: #ffffff; border-radius: 16px; border: 1px dashed #cbd5e1;">
          <p style="font-size: 1.1rem; color: #64748b; font-weight: 600;">Tidak ditemukan bahan ajar yang cocok dengan kata kunci pencarian.</p>
        </div>
      `;
      return;
    }

    items.forEach(item => {
      const isCritical = Number(item.stok) < 200;
      const statusBadge = isCritical 
        ? '<span class="badge badge-warning book-badge-status">Stok Terbatas</span>' 
        : '<span class="badge badge-success book-badge-status">Tersedia</span>';

      const card = document.createElement('div');
      card.className = 'book-card';
      card.innerHTML = `
        <div class="book-cover-wrap">
          <img 
            src="${item.cover || 'img/default-book.svg'}" 
            alt="Cover ${item.namaBarang}" 
            class="book-cover-img"
            onerror="this.src='img/default-book.svg'"
          >
          ${statusBadge}
        </div>
        <div class="book-body">
          <div class="book-category">${item.jenisBarang || 'BMP'} • Edisi ${item.edisi}</div>
          <h3 class="book-title">${item.namaBarang}</h3>
          <div class="book-code-edisi">Kode: <strong>${item.kodeBarang}</strong></div>
          
          <ul class="book-details-list">
            <li><span>Lokasi Rak/Gudang:</span> <strong>${item.kodeLokasi}</strong></li>
            <li><span>Jumlah Stok Fisik:</span> <strong style="color: ${isCritical ? '#b45309' : '#047857'}; font-size: 1rem;">${item.stok} Modul</strong></li>
          </ul>

          <div class="book-footer">
            <span class="badge badge-info">UPBJJ UT</span>
            <button 
              type="button" 
              class="btn btn-secondary btn-sm" 
              onclick="adjustStock('${item.kodeBarang}', 20)"
            >
              +20 Stok ➕
            </button>
          </div>
        </div>
      `;
      gridContainer.appendChild(card);
    });
  }

  /**
   * Filter and Render Master
   */
  function filterAndRender() {
    const keyword = inputSearch ? inputSearch.value.trim().toLowerCase() : '';
    const selectedLokasi = selectLokasi ? selectLokasi.value : 'SEMUA';

    const filtered = stockData.filter(item => {
      const matchKeyword = 
        item.namaBarang.toLowerCase().includes(keyword) ||
        item.kodeBarang.toLowerCase().includes(keyword) ||
        item.kodeLokasi.toLowerCase().includes(keyword);

      const matchLokasi = (selectedLokasi === 'SEMUA' || item.kodeLokasi === selectedLokasi);

      return matchKeyword && matchLokasi;
    });

    if (currentView === 'table') {
      if (tableCard) tableCard.style.display = 'block';
      if (gridContainer) gridContainer.style.display = 'none';
      renderTableView(filtered);
    } else {
      if (tableCard) tableCard.style.display = 'none';
      if (gridContainer) gridContainer.style.display = 'grid';
      renderGridView(filtered);
    }

    updateMetrics();
  }

  // Event Listeners: Search & Filter
  if (inputSearch) inputSearch.addEventListener('input', filterAndRender);
  if (selectLokasi) selectLokasi.addEventListener('change', filterAndRender);

  // Toggle View Mode: Tabel vs Grid
  if (btnViewTable && btnViewGrid) {
    btnViewTable.addEventListener('click', () => {
      currentView = 'table';
      btnViewTable.classList.add('active');
      btnViewGrid.classList.remove('active');
      filterAndRender();
    });

    btnViewGrid.addEventListener('click', () => {
      currentView = 'grid';
      btnViewGrid.classList.add('active');
      btnViewTable.classList.remove('active');
      filterAndRender();
    });
  }

  /**
   * KETENTUAN WAJIB:
   * "Buat fitur interaktif DOM menggunakan form dan tombol 'Tambah Stok'
   * agar baris data baru bisa langsung ditambahkan secara dinamis tanpa reload halaman."
   */
  if (formTambahStok) {
    formTambahStok.addEventListener('submit', (e) => {
      // 1. Mencegah reload halaman secara default oleh browser
      e.preventDefault();

      // 2. Mengambil seluruh nilai dari formulir modal
      const kodeLokasi = document.getElementById('inputKodeLokasi').value.trim().toUpperCase();
      const kodeBarang = document.getElementById('inputKodeBarang').value.trim().toUpperCase();
      const namaBarang = document.getElementById('inputNamaBarang').value.trim();
      const jenisBarang = document.getElementById('inputJenisBarang').value.trim() || 'BMP';
      const edisi = document.getElementById('inputEdisi').value.trim() || '1';
      const stokVal = parseInt(document.getElementById('inputStok').value, 10);
      const coverVal = document.getElementById('selectCover').value || 'img/default-book.svg';

      // 3. Validasi Form
      if (!kodeLokasi || !kodeBarang || !namaBarang || isNaN(stokVal) || stokVal < 1) {
        alert("Mohon lengkapi kode lokasi, kode barang, nama bahan ajar, dan jumlah stok dengan benar!");
        return;
      }

      // 4. Periksa apakah barang sudah terdaftar sebelumnya
      const existingItem = stockData.find(item => item.kodeBarang === kodeBarang);
      if (existingItem) {
        // Jika sudah ada, tambahkan stoknya
        existingItem.stok = Number(existingItem.stok) + stokVal;
        showToast("Stok Diperbarui", `Menambahkan ${stokVal} stok ke modul ${kodeBarang}.`, "info");
      } else {
        // 5. Buat objek data bahan ajar baru sesuai struktur dataBahanAjar
        const newStockItem = {
          kodeLokasi,
          kodeBarang,
          namaBarang,
          jenisBarang,
          edisi,
          stok: stokVal,
          cover: coverVal
        };

        // Masukkan ke posisi paling awal dari array (DOM manipulation unshift)
        stockData.unshift(newStockItem);
      }

      // 6. Sinkronkan perubahan ke localStorage agar tersimpan
      saveStockData(stockData);

      // 7. RENDER ULANG DOM SECARA LANGSUNG TANPA RELOAD HALAMAN
      filterAndRender();

      // 8. Berikan efek highlight animasi pada baris baru yang ditambahkan
      const newRow = document.getElementById(`row-stock-${kodeBarang}`);
      if (newRow) {
        newRow.classList.add('row-highlight');
        newRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // 9. Tutup modal form dan reset input form
      closeModal('modalTambahStok');
      formTambahStok.reset();

      // 10. Tampilkan notifikasi keberhasilan
      showToast("Berhasil Ditambahkan", `Bahan ajar ${kodeBarang} - "${namaBarang}" berhasil masuk ke sistem.`, "success");
    });
  }

  // Fungsi Global: Ubah Stok (+ / -) dari Aksi Tabel
  window.adjustStock = function(kodeBarang, delta) {
    const target = stockData.find(item => item.kodeBarang === kodeBarang);
    if (!target) return;

    const newStock = Number(target.stok) + delta;
    if (newStock < 0) {
      alert("Stok bahan ajar tidak boleh kurang dari 0!");
      return;
    }

    target.stok = newStock;
    saveStockData(stockData);
    filterAndRender();
    showToast("Stok Diselaraskan", `Stok ${kodeBarang} kini berjumlah ${newStock} modul.`, "info");
  };

  // Fungsi Global: Hapus Baris Stok dari DOM
  window.deleteStock = function(kodeBarang) {
    if (confirm(`Apakah Anda yakin ingin menghapus bahan ajar "${kodeBarang}" dari katalog?`)) {
      stockData = stockData.filter(item => item.kodeBarang !== kodeBarang);
      saveStockData(stockData);
      filterAndRender();
      showToast("Data Dihapus", `Modul ${kodeBarang} telah dihapus dari tabel.`, "warning");
    }
  };

  // Tombol Reset ke Data Awal dari data.js
  if (btnResetData) {
    btnResetData.addEventListener('click', () => {
      if (confirm("Kembalikan katalog stok ke data awal (default dari data.js)?")) {
        localStorage.removeItem(STORAGE_KEYS.STOCK_LIST);
        stockData = getStockData();
        filterAndRender();
        showToast("Reset Berhasil", "Data stok telah dikembalikan ke kondisi awal data.js.", "success");
      }
    });
  }

  // Inisialisasi Tampilan Awal
  filterAndRender();
}

// ==============================================================================
// 7. GLOBAL INITIALIZER & LOGOUT HANDLER
// ==============================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navbar Toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Handle Logout untuk semua tombol .btn-logout
  const btnLogoutList = document.querySelectorAll('.btn-logout');
  btnLogoutList.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm("Apakah Anda yakin ingin keluar dari SITTA Universitas Terbuka?")) {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
        window.location.href = 'index.html';
      }
    });
  });

  // Tampilkan Avatar Initial pada Pengguna Aktif di Navbar
  const user = getCurrentUser();
  const navUserName = document.getElementById('navUserName');
  const navUserRole = document.getElementById('navUserRole');
  const navAvatarInitial = document.getElementById('navAvatarInitial');

  if (user) {
    if (navUserName) navUserName.textContent = user.nama;
    if (navUserRole) navUserRole.textContent = `${user.role} (${user.lokasi})`;
    if (navAvatarInitial) navAvatarInitial.textContent = user.nama.charAt(0).toUpperCase();
  }

  // Deteksi Halaman Aktif Berdasarkan Elemen Unik DOM
  if (document.getElementById('formLogin')) {
    initLogin();
  } else if (document.getElementById('greetingText')) {
    initDashboard();
  } else if (document.getElementById('formTracking')) {
    initTracking();
  } else if (document.getElementById('stockTableCard') || document.getElementById('bookCardsGrid')) {
    initStok();
  }
});
