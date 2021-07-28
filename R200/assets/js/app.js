document.querySelector(".sidebar-menu-btn").onclick = () => {
    document.querySelector(".sidebar nav").classList.remove("hidden");
}
document.querySelector(".close-btn").onclick = () => {
    document.querySelector(".sidebar nav").classList.add("hidden");
}