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
    let maxQuest = 4;
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

    //start when player starts game


    $(".startBtn").on("click", "#start", function () {
        // initialize question asked array to "n" for NO
        //hide start button
        initQuestAsked();
        $("#start").hide();
    //    $("#triviagame").show();
        // set up and play game
        triviaGame();

    });
    // this function plays the trivia game

    function triviaGame() {

        //determine if game is over
        console.log("question count = " + questionCount);
        if (questionCount < maxQuest) {
            //            endGame();
            //
            //        }
            //        else {
            // clear variables
            $("#triviagame, #triviaQ, #answersQ, #winOrLose, #correctImg").empty();
        //    $("#triviaGame").show();


            //get random question, mark question asked, keep count # of questions
            //loop until get a question not answered

            //set up timer

            showTimer = maxTimer;
            $("#timer").html("<p> Timer: " + showTimer + "</p>");
            clearInterval(intervalId);
            intervalId = setInterval(countDownTimer, 1000);

            questionNum = Math.floor(Math.random() * maxQuest);
            console.log("question to be asked before checking" + questionNum);
            if (questAsked[questionNum] === "n") {
                questAsked[questionNum] = "y";
                questionCount++;
                console.log("question asked " + questionNum);
                console.log("question count " + questionCount);

            }
            else {
                triviaGame();
                return;
            }

        //    $("#triviaQ").empty();
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
            $("#answersQ").on("click", ".answer-button", function () {

                // determine which answer was selected & compare to correct answer

                answerValue = $(this).attr("data-answer");
                correctTrivia = triviaQuestions[questionNum].correctAnswer;
                if (answerValue == correctTrivia) {
                    console.log("match");
                    ansMessage = "Congratulations - correct guess";
                    numCorrect++;
                    updateScreen(ansMessage);
                }
                else {
                    console.log("incorrect");
                    ansMessage = "Incorrect - Correct Answer is  ";
                    numIncorrect++;
                    updateScreen(ansMessage);
                }
                console.log("question count before checking " + questionCount);
                //    questionCount++;
                console.log("question count after update & before checking " + questionCount);

                // if (questionCount > maxQuest) {
                //     console.log("in end game");
                //    endgame();
                //    return;
                // }
                // else {
                console.log("game not over");
                clearTimeout(timeoutId);
                timeoutId = window.setTimeout(triviaGame, 3000);
            //    return;
                // }


            });
        }
        else {

            //end of game - show totals 

            console.log("end of game " + questionCount);
            endGame();
        }
            //check to see if want to play again
            console.log("back from end game function   ");
            $("#gameOver").on("click", ".playagain-button", function () {
                // play game again
                console.log("in play again");
                //            // clear question asked array and initialize variables
                for (i = 0; i < maxQuest; i++) {
                    questAsked.pop();
                }
        //        initQuestAsked();
                questionCount = 0;
                numCorrect = 0;
                numIncorrect = 0;
                //clear screen for new game
             //   $("#gameOver").hide();
                $("#triviaGame").empty();
             //   $("#triviaGame").show();
                //
                //            // set up and play game again
        //        triviaGame();
            });
        
    }
    // initializes question asked array
    function initQuestAsked() {
        for (var i = 0; i < maxQuest; i++) {
            questAsked.push("n");
        }
    }
    // this function counts down the timer

    function countDownTimer() {
        showTimer--;
        $("#timer").html("<p> Timer: " + showTimer + "</p>");

        if (showTimer <= 0) {
            ansMessage = "Time is up - correct answer is  ";
            numIncorrect++;
            //    questionCount++;
            $("#timer").html("<p> Timer: " + showTimer + "</p>");
            updateScreen(ansMessage);
            console.log("you lose");
            clearTimeout(timeoutId);
            timeoutId = window.setTimeout(triviaGame, 3000);

        }
    }


    // this function updates the screen after the player guesses or timer is up

    function updateScreen(ansMessage) {
        ansMessage = ansMessage + triviaQuestions[questionNum].correctAnswer;
        console.log(ansMessage);
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
        console.log("end game");
     //   $("#triviagame").hide();
        $("#triviagame").empty();
        $("#gameOver").empty();
    //    $("#gameOver").show();
        let playAgainBtn = $("<button>");
        playAgainBtn.addClass("playagain-button");
        playAgainBtn.text("Play Again");
        $("#gameOver").append("Game Over").append("<br><br>").append("Correct Guesses:  " + numCorrect).append("<br><br>").append("Incorrect Guesses:  " + numIncorrect).append("<br><br>").append(playAgainBtn);

        // $("#gameOver").on("click", ".playagain-button", function () {

        // $("#playAgain").click(function () {
        //     console.log("in play again");
        //            // initialize variables
        //     initQuestAsked();
        //     questionCount = 0;
        //     numCorrect = 0;
        //     numIncorrect = 0;
        //    $("#gameover").hide();

        //             // set up and play game
        //    triviaGame();
        // });
    }

});