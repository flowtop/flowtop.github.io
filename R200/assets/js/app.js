document.querySelector(".menu-btn").onclick = () => {
    document.querySelector(".side-menu").classList.remove("hidden");
}
document.querySelector(".close-btn").onclick = () => {
    document.querySelector(".side-menu").classList.add("hidden");
}