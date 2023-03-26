var max = 2;
var min = 1;
var current = 1;
var h1_font_size = 40;
var p_font_size = 20;

window.addEventListener("keydown", function (e) {
    if (e.key == "+") {
        if (current < max) {
            current += 0.1;
            set_font_size();
        }
    }
    if (e.key == "_") {
        if (current > min) {
            current -= 0.1;
            set_font_size();
        }
    }    
});
function set_font_size() {
    var all_h1 = document.querySelectorAll("h1");
    var all_p = document.querySelectorAll("p");
    for (var i = 0; i < all_h1.length; i++) {
        all_h1[i].style.fontSize = h1_font_size * current + "px";
    }
    for (var i = 0; i < all_p.length; i++) {
        all_p[i].style.fontSize = p_font_size * current + "px";
    }
}
