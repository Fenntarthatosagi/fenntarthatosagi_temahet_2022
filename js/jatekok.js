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


const speed_options = [0, 200, 500, 1000, 2000, 5000];
const amount_options = [4, 8, 12, 16, 32, 40];

var card_num = 8;
var turn_speed = 1000;
var turned = 0;
var found = 0;


function init()
{
    //párosítójáték
    //main
    query("#pair_game").innerHTML = '<div class="header"><h1>Párkereső játék</h1></div><div class="main">';
    //making options
    query("#pair_game>.main").innerHTML += '<div id="options"></div>';
    query("#options").innerHTML += '<div id="card_num"><p>Kártyaszám: </p></div>';
    query("#options").innerHTML += '<div id="speed"><p>Visszafordítási sebesség: </p></div>';
    //making field
    query("#pair_game>.main").innerHTML += '<div id="cards"></div>';
    //generating buttons
    amount_options.forEach(amount => {
        query("#card_num").innerHTML += `<button onclick="set_amount(${amount})">${amount} kártya</button>`;
    });
    speed_options.forEach(speed => {
        query("#speed").innerHTML += `<button onclick="set_speed(${speed})">${speed/1000} másodperc</button>`;
    });



    //maemóriajáték
    //main
    query("#memory_game").innerHTML = '<div class="header"><h1>Memóriajáték</h1></div><div class="main">';
    //making options
    query("#memory_game>.main").innerHTML += '<div id="options_mem"></div>';
    query("#options_mem").innerHTML += '<div id="speed_mem"><p>Betekintési idő: </p></div>';
    query("#options_mem").innerHTML += '<div id="card_num_mem"><p>Kártyaszám: </p></div>';
    //making field
    query("#memory_game>.main").innerHTML += '<div id="main_card_mem"></div><div id="cards_mem"></div>';
    //generating buttons
    speed_options_mem.forEach(speed => {
        query("#speed_mem").innerHTML += `<button onclick="set_speed_mem(${speed})">${speed/1000} másodperc</button>`;
    });
    amount_options_mem.forEach(amount => {
        query("#card_num_mem").innerHTML += `<button onclick="set_amount_mem(${amount})">${amount} kártya</button>`;
    });
}

function change_size()
{
    query_all(".pair_card", q=>q.style.width = `${100/(card_num/2)}%`);
    query_all(".card_mem", q=>q.style.width = `${100/(card_num_mem/2)}%`);
}



function pair_start()
{
    //making pairs left list
    let pairs_left = [];
    for (let x = 0; x < card_num/2; x++)
    {
        pairs_left.push(2);
    }
    console.log(pairs_left);
    //popuatin field
    for (let x = 0; x < card_num; x++)
    {
        //getting valid img num
        let pair_num = 0;
        do
        {
            pair_num = Math.floor(Math.random() * (card_num/2));
        } while (pairs_left[pair_num] <= 0);
        pairs_left[pair_num]--;
        console.log(pairs_left);
        //making card
        query("#cards").innerHTML += `<div class="pair_card"><img class="${pair_num + 1}" src="img/jatekok/hatter.png" alt="card"></div>`;
    }
    query_all(".pair_card>img", q=>q.onclick = click_card);
    change_size();
}

function set_speed(speed)
{
    turn_speed = speed;
}

function set_amount(num)
{
    card_num = num;
    query_all("#card_num>button", q=>q.disabled = true);
    pair_start();
}

function turn_back()
{
    query_all(".pair_card>img", q=>q.onclick = null);
    let turned_cards = query_all_raw(".pair_turned");
    if(turn_speed > 0)
    {
        setTimeout( () => {
            turned_cards.forEach(card => {
                card.src = "img/jatekok/hatter.png";
                card.classList.remove("pair_turned");
                card.onclick = click_card;
                query_all(".pair_card>img", q=>q.onclick = click_card);
                query_all(".pair_done", q=>q.onclick = null);
            });
        }, turn_speed)
    }
    else
    {
        turned_cards.forEach(card => {
            card.src = "img/jatekok/hatter.png";
            card.classList.remove("pair_turned");
            card.onclick = click_card;
            query_all(".pair_card>img", q=>q.onclick = click_card);
            query_all(".pair_done", q=>q.onclick = null);
        });
    }
}

