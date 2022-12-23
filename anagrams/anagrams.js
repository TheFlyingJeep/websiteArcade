
function goHome(){
    window.location.href = "https://flippinnublet.com/arcadelobby/";
}

function master(){
    start(); 
    createLetters(); 
    setup(); 
    document.getElementById('start').style.visibility = 'hidden';
}
console.log("ISDUGNOISUDGJNOSIDJNGD")
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
    document.getElementById("b1").setAttribute( "onClick", "javascript: fill(id);" );
    document.getElementById("b2").innerHTML = letters.substring(2,3); 
    document.getElementById("b2").setAttribute( "onClick", "javascript: fill(id);" );
    document.getElementById("b3").innerHTML = letters.substring(4,5); 
    document.getElementById("b3").setAttribute( "onClick", "javascript: fill(id);" );
    document.getElementById("b4").innerHTML = letters.substring(6,7); 
    document.getElementById("b4").setAttribute( "onClick", "javascript: fill(id);" );
    document.getElementById("b5").innerHTML = letters.substring(8,9); 
    document.getElementById("b5").setAttribute( "onClick", "javascript: fill(id);" );
    document.getElementById("b6").innerHTML = letters.substring(10,11); 
    document.getElementById("b6").setAttribute( "onClick", "javascript: fill(id);" );
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
    document.getElementById(id).setAttribute( "onClick", "javascript: remove(id);" );
}

function remove(id){
    console.log("removed " + id);
    if(id == "b1"){
     document.getElementById("b1").innerHTML = letters.substring(0,1); 
    }
    else if(id == "b2"){
     document.getElementById("b2").innerHTML = letters.substring(2,3); 
    }
    else if(id == "b3"){
     document.getElementById("b3").innerHTML = letters.substring(4,5);
    }
    else if(id == "b4"){
     document.getElementById("b4").innerHTML = letters.substring(6,7); 
    }
    else if(id == "b5"){
     document.getElementById("b5").innerHTML = letters.substring(8,9);
    }
    else if(id =="b6"){
     document.getElementById("b6").innerHTML = letters.substring(10,11); 
    }
    document.getElementById(id).setAttribute( "onClick", "javascript: fill(id);" );
    var index = (document.getElementById("text").value).indexOf(document.getElementById(id).innerHTML);
    var temp = (document.getElementById("text").value).substring(0, index) + (document.getElementById("text").value).substring(index + 1) 
    document.getElementById("text").value = temp; 
}

function guess(){
    //console.log("guess ran");
    var word = String(document.getElementById("text").value);
    word = word.trim(); 
    document.getElementById("text").value = ""; 
    //console.log("Word: " + word + ", in arr: " + arr.includes(word));
    console.log(word);
    console.log(arr.includes(word));
    if(arr.includes(word) && !used.includes(word) && !gameOver &&  word.length > 2){
        used.push(word)
        document.getElementById("guessed").innerHTML += word + "      " + calculate(word) + "pts" + "<br>"
        setup(); 
        return true; 
    }
    else{
       // console.log("false");
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



    




