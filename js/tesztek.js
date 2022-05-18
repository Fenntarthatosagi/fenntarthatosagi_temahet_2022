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
var current_sh = -1;
var sheets = [];
var score = 0;
var guesses = 0;

function init()
{
    process_xlsx();
    query_all("#tests h3", q=>q.onclick = click_test);
    query_all(".tests", q=>q.style.display = "none");
}

function process_xlsx()
{
    /* set up XMLHttpRequest */
    //fenntarthatosagTesztkerdesek
    //fenntarthatosagCikkek
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

const sh_processed = [];
function make_tests()
{
    //sheets processing
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
    write_test_help(0, "alt");
    write_test_help(1, "koz");
    write_test_help(2, "fel");

    //onclick
    query_all("form .submit_button", q=>q.addEventListener('click', click_submit));
    //query_all(".kerdes>.lehetosegek>h6", q=>q.onclick = click_valasz);
}

function click_submit(evt)
{
    //get all answers for this test
    guesses = 0;
    score = 0;
    sh_processed[current_sh].forEach(question => {
        guesses += question[1].length;
    });
    let data = Object.fromEntries(new FormData(evt.target.parentElement).entries());
    console.log(data)
    for (const key in data) {
        //onsole.log(data[key].replace(before_lehetoseg, "").replace(" ", ""));
        //console.log(sh_processed[current_sh][key.split("_")[0]][1][0].replace(" ", ""));
        if(sh_processed[current_sh][key.split("_")[0]][1].length == 1)
        {
            if(sh_processed[current_sh][key.split("_")[0]][1][0].replace(" ", "") == data[key].replace(before_lehetoseg, "").replace(" ", ""))
                score++;
        }
        else
        {
            sh_processed[current_sh][key.split("_")[0]][1].forEach(ans => {
                if(ans.replace(" ", "") == data[key].replace(before_lehetoseg, "").replace(" ", ""))
                score++;
            });
        }
        //if (data[key] == sh_processed[current_sh + 1])
    }
    query("#resoult>.text").innerHTML = `${score}/${guesses}</br>${Math.round(score / guesses * 10000) / 100}%`;
}

function click_test(evt)
{
    let prev_sh = current_sh;
    current_sh = Array.from(evt.target.parentElement.parentElement.children).indexOf(evt.target.parentElement)
    //shut all
    Array.from(evt.target.parentElement.parentElement.children).forEach(test => {
        test.children[1].style.display = "none";
    });
    //open evt
    if(current_sh != prev_sh)
        evt.target.parentElement.children[1].style.display = "unset";
    else
        current_sh = -1;
    //reset
    reset();
}

function reset()
{
    score = 0;
    guesses = 0;
    //RESET INPUT
    query_all('form input[type=checkbox], form input[type=radio]', q=>q.checked = false);
    query("#resoult>.text").innerHTML = "...";
    // query_all(".siker_e", q=>q.style.display = "none");
    // query_all(".lehetosegek>h6", q=>q.style.color = "black");
    //query_all(".lehetosegek>h6", q=>q.onclick = click_valasz);
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

function check_ans(lehet)
{
    let van = false;
    Array.from(lehet.parentElement.parentElement.children[1].children).forEach(answer => {
        if(answer.innerHTML.replace(" ", "") == lehet.innerHTML.replace(before_lehetoseg, "").replace(" ", ""))
            van = true;
    });
    return van
}

function click_valasz(evt)
{
    Array.from(evt.target.parentElement.children).forEach(lehetoseg => {
        if(check_ans(lehetoseg))
            lehetoseg.style.color = "green";
        else
            lehetoseg.style.color = "red";
        lehetoseg.onclick = null;
    });
    if(check_ans(evt.target))
    {
        evt.target.parentElement.parentElement.children[3].innerHTML = "Helyes!";
        evt.target.parentElement.parentElement.children[3].style.color = "green";
        score++;
    }
    else
    {
        evt.target.parentElement.parentElement.children[3].innerHTML = "Rossz!";
        evt.target.parentElement.parentElement.children[3].style.color = "red";
    }
    evt.target.parentElement.parentElement.children[3].style.display = "unset";
    guesses++;
    query("#resoult>.text").innerHTML = `${score}/${guesses}   ${Math.round(score / guesses * 10000) / 100}%`;
}
