window.addEventListener("load", init);

function ID(elem) {
    return document.getElementById(elem);
}

function $(elem) {
    return document.querySelectorAll(elem);
}

var kepektomb = [{
    kepEleresiut: "ruhakepek/organic.jpg",
    cim: "lol",
    keszitette: "Alig Elek1",
    sex: "1unisex",
    leiras: "1Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad velit hic aliquid quidem sapiente suscipit esse quibusdam eaque accusantium, recusandae libero amet similique blanditiis sit magni autem. Placeat, facere dicta? Repellat inventoreveritatis non repellendus iste ea saepe ullam sint ab totam, velit maiores eius obcaecati unde at doloribus earum laudantium dignissimos aperiam quod numquam architecto facere ? Exercitationem, eaque accusantium.",
    tervfaz: "1varázslat"

}, {
    kepEleresiut: "ruhakepek/organic.jpg",
    cim: "lol",
    keszitette: "Alig Elek2",
    sex: "2unisex",
    leiras: "2lorem ipsum",
    tervfaz: "varázslat"

}, {
    kepEleresiut: "ruhakepek/organic.jpg",
    cim: "lol",
    keszitette: "Alig Elek3",
    sex: "3unisex",
    leiras: "3lorem ipsum",
    tervfaz: "varázslat"

}, {
    kepEleresiut: "ruhakepek/organic.jpg",
    cim: "lol",
    keszitette: "Alig Elek4",
    sex: "unisex",
    leiras: "lorem ipsum",
    tervfaz: "varázslat"

}, {
    kepEleresiut: "ruhakepek/organic.jpg",
    cim: "lol",
    keszitette: "Alig Elek5",
    sex: "unisex",
    leiras: "lorem ipsum",
    tervfaz: "varázslat"

}, {
    kepEleresiut: "ruhakepek/organic.jpg",
    cim: "lol",
    keszitette: "Alig Elek",
    sex: "unisex",
    leiras: "lorem ipsum",
    tervfaz: "varázslat"

}, {
    kepEleresiut: "ruhakepek/organic.jpg",
    cim: "lol",
    keszitette: "Alig Elek",
    sex: "unisex",
    leiras: "lorem ipsum",
    tervfaz: "varázslat"

}, {
    kepEleresiut: "ruhakepek/organic.jpg",
    cim: "lol",
    keszitette: "Alig Elek",
    sex: "unisex",
    leiras: "lorem ipsum",
    tervfaz: "varázslat"

}, {
    kepEleresiut: "ruhakepek/organic.jpg",
    cim: "lol",
    keszitette: "Alig Elek",
    sex: "unisex",
    leiras: "lorem ipsum",
    tervfaz: "varázslat"

}, {
    kepEleresiut: "ruhakepek/organic.jpg",
    cim: "lol",
    keszitette: "Alig Elek",
    sex: "unisex",
    leiras: "lorem ipsum",
    tervfaz: "varázslat"

}, {
    kepEleresiut: "ruhakepek/organic.jpg",
    cim: "lol",
    keszitette: "Alig Elek",
    sex: "unisex",
    leiras: "lorem ipsum",
    tervfaz: "varázslat"

}, {
    kepEleresiut: "ruhakepek/organic.jpg",
    cim: "lol",
    keszitette: "Alig Elek",
    sex: "unisex",
    leiras: "lorem ipsum",
    tervfaz: "varázslat"

}]

function init() {
    var txt = "";
    for (let index = 0; index < kepektomb.length; index++) {
        txt = txt + "<div class='csakakepek'><img src='" + kepektomb[index].kepEleresiut + "' alt='" + kepektomb[index].kepCim + "'></div>";
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
            ID("alkoto").innerHTML = "<h1> " + kepektomb[index].keszitette + "</h1>";
            console.log("ki az alkoto");
            console.log(ID("alkoto").alt = kepektomb[index].keszitette)
            megjelenit(index);
            console.log("mi a kep elérési útja");
            ID("leiras").innerHTML = "<p> " + kepektomb[index].leiras + "<ul><li>Nem: " + kepektomb[index].sex + "</li><li>A tervezés fázisai:" + kepektomb[index].tervfaz + "</li></ul<p>";

        });
    }

}
var aktKep = 0;

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
    ID("fokep").src = kepektomb[index].kepEleresiut;
    ID("cim").alt = kepektomb[index].cim;
}