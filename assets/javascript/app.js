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
    let showTimer;
    let maxAnswers = 4;
    let triviaQuestions = [
        {
            question: "Question1",
            answers: ["answer1", "answer2", "answer3", "answer4"],
            correctAnswer: "Correct Respond",
            image: "image url"

        },
        {
            question: "Question2",
            answers: ["answer1", "answer2", "answer3", "answer4"],
            correctAnswer: "Correct Respond",
            image: "image url"
        },
        {
            question: "Question3",
            answers: ["answer1", "answer2", "answer3", "answer4"],
            correctAnswer: "Correct Respond",
            image: "image url"
        },
        {
            question: "Question4",
            answers: ["answer1", "answer2", "answer3", "answer4"],
            correctAnswer: "Correct Respond",
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
        if (questionCount === "maxQuest") {
            endGame();
            return;
        }
    // put up trivia game question with answers and timer
        triviaGame(questionNum);

    // if timer gets to zero, player loses

        if (showTimer === 0) {
            youLose();
            return;
        }

        //player clicked on an answer



    });
    // this function puts up triva game board

    function triviaGame(questionNum) {
        //get random question, mark question asked, keep count # of questions
        //loop until get a question not answered
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
        showTimer = 30;
        setInterval(countDownTimer, 1000);

        // set up trivia game board - timer and question
        $("#timer").html("<p> Timer: " + showTimer + "</p>");
        console.log(triviaQuestions[questionNum].question);
        $("#triviaQ").html("<p>" + triviaQuestions[questionNum].question);

        //set up answers
        for (i=0; i < maxAnswers; i++) {
            console.log("setting up answers " + i);
            let ansBtn = $("<p>");
            ansBtn.addClass("answer-button answer");
            ansBtn.attr("answer-value", triviaQuestions[questionNum].answers[i]);
            ansBtn.attr("text", "</p>");
            console.log("ansBTN = " + ansBtn);
//    $("#answersQ").append($("<p>") + triviaQuestions[questionNum].answers[i] + "</p>");

    $("#answersQ").append(ansBtn + triviaQuestions[questionNum].answers[i] + "</p>");
        }
    //    let ansButton
    //    $("#answersQ").html(
    //   "<p>" + triviaQuestions[questionNum].answers[0] + "</p>" +
   //    "<p>" + triviaQuestions[questionNum].answers[1] + "</p>" +
    //   "<p>" + triviaQuestions[questionNum].answers[2] + "</p>" +
    //   "<p>" + triviaQuestions[questionNum].answers[3] + "</p>");



        

    }
// this function counts down the timer

    function countDownTimer() {
        showTimer--;
        $("#timer").html("<p> Timer: " + showTimer + "</p>");
    }
});

//this function is displayed when game is over
function endGame() {


}