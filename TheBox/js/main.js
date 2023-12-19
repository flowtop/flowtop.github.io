// IMG NON DRAGGABLE
document.querySelectorAll("img").forEach( i => i.draggable = false);


// HEADER
document.addEventListener("scroll", () => {
    if (window.pageYOffset == 0) {
        document.querySelector(".header").classList.remove("moving");
    }
    else {
        document.querySelector(".header").classList.add("moving");
    }
    
    // BG FX
    document.querySelector(".active-slide").style.transform = `translateY(${-window.pageYOffset}px)`;
})

// HERO SLIDER
let 
    tape = document.querySelector(".hero__tape"),
    heroSliderNext = document.querySelector(".hero__nav__panel__button#next-btn"),
    heroSliderBack = document.querySelector(".hero__nav__panel__button#back-btn");

let heroSliderPos = 0;

heroSliderNext.onclick = () => {
    heroSliderPos += 1;
    moveHeroSlider();
}
heroSliderBack.onclick = () => {
    heroSliderPos -= 1;
    moveHeroSlider();
}

function moveHeroSlider() {

    if (heroSliderPos < 0) heroSliderPos = 2;
    if (heroSliderPos > 2) heroSliderPos = 0;

    tape.style.left = -(heroSliderPos * 100) + "vw";
    
    document.querySelector(".hero__pos__point.current").classList.remove("current");
    document.querySelector(`.hero__pos__point[data-pos='${heroSliderPos}']`).classList.add("current");

    document.querySelector(".hero__tape img.active-slide").classList.remove("active-slide");
    document.querySelector(`.hero__tape img[data-pos='${heroSliderPos}']`).classList.add("active-slide");
}

// SLIDER
let 
    projectsSliderNext = document.querySelector(".projects__block__view__slider__grid__panel__button#next-btn"),
    projectsSliderBack = document.querySelector(".projects__block__view__slider__grid__panel__button#back-btn");

let projectsSliderPos = 0;
    
projectsSliderNext.onclick = () => {
    projectsSliderPos += 1;
    moveProjectsSlider();
}
projectsSliderBack.onclick = () => {
    projectsSliderPos -= 1;
    moveProjectsSlider();
}

function moveProjectsSlider() {
    if (projectsSliderPos > 2) projectsSliderPos = 0;
    if (projectsSliderPos < 0) projectsSliderPos = 2;

    document.querySelector(".projects__block__view__slider__grid__panel__pos__point.active").classList.remove("active");
    document.querySelector(`.projects__block__view__slider__grid__panel__pos__point[data-pos='${projectsSliderPos}']`).classList.add("active");

    document.querySelector(".projects__block__view__slider__grid__page.active").classList.remove("active");
    document.querySelector(`.projects__block__view__slider__grid__page[data-pos='${projectsSliderPos}']`).classList.add("active");
}

let projectsMenuTab = document.querySelectorAll(".projects__block__view__menu li");

projectsMenuTab.forEach(tab => {
    tab.onclick = () => {
        document.querySelector(".projects__block__view__menu li.active").classList.remove("active");
        tab.classList.add("active");

        setFilters(tab);
    };
});

function setFilters(tab) {
    let cards = document.querySelectorAll(".projects__block__view__slider__grid__page__card");
    cards.forEach(card => {
        card.style.opacity = "50%";
        if (card.dataset.type == tab.dataset.type) {
            card.style.opacity = "100%";
        }
        if (tab.dataset.type == "all") {
            card.style.opacity = "100%";
        }
    });
}
// HEADER SIDE MENU
document.querySelector(".header__nav__aside-btn").onclick = () => {
    document.querySelector(".header__aside").classList.add("opened");
}
document.querySelector(".header__aside__close-btn").onclick = () => {
    document.querySelector(".header__aside").classList.remove("opened");
}