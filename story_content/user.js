function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6aVk67jeobr":
        Script1();
        break;
      case "6PoaFuGOZfO":
        Script2();
        break;
  }
}

function Script1()
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

function Script2()
{
  var p = GetPlayer();

// 1) Ambil NIS dari Storyline
var nis = (p.GetVar("vNIS") || "").trim();
// Jika NIS selalu angka, kamu bisa normalisasi: nis = nis.replace(/\D/g,"");

// 2) Tabel NIS → Nama (ISI SENDIRI)
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
  "230311609690": "Zalfa",
  // Tambahkan baris lainnya...
};

// 3) Lookup
var nama = db[nis] || "";

// 4) Kembalikan ke variabel Storyline
p.SetVar("vNama", nama);
p.SetVar("vFound", !!nama);
}

