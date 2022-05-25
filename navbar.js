window.addEventListener("load", init);

function query(name) {
    return document.querySelector(name);
}

function init()
{
    //make menu icon button
    query("header").innerHTML = `
        <button class="menu-icon-btn" data-menu-icon-btn>
            <svg
                viewbox="0 0 24 24"
                preserveaspectratio="xMidYMid meet"
                focusable="false"
                class="menu-icon">
                <g><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></g>
            </svg>
        </button>
        <h3>#Fenntarthatóság2022</h3>`;
    //menu button
    query("[data-menu-icon-btn]").addEventListener("click", () => {
        query("[data-sidebar]").classList.toggle("open")
    })

    //get if on gihub
    let get_if_git = new XMLHttpRequest();
    get_if_git.open("get", "/", true);
    get_if_git.onload = function()
    {
        if (get_if_git.readyState == 4)
            make_nav(get_if_git.status != 200);
    }
    get_if_git.send();
    //footer
    query("footer").innerHTML = "&copy; Minden jog fenntartva";
}

function make_nav(github_mode=true)
{
    let github_link = "fenntarthatosagi_temahet_2022/";

    console.log((github_mode ? "github pages" : "normal") + " nav");
    query("nav").innerHTML = `
    <!-- kezdőlap -->
    <div class="top-sidebar">
        <a href="/${github_mode ? github_link : ""}index.html" class="channel-logo"><img src="https://img.icons8.com/glyph-neue/344/home.png" alt="Channel Logo" /></a>
        <div class="hidden-sidebar your-channel">Kezdőlap</div>
        <div class="hidden-sidebar channel-name">Fenntarthatósági témahét</div>
    </div>
    <div class="middle-sidebar">
        <ul class="sidebar-list">
            <!-- cikkek -->
            <li class="sidebar-list-item sidebar-cikkek">
                <a href="/${github_mode ? github_link : ""}cikkek.html" class="sidebar-link">
                    <img src="https://img.icons8.com/ios-filled/344/news.png" />
                    <div class="hidden-sidebar">Cikkek</div>
                </a>
            </li>
            <!-- tesztek -->
            <li class="sidebar-list-item sidebar-tesztek">
                <a href="/${github_mode ? github_link : ""}tesztek.html" class="sidebar-link">
                    <img src="https://img.icons8.com/ios-filled/344/survey.png" />
                    <div class="hidden-sidebar">Tesztek</div>
                </a>
            </li>
            <!-- ruha bemutató -->
            <li class="sidebar-list-item sidebar-galeria">
                <a href="/${github_mode ? github_link : ""}galeria/galeria.html" class="sidebar-link">
                    <img src="https://img.icons8.com/ios-filled/344/dress-front-view.png" />
                    <div class="hidden-sidebar">Ruha bemutató</div>
                </a>
            </li>
            <!-- játékok -->
            <li class="sidebar-list-item sidebar-jatekok">
                <a href="/${github_mode ? github_link : ""}jatekok.html" class="sidebar-link">
                    <img src="https://img.icons8.com/ios-filled/344/controller.png" />
                    <div class="hidden-sidebar">Játékok</div>
                </a>
            </li>
        </ul>
    </div>`;

    if (document.URL.includes("cikkek.html")) {
        query(".sidebar-cikkek").classList.toggle("active-page");
    }
    else if (document.URL.includes("tesztek.html")) {
        query(".sidebar-tesztek").classList.toggle("active-page");
    }
    else if (document.URL.includes("galeria")) {
        query(".sidebar-galeria").classList.toggle("active-page");
    }
    else if (document.URL.includes("jatekok.html")) {
        query(".sidebar-jatekok").classList.toggle("active-page");
    }
}