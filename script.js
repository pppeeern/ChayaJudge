let score = 0, prev = 0;

function update(){
    document.getElementById("score").innerHTML = score;
}

function calculateScore() {
    score = 0;

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
    let name = input.closest('.sheet-content-lists')?.querySelector('.sheet-content-lists-title').innerHTML;
    if(name) input.setAttribute("name", name);
    
    let value = parseInt(input.getAttribute("scoredata")) || 0;
    if(input.value > value) input.value = value;
    input.addEventListener("input", calculateScore);
});

function wipe(){
    score = 0; prevscore = 0;
    update();
    document.querySelectorAll(".sheet-input").forEach(input => {
        if(input.value || input.checked){
            input.value = null;
            input.checked = false;
        }
        if(input.getAttribute("checked")) input.checked = true;
    });
}

function clean(){
    wipe();
    document.querySelectorAll("input").forEach(input => {
        input.value = null;
    });
}

/*stopwatch*/
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