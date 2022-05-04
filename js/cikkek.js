//foCim: <h1>, kep: <img>, bekezdes: <p>, alCim: <h3></h3>
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
