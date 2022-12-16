
function ultimateRun(){
var alphabet = "aeioumnlshtpdf"; 
var letters = ""; 
const used = [];
let filetext = "";
var seconds = 60;
var gameOver = false; 
var timer;
var highScore = -1; 
var score = 0; 
console.log("updated")
function setup(){
    document.getElementById("b1").innerHTML = letters.substring(0,1); 
    document.getElementById("b2").innerHTML = letters.substring(2,3); 
    document.getElementById("b3").innerHTML = letters.substring(4,5); 
    document.getElementById("b4").innerHTML = letters.substring(6,7); 
    document.getElementById("b5").innerHTML = letters.substring(8,9); 
    document.getElementById("b6").innerHTML = letters.substring(10,11); 
}

function calculate(word){
    var pts = word.length*100; 
    score += pts;
    return pts; 
}

function restart(){
    seconds = 60;
    score = 0; 
    gameOver = false; 
    used.length = 0;  
    document.getElementById("guessed").innerHTML = ""; 
    document.getElementById("text").value = ""; 
    createLetters();
    setup(); 
}

function runTimer() {
  if(seconds < 60) { 
    document.getElementById("timer").innerHTML = seconds;
  }
  if (seconds > 0) { 
     seconds--;
  } else {
     //clearInterval(timer);
     alert("game over! you got " + score + " points with " + used.length + " words")
     if(score > highScore){
        highScore = score; 
        document.getElementById("highScore").innerHTML = "High Score: " + highScore + "pts";
     }
     gameOver = true;  
     restart(); 
  }
}
function start(){
   document.getElementById("timer").innerHTML="1:00"; 
   if(!timer){
    console.log("running");
    timer = window.setInterval(function() { 
        runTimer();
      }, 1000); 
   }
} 



readTextFile(); 
function readTextFile() {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "https://flippinnublet.com/arcadelobby/words_alpha.txt", false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                filetext = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
}

var arr = filetext.split("\n")
arr = arr.map(s => s.trim());
//console.log(arr[90989]);


function fill(id){
    console.log(id);
    document.getElementById("text").value += document.getElementById(id).innerHTML
    document.getElementById(id).innerHTML = ""; 
}

function guess(){
    console.log("guess ran");
    var word = String(document.getElementById("text").innerHTML);
    word = word.trim(); 
    document.getElementById("text").value = ""; 
    //console.log("Word: " + word + ", in arr: " + arr.includes(word));
    if(arr.includes(word) && !used.includes(word) && !gameOver && word.length > 2){
        used.push(word)
        document.getElementById("guessed").innerHTML += word + "      " + calculate(word) + "pts" + "<br>"
        setup(); 
        return true; 
    }
    else{
        console.log("false");
        setup(); 
        return false; 
    }
}

function createLetters(){
    letters = ""; 
    for(var count = 0; count < 6; count++){
        var temp = alphabet.charAt(Math.floor(Math.random() * alphabet.length))
        if(!letters.includes(temp)){
            letters+=temp + " "; 
        }
        else{
          count--; 
        }
    }
    console.log(letters);
}


start(); 
createLetters(); 
setup(); 
}


