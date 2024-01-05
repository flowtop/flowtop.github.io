// Sounds
let Ambience = new Audio("../assets/audio/Ambience.wav");
Ambience.volume = 0.4;
Ambience.loop = true;

let BuzzAmbience = new Audio("../assets/audio/tape.wav");
BuzzAmbience.volume = 0.1;
BuzzAmbience.loop = true;

let cameraBuzz = new Audio("../assets/audio/Buzz2.wav");
cameraBuzz.volume = 0.4;
cameraBuzz.loop = true;

let phoneGuy = new Audio("../assets/audio/PhoneGuy1.wav");
phoneGuy.volume = 0.3;

let cakeBoop = new Audio("../assets/audio/CakeBoop.wav");
cakeBoop.volume = 0.3;

let energyDownAmbient = new Audio("../assets/audio/powerdown.wav");
energyDownAmbient.volume = 0.4;

let musicbox = new Audio("../assets/audio/music box.wav");
musicbox.volume = 0.5;

let windowScare = new Audio("../assets/audio/windowscare.wav");
windowScare.volume = 0.7;

let jumpScare = new Audio("../assets/audio/XSCREAM.wav");
jumpScare.volume = 0.7;

let pirateSong = new Audio("../assets/audio/pirate song2.wav");
pirateSong.volume = 0.2;

let lightOn = false;
let fps = 10;

let lives = 10;

function randomInt(end) {
    return Math.floor(Math.random() * end);
}

let yPos = 0;
let scrolledPercent = 0;
window.addEventListener("mousemove", e => {
    scrolledPercent = (e.screenX / (window.innerWidth / 100)).toFixed(0);
    yPos = e.screenY;

    if (scrolledPercent < 30) {
        scrolledPercent = 30;
    }
    if (scrolledPercent > 90) {
        scrolledPercent = 90;
    }
    document.querySelector(".room__room-image").style.marginLeft = window.innerWidth / 10 + -(750 * (scrolledPercent / 100)) + "px";
});

window.addEventListener("click", () => {
    if (scrolledPercent <= 65 && scrolledPercent >= 64 && yPos <= 550 && yPos >= 470 && !lightOn) {
        cakeBoop.play();
    }
});

let startPopup = document.querySelector(".start-popup")
startPopup.onclick = startGame;

let muteCall = document.querySelector(".room__mute-btn");

muteCall.onclick = () => {
    muteCall.style.display = "none";
    phoneGuy.pause();
}

function startGame() {
    startPopup.classList.remove("_active");

    setTimeout(() => {
        Ambience.play();
        startPopup.style.display = "none";
    }, 500);

    setTimeout(() => {
        phoneGuy.play();
        muteCall.style.display = "flex";
    }, 5000);
}


// Counting charge
let charge = 5000;
let chargePercent = charge / 100;
let chargeCounter = setInterval(() => {
    if (charge <= 0) {
        charge = 0;
        energyDown();
    }
    else {
        if (lightOn) {
            charge -= 40;
        }
        document.querySelector(".room__charge span").innerHTML = ((charge / chargePercent).toFixed());
    }

}, 200);

// Counting time
let seconds = 0;
let hours = 0;

setInterval(() => {
    seconds += 6;
    hours = Math.floor(seconds / 3600);

    document.querySelector(".room__time span").innerHTML = hours;

    if (hours == 6) {
        victory();
    }

    if (randomInt(1000) == 1) {
        pirateSong.play()
    }
}, 1000 / fps);

function victory() {
    window.location.href = "../victory.html";
}

function energyDown() {
    document.querySelector(".room__mute-btn").click();
    clearInterval(chargeCounter);
    closeDisplay();

    document.querySelector(".room__room-image").setAttribute("src", "../assets/fnaf/powerdown.png");
    energyDownAmbient.play();

    let freddyInterval = setInterval(() => {

        if (randomInt(100) == 66) {
            freddyAppears()
            clearInterval(freddyInterval);
        }
    }, 1000 / fps)
}

function freddyAppears() {
    document.querySelector(".room__room-image").setAttribute("src", "assets/fnaf/room-freddy.png");
    musicbox.play();
    setTimeout(() => {
        musicbox.pause();
        document.querySelector(".room__room-image").setAttribute("src", "assets/fnaf/544.png");
    }, 26000);
}

// LEFT LIGHT
document.querySelector(".room__left-light").addEventListener("mousedown", () => {
    
    if (charge > 0) {
        lightOn = true;
        document.querySelector(".room__room-image").setAttribute("src", "assets/fnaf/room-left.png");
    }
});
document.querySelector(".room__left-light").addEventListener("mouseup", () => {
    if (charge > 0) {
        setTimeout(() => {
            lightOn = false;
            document.querySelector(".room__room-image").setAttribute("src", "assets/fnaf/room.png");
        }, 200);
    }
});

function jumpScaring(char) {
    if (char == "bonnie") {
        document.querySelector(".room__room-image").setAttribute("src", "assets/fnaf/jumpscares/bonnie/bonnie.gif")
    }
    jumpScare.play();
    gameover();
}

// RIGHT LIGHT
document.querySelector(".room__right-light").addEventListener("mousedown", () => {
    if (charge > 0) {
        lightOn = true;
        document.querySelector(".room__room-image").setAttribute("src", "assets/fnaf/room-right.png");
    }
});
document.querySelector(".room__right-light").addEventListener("mouseup", () => {
    if (charge > 0) {    
        setTimeout(() => {
            lightOn = false;
            document.querySelector(".room__room-image").setAttribute("src", "assets/fnaf/room.png");
        }, 200);
    }
});