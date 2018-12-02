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
        console.log("start game");

        // put up trivia game question with answers and timer
        triviaGame(questionNum);



    });
    // this function puts up triva game board

    function triviaGame(questionNum) {
        console.log("in triva game");
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

        // set up trivia game board
        $("#timer").html("<p> Timer: " + showTimer + "</p>");
        $("#triviaQ").html("<p>" + triviaQuestions.question[questionNUM] + "</p>");
        $("#answer1").html("<p>" + triviaQuestions.question[questionNUM].answers[0] + "</p>");
        $("#answer2").html("<p>" + triviaQuestions.question[questionNUM].answers[1] + "</p>");
        $("#answer3").html("<p>" + triviaQuestions.question[questionNUM].answers[2] + "</p>");
        $("#answer4").html("<p>" + triviaQuestions.question[questionNUM].answers[3] + "</p>");

    }

    // this function counts down the timer

    function countDownTimer() {
        showTimer--;
        $("#timer").html("<p> Timer: " + showTimer + "</p>");
    }
});
