
var arr;
$(document).ready(function(){
    generate()
    console.log("something")
})
function generate() {
    for (let i = 0; i < 8; i++) {
        $(".board").append("<div class=\"row\"></div>")
    }
    $(".row").each(function() {
        for (let i = 0; i < 8; i++) {
            $(this).append("<div class=\"square\"></div>")
        }
    })
}