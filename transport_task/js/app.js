let suppliers_vector, consumers_vector, costs_matrix;

let task_solving = document.querySelector(".task_solving");

function get_iteration_html(transport_table, swap_target) {
  let iteration_html = `<div class="task_iteration_table">`;

  transport_table.forEach((row, row_index) => {
    row.forEach((cell, cell_index) => {
        
      iteration_html += `
        <div class="task_iteration_table__cell ${(row_index == swap_target[0] && cell_index == swap_target[1]) ? "swap_target" : ""}">
            ${cell.cycle_mark ? `<div class="task_iteration_table__cell-cycle_marker">${
              cell.cycle_mark
            }</div>` : ""}
            <div class="task_iteration_table__cell-quantity">${
              cell.quantity || ""
            }</div>
            <div class="task_iteration_table__cell-cost">${cell.cost}</div>
            <div class="task_iteration_table__cell-reduced_cost">${
              cell.reduced_cost || ""
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
    }
    if (test_task.s[0] < test_task.s[1]) {
      task_solving.innerHTML += `<span class="solve_commentary">Спрос превышает предложение, добавили фиктивного потребителя<span>`;
    }
  }

  let current_answer = test_task.get_answer();

  let prev_target_values = [];

  while (!test_task.is_effective_plan()) {
    
    test_task.set_cycle();
    test_task.set_cycle_marks();

    task_solving.innerHTML += `<span class="iteration_count">Итерация # ${iteration_count}<span>`;
    task_solving.innerHTML += get_iteration_html(test_task.transportTable, test_task.swap_target);
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
}
