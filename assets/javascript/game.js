$(document).ready(function() {
	// Create a function that creates the start button and initial screen
	
	function initialScreen() {
		startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
		$(".mainArea").html(startScreen);
	}
	
	initialScreen();
	
	//Create a function, generateHTML(), that is triggered by the start button, and generates the HTML
	
	$("body").on("click", ".start-button", function(event){
		event.preventDefault();  
		clickSound.play();
		generateHTML();
	
		timerWrapper();
	
	}); // Closes start-button click
	
	$("body").on("click", ".answer", function(event){
		//answeredQuestion = true;
		clickSound.play();
		selectedAnswer = $(this).text();
		if(selectedAnswer === correctAnswers[questionCounter]) {
			console.log("correct");
	
			clearInterval(theClock);
			generateWin();
		}
		else {
			console.log("wrong answer!");
			clearInterval(theClock);
			generateLoss();
		}
	}); // Close .answer click
	
	$("body").on("click", ".reset-button", function(event){
		clickSound.play();
		resetGame();
	}); // Closes reset-button click
	
	});  //  Closes jQuery wrapper
	
	function generateLossDueToTimeOut() {
		unansweredTally++;
		gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" 
					+ "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" 
					+ "<img class='center-block img-wrong' src='img/x.png'>";

			$(".mainArea").html(gameHTML);
			setTimeout(wait, 4000);  //  change to 4000 or other amount
	}
	
	function generateWin() {
		correctTally++;
		gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" 
					+ "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" 
					+ imageArray[questionCounter];

			$(".mainArea").html(gameHTML);
			setTimeout(wait, 4000);  //  change to 4000 or other amount
	}
	
	function generateLoss() {
		incorrectTally++;
		gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" 
					+ "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" 
					+ "<img class='center-block img-wrong' src='img/x.png'>";
			$(".mainArea").html(gameHTML);
			setTimeout(wait, 4000); //  change to 4000 or other amount
	}
	
	function generateHTML() {
		gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" 
					+ questionArray[questionCounter] + "</p><p class='first-answer answer'> A. " 
					+ answerArray[questionCounter][0] + "</p><p class='answer'>B. "
					+ answerArray[questionCounter][1] + "</p><p class='answer'>C. "
					+ answerArray[questionCounter][2] + "</p><p class='answer'>D. "
					+ answerArray[questionCounter][3] + "</p><p class='answer'>E. "
					+ answerArray[questionCounter][4] + "</p>";
		$(".mainArea").html(gameHTML);
	}
	
	function wait() {
		if (questionCounter < 7) {
		questionCounter++;
		generateHTML();
		counter = 30;
		timerWrapper();
		}
		else {
			finalScreen();
		}
	}
	
	function timerWrapper() {
		theClock = setInterval(thirtySeconds, 1000);
		function thirtySeconds() {
			if (counter === 0) {
				clearInterval(theClock);
				generateLossDueToTimeOut();
			}
			if (counter > 0) {
				counter--;
			}
			$(".timer").html(counter);
		}
	}
	
	function finalScreen() {
		gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" 
				+ "<p class='text-center'>All done, here's how you did!" + "</p>" 
				+ "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" 
				+ "<p>Wrong Answers: " + incorrectTally + "</p>" 
				+ "<p>Unanswered: " + unansweredTally + "</p>" 
				+ "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
			$(".mainArea").html(gameHTML);
	}
	
	function resetGame() {
		questionCounter = 0;
		correctTally = 0;
		incorrectTally = 0;
		unansweredTally = 0;
		counter = 30;
		generateHTML();
		timerWrapper();
	}
	
	var startScreen;
	var gameHTML;
	var counter = 30;

	var questionArray = [
		"Who has won the NBA Finals MVP the most?", 
		"Who is the last Yankees catcher to hit a Home Run twice in the same game during the postseason?", 
		"Who is the youngest NFL coach to win the Super Bowl?", 
		"Who has scored the most goals in the World Cup?", 
		"Who has the most All-time hits in MLB?", 
		"Who has the Most All-time Grand Slams in Tennis?", 
		"Who is the first father-son duo to hit back-to-back homers in an MLB game", 
		"Which artist was involved with the creation of an NBA team logo?"];

	var answerArray = [
		["Kobe Bryant", "Michael Jordan", "Bill Russell", "Hakeem Olajuwon", "Lebron James"], 
		["Jorge Posada", "Gary Sanchez", "Bill Dickey", "Yogi Berra", "Mariano Rivera"], 
		["John Gruden", "Sean McVay", "Mike Tomlin", "Bill Parcels", "John Madden"], 
		["Cristiano Ronaldo","Lionel Messi","Miroslav Klose", "Ronaldo", "Pele"], 
		["Babe Ruth", "Barry Bonds", "Ichiro Suzuki", "Pete Rose", "Mark McGuire"], 
		["Pete Sampras", "Roger Federer", "Steffi Graf", "Billy Jean", "Serena Williams"], 
		["Sandy Alomar Sr. & Roberto Alomar", "Tony Gywnn Sr. & Tony Gwynn Jr.", "Cecil Fielder & Prince Fielder", "Ken Griffey Sr. & Ken Griffey Jr.", "Del Curry & Steph Curry"], 
		["Lil' Wayne", "Taylor Swift", "Jay Z", "DJ Khaled", "DJ Pauly D"]];

	var imageArray = [
		"<img class='center-block img-right' src='./assets/images/jordan.jpg'>", 
		"<img class='center-block img-right' src='./assets/images/yankees-logo.jpg'>", 
		"<img class='center-block img-right' src='./assets/images/tomlin.jpg'>", 
		"<img class='center-block img-right' src='./assets/images/'>", 
		"<img class='center-block img-right' src='./assets/images/'>", 
		"<img class='center-block img-right' src='./assets/images/'>", 
		"<img class='center-block img-right' src='./assets/images/'>", 
		"<img class='center-block img-right' src='./assets/images/'>"];

	var correctAnswers = [
		"B. Michael Jordan", 
		"B. Gary Sanchez", 
		"C. Mike Tomlin", 
		"C. Miroslav Klose", 
		"D. Pete Rose", 
		"E. Serena Williams", 
		"D. Ken Griffey Sr. & Ken Griffey Jr.", 
		"C. Jay Z"];
		
	var questionCounter = 0;
	var selecterAnswer;
	var theClock;
	var correctTally = 0;
	var incorrectTally = 0;
	var unansweredTally = 0;
	var clickSound = new Audio("sound/button-click.mp3");