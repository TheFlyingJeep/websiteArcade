let canvas = document.getElementById("screen");
let ctx = canvas.getContext("2d");
let game = null;
canvasResize();
window.onload = startGame;
const alpha = "abcdefghijklmnopqrstuvwxyz";
var isPlaying = false;

document.getElementById("guessbox").addEventListener("keydown", function(event) {
    if (event.keyCode == 13) {
        getGuess();
    }
}, false);

let filetext = [];
function readTextFile() {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "https://flippinnublet.com/arcadelobby/words_alpha.txt", false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                filetext = rawFile.responseText.split("\n");
            }
        }
    }
    rawFile.send(null);
}
readTextFile();

function generateWord() {
    var text = "";
    while (text.length < 5) {
        text = filetext[Math.floor(Math.random()*filetext.length)];
    }
    return text;
}

function startGame() {
    isPlaying = true;
    var word = generateWord().toLowerCase().trim();
    game = null;
    game = new Hangman(word);
    refreshScreen();
}

class Hangman {
    constructor(word) {
        this.word = word;
        this.wordList = word.split("");
        this.guessedLetters = [];
        this.lives = 6;
        this.emptyList = [];
        for (let i = 0; i < word.length; i++) {
            this.emptyList.push("_ ");
        }
        this.gameWon = false;
        this.gameLost = false;
    }

    checkGuess(guess) {
        this.guessedLetters.push(guess);
        var found = false;
        for (let p = 0; p < this.wordList.length; p++) {
            if (guess == this.wordList[p]) {
                this.emptyList[p] = guess + " ";
                found = true;
            }
        }
        if (!found) {
            this.removeLife();
        }
        var isWord = true;
        for (let m = 0; m < this.wordList.length; m++) {
            if (this.wordList[m] != this.emptyList[m].trim()) {
                isWord = false;
            }
        }
        if (isWord) {
            this.gameWon = true;
            isPlaying = false;
        }
    }

    removeLife() {
        this.lives--;
        if (this.lives <= 0) {
            this.gameLost = true;
            isPlaying = false;
        }
    }

    getLives() {
        return this.lives;
    }

    getListAsString() {
        var str = "";
        for (let l = 0; l < this.emptyList.length; l++) {
            str += this.emptyList[l];
        }
        return str;
    }

    getGuessedLetters() {
        var out = "";
        for (let o = 0; o < this.guessedLetters.length; o++) {
            out += this.guessedLetters[o] + " ";
        }
        return out;
    }

    hasGuessed(guess) {
        for (let i = 0; i < this.guessedLetters.length; i++) {
            if (this.guessedLetters[i] == guess) {
                return true;
            }
        }
        return false;
    }

    hasWon() {
        return this.gameWon;
    }

    hasLost() {
        return this.gameLost;
    }

    getWord() {
        return this.word;
    }

    updateList() {
        for (let i = 0; i < this.wordList.length; i++) {
            this.emptyList[i] = this.wordList[i] + " ";
        }
        this.gameWon = true;
        isPlaying = false;
        refreshScreen();
    }
}

function refreshScreen() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (game != null) {
        ctx.fillStyle = "yellow";
        ctx.font = "60px Arial";
        ctx.fillText(game.getListAsString(), 20, canvas.height/1.5);
        ctx.strokeStyle = "#F3FF00";
        ctx.lineWidth = 2;
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(20, canvas.height/2);
        ctx.lineTo(220, canvas.height/2);
        ctx.stroke();
        ctx.moveTo(120, canvas.height/2);
        ctx.lineTo(120, 20);
        ctx.stroke();
        ctx.lineTo(220, 20);
        ctx.stroke();
        ctx.closePath();
        ctx.font = "30px Arial";
        ctx.fillText("Amount of letters: " + game.getWord().length, 20, (canvas.height/1.5)+60);
        ctx.fillText("Lives: " + game.getLives(), 20, (canvas.height/1.5) + 120);
        ctx.fillText("Guessed letters: " + game.getGuessedLetters(), 20, (canvas.height/1.5) + 180)
        var lives = game.getLives();
        if (lives <= 5) {
            ctx.beginPath();
            ctx.arc(220, 40, 20, 0, Math.PI*2);
            ctx.stroke();
            ctx.closePath();
        } 
        if (lives <= 4) {
            ctx.beginPath();
            ctx.moveTo(220, 60);
            ctx.lineTo(220, 200);
            ctx.stroke();
            ctx.closePath();
        }
        if (lives <= 3) {
            ctx.beginPath();
            ctx.moveTo(220, 100);
            ctx.lineTo(200, 160);
            ctx.stroke();
            ctx.closePath();
        } 
        if (lives <= 2) {
            ctx.beginPath();
            ctx.moveTo(220, 100);
            ctx.lineTo(240, 160);
            ctx.stroke();
            ctx.closePath();
        }
        if (lives <= 1) {
            ctx.beginPath();
            ctx.moveTo(220, 200);
            ctx.lineTo(240, 260);
            ctx.stroke();
            ctx.closePath();
        }
        if (lives <= 0) {
            ctx.beginPath();
            ctx.moveTo(220, 200);
            ctx.lineTo(200, 260);
            ctx.stroke();
            ctx.closePath();
        }
        if (game.hasLost()) {
            ctx.fillText("You lost the game! The word was " + game.getWord(), canvas.width/2, canvas.height/2);
        } else if (game.hasWon()) {
            ctx.fillText("You won the game!", canvas.width/2, canvas.height/2);
        }
    }
}

function getGuess() {
    if (isPlaying) {
        var textbox = document.getElementById("guessbox");
        var text = textbox.value.toLowerCase();
        if (text == null || text == "") {
            alert("Not a proper guess!");
        } else if (text == game.word) {
            game.updateList();
        } else if (alpha.indexOf(text) == -1) {
            alert("You can only guess letters!");
        } else if (text.length > 1 && text != game.word) {
            alert("You can only guess a single letter or the word");
        } else if (game.hasGuessed(text)) {
            alert("You have already guessed this letter!");
        } else {
            game.checkGuess(text);
        }
        textbox.value = "";
        refreshScreen();
    } else {
        alert("This game is over. You must start a new one");
    }
}

window.onresize = canvasResize;
function canvasResize() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    refreshScreen();
}