let canvas = document.querySelector("#game");
let ctx;

let go = false; // (game over)

let bg = new Audio("sound/bg.mp3");
bg.volume = 0.1;

let sfx = new Audio("sound/pick.wav");
sfx.volume = 0.1;

let goSfx = new Audio("sound/gameover.wav");
goSfx.volume = 0.1;

if (canvas.getContext){
    ctx = canvas.getContext('2d');
}
else {
    alert("Ваш браузер не поддерживает canvas. Это что вообще за браузер?..");
    window.close();
}

canvas.fillStyle = "#000";

canvas.width = 500;
canvas.height = 500;

let cellSize = canvas.width / 16;
let movingX = false;

let score = 0;

let snake = [
    {
        x: 5 * cellSize,
        y: 8 * cellSize
    },
    {
        x: 6 * cellSize,
        y: 8 * cellSize
    }
];

let food = {
    x: Math.floor(Math.random() * 16) * cellSize,
    y: Math.floor(Math.random() * 16) * cellSize
}

let direction = "right";





function frameLoop() {
    drawSnake();
    drawFood();
}

let gameOn = setInterval(frameLoop, 1000/8);
clearInterval(gameOn);

document.addEventListener("keydown", rotate);


document.querySelector(".start-btn").onclick = start;

function start () {
    gameOn = setInterval(frameLoop, 1000/8);

   let startWindow = document.querySelector(".start");

   startWindow.classList.add("hidden");
   bg.play()
}

function rotate(event) {
    if (event.code == "KeyW" && direction !== "down") {
        setTimeout(() => {
            direction = "up";
        }, 40);
    }
    
    if (event.code == "KeyS" && direction !== "up") {
        setTimeout(() => {
            direction = "down";
        }, 40);
    }
        
    if (event.code == "KeyA" && direction !== "right") {
        setTimeout(() => {
            direction = "left";
        }, 40);
    }
    
    if (event.code == "KeyD" && direction !== "left") {
        setTimeout(() => {
            direction = "right";
        }, 40);
    }

    if (event.code == "KeyP") pause();
}

function drawSnake() {
    if (score >= 16 * 16 - 1) {
        alert("ЛУЧШИЙ БРАТ")
    }

    snake.forEach((i, i_index) => {
        snake.forEach((k, k_index) => {
            if (k.x == i.x && k.y == i.y && i_index !== k_index) {
                gameOver();
            }
        });

        if ((i.y > 16 * cellSize || i.y < 0)
            || (i.x > 16 * cellSize || i.x < 0)) {
            gameOver();
        }
    });



    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#d33333";

    snake.forEach(i => {
        ctx.fillRect(i.x, i.y, cellSize, cellSize);
    });

    let snakeX = snake[0].x,
        snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y) {
        score++;
        refreshScore();

        sfx.play();
        food = {
            x: Math.floor((Math.random() * 16)) * cellSize,
            y: Math.floor((Math.random() * 16)) * cellSize,
        };
    } else
        snake.pop();


    if (direction == "right") snakeX += cellSize;
    if (direction == "left") snakeX -= cellSize;
    if (direction == "up") snakeY -= cellSize;
    if (direction == "down") snakeY += cellSize;

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    
    snake.unshift(newHead);

}

function drawFood() {
    ctx.fillStyle = "goldenrod";
    ctx.fillRect(food.x, food.y, cellSize, cellSize);
}

let counter = document.getElementById("number");

function refreshScore() {
    counter.innerText = score;
}

function gameOver() {
    go = true;
    goSfx.play();

    clearInterval(gameOn);

    document.querySelector(".results #endNumber").innerHTML = score;
    document.querySelector(".gameOver").classList.remove("hidden");
    
    document.querySelector(".restart-btn").onclick = () => {
        location.reload();
    }
}

function pause() {

    if (!go) {
        let pauseBlock = document.querySelector(".pause");
        pauseBlock.classList.remove("hidden");

        bg.volume = 0.04;

        clearInterval(gameOn);

        document.querySelector(".pause-btn").onclick = () => {
            pauseBlock.classList.add("hidden");
            gameOn = setInterval(frameLoop, 1000/8);
        }
    }
}