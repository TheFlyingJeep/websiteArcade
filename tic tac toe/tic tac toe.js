start();
function goHome(){
    window.location.href = "https://flippinnublet.com/arcadelobby/";
}

function start(){
    for(var i = 1; i < 10; i++){
        document.getElementById("b" + i + "").innerHTML = "";
    }
}

var turn = 0; 
function fill(id){
    console.log(id)
    if(turn % 2 == 0){
      document.getElementById(id).innerHTML = "&nbsp&nbsp&nbsp" + "X";
    }
    else{
      document.getElementById(id).innerHTML = "&nbsp&nbsp&nbsp" + "O"; 
    }
    turn++; 
}

