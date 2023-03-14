let stash = ['q', 'q', 'q'];

// SOUNDS
let failure = new Audio("./mp3/failure.mp3");
failure.volume = 0.2;

let invoke = new Audio("./mp3/invoke.mp3");
invoke.volume = 0.2;
// SOUNDS

let currentSkill = "qqq";

let in_use = ["alacrity", "cold-snap"];

let skills = {
    sun_strike: ["eee"],
    emp: ["www"],
    cold_snap: ["qqq"],
    tornado: ["wwq", "wqw", "qww"],
    alacrity: ["wwe", "wew", "eww"],
    chaos_meteor: ["eew", "ewe", "wee"],
    deafening_blast: ["qwe", "qew", "eqw", "ewq", "wqe", "weq"],
    forge_spirit: ["eeq", "eqe", "qee"],
    ghost_walk: ["qqw", "qwq", "wqq"],
    ice_wall: ["qqe", "qeq", "eqq"]
}

let casted = "";


function drawCurOrbs() {
    for (i in stash) {
        if (stash[i] == "q") {
            document.querySelector(`.cur-orb-${+i + 1}`).setAttribute("src", "img/orb-quas.png");
        }
        if (stash[i] == "w") {
            document.querySelector(`.cur-orb-${+i + 1}`).setAttribute("src", "img/orb-wex.png");
        }
        if (stash[i] == "e") {
            document.querySelector(`.cur-orb-${+i + 1}`).setAttribute("src", "img/orb-exort.png");
        }
    }
    
}

function pressQ () {
    stash.push("q");

    if (stash.length > 3) {
        stash.shift();
    }
    
    drawCurOrbs();
}

function pressW () {
    stash.push("w");

    if (stash.length > 3) {
        stash.shift();
    }
    
    drawCurOrbs();
}

function pressE () {
    stash.push("e");

    if (stash.length > 3) {
        stash.shift();
    }

    drawCurOrbs();
}

function pressR () {
    casted = "";

    stash.forEach(i => {
        casted += i;
    });

    if (casted.length == 3) {
        cast(casted);
        if (currentSkill == casted) {
            failure.play();
        }
        currentSkill = casted;
    }
    else {
        failure.play()
    }
}

// MOUSE
document.querySelector(".orb[src='img/orb-quas.png']").onclick = () => {
    pressQ();
}

document.querySelector(".orb[src='img/orb-wex.png']").onclick = () => {
    pressW();
}

document.querySelector(".orb[src='img/orb-exort.png']").onclick = () => {
    pressE();
}

document.querySelector(".orb[src='img/skill-invoke.png']").onclick = () => {
    pressR();
}


// KEYBOARD
window.addEventListener("keydown", e => {

    if (e.code == "KeyQ") {
        pressQ();

    }
    if (e.code == "KeyW") {
        pressW();
    }
    if (e.code == "KeyE") {
        pressE();
    }

    if (e.code == "KeyR") {
        pressR();
    }
});

function cast(comb) {

    invoke.play();

    let currentSpell = "";

    if (in_use.length >= 2) {
        in_use.shift();
    }

    for (let i of Object.keys(skills)) {
        if (skills[i].indexOf(comb) >= 0) {
            currentSpell = i.replace("_", "-");
        }
    }

    if (in_use.indexOf(currentSpell) == -1) {
        in_use.push(currentSpell);
        draw_current_spells(in_use);
    }
}

function draw_current_spells(in_use) {
    let randNum = Math.floor(Math.random() * 4) + 1;
    let randomInvoke = new Audio("./mp3/cast" + randNum + ".mp3");
    randomInvoke.volume = 0.2;

    if (Math.floor(Math.random() * 8) + 1 == 2) {
        randomInvoke.play();
    }

    let spell_to_delete = document.querySelector(".task").childNodes[1];
    let skillPanel = document.querySelector(".task");
    skillPanel.removeChild(spell_to_delete);

    skillPanel.innerHTML = `<img src="img/skill-${in_use[1]}.png" class="spell active" id="${in_use[1]}">` + skillPanel.innerHTML;
}