// List of answers
let words = ["wood", "bones", "rest", "carried", "ropes", "victory", "belt", "catch", "woke", "alone", "castle", "shoulders", "ground"];

let questionsList = [
	`Soon all the West of England learnt about Jack's 

				<span class="space-box"> <span class="space space0">_____________</span> </span> .`,
	`I shall kill Jack if I ever

				<span class="space-box"> <span class="space space1">_____________</span> </span> 

				him. `,
	`This giant had a large 

				<span class="space-box"> <span class="space space2">_____________</span> </span>

				in the middle of a dark 

				<span class="space-box"> <span class="space space3">_____________</span> </span> .`,
	`Walking near the dark wood, Jack decided to 

				<span class="space-box"> <span class="space space4">_____________</span> </span> 

				a little.`,
	`The giant saw Jack and read the words on the 

				<span class="space-box"> <span class="space space5">_____________</span> </span> .`,
	`He took Jack on his 

				<span class="space-box"> <span class="space space6">_____________</span> </span>
				
				and

				<span class="space-box"> <span class="space space7">_____________</span> </span> 

				him to the castle. `,
	`When Jack 
				
				<span class="space-box"> <span class="space space8">_____________</span> </span>

				up, he surprised to find himself on the hands of the giant.`,
	`Jack saw all the human

				<span class="space-box"> <span class="space space9">_____________</span> </span>

				that covered the 

				<span class="space-box"> <span class="space space10">_____________</span> </span>  . `,
	`He did not want to eat Jack 

				<span class="space-box"> <span class="space space11">_____________</span> </span>

				. `,
	`In the corner of the room he found some 

				<span class="space-box"> <span class="space space12">_____________</span> </span> . `
];

let allIsRight = true;
let isDone = false;
let over = false;
let isRight = false;

let answers = ["victory", "catch", "castle", "wood", "rest", "belt", "shoulders", "carried", "woke", "bones", "ground", "alone", "ropes"];

// DOM-blocks
let 
	spaceBoxes = document.getElementsByClassName("space-box"),
	spaces = document.getElementsByClassName("space"),
	boxes = document.getElementsByClassName("box"),
	boxesBlock = document.getElementById("boxes-block"),
	quiz = document.getElementById("quiz"),
	questions = document.getElementsByClassName("question"),
	btn = document.getElementById("btn"),
	img = document.getElementById("image"),
	againBtn = document.getElementById("again-btn"),
	nextBtn = document.getElementById("next-btn");


// random generating of questions and answer-boxes
for (i = 0; i < 13; i++) {

	let randomPos = Math.floor(Math.random() * words.length);

	boxesBlock.innerHTML += `<div class="box box${i}" draggable="true"> ${words[randomPos]} </div>`;

	words.splice(randomPos, 1);

}

for (i = 0; i < 10; i++) {

	let qRandomPos = Math.floor(Math.random() * questionsList.length);

	quiz.innerHTML += `<div class="question">${i + 1}. ${questionsList[qRandomPos]}</div>`;

	questionsList.splice(qRandomPos, 1);

}

// setting preventDefault to each answer-box
for (k = 0; k < boxes.length; k++) {

	boxes[k].ondragstart = (event) => {
		event.dataTransfer.setData("class", event.target.className);
	}

}

// setting event-handlers for all of spaces
for (j = 0; j < spaces.length; j++) {

	spaces[j].ondragover = event => {
		event.preventDefault();
	}
	
	spaces[j].ondrop = event => {

		let itemClass = event.dataTransfer.getData("class");
		let box = document.getElementsByClassName(itemClass)[0];

		if (event.target.innerText == "_____________") {
			event.target.classList.add("box");
			event.target.innerText = box.innerText;
			box.style.display = "none";
			event.target.style.cursor = "pointer";
		}

		// Deleting box from space when user clicks on it
		event.target.onclick = () => {
			if (!over) {
				event.target.innerText = "_____________";
				event.target.classList.remove("box");
				event.target.style.cursor = "";
				box.style.display = "inline-block";
			}
		}

		event.target.style.fontFamily = "sans-serif";

	}
}

function checkAnswers() {

	for (i = 0; i < 13; i++) {
		isDone = spaces[i].innerText != "_____________";
		if (!isDone) break;
	}

	if (isDone) {

		over = true;

		for (i = 0; i < 13; i++) {
			isRight = spaces[i].innerText == answers[parseInt(spaces[i].classList[1].match(/\d+/))];
			if (isRight) { 
				spaces[i].style.backgroundColor = "green";
				spaces[i].style.border = "1px solid black";
			}
			else {
				spaces[i].style.backgroundColor = "red";
				allIsRight = false;
			}
		}

		boxes = document.querySelectorAll("span.space.box");

		if (allIsRight) {

			btn.innerText = "Well done! \n Your answers are correct.";
			btn.classList.remove("check");
			btn.classList.add("done");
			img.style.display = "block";

			againBtn.style.display = "inline-block";
			nextBtn.style.display = "inline-block";

			againBtn.onclick = () => {
				location.reload();
			}

		}
		else {
			btn.innerText = "Try to do it again!";
			btn.classList.remove("check");
			btn.classList.add("tryagain");
			btn.onclick = () => {
				location.reload();
			}
		}
	}
}