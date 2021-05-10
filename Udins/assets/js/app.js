let 
	menuBtn = document.querySelector(".intro__go-btn"),
	menu    = document.querySelector(".intro__menu"),
	title = document.querySelector(".intro__title");
	

menuBtn.onclick = () => {
	if (menuBtn.innerText == "МЕНЮ") {
		menuBtn.innerText = "ОБРАТНО";
	}
	else {
		menuBtn.innerText = "МЕНЮ";
	}

	menu.classList.toggle("intro__menu--closed");
	title.classList.toggle("intro__title--closed");
}