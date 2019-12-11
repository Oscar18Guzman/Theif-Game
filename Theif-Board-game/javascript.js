
const rando = Math.floor(Math.random() * 6) + 3;
const HEIGHT = rando
const WIDTH = rando
var SCORE = 0;
// makes board
var BOARD = [];
for (let i = 0; i < HEIGHT; i++) {
    let row = [];
    for (let j = 0; j < WIDTH; j++) {
        row.push({
            "domi": false,
            "ball": false
        });
    }
    BOARD.push(row.slice());
}

function expertMode() {
    const button2 = document.querySelector(".game1")
    button2.addEventListener("click", () => {
        const piece = document.querySelector(".game-piece")
        if (piece.style.display === "none") {
            piece.style.display = "block";
        } else {
            piece.style.display = "none";
            return piece
        }

    })
}
// function makeAlert() {
//     alert("Popup window!");
// };

// setInterval(makeAlert, 5000)



function drawGameBoard() {
    let html = '';
    for (let i = 0; i < BOARD.length; i++) {
        html += '<div class="row">';
        for (let j = 0; j < BOARD[i].length; j++) {
            let className = 'light';

            if ((i + j) % 2) {
                className = 'dark';
            }
            html += `<div class="square ${className}">`;
            if (BOARD[i][j].domi) {
                html += '<img class="game-piece" src="./assets/domi.jpg">'
                expertMode()
            } else if (BOARD[i][j].ball) {
                html += '<img id="target" class="game-piece" src="./assets/ball.jpeg">'
                expertMode()
            }
            html += '</div>'
        }
        html += '</div>';
    }
    document.getElementById('container').innerHTML = html;
    document.getElementById('score').innerText = SCORE;
}

// when dom is ready it will run this function
document.addEventListener("DOMContentLoaded", function () {
    let randI = Math.floor(Math.random() * BOARD.length);
    let randJ = Math.floor(Math.random() * BOARD[0].length);
    BOARD[randI][randJ].domi = true;
    let ballI = randI;
    let ballJ = randJ;
    while (ballI == randI && ballJ == randJ) {
        ballI = Math.floor(Math.random() * BOARD.length);
        ballJ = Math.floor(Math.random() * BOARD[0].length);
    }
    BOARD[ballI][ballJ].ball = true; // randomly chooses a starting point for the ball
    const button = document.querySelector("#button")
    button.addEventListener("click", () => {
        window.location.replace(window.location.pathname + window.location.search + window.location.hash)
    })

    const button2 = document.querySelector(".game1")
    button2.addEventListener("click", () => {
        const piece = document.querySelector("#target")
        if (piece.style.display === "none") {
            piece.style.display = "none";
        } else {
            piece.style.display = "none";
        }
    }),


        drawGameBoard();
});

function getCurrentPosition(key) {
    for (let i = 0; i < BOARD.length; i++) {
        for (let j = 0; j < BOARD.length; j++) {
            if (BOARD[i][j][key]) {
                return { "i": i, "j": j };
            }
        }
    }
}

function movePlayer(event) {
    let key = event.key;
    let moves = {
        'ArrowUp': { "i": -1, "j": 0 },
        'ArrowDown': { "i": 1, "j": 0 },
        'ArrowRight': { "i": 0, "j": 1 },
        'ArrowLeft': { "i": 0, "j": -1 }
    }
    if (key in moves) {
        let move = moves[key];
        let pos = getCurrentPosition("domi");
        let newI = Math.max(0, Math.min(pos.i + move.i, BOARD.length - 1));
        let newJ = Math.max(0, Math.min(pos.j + move.j, BOARD[newI].length - 1));
        BOARD[pos.i][pos.j].domi = false;
        BOARD[newI][newJ].domi = true;
        console.log(`${key}: (${pos.i}, ${pos.j}) -> (${newI}, ${newJ})`);
        let ballPosition = getCurrentPosition("ball");
        if (ballPosition.i == newI && ballPosition.j == newJ) {
            SCORE++;
            let ballI = newI;
            let ballJ = newJ;
            while (ballI == newI && ballJ == newJ) {
                ballI = Math.floor(Math.random() * BOARD.length);
                ballJ = Math.floor(Math.random() * BOARD[0].length);
            }
            BOARD[ballPosition.i][ballPosition.j].ball = false;
            BOARD[ballI][ballJ].ball = true;
        }
        drawGameBoard();
        expertMode();
    }
}

document.addEventListener('keydown', movePlayer);
