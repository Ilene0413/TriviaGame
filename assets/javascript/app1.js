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
    let triviaQuestions = [
        {
            question: "Question1",
            answers: ["answer1", "answer2", "answer3", "answer4"],
            correctAnswer: "Correct Respond1",
            image: "image url 1"

        },
        {
            question: "Question2",
            answers: ["answer1", "answer2", "answer3", "answer4"],
            correctAnswer: "Correct Respond2",
            image: "image url 2"
        },
        {
            question: "Question3",
            answers: ["answer1", "answer2", "answer3", "answer4"],
            correctAnswer: "Correct Respond3",
            image: "image url 3"
        },
        {
            question: "Question4",
            answers: ["answer1", "answer2", "answer3", "answer4"],
            correctAnswer: "Correct Respond4",
            image: "image url 4"
        }];
    let questAsked = [];
    let questionNum;



    let questPicture;

    $("#start").click(function () {
        // initialize question asked array to "n" for NO
        for (var i = 0; i < maxQuest; i++) {
            questAsked.push("n");
        }
        //determine if game is over
        console.log("question count = " + questionCount);
        if (questionCount > "maxQuest") {
            endGame();
            return;
        }

        // initialize game screen  

        //    $("#timer").html("<p> Timer: " + showTimer + "</p>");
        //    intervalId = setInterval(countDownTimer, 1000);
        // setTimeout(countDownTimer, 1000);
        // put up trivia game question with answers 

        triviaGame();
        //  if (showTimer < 0) {
        //    setTimeout(youLose(), 1000);
        //    $("#timer").html("<p> Timer: " + showTimer + "</p>");
        //      clearTimeout();
        //     console.log("in timer = 0");
        //       youLose();
        //}

        //player clicked on an answer
        //     $("#answersQ").on("click", ".answer-button", function () {}



    });
    // this function puts up triva game board

    function triviaGame() {

        // clear variables
        $("#triviaQ, #answersQ, #winOrLose, #correctImg").empty();

        //show timer

        $("#timer").html("<p> Timer: " + showTimer + "</p>");
        intervalId = setInterval(countDownTimer, 1000);
        //get random question, mark question asked, keep count # of questions
        //loop until get a question not answered


        // let qA = false;
        questionNum = Math.floor(Math.random() * maxQuest);
        // while (!qA)
        if (questAsked[questionNum] === "n") {
            questAsked[questionNum] = "y";
            //        qA = true;
            questionCount++;

            console.log("quest asked array " + questAsked[questionNum]);
        }
        else {
            triviaGame();
        }
        console.log("question number " + questionNum);
        //    questionCount++;


        $("#triviaQ").append("<p>" + triviaQuestions[questionNum].question);

        //set up answers
        for (i = 0; i < maxAnswers; i++) {
            console.log("setting up answers " + JSON.stringify(triviaQuestions[questionNum].answers[i]));
            console.log("setting up answers " + i);
            let j = i + 1;
            $("#answersQ").append("<button>" + j + ".  " + triviaQuestions[questionNum].answers[i] + "</button>").append("<br><br>");
            //     $("#answersQ").append("<button>" + JSON.stringify(triviaQuestions[questionNum].answers[i]) + "</p>").append("<br><br>");

            console.log("answers displayed " + showTimer);
        }
        console.log("end of set up trivia game " + showTimer);
    }
    // this function counts down the timer

    function countDownTimer() {
        console.log("in countdown " + showTimer);
        showTimer--;
        $("#timer").html("<p> Timer: " + showTimer + "</p>");

        if (showTimer < 0) {
            setTimeout(youLose(), 1000);
            $("#timer").html("<p> Timer: " + showTimer + "</p>");
            clearTimeout();
    //        triviaGame();
            //           console.log("in timer = 0");
            //            //  youLose();
        }
        //  $("#timer").html("<p> Timer: " + showTimer + "</p>");

    }

    // this function is run when the player loses the game

    function youLose() {
        console.log("in you lose");
        numIncorrect++;
        $("#winOrLose, #correctImg").empty();
        $("#winOrLose").append("Time is up - correct answer is " + triviaQuestions[questionNum].correctAnswer);
        $("#correctImg").append(triviaQuestions[questionNum].image);
        clearInterval(intervalId);
        showTimer = maxTimer;
        intervalId = setInterval(countDownTimer, 1000);
    //            triviaGame();
    }
});
//this function is displayed when game is over
//function endGame() {
//
//
//}