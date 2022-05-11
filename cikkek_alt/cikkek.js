window.addEventListener("load", init);

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

const before_lehetoseg = " ";
var current_sh;
var sheets = [];
var score = 0;
var guesses = 0;

function init()
{
    process_xlsx();
}

function process_xlsx()
{
    /* set up XMLHttpRequest */
    //fenntarthatosagTesztkerdesek
    //fenntarthatosagCikkek
    let url = "fenntarthatosagCikkek_original.xlsx";
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
        for (let x = 0; x < workbook.SheetNames.length; x++)
        {
            let worksheet = workbook.Sheets[workbook.SheetNames[x]];
            worksheet_processed = XLSX.utils.sheet_to_json(worksheet, {raw: true});
            sheets.push(worksheet_processed);
        }
        make_tests();
    }
    oReq.send();
}

const sh_processed = [];

function make_tests()
{
    //sheets processing
    sheets.forEach(sheet => {
        sh_processed_part = [];
        sheet.forEach(line => {
            if(line[Object.keys(line)[1]] != undefined)
                sh_processed_part.push({"text": line[Object.keys(line)[0]], "type": line[Object.keys(line)[1]].toLowerCase(), "img": line[Object.keys(line)[2]]});
        });
        sh_processed.push(sh_processed_part);
    });
    console.log(sh_processed);
    write_cikk();
}

function write_cikk()
{
    let txt = "";
    sh_processed.forEach(cikk => {
        txt += '<div class="cikk">';
        cikk.forEach(line => {
            console.log(line["type"]);
            //txt += '<div class="line">';
            if(line["type"] == "cikk címe")
                txt += `<h1>${line["text"]}</h1>`;
            else if(line["type"] == "cím")
                txt += `<h2>${line["text"]}</h2>`;
            else if(line["type"] == "alcím" || line["type"] == "alpont")
                txt += `<h3>${line["text"]}</h3>`;
            else if(line["type"] == "bekezdés")
                txt += `<h4>${line["text"]}</h4>`;
            else if(line["type"] == "hivatkozás" || line["type"] == "link")
                txt += `<a href="${line["text"]}">LINK</a>`;
            else
                txt += `<p>${line["type"]} ${line["text"]}</p>`;
            if(line["img"] != undefined)
                txt += `<img src="${line["img"]}" alt="${line["img"].replace(".jpg", "")}">`;
            //txt += "</div>";
        });
        txt += '</div>';
    });
    query("#cikkek").innerHTML += txt;
}

function write_test_help(cur_sheet_num, name)
{
    let cur_sheet = sh_processed[cur_sheet_num];
    let q_num = 0;
    let kerdes_div = '<form class="kerdes">';
    cur_sheet.forEach(kerdes => {
        kerdes_div += `<label>${kerdes[0]}</label><br></br>`;
        let lehetosegek = kerdes[2].copyWithin();
        while(lehetosegek.length > 0)
        {
            let r = Math.floor(Math.random() * (lehetosegek.length))
            if (kerdes[1].length > 1)
                kerdes_div += `<input type="checkbox" name="${q_num}_${lehetosegek.length}" value="${lehetosegek[r]}"><label>${lehetosegek[r]}</label><br>`;
            else
                kerdes_div += `<input type="radio" name="${q_num}" value="${lehetosegek[r]}"><label>${lehetosegek[r]}</label><br>`;
            lehetosegek.splice(r, 1);
        }
        kerdes_div += '</br>';
        q_num++;
    });
    kerdes_div += '<input class="submit_button" value="Elküld" type="button"></form>';
    query(`#test_${name}>.tests`).innerHTML += kerdes_div;
}