document.querySelector(".hide_btn").onclick = () => {
  document.querySelector(".init_task").classList.toggle("hidden");
  document.querySelector(".hide_btn").classList.toggle("active");
};

let table_width = 5,
  table_height = 4;

document.querySelector(".resize_btn").onclick = () => {
  table_width =
    Number(document.querySelector("#consumers").value) || table_width;
  table_height =
    Number(document.querySelector("#suppliers").value) || table_height;

  draw_table_form();

  document.querySelector(".init_task").classList.remove("hidden");
  document.querySelector(".hide_btn").classList.add("active");
};

function draw_table_form() {
  let suppliers_col = document.querySelector(".init_task__table-suppliers");

  suppliers_col.innerHTML = ""; // clearing

  for (let i = 0; i < table_height; i++) {
    suppliers_col.innerHTML += `
            <input type="number" placeholder="0" />
        `;
  }

  let consumers_row = document.querySelector(".init_task__table-consumers");

  consumers_row.innerHTML = ""; // clearing

  for (let i = 0; i < table_width; i++) {
    consumers_row.innerHTML += `
            <input type="number" placeholder="0" />
        `;
  }

  // resizing grid parameters
  suppliers_col.style.gridTemplateRows = `repeat(${table_height}, 4rem)`;
  consumers_row.style.gridTemplateColumns = `repeat(${table_width}, 4rem)`;

  let whole_table = document.querySelector(".init_task__table");

  whole_table.style.gridTemplateColumns = `repeat(${
    table_width + 1
  }, 4rem) !important`;
  whole_table.style.gridTemplateRows = `repeat(${
    table_height + 1
  }, 4rem) !important`;

  let costs_table = document.querySelector(".init_task__table-costs");

  costs_table.innerHTML = ""; // clearing
  costs_table.style.gridTemplateColumns = `repeat(${table_width}, 4rem)`;
  costs_table.style.gridTemplateRows = `repeat(${table_height}, 4rem)`;

  for (let i = 0; i < table_height; i++) {
    for (let j = 0; j < table_width; j++) {
      costs_table.innerHTML += `
                <input type="number" placeholder="0" />
            `;
    }
  }
}

document.querySelector(".solve_btn").onclick = () => {
  document.querySelector(".task_solving").innerHTML = "";
  document.querySelector(".hide_btn").click();

  let consumers_data = [];
  let suppliers_data = [];
  let costs_data = new Array(table_height).fill([]);

  for (let i = 0; i < table_height; i++) {
    costs_data[i] = new Array(table_width).fill(0);
  }

  // собираем условие задачи из полей ввода
  document
    .querySelectorAll(".init_task__table-suppliers input")
    .forEach((a_i) => {
      suppliers_data.push(Number(a_i.value));
    });

  document
    .querySelectorAll(".init_task__table-consumers input")
    .forEach((b_j) => {
      consumers_data.push(Number(b_j.value));
    });

  document
    .querySelectorAll(".init_task__table-costs input")
    .forEach((c_ij, c_index) => {
      costs_data[Math.floor(c_index / table_width)][c_index % table_width] =
        Number(c_ij.value);
    });

  solve_task(suppliers_data, consumers_data, costs_data);
};

let task_solving = document.querySelector(".task_solving");

function solve_task(a, b, c) {

  let new_task = new TransportTask(a, b, c);

  new_task.create_balance();
  new_task.create_table();
  new_task.north_west_quantity();
  new_task.count_potentials();
  new_task.count_reduced_cost();

  if (new_task.was_balanced) {
    task_solving.innerHTML += `<span class="solve_commentary">Задача является сбалансированной, т.к. ${new_task.resources[0]} = ${new_task.resources[1]}<span>`;
  } else {
    if (new_task.resources[0] > new_task.resources[1]) {
      task_solving.innerHTML += `<span class="solve_commentary">Предложение превышает спрос, добавили фиктивного потребителя<span>`;
      table_width++;
    }
    if (new_task.resources[0] < new_task.resources[1]) {
      task_solving.innerHTML += `<span class="solve_commentary">Спрос превышает предложение, добавили фиктивного поставщика<span>`;
      table_height++;
    }
  }

  let iteration_count = 1;

  // ------------------

  let current_answer = new_task.get_answer();

  let prev_target_values = [];

  while (!new_task.is_effective_plan()) {
    new_task.set_cycle();
    new_task.set_cycle_marks();

    task_solving.innerHTML += `<span class="iteration_count">Итерация # ${iteration_count}<span>`;
    task_solving.innerHTML += get_iteration_html(
      new_task.transportTable,
      new_task.swap_target
    );
    task_solving.innerHTML += get_potentials_html(
      new_task.potentials_x,
      new_task.potentials_y
    );
    task_solving.innerHTML += `<span class="iteration_answer">F = ${current_answer}</>`;

    new_task.change_quantities();

    new_task.prepare_next_iteration();

    new_task.count_potentials();
    new_task.count_reduced_cost();

    current_answer = new_task.get_answer();
    prev_target_values.push(current_answer);

    if (
      prev_target_values[prev_target_values.length - 3] === current_answer &&
      prev_target_values.length > 2
    ) {
      break;
    }

    iteration_count++;
  }

  task_solving.innerHTML += `<span class="iteration_count">Итерация # ${iteration_count}<span>`;
  task_solving.innerHTML += get_iteration_html(
    new_task.transportTable,
    new_task.swap_target
  );
  task_solving.innerHTML += get_potentials_html(
    new_task.potentials_x,
    new_task.potentials_y
  );

  document.querySelector(".task_solving").innerHTML += `
    <div class="task_result">
        Итоговый результат: F = ${
          prev_target_values[prev_target_values.length - 1]
        }
    </div>
  `;

  console.log(new_task);

  document.querySelectorAll(
    ".task_iteration_table"
  ).forEach(table_grid => {
    table_grid.style.gridTemplateColumns = `repeat(${table_width}, 6rem)`;
    table_grid.style.gridTemplateRows    = `repeat(${table_height}, 6rem)`;
  });
}

function get_iteration_html(transport_table, swap_target) {
  let iteration_html = `<div class="task_iteration_table">`;

  transport_table.forEach((row, row_index) => {
    row.forEach((cell, cell_index) => {
      iteration_html += `
        <div class="task_iteration_table__cell ${
          row_index == swap_target[0] && cell_index == swap_target[1]
            ? "swap_target"
            : ""
        }">
            ${
              cell.cycle_mark
                ? `<div class="task_iteration_table__cell-cycle_marker">${cell.cycle_mark}</div>`
                : ""
            }
            <div class="task_iteration_table__cell-quantity">${
              (cell.quantity !== null) ? cell.quantity : ""
            }</div>
            <div class="task_iteration_table__cell-cost">${cell.cost}</div>
            <div class="task_iteration_table__cell-reduced_cost">${
              (cell.reduced_cost !== null) ? cell.reduced_cost : ""
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
