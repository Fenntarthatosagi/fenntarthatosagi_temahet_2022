window.addEventListener("load", init);

function ID(elem) {
    return document.getElementById(elem);
}

function $(elem) {
    return document.querySelectorAll(elem);
}

function init() {

    beolvas(kreativTomb);


}
const kreativTomb = [];

function beolvas(tomb) {
    fetch("kreativ.json")
        .then(valasz => valasz.json())
        .then(adat => {
            //console.log(adat) //ez az objektum
            //a lepkék adatait beteszem a tömbbe
            //bejárjuk a json fájlba lévő tömbböt
            //console.log(adat.zerowaste); //ez a tömb

            //minden elemét betesszük a tömbbe
            adat.kreativ.forEach(lepke => {
                //console.log(lepke);
                kreativTomb.push(lepke);
            });
            console.log(kreativTomb);

            megjelenit2();

        })
        .catch(err => { console.log(err) });
}

function megjelenit2() {
    var txt = "";
    for (let index = 0; index < kreativTomb.length; index++) {
        txt += `<div  class='csakakepek'><img src='${kreativTomb[index].kepEleresiut}' alt='${kreativTomb[index].cim}'></div>`;
    }
    console.log(txt);

    ID("kepgaleria").innerHTML = txt;
    //ID("cim").innerHTML = "<h1> Első kép címe</h1>";
    //ID("leiras").innerHTML = "<p> Kecskék</p>";

    //ID("balra").addEventListener("click", balra);
    //ID("jobbra").addEventListener("click", jobbra);
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var divelem = document.getElementsByClassName(".csakakepek")[0];
    console.log(divelem);
    var modalImg = document.querySelectorAll(".csakakepek img")[0];
    console.log(modalImg);
    var captionText = document.getElementById("caption");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    kepekL = txt;
    const szinesElembenDivTomb = document.querySelectorAll("#kepgaleria>div");
    for (let index = 0; index < szinesElembenDivTomb.length; index++) {
        const element = szinesElembenDivTomb[index];
        element.addEventListener("click", function() {
            console.log("Ügyesek vagyunk");
            modal.style.display = "block";
            ID("alkoto").innerHTML = "<h1> " + kreativTomb[index].keszitette + "</h1>";
            console.log("ki az alkoto");
            console.log(ID("alkoto").alt = kreativTomb[index].keszitette)
            megjelenit(index);
            console.log("mi a kep elérési útja");
            ID("leiras").innerHTML = "<p> " + kreativTomb[index].leiras + "<ul><li>Bemutatja: " + kreativTomb[index].bemutatja + "</li></ul<p>";
            var aktKep = index;
        });
    }
}

function balra() {
    aktKep--;
    if (aktKep < 0) {
        aktKep = kepektomb.length - 1;
    }
    megjelenit(aktKep);
    ID("cim").innerHTML = "<h1> " + kepektomb[aktKep].kepCim + "</h1>";
    ID("leiras").innerHTML = "<p> " + kepektomb[aktKep].kepLeiras + "</p>";
}

function jobbra() {
    aktKep++;
    if (aktKep >= kepektomb.length) {
        aktKep = 0;
    }
    megjelenit(aktKep);
    ID("cim").innerHTML = "<h1> " + kepektomb[aktKep].kepCim + "</h1>";
    ID("leiras").innerHTML = "<p> " + kepektomb[aktKep].kepLeiras + "</p>";
}


function kepbetoltes() {
    console.log("Kattintottunk");
    var rnd = Math.floor(Math.random() * kepektomb.length);
    megjelenit(rnd);
}

function megjelenit(index) {
    ID("fokep").src = kreativTomb[index].kepEleresiut;
    ID("cim").alt = kreativTomb[index].cim;
}