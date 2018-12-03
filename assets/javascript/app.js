$(document).ready(function () {
    // initial set up
    // number of correct answers 
    // number of wrong answers
    // question counter
    // timer
    // object of questions with answers and correct picture
    // array to determine if question already answered

    let maxQuest = 4;
    let questionCount = 0;
    let numCorrect = 0;
    let numIncorrect = 0;
    let showTimer = 3;
    let maxAnswers = 4;
    let triviaQuestions = [
        {
            question: "Question1",
            answers: ["answer1", "answer2", "answer3", "answer4"],
            correctAnswer: "Correct Respond1",
            image: "image url"

        },
        {
            question: "Question2",
            answers: ["answer1", "answer2", "answer3", "answer4"],
            correctAnswer: "Correct Respond2",
            image: "image url"
        },
        {
            question: "Question3",
            answers: ["answer1", "answer2", "answer3", "answer4"],
            correctAnswer: "Correct Respond3",
            image: "image url"
        },
        {
            question: "Question4",
            answers: ["answer1", "answer2", "answer3", "answer4"],
            correctAnswer: "Correct Respond4",
            image: "image url"
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
        if (questionCount === "maxQuest") {
            endGame();
            return;
        }
        else {
            questionCount++;
        }
        setInterval(countDownTimer, 1000);

        // put up trivia game question with answers 


        // if timer gets to zero, player loses
    //    console.log("timer = " + showTimer);
    //    if (showTimer === 0) {
    //        console.log("in timer = 0");
    //        youLose();
    //        return;
    //    }
    //    else {
    //        alert("timer not zero");
//
    //    }

        //alert("timer keep going");
        triviaGame();

        //player clicked on an answer
        //     $("#answersQ").on("click", ".answer-button", function () {}



    });
    // this function puts up triva game board

    function triviaGame() {

        // clear variables
        $("#timer, #triviaQ, #answersQ, #winOrLose, correctImg")
        //get random question, mark question asked, keep count # of questions
        //loop until get a question not answered

        //show timer
     $("#timer").html("<p> Timer: " + showTimer + "</p>");

        let qA = false;
        questionNum = Math.floor(Math.random() * maxQuest);
        while (!qA)
            if (questAsked[questionNum] === "n") {
                questAsked[questionNum] = "y";
                qA = true;
                console.log("quest asked array " + questAsked[questionNum]);
            }
        console.log("question number " + questionNum);
        questionCount++;

        // timer set to 30 seconds and starts counting down
        //  clearInterval();
        //    showTimer = 3;
        //   setInterval(countDownTimer, 1000);

        // set up trivia game board - timer and question
        //  $("#timer").html("<p> Timer: " + showTimer + "</p>");
        $("#triviaQ").append("<p>" + triviaQuestions[questionNum].question);

        //set up answers
        for (i = 0; i < maxAnswers; i++) {
            console.log("setting up answers " + i);
            let j = i + 1;
            $("#answersQ").append("<button>" + j + ".  " + triviaQuestions[questionNum].answers[i] + "</button>").append("<br><br>");
            console.log("answers displayed " + showTimer);
        }
        console.log("end of set up trivia game " + showTimer);
    }
    // this function counts down the timer

    function countDownTimer() {
        console.log("in countdown " + showTimer);
        $("#timer").html("<p> Timer: " + showTimer + "</p>");
        showTimer--;
        if (showTimer === 0) {
            console.log("in timer = 0");
            youLose();
        }
        //        return;
        //    }
        //    else {
        //        $("#timer").html("<p> Timer: " + showTimer + "</p>");
        //  }
    }

    // this function is run when the player loses the game

    function youLose() {
        console.log("in you lose");
        numIncorrect++;
        $("#winOrLose").append("Time is up - correct answer is " + triviaQuestions[questionNum].correctAnswer);
        $("#correctImg").append(triviaQuestions[questionNum].image);
        triviaGame();
        clearInterval();
        showTimer = 3;
        setInterval(countDownTimer, 1000);


    }
});
//this function is displayed when game is over
//function endGame() {
//
//
//}