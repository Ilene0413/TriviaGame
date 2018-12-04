$(document).ready(function () {
    // initial set up
    // number of correct answers 
    // number of wrong answers
    // question counter
    // timer
    // object of questions with answers and correct picture
    // array to determine if question already answered

    let maxTimer = 3;
    let intervalId;
    let maxQuest = 4;
    let questionCount = 0;
    let numCorrect = 0;
    let numIncorrect = 0;
    let showTimer = maxTimer;
    let maxAnswers = 4;
    let ansMessage;
    let triviaQuestions = [
        {
            question: "Question1",
            answers: ["answer1", "answer2", "answer3", "answer4"],
            correctAnswer: "1",
            image: "image url 1"

        },
        {
            question: "Question2",
            answers: ["answer1", "answer2", "answer3", "answer4"],
            correctAnswer: "2",
            image: "image url 2"
        },
        {
            question: "Question3",
            answers: ["answer1", "answer2", "answer3", "answer4"],
            correctAnswer: "3",
            image: "image url 3"
        },
        {
            question: "Question4",
            answers: ["answer1", "answer2", "answer3", "answer4"],
            correctAnswer: "4",
            image: "image url 4"
        }];
    let questAsked = [];
    let questionNum;
    let answerValue;



    let questPicture;

    $("#start").click(function () {
        // initialize question asked array to "n" for NO
        for (var i = 0; i < maxQuest; i++) {
            questAsked.push("n");
        }
        // set up and play game

        triviaGame();

    });
    // this function plays the trivia game

    function triviaGame() {

        //determine if game is over
        console.log("question count = " + questionCount);
        if (questionCount > "maxQuest") {
            endGame();
            return;
        }

        // clear variables
        $("#triviaQ, #answersQ, #winOrLose, #correctImg").empty();

        //set up timer

        showTimer = maxTimer;
        console.log("show timer being set " + showTimer);
        $("#timer").html("<p> Timer: " + showTimer + "</p>");
        clearInterval(intervalId);
        intervalId = setInterval(countDownTimer, 1000);

        //get random question, mark question asked, keep count # of questions
        //loop until get a question not answered


        questionNum = Math.floor(Math.random() * maxQuest);
        if (questAsked[questionNum] === "n") {
            questAsked[questionNum] = "y";
            questionCount++;
            console.log("quest asked array " + questAsked[questionNum]);
        }
        else {
            triviaGame();
        }
        console.log("question number " + questionNum);


        $("#triviaQ").append("<p>" + triviaQuestions[questionNum].question);

        //set up answers
        for (i = 0; i < maxAnswers; i++) {
            let ansBtn = $("<button>");
            ansBtn.addClass("answer-button");
            ansBtn.attr("text", triviaQuestions[questionNum].answers[i]);
            let j = i + 1;
            ansBtn.attr("data-answer", j);
            $("#answersQ").append("<button>" + j + ".  " + triviaQuestions[questionNum].answers[i] + "</button>").append("<br><br>");

            console.log("answers displayed " + showTimer);
        }
        console.log("end of set up trivia game " + showTimer);
        $("#answersQ").on("click", ".answer-button", function () {

            answerValue = $(this).attr("data-answer");
            correctTrivia = triviaQuestions[questionNum].correctAnswer;
            if (answerValue == correctTriva) {
                ansMessage = "Congratulations - correct guess";
                numCorrect++;
                updateScreen(ansMessage);
            }
            else {
                ansMessage = "Incorrect - Correct Answer is  ";
                numIncorrect++;
                updateScreen(ansMessage);
            }
        });
    }

    // this function counts down the timer

    function countDownTimer() {
        console.log("in countdown " + showTimer);
        showTimer--;
        $("#timer").html("<p> Timer: " + showTimer + "</p>");

        if (showTimer <= 0) {
            ansMessage = "Time is up - correct answer is  ";
            numIncorrect++;
            $("#timer").html("<p> Timer: " + showTimer + "</p>");
            updateScreen(ansMessage);
            console.log("you lose");
        }
    }


    // this function runs when the player guesses or timer is up

    function updateScreen(ansMessage) {
        console.log("update screen");
        $("#winOrLose, #correctImg").empty();
        $("#winOrLose").append(ansMessage + triviaQuestions[questionNum].correctAnswer);
        $("#correctImg").append(triviaQuestions[questionNum].image);
        clearInterval(intervalId);
        //    showTimer = maxTimer;
        //    intervalId = setInterval(countDownTimer, 1000);
        triviaGame();
    }

    //this function is displayed when game is over
    function endGame() {
        console.log("end game");

    }

});