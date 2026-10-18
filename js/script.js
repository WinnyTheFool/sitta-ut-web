/**
 * ==============================================================================
 * SITTA UNIVERSITAS TERBUKA - JavaScript Utama (js/script.js)
 * ==============================================================================
 * Berisi logika untuk:
 * 1. Fungsi modal (buka/tutup)
 * 2. Halaman Login    : validasi form, tampilkan modal lupa password & daftar
 * 3. Halaman Dashboard: sapaan dinamis berdasarkan waktu lokal
 * 4. Halaman Tracking : cari DO, render hasil + timeline
 * 5. Halaman Stok     : render kartu buku, tambah stok via DOM
 * ==============================================================================
 */

/* ==========================================================================
   1. FUNGSI MODAL UMUM
   ========================================================================== */

function bukaModal(id) {
  var el = document.getElementById(id);
  if (el) el.classList.add('active');
}

function tutupModal(id) {
  var el = document.getElementById(id);
  if (el) el.classList.remove('active');
}

// Tutup modal jika klik di luar kotak
document.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

/* ==========================================================================
   2. HALAMAN LOGIN (index.html)
   ========================================================================== */

var formLogin = document.getElementById('formLogin');
if (formLogin) {

  // Tombol Lupa Password
  var btnLupa = document.getElementById('btnLupaPassword');
  if (btnLupa) {
    btnLupa.addEventListener('click', function() {
      bukaModal('modalLupaPassword');
    });
  }

  // Tombol Daftar
  var btnDaftar = document.getElementById('btnDaftar');
  if (btnDaftar) {
    btnDaftar.addEventListener('click', function() {
      bukaModal('modalDaftar');
    });
  }

  // Submit Form Login
  formLogin.addEventListener('submit', function(e) {
    e.preventDefault();

    var email    = document.getElementById('inputEmail').value.trim();
    var password = document.getElementById('inputPassword').value.trim();
    var alertBox = document.getElementById('loginAlert');
    var alertTxt = document.getElementById('loginAlertText');

    // Validasi kosong
    if (!email || !password) {
      alertTxt.textContent = 'Email dan password wajib diisi.';
      alertBox.style.display = 'flex';
      return;
    }

    // Cek kredensial ke dataPengguna
    var user = null;
    for (var i = 0; i < dataPengguna.length; i++) {
      if (dataPengguna[i].email === email && dataPengguna[i].password === password) {
        user = dataPengguna[i];
        break;
      }
    }

    if (user) {
      // Simpan sesi sederhana
      sessionStorage.setItem('namaPengguna', user.nama);
      sessionStorage.setItem('rolePengguna', user.role);
      sessionStorage.setItem('lokasiPengguna', user.lokasi);

      alertBox.style.display = 'none';
      window.location.href = 'dashboard.html';
    } else {
      alertTxt.textContent = 'email/password yang anda masukkan salah';
      alertBox.style.display = 'flex';
    }
  });

  // Submit form lupa password
  var formLupa = document.getElementById('formLupaPassword');
  if (formLupa) {
    formLupa.addEventListener('submit', function(e) {
      e.preventDefault();
      tutupModal('modalLupaPassword');
      alert('Link reset password telah dikirim ke email Anda.');
    });
  }

  // Submit form daftar
  var formDaftar = document.getElementById('formDaftar');
  if (formDaftar) {
    formDaftar.addEventListener('submit', function(e) {
      e.preventDefault();
      tutupModal('modalDaftar');
      alert('Pendaftaran berhasil! Silakan login dengan akun baru Anda.');
      formDaftar.reset();
    });
  }
}

/* ==========================================================================
   3. HALAMAN DASHBOARD (dashboard.html)
   ========================================================================== */

var greetingEl = document.getElementById('greetingText');
if (greetingEl) {

  // Tampilkan nama pengguna di navbar
  var namaSimpan = sessionStorage.getItem('namaPengguna');
  var navName = document.getElementById('navUserName');
  if (navName && namaSimpan) {
    navName.textContent = namaSimpan;
  }

  // Sapaan dinamis berdasarkan waktu lokal
  function updateGreeting() {
    var now  = new Date();
    var jam  = now.getHours();
    var nama = sessionStorage.getItem('namaPengguna') || 'Pengguna';

    var salam = '';
    if (jam >= 5 && jam < 11) {
      salam = 'Selamat pagi, ' + nama;
    } else if (jam >= 11 && jam < 15) {
      salam = 'Selamat siang, ' + nama;
    } else if (jam >= 15 && jam < 19) {
      salam = 'Selamat sore, ' + nama;
    } else {
      salam = 'Selamat malam, ' + nama;
    }

    greetingEl.textContent = salam;
  }

  updateGreeting();
}

