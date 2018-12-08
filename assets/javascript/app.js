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
    let maxQuest = 10;
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
            answers: ["1. Austrailan Cattle Dog", "2. Basenji", "3. Bloodhound", "4. Cocker Spaniel"],
            correctAnswer: "2",
            image: "assets/images/Basenji.jpg"

        },
        {
            question: "Which breed has the longest ears?",
            answers: ["1. Basset Hound", "2. Afghan Hound", "3. American Water Spaniel", "4. American Leopard Hound"],
            correctAnswer: "1",
            image: "assets/images/basset-hound.jpg"
        },
        {
            question: "Which is the smallest breed?",
            answers: ["1. Yorkshire Terrier", "2. Dachshund", "3. Chihuahua", "4. Cairn Terrier"],
            correctAnswer: "3",
            image: "assets/images/chihuahua.jpg"
        },
        {
            question: "Which breed has a blue black tongue?",
            answers: ["1. Chow Chow", "2. Beagle", "3. Pekinese", "4. Great Dane"],
            correctAnswer: "1",
            image: "assets/images/chow chow.jpg"
        },
        {
            question: "Dogs can be uniquely identified by:",
            answers: ["1. Tongue Print", "2. Paw Print", "3. Eyes", "4. Nose Print"],
            correctAnswer: "4",
            image: "assets/images/nose-print.jpg"
        },
        {
            question: "Which is the tallest dog breed?",
            answers: ["1. Great Dane", "2. St. Bernard", "3. Irish Wolfhound", "4. English Matiff"],
            correctAnswer: "3",
            image: "assets/images/irish-wolfhound.jpg"
        },
        {
            question: "Most dogs hate which of the following:",
            answers: ["1. Ear Rubs", "2. Hugs", "3. Belly Rub", "4. Toys"],
            correctAnswer: "2",
            image: "assets/images/hugging-dogs.jpg"
        },
        {
            question: "What is the most popular dog breed in the United States?",
            answers: ["1. Labrador Retriever", "2. German Shepherd", "3. Golden Retriever", "4. French Bulldog"],
            correctAnswer: "1",
            image: "assets/images/labradors.jpg"
        },
        {
            question: "How many teeth does an adult dog have?",
            answers: ["1. 32", "2. 36", "3. 40", "4. 42"],
            correctAnswer: "4",
            image: "assets/images/dog-teeth.jpg"
        },
        {
            question: "Which breed is the cleverest?",
            answers: ["1. Catahoula", "2. Border Collie", "3. Labrador", "4. St. Bernard"],
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
        $("h2").hide();

        // set up and play 

        setupTrivia();
        correctTrivia = triviaQuestions[questionNum].correctAnswer;

    });

    //play trivia game

    $("#answersQ").on("click", ".answer-button", function () {

        // determine which answer was selected & compare to correct answer

        answerValue = $(this).attr("data-answer");
        correctTrivia = triviaQuestions[questionNum].correctAnswer;
        console.log("correct answer is " + correctTrivia);
        if (answerValue === correctTrivia) {
            ansMessage = "Congratulations - correct guess  ";
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
        $("#gameOver").empty();
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


            //get random question, mark question asked, keep count # of questions
            //loop until get a question not answered

            //set up timer

            showTimer = maxTimer;
            $("#timer").empty();
            $("#timer").append("<h3> Timer: " + showTimer + "</h3>");
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
            $("#triviaQ").append("<h1 align='center'>" + triviaQuestions[questionNum].question).append("<br>");

            //set up answers
            //clear out old answers
            $("#answersQ").empty();
            for (i = 0; i < maxAnswers; i++) {
                let ansBtn = $("<button>");
                ansBtn.addClass("answer-button");
                ansBtn.text(triviaQuestions[questionNum].answers[i]);
                let j = i + 1;
                ansBtn.attr("data-answer", j);
                $("#answersQ").append(ansBtn).append("<br><br>");

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
        $("#timer").html("<h3> Timer: " + showTimer + "</h3>");

        if (showTimer <= 0) {
            correctTrivia = triviaQuestions[questionNum].correctAnswer;

            ansMessage = "Time is up - correct answer is  ";
            numIncorrect++;
            $("#timer").html("<h3> Timer: " + showTimer + "</h3>");
            updateScreen(ansMessage);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(setupTrivia, 3000);

        }
    }


    // this function updates the screen after the player guesses or timer is up

    function updateScreen(ansMessage) {

        //clear answers
        $("#answersQ").empty();
        let ans = parseInt(correctTrivia)-1;
        console.log("correct triva " + ans);
        ansMessage = ansMessage + triviaQuestions[questionNum].answers[ans];
      
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
        $("#timer").empty();
        $("#triviaQ").empty();
        $("#winOrLose").empty();
        $("#answersQ").empty();
        $("#correctImg").empty();
        $("#gameOver").empty();

        let playAgainBtn = $("<img class='gameOverBtn'>");
        playAgainBtn.addClass("playagain-button");
        playAgainBtn.attr("src", "assets/images/dog-pawprint-button.png");
        $(".playagain-button").css("width", 250);
        $("#gameOver").append("<h2 class='gameOver' align='center'> Game Over");
        $("#gameOver").append("<br>");
        $("#gameOver").append("<p class='gameOverP' align='center'> Correct Guesses:  " + numCorrect);
        $("#gameOver").append("<br>");
        $("#gameOver").append("<p class='gameOverP' align='center'> Incorrect Guesses:  " + numIncorrect);
        $("#gameOver").append("<br>");
        $("#gameOver").append("<h2 class='gameOverB'> Press Button to Play Again   ");
        $("#gameOver").append(playAgainBtn);


    }

});
