<?php 

/*
Plugin Name: OmNom
Description: OmNom asks uer for a rating
Version: 0.0.1
Author: Mikhail Poladov
*/

add_action( 'wp_body_open', 'addOmNom' );

function addOmNom() {
	?>

		    <style>
				* {
					padding: 0;
					margin: 0;
					font-family: 'Oswald', sans-serif;
				}

				.character-window {
					z-index: 999;
					background-color: #FFF;
					display: flex;
					align-items: center;
					position: fixed;
					bottom: 0;
					right: -800px;
					border: 3px solid black;
					margin: 2vw;
					padding: 20px;
					box-sizing: border-box;
					transition: all 0.6s ease;
					-webkit-transition: all 0.6s ease;
					-moz-transition: all 0.6s ease;
					-o-transition: all 0.6s ease;
				}

				.character-window--opened {
					right: 0;
				}

				.character__gif {
					height: 120px;
					width: 110px;
				}

				.character__message {
					display: flex;
					flex-direction: column;
					text-align: center;
					padding: 0 20px;
				}

				.character__text-part {
					margin-bottom: 10px;
				}

				.text-part__title {
					font-size: 26px;
				}

				.text-part__text {
					font-size: 15px;
					max-width: 270px;
				}

				.btns-part__character-btn {
					background: unset;
					background-color: #FFF;
					color: black;
					border: 2px solid black;
					padding: 5px 10px;
					outline: none;
					cursor: pointer;
					transition: all 0.2s ease;
					-webkit-transition: all 0.2s ease;
					-moz-transition: all 0.2s ease;
					-o-transition: all 0.2s ease;
				}

				.btns-part__character-btn:hover {
					background-color: black;
					color: #FFF;	
				}

				.character__user-feedback {
					width: 80%;
					margin: 10px auto;
					padding: 0 5px 5px;
					border: none;
					outline: none;
					border-bottom: 2px solid #828282;
					display: none;
				}

				.btns-part__ok-btn {
					display: none;
					width: 50px;
					margin: 0 auto;
				}

				.rating-area {
					display: none;
					overflow: hidden;
					width: 265px;
					margin: 0 auto;
					flex-direction: row-reverse;
					justify-content: center;
					margin-bottom: 20px;
				}

				.rating-area:not(:checked) > input {
					display: none;
				}

				.rating-area:not(:checked) > label {
					float: right;
					width: 42px;
					padding: 0;
					cursor: pointer;
					font-size: 32px;
					line-height: 32px;
					color: lightgrey;
					text-shadow: 1px 1px #bbb;
				}

				.rating-area:not(:checked) > label:before {
					content: '???';
					transition: all 0.2s ease;
				}

				.rating-area > input:checked ~ label {
					color: gold;
					text-shadow: 1px 1px orange;
				}

				.rating-area:not(:checked) > label:hover,
				.rating-area:not(:checked) > label:hover ~ label {
					color: gold;
				}

				.rating-area > input:checked + label:hover,
				.rating-area > input:checked + label:hover ~ label,
				.rating-area > input:checked ~ label:hover,
				.rating-area > input:checked ~ label:hover ~ label,
				.rating-area > label:hover ~ input:checked ~ label {
					color: gold;
					text-shadow: 1px 1px goldenrod;
				}

				.rate-area > label:active {
					position: relative;
				}

			</style>
		</head>

		<div class="character-window">

		<div class="character__message">		

			<div class="character__text-part">
				<h1 class="text-part__title">????????????!</h1>
				<p class="text-part__text">?? ????-??????. ???? ?????????? ???? ???? ???????????????? ???? ?????????????</p>
			</div>

			<div class="rating-area">
				<input type="radio" id="star-5" name="rating" value="5">
				<label for="star-5" title="???????????? ??5??"></label>	
				<input type="radio" id="star-4" name="rating" value="4">
				<label for="star-4" title="???????????? ??4??"></label>    
				<input type="radio" id="star-3" name="rating" value="3">
				<label for="star-3" title="???????????? ??3??"></label>  
				<input type="radio" id="star-2" name="rating" value="2">
				<label for="star-2" title="???????????? ??2??"></label>    
				<input type="radio" id="star-1" name="rating" value="1">
				<label for="star-1" title="???????????? ??1??"></label>
			</div>

			<input type="text" class="character__user-feedback" placeholder="???????????? ?????????????? ????????????????">

			<button class="btns-part__character-btn btns-part__ok-btn">OK</button>

			<div class="character__btns-part">
				<button class="btns-part__character-btn btns-part__conf-btn" onclick="getUserResponse(true)">????</button>
				<button class="btns-part__character-btn btns-part__decl-btn" onclick="getUserResponse(false)">??????</button>
			</div>

		</div>

		<img src="gif/character/1.gif" alt="????-??????" class="character__gif">
	
	</div>

	<script>
		let // Blocks
			charWindow        = document.querySelector(".character-window"),
			charGif           = document.querySelector(".character__gif"),
			charTitle         = document.querySelector(".text-part__title"),
			charText          = document.querySelector(".text-part__text"),
			ratingArea        = document.querySelector(".rating-area"),
			charOkBtn         = document.querySelector(".btns-part__ok-btn"),
			charUserFeedback  = document.querySelector(".character__user-feedback"),
			charBtns          = document.querySelector(".character__btns-part");

		// Opening Character Window
		setTimeout(function() {
			charWindow.classList.toggle("character-window--opened");
		}, 500);

		// Gif animation loop
		setInterval(function() {
			if (ivs <= 2) {
				charGif.setAttribute("src", charGif.getAttribute("src"));
			}
		}, 7000);

		// Interview's stage number
		let ivs = 0;

		function getUserResponse(res) {

			// Stage of asking for a interview
			if (ivs == 0) {
				if (res) ivs++; // To next stage

				// Closing Character Window
				charWindow.classList.toggle("character-window--opened");
			}

			// Stage of getting user rate
			if (ivs == 1) {
				
				// Opening Next Stage
				setTimeout(function() {

					charWindow.classList.toggle("character-window--opened"); // Opening Character Window again

					charGif.setAttribute("src", "gif/character/2.gif"); // Next Gif
					charTitle.style.display = "none"; // Hiding title
					charBtns.style.display = "none"; // Hiding buttons

					charOkBtn.style.display = "block";

					// Opening rating area
					ratingArea.style.display = "flex";

					// Changing message text
					charText.innerText = "?????? ???? ???????????????????? ???????????? ???????????? ???????????";

					// Checking for a rating
					charOkBtn.onclick = function() {
						if (
							document.querySelector("input#star-1").checked || 
							document.querySelector("input#star-2").checked || 
							document.querySelector("input#star-3").checked || 
							document.querySelector("input#star-4").checked || 
							document.querySelector("input#star-5").checked ) {

							// Opening Next Stage
							charWindow.classList.toggle("character-window--opened");
							ivs++;

							// Stage of Thanks Message
							if (ivs == 2) {
								setTimeout(function() {

									if (document.querySelector("input#star-1").checked || 
										document.querySelector("input#star-2").checked || 
										document.querySelector("input#star-3").checked || 
										document.querySelector("input#star-4").checked) {

										charText.innerText = "???????????????????? ???? ?????? ??????????! ?????????????? ????????????????, ????????????????????.";

										charTitle.innerText = "?????????? ??????";

										charUserFeedback.style.display = "block";

									}
									
									else {

										charTitle.innerText = "????????????";

										charText.innerText = "???????????????????? ???? ?????? ??????????!";

									}

									// Opening title
									charTitle.style.display = "block";

									// Changing gif
									charGif.setAttribute("src", "gif/character/3.gif");

									// Closing Character Window
									charWindow.classList.toggle("character-window--opened");
									ratingArea.style.display = "none";

								}, 600);
							}
						}
					}

				}, 600);
			}
		}
	</script>
		
	<?php
}