
let customer = document.querySelector(".client-check");
let freelancer = document.querySelector(".freelancer-check");
let isFreelancer = document.querySelector(".isFreelancer");

customer.addEventListener("click", () => {
    freelancer.classList.remove("active");
    customer.classList.add("active");
    isFreelancer.setAttribute("value", "1");
});
freelancer.addEventListener("click", () => {
    customer.classList.remove("active");
    freelancer.classList.add("active");
    isFreelancer.setAttribute("value", "2");
});