const canv = document.getElementById("gc");
canv.width=window.innerWidth-5;
canv.height=window.innerHeight-5;
const ctx = canv.getContext("2d");
document.addEventListener("keydown", keyPush);
setInterval(game, 1000 / 15);

var pos_x = 10;
var pos_y = 10;
var gs = 20;
var tc = canv.height / gs;
var tx = canv.width / gs;
ax = Math.floor(Math.random() * tx);
ay = Math.floor(Math.random() * tc);
var vel_x = 0;
var vel_y = 0;
var snake = [];
var tail = 1;
var score = 0;

function reset() {
    tail = 1;
    pos_x = pos_y = 10;
    vel_x = vel_y = 0;
    ax = Math.floor(Math.random() * tx);
    ay = Math.floor(Math.random() * tc);
    score = 0
    document.getElementById("scorbox").innerHTML = score
}

function game() {
    pos_x += vel_x;
    pos_y += vel_y;
    if (pos_x < 0) {
        reset()
    }
    if (pos_x > tx - 1) {
        reset()
    }
    if (pos_y < 0) {
        reset()
    }
    if (pos_y > tc - 1) {
        reset()
    }
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);

    ctx.fillStyle = "white";
    for (var i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * gs, snake[i].y * gs, gs - 2, gs - 2);
        if (snake[i].x == pos_x && snake[i].y == pos_y) {
            reset()
        }
    }
    snake.push({
        x: pos_x,
        y: pos_y
    });
    while (snake.length > tail) {
        snake.shift();
    }

    if (ax == pos_x && ay == pos_y) {
        tail += 10;
        ax = Math.floor(Math.random() * tx);
        ay = Math.floor(Math.random() * tc);
        score++;
        document.getElementById("scorbox").innerHTML = score
    }
    ctx.fillStyle = "red";
    ctx.fillRect(ax * gs, ay * gs, gs - 2, gs - 2);
}

function keyPush(evt) {
    switch (evt.keyCode) {
        case 37:
            if(vel_x != 1){
                vel_x = -1;
                vel_y = 0;
            }
            break;
        case 38:
            if(vel_y != 1){
                vel_x = 0;
                vel_y = -1;
            }
            break;
        case 39:
            if(vel_x != -1){
                vel_x = 1;
                vel_y = 0;
            }
            break;
        case 40:
            if(vel_y != -1){
                vel_x = 0;
                vel_y = 1;
            }
            break;
    }
}
