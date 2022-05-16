window.addEventListener("load", init);

function query(name) {
    return document.querySelector(name);
}

function query_all_raw(name) {
    return document.querySelectorAll(name);
}

function query_all(name, arg) {
    document.querySelectorAll(name).forEach(elem => {arg(elem)});
}

function init()
{
    //load main elements
    query("header").innerHTML += '<div id="theme"><button class="theme_button" onclick="setTheme(false)"><img src="img/sun.png" alt="Light mode"></button></div>';
    query("nav").innerHTML += '<ul><li><a href="index.html">Kezdőoldal</a></li><li><a href="cikkek.html">Cikkek</a></li><li><a href="tesztek.html">Tesztek</a></li><li><a href="galeria/bemutato.html">Ruha bemutató</a></li><li><a href="jatekok.html">Játékok</a></li></ul>';
    query("footer").innerHTML += '<p>teszt</p>';
    //document.cookie = "theme=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}


//set theme
var theme = "dark";

function setTheme(set_cookie=true){
    //empty
    query("#theme>.theme_button>img").remove();

    if(theme=="dark")
    {
        //replace dark with light
        //theme
        query("#theme>.theme_button").innerHTML = `<img src="img/moon.png" alt="Dark mode">`;
        theme = "light";
        if(set_cookie)
            document.cookie = "theme=1; expires=Tue, 1 Jan 2030 12:00:00 UTC; SameSite=Strict";
    }
    else
    {
        //replace light with dark
        //theme
        query("#theme>.theme_button").innerHTML = `<img src="img/sun.png" alt="Light mode">`;
        theme = "dark";
        if(set_cookie)
            document.cookie = "theme=0; expires=Tue, 1 Jan 2030 12:00:00 UTC; SameSite=Strict";
    }
    //set html class for color
    document.documentElement.className = theme;
}