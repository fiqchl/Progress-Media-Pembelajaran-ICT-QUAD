function ExecuteScript(strId)
{
  switch (strId)
  {
      case "5oDkUMqzOvz":
        Script1();
        break;
      case "6LABn7laLfq":
        Script2();
        break;
      case "5r4TtOSet6o":
        Script3();
        break;
      case "5fKS1CJRT3n":
        Script4();
        break;
      case "6j2dlLIL9vM":
        Script5();
        break;
      case "5vIbfPMn7u1":
        Script6();
        break;
      case "5neorDDzVs2":
        Script7();
        break;
      case "6dBKHEhOqMc":
        Script8();
        break;
      case "6ncCqlobyJU":
        Script9();
        break;
      case "5l2K6M6y844":
        Script10();
        break;
      case "6guoem0c8DI":
        Script11();
        break;
      case "640zt8GcH3D":
        Script12();
        break;
      case "5b4t7FqG2xE":
        Script13();
        break;
      case "607rqalkBb9":
        Script14();
        break;
      case "60EVVPtvE4y":
        Script15();
        break;
      case "5b9kdTRqlHG":
        Script16();
        break;
      case "6SildBHOCdC":
        Script17();
        break;
      case "6PXW2UjfMT1":
        Script18();
        break;
      case "5WpJJ7AIglw":
        Script19();
        break;
      case "6FkdWH92hdi":
        Script20();
        break;
      case "6DBapSNGbDw":
        Script21();
        break;
  }
}

function Script1()
{
  (function(){
  var d = (window.top && window.top.document) ? window.top.document : document;
  var el = d.getElementById('bgmAudioGlobal');      // dibuat di tombol Next slide awal
  if (!el) {
    // fallback kalau user masuk langsung ke slide ini (jarang)
    el = d.createElement('audio');
    el.id = 'bgmAudioGlobal';
    el.src = 'https://fiqchl.github.io/Progress-Media-Pembelajaran-ICT-QUAD/bgm/sabilulungan.mp3';
    el.loop = true;
    el.volume = 0.5;
    el.preload = 'auto';
    el.setAttribute('playsinline','');
    d.body.appendChild(el);
  }

  var on = !!GetPlayer().GetVar('vBGMOn');
  try {
    if (on) {
      el.muted = false;
      var p = el.play();
      if (p && p.catch) p.catch(function(e){ /* autoplay blocked? klik berikutnya akan jalan */ });
    } else {
      el.pause();
    }
  } catch(e){}
})();
}

function Script2()
{
  (function(){
  var p = GetPlayer();

  // --- jaga-jaga: pastikan Firestore siap ---
  function ensureFS(cb){
    if (window._fbReady && firebase && firebase.firestore) { cb(); return; }
    var s = document.createElement('script');
    s.src = 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js';
    s.onload = cb; document.head.appendChild(s);
  }

  // --- identitas dokumen berdasarkan login sekarang ---
  var name = (p.GetVar('vNama')||'').trim();
  var key  = (p.GetVar('vNameKey')||name.toLowerCase());

  // === DAFTAR VARIABEL YANG DI-RESET & DISIMPAN ===
  // Flag progres (boolean):
  var S = window.PROGRESS_SCHEMA;
  var boolVars = S.boolVars;
  var textVars = S.textVars;


  // --- bentuk state default (false/kosong) ---
  var defaultState = {};
  boolVars.forEach(function(k){ defaultState[k] = false; });
  textVars.forEach(function(k){ defaultState[k] = ''; });

  // --- kosongkan variabel di Storyline sekarang juga (langsung terlihat di UI) ---
  boolVars.forEach(function(k){ p.SetVar(k, false); });
  textVars.forEach(function(k){ p.SetVar(k, ''); });

  // --- perbarui cache lokal (opsional) ---
  try { localStorage.setItem('state_'+key, JSON.stringify(defaultState)); } catch(e){}

  // --- simpan ke Firestore (TANPA hapus dokumen) ---
  ensureFS(function(){
    var db  = firebase.firestore();
    var ref = db.collection('progress').doc(key);
    ref.set({
      name: name,
      state: defaultState,
      updated: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true })
    .then(function(){
      // beri sinyal sukses (buat variabel jika belum ada)
      p.SetVar('vResetDone', true);
    })
    .catch(function(err){
      p.SetVar('vResetError', true);
      console.error('Reset gagal:', err);
    });
  });

})();
}

