const canvas = document.getElementById('canvas');
const cont = canvas.getContext('2d');

let score = 0;

const brickR = 10;
const brickC = 6;

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 8,
    speed: 4,
    dx: 4,
    dy: -4
}

const pad = {
    x: canvas.width / 2 - 35,
    y: canvas.height -20,
    w: 70,
    h: 10,
    speed : 8,
    dx : 0
}

const brickIfno = {
    w: 60,
    h: 20,
    padding: 10,
    offsetX: 40,
    offsetY: 60,
    visible: true
}

const bricks = [];

for (let i = 0; i < brickR; i++) {
    bricks[i] = [];
    for (let j = 0; j < brickC; j++) {
        const x = i * (brickIfno.w + brickIfno.padding) + brickIfno.offsetX; 
        const y = j * (brickIfno.h + brickIfno.padding) + brickIfno.offsetY;         
        bricks[i][j] = {x, y, ...brickIfno}
    }
    
}

function Bricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            cont.beginPath();
            cont.rect(brick.x, brick.y, brick.w, brick.h);
            cont.fillStyle = brick.visible ? 'rgb(3, 112, 139)' : 'transparent';
            cont.fill();
            cont.closePath();
        });
    });
    
}


function Ball() {
    cont.beginPath();
    cont.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    cont.fillStyle = 'rgb(145, 0, 0)';
    cont.fill();
    cont.closePath();
}

function Pad() {
    cont.beginPath();
    cont.rect(pad.x, pad.y, pad.w, pad.h);
    cont.fillStyle = 'rgb(3, 112, 139)';
    cont.fill();
    cont.closePath();
}


function Score() {
    cont.font = '17px';
    cont.fillText(`Score : ${score}`, canvas.width - 100, 15);
}

function movePad() {
    pad.x += pad.dx;

    if (pad.x + pad.w > canvas.width) {
        pad.x = canvas.width - pad.w;
    }

    if (pad.x < 0) {
        pad.x = 0;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1;
    }

    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1;
    }

    if (ball.x - ball.size > pad.x &&
        ball.x + ball.size < pad.x + pad.w &&
        ball.y + ball.size > pad.y) {
        ball.dy = -ball.speed;
    }


    bricks.forEach(column => {
        column.forEach(brick => {
          if (brick.visible) {
            if (
              ball.x - ball.size > brick.x && 
              ball.x + ball.size < brick.x + brick.w && 
              ball.y + ball.size > brick.y && 
              ball.y - ball.size < brick.y + brick.h
            ) {
              ball.dy *= -1;
              brick.visible = false;
    
              increaseScore();
            }
          }
        });
      });
     
     
      if (ball.y + ball.size > canvas.height) {
        showBricks();
        score = 0;
    }
}


function increaseScore() {
    score++;
    if (score % (brickR * brickC) == 0) {
        showBricks();
    }
}

function showBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            (brick.visible = true)
        })
    })
}


function update() {
    movePad();
    moveBall();

    cont.clearRect(0,0, canvas.width, canvas.height)

    Ball();
    Pad();
    Score();
    Bricks();


    requestAnimationFrame(update);

}

    

update();

function keyDown(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        pad.dx = pad.speed;
    }else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        pad.dx = -pad.speed
    }
}
function keyUp(e) {
    if (e.key == 'Right' || 
    e.key == 'ArrowRight' || 
    e.key == 'Left' || 
    e.key == 'ArrowLeft') {
        pad.dx = 0;
    }
}


document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);




