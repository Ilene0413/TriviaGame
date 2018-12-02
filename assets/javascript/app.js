$(document).ready(function () {
    // initial set up
    // number of correct answers 
    // number of wrong answers
    // question counter
    // timer
    // object of questions with answers and correct picture
    // array to determine if question already answered

    let questionCount =0;
    let numCorrect = 0;
    let numIncorrect = 0;
    let showTimer;
    let triviaQuestions = [{
        question: "question",
        answers: [“ans1”, "ans2”, "ans3”, "ans4”],
        correctAnswer: “correct answer”,
        image: “image”
       }];



let questPicture;

        $("#start").click(function() {

            console.log("start game");

            // put up trivia game question with answers and timer
                triviaGame(question);
            


        });
// this function puts up triva game board

function triviaGame(questionNum) {
    // timer set to 30 seconds and starts counting down
    console.log("in triva game");
    showTimer = 30;
    setInterval(countDownTimer, 1000);
    $("#question").html("<p>" + questionNUM + "</p>");

}
// this function counts down the timer

function countDownTimer() {
    console.log("in count down timer");
    showTimer--;
    $("#timer").html("<p> Timer: " + showTimer + "</p>");
}
});