function Script3()
{
  (function(){
  var d = (window.top && window.top.document) ? window.top.document : document;
  var el = d.getElementById('bgmAudioGlobal');      // dibuat di tombol Next slide awal
  if (!el) {
    // fallback kalau user masuk langsung ke slide ini (jarang)
    el = d.createElement('audio');
    el.id = 'bgmAudioGlobal';
    el.src = 'https://fiqchl.github.io/Progress-Media-Pembelajaran-ICT-QUAD/bgm/sabilulungan.mp3';
    el.loop = true;
    el.volume = 0.5;
    el.preload = 'auto';
    el.setAttribute('playsinline','');
    d.body.appendChild(el);
  }

  var on = !!GetPlayer().GetVar('vBGMOn');
  try {
    if (on) {
      el.muted = false;
      var p = el.play();
      if (p && p.catch) p.catch(function(e){ /* autoplay blocked? klik berikutnya akan jalan */ });
    } else {
      el.pause();
    }
  } catch(e){}
})();
}

function Script4()
{
  (function(){
  var p = GetPlayer();

  // Kalau login slide sudah jalan, window._fbReady harusnya true.
  // Tambah jaga-jaga memuat Firestore compat jika perlu:
  function ensureFS(cb){
    if (window._fbReady) { cb(); return; }
    var s=document.createElement('script');
    s.src='https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js';
    s.onload=cb; document.head.appendChild(s);
  }

  // Nama → key (pakai yang sudah diset saat login)
  var name = (p.GetVar('vNama')||'').trim();
  var key  = (p.GetVar('vNameKey')||name.toLowerCase());

  // === daftar variabel HARUS sama dengan login ===
  var S = window.PROGRESS_SCHEMA;
  var boolVars = S.boolVars;
  var textVars = S.textVars;


  // Kumpulkan state sekarang
  var state = {};
  boolVars.forEach(function(k){ state[k] = !!p.GetVar(k); });
  textVars.forEach(function(k){ state[k] = String(p.GetVar(k) || ''); });

  // Mirror lokal (opsional, biar aman kalau offline)
  try{ localStorage.setItem('state_'+key, JSON.stringify(state)); }catch(e){}

  // Simpan ke Firestore
  ensureFS(function(){
    var db  = firebase.firestore();
    var ref = db.collection('progress').doc(key);
    ref.set({
      name: name,
      state: state,
      updated: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge:true });
  });
})();
}

function Script5()
{
  (function(){
  var d = (window.top && window.top.document) ? window.top.document : document;
  var el = d.getElementById('bgmAudioGlobal');      // dibuat di tombol Next slide awal
  if (!el) {
    // fallback kalau user masuk langsung ke slide ini (jarang)
    el = d.createElement('audio');
    el.id = 'bgmAudioGlobal';
    el.src = 'https://fiqchl.github.io/Progress-Media-Pembelajaran-ICT-QUAD/bgm/sabilulungan.mp3';
    el.loop = true;
    el.volume = 0.5;
    el.preload = 'auto';
    el.setAttribute('playsinline','');
    d.body.appendChild(el);
  }

  var on = !!GetPlayer().GetVar('vBGMOn');
  try {
    if (on) {
      el.muted = false;
      var p = el.play();
      if (p && p.catch) p.catch(function(e){ /* autoplay blocked? klik berikutnya akan jalan */ });
    } else {
      el.pause();
    }
  } catch(e){}
})();
}

function Script6()
{
  var p = GetPlayer();

/* ======== KUNCI JAWABAN ======== */
var expectedD = [ 29,  0, -31 ];
var expectedN = [  2,  1,   0 ];
var EPS = 1e-6;
/* =============================== */

var dVars = ["vTabelDiskriminan11","vTabelDiskriminan21","vTabelDiskriminan31"]; // kolom D
var nVars = ["vTabelDiskriminan12","vTabelDiskriminan22","vTabelDiskriminan32"]; // kolom jumlah

function nearlyEqual(a,b,eps){ return Math.abs(a-b) <= eps; }

/* Parser angka yg robust:
   - ganti minus Unicode (−, –, —) jadi '-'
   - ambil angka pertama yang muncul (boleh ada spasi setelah tanda)
   - koma → titik
*/
function parseSignedNumber(val){
  var raw = (""+val).trim();
  raw = raw.replace(/[\u2212\u2013\u2014]/g, "-");   // − – — -> -
  var m = raw.match(/[+\-]?\s*\d+(?:[.,]\d+)?/);     // contoh: "- 31", "0,", "2.0"
  if (!m) return NaN;
  var s = m[0].replace(/\s+/g,"").replace(",",".");
  var n = parseFloat(s);
  return (isFinite(n) && !isNaN(n)) ? n : NaN;
}

/* Longgarkan input jumlah: angka ATAU kata */
function parseCount(val){
  var raw = (""+val).toLowerCase().trim();
  raw = raw.replace(/[.,;:!?]/g," ").replace(/\s+/g," ").trim();
  if (/\bdua\b/.test(raw)) return 2;
  if (/\bsatu\b/.test(raw)) return 1;
  if (/\b(nol|kosong|zero)\b/.test(raw)) return 0;
  if (/\btidak ada\b/.test(raw)) return 0;
  var m = raw.match(/([+\-]?\d+(?:[.,]\d+)?)/);
  if (m){
    var s = m[1].replace(",",".");
    var n = parseFloat(s);
    if (isFinite(n) && !isNaN(n)) {
      if (nearlyEqual(n,2,EPS)) return 2;
      if (nearlyEqual(n,1,EPS)) return 1;
      if (nearlyEqual(n,0,EPS)) return 0;
    }
  }
  return null;
}

var wrong = [];

for (var i=0; i<3; i++){
  // --- kolom D (pakai parser baru)
  var dNum = parseSignedNumber(p.GetVar(dVars[i]));
  var okD  = !isNaN(dNum) && nearlyEqual(dNum, expectedD[i], EPS);

  // --- kolom jumlah (longgar)
  var nParsed = parseCount(p.GetVar(nVars[i]));
  var okN = (nParsed !== null) && nearlyEqual(nParsed, expectedN[i], EPS);

  // (opsional) pastikan konsisten dgn aturan diskriminan
  // var ruleOK = (dNum>0 && nParsed===2) || (nearlyEqual(dNum,0,EPS) && nParsed===1) || (dNum<0 && nParsed===0);
  // okN = okN && ruleOK;

  if (!okD || !okN){
    if      (!okD && !okN) wrong.push((i+1) + " (D & jumlah)");
    else if (!okD)         wrong.push((i+1) + " (D)");
    else if (!okN)         wrong.push((i+1) + " (jumlah)");
  }
}

p.SetVar("vAllValid_4", wrong.length === 0);
p.SetVar("vWrongList_4", wrong.join(", "));
}

