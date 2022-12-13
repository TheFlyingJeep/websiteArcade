function waitForDelay(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

function generatePrompt(){
    var game = new Game();
    game.generatePrompt();
}

let filetext = [];
function readTextFile() {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "https://flippinnublet.com/arcadelobby/words_alpha.txt", false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                filetext = rawFile.responseText.split("\n");
                console.log(rawFile.responseText);
            }
        }
    }
    rawFile.send(null);
}
readTextFile();

class Game{
    constructor(){
        this.wpm = 0;
        this.accuracy = 0;
        this.totalTime = 0;
        this.totalWordsTyped = 0;
        this.rightWordsTyped = 0;
        this.wrongWordsTyped = 0;
        this.prompt = "";
    }

    resetGame(){
        this.wpm = 0;
        this.accuracy = 0;
        this.totalTime = 0;
        this.totalWordsTyped = 0;
        this.rightWordsTyped = 0;
        this.wrongWordsTyped = 0;
        this.prompt = "";
    }

    calculateWPM(){
        /*
        (words typed / total time in seconds) * 60
        words end when " " appears
        */
       this.wpm = this.totalWordsTyped / this.totalTime;
       document.getElementById("wpmDisplay").innerHTML = this.wpm + " wpm";
    }

    calculateAccuracy(){
        /*
        # words right / total number of words typed
        */
       this.accuracy = this.rightWordsTyped / this.totalWordsTyped;
       document.getElementById("accuracyDisplay").innerHTML = this.accuracy + "% accuracy";
    }

    generatePrompt(){
        /*
        go through words_alpha and randomly choose 1000 words
        */
        for(var i = 0; i < 100; i++){
            this.prompt += filetext[Math.floor(Math.random()*filetext.length)] + " ";
            if(i % 10 == 0){
                this.prompt += "\n";
            }
        }
        document.getElementById("promptArea").innerHTML = this.prompt;
    }

    compareText(text) {
        var textArr = text.toString().split(" ");
        var promptArr = prompt.toString().split(" ");

        this.totalWordsTyped = textArr.length;

        for(var i = 0; i < textArr.legnth; i++){
            console.log(textArr[i]);
            if(textArr[i].toString().toLowerCase() == promptArr[i].toString().toLowerCase()){
                this.rightWordsTyped++;
            } else {
                this.wrongWordsTyped++;
            }
        }
        console.log("total words: " + this.totalWordsTyped);
        console.log("# right words: " + this.rightWordsTyped);
        console.log("# wrong words: " + this.wrongWordsTyped);

        textArr = [];
        promptArr = [];
    }
}

async function startGame() {
    var game = new Game();
    game.generatePrompt();
    var time = 0;
    document.getElementById("timeDisplay").innerHTML = 10-time;
    while (time < 10) {
        await waitForDelay(1000);
        time++;
        document.getElementById("timeDisplay").innerHTML = 10-time;
    }
    var text = document.getElementById("textbox").value;
    game.compareText(text);
    game.calculateWPM();
    game.calculateAccuracy();
}
