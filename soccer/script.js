var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");
let ground = 0;
const gravity = -0.1;
var play1 = null;
var play2 = null;
canvasResize();

window.addEventListener("keydown", function(event) {
    if (event.key == "space") {

    } else if (event.key == "")
})

function displayCanvas() {
    ctx.fillStyle = "#31ABDC";
    ctx.fillRect(0, 0, canvas.width, ground);
    ctx.fillStyle = "#3EDC31";
    ctx.fillRect(0, ground, canvas.width, canvas.height);
    if (play1 != null && play2 != null) {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 100;
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(play1.x, play1.y);
        ctx.lineTo(100+(200*Math.cos((play1.angle*(Math.PI/180)))), ground-(200*Math.sin((play1.angle*(Math.PI/180)))));
        ctx.stroke();
        ctx.moveTo(play2.x, play2.y);
        ctx.lineTo(canvas.width-100+(200*Math.cos((play2.angle*(Math.PI/180)))), ground-(200*Math.sin((play2.angle*(Math.PI/180)))));
        ctx.stroke();
        ctx.closePath();
    }
}

class Game {
    constructor(p1, p2, ball) {
        this.player1 = p1;
        this.player2 = p2;
        this.ball = ball;
    }
}

class Player {
    constructor(x,y) {
        this.goals = 0;
        this.x = x;
        this.y = y;
        this.angle = 90;
        this.forward = true;
        this.vx = 0;
        this.vy = 0;
    }
}

class Ball {
    constructor() {
        
    }
}

function startGame() {
    play1 = new Player(100, ground);
    play2 = new Player(canvas.width-100, ground);
}

function updatePlayerOneAngle() {
    if (play1.forward) {
        play1.angle++;
    } else {
        play1.angle--;
    }
    if (play1.angle <= 45) {
        play1.forward = true;
    }
    if (play1.angle >= 135) {
        play1.forward = false;
    }
}

function updatePlayerTwoAngle() {
    if (play2.forward) {
        play2.angle++;
    } else {
        play2.angle--;
    }
    if (play2.angle <= 45) {
        play2.forward = true;
    }
    if (play2.angle >= 135) {
        play2.forward = false;
    }
}

function animationLoop() {
    displayCanvas();
    requestAnimationFrame(animationLoop);
    updatePlayerOneAngle();
    updatePlayerTwoAngle();
}
requestAnimationFrame(animationLoop);

window.onresize = canvasResize;
function canvasResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ground = canvas.height-200;
}