function Script7()
{
  var p = GetPlayer();

/* ======== KUNCI JAWABAN ======== 
   D>0  -> 2 titik potong
   D=0  -> 1 titik potong
   D<0  -> 0 titik potong
*/
var expectedN = [2, 1, 0]; // untuk vJawabanDiskriminan1..3 (urut: D>0, D=0, D<0)
var labels    = ["D>0", "D=0", "D<0"]; // agar WrongList informatif
/* ================================= */

var vars = ["vJawabanDiskriminan1","vJawabanDiskriminan2","vJawabanDiskriminan3"];
var EPS = 1e-6;
function nearlyEqual(a,b,eps){ return Math.abs(a-b) <= eps; }

/* Parser jumlah: angka ATAU kata/frasanya */
function parseCount(val){
  var raw = (""+val).toLowerCase().trim();
  // rapikan: buang tanda baca ringan, kompres spasi
  raw = raw.replace(/[.,;:!?]/g," ").replace(/\s+/g," ").trim();

  // sinonim nol
  if (/\b(nol|kosong|zero)\b/.test(raw)) return 0;
  if (/\btidak (ada|memiliki|mempunyai|memotong)\b/.test(raw)) return 0;
  if (/\btanpa\b/.test(raw) && /\btitik\b/.test(raw)) return 0; // "tanpa titik (potong)"

  // sinonim dua/satu
  if (/\bdua\b/.test(raw))  return 2;
  if (/\bsatu\b/.test(raw)) return 1;

  // ada angka di teks? (mis. "2 titik", "1", "0")
  var m = raw.match(/([+\-]?\d+(?:[.,]\d+)?)/);
  if (m){
    var s = m[1].replace(",",".");
    var n = parseFloat(s);
    if (isFinite(n) && !isNaN(n)) {
      if (nearlyEqual(n,2,EPS)) return 2;
      if (nearlyEqual(n,1,EPS)) return 1;
      if (nearlyEqual(n,0,EPS)) return 0;
    }
  }

  return null; // gagal dipahami
}

var wrong = [];

for (var i=0; i<3; i++){
  var nParsed = parseCount(p.GetVar(vars[i]));
  var ok = (nParsed !== null) && nearlyEqual(nParsed, expectedN[i], EPS);

  if (!ok) wrong.push(labels[i]); // contoh: "D>0", "D=0", "D<0"
}

// kembalikan hasil ke Storyline
p.SetVar("vAllValid_5", wrong.length === 0);
p.SetVar("vWrongList_5", wrong.join(", "));
}

function Script8()
{
  (function(){
  var p = GetPlayer();

  // Kalau login slide sudah jalan, window._fbReady harusnya true.
  // Tambah jaga-jaga memuat Firestore compat jika perlu:
  function ensureFS(cb){
    if (window._fbReady) { cb(); return; }
    var s=document.createElement('script');
    s.src='https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js';
    s.onload=cb; document.head.appendChild(s);
  }

  // Nama → key (pakai yang sudah diset saat login)
  var name = (p.GetVar('vNama')||'').trim();
  var key  = (p.GetVar('vNameKey')||name.toLowerCase());

  // === daftar variabel HARUS sama dengan login ===
  var S = window.PROGRESS_SCHEMA;
  var boolVars = S.boolVars;
  var textVars = S.textVars;


  // Kumpulkan state sekarang
  var state = {};
  boolVars.forEach(function(k){ state[k] = !!p.GetVar(k); });
  textVars.forEach(function(k){ state[k] = String(p.GetVar(k) || ''); });

  // Mirror lokal (opsional, biar aman kalau offline)
  try{ localStorage.setItem('state_'+key, JSON.stringify(state)); }catch(e){}

  // Simpan ke Firestore
  ensureFS(function(){
    var db  = firebase.firestore();
    var ref = db.collection('progress').doc(key);
    ref.set({
      name: name,
      state: state,
      updated: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge:true });
  });
})();
}

