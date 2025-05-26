function save_pos(pos, cycle) {
    let has_vertical_neighbour = false;
    let has_horizontal_neighbour = false;

    cycle.forEach(iterable_pos => {
        if (iterable_pos[0] == pos[0] && iterable_pos[1] != pos[1]) has_horizontal_neighbour = true;
    });

    cycle.forEach(iterable_pos => {
        if (iterable_pos[1] == pos[1] && iterable_pos[0] != pos[0]) has_vertical_neighbour = true;
    });

    return (has_vertical_neighbour && has_horizontal_neighbour);
}

function delete_pos_from_cycle(del_arr, cycle) {
    del_arr.forEach(del_pos => {
        for (let i = 0; i < cycle.length; i++) {
            if (cycle[i][0] == del_pos[0] && cycle[i][1] == del_pos[1]) {
                cycle.splice(i, 1);
                break;
            }
        }
    });

    return cycle;
}

function sortRookPath(cells) {
    if (cells.length === 0) return [];

    const sortedPath = [];
    const remaining = [...cells]; // копия массива, чтобы не изменять исходный

    // Начинаем с первой клетки
    sortedPath.push(remaining.shift());

    while (remaining.length > 0) {
        const last = sortedPath[sortedPath.length - 1];

        // Находим следующую клетку, которая может быть следующей по ходу
        const nextIndex = remaining.findIndex(cell =>
            cell[0] === last[0] || cell[1] === last[1]
        );

        if (nextIndex === -1) {
            // Нет подходящей клетки, значит, цепочка не может быть продолжена
            break;
        }

        // Добавляем найденную клетку в путь и удаляем из оставшихся
        sortedPath.push(remaining.splice(nextIndex, 1)[0]);
    }

    // Проверка, все ли клетки были включены
    if (remaining.length > 0) {
        console.warn("Некоторые клетки не связаны с цепочкой");
    }

    return sortedPath;
}

class TransportTask {

    constructor(suppliers, consumers, costs) {
        this.start_suppliers = [...suppliers];
        this.start_consumers = [...consumers];

        this.suppliers = Array.from(suppliers);
        this.consumers = Array.from(consumers);
        this.costs = costs;

        this.potentials_x = new Array(this.start_consumers.length).fill(null);
        this.potentials_y = new Array(this.start_suppliers.length).fill(null);
    }

    create_balance() {
        const total_supply = this.suppliers.reduce((partialSum, a) => partialSum + a, 0);
        const total_demand = this.consumers.reduce((partialSum, a) => partialSum + a, 0);

        const difference = total_supply - total_demand;

        if (difference == 0) {
            // alert: "Задача является сбалансированной"
            console.log("Задача является сбалансированной");
            
            this.was_balanced = true;
        }
        else {
            this.was_balanced = false;
        }
        
        this.s = [total_supply, total_demand];

        if (difference > 0) { // Предложение превышает спрос
            this.consumers.push(difference);

            this.costs.forEach((consumer_row) => {
                consumer_row.push(0);
            });

            // alert: Добавили фиктивного потребителя
            console.log("Добавили фиктивного потребителя");
        }

        if (difference < 0) { // Спрос превышает предложение
            this.suppliers.push(Math.abs(difference));

            this.costs.push(new Array(this.consumers.length).fill(0));

            // alert: Добавили фиктивного поставщика
            console.log("Добавили фиктивного поставщика");
        }
    }

    create_table() {
        this.transportTable = [];

        this.costs.forEach((row, rowIndex) => {
            this.transportTable.push([]);

            row.forEach((cost, costIndex) => {
                this.transportTable[rowIndex].push({
                    cost: cost,
                    quantity: null,
                    reduced_cost: null,
                    cycle_mark: null,
                });
            });
        });
    }

    north_west_quantity() {
        let current_row = 0;
        let current_col = 0;

        while (
            current_col < this.consumers.length &&
            current_row < this.suppliers.length
        ) {
            let current_demand = this.consumers[current_col];
            let current_supply = this.suppliers[current_row];

            let current_quantity = Math.min(current_demand, current_supply);
            this.transportTable[current_row][current_col].quantity = current_quantity;
            this.suppliers[current_row] -= current_quantity;
            this.consumers[current_col] -= current_quantity;

            if (current_demand < current_supply) {
                current_col++;
            }
            else if (current_demand >= current_supply) {
                current_row++;
            }
        }
    }

