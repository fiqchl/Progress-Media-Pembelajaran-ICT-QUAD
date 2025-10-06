function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6dLX0OmkbqM":
        Script1();
        break;
      case "6Qp8IBvfZAb":
        Script2();
        break;
      case "6ihBJMxWS6r":
        Script3();
        break;
      case "5v5MVU0uVmI":
        Script4();
        break;
      case "5hCThx33TXp":
        Script5();
        break;
      case "6Uh24v5UkLH":
        Script6();
        break;
      case "65vKLF6o4C9":
        Script7();
        break;
  }
}

function Script1()
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

function Script2()
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

function Script3()
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

function Script4()
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

function Script5()
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

function Script6()
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

}

function Script7()
{
  (function(){
  var p = GetPlayer();

  // --- ambil NIS ---
  var nis  = (p.GetVar("vNIS") || "").trim();

  // --- DB NIS -> Nama (ISI SENDIRI) ---
  var db = {
  "230311606529": "Taufiq",
  "230311606367": "Willyam",
  "230311601708": "Miftachul",
  "230311605143": "Salsabilla",
  "230311605691": "Dhadya",
  "230311601387": "Agisni",
  "230311605549": "Aisatul",
  "230311605199": "Aisya",
  "230311605664": "Anniza",
  "230311609561": "Arifa",
  "230311603698": "Biputra",
  "230311601211": "Cahyani",
  "230311601371": "Dila Nur",
  "230311601526": "Dwi Aulia",
  "230311602073": "Edestri",
  "230311604265": "Ersa",
  "230311605907": "Fandaya",
  "230311605893": "Farras",
  "230311607445": "Fazabilla",
  "230311602021": "Filastri",
  "230311609133": "Fitri",
  "230311601049": "Nurhasni",
  "230311604279": "Intan",
  "230311605559": "Kayla",
  "230311609021": "Kharisma",
  "230311609812": "Khusnia",
  "230311601057": "Lendya",
  "230311609336": "Maghfiro",
  "230311605160": "Murwanti",
  "230311606201": "Muzakki",
  "230311601080": "Nadzifah",
  "230311604890": "Nazwa",
  "230311601983": "Nella",
  "200311613645": "Nurul",
  "230311601152": "Risna",
  "230311600709": "Sahda",
  "230311608060": "Vellin",
  "230311605256": "Veronika",
  "230311605802": "Widigda",
  "230311600278": "Zahrotul",
  "230311609690": "Zalfa"
  };

  // --- lookup ---
  var nama  = db[nis] || "";
  var found = !!nama;

  // kembalikan ke Storyline
  p.SetVar("vNama",  nama);
  p.SetVar("vFound", found);

  // --- logging ke Google Sheets (opsional: catat juga kasus gagal) ---
  var URL   = "https://script.google.com/macros/s/AKfycbx3MvIazCxQH_hxspHhePtQwNlNWUaBotyN0rW7o9LBruyjE6trhyyZp8nmOe2id-QAJg/exec";
  var TOKEN = "tok_5Qk9mH0vYw2_L1pZr8";

  var payload = {
    token: TOKEN,
    nim:   nis,
    nama:  nama,
    event: found ? "login" : "login_failed",
    slide: "Halaman Login",
    ua:    navigator.userAgent
  };

  fetch(URL, {
    method: "POST",
    mode: "no-cors",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  }).catch(function(){});
})();

}

