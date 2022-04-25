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

        var sheets = [];
        for (let x = 0; x < 4; x++)
        {
            let worksheet = workbook.Sheets[workbook.SheetNames[x]];
            worksheet_processed = XLSX.utils.sheet_to_json(worksheet, {raw: true});
            sheets.push(worksheet_processed);
        }
        console.log(sheets);
    }
    oReq.send();
}
