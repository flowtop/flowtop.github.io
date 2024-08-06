const panelButtons = document.querySelectorAll(".panel__button");
const backline = document.querySelector(".backline__thumb");
const financeTabs = document.querySelectorAll(".finances__tab");

function openTab(num) {
    financeTabs.forEach(ft => {
        ft.classList.remove("active");
        document.querySelector("#finances_tab_" + num).classList.add("active");
    });
}

panelButtons.forEach(panelBtn => {
    panelBtn.onclick = () => {
        openTab(panelBtn.dataset.tabnum);

        if (panelBtn.dataset.tabnum == "1") {
            backline.style.left = "0%";
        } else if (panelBtn.dataset.tabnum == "2") {
            backline.style.left = "33.3%";
            document.querySelector("#finances_tab_" + panelBtn.dataset.tabnum);
        } else if (panelBtn.dataset.tabnum == "3") {
            backline.style.left = "66.66%";
            document.querySelector("#finances_tab_" + panelBtn.dataset.tabnum);
        }
    };
});

// Swiper.js
const swiper = new Swiper(".refill-swiper-container", {
    loop: false,
    allowTouchMove: false,
    navigation: {
        nextEl: ".refill-swiper-next",
        prevEl: ".refill-swiper-prev"
    }
});

const swiper2 = new Swiper(".conclude-swiper-container", {
    loop: false,
    allowTouchMove: false,
    navigation: {
        nextEl: ".conclude-swiper-next",
        prevEl: ".conclude-swiper-prev"
    }
});