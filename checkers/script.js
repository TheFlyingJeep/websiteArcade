
var arr;
var selected = -1;
var selectedPiece = -1;
var selectedColor = "red";
$(document).ready(function(){
    board()
    reset()
    //event listeners
    $(".square").click(highlight)
})
function move(from, to, color) {
    console.log("move "+from+" to "+to)
    //moving animation - work on later if time

    //change states
    $("#"+from).children(".piece")[0].classList.add("hidden")
    $("#"+from).children(".piece")[0].classList.remove(selectedColor)
    $("#"+to).children(".piece")[0].classList.remove("hidden")
    $("#"+to).children(".piece")[0].classList.add(selectedColor)    
}
function highlight() {
    //convoluted way of removing highlight on previous square
    if(selected != -1) {
    let selClass = $("#"+selected).attr("class")
    $("#"+selected).attr("class", selClass.slice(0,selClass.indexOf("highlight")))
    }
    //add highlight onto new square
    $(this).attr("class", $(this).attr("class")+" highlight")
    selected = $(this).attr("id");
    //check if they clicked on a piece
    let piece = $("#"+selected).children(".piece")[0]
    if(!piece.classList.contains("hidden")) { //class list doesn't have "hidden"
        console.log(selected+" piece clicked on")
        selectedPiece = selected
        selectedColor = piece.classList.contains("red") ? "red" : "black"
    } else if (selectedPiece != -1) {
        move(selectedPiece, selected, selectedColor) 
    } else {
        selectedPiece = -1
    }
}
function board() {
    //add rows
    for (let i = 0; i < 8; i++) {
        $(".board").append("<div class=\"row\"></div>")
    }
    //add squares and pieces
    let r = 0 //row counter
    $(".row").each(function() {
        for (let i = 0; i < 8; i++) {
            $(this).append("<div class=\"square\" id=\""+(8*r+i)+"\"><div class=\"piece hidden\"></div></div>")
        }
        r++
    })
}
function reset() {
    //clear
    $(".piece").attr("class", "piece hidden")
    //red
    for(let i = 1; i < 4; i++) {
        $(".row:nth-of-type("+i+") .square:nth-of-type(2n+"+(i%2+1)+") .piece").attr("class", "piece red")
    }
    //black
    for(let i = 6; i < 9; i++) {
        $(".row:nth-of-type("+i+") .square:nth-of-type(2n+"+(i%2+1)+") .piece").attr("class", "piece black")
    }
}
