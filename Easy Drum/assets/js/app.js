window.addEventListener("keydown", function(e) {
	let audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
	let btn = document.querySelector(`.element[data-key="${e.keyCode}"]`);
	if (audio) {
		audio.play();
	}
	btn.classList.add("playing");
	setTimeout(function() {
		btn.classList.remove("playing");
	}, 200);
});