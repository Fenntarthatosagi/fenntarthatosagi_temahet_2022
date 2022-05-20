window.addEventListener("load", init);

function querry(name) {
    return document.querySelector(name);
}

function querry_all_raw(name) {
    return document.querySelectorAll(name);
}

function querry_all(name, arg) {
    document.querySelectorAll(name).forEach(elem => { arg(elem) });
}

function init() {
    //load main elements
    querry("nav").innerHTML += '<ul><li><a href="index.html">Kezdőoldal</a></li><li><a href="cikkek.html">Cikkek</a></li><li><a href="tesztek.html">Tesztek</a></li><li><a href="galeria/galeria.html">Ruha bemutató</a></li><li><a href="jatekok.html">Játékok</a></li></ul>';
    querry("body").innerHTML += '';
    querry("article").innerHTML += '<img src="">';
    querry("aside").innerHTML += '';
    querry("footer").innerHTML += '<p>Minden jog fenntartva ©</p>';
    fetch("ajanlo.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.cikkek);
      data.cikkek.forEach((elem) => {
        cikkekTomb.push(elem);
      });
      console.log(cikkekTomb);
      feldolgoz();
    })
    .catch((err) => {
      console.log(err);
    });
}

const cikkekTomb = []

function feldolgoz() {
    var txt = "";
    cikkekTomb.forEach(function (cikk) {
      txt += "<div>";
      for (const key in cikk) {
        console.log(key);
        if (key == "cnev") {
          txt += "<h1>" + cikk[key] + "</h1>";
        }
        if (key == "ckep") {
          txt += "<img src=" + cikk[key] + "></img>";
        }
        if (key.indexOf("leiras") >= 0) {
            txt += "<p>" + cikk[key] + "</p>";
        }
      }
      txt += "</div>";
    });
    console.log(txt);
    querry("article").innerHTML = txt;
  }