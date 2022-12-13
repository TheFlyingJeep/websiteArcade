document.getElementById("button").addEventListener("click", wordleRun);
document.getElementById("textInput").addEventListener("keydown", function(event) {
    if (event.keyCode == 13) {
        wordleRun();
        document.getElementById("textInput").value='';
    }
}, false);


var userInput;
var guessCount = 1; 
var guessed = new Array();
function wordleRun(){
    userInput = document.getElementById("textInput").value;
    guessed.push(userInput);
    console.log(guessed);
    inputWord();


    // document.getElementById("w1l1").innerHTML = wordSplit[0];
    // document.getElementById("w1l2").innerHTML = wordSplit[1];
    // document.getElementById("w1l3").innerHTML = wordSplit[2];
    // document.getElementById("w1l4").innerHTML = wordSplit[3];
    // document.getElementById("w1l5").innerHTML = wordSplit[4];

    // ocument.getElementById("value").innerHTML = userInput;
}

function inputWord() {
    var wordSplit = userInput.split("");
    
    if (guessCount == 1) {
        for (i = 0; i < 5; i++) {
            document.getElementById(i).innerHTML = wordSplit[i];
        }
        guessCount = guessCount + 1; 
    } else if (guessCount == 2) {
        for (i = 5; i < 10; i++) {
            document.getElementById(i).innerHTML = wordSplit[i-5];
        }
        guessCount++;
    } else if (guessCount == 3) {
        for (i = 10; i < 15; i++) {
            document.getElementById(i).innerHTML = wordSplit[i-10];
        }
        guessCount++;
    } else if (guessCount == 4) {
        for (i = 15; i < 20; i++) {
            document.getElementById(i).innerHTML = wordSplit[i-15];
        }
        guessCount++;
    } else if (guessCount == 5) {
        for (i = 20; i < 25; i++) {
            document.getElementById(i).innerHTML = wordSplit[i-20];
        }
        guessCount++;
    }  else if (guessCount == 6) {
        for (i = 25; i < 30; i++) {
            document.getElementById(i).innerHTML = wordSplit[i-25];
        }
        guessCount++;
    }



}




