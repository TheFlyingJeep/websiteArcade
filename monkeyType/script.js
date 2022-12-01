class game{
    constructor(){
        this.wpm = 0;
        this.accuracy = 0;
        this.totalTime = 0;
        this.totalWordsTyped = 0;
        this.rightWordsTyped = 0;
        this.wrongWordsTyped = 0;
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
        go through words_alpha and randomly choose 50 words
        */
    }

    updateWordCount(){
        /*
        updates total, right, wrong wordsTyped
        */
    }

    isTypedRight(){
        /*
        checks if word is properly typed (case sensitive)
        */
    }
}