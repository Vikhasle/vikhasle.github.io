var can = document.getElementById("can");
var ctx = can.getContext("2d");
//TODO: scaling the canvas to window
//TODO: implement a start and pause screen
//TODO: implement sprites and improved graphics
//TODO: Also audio 
can.width = window.innerWidth - 400;
can.height = window.innerHeight - 200;

addEventListener("keydown", keyboard);


class block {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = color;
    }
    hit() {
        ctx.clearRect(this.x, this.y, this.w, this.h);
    }
    draw() {
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    is_in(obj_x, obj_y, obj_vel, rad) {
        if (obj_y + rad >= this.y && obj_y - rad <= this.y + this.h)
            if (obj_x + rad >= this.x && obj_x - rad <= this.x + this.w) {
                obj_vel[1] *= -1;
                return true;
            }
        if (obj_y - rad >= this.y && obj_y + rad <= this.y + this.h)
            if (obj_x + rad >= this.x && obj_x - rad <= this.x + this.w) {
                obj_vel[1] *= -1;
                return true;
            }
        if (obj_x + rad == this.x)
            if (obj_y + rad >= this.y && obj_y - rad <= this.y + this.h) {
                obj_vel[1] *= -1;
                return true;
            }
        if (obj_x - rad == this.x + this.w)
            if (obj_y + rad >= this.y && obj_y - rad <= this.y + this.h) {
                obj_vel[1] *= -1;
                return true;
            }
    }
}


//Player
var vel = 0;
var player = new block(can.width / 2, can.height / 1.2, 100, 27, "black");
//Ball
var ball_x = player.x + player.w / 2; // hvor ballen starter
var ball_y = player.y - 12;
var ball_rad = 12;
var ball_vel = [1, -1];
//Blocks
var blocks = [];
//score
var score = 0;
var lvl = 1;
//colors
var c_palett = [
    "darkred",
    "darkblue",
    "yellow",
    "darkbrown",
    "darkorange"
];

var bMusic = new Audio("cmusic.opus");
var soundEffects = [];
soundEffects[0] = new Audio("effect.mp3");
soundEffects[1] = new Audio("bb.mp3");
var score = 0;





function main() {
    ctx.clearRect(player.x - 1, player.y - 1, player.w + 2, player.h + 1);
    ctx.clearRect(ball_x - 20, ball_y - 20, ball_rad * 3, ball_rad * 3);
    player.x += vel;
    ball_x += ball_vel[0];
    ball_y += ball_vel[1];
    if (player.x < 0)
        player.x = 0;
    if (player.x > can.width - player.w)
        player.x = can.width - player.w;
    if (ball_x < ball_rad) {
        ball_x = ball_rad;
        ball_vel[0] *= -1;
    }
    if (ball_x > can.width - ball_rad) {
        ball_x = can.width - ball_rad;
        ball_vel[0] *= -1;
    }
    if (ball_y < ball_rad) {
        ball_y = ball_rad;
        ball_vel[1] *= -1;
    }
    if (ball_y > can.height - ball_rad)
        Gameover();

    player.is_in(ball_x, ball_y, ball_vel, ball_rad);

    for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].is_in(ball_x, ball_y, ball_vel, ball_rad)) {
            blocks[i].hit();
            blocks.splice(i, 1);
            incScore();
            soundEffects[lvl - 1].play();
        }
    }
    ctx.beginPath();
    ctx.arc(ball_x, ball_y, ball_rad, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillRect(player.x, player.y, player.w, player.h);

    if (blocks.length == 0) {
        populate();
        ball_vel[0] *= 1.2;
        ball_vel[1] *= 1.2;
        vel *= 2;
        lvl++;
        document.getElementById("lvl").innerHTML = "LVL: " + lvl;
        console.log("win");
    }
}

function backGround() {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, can.height);
    ctx.lineTo(can.width, can.height);
    ctx.lineTo(can.width, 0);
    ctx.lineTo(0, 0);
    ctx.stroke();
}

function populate() {
    var amount = Math.floor(Math.random() * 10) + 12;
    var x = 0;
    var y = 0;
    for (var i = 0; i < amount; i++) {
        if (Math.round(Math.random())) {
            blocks[i] = new block(x, y, player.w, player.h, c_palett[Math.floor(Math.random() * c_palett.length)]);
            blocks[i].draw();
        } else {
            i--;
        }
        x += player.w;
        if (x + player.w > can.width) {
            x = 0;
            y += player.h;
        }

    }
}

function Gameover() {
    clearInterval(main);
    ctx.clearRect(0, 0, can.width, can.height);
}

function incScore() {
    score += 10;
    document.getElementById("score").innerHTML = "Score: " + score;
}

function keyboard(evt) {
    switch (evt.keyCode) {
        case 37:
            vel = -2;
            break;
        case 39:
            vel = 2;
            break;
        case 65:
            vel = -2;
            break;
        case 68:
            vel = 2;
            break;
    }
}

function start() {
    backGround();
    populate();
    setInterval(main, 1000 / 200);
    //bMusic.play();
}