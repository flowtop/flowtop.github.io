// MENU
let 
	menu        = document.querySelector(".nav-bar"),
	menuBtnRows = document.querySelectorAll(".menu-btn .btn-row");

function sideMenu () {
	menu.classList.toggle("opened");

	menuBtnRows.forEach(i => {
		i.classList.toggle("opened");
	});
}

// SMOOTH-SCROLL
document.addEventListener("click", function(e) {

	if (e.target.classList.contains("nav-item--main")) {
		
		document.querySelector(".wrapper").scrollIntoView({
    		behavior: "smooth",
    		block: "start"
		});
	}

	if (e.target.classList.contains("nav-item--about")) {
		
		document.querySelector(".info").scrollIntoView({
    		behavior: "smooth",
    		block: "start"
		});
	}

	if (e.target.classList.contains("nav-item--history")) {
		
		document.querySelector(".history-card").scrollIntoView({
    		behavior: "smooth",
    		block: "start"
		});
	}

	if (e.target.classList.contains("nav-item--culture")) {
		
		document.querySelector(".culture-card").scrollIntoView({
    		behavior: "smooth",
    		block: "start"
		});
	}

	if (e.target.classList.contains("nav-item--school")) {
		
		document.querySelector(".school-card").scrollIntoView({
    		behavior: "smooth",
    		block: "start"
		});
	}


});