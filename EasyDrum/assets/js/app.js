window.addEventListener("keydown", function(e) {
	let audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
	let btn = document.querySelector(`.element[data-key="${e.keyCode}"]`);

	if (!audio) return;

	audio.play();
	btn.classList.add("playing");
	setTimeout(function() {
		btn.classList.remove("playing");
	}, 200);
});

window.addEventListener("click", function(e) {
	if (e.target.classList.contains("element") || e.target.parentNode.classList.contains("element")) {
		let audio, btn;

		if (e.target.parentNode.classList.contains("element")) {
			audio = document.querySelector(`audio[data-key="${e.target.parentNode.dataset.key}"]`);
			btn = document.querySelector(`.element[data-key="${e.target.parentNode.dataset.key}"]`);
		}
		else {
			audio = document.querySelector(`audio[data-key="${e.target.dataset.key}"]`);
			btn = document.querySelector(`.element[data-key="${e.target.dataset.key}"]`);
		}
		
		if (!audio) return;
		
		audio.play();
		btn.classList.add("playing");
		setTimeout(function() {
			btn.classList.remove("playing");
		}, 200);
	}
});