function Script9()
{
  (function(){
  var p = GetPlayer();

  // Kalau login slide sudah jalan, window._fbReady harusnya true.
  // Tambah jaga-jaga memuat Firestore compat jika perlu:
  function ensureFS(cb){
    if (window._fbReady) { cb(); return; }
    var s=document.createElement('script');
    s.src='https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js';
    s.onload=cb; document.head.appendChild(s);
  }

  // Nama → key (pakai yang sudah diset saat login)
  var name = (p.GetVar('vNama')||'').trim();
  var key  = (p.GetVar('vNameKey')||name.toLowerCase());

  // === daftar variabel HARUS sama dengan login ===
  var S = window.PROGRESS_SCHEMA;
  var boolVars = S.boolVars;
  var textVars = S.textVars;


  // Kumpulkan state sekarang
  var state = {};
  boolVars.forEach(function(k){ state[k] = !!p.GetVar(k); });
  textVars.forEach(function(k){ state[k] = String(p.GetVar(k) || ''); });

  // Mirror lokal (opsional, biar aman kalau offline)
  try{ localStorage.setItem('state_'+key, JSON.stringify(state)); }catch(e){}

  // Simpan ke Firestore
  ensureFS(function(){
    var db  = firebase.firestore();
    var ref = db.collection('progress').doc(key);
    ref.set({
      name: name,
      state: state,
      updated: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge:true });
  });
})();
}

function Script10()
{
  (function(){
  var p = GetPlayer();

  // Kalau login slide sudah jalan, window._fbReady harusnya true.
  // Tambah jaga-jaga memuat Firestore compat jika perlu:
  function ensureFS(cb){
    if (window._fbReady) { cb(); return; }
    var s=document.createElement('script');
    s.src='https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js';
    s.onload=cb; document.head.appendChild(s);
  }

  // Nama → key (pakai yang sudah diset saat login)
  var name = (p.GetVar('vNama')||'').trim();
  var key  = (p.GetVar('vNameKey')||name.toLowerCase());

  // === daftar variabel HARUS sama dengan login ===
  var S = window.PROGRESS_SCHEMA;
  var boolVars = S.boolVars;
  var textVars = S.textVars;


  // Kumpulkan state sekarang
  var state = {};
  boolVars.forEach(function(k){ state[k] = !!p.GetVar(k); });
  textVars.forEach(function(k){ state[k] = String(p.GetVar(k) || ''); });

  // Mirror lokal (opsional, biar aman kalau offline)
  try{ localStorage.setItem('state_'+key, JSON.stringify(state)); }catch(e){}

  // Simpan ke Firestore
  ensureFS(function(){
    var db  = firebase.firestore();
    var ref = db.collection('progress').doc(key);
    ref.set({
      name: name,
      state: state,
      updated: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge:true });
  });
})();
}

function Script11()
{
  (function(){
  var p = GetPlayer();

  // Kalau login slide sudah jalan, window._fbReady harusnya true.
  // Tambah jaga-jaga memuat Firestore compat jika perlu:
  function ensureFS(cb){
    if (window._fbReady) { cb(); return; }
    var s=document.createElement('script');
    s.src='https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js';
    s.onload=cb; document.head.appendChild(s);
  }

  // Nama → key (pakai yang sudah diset saat login)
  var name = (p.GetVar('vNama')||'').trim();
  var key  = (p.GetVar('vNameKey')||name.toLowerCase());

  // === daftar variabel HARUS sama dengan login ===
  var S = window.PROGRESS_SCHEMA;
  var boolVars = S.boolVars;
  var textVars = S.textVars;


  // Kumpulkan state sekarang
  var state = {};
  boolVars.forEach(function(k){ state[k] = !!p.GetVar(k); });
  textVars.forEach(function(k){ state[k] = String(p.GetVar(k) || ''); });

  // Mirror lokal (opsional, biar aman kalau offline)
  try{ localStorage.setItem('state_'+key, JSON.stringify(state)); }catch(e){}

  // Simpan ke Firestore
  ensureFS(function(){
    var db  = firebase.firestore();
    var ref = db.collection('progress').doc(key);
    ref.set({
      name: name,
      state: state,
      updated: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge:true });
  });
})();
}

