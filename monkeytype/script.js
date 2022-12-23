function waitForDelay(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

let filetext = [];
function readTextFile() {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "https://flippinnublet.com/arcadelobby/words_alpha.txt", false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                filetext = rawFile.responseText.split("\n");
                //console.log(rawFile.responseText);
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
       this.wpm = (this.totalWordsTyped / 30) * 60;
       document.getElementById("wpmDisplay").innerHTML = this.wpm + " wpm";
    }

    calculateAccuracy(){
        /*
        # words right / total number of words typed
        */
        if(this.totalWordsTyped != 0){
            this.accuracy = Math.round((this.rightWordsTyped / this.totalWordsTyped) * 100);
        }
        document.getElementById("accuracyDisplay").innerHTML = this.accuracy + "% accuracy";
    }

    generatePrompt(){
        /*
        go through words_alpha and randomly choose 1000 words
        */
       this.prompt = "";
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
        var promptArr = this.prompt.toString().split(" ");

        console.log(textArr);

        this.totalWordsTyped = textArr.length;

        for(var j = 0; j < promptArr.length; j++){
            if(promptArr[j].includes("\r") && promptArr[j].includes("\n")){
                promptArr[j] = promptArr[j].substring(1, promptArr[j].length-1);
            } else {
                promptArr[j] = promptArr[j].substring(0, promptArr[j].length-1);
            }
        }

        for(var i = 0; i < textArr.length; i++){           
            if(promptArr.includes(textArr[i].toString().toLowerCase().trim())) {
                this.rightWordsTyped++;
            } else {
                this.wrongWordsTyped++;
            }
        }

        console.log("total words: " + this.totalWordsTyped);
        console.log("# right words: " + this.rightWordsTyped);
        console.log("# wrong words: " + this.wrongWordsTyped);
    }   
}

var g = new Game();
var time = 0;

function reset(){
    document.getElementById("wpmDisplay").innerHTML = "";
    document.getElementById("accuracyDisplay").innerHTML = "";
    startGame();
    //document.getElementById("startRestartBut").setAttribute( "onClick", "javascript: startGame();" );
}

function restartMidGame(){
    document.getElementById("timeDisplay").innerHTML = 30;
    time = 0; 
    document.getElementById("textbox").value = "";
    g.generatePrompt();
}

function goHome(){
    window.location.href = "https://flippinnublet.com/arcadelobby/";
}

async function startGame() {

    document.getElementById("textbox").value = "";
    document.getElementById("startRestartBut").innerHTML = "restart";

    g.generatePrompt();
    document.getElementById("timeDisplay").innerHTML = 30;

    document.getElementById("startRestartBut").setAttribute( "onClick", "javascript: restartMidGame();" );
    time = 0;
    while (time < 30) {
        await waitForDelay(1000);
        time++;
        console.log(time);
        document.getElementById("timeDisplay").innerHTML = 30-time;
    }

    document.getElementById("startRestartBut").setAttribute( "onClick", "javascript: reset();" );
    var text = document.getElementById("textbox").value;
    if(text != ""){
        g.compareText(text);
    }
    g.calculateWPM();
    g.calculateAccuracy();
}
