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

const before_lehetoseg = "-";
var sheets = [];
var right = 0;
var guesses = 0;

function init()
{
    process_xlsx();
    query_all("#test_alt>h3, #test_koz>h3, #test_fel>h3", q=>q.onclick = click_test);
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
    for (let x = 1; x < sheets.length; x++)
    {
        let sh_temp = [];
        let val_temp = [];
        let lehet_temp = [];
        let ker_str = [sheets[x][0].Kérdések];
        if(sheets[x][0].Válaszok.includes("Helyes válasz: "))
        {
            val_temp.push(sheets[x][0].Válaszok.replace("Helyes válasz: ", ""));
            lehet_temp.push(sheets[x][0].Válaszok.replace("Helyes válasz: ", before_lehetoseg));
        }
        else
            lehet_temp.push(sheets[x][0].Válaszok.replace(" - ", before_lehetoseg));
        for (let y = 1; y < sheets[x].length; y++)
        {
            if(sheets[x][y].Kérdések != undefined)
            {
                sh_temp.push([ker_str, val_temp, lehet_temp]);
                ker_str = [sheets[x][y].Kérdések]
                val_temp = [];
                lehet_temp = [];
                val_temp.push(sheets[x][y].Válaszok.replace("Helyes válasz: ", ""));
                lehet_temp.push(sheets[x][y].Válaszok.replace("Helyes válasz: ", before_lehetoseg));
            }
            else
            {
                if(sheets[x][y].Válaszok.includes("Helyes válasz: "))
                {
                    val_temp.push(sheets[x][y].Válaszok.replace("Helyes válasz: ", ""));
                    lehet_temp.push(sheets[x][y].Válaszok.replace("Helyes válasz: ", before_lehetoseg));
                }
                else
                    lehet_temp.push(sheets[x][y].Válaszok.replace(" - ", before_lehetoseg));
            }
        }
        sh_temp.push([ker_str, val_temp, lehet_temp]);
        sh_processed.push(sh_temp);
    }
    //write out
    console.log(sh_processed);
    write_test_help(sh_processed[0], "alt");
    write_test_help(sh_processed[1], "koz");
    write_test_help(sh_processed[2], "fel");

    //onclick
    query_all(".kerdes>.lehetosegek>h6", q=>q.onclick = click_valasz);
}


//DISPLAY NONE FOR ALL TEST DIVS EXEPT THE CLICKED + RESET SCORE ON CLICK
function click_test(evt)
{
    let clicked_num = Array.from(evt.target.parentElement.parentElement.children).indexOf(evt.target.parentElement)
    console.log(clicked_num);
    console.log(evt.target.parentElement.parentElement.children);
    Array.from(evt.target.parentElement.parentElement.children).forEach(test => {
        test.children.style.display = "none";
    });
}

function write_test_help(cur_sheet, name)
{
    cur_sheet.forEach(kerdes => {
        let kerdes_div = '<div class="kerdes">';
        kerdes_div += `<h4>${kerdes[0]}</h4><div class="valaszok">`;
        kerdes[1].forEach(valasz => {
            kerdes_div += `<p>${valasz}</p>`;
        });
        //lehetőségek
        kerdes_div += `</div><div class="lehetosegek">`;
        let lehetosegek = kerdes[2].copyWithin();
        while(lehetosegek.length > 0)
        {
            let r = Math.floor(Math.random() * (lehetosegek.length))
            kerdes_div += `<h6>${lehetosegek[r]}</h6>`;
            lehetosegek.splice(r, 1);
        }
        kerdes_div += "</div></div>";
        query(`#test_${name}>.tests`).innerHTML += kerdes_div;
    });
}

function check_ans(lehet)
{
    let van = false;
    Array.from(lehet.parentElement.parentElement.children[1].children).forEach(answer => {
        if(answer.innerHTML.replace(" ", "") == lehet.innerHTML.replace(before_lehetoseg, "").replace(" ", ""))
            van = true;
    });
    return van;
}

function click_valasz(evt)
{
    if(check_ans(evt.target))
    {
        evt.target.parentElement.innerHTML = "Helyes!";
        right++;
    }
    else
        evt.target.parentElement.innerHTML = "Rossz!";
    guesses++;
    query("aside").innerHTML = `Eredmény: ${right}/${guesses}   ${Math.round(right / guesses * 10000) / 100}%`;
}
