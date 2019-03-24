$(document).ready(function() {
	
	var question1 = {
		text: "How many eggs does Beauty and Beast's Gaston eat?", 
		answer: [
			"<div class='text-center btn btn-info btn-block' data-correct='true'>5 dozen</div>", 
			"<div class='text-center btn btn-info btn-block'>3 dozen</div>", 
			"<div class='text-center btn btn-info btn-block'>1 dozen</div>", 
			"<div class='text-center btn btn-info btn-block'>Ew. He hates eggs.</div>"],
		correct: false,
	}

	var question2 = {
		text: "In Toy Story, what game does the slinky play?", 
		answer: [
			"<div class='text-center btn btn-info btn-block' data-correct='true'>Checkers</div>",
			"<div class='text-center btn btn-info btn-block'>Uno</div>",
			"<div class='text-center btn btn-info btn-block'>Hide & Seek</div>",
			"<div class='text-center btn btn-info btn-block'>Chess</div>"],
		correct: false,
	}

	var question3 = {
		text: "In the final battle of Alladin, what animal does Jafar transform himself into?", 
		answer: [
			"<div class='text-center btn btn-info btn-block' data-correct='true'>Cobra</div>",
			"<div class='text-center btn btn-info btn-block'>Giraffe</div>", 
			"<div class='text-center btn btn-info btn-block'>Salamander</div>", 
			"<div class='text-center btn btn-info btn-block'>Turtle</div>"],
		correct: false,
	}

	var question4 = {
		text: "What is the motto for the Rescue Aid Society in The Rescuers?", 
		answer: [
			"<div class='text-center btn btn-info btn-block' data-correct='true'>We Never Fail to do What is Right</div>",
			"<div class='text-center btn btn-info btn-block'>You've got a friend in me</div>", 
			"<div class='text-center btn btn-info btn-block'>I want to be part of your world</div>", 
			"<div class='text-center btn btn-info btn-block'>To infinity and beyond</div>"],
		correct: false,
	}

	var questionBank = [question1, question2, question3, question4];
	var bankLength = questionBank.length;
	var count = 0;
	var intervalID; 
	var time = 5;


$("#start").click(function() {


	createQuestions(questionBank[count]);
	$("#factoids").css('display', 'none');
	$("#questions").css('display', 'inherit');

});



function createQuestions(array) {

	randomizeAnswers();
	intervalID = setInterval(timer, 1000);
	$("#test").css('background', '#FFF');
	$("#text").html("<div><h4>" + array.text);

	for (var i = 0; i < array.answer.length; i++) {
		$("#answers").append(array.answer[i]);
	};

	correct();
}


function nextQuestion() {
	createQuestions(questionBank[count]);
}


function correct() {
	$("#answers div").click(function() {

		var questCorrect = $(this).data("correct");

		if (questCorrect === true) {
			$(this).css('background', '#5CB85C');
			questionBank[count].correct = "Way to go, Disney Expert!";
			count++;
			clearInterval(intervalID);
			time = 5;
			setTimeout(function() {
				checkGameEnd();		
			}, 300);

		} else {
			$(this).css('background', '#D9534F');
			questionBank[count].correct = "Mickey would be displeased.";
			count++;
			clearInterval(intervalID);
			time = 5;
			setTimeout(function() {
				checkGameEnd();		
			}, 300);	
		}

	});
}


function checkGameEnd() {
	if (count === questionBank.length) {
	$("#questions").css('display', 'none');	
	createResults();
	$("#gameOver").css('display', 'inherit');

	} else {
		$("#answers").empty();
		nextQuestion();
	}
}


function createResults() {

	for (var i = 0; i < bankLength; i++) {

		$("#results").append("<div>Question #"+[i+1]+': ' + questionBank[i].correct + "</div>");
	}
}


$("#restart").click(function() {

	count = 0;
	$("#results").empty();	

	for (var i = 0; i < bankLength; i++) {
		questionBank[i].correct = false;
	}

	$("#answers").empty();
	$("#gameOver").css('display', 'none');
	$("#splashScreen").css('display', 'inherit');

});


function timer() {
	$("#timer h1").html("00:0"+time);
	$("#timer").css('visibility', 'inherit');

	if (time === 0) {

		$("#test").css('background', '#D9534F');
		clearInterval(intervalID);
		time = 5;
		questionBank[count].correct = "Way to go, Disney Expert!";
		count++;
		setTimeout(function() {
			checkGameEnd();		
		}, 600);
	}
	time--;
};

function randomizeAnswers() {
	for (var i = 0; i < questionBank.length; i++) {
		questionBank[i].answer.sort(function(a, b){return 0.5 - Math.random()});
	}
}

});