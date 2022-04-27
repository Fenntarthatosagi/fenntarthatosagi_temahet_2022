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


const speed_options_mem = [0, 200, 500, 1000, 2000, 5000];
const amount_options_mem = [4, 8, 12, 16, 32, 40];

var card_num_mem = 8;
var turn_speed_mem = 1000;
var turned_mem = 0;
var found_mem = 0;
var find_card_num = 1;
var cards_left_mem = [];

function init()
{
    //párosítójáték
    //main
    query("#pair_game").innerHTML = '<div class="header"><h1>Párkereső játék</h1></div><div class="main">';
    //making options
    query("#pair_game>.main").innerHTML += '<div id="options"></div>';
    query("#options").innerHTML += '<div id="card_num"><p>Kártyaszám: </p></div>';
    query("#options").innerHTML += '<div id="speed"><p>Sebesség: </p></div>';
    //making field
    query("#pair_game>.main").innerHTML += '<div id="cards"></div>';
    //generating buttons
    speed_options.forEach(speed => {
        query("#speed").innerHTML += `<button onclick="set_speed(${speed})">${speed/1000} másodperc</button>`;
    });
    amount_options.forEach(amount => {
        query("#card_num").innerHTML += `<button onclick="set_amount(${amount})">${amount} kártya</button>`;
    });

    //maemóriajáték
    //main
    query("#memory_game").innerHTML = '<div class="header"><h1>Memóriajáték</h1></div><div class="main">';
    //making options
    query("#memory_game>.main").innerHTML += '<div id="options_mem"></div>';
    query("#options_mem").innerHTML += '<div id="card_num_mem"><p>Kártyaszám: </p></div>';
    query("#options_mem").innerHTML += '<div id="speed_mem"><p>Sebesség: </p></div>';
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

function start_mem()
{
    //making pairs left list
    let pairs_left = [];
    for (let x = 0; x < card_num_mem/2; x++)
    {
        pairs_left.push(2);
    }
    console.log(pairs_left);
    //popuatin field
    for (let x = 0; x < card_num_mem; x++)
    {
        //getting valid img num
        let pair_num = 0;
        do
        {
            pair_num = Math.floor(Math.random() * (card_num_mem/2));
        } while (pairs_left[pair_num] <= 0);
        pairs_left[pair_num]--;
        console.log(pairs_left);
        //making card
        query("#cards_mem").innerHTML += `<div class="card_mem"><img class="${pair_num + 1}" src="img/jatekok/hatter.png" alt="card"></div>`;
    }
    query_all(".card_mem>img", q=>q.onclick = click_card_mem);
    //get target
    for (let x = 0; x < card_num_mem; x++)
    {
        cards_left_mem.push(true);
    }
    get_find_card();
}

function get_find_card()
{
    do
    {
        find_card_num = Math.floor(Math.random() * (card_num_mem/2)) + 1;
        console.log(find_card_num);
    } while (!cards_left_mem[find_card_num - 1]);
    cards_left_mem[find_card_num - 1] = false;
    query("#main_card_mem").innerHTML = `<div id="find_card"><img src="img/jatekok/kep${find_card_num}.png" alt="find this card"></div>`;
}

function set_speed_mem(speed)
{
    turn_speed_mem = speed;
}

function set_amount_mem(num)
{
    card_num_mem = num;
    query_all("#card_num_mem>button", q=>q.disabled = true);
    start_mem();
}

function turn_back_mem()
{
    query_all(".card_mem>img", q=>q.onclick = null);
    let turned_cards = query_all_raw(".turned_mem");
    if(turn_speed_mem > 0)
    {
        setTimeout( () => {
            turned_cards.forEach(card => {
                card.src = "img/jatekok/hatter.png";
                card.classList.remove("turned_mem");
                card.onclick = click_card_mem;
                query_all(".card_mem>img", q=>q.onclick = click_card_mem);
                query_all(".done_mem", q=>q.onclick = null);
            });
        }, turn_speed_mem)
    }
    else
    {
        turned_cards.forEach(card => {
            card.src = "img/jatekok/hatter.png";
            card.classList.remove("turned_mem");
            card.onclick = click_card_mem;
            query_all(".card_mem>img", q=>q.onclick = click_card_mem);
            query_all(".done_mem", q=>q.onclick = null);
        });
    }
}

function reset_mem()
{
    query_all_raw(".card_mem>img").forEach(card => {
        card.src = "img/jatekok/hatter.png";
        card.classList.remove("turned_mem");
        card.classList.remove("done_mem");
        card.onclick = click_card_mem;
        found_mem = 0;
        turned_mem = 0;
        query("#cards_mem").innerHTML = "";
        query_all("#card_num_mem>button", q=>q.disabled = false);
    });
}

function click_card_mem(evt)
{
    evt.target.src = `img/jatekok/kep${evt.target.className.replace("done_mem", "").replace(" ", "")}.png`;
    evt.target.classList.add("turned_mem");
    evt.target.onclick = null;
    turned_mem = (turned_mem + 1) % 2;
    if(turned_mem == 0)
    {
        let turned_cards = query_all_raw(".turned_mem");
        if (turned_cards[0].className == turned_cards[1].className)
        {
            query_all_raw(".turned_mem").forEach(card => {
            card.classList.remove("turned_mem");
            card.classList.add("done_mem");
            });
            found_mem += 2;
            if(found_mem == card_num_mem)
            {
                alert("Nyertél!")
                reset_mem();
            }
        }
        else
            turn_back_mem();
    }
}