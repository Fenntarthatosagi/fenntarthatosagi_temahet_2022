window.addEventListener("load", init);

function query(name) {
    return document.querySelector(name);
}

function query_all_raw(name) {
    return document.querySelectorAll(name);
}

function query_all(name, arg) {
    document.querySelectorAll(name).forEach(elem => { arg(elem) });
}

function init() {
    //load main elements
    query("nav").innerHTML += '<ul><li><a href="index.html">Kezdőoldal</a></li><li><a href="cikkek.html">Cikkek</a></li><li><a href="tesztek.html">Tesztek</a></li><li><a href="galeria/galeria.html">Ruha bemutató</a></li><li><a href="jatekok.html">Játékok</a></li></ul>';
    query("article").innerHTML += '<p>Itt főbb cikkeinket láthatod amik lehetőség szerint érdekesek lennének számodra</p><p>Fentebb a navigációs fülön tudsz navigálni hogy éppen mire lennél kíváncsi</p>';
    query("aside").innerHTML += '';
    query("footer").innerHTML = "&copy; Minden jog fenntartva";
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
        if (key == "cikeleres") {
          txt += "<a href=" + cikk[key] + "></a>";
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
    query("aside").innerHTML = txt;
  }