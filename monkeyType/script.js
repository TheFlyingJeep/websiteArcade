function waitForDelay(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

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

    calculateWPM(){
        /*
        (words typed / total time in seconds) * 60
        words end when " " appears
        */
       this.wpm = (this.totalWordsTyped / this.totalTime) * 60;
       return this.wpm;
    }

    calculateAccuracy(){
        /*
        # words right / total number of words typed
        */
       this.accuracy = this.rightWordsTyped / this.totalWordsTyped;
       return this.accuracy;
    }

    generatePrompt(){
        /*
        go through words_alpha and randomly choose 1000 words
        */

    }

    updateWordCount(){
        /*
        updates total, right, wrong wordsTyped
        */
    }

    compareText(text) {
        var textArr = text.split(" ");
        var promptArr = prompt.split(" ");

        this.totalWordsTyped = textArr.length;

        for(var i = 0; i < textArr.legnth; i++){
            if(textArr[i].toLowerCase() == promptArr[i].toLowerCase()){
                this.rightWordsTyped++;
            } else {
                this.wrongWordsTyped++;
            }
        }
    }
}

async function startGame() {
    var game = new Game();
    game.generatePrompt();
    var time = 0;
    while (time < 30) {
        await waitForDelay(1000);
        time++;
    }
    var text = document.getElementById("textbox");
    game.compareText(text);
}