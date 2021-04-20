let 
	overlay    = document.querySelector(".overlay"),
	closeBtn   = document.querySelector(".overlay__close-btn"),
	switchBtns = document.querySelectorAll(".overlay__switch-button"),
	image      = document.querySelector(".overlay__image");

let imgNum = 1;

document.querySelectorAll(".gallery__images-part__post").forEach(i => {
	i.onclick = img => {
		overlay.classList.add("overlay--opened");
		imgNum =
				 parseInt(img.target.style.backgroundImage.match(/\d+/)) 
				 ||
				 parseInt(img.target.parentNode.style.backgroundImage.match(/\d+/));

		image.style.backgroundImage = `url(./img/post_${imgNum}.jpg)`;
	}
})

switchBtns.forEach(i => {
	i.onclick = btn => {
		if (btn.target.classList.contains("overlay__switch-button--right")) {
			if (imgNum != 12) {
				imgNum++;
			}
		}
		else {
			if (imgNum != 1) {
				imgNum--;
			}
		}

		image.style.backgroundImage = `url(./img/post_${imgNum}.jpg)`;
	}
})

closeBtn.onclick = () => {
	overlay.classList.remove("overlay--opened");
}
