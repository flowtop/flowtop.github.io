let input = document.querySelector("#moneytype");
let rub = document.querySelector(".money-type#rub");
let dol = document.querySelector(".money-type#dol");

rub.onclick = () => {
    input.setAttribute("value", "1");
    rub.classList.add("active");
    dol.classList.remove("active");
}
dol.onclick = () => {
    input.setAttribute("value", "2");
    dol.classList.add("active");
    rub.classList.remove("active");
}