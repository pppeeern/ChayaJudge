document.title = document.getElementById("comp-title").innerHTML + " | Score Sheet - ChayaJudge";

const disqBtn = document.getElementById("disq");

let score = 0, prev = 0;
let isDis = false;

function update(){
    if(!isDis) document.getElementById("score").innerHTML = score;
}

function calculateScore() {
    score = 0; //reset score everytime before calculate

    document.querySelectorAll(".sheet-input").forEach(input => {
        let value = parseInt(input.getAttribute("scoredata")) || 0;

        if (input.type === "checkbox") {
            if (input.checked) {
                score += value;
            }
        } 
        else if (input.type === "radio") {
            if (input.checked) {
                score += value;
            }
        } 
        else if (input.type === "number") {
            let currentValue = parseInt(input.value) || 0;
            if(!currentValue) input.value = null;
            score += currentValue * value;
        }
    });

    update();
}

document.querySelectorAll(".sheet-input").forEach(input => {
    //identify input
    let name = input.closest('.sheet-content-lists')?.querySelector('.sheet-content-lists-title').innerHTML;
    if(name) input.setAttribute("name", name);
    
    let value = parseInt(input.getAttribute("scoredata")) || 0;
    if(input.value > value) input.value = value;
    input.addEventListener("input", calculateScore);
});

function wipe(){
    score = 0; prevscore = 0;
    if(isDis) disq();
    update();
    document.querySelectorAll(".sheet-input").forEach(input => {
        if(input.value || input.checked){
            input.value = null;
            input.checked = false;
        }
        if(input.getAttribute("checked")) input.checked = true;
    });
}

//stopwatch

let sec = 0, tens = 0, Interval;
let tensLabel = document.getElementById("tenLabel");
let secLabel = document.getElementById("secLabel");


function startInter(){
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
}

function stopInter(){
    clearInterval(Interval);
}

function startTimer(){
    tens++;
    if(tens <= 9) tensLabel.value = "0" + tens;
    if(tens > 9) tensLabel.value = tens;
    if(tens > 99){
        sec++;
        secLabel.value = "0" + sec;
        tens = 0;
        tensLabel.value = "00";
    }
    if(sec > 9){
        secLabel.value = sec;
    }
    //console.log(secLabel + " : " + tensLabel);
}

function clearTimer(){
    clearInterval(Interval);
    tens = 0, sec = 0;
    tensLabel.value = "00";
    secLabel.value = "00";
}

// 

function clean(){
    wipe();
    document.querySelectorAll("input").forEach(input => {
        input.value = null;
    });
    clearTimer();
}

function disq(){
    if(!isDis){
        isDis = true;

        disqBtn.style.backgroundColor = "#E44B37";
        disqBtn.style.color = "white";

        document.getElementById("score").innerHTML = "DIS";
        document.getElementById("secLabel").value = "120";
        document.getElementById("tenLabel").value = "00";
    } else{
        isDis = false;

        disqBtn.style.backgroundColor = "#eff1fa";
        disqBtn.style.color = "#999999";

        update();
        // clearTimer();
        tensLabel.value = tens;
        if(sec < 9) secLabel.value = "0" + sec;
    }
}

function exp(){
    event.stopPropagation();
    const menu = document.querySelector(".export-menu");
    menu.style.display = (menu.style.display === "block") ? "" : "block";
}

window.onclick = event => {
    const menu = document.querySelector(".export-menu");
    menu.style.display = "";
};