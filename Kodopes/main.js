Array.from(document.getElementsByClassName("nav-menu-btn"))[0].addEventListener("click", () => {
    Array.from(document.getElementsByClassName("side-menu"))[0].classList.remove("hidden");
})

Array.from(document.getElementsByClassName("side-nav-menu-btn"))[0].addEventListener("click", () => {
    Array.from(document.getElementsByClassName("side-menu"))[0].classList.add("hidden");
})