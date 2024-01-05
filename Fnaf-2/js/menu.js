// Sounds
let ambienceSound = new Audio("../assets/audio/Ambience.wav");
ambienceSound.volume = 0.4;
ambienceSound.loop = true;

let buzz = new Audio("./assets/audio/Switch.wav");
buzz.volume = 0.1;


window.addEventListener("click", () => {
    ambienceSound.play();
})

// Animation
let mainMenu = document.querySelector(".main-menu");
let glitchFx = document.querySelector(".main-menu__glitch");

let fps = 10;

function randomInt(end) {
    return Math.floor(Math.random() * end);
}

setInterval(() => {

    let rnd = randomInt(100);

    if (rnd == 80) {
        mainMenu.style.backgroundImage = "url(../assets/fnaf/menu-frame-1.png)";

        // Animating Freddy
        setTimeout(() => {
            mainMenu.style.backgroundImage = "url(../assets/fnaf/menu-frame-2.png)";
        }, 1000 / fps);
    }
    else {        
        mainMenu.style.backgroundImage = "url(../assets/fnaf/menu.png)";
    }

    if (rnd == 40 || rnd == 41) {
        // Animating GlitchFx
        glitchFx.classList.add("_active");

        setTimeout(() => {    
            glitchFx.classList.remove("_active");
        }, 1000 / fps * randomInt(15));

        buzz.play();
    }

}, 1000 / fps);

// Popup
let menuPopup = document.querySelector(".main-menu__popup");

menuPopup.onclick = () => {
    menuPopup.classList.remove("_active");

    setTimeout(() => {
        menuPopup.style.display = "none";
        menuPopup.style.zIndex = "-10";
    }, 500);
}

function startGame() {
    setTimeout(() => {
        window.location.href = "../game.html";
    }, 8000);

    document.querySelector(".main-menu").style.opacity = "0";
    setTimeout(() => {
        document.querySelector(".main-menu").style.display = "none";
        document.querySelector(".main-menu__newspaper").classList.add("_active");
    }, 500);
}