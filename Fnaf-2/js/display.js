// Sounds
let openSound = new Audio("../assets/audio/put down.wav");
openSound.volume = 0.2;

// Camera Display
let cameraDisplay = document.querySelector(".display");
document.querySelector(".room__display-btn").onclick = () => {
    if (charge > 0) {
        cameraDisplay.classList.contains("_active") ? closeDisplay() : openDisplay();
    }
};

function openDisplay() {
    cameraDisplay.classList.add("_active");
    lightOn = true;

    BuzzAmbience.play();
}
function closeDisplay() {
    cameraDisplay.classList.remove("_active");
    lightOn = false;

    BuzzAmbience.pause();
}

// Restaurant Map Object
let restaurant = {
    1: {
        name: "left-corner",
        frame: ""
    },
    2: {
        name: "right-corner",
        frame: ""
    },
    3: {
        name: "left-corridor",
        frame: ""
    },
    4: {
        name: "employee-room",
        frame: ""
    },
    5: {
        name: "pirate-cove",
        frame: ""
    },
    6: {
        name: "right-corridor",
        frame: ""
    },
    7: {
        name: "dining-room",
        frame: ""
    },
    8: {
        name: "stage",
        frame: ""
    }
};


let currentCam = 8;

function switchCam(num) {
    if (currentCam != num) {

        currentCam = num;
        let cameraFrameUrl = restaurant[num].name + "/" + (restaurant[num].frame || "empty") + ".png";
        let cameraName = restaurant[num].name.split("-").join(" ");
    
        document.querySelector(".display__obj").style.backgroundImage = `url(../assets/fnaf/glitch.gif)`;
        setTimeout(() => {
            document.querySelector(".display__panel-room").innerHTML = cameraName;
            
            document.querySelector(".display__obj").style.backgroundImage = `url(../assets/fnaf/${cameraFrameUrl})`;
            openSound.play();
            
        }, 200);
    
        document.querySelector(".display__panel-cam._current").classList.remove("_current");
        document.querySelector(".display__panel-cam[data-num='" + num + "']").classList.add("_current");
    }
}