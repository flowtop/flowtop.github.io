const 
    tabButtons = document.querySelectorAll(".navbar__btn"),
    tabs = document.querySelectorAll(".tab");

tabButtons.forEach(tabBtn => {
    tabBtn.onclick = () => {
        tabs.forEach(tab => {
            tab.classList.remove("active");
        });
        tabButtons.forEach(tabToClear => {
            tabToClear.classList.remove("active");
        });
        
        // открыть кнопку рефералки
        if (tabBtn.dataset.tabname == "friends") {
            document.querySelector(".navbar__share").classList.add("active");
        } else {
            document.querySelector(".navbar__share").classList.remove("active");
        }


        tabBtn.classList.add("active");
        document.querySelector(`.tab[data-tabname="${tabBtn.dataset.tabname}"]`).classList.add("active");
    };
});