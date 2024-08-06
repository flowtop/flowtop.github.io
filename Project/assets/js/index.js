const refreshButton = document.querySelector(".friends__header-button svg");

let rotates = 1;

document.querySelector(".friends__header-button").onclick = () => {
    refreshButton.style.transform = `rotate(${rotates*360}deg)`;
    rotates += 1;
};

function stopLazyLoad() {
    document.querySelectorAll(".lazyload").forEach(i => {
        i.classList.remove("lazyload");
    });
}