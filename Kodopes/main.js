document.querySelector(".nav-menu-btn").addEventListener("click", () => {
    document.querySelector(".side-menu").classList.remove("hidden");
});

document.querySelector(".side-nav-menu-btn").addEventListener("click", () => {
    document.querySelector(".side-menu").classList.add("hidden");
});


let accountBtn = document.querySelectorAll(".login-link");
let modal = document.querySelector(".account-modal");
let closeBtn = document.querySelector(".close-btn");

for (let i = 0; i < accountBtn.length; i++) {
    accountBtn[i].onclick = () => {
        modal.classList.add("active");
    }
}

closeBtn.onclick = () => {
    modal.classList.remove("active");
}
