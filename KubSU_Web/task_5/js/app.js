window.addEventListener('DOMContentLoaded', function (event) {

    const bd = [
        {
            id: 0,
            name: "Intel Core 2 Duo",
            cost: 3000
        },
        {
            id: 1,
            name: "Intel Core i3",
            cost: 6000
        },
        {
            id: 2,
            name: "Intel Core i5",
            cost: 10000
        },
        {
            id: 3,
            name: "Intel Core i7",
            cost: 15000
        },
        {
            id: 4,
            name: "Intel Core i9",
            cost: 20000
        },
    ];

    document.querySelector("#button1").onclick = (event) => {

        event.preventDefault();

        const number_of_products = document.getElementsByName("numberfield")[0].value;
        const product_select = document.getElementsByName("selectfield")[0].value;

        if (isValidValue(number_of_products)) {
            let product_cost = bd[product_select].cost;

            document.getElementById("result").innerHTML = "Итоговая стоимость составляет " + product_cost * Number(number_of_products);
        }
        else {
            alert("Введите корректное количество товаров");
        }
    };

});

function isValidValue(val) {
    return val.match(/^\d+$/) !== null;
}