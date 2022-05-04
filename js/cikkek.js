// foCim: <h1>, kep: <img>, bekezdes: <p>, alCim: <h3>
var GretiCikk = [
  {
    foCim: "Mi az a TeSZedd!?",
    kep: "img/cikkek/kep1.jpg",
    bekezdes:
      "A TeSzedd! Önkéntesen a tiszta Magyarországért akció. Hazánk legnagyobb önkéntes mozgalma.Idén immár kilencedik alkalommal valósul meg. A szemétgyűjtési akció keretében szerte az országban „nagytakarítanak” a TeSzedd! önkéntesei. Azért szervezzük meg ezt a mozgalmat minden évben, hogy közösen megtisztítsuk szűkebb-tágabb környezetünket.",
  },
  {
    alCim: "Vízcsepp összművészeti pályázat 2022",
    kep: "img/cikkek/kep2.jpg",
    bekezdes:
      "A pályázat a 2022. évi Fenntarthatósági Témahét keretében kerül meghirdetésre. A pályázat célja a diákok szemléletformálása vízhez kapcsolódó művészeti alkotások készítésével. Benyújtható pályázatok: rajz, fotó, szépirodalmi mű, zenemű, képregény, infografika, kisfilm.",
    bekezdes:
      "A pályázat célja, hogy tudatosítsa a diákok körében a víz mindennapokban betöltött fontos szerepét. A pályázat a diákok vízhez kötődő viszonyát, művészti alkotásokon keresztül kívánja felmérni. A diákoknak egy vízcsepp helyébe kell beleképzelni magukat és arról szabadon választott művészeti alkotást kell készíteni.",
  },
  {
    alCim: "Kert-kóstolgató pályázat",
    kep: "img/cikkek/kep3.jpg",
    bekezdes:
      "A pályázat célja, hogy az iskolás csoportok egy saját tervezésű legalább 1 m2 iskolakertet hozzanak létre. Az iskolakertbe olyan növények ültetését várjuk, amelyek az a fenntarthatóságot szolgálják. Az iskolakert létrehozását dokumentálni kell a tervezéstől a kivitelezésig",
  },
];

window.addEventListener("load", init);
function ID(elem) {
  return document.getElementById(elem);
}
function $1(elem) {
  return document.querySelector(elem);
}
function $2(elem) {
  return document.querySelectorAll(elem);
}

function init() {
  var txt = "";
  for (let index = 0; index < GretiCikk.length; index++) {
    txt += "<div>";
    for (const key in GretiCikk[index]) {
      if (key == "foCim") {
        txt += "<h1>" + GretiCikk[index][key] + "</h1>";
      }
      if (key == "kep") {
        txt += "<img src=" + GretiCikk[index][key] + "></img>";
      }
      if (key == "bekezdes") {
        txt += "<p>" + GretiCikk[index][key] + "</p>";
      }
      if (key == "alCim") {
        txt += "<h3>" + GretiCikk[index][key] + "</h3>";
      }
    }
    txt += "</div>";
  }

  $1("#main").innerHTML = txt;
  console.log();
}
