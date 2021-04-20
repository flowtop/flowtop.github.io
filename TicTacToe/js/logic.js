let 
	moveOfX = true, // Изначально ход крестиков
	moveInfo = document.getElementById("fraction"), // Блок с информацией о текущем ходе
	i = 0; // Вспомогательная переменная, обозн., сколько клеток занято

document.onclick = function(el) {
	if (el.target.className == "miniblock" && el.target.innerText == "") {
		if (moveOfX) {
			el.target.innerHTML = "x";
			el.target.style.color = "red";
			i++;
			switchMove();
			checkWinner();
		}

		else {
			el.target.innerHTML = "o";
			el.target.style.color = "blue";
			i++;
			switchMove();
			checkWinner();
		} 
	}
	
	else if ( el.target.className == "miniblock" ) {
		alert('Эта клетка уже занята, попробуйте другую');
	}
}

// Просто проверка на то, победил ли кто-нибудь
function checkWinner() {
	// Получаем блок ЦЕЛОГО игрового поля, он будет массивом с игровыми клетками
	let gblocks = document.getElementsByClassName('miniblock');
	
	// Проверяем все выигрышные комбинации
	if (gblocks[0].innerHTML == "x" && gblocks[1].innerHTML == "x" && gblocks[2].innerHTML == "x") {
		alert("Крестики выиграли");
		setTimeout(function(){
			location.reload();
		}, 1000);
		return true;
	}
	
	if (gblocks[3].innerHTML == "x" && gblocks[4].innerHTML == "x" && gblocks[5].innerHTML == "x") {
		alert("Крестики выиграли");
		setTimeout(function(){
			location.reload();
		}, 1000);
		return true;
	}
	
	if (gblocks[6].innerHTML == "x" && gblocks[7].innerHTML == "x" && gblocks[8].innerHTML == "x") {
		alert("Крестики выиграли");
		setTimeout(function(){
			location.reload();
		}, 1000);
		return true;
	}

	if (gblocks[0].innerHTML == "x" && gblocks[3].innerHTML == "x" && gblocks[6].innerHTML == "x") {
		alert("Крестики выиграли");
		setTimeout(function(){
			location.reload();
		}, 1000);
		return true;
	}
	
	if (gblocks[1].innerHTML == "x" && gblocks[4].innerHTML == "x" && gblocks[7].innerHTML == "x") {
		alert("Крестики выиграли");
		setTimeout(function(){
			location.reload();
		}, 1000);
		return true;
	}
	
	if (gblocks[2].innerHTML == "x" && gblocks[5].innerHTML == "x" && gblocks[8].innerHTML == "x") {
		alert("Крестики выиграли");
		setTimeout(function(){
			location.reload();
		}, 2000);
		return true;
	}

	if (gblocks[0].innerHTML == "x" && gblocks[4].innerHTML == "x" && gblocks[8].innerHTML == "x") {
		alert("Крестики выиграли");
		setTimeout(function(){
			location.reload();
		}, 1000);
		return true;
	}
	
	if (gblocks[2].innerHTML == "x" && gblocks[4].innerHTML == "x" && gblocks[6].innerHTML == "x") {
		alert("Крестики выиграли");
		setTimeout(function(){
			location.reload();
		}, 1000);
		return true;
	}

	if (gblocks[0].innerHTML == "o" && gblocks[1].innerHTML == "o" && gblocks[2].innerHTML == "o") {
		alert("Нолики выиграли");
		setTimeout(function(){
			location.reload();
		}, 1000);
		return true;
	}
	
	if (gblocks[3].innerHTML == "o" && gblocks[4].innerHTML == "o" && gblocks[5].innerHTML == "o") {
		alert("Нолики выиграли");
		setTimeout(function(){
			location.reload();
		}, 1000);
		return true;
	}
	
	if (gblocks[6].innerHTML == "o" && gblocks[7].innerHTML == "o" && gblocks[8].innerHTML == "o") {
		alert("Нолики выиграли");
		setTimeout(function(){
			location.reload();
		}, 1000);
		return true;
	}

	if (gblocks[0].innerHTML == "o" && gblocks[3].innerHTML == "o" && gblocks[6].innerHTML == "o") {
		alert("Нолики выиграли");
		setTimeout(function(){
			location.reload();
		}, 1000);
		return true;
	}
	
	if (gblocks[1].innerHTML == "o" && gblocks[4].innerHTML == "o" && gblocks[7].innerHTML == "o") {
		alert("Нолики выиграли");
		setTimeout(function(){
			location.reload();
		}, 1000);
		return true;
	}
	
	if (gblocks[2].innerHTML == "o" && gblocks[5].innerHTML == "o" && gblocks[8].innerHTML == "o") {
		alert("Нолики выиграли");
		setTimeout(function(){
			location.reload();
		}, 1000);
		return true;
	}

	if (gblocks[0].innerHTML == "o" && gblocks[4].innerHTML == "o" && gblocks[8].innerHTML == "o") {
		alert("Нолики выиграли");
		setTimeout(function(){
			location.reload();
		}, 1000);
		return true;
	}
	
	if (gblocks[2].innerHTML == "o" && gblocks[4].innerHTML == "o" && gblocks[6].innerHTML == "o") {
		alert("Нолики выиграли");
		setTimeout(function(){
			location.reload();
		}, 1000);
		return true;
	}

	// Но если никто не выиграл, выводим сообщение о ничье
	else {
		checkDraw();
	}

}

// Проверяем, заняты ли все клетки
function checkDraw() {
	if (i >= 9) {
		// Если заняты, то выводим сообщение и перезагружаем страницу
		alert("Ничья!");
		location.reload();
	}
}


// Переключение хода с крестиков на нолики, а также вывод сообщения о текущем ходе 
function switchMove() {
	
	if (moveOfX) {
		moveOfX = !moveOfX;
		moveInfo.innerHTML = "Ноликов";
		moveInfo.style.color = "blue";
	}

	else {
		moveOfX = !moveOfX;
		moveInfo.innerHTML = "Крестиков";
		moveInfo.style.color = "red";
	}
}

function reloadGame() {
	location.reload();
}