function Script12()
{
  var p = GetPlayer();

/* ======== ANSWER KEY (EDIT DI SINI) ======== */
/* Kunci koefisien a untuk 4 baris (boleh desimal).
   Contoh: [1, -3, 0.5, -2]
*/
var expectedA = [1, -1, 3, -3];

/* Jika kamu ingin arah buka diturunkan dari tanda a (a>0 → atas, a<0 → bawah),
   biarkan expectedDir = null. 
   Kalau mau memaksa arah tertentu per baris, isi array 4 elemen dengan 
   "atas" / "bawah", contoh: ["atas","bawah","atas","bawah"] */
var expectedDir = null; // atau mis. ["atas","bawah","atas","bawah"]

/* Toleransi numerik (untuk desimal). 
   0.000001 artinya 1e-6, cukup ketat. */
var EPS = 1e-6;
/* =========================================== */

/* Mapping variabel Storyline (jangan ubah kecuali namamu beda) */
var coefVars = ["vTabelKoefisienA11","vTabelKoefisienA21","vTabelKoefisienA31","vTabelKoefisienA41"];
var dirVars  = ["vTabelKoefisienA12","vTabelKoefisienA22","vTabelKoefisienA32","vTabelKoefisienA42"];

/* Util: normalisasi teks arah (abaikan kapital/spasi/tanda baca ringan) */
function normDir(s){
  return (""+s)
    .toLowerCase()
    .replace(/\s+/g," ")
    .replace(/[.,;:!?]/g,"")
    .trim();
}

/* Util: normalisasi angka " - 3 " → "-3" ; "2,5" → "2.5" */
function normNum(s){
  var t = (""+s).trim();
  t = t.replace(/^\s*([+-])\s+/, "$1"); // hilangkan spasi setelah tanda di awal
  t = t.replace(",", ".");              // koma → titik
  t = t.replace(/\s+/g,"");             // hapus sisa spasi di dalam angka
  return t;
}

/* Sinonim arah yang diterima */
var ATAS  = [/^atas$/, /\bke atas\b/, /\bkeatas\b/ ,/terbuka.*atas/, /membuka.*atas/, /konkaf.*atas/];
var BAWAH = [/^bawah$/, /\bke bawah\b/, /\bkebawah\b/ ,/terbuka.*bawah/, /membuka.*bawah/, /konkaf.*bawah/];
function matchAny(list, txt){ return list.some(rx => rx.test(txt)); }

function nearlyEqual(a,b,eps){ return Math.abs(a-b) <= eps; }

var wrong = [];

for (var i=0; i<4; i++){
  var rawA = p.GetVar(coefVars[i]);
  var rawD = p.GetVar(dirVars[i]);

  var aStr = normNum(rawA);
  var dTxt = normDir(rawD);

  var hasA = aStr !== "" && isFinite(parseFloat(aStr)) && !isNaN(parseFloat(aStr));
  var aNum = hasA ? parseFloat(aStr) : NaN;

  // 1) Cek koefisien sesuai kunci (dengan toleransi)
  var okCoef = false;
  if (hasA) {
    okCoef = nearlyEqual(aNum, expectedA[i], EPS);
  }

  // 2) Tentukan arah yang diharapkan
  var expected = null;
  if (expectedDir && expectedDir[i]) {
    expected = (""+expectedDir[i]).toLowerCase().indexOf("atas")>=0 ? "atas" : "bawah";
  } else {
    expected = (expectedA[i] > 0) ? "atas" : "bawah";
  }

  // 3) Cocokkan arah dengan sinonim
  var okDir = (expected === "atas") ? matchAny(ATAS, dTxt) : matchAny(BAWAH, dTxt);

  if (!okCoef || !okDir){
    wrong.push(i+1); // simpan nomor baris yang salah
  }
}

// Kembalikan hasil ke Storyline
p.SetVar("vAllValid_1", wrong.length === 0);
p.SetVar("vWrongList_1", wrong.join(", "));
}

