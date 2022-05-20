window.addEventListener("load", init);

function query(name) {
    return document.querySelector(name);
}

const menuIconButton = document.querySelector("[data-menu-icon-btn]")
const sidebar = document.querySelector("[data-sidebar]")

function init()
{
    //menu button
    menuIconButton.addEventListener("click", () => {
        sidebar.classList.toggle("open")
    })


    query("nav").innerHTML = `
    <!-- kezdőlap -->
    <div class="top-sidebar">
        <a href="/fenntarthatosagi_temahet_2022/index.html" class="channel-logo"><img src="https://img.icons8.com/glyph-neue/344/home.png" alt="Channel Logo" /></a>
        <div class="hidden-sidebar your-channel">Kezdőlap</div>
        <div class="hidden-sidebar channel-name">Fenntarthatósági témahét</div>
    </div>
    <div class="middle-sidebar">
        <ul class="sidebar-list">
            <!-- cikkek -->
            <li class="sidebar-list-item sidebar-cikkek">
                <a href="/fenntarthatosagi_temahet_2022/cikkek.html" class="sidebar-link">
                    <img src="https://img.icons8.com/ios-filled/344/news.png" />
                    <div class="hidden-sidebar">Cikkek</div>
                </a>
            </li>
            <!-- tesztek -->
            <li class="sidebar-list-item sidebar-tesztek">
                <a href="/fenntarthatosagi_temahet_2022/tesztek.html" class="sidebar-link">
                    <img src="https://img.icons8.com/ios-filled/344/survey.png" />
                    <div class="hidden-sidebar">Tesztek</div>
                </a>
            </li>
            <!-- ruha bemutató -->
            <li class="sidebar-list-item sidebar-galeria">
                <a href="/fenntarthatosagi_temahet_2022/galeria/galeria.html" class="sidebar-link">
                    <img src="https://img.icons8.com/ios-filled/344/dress-front-view.png" />
                    <div class="hidden-sidebar">Ruha bemutató</div>
                </a>
            </li>
            <!-- játékok -->
            <li class="sidebar-list-item sidebar-jatekok">
                <a href="/fenntarthatosagi_temahet_2022/jatekok.html" class="sidebar-link">
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