$(document).ready(function () {
    // initial set up
    // number of correct answers 
    // number of wrong answers
    // question counter
    // timer
    // object of questions with answers and correct picture
    // array to determine if question already answered

    let maxTimer = 5;
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
        // if (questionCount > "maxQuest") {
        //     endGame();
        //     return;
        //  }

        // clear variables
      //  $("#triviaQ, #answersQ, #winOrLose, #correctImg").empty();

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
            //    questionCount++;
        }
        else {
            triviaGame();
        }
        console.log("question asked " + questionNum);
        console.log("question count " + questionCount);

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

            //      $("#answersQ").append("<button>" + j + ".  " + triviaQuestions[questionNum].answers[i] + "</button>").append("<br><br>");

        }
        console.log("end of set up trivia game " + showTimer);
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
            questionCount++;
            console.log("question count after update & before checking " + questionCount);

            if (questionCount > maxQuest) {
                console.log("in end game");
            }
            else {
                console.log("game not over");
                setTimeout(triviaGame, 5000);
                //   triviaGame();
                clearTimeout();
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
        console.log("update screen  " + ansMessage);
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

    }

});