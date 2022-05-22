window.addEventListener("load", init);

function ID(elem) {
    return document.getElementById(elem);
}

function query(name) {
    return document.querySelector(name);
}

function $(elem) {
    return document.querySelectorAll(elem);
}

function init() {

    beolvas(bemutatoTomb);


}
const bemutatoTomb = [];

function beolvas(tomb) {
    fetch("bemutato.json")
        .then(valasz => valasz.json())
        .then(adat => {
            //console.log(adat) //ez az objektum
            //a lepkék adatait beteszem a tömbbe
            //bejárjuk a json fájlba lévő tömbböt
            //console.log(adat.zerowaste); //ez a tömb

            //minden elemét betesszük a tömbbe
            adat.bemutato.forEach(lepke => {
                //console.log(lepke);
                bemutatoTomb.push(lepke);
            });
            console.log(bemutatoTomb);

            megjelenit2();

        })
        .catch(err => { console.log(err) });
}

function megjelenit2() {
    var txt = "";
    for (let index = 0; index < bemutatoTomb.length; index++) {
        txt += `<div  class='csakakepek'><img src='${bemutatoTomb[index].kepEleresiut}' alt='${bemutatoTomb[index].cim}'></div>`;
    }
    console.log(txt);

    ID("kepgaleria").innerHTML = txt;
}

function megjelenit(index) {
    query("#fokep>img").src = bemutatoTomb[index].kepEleresiut;
    ID("cim").alt = bemutatoTomb[index].cim;
}