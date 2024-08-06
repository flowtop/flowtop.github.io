// Данные с формы Пополнения
let refillData = {
    card: "",
    sum: 0
};

// Данные с формы Вывода
let conclusionData = {
    card: "",
    bankAccount: "",
    sum: 0
};

const refillCardButtons = document.querySelectorAll(".refill_cards");

refillCardButtons.forEach(cardBtn => {
    cardBtn.onclick = () => {
        refillData.card = cardBtn.dataset.card;
        console.log(refillData);
    };
});

const refillInput = document.querySelector(".refill-form__input input");
const concludeInput = document.querySelector(".conclude-form__input input");

const optionButtons = document.querySelectorAll(".form__options-option");

function clearOptions(type) {
    document.querySelectorAll(`.${type}-form__options .form__options-option`).forEach(optionBtn => {
        optionBtn.classList.remove("active");
    });
}

refillInput.onchange = (e) => {
    clearOptions("refill");
};
concludeInput.onchange = (e) => {
    clearOptions("conclude");
};

optionButtons.forEach(optionBtn => {
    optionBtn.onclick = () => {
        clearOptions(optionBtn.dataset.type);
        optionBtn.classList.add("active");

        document.querySelector(`.${optionBtn.dataset.type}-form__input input[type='number']`).value = optionBtn.dataset.optval;
    }
});