function Script13()
{
  var p = GetPlayer();

/* ======== KUNCI JAWABAN ======== */
var expectedC = [ 5, -7, 0 ];
var expectedY = [ 5, -7, 0 ];   // y-intercept untuk baris 1..3
var EPS = 1e-6;                 // toleransi numerik kecil
/* =============================== */

/* Nama variabel Storyline (jangan ubah kecuali berbeda) */
var cVars = ["vTabelKoefisienC11","vTabelKoefisienC21","vTabelKoefisienC31"]; // kolom c
var yVars = ["vTabelKoefisienC12","vTabelKoefisienC22","vTabelKoefisienC32"]; // kolom titik/y

/* Util angka: rapikan " - 3 " -> "-3", "2,5" -> "2.5" */
function normNum(s){
  var t = (""+s).trim();
  t = t.replace(/^\s*([+-])\s+/, "$1"); // minus/plus dengan spasi
  t = t.replace(",", ".");              // koma desimal -> titik
  t = t.replace(/\s+/g,"");             // buang sisa spasi
  return t;
}

/* Bandingkan angka dengan toleransi */
function nearlyEqual(a,b,eps){ return Math.abs(a-b) <= eps; }

/* Parse kolom 2: terima "angka y" ATAU "(0,y)" / "0,y" */
function parseY(val){
  var raw = (""+val).trim().toLowerCase();
  if (!raw) return NaN;

  // Pola titik (0,y): izinkan spasi, koma atau titik-koma sebagai pemisah
  var m = raw.match(/^\(?\s*0\s*[,;]\s*([+-]?\d+(?:[.,]\d+)?)\s*\)?$/);
  if (m){
    var y = m[1].replace(",",".");
    var yn = parseFloat(y);
    return (isFinite(yn) ? yn : NaN);
  }

  // Pola angka y tunggal
  var s = normNum(raw);
  if (/^[+-]?\d+(?:\.\d+)?$/.test(s)){
    var yn2 = parseFloat(s);
    return (isFinite(yn2) ? yn2 : NaN);
  }

  return NaN;
}

var wrong = [];

for (var i=0; i<3; i++){
  // Validasi c
  var cStr = normNum(p.GetVar(cVars[i]));
  var cNum = parseFloat(cStr);
  var okC  = (cStr !== "") && isFinite(cNum) && !isNaN(cNum) && nearlyEqual(cNum, expectedC[i], EPS);

  // Validasi y/titik
  var yIn  = p.GetVar(yVars[i]);
  var yNum = parseY(yIn);
  var okY  = isFinite(yNum) && !isNaN(yNum) && nearlyEqual(yNum, expectedY[i], EPS);

  if (!okC || !okY){
    // tulis detail mana yang salah pada baris tsb
    if (!okC && !okY)      wrong.push((i+1) + " (c & y)");
    else if (!okC)         wrong.push((i+1) + " (c)");
    else if (!okY)         wrong.push((i+1) + " (y)");
  }
}

// Kembalikan hasil ke Storyline
p.SetVar("vAllValid_3", wrong.length === 0);
p.SetVar("vWrongList_3", wrong.join(", "));
}

function Script14()
{
  (function(){
  var p = GetPlayer();

  // Kalau login slide sudah jalan, window._fbReady harusnya true.
  // Tambah jaga-jaga memuat Firestore compat jika perlu:
  function ensureFS(cb){
    if (window._fbReady) { cb(); return; }
    var s=document.createElement('script');
    s.src='https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js';
    s.onload=cb; document.head.appendChild(s);
  }

  // Nama → key (pakai yang sudah diset saat login)
  var name = (p.GetVar('vNama')||'').trim();
  var key  = (p.GetVar('vNameKey')||name.toLowerCase());

  // === daftar variabel HARUS sama dengan login ===
  var S = window.PROGRESS_SCHEMA;
  var boolVars = S.boolVars;
  var textVars = S.textVars;


  // Kumpulkan state sekarang
  var state = {};
  boolVars.forEach(function(k){ state[k] = !!p.GetVar(k); });
  textVars.forEach(function(k){ state[k] = String(p.GetVar(k) || ''); });

  // Mirror lokal (opsional, biar aman kalau offline)
  try{ localStorage.setItem('state_'+key, JSON.stringify(state)); }catch(e){}

  // Simpan ke Firestore
  ensureFS(function(){
    var db  = firebase.firestore();
    var ref = db.collection('progress').doc(key);
    ref.set({
      name: name,
      state: state,
      updated: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge:true });
  });
})();
}

function Script15()
{
  var p = GetPlayer();

// ambil jawaban
var a1 = ("" + p.GetVar("vJawabanKoefisienA1"));
var a2 = ("" + p.GetVar("vJawabanKoefisienA2"));

// normalisasi: ke huruf kecil, rapikan spasi, buang tanda baca ringan
function norm(s){
  return s.toLowerCase()
          .replace(/\s+/g, " ")
          .replace(/[.,;:!?]/g, "")
          .trim();
}
a1 = norm(a1);
a2 = norm(a2);

// daftar sinonim yang diterima
var ATAS  = [/^atas$/, /\bke atas\b/, /\bkeatas\b/, /terbuka.*atas/, /membuka.*atas/, /konkaf.*atas/];
var BAWAH = [/^bawah$/, /\bke bawah\b/, /\bkebawah\b/, /terbuka.*bawah/, /membuka.*bawah/, /konkaf.*bawah/];

function matchAny(list, txt){ return list.some(rx => rx.test(txt)); }

// cek masing-masing
var ok1 = a1 !== "" && matchAny(ATAS, a1);
var ok2 = a2 !== "" && matchAny(BAWAH, a2);

// susun daftar yang salah
var wrong = [];
if (!ok1) wrong.push("A1");
if (!ok2) wrong.push("A2");

// kirim balik ke Storyline
p.SetVar("vAllValid_2", wrong.length === 0);
p.SetVar("vWrongList_2", wrong.join(", "));
}