/* ==========================================================================
   4. HALAMAN TRACKING (tracking.html)
   ========================================================================== */

var btnCariDO = document.getElementById('btnCariDO');
if (btnCariDO) {

  // Tampilkan nama pengguna
  var navNameTrk = document.getElementById('navUserName');
  var namaSimpanTrk = sessionStorage.getItem('namaPengguna');
  if (navNameTrk && namaSimpanTrk) navNameTrk.textContent = namaSimpanTrk;

  // Fungsi render hasil tracking
  function renderTracking(noDO) {
    var resultDiv     = document.getElementById('trackingResult');
    var notFoundDiv   = document.getElementById('trackingNotFound');
    var notFoundQuery = document.getElementById('notFoundQuery');

    var data = dataTracking[noDO.trim()];

    if (!data) {
      resultDiv.style.display   = 'none';
      notFoundDiv.style.display = 'block';
      if (notFoundQuery) notFoundQuery.textContent = noDO;
      return;
    }

    notFoundDiv.style.display = 'none';
    resultDiv.style.display   = 'block';

    // Isi header
    document.getElementById('resNama').textContent  = data.nama.toUpperCase();
    document.getElementById('resNoDO').textContent  = data.nomorDO;

    // Meta header (asal -> tujuan dari perjalanan pertama dan terakhir)
    var metaEl = document.getElementById('resMeta');
    if (metaEl && data.perjalanan && data.perjalanan.length > 0) {
      metaEl.textContent = data.paket;
    }

    // Isi info grid
    document.getElementById('resEkspedisi').textContent  = data.ekspedisi;
    document.getElementById('resTglKirim').textContent   = data.tanggalKirim;
    document.getElementById('resTotal').textContent      = data.total;

    var statusEl = document.getElementById('resStatus');
    if (statusEl) {
      var badgeClass = data.status === 'Dikirim' ? 'badge-success' : 'badge-warning';
      statusEl.innerHTML = '<span class="badge ' + badgeClass + '">' + data.status + '</span>';
    }

    // Render timeline
    var timeline = document.getElementById('resTimeline');
    timeline.innerHTML = '';

    if (data.perjalanan && data.perjalanan.length > 0) {
      for (var i = 0; i < data.perjalanan.length; i++) {
        var p   = data.perjalanan[i];
        var li  = document.createElement('li');

        var dotSpan  = document.createElement('span');
        dotSpan.className = 'timeline-dot';

        var timeSpan = document.createElement('span');
        timeSpan.className   = 'tl-time';
        timeSpan.textContent = p.waktu;

        var descSpan = document.createElement('span');
        descSpan.className   = 'tl-desc';
        descSpan.textContent = p.keterangan;

        li.appendChild(dotSpan);
        li.appendChild(timeSpan);
        li.appendChild(descSpan);
        timeline.appendChild(li);
      }
    } else {
      timeline.innerHTML = '<li><span class="tl-desc">Belum ada data perjalanan.</span></li>';
    }
  }

  // Cek URL parameter ?do=xxxxx
  var urlParams = new URLSearchParams(window.location.search);
  var doParam   = urlParams.get('do');
  if (doParam) {
    document.getElementById('inputNoDO').value = doParam;
    renderTracking(doParam);
  } else {
    // Tampilkan data default saat halaman dibuka
    var defaultDO = document.getElementById('inputNoDO').value;
    if (defaultDO) renderTracking(defaultDO);
  }

  // Klik tombol Lacak
  btnCariDO.addEventListener('click', function() {
    var noDO = document.getElementById('inputNoDO').value;
    if (!noDO.trim()) {
      alert('Masukkan nomor DO terlebih dahulu.');
      return;
    }
    renderTracking(noDO.trim());
  });

  // Enter di input
  var inputNoDO = document.getElementById('inputNoDO');
  if (inputNoDO) {
    inputNoDO.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        btnCariDO.click();
      }
    });
  }
}

/* ==========================================================================
   5. HALAMAN STOK (stok.html)
   ========================================================================== */