    count_potentials() {

        console.log(this.potentials_x, this.potentials_y)

        while (this.potentials_x.indexOf(null) !== -1 || this.potentials_y.indexOf(null) !== -1) {

            for (let i = 0; i < this.suppliers.length; i++) {
                for (let j = 0; j < this.consumers.length; j++) {
                    let current_cell = this.transportTable[i][j];

                    if (current_cell.quantity !== null) {

                        if (this.potentials_y[i] === null && this.potentials_x[j] === null) {
                            this.potentials_y[i] = 0;
                            this.potentials_x[j] = current_cell.cost - this.potentials_y[i];
                        }
                        else if (this.potentials_x[j] === null) {
                            this.potentials_x[j] = current_cell.cost - this.potentials_y[i];
                        }
                        else if (this.potentials_y[i] === null) {
                            this.potentials_y[i] = current_cell.cost - this.potentials_x[j];
                        }
                    }
                }
            }
        }


    }

    count_reduced_cost() {
        for (let i = 0; i < this.suppliers.length; i++) {
            for (let j = 0; j < this.consumers.length; j++) {
                let current_cell = this.transportTable[i][j];

                if (current_cell.quantity === null) {
                    this.transportTable[i][j].reduced_cost = this.potentials_y[i] + this.potentials_x[j] - current_cell.cost;
                }
            }
        }
    }

    is_effective_plan() {

        for (let i = 0; i < this.suppliers.length; i++) {
            for (let j = 0; j < this.consumers.length; j++) {
                let current_cell = this.transportTable[i][j];
                if (current_cell.quantity === null) {
                    if (current_cell.reduced_cost > 0) return false;
                }
            }
        }

        return true;
    }

    get_swap_target() {
        let max = -Infinity;
        let
            max_i = 0,
            max_j = 0;

        for (let i = 0; i < this.suppliers.length; i++) {
            for (let j = 0; j < this.consumers.length; j++) {
                let current_cell = this.transportTable[i][j];
                if (current_cell.quantity === null) {
                    if (current_cell.reduced_cost > max) {
                        max = current_cell.reduced_cost;
                        max_i = i;
                        max_j = j;
                    }
                }
            }
        }

        this.swap_target = [max_i, max_j];
        return [max_i, max_j];
    }

    set_cycle() {

        let cycle = [
            this.get_swap_target()
        ];

        for (let i = 0; i < this.suppliers.length; i++) {
            for (let j = 0; j < this.consumers.length; j++) {
                if (this.transportTable[i][j].quantity !== null) {
                    cycle.push([i, j]);
                }
            }
        }

        let flag = true;

        while (flag) {
            let delete_from_cycle = [];

            flag = false;
            cycle.forEach(i => {
                if (!save_pos(i, cycle)) {
                    delete_from_cycle.push(i);
                    flag = true;
                }
            });
            cycle = delete_pos_from_cycle(delete_from_cycle, cycle);
        }

        // цикл необходимо упорядочить, чтобы ходы были последовательно расставлены

        this.cycle = sortRookPath(cycle);
    }

    set_cycle_marks() {
        let plus = true;

        this.cycle.forEach(cycle_cell_pos => {

            let cycle_cell_i = cycle_cell_pos[0];
            let cycle_cell_j = cycle_cell_pos[1];

            if (plus) {
                this.transportTable[cycle_cell_i][cycle_cell_j].cycle_mark = "+";
            }
            else {
                this.transportTable[cycle_cell_i][cycle_cell_j].cycle_mark = "-";
            }

            plus = !plus;

        });
    }

