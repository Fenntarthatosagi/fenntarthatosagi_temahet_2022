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

let cikkek = [];
function init() {
  beolvas("SzandiCikk");
  beolvas("VZSCikk");
  beolvas("DoriCikk");
  beolvas("MesiCikk");
  beolvas("GretiCikk");
  beolvas("BettiCikk");
  beolvas("ToriCikk");
  beolvas("BareszCikk");
  beolvas("VeraCikk");
  beolvas("Vera2Cikk");
}

function beolvas(kulcs) {
  cikkek = [];
  fetch("cikkek.json")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      // console.log(data.SzandiCikk);
      console.log(kulcs);
      data[kulcs].forEach((elem) => {
        cikkek.push(elem);
      });
      // console.log(cikkek);
      feldolgoz();
    })
    .catch((err) => {
      console.log(err);
    });
}

function feldolgoz() {
  var txt = "";
  txt += "<div>";
  cikkek.forEach(function (cikk, index) {
    
    for (const key in cikk) {
      // console.log(key);
      // console.log(cikk[key]);
      if (key.includes("foCim")) {
        txt += "<h1>" + cikk[key] + "</h1>";
      }
      if (key.includes("kep")) {
        txt += "<img src='" + cikk[key] + "' alt=''></img>";
      }
      if (key.includes("bekezdes") >= 0) {
        txt += "<p>" + cikk[key] + "</p>";
      }
      if (key.includes("alCim")) {
        txt += "<h2>" + cikk[key] + "</h2>";
      }
      if (key.includes("felsorolas")) {
        txt += "<li>" + cikk[key] + "</li>";
      }
      if (key.includes("link")) {
        txt += "<li>" + cikk[key] + "</li>";
      }
    }
    
  });
  txt += "</div>";
  console.log(txt);
  $2("#container")[0].innerHTML += txt;
}

window.addEventListener("click", megjelenit);
function megjelenit(
  
){
  
}

//esemény kezelő, ami rámutat a div-re, le kell kérni az eseménykezelőben a div-nek az innerHTML-jét és azt megjeleníteni egy tárolóban, ahol megakarjuk jeleníteni a cikkeket
