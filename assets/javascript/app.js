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
    let timeoutId;
    let maxQuest = 2;
    let questionCount = 0;
    let numCorrect = 0;
    let numIncorrect = 0;
    let showTimer = maxTimer;
    let maxAnswers = 4;
    let ansMessage;
    let endGameMsg;
    let triviaQuestions = [
        {
            question: "Which breed of dog yodels instead of barks?",
            answers: ["Austrailan Cattle Dog", "Basenji", "Bloodhound", "Cocker Spaniel"],
            correctAnswer: "2",
            image: "assets/images/Basenji.jpg"

        },
        {
            question: "Which is the smallest breed?",
            answers: ["Yorkshire Terrier", "Dachshund", "Chihuahua", "Cairn Terrier"],
            correctAnswer: "3",
            image: "assets/images/chihuahua.jpg"
        },
        {
            question: "Which breed has a black tongue?",
            answers: ["Chow Chow", "Beagle", "Pekinese", "Great Dane"],
            correctAnswer: "1",
            image: "assets/images/chow chow.jpg"
        },
        {
            question: "Which breed is the cleverest?",
            answers: ["Catahoula", "Border Collie", "Labrador", "St. Bernard"],
            correctAnswer: "2",
            image: "assets/images/Border Collie.jpg"
        }];
    let questAsked = [];
    let questionNum;
    let answerValue;
    let correctTrivia;

    //start when player clicks on start


    $("#start").click(function () {
        // initialize question asked array to "n" for NO
        //hide start button
        initQuestAsked();
        $("button").hide();

        // set up and play 

        setupTrivia();

    });

    //play trivia game

    $("#answersQ").on("click", ".answer-button", function () {

        // determine which answer was selected & compare to correct answer

        answerValue = $(this).attr("data-answer");
        correctTrivia = triviaQuestions[questionNum].correctAnswer;
        if (answerValue == correctTrivia) {
            ansMessage = "Congratulations - correct guess";
            numCorrect++;
            updateScreen(ansMessage);
        }
        else {
            ansMessage = "Incorrect - Correct Answer is  ";
            numIncorrect++;
            updateScreen(ansMessage);
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(setupTrivia, 3000);

    });

    //check to see if want to play again

    $("#gameOver").on("click", ".playagain-button", function () {
        //  clear question asked array and initialize variables
        initQuestAsked();
        questionCount = 0;
        numCorrect = 0;
        numIncorrect = 0;
        //clear screen for new game
        //     $("#gameOver").hide();
        $("#gameOver").empty();
        //    $("#triviaGame").empty();
        //   $("#triviaGame").show();
        //
        //   set up and play game again
        setupTrivia();
    });

    // this function plays the trivia game

    function setupTrivia() {

        //determine if game is over
        if (questionCount < maxQuest) {
// game not over
// clear trivia game board
            $("#triviaQ, #answersQ, #winOrLose, #correctImg").empty();
            //        $("#triviaGame").empty();


            //get random question, mark question asked, keep count # of questions
            //loop until get a question not answered

            //set up timer

            showTimer = maxTimer;
            $("#timer").empty();
            $("#timer").append("<p> Timer: " + showTimer + "</p>");
            clearInterval(intervalId);
            intervalId = setInterval(countDownTimer, 1000);

            questionNum = Math.floor(Math.random() * maxQuest);
            if (questAsked[questionNum] == "n") {
                questAsked[questionNum] = "y";
                questionCount++;
            }
            else {
                setupTrivia();
            }

            $("#triviaQ").empty();
            $("#triviaQ").append("<p>" + triviaQuestions[questionNum].question);

            //set up answers
            //clear out old answers
            $("#answersQ").empty();
            for (i = 0; i < maxAnswers; i++) {
                let ansBtn = $("<button>");
                ansBtn.addClass("answer-button");
                ansBtn.text(triviaQuestions[questionNum].answers[i]);
                let j = i + 1;
                ansBtn.attr("data-answer", j);

                $("#answersQ").append(j + ".  ").append(ansBtn).append("<br><br>");

            }

        }
        else {

            //end of game - show totals 
            endGame();

        }
    }
    // initializes question asked array
    function initQuestAsked() {
        for (var i = 0; i < maxQuest; i++) {
            questAsked[i] = "n";
        }
    }
    // this function counts down the timer

    function countDownTimer() {
        showTimer--;
        $("#timer").html("<p> Timer: " + showTimer + "</p>");

        if (showTimer <= 0) {
            ansMessage = "Time is up - correct answer is  ";
            numIncorrect++;
            $("#timer").html("<p> Timer: " + showTimer + "</p>");
            updateScreen(ansMessage);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(setupTrivia, 1000);

        }
    }


    // this function updates the screen after the player guesses or timer is up

    function updateScreen(ansMessage) {
        ansMessage = ansMessage + triviaQuestions[questionNum].correctAnswer;
        //display message
        $("#winOrLose, #correctImg").empty();
        $("#winOrLose").append(ansMessage);

        //display picture

        let ansPic = $("<img>");
        ansPic.addClass("ans-pic-image");
        ansPic.attr("src", triviaQuestions[questionNum].image);
        $(".ans-pic-image").css("width", 250);
        $(".ans-pic-image").css("height", 250);
        $("#correctImg").append(ansPic);
        clearInterval(intervalId);
    }

    //this function is displayed when game is over
    function endGame() {
  //      $("#timer", "triviaQ", "#winOrLose", "#answersQ", "#correctImg").empty();
        $("#timer").empty();
        $("#triviaQ").empty();
        $("#winOrLose").empty();
        $("#answersQ").empty();
        $("#correctImg").empty();



        $("#gameOver").empty();
        let playAgainBtn = $("<button>");
        playAgainBtn.addClass("playagain-button");
        playAgainBtn.text("Play Again");
        $("#gameOver").html("Game Over");
        $("#gameOver").append("<br><br>");
        $("#gameOver").append("Correct Guesses:  " + numCorrect);
        $("#gameOver").append("<br><br>");
        $("#gameOver").append("Incorrect Guesses:  " + numIncorrect);
        $("#gameOver").append("<br><br>").append(playAgainBtn);


    }

});
