window.addEventListener("load", init);

window.addEventListener("resize", change_size)

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


function init() {
    //ttt
    query("#ttt_div").innerHTML = '<div id="ttt_name"><h1>Tic-Tac-Toe</h1></div><div id="options"></div><div id="ttt"></div><div id="ttt_info"><div id="title"></div><div id="progress"><p>Játék állapota:</p><p>Névmegadásra várrás...</p></div></div>';
    query("#options").innerHTML = '<p>A játékosok neve:</p><form onsubmit="start_play(p1.value, p2.value, size.value);return false"><label for="p1">1. játékos (X)</label><br><input type="text" id="p1" name="p1" value="X"><br><label for="p2">2. játékos (O)</label><br><input type="text" id="p2" name="p2" value="O"><br><label for="size">board size</label><br><input type="text" id="size" name="size" value="3"><br><br><input type="submit" value="Kezdhetjük?"></form>';
    //kfk
    query_all("#bal img", q=>q.onclick = click_boat);
    query_all("#bal img", q=>q.onmouseover = kiemel);
    query_all("#bal img", q=>q.onmouseout = kiemel_out);
}



//ttt

var board_size = 3;
var lepes = 0;
var p1_name = "X";
var p2_name = "O";

function change_size()
{
    query("#ttt").style.height = window.getComputedStyle(query("#ttt")).width;
    query_all("#ttt>div", q=>q.style.height = window.getComputedStyle(query("#ttt>div")).width);
}

function background_in(evt)
{
    evt.target.style.backgroundColor = "darkgray";
    if(evt.target.className == "mezo, selected")
        evt.target.removeEventListener("mouseover", background_in);
}

function background_out(evt)
{
    evt.target.style.backgroundColor = "";
}

function change_simbol(evt)
{
    p_elem = evt.target.firstChild;
    if(lepes % 2 == 0)
    {
        p_elem.innerHTML = "X";
        query("#progress>p:nth-child(2)").innerHTML = "Az aktuális játékos: " + p2_name;
    }
    else
    {
        p_elem.innerHTML = "O";
        query("#progress>p:nth-child(2)").innerHTML = "Az aktuális játékos: " + p1_name;
    }
    evt.target.removeEventListener("click", change_simbol);
    evt.target.removeEventListener("mouseover", background_in);
    evt.target.className += ", selected";
    lepes++;
    let status = calculate_winner();
    if(status != 0 || lepes==Math.pow(board_size, 2))
    {
        let winner_text = "Döntetlen!";
        if(status == 1)
            winner_text = p1_name + " nyert!";
        else if(status == -1)
            winner_text = p2_name + " nyert!";
        query("#progress>p:nth-child(2)").innerHTML = `Eredmény: ${winner_text}`;
        query_all("#ttt>.mezo", q=>q.className += ", selected");
        query_all("#ttt>.selected", q=>q.removeEventListener("click", change_simbol));
        query_all("#ttt>.selected", q=>q.removeEventListener("mouseover", background_in));
    }
}

function start_play(p1, p2, size)
{
    if(p1!="")
        p1_name = p1;
    if(p2!="")
        p2_name = p2;
    if(size!="")
        board_size = size;
    //create board
    for (let x = 0; x < Math.pow(board_size, 2); x++)
    {
        query("#ttt").innerHTML += '<div><p> </p></div>';
    }
    query_all("#ttt>div", q=>q.style.width = (100 / board_size) + "%");
    //disable forms
    query_all("#options>form>input", q=>q.disabled = true);
    change_size();
    //addevent
    query_all("#ttt>div", q=>q.className = "mezo");
    query_all("#ttt>.mezo", q=>q.addEventListener("mouseout", background_out));
    query_all("#ttt>.mezo", q=>q.addEventListener("mouseover", background_in));
    query_all("#ttt>.mezo", q=>q.addEventListener("click", change_simbol));
    //kezd txt
    query("#progress>p:nth-child(2)").innerHTML = p1_name + " kezd.";
    change_size();
}

