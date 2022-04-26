window.onload = init;

//window.addEventListener("resize", change_size)

function query(name) {
    return document.querySelector(name);
}

function query_all_raw(name) {
    return document.querySelectorAll(name);
}

function query_all(name, arg) {
    //query_all("name", q => q.argument);
    document.querySelectorAll(name).forEach(elem => {arg(elem)});
}

var sheets = [];
var right = 0;
var guesses = 0;

function init()
{
    process_xlsx();
}

function process_xlsx()
{
    /* set up XMLHttpRequest */
    let url = "fenntarthatosagTesztkerdesek.xlsx";
    let oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function() {
        let arraybuffer = oReq.response;

        /* convert data to binary string */
        let data = new Uint8Array(arraybuffer);
        let arr = new Array();
        for (let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        let bstr = arr.join("");

        /* Call XLSX */
        let workbook = XLSX.read(bstr, {
            type: "binary"
        });

        for (let x = 0; x < 4; x++)
        {
            let worksheet = workbook.Sheets[workbook.SheetNames[x]];
            worksheet_processed = XLSX.utils.sheet_to_json(worksheet, {raw: true});
            sheets.push(worksheet_processed);
        }
        console.log(sheets);
        make_tests();
    }
    oReq.send();
}

function make_tests()
{
    //sheets processing
    let sh_processed = [];
    for (let x = 0; x < sheets.length; x++)
    {
        let sh_temp = [];
        let val_temp = [];
        let ker_str = [sheets[1][0].Kérdések, sheets[1][0].Válaszok];
        val_temp.push(sheets[1][0].Válaszok.replace("Helyes válasz: ", " - "));
        for (let x = 1; x < sheets[1].length; x++)
        {
            if(sheets[1][x].Kérdések != undefined)
            {
                sh_temp.push([ker_str, val_temp]);
                ker_str = [sheets[1][x].Kérdések, sheets[1][x].Válaszok]
                val_temp = [];
                val_temp.push(sheets[1][x].Válaszok.replace("Helyes válasz: ", " - "));
            }
            else
                val_temp.push(sheets[1][x].Válaszok);
        }
        sh_processed.push(sh_temp);
    }
    //write out
    console.log(sh_processed);
    sh_processed[0].forEach(kerdes => {
        let kerdes_div = '<div class="kerdes">';
        kerdes_div += `<h4>${kerdes[0][0]}</h4><div class="valaszok"><h5>${kerdes[0][1]}</h5>`;
        kerdes[1].forEach(valasz => {
            kerdes_div += `<h6>${valasz}</h6>`;
        });
        kerdes_div += "</div></div>";
        query("#test_alt>.tests").innerHTML += kerdes_div;
    });
    sh_processed[0].forEach(kerdes => {
        let kerdes_div = '<div class="kerdes">';
        kerdes_div += `<h4>${kerdes[0][0]}</h4><div class="valaszok"><h5>${kerdes[0][1]}</h5>`;
        kerdes[1].forEach(valasz => {
            kerdes_div += `<h6>${valasz}</h6>`;
        });
        kerdes_div += "</div></div>";
        query("#test_koz>.tests").innerHTML += kerdes_div;
    });
    sh_processed[0].forEach(kerdes => {
        let kerdes_div = '<div class="kerdes">';
        kerdes_div += `<h4>${kerdes[0][0]}</h4><div class="valaszok"><h5>${kerdes[0][1]}</h5>`;
        kerdes[1].forEach(valasz => {
            kerdes_div += `<h6>${valasz}</h6>`;
        });
        kerdes_div += "</div></div>";
        query("#test_fel>.tests").innerHTML += kerdes_div;
    });

    //onclick?
    query_all(".kerdes>.valaszok>h6", q=>q.onclick = click_valasz);
}

//ROSZ MEGOLDÁS
function click_valasz(evt)
{
    console.log(evt.target.parentElement);
    if(evt.target.innerHTML.replace(" - ", "") == evt.target.parentElement.children[0].innerHTML.replace("Helyes válasz: ", ""))
    {
        evt.target.parentElement.innerHTML = "Helyes!";
        right++;
    }
    else
        evt.target.parentElement.innerHTML = "Rossz!";
    guesses++;
    query("aside").innerHTML = `Eredmény: ${right}/${guesses}   ${Math.round(right / guesses * 10000) / 100}%`;
}