var bookGrid = document.getElementById('bookGrid');
if (bookGrid) {

  // Tampilkan nama pengguna
  var navNameStok = document.getElementById('navUserName');
  var namaSimpanStok = sessionStorage.getItem('namaPengguna');
  if (navNameStok && namaSimpanStok) navNameStok.textContent = namaSimpanStok;

  // Data aktif (copy dari dataBahanAjar agar bisa ditambah)
  var dataAktif = dataBahanAjar.slice();

  // Fungsi buat kartu buku
  function buatKartuBuku(item) {
    var card = document.createElement('div');
    card.className = 'book-card';

    // Cover buku
    if (item.cover) {
      var img = document.createElement('img');
      img.src       = item.cover;
      img.alt       = item.namaBarang;
      img.className = 'book-card-cover';
      img.onerror   = function() {
        this.style.display = 'none';
        var ph = document.createElement('div');
        ph.className   = 'book-card-cover-placeholder';
        ph.textContent = String.fromCodePoint(128218);
        card.insertBefore(ph, card.firstChild);
      };
      card.appendChild(img);
    } else {
      var ph2 = document.createElement('div');
      ph2.className   = 'book-card-cover-placeholder';
      ph2.textContent = String.fromCodePoint(128218);
      card.appendChild(ph2);
    }

    // Body kartu dengan field-field
    var body = document.createElement('div');
    body.className = 'book-card-body';

    var fields = [
      { label: 'Kode Lokasi',  value: item.kodeLokasi  },
      { label: 'Kode Barang',  value: item.kodeBarang  },
      { label: 'Nama Barang',  value: item.namaBarang  },
      { label: 'Jenis Barang', value: item.jenisBarang },
      { label: 'Edisi',        value: item.edisi       },
      { label: 'Stok',         value: item.stok        }
    ];

    for (var i = 0; i < fields.length; i++) {
      var f     = fields[i];
      var div   = document.createElement('div');
      div.className = 'book-field';

      var lbl   = document.createElement('label');
      lbl.textContent = f.label;

      var val   = document.createElement('span');
      val.textContent = f.value;

      div.appendChild(lbl);
      div.appendChild(val);
      body.appendChild(div);
    }

    card.appendChild(body);
    return card;
  }

  // Fungsi render semua kartu
  function renderBuku() {
    bookGrid.innerHTML = '';
    for (var i = 0; i < dataAktif.length; i++) {
      bookGrid.appendChild(buatKartuBuku(dataAktif[i]));
    }
  }

  renderBuku();

  // Form Tambah Stok
  var formTambah = document.getElementById('formTambahStok');
  if (formTambah) {
    formTambah.addEventListener('submit', function(e) {
      e.preventDefault();

      var kodeLokasi  = document.getElementById('inputKodeLokasi').value.trim().toUpperCase();
      var kodeBarang  = document.getElementById('inputKodeBarang').value.trim().toUpperCase();
      var namaBarang  = document.getElementById('inputNamaBarang').value.trim();
      var jenisBarang = document.getElementById('inputJenisBarang').value;
      var edisi       = document.getElementById('inputEdisi').value.trim();
      var stok        = parseInt(document.getElementById('inputStok').value, 10);

      // Validasi sederhana
      if (!kodeLokasi || !kodeBarang || !namaBarang || !edisi || isNaN(stok) || stok < 1) {
        alert('Harap isi semua field dengan benar.');
        return;
      }

      // Tambah ke data aktif
      var itemBaru = {
        kodeLokasi:  kodeLokasi,
        kodeBarang:  kodeBarang,
        namaBarang:  namaBarang,
        jenisBarang: jenisBarang,
        edisi:       edisi,
        stok:        stok,
        cover:       ''
      };

      dataAktif.push(itemBaru);
      renderBuku();

      alert('Stok bahan ajar berhasil ditambahkan!');
      formTambah.reset();
      document.getElementById('inputEdisi').value = '1';
    });
  }

  // Tombol Reset Data Awal
  var btnReset = document.getElementById('btnResetData');
  if (btnReset) {
    btnReset.addEventListener('click', function() {
      if (confirm('Reset data ke kondisi awal?')) {
        dataAktif = dataBahanAjar.slice();
        renderBuku();
        alert('Data berhasil direset.');
      }
    });
  }
}
