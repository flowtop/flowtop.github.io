document.addEventListener('DOMContentLoaded', () => {
    const quantityInput = document.getElementById('quantity');
    const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');
    const optionsContainer = document.getElementById('optionsContainer');
    const serviceOptionSelect = document.getElementById('serviceOption');
    const propertiesContainer = document.getElementById('propertiesContainer');
    const servicePropertyCheckbox = document.getElementById('serviceProperty');
    const servicePropertyLabel = document.getElementById('servicePropertyLabel');
    const totalCostSpan = document.getElementById('totalCost');

    const basePrices = {
        type1: 100,
        type2: 150,
        type3: 120
    };

    const options = {
        type2: {
            0: { name: "Стандарт", price: 0 },
            1: { name: "Премиум", price: 50 },
            2: { name: "Эконом", price: -20 }
        },
    };

    const properties = {
        type3: {
            enabled: { name: "Доп. свойство", price: 75 }
        }
    };

    function updateDynamicElements() {
        const selectedType = document.querySelector('input[name="serviceType"]:checked').value;

        optionsContainer.style.display = 'none';
        propertiesContainer.style.display = 'none';
        serviceOptionSelect.innerHTML = '<option value="0">Выберите опцию</option>';

        if (selectedType === 'type1') {
            //
        } else if (selectedType === 'type2') {
            optionsContainer.style.display = 'block';
            for (const key in options.type2) {
                if (options.type2.hasOwnProperty(key)) {
                    const option = options.type2[key];
                    const optionElement = document.createElement('option');
                    optionElement.value = key;
                    optionElement.textContent = `${option.name} (+${option.price} руб)`;
                    serviceOptionSelect.appendChild(optionElement);
                }
            }
            serviceOptionSelect.value = '0';
        } else if (selectedType === 'type3') {
            propertiesContainer.style.display = 'block';
            servicePropertyLabel.textContent = `${properties.type3.enabled.name} (+${properties.type3.enabled.price} руб)`;
            servicePropertyCheckbox.checked = false;
        }
        calculateCost();
    }

    function calculateCost() {
        const quantity = parseInt(quantityInput.value, 10) || 0;

        if (quantity >= 0) {

            const selectedType = document.querySelector('input[name="serviceType"]:checked').value;
            let additionalCost = 0;

            let unitCost = basePrices[selectedType] || 0;

            if (selectedType === 'type2') {
                const selectedOptionValue = parseInt(serviceOptionSelect.value, 10);
                if (options.type2[selectedOptionValue]) {
                    additionalCost += options.type2[selectedOptionValue].price;
                }
            }

            if (selectedType === 'type3' && servicePropertyCheckbox.checked) {
                additionalCost += properties.type3.enabled.price;
            }

            const totalCost = (unitCost + additionalCost) * quantity;

            totalCostSpan.textContent = totalCost.toFixed(2);

        }
    }

    quantityInput.addEventListener('input', calculateCost);

    serviceTypeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            updateDynamicElements();
            calculateCost();
        });
    });

    serviceOptionSelect.addEventListener('change', calculateCost);

    servicePropertyCheckbox.addEventListener('change', calculateCost);

    updateDynamicElements();
    calculateCost();


});