function Script16()
{
  (function(){
  var p = GetPlayer();

  // Kalau login slide sudah jalan, window._fbReady harusnya true.
  // Tambah jaga-jaga memuat Firestore compat jika perlu:
  function ensureFS(cb){
    if (window._fbReady) { cb(); return; }
    var s=document.createElement('script');
    s.src='https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js';
    s.onload=cb; document.head.appendChild(s);
  }

  // Nama → key (pakai yang sudah diset saat login)
  var name = (p.GetVar('vNama')||'').trim();
  var key  = (p.GetVar('vNameKey')||name.toLowerCase());

  // === daftar variabel HARUS sama dengan login ===
  var S = window.PROGRESS_SCHEMA;
  var boolVars = S.boolVars;
  var textVars = S.textVars;


  // Kumpulkan state sekarang
  var state = {};
  boolVars.forEach(function(k){ state[k] = !!p.GetVar(k); });
  textVars.forEach(function(k){ state[k] = String(p.GetVar(k) || ''); });

  // Mirror lokal (opsional, biar aman kalau offline)
  try{ localStorage.setItem('state_'+key, JSON.stringify(state)); }catch(e){}

  // Simpan ke Firestore
  ensureFS(function(){
    var db  = firebase.firestore();
    var ref = db.collection('progress').doc(key);
    ref.set({
      name: name,
      state: state,
      updated: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge:true });
  });
})();
}

function Script17()
{
  (function(){
  window.PROGRESS_SCHEMA = {
    boolVars: [
      'vMateri1','vMateri2','vMateri2a','vMateri2c','vMateri3','vMateri4','vMateri5'
      // taruh variabel boolean baru di sini, mis. 'vMateri6'
    ],
    textVars: [
      // Diskriminan
      'vTabelDiskriminan11','vTabelDiskriminan12','vTabelDiskriminan21','vTabelDiskriminan22','vTabelDiskriminan31','vTabelDiskriminan32',
      // Koefisien A
      'vTabelKoefisienA11','vTabelKoefisienA12','vTabelKoefisienA21','vTabelKoefisienA22','vTabelKoefisienA31','vTabelKoefisienA32','vTabelKoefisienA41','vTabelKoefisienA42',
      // Koefisien C
      'vTabelKoefisienC11','vTabelKoefisienC12','vTabelKoefisienC21','vTabelKoefisienC22','vTabelKoefisienC31','vTabelKoefisienC32',
      // Jawaban & kesimpulan
      'vJawabanDiskriminan1','vJawabanDiskriminan2','vJawabanDiskriminan3',
      'vJawabanKoefisienA1','vJawabanKoefisienA2',
      'vKesimpulanDiskriminan','vKesimpulanKoefisienA','vKesimpulanKoefisienC',
      // taruh variabel text baru di sini, mis. 'vCatatanTambahan'
      'vNilaiFungsi1','vNilaiFungsi2'
    ]
  };
})();
}

function Script18()
{
  (function () {
  var URL = "https://fiqchl.github.io/Progress-Media-Pembelajaran-ICT-QUAD/bgm/sabilulungan.mp3"; // ganti URL kamu
  var d = (window.top && window.top.document) ? window.top.document : document;
  var el = d.getElementById("bgmAudioGlobal");

  if (!el) {
    el = d.createElement("audio");
    el.id = "bgmAudioGlobal";
    el.src = URL;
    el.loop = true;
    el.volume = 0.5;               // 0.0–1.0
    el.preload = "auto";
    el.setAttribute("playsinline","");   // penting untuk iOS
    d.body.appendChild(el);
  }

  // Coba play pada gesture klik ini
  var p = el.play && el.play();
  if (p && p.catch) {
    p.catch(function(err){
      // Jika masih diblokir, minta ketuk lagi (jarang terjadi setelah pakai jeda)
      console.log("Audio play blocked:", err);
      // alert("Ketuk sekali lagi untuk mengaktifkan audio."); // aktifkan kalau perlu
    });
  }
})();

GetPlayer().SetVar('vBGMOn', true);   // audio dianggap ON setelah play pertama
}

function Script19()
{
  (function(){
  var d  = (window.top && window.top.document) ? window.top.document : document;
  var el = d.getElementById('bgmAudioGlobal');

  // Jika audio global belum ada (mis. user lompat slide), buat:
  if (!el) {
    el = d.createElement('audio');
    el.id = 'bgmAudioGlobal';
    el.src = 'https://fiqchl.github.io/Progress-Media-Pembelajaran-ICT-QUAD/bgm/sabilulungan.mp3';
    el.loop = true;
    el.volume = 0.5;
    el.preload = 'auto';
    el.setAttribute('playsinline','');
    d.body.appendChild(el);
  }

  var on = !!GetPlayer().GetVar('vBGMOn');
  try {
    if (on) {
      el.muted = false;
      var p = el.play();
      if (p && p.catch) p.catch(function(){ /* autoplay block? klik berikutnya akan jalan */ });
    } else {
      el.pause();
    }
  } catch(e){}
})();
}

