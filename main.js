window.onload = init;

function querry(name) {
    return document.querySelector(name);
}

function querry_all_raw(name) {
    return document.querySelectorAll(name);
}

function querry_all(name, arg) {
    document.querySelectorAll(name).forEach(elem => {arg(elem)});
}

function init()
{
    //load main elements
    querry("header").innerHTML += '<div id="theme"><button class="theme_button" onclick="setTheme(false)"><img src="img/sun.png" alt="Light mode"></button></div>';
    querry("nav").innerHTML += '<ul><li><a href="index.html">Kezdőoldal</a></li><li><a href="cikkek.html">Cikkek</a></li><li><a href="tesztek.html">Tesztek</a></li><li><a href="diabemutato.html">Diabemutató</a></li><li><a href="ruha_bemutato.html">Ruha bemutató</a></li><li><a href="jatekok.html">Játékok</a></li></ul>';
    querry("footer").innerHTML += '<p>teszt</p>';
    //process_json();
    //document.cookie = "theme=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}

function process_json()
{
    let file = null;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.overrideMimeType('text/xml; charset=iso-8859-2');
    xmlhttp.open("get", "test.json", true);
    xmlhttp.onload = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            try
            {
                let file = JSON.parse(xmlhttp.responseText);
                console.log(file);
                file.forEach(elem =>
                {
                    elem.name = elem.name.replace("_", " ");
                    console.log(elem.name[0].toUpperCase() + elem.name.substring(1));
                });
            } catch (SyntaxError) {
                console.log("JSON parsing error!");
            }
        }
        else if(xmlhttp.readyState == 4 && xmlhttp.status != 200)
        {
            console.log("ERROR!");
        }
    }
    xmlhttp.send();
}


//set theme
var theme = "dark";

function setTheme(set_cookie=true){
    //empty
    querry("#theme>.theme_button>img").remove();

    if(theme=="dark")
    {
        //replace dark with light
        //theme
        querry("#theme>.theme_button").innerHTML = `<img src="img/moon.png" alt="Dark mode">`;
        theme = "light";
        if(set_cookie)
            document.cookie = "theme=1; expires=Tue, 1 Jan 2030 12:00:00 UTC; SameSite=Strict";
    }
    else
    {
        //replace light with dark
        //theme
        querry("#theme>.theme_button").innerHTML = `<img src="img/sun.png" alt="Light mode">`;
        theme = "dark";
        if(set_cookie)
            document.cookie = "theme=0; expires=Tue, 1 Jan 2030 12:00:00 UTC; SameSite=Strict";
    }
    //set html class for color
    document.documentElement.className = theme;
}