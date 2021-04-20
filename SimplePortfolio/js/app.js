// MAKING ALL IMAGES NOT DRAGGABLE
let images = document.querySelectorAll("img");

for (let i = 0; i < images.length; i++) {
	images[i].draggable = false;
}



// SWITCHING WORKS-MENU
let 
	js_works         = document.querySelectorAll(".works__gallery__item.js__work"),
	htmlcss_works   = document.querySelectorAll(".works__gallery__item.html-css__work"),
	htmlscss_works  = document.querySelectorAll(".works__gallery__item.html-scss__work"),
	php_works        = document.querySelectorAll(".works__gallery__item.php__work");

let allWorks = document.querySelectorAll(".works__gallery__item");

let worksMenuSelect = document.querySelector(".works__menu");



function changeWorksTheme() {

	allWorks.forEach(elem => {
		elem.classList.remove("works__gallery__item--active")
	});

	// OPEN HTML-CSS WORKS
	if (worksMenuSelect.value == "htmlcss") {
		htmlcss_works.forEach(i => {
			i.classList.add("works__gallery__item--active");
		});

		checkForEmpty(htmlcss_works.length);
	}

	// OPEN HTML-SCSS WORKS
	if (worksMenuSelect.value == "htmlscss") {
		htmlscss_works.forEach(i => {
			i.classList.add("works__gallery__item--active");
		});

		checkForEmpty(htmlscss_works.length);
	}

	// OPEN JS WORKS
	if (worksMenuSelect.value == "js") {
		js_works.forEach(i => {
			i.classList.add("works__gallery__item--active");
		});

		checkForEmpty(js_works.length);
	}

	// OPEN PHP WORKS
	if (worksMenuSelect.value == "php") {
		php_works.forEach(i => {
			i.classList.add("works__gallery__item--active");
		});

		checkForEmpty(php_works.length);
	}
}



// DISPLAYIMG MESSAGE, IF THERE ARE NO WORKS
let textOfEmpty = document.querySelector(".works__gallery__text-of-empty");
textOfEmpty.style.display = "none";

function checkForEmpty(len) {
	if (len == 0) {
		textOfEmpty.style.display = "block";
	}
	else {
		textOfEmpty.style.display = "none";
	}
}



// SMOOTH-SCROLLING
document.addEventListener("click", function(e) {

	if (e.target.classList.contains("intro__button")) {
		
		document.querySelector(".contacts").scrollIntoView({
    		behavior: "smooth",
    		block: "start"
		});
	}


});