function Script20()
{
  (function(){
  var d  = (window.top && window.top.document) ? window.top.document : document;
  var el = d.getElementById('bgmAudioGlobal');

  // Jika audio global belum ada (mis. user lompat slide), buat:
  if (!el) {
    el = d.createElement('audio');
    el.id = 'bgmAudioGlobal';
    el.src = 'https://fiqchl.github.io/Progress-Media-Pembelajaran-ICT-QUAD/bgm/sabilulungan.mp3';
    el.loop = true;
    el.volume = 0.5;
    el.preload = 'auto';
    el.setAttribute('playsinline','');
    d.body.appendChild(el);
  }

  var on = !!GetPlayer().GetVar('vBGMOn');
  try {
    if (on) {
      el.muted = false;
      var p = el.play();
      if (p && p.catch) p.catch(function(){ /* autoplay block? klik berikutnya akan jalan */ });
    } else {
      el.pause();
    }
  } catch(e){}
})();
}

function Script21()
{
  (function(){
  var p = GetPlayer();

  // ---------- Loader Firebase + Anonymous Auth ----------
  function ensureFirebase(cb){
    if (window._fbReady) { cb(); return; }
    function add(src, onload){ var s=document.createElement('script'); s.src=src; s.async=true; s.onload=onload; document.head.appendChild(s); }
    add('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js', function(){
      add('https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js', function(){
        add('https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js', function(){
          if (!firebase.apps.length){
            // >>> PASTE CONFIG-MU DI SINI <<<
            var firebaseConfig = {
              apiKey: "AIzaSyA65JLV2qnEjXC5Eigbqp3syC-KDCAGBpI",
              authDomain: "progress-media.firebaseapp.com",
              projectId: "progress-media",
              storageBucket: "progress-media.firebasestorage.app",
              messagingSenderId: "101987087265",
              appId: "1:101987087265:web:c68c21980d90470fd691e0",
              measurementId: "G-9TTZT78SPG"
            };
            firebase.initializeApp(firebaseConfig);
          }
          firebase.auth().signInAnonymously()
            .then(function(){ window._fbReady = true; cb(); })
            .catch(function(e){ alert('Auth anon gagal: '+e.message); });
        });
      });
    });
  }

  // ---------- Nama → key dokumen ----------
  var name = (p.GetVar('vNama')||'').trim();
  var key  = name.toLowerCase();
  p.SetVar('vNameKey', key); // biar gampang dipakai di SAVE

  // ---------- Variabel yang dipersist ----------
  var S = window.PROGRESS_SCHEMA;
  var boolVars = S.boolVars;
  var textVars = S.textVars;


  // Default state untuk user baru
  var defaultState = {};
  boolVars.forEach(function(k){ defaultState[k] = false; });
  textVars.forEach(function(k){ defaultState[k] = ''; });

  function withDefaults(st){
    // gabungkan state dari server + default agar key yang belum ada tetap terisi
    var out = JSON.parse(JSON.stringify(defaultState));
    if (st && typeof st === 'object'){
      Object.keys(st).forEach(function(k){ out[k] = st[k]; });
    }
    return out;
  }
  function applyState(st){
    // terapkan ke Storyline
    boolVars.forEach(function(k){ p.SetVar(k, !!st[k]); });
    textVars.forEach(function(k){ p.SetVar(k, (st[k]!=null ? String(st[k]) : '')); });
  }

  // ---------- LOAD (atau CREATE jika belum ada) ----------
  ensureFirebase(function(){
    var db  = firebase.firestore();
    var ref = db.collection('progress').doc(key);

    ref.get().then(function(doc){
      if (doc.exists){
        var st = withDefaults((doc.data() && doc.data().state) || {});
        applyState(st);
        try{ localStorage.setItem('state_'+key, JSON.stringify(st)); }catch(e){}
      } else {
        // buat dokumen baru
        ref.set({
          name: name,
          state: defaultState,
          updated: firebase.firestore.FieldValue.serverTimestamp()
        });
        applyState(defaultState);
        try{ localStorage.setItem('state_'+key, JSON.stringify(defaultState)); }catch(e){}
      }
      // Sinyal siap pindah (pakai trigger: Jump when vLoaded == True)
      p.SetVar('vLoaded', true);
    }).catch(function(){
      // fallback: kalau gagal jaringan, pakai default
      applyState(defaultState);
      p.SetVar('vLoaded', true);
    });
  });
})();
}

