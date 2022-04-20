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
    query("#memory_game").innerHTML = '<div class="header"><h1>Memóriajáték</h1></div><div class="main">';
    //making options
    query(".main").innerHTML += '<div id="options"></div>';
    query("#options").innerHTML += '<div id="card_num"><p>Card amount: </p></div>';
    query("#options").innerHTML += '<div id="speed"><p>Speed settings: </p></div>';
    //making field
    query(".main").innerHTML += '<div id="cards"></div>';
    //generating buttons
    speed_options.forEach(speed => {
        query("#speed").innerHTML += `<button onclick="set_speed(${speed})">${speed/1000} sec</button>`;
    });
    amount_options.forEach(amount => {
        query("#card_num").innerHTML += `<button onclick="set_amount(${amount})">${amount} cards</button>`;
    });

    //maemóriajáték
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
        query("#cards").innerHTML += `<div class="card"><img class="${pair_num + 1}" src="img/jatekok/hatter.png" alt="card"></div>`;
    }
    query_all(".card>img", q=>q.onclick = click_card);
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
    query_all(".card>img", q=>q.onclick = null);
    let turned_cards = query_all_raw(".turned");
    if(turn_speed > 0)
    {
        setTimeout( () => {
            turned_cards.forEach(card => {
                card.src = "img/jatekok/hatter.png";
                card.classList.remove("turned");
                card.onclick = click_card;
                query_all(".card>img", q=>q.onclick = click_card);
                query_all(".done", q=>q.onclick = null);
            });
        }, turn_speed)
    }
    else
    {
        turned_cards.forEach(card => {
            card.src = "img/jatekok/hatter.png";
            card.classList.remove("turned");
            card.onclick = click_card;
            query_all(".card>img", q=>q.onclick = click_card);
            query_all(".done", q=>q.onclick = null);
        });
    }
}

function reset()
{
    query_all_raw(".card>img").forEach(card => {
        card.src = "img/jatekok/hatter.png";
        card.classList.remove("turned");
        card.classList.remove("done");
        card.onclick = click_card;
        found = 0;
        turned = 0;
        query("#cards").innerHTML = "";
        query_all("#card_num>button", q=>q.disabled = false);
    });
}

function click_card(evt)
{
    console.log(evt.target.className);
    evt.target.src = `img/jatekok/kep${evt.target.className.replace("done", "").replace(" ", "")}.png`;
    evt.target.classList.add("turned");
    evt.target.onclick = null;
    turned = (turned + 1) % 2;
    if(turned == 0)
    {
        let turned_cards = query_all_raw(".turned");
        if (turned_cards[0].className == turned_cards[1].className)
        {
            console.log("good");
            query_all_raw(".turned").forEach(card => {
            card.classList.remove("turned");
            card.classList.add("done");
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