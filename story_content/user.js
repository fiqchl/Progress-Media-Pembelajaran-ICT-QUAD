function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6deVYMJH9Zt":
        Script1();
        break;
  }
}

function Script1()
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
  // Tambahkan baris lainnya...
};

// 3) Lookup
var nama = db[nis] || "";

// 4) Kembalikan ke variabel Storyline
p.SetVar("vNama", nama);
p.SetVar("vFound", !!nama);
}

