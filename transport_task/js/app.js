let suppliers_vector, consumers_vector, costs_matrix;

let table_height = 4;
let table_width = 5;

document.querySelector(".resize_btn").onclick = () => {
  table_height = +document.querySelector("#suppliers").value || table_height;
  table_width = +document.querySelector("#consumers").value || table_width;

  create_table_form();
};

let task_solving = document.querySelector(".task_solving");

/*

.init_task__table-suppliers {
    grid-column: 1/2;
    grid-row: 2/5;
}
.init_task__table-consumers {
    grid-row: 1 / 2;
}
.init_task__table-costs {
    grid-row: 2/6;
    grid-column: 2/7;
}
*/


function create_table_form() {
  let table_consumers = document.querySelector(".init_task__table-consumers");
  table_consumers.innerHTML = "";

  let table_suppliers = document.querySelector(".init_task__table-suppliers");
  table_suppliers.innerHTML = "";

  let table_costs = document.querySelector(".init_task__table-costs");
  table_costs.innerHTML = "";

  for (let i = 0; i < table_width; i++) {
    table_consumers.innerHTML +=
    `
      <input type="number" placeholder="0" />
    `;
  }
  for (let j = 0; j < table_height; j++) {
    table_suppliers.innerHTML +=
    `
      <input type="number" placeholder="0" />
    `;
  }
  for (let i = 0; i < table_width; i++) {
    for (let j = 0; j < table_width; j++) {
      table_costs.innerHTML +=
      `
        <input type="number" placeholder="0" />
      `;
    }
  }

  document.querySelector(".init_task__table").style.gridTemplateColumns = `repeat(${table_width + 1}, 4rem)`;
  document.querySelector(".init_task__table").style.gridTemplateRows = `repeat(${table_height + 1}, 4rem)`;

  table_consumers.style.gridTemplateColumns = `repeat(${table_width}, 4rem)`;
  table_suppliers.style.gridTemplateRows = `repeat(${table_height}, 4rem)`;

  table_costs.style.gridTemplateColumns = `repeat(${table_width}, 4rem)`;
  table_costs.style.gridTemplateRows = `repeat(${table_height}, 4rem)`;

  table_costs.style.gridColumn = `2/${table_width + 2}`;
  table_costs.style.gridRow = `2/${table_height + 1}`;
}

function get_iteration_html(transport_table, swap_target) {
  let iteration_html = `<div class="task_iteration_table">`;

  transport_table.forEach((row, row_index) => {
    row.forEach((cell, cell_index) => {

      iteration_html += `
        <div class="task_iteration_table__cell ${(row_index == swap_target[0] && cell_index == swap_target[1]) ? "swap_target" : ""}">
            ${cell.cycle_mark ? `<div class="task_iteration_table__cell-cycle_marker">${cell.cycle_mark
          }</div>` : ""}
            <div class="task_iteration_table__cell-quantity">${cell.quantity || ""
        }</div>
            <div class="task_iteration_table__cell-cost">${cell.cost}</div>
            <div class="task_iteration_table__cell-reduced_cost">${cell.reduced_cost || ""
        }</div>
        </div>
        `;
    });
  });

  iteration_html += "</div>";

  return iteration_html;
}

function get_potentials_html(potentials_x, potentials_y) {
  let potentials_html = "<div class='task_potentials'>";

  potentials_html += `<div class="potentials_vector"> Потенциалы по горизонтали: <span>  ${potentials_x.join(
    ", "
  )} <span> </div>`;
  potentials_html += `<div class="potentials_vector">Потенциалы по вертикали: <span>  ${potentials_y.join(
    ", "
  )} <span> </div>`;

  potentials_html += "</div>";

  return potentials_html;
}

let solve_btn = document.querySelector(".solve_btn");

solve_btn.onclick = () => {

  document.querySelector(".task_solving").innerHTML = '';

  suppliers_vector = Array.from(
    document.querySelectorAll(".init_task__table-suppliers input")
  ).map((input) => {
    return Number(input.value);
  });

  consumers_vector = Array.from(
    document.querySelectorAll(".init_task__table-consumers input")
  ).map((input) => {
    return Number(input.value);
  });

  costs_matrix = [[], [], [], []];

  let costs_matrix_inputs = document.querySelectorAll(
    ".init_task__table-costs input"
  );

  for (let i = 0; i < suppliers_vector.length; i++) {
    for (let j = 0; j < consumers_vector.length; j++) {
      costs_matrix[i][j] =
        +costs_matrix_inputs[i * consumers_vector.length + j].value;
    }
  }

  solve(suppliers_vector, consumers_vector, costs_matrix);
};

function solve(a, b, c) {
  let test_task = new TransportTask(a, b, c);
  let iteration_count = 1;

  test_task.create_balance();
  test_task.create_table();
  test_task.north_west_quantity();
  test_task.count_potentials();
  test_task.count_reduced_cost();

  if (test_task.was_balanced) {
    task_solving.innerHTML += `<span class="solve_commentary">Задача является сбалансированной, т.к. ${test_task.s[0]} = ${test_task.s[1]}<span>`;
  } else {
    if (test_task.s[0] > test_task.s[1]) {
      task_solving.innerHTML += `<span class="solve_commentary">Предложение превышает спрос, добавили фиктивного потребителя<span>`;
      table_width++;

    }
    if (test_task.s[0] < test_task.s[1]) {
      task_solving.innerHTML += `<span class="solve_commentary">Спрос превышает предложение, добавили фиктивного потребителя<span>`;
      table_height++;

    }
  }

  let current_answer = test_task.get_answer();

  let prev_target_values = [];

  while (!test_task.is_effective_plan()) {

    test_task.set_cycle();
    test_task.set_cycle_marks();

    task_solving.innerHTML += `<span class="iteration_count">Итерация # ${iteration_count}<span>`;
    task_solving.innerHTML += get_iteration_html(test_task.transportTable, test_task.swap_target);

    let height = test_task.transportTable.length;
    let width = test_task.transportTable[0].length;



    task_solving.innerHTML += get_potentials_html(
      test_task.potentials_x,
      test_task.potentials_y
    );
    task_solving.innerHTML += `<span class="iteration_answer">F = ${current_answer}</>`;


    test_task.change_quantities();

    console.log("Цикл: ", ...test_task.cycle);

    test_task.prepare_next_iteration();

    test_task.count_potentials();
    test_task.count_reduced_cost();

    console.log("Таблица: ", test_task.transportTable);

    console.log("Поменяли опорный план");

    current_answer = test_task.get_answer();
    prev_target_values.push(current_answer);

    console.log("F = " + current_answer);

    if (
      prev_target_values[prev_target_values.length - 3] === current_answer &&
      prev_target_values.length > 2
    ) {
      console.log("Произошло зацикливание");
      break;
    }

    iteration_count++;
  }

  task_solving.innerHTML += `<span class="iteration_count">Итерация # ${iteration_count}<span>`;
  task_solving.innerHTML += get_iteration_html(test_task.transportTable, test_task.swap_target);
  task_solving.innerHTML += get_potentials_html(
    test_task.potentials_x,
    test_task.potentials_y
  );

  document.querySelector(".task_result").innerHTML = `
    Итоговый результат: F = ${prev_target_values[prev_target_values.length - 1]}
  `;


  document.querySelector(".task_iteration_table").style.gridTemplateColumns = `repeat(${table_width}, 6rem)`;
  document.querySelector(".task_iteration_table").style.gridTemplateRows = `repeat(${table_height}, 6rem)`;
}