function reset()
{
    query_all_raw(".pair_card>img").forEach(card => {
        card.src = "img/jatekok/hatter.png";
        card.classList.remove("pair_turned");
        card.classList.remove("pair_done");
        card.onclick = click_card;
        found = 0;
        turned = 0;
        query("#cards").innerHTML = "";
        query_all("#card_num>button", q=>q.disabled = false);
    });
}

function click_card(evt)
{
    evt.target.src = `img/jatekok/kep${evt.target.className.replace("pair_done", "").replace(" ", "")}.png`;
    evt.target.classList.add("pair_turned");
    evt.target.onclick = null;
    turned = (turned + 1) % 2;
    if(turned == 0)
    {
        let turned_cards = query_all_raw(".pair_turned");
        if (turned_cards[0].className == turned_cards[1].className)
        {
            query_all_raw(".pair_turned").forEach(card => {
            card.classList.remove("pair_turned");
            card.classList.add("pair_done");
            });
            found += 2;
            if(found == card_num)
            {
                alert("Nyertél!")
                reset();
            }
        }
        else
            turn_back();
    }
}


















// memory game

const speed_options_mem = [0, 200, 500, 1000, 3000, 5000, 10000];
const amount_options_mem = [4, 8, 12, 16, 32, 40];

var card_num_mem = 8;
var turn_speed_mem = 3000;
var turned_mem = 0;
var find_card_num = 1;
var cards_left_mem = [];
var score = 0;


function start_mem()
{
    //making pairs left list
    let card_left_start = [];
    for (let x = 0; x < card_num_mem; x++)
    {
        card_left_start.push(true);
    }
    //popuatin field
    for (let x = 0; x < card_num_mem; x++)
    {
        //getting valid img num
        let mem_card_num = 0;
        do
        {
            mem_card_num = Math.floor(Math.random() * (card_num_mem));
        } while (!card_left_start[mem_card_num]);
        card_left_start[mem_card_num] = false;
        console.log(card_left_start);
        //making card
        query("#cards_mem").innerHTML += `<div class="card_mem"><img class="${mem_card_num + 1}" src="img/jatekok/kep${mem_card_num + 1}.png" alt="card"></div>`;
    }
    //get target
    for (let x = 0; x < card_num_mem; x++)
    {
        cards_left_mem.push(true);
    }
    setTimeout(() => {
        query_all(".card_mem>img", q=>q.src = "img/jatekok/hatter.png");
        query("#main_card_mem").innerHTML = `<h3>Találd meg ezt a kártyát<h3><div id="find_card"><img src="" alt="find this card"></div>`;
        get_find_card();
        query_all(".card_mem>img", q=>q.onclick = click_card_mem);
    }, turn_speed_mem);
    change_size();
}

function get_find_card()
{
    do
    {
        find_card_num = Math.floor(Math.random() * (card_num_mem)) + 1;
    } while (!cards_left_mem[find_card_num - 1]);
    console.log("Find: " + (find_card_num - 1));
    cards_left_mem[find_card_num - 1] = false;
    query("#find_card>img").src = `img/jatekok/kep${find_card_num}.png`;
}

function set_speed_mem(speed)
{
    turn_speed_mem = speed;
}

function set_amount_mem(num)
{
    card_num_mem = num;
    query_all("#speed_mem>button", q=>q.disabled = true);
    query_all("#card_num_mem>button", q=>q.disabled = true);
    start_mem();
}

function reset_mem()
{
    query_all_raw(".card_mem>img").forEach(card => {
        card.src = "img/jatekok/hatter.png";
        card.classList.remove("turned_mem");
        card.onclick = click_card_mem;
        score = 0;
        turned_mem = 0;
        cards_left_mem = [];
        query("#cards_mem").innerHTML = "";
        query("#main_card_mem").innerHTML = "";
        query_all("#speed_mem>button", q=>q.disabled = false);
        query_all("#card_num_mem>button", q=>q.disabled = false);
    });
}

function click_card_mem(evt)
{
    //console.log(evt.target);
    let card_number = evt.target.className.replace(" ", "")
    console.log("Clicked: " + (card_number - 1));
    cards_left_mem[card_number - 1] = false;
    console.log(cards_left_mem);
    evt.target.src = `img/jatekok/kep${card_number}.png`;
    evt.target.classList.add("turned_mem");
    evt.target.onclick = null;
    turned_mem++;
    if(find_card_num == card_number)
        score++;
    if(turned_mem == card_num_mem || cards_left_mem.indexOf(true) == -1)
    {
        alert(`A játéknak vége: ${score}/${card_num_mem}`);
        reset_mem();
    }
    else
        get_find_card();
}