    change_quantities() {

        // finding minimal quantity with "-" mark
        let min_quantity = Infinity;
        let min_pos = [0, 0];

        this.cycle.forEach(cycle_cell_pos => {

            let cycle_cell_i = cycle_cell_pos[0];
            let cycle_cell_j = cycle_cell_pos[1];

            let cycle_cell = this.transportTable[cycle_cell_i][cycle_cell_j];

            if (cycle_cell.quantity < min_quantity && cycle_cell.cycle_mark == "-") {

                min_quantity = cycle_cell.quantity;
                min_pos = [cycle_cell_i, cycle_cell_j];

            }

        });

        console.log("Выводим из клетки: ", min_quantity, min_pos);

        // replacing quantity from min_quantity cell to get_swap_target() cell
        let [to_i, to_j] = this.get_swap_target();

        this.cycle.forEach(cycle_cell_pos => {

            let [cycle_cell_i, cycle_cell_j] = cycle_cell_pos;

            let cycle_cell = this.transportTable[cycle_cell_i][cycle_cell_j];

            if (cycle_cell.cycle_mark == "+" && cycle_cell.quantity !== null) {
                this.transportTable[cycle_cell_i][cycle_cell_j].quantity += min_quantity;
            }
            if (cycle_cell.cycle_mark == "-") {
                this.transportTable[cycle_cell_i][cycle_cell_j].quantity -= min_quantity;
            }

        });

        this.transportTable[to_i][to_j].quantity = min_quantity;
        this.transportTable[to_i][to_j].reduced_cost = null;

        this.transportTable[min_pos[0]][min_pos[1]].quantity = null;

    }

    prepare_next_iteration() {
        // need to clear: reduced_cost, cycle_marker

        this.transportTable.forEach(row => {
            row.forEach(cell => {
                cell.reduced_cost = null;
                cell.cycle_mark = null;
            })
        });

        this.potentials_x = new Array(this.start_consumers.length).fill(null);
        this.potentials_y = new Array(this.start_suppliers.length).fill(null);
    }

    get_answer() {

        let summar_cost = 0;

        this.transportTable.forEach(row => {
            row.forEach(cell => {
                if (cell.quantity !== null) {
                    summar_cost += cell.quantity * cell.cost;
                }
            });
        });

        return summar_cost;
    }

}

let test_data = [
    {
        suppliers: [20, 15, 63, 2],
        consumers: [16, 30, 18, 19, 17],
        costs: [
            [4, 4, 4, 6, 9],
            [3, 2, 2, 7, 1],
            [11, 8, 5, 6, 6],
            [6, 9, 8, 3, 10]
        ]
    },
    {
        suppliers: [41, 23, 15, 24],
        consumers: [26, 18, 15, 20, 24],
        costs: [
            [15, 8, 7, 11, 11],
            [6, 2, 1, 8, 7],
            [15, 15, 6, 14, 14],
            [13, 11, 7, 15, 12]
        ]
    },
    {
        suppliers: [27, 26, 6, 3],
        consumers: [13, 15, 18, 3, 13],
        costs: [
            [6, 5, 9, 18, 12],
            [9, 8, 13, 21, 12],
            [1, 1, 5, 10, 9],
            [15, 14, 17, 14, 18]
        ]
    },
    // 10.27
    {
        suppliers: [31, 48, 5, 20],
        consumers: [38, 19, 20, 12, 15],
        costs: [
            [5, 9, 2, 3, 3],
            [12, 5, 1, 8, 3],
            [14, 8, 8, 13, 12],
            [8, 12, 4, 12, 5]
        ]
    },
    // 10.28
    {
        suppliers: [6, 24, 5, 22],
        consumers: [5, 9, 14, 6, 23],
        costs: [
            [9, 1, 4, 6, 15],
            [9, 7, 15, 5, 3],
            [9, 1, 8, 4, 15],
            [3, 5, 5, 9, 10]
        ]
    },
];

// console.log(test_data[3]);

// let test_task = new TransportTask(test_data[3]);

// test_task.create_balance();
// test_task.create_table();
// test_task.north_west_quantity();
// test_task.count_potentials();
// test_task.count_reduced_cost();

// console.log(test_task.transportTable);
// console.log(test_task.potentials_x, test_task.potentials_y);

// let k = 0;

// let prev_target_values = [];

// while (!test_task.is_effective_plan() && k < 1000000) {
//     console.log("#" + k);
//     console.log(test_task.potentials_x, test_task.potentials_y);

//     test_task.set_cycle();
//     test_task.set_cycle_marks();
//     test_task.change_quantities();

//     console.log("Цикл: ", ...test_task.cycle);

//     test_task.prepare_next_iteration();

//     test_task.count_potentials();
//     test_task.count_reduced_cost();

//     console.log("Таблица: ", test_task.transportTable);

//     console.log("Поменяли опорный план");

//     let current_answer = test_task.get_answer();
//     prev_target_values.push(current_answer);

//     console.log("F = " + current_answer);
    
//     if (prev_target_values[prev_target_values.length - 3] === current_answer && prev_target_values.length > 2) {
//         console.log("Произошло зацикливание");
//         break;
//     }
    
//     k++;
// }