let input = document.querySelector(".change-type");
let inputValue = document.querySelector(".change-type span");
let workTypes = document.querySelector(".work-types");

let listLinks = document.querySelectorAll(".list-link");

for (let i = 0; i < listLinks.length; i++) {
    listLinks[i].onclick = () => {
        console.log(123)
        workTypes.classList.remove("active");
        inputValue.innerText = listLinks[i].innerText;
    }
}

input.onclick = () => {
    workTypes.classList.add("active");
}

