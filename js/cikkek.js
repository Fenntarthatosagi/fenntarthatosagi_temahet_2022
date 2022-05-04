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

const cikkek = [];
function init() {
  fetch("cikkek.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.GretiCikk);
      data.GretiCikk.forEach((elem) => {
        cikkek.push(elem);
      });
      console.log(cikkek);
      feldolgoz();
    })
    .catch((err) => {
      console.log(err);
    });
}
function feldolgoz() {
  var txt = "";
  cikkek.forEach(function (cikk) {
    txt += "<div>";
    for (const key in cikk) {
      console.log(key);
      if (key == "foCim") {
        txt += "<h1>" + cikk[key] + "</h1>";
      }
      if (key == "kep") {
        txt += "<img src=" + cikk[key] + "></img>";
      }
      if (key.indexOf("bekezdes") >= 0) {
        txt += "<p>" + cikk[key] + "</p>";
      }
      if (key == "alCim") {
        txt += "<h3>" + cikk[key] + "</h3>";
      }
    }
    txt += "</div>";
  });
  console.log(txt);
  $2("#main")[0].innerHTML = txt;
}
