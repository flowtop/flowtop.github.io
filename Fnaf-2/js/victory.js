let victoryChimes = new Audio("../assets/audio/chimes 2.wav");
victoryChimes.volume = 0.5;

let victoryYay = new Audio("../assets/audio/yay.wav");
victoryYay.volume = 0.5;

let endingAmbient = new Audio("../assets/audio/music box.wav")
endingAmbient.volume = 0.3;

window.onclick = () => {
    setTimeout(() => {
        victoryChimes.play();

        document.querySelector(".victory__popup").classList.remove("_active");
    }, 1000);

    setTimeout(() => {
        victoryYay.play();
    }, 2000);
    setTimeout(() => {
        document.querySelector(".victory__popup").style.display = "none";
    }, 4000);

    setTimeout(() => {
        endingAmbient.play();
    }, 9000);

}
    