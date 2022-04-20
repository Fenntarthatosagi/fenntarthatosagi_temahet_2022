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
    
}