const panelButtons = document.querySelectorAll(".panel__button");
const backline = document.querySelector(".backline__thumb");

panelButtons.forEach(panelBtn => {
    panelBtn.onclick = () => {
        if (panelBtn.dataset.tabnum == "1") {
            backline.style.left = "0%";
        } else if (panelBtn.dataset.tabnum == "2") {
            backline.style.left = "33.3%";
        } else if (panelBtn.dataset.tabnum == "3") {
            backline.style.left = "66.66%";
        }
    };
});