function calculate_winner()
{
    //get board
    let board = [];
    let board_h = [];
    board_elements = query_all_raw("#ttt>div>p");
    for(let x=0; x < board_elements.length; x++)
    {
        board_h.push(board_elements[x].innerHTML);
        if((x+1) % board_size == 0)
        {
            board.push(board_h);
            board_h = [];
        }
    }
    console.log(board);
    //get points
    let p1_check = "";
    let p2_check = "";
    if(board_size < 5)
    {
        for (let x = 0; x < board_size; x++)
        {
            p1_check += "X";
            p2_check += "O";
        }
    }
    else
    {
        p1_check = "XXXXX";
        p2_check = "OOOOO";
    }
    let x_points = 0, o_points = 0;
    let line = "";
    //row
    for(let x = 0; x < board_size; x++)
    {
        for(let y = 0; y < board_size; y++)
        {
            if(board[x][y] != "X" && board[x][y] != "O")
                line += " ";
            else
                line += board[x][y];
        }
        line += " ";
    }
    //console.log(line);
    if(line.indexOf(p1_check) != -1)
        x_points++;
    else if(line.indexOf(p2_check) != -1)
        o_points++;
    //column
    line = "";
    for(let y = 0; y < board_size; y++)
    {
        for(let x = 0; x < board_size; x++)
        {
            if(board[x][y] != "X" && board[x][y] != "O")
                line += " ";
            else
                line += board[x][y];
        }
        line += " ";
    }
    //console.log(line);
    if(line.indexOf(p1_check) != -1)
        x_points++;
    else if(line.indexOf(p2_check) != -1)
        o_points++;
    //diagonal
    for (let y = 0-board_size; y < board_size; y++)
    {
        let cross1 = "", cross2 = "";
        for(let x = 0; x < board_size; x++)
        {
            try
            {
                if(board[x][x+y] != "X" && board[x][x+y] != "O")
                    cross1 += " ";
                else
                    cross1 += board[x][x+y];
                if(board[x][board_size-1-x+y] != "X" && board[x][board_size-1-x+y] != "O")
                    cross2 += " ";
                else
                    cross2 += board[x][board_size-1-x+y];
            } catch (TypeError){}
        }
        //console.log("shift " + y + ", cross 1: " + cross1);
        //console.log("shift " + y + ", cross 2: " + cross2);
        if(cross1.indexOf(p1_check) != -1)
            x_points++;
        else if(cross1.indexOf(p2_check) != -1)
            o_points++;
        if(cross2.indexOf(p1_check) != -1)
            x_points++;
        else if(cross2.indexOf(p2_check) != -1)
            o_points++;
    }
    console.log("x: " + x_points + ", o: " + o_points);
    //get winner
    if(x_points>o_points)
        return 1;
    else if(x_points<o_points)
        return -1;
    else
        return 0;
}



//kfk

function restart()
{
    //delete
    query_all("#csonak img, #bal img, #jobb img", q=>q.remove());
    //replace images
    query("#bal p").innerHTML = '<img src="../img/kecske.png" alt="kecske"><img src="../img/kaposzta.png" alt="kaposzta"><img src="../img/farkas.png" alt="farkas">';
    //init
    query_all("#bal img", q=>q.onclick = click_boat);
    query_all("#bal img", q=>q.onmouseover = kiemel);
    query_all("#bal img", q=>q.onmouseout = kiemel_out);
}

function click_boat(evt)
{
    let lost = false;
    let side = evt.target.parentNode.parentNode.id == "bal";
    console.log("\nCsonak: ");
    if(side)
        query("#csonak").innerHTML += `<img src="${evt.target.src}" alt="allat">`;
    else
        query("#csonak").innerHTML += `<img class="jobb" src="${evt.target.src}" alt="allat">`;
    let farkas = false;
    let kecske = false;
    let kaposzta = false;
    if(query_all_raw("#csonak img").length > 1)
    {
        alert("A csónakban egyszerre csak 1 állat utazhat! A csónak elsüllyedt! Vesztettél");
        lost = true;
    }
    if(!lost)
    {
        query_all_raw("#csonak img").forEach(animal => {
            let animal_name = (animal.src.split("/img/")[1]).split(".")[0];
            console.log(animal_name);
            if(animal_name.indexOf("farkas") != -1)
                farkas = true;
            else if(animal_name.indexOf("kecske") != -1)
                kecske = true;
            else if(animal_name.indexOf("kaposzta") != -1)
                kaposzta = true;
        });
        if(farkas && kecske)
        {
            alert("A farkas és a kecske nem lehetnek együtt! Vesztettél!");
            lost = true;
        }
        if(kecske && kaposzta)
        {
            alert("A kecske és a káposzta nem lehetnek együtt! Vesztettél!");
            lost = true;
        }
    }
    if(!lost)
    {
        evt.target.remove();
        farkas = false;
        kecske = false;
        kaposzta = false;
        if(side)
        {
            console.log("\nBall: ");
            animals = query_all_raw("#bal img");
        }
        else
        {
            console.log("\nJobb: ");
            animals = query_all_raw("#jobb img");
        }
        animals.forEach(animal => {
            let animal_name = (animal.src.split("/img/")[1]).split(".")[0];
            console.log(animal_name);
            if(animal_name.indexOf("farkas") != -1)
                farkas = true;
            else if(animal_name.indexOf("kecske") != -1)
                kecske = true;
            else if(animal_name.indexOf("kaposzta") != -1)
                kaposzta = true;
        });
        if(farkas && kecske)
        {
            alert("A farkas és a kecske nem lehetnek együtt! Vesztettél!");
            lost = true;
        }
        if(kecske && kaposzta)
        {
            alert("A kecske és a káposzta nem lehetnek együtt! Vesztettél!");
            lost = true;
        }
    }
    if(!lost)
    {
        query_all("#csonak img", q=>q.onclick = click_szelso);
        query_all("#csonak img", q=>q.onmouseover = kiemel);
        query_all("#csonak img", q=>q.onmouseout = kiemel_out);
    }
    else
        restart();
}

function click_szelso(evt)
{
    console.log(query_all_raw("#jobb img"));
    if(query_all_raw("#jobb img").length < 2)
    {
        let lost = false;
        let side = (evt.target.className.indexOf("jobb") != -1);
        if(side)
        {
            console.log("\nJobb: ");
            query("#bal>p").innerHTML += `<img src="${evt.target.src}" alt="allat">`;
        }
        else
        {
            console.log("\nBal: ");
            query("#jobb>p").innerHTML += `<img src="${evt.target.src}" alt="allat">`;
        }
        if(0>1)
        {
            let farkas = false;
            let kecske = false;
            let kaposzta = false;
            let animals;
            if(side)
                animals = query_all_raw("#bal img");
            else
                animals = query_all_raw("#jobb img");
            animals.forEach(animal => {
                let animal_name = (animal.src.split("/img/")[1]).split(".")[0];
                console.log(animal_name);
                if(animal_name.indexOf("farkas") != -1)
                    farkas = true;
                else if(animal_name.indexOf("kecske") != -1)
                    kecske = true;
                else if(animal_name.indexOf("kaposzta") != -1)
                    kaposzta = true;
            });
            if(farkas && kecske)
            {
                alert("A farkas és a kecske nem lehetnek együtt! Vesztettél!");
                lost = true;
            }
            if(kecske && kaposzta)
            {
                alert("A kecske és a káposzta nem lehetnek együtt! Vesztettél!");
                lost = true;
            }
        }
        if(!lost)
        {
            evt.target.remove();
            if(side)
            {
                query_all("#bal img", q=>q.onclick = click_boat);
                query_all("#bal img", q=>q.onmouseover = kiemel);
                query_all("#bal img", q=>q.onmouseout = kiemel_out);
            }
            else
            {
                query_all("#jobb img", q=>q.onclick = click_boat);
                query_all("#jobb img", q=>q.onmouseover = kiemel);
                query_all("#jobb img", q=>q.onmouseout = kiemel_out);
            }
        }
        else
            restart();
    }
    else
    {
        alert("Nyertél!!!");
        alert("De atól még vesztettél!");
        restart();
    }
}

function kiemel(evt)
{
    evt.target.classList.add("kiemel");
}

function kiemel_out(evt)
{
    evt.target.classList.remove("kiemel");
}