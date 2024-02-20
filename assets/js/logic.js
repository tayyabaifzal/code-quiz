//elements referring to the html elemets
const startBtn = document.getElementById("start");
const timerEl = document.getElementById("time");
const questionsContainer = document.getElementById("questions");
const questionsTitleEl = document.getElementById("question-title");
const choicesContainer = document.getElementById("choices");
const finalScoreEl = document.getElementById("final-score");
const initials = document.getElementById("initials");
const submitBtn = document.getElementById("submit");
const startScreen = document.getElementById("start-screen");
const endScreen = document.getElementById("end-screen");
const feedbackEl = document.getElementById("feedback");


//global elements
let timeLeft = 120;
let score = 0;
let currentQuestionIndex = 0;
let timer;

//audio variables
const correctSound = new Audio("./assets/sfx/correct.wav");
const incorrectSound = new Audio("./assets/sfx/incorrect.wav");

//event listener to start the quiz
startBtn.addEventListener("click", starQuiz);


//function to start the quiz
function starQuiz() {
    startScreen.classList.add("hide");
    questionsContainer.classList.remove("hide");
    showQuestion(currentQuestionIndex);
    startTimer();

}

//function to display questions
function showQuestion(index) {
    const currentQuestion = questions[index];
    questionsTitleEl.innerHTML = currentQuestion.question;
    choices.innerHTML = "";

    for (let i = 0; i < currentQuestion.options.length; i++) {
        let option = document.createElement("button");
        option.innerHTML = currentQuestion.options[i];
        option.addEventListener("click", function () {
            selectedOption = this.innerHTML;
            checkAnswer(this);
        });
        choices.appendChild(option);
    }
}

//function to start the timer
function startTimer() {
    let timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerEl.innerHTML = timeLeft;
        } else {
            clearInterval(timer);
            console.log("Times Up!");
        }
    }, 1000);
}


//function to tally the selected answer and prompt if the answer is correct or not
function checkAnswer(index) {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.options[index] === currentQuestion.correctAnswer) {
        score++
        correctSound.play();
        showfeedback("Correct!");
    } else {
        timeLeft -= 10;
        timerEl.textContent = timeLeft;
        incorrectSound.play();
        showfeedback("Incorrect!");
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        endQuiz();

    }

}

//function to end the quiz
function endQuiz() {
    clearInterval(timer);
    questionsContainer.classList.add("hide");
    endScreen.classList.remove("hide");
    showfeedback("");
    finalScoreEl.innerText = score;
}


//function to show feedback
function showfeedback(message) {
    feedback.classList.remove('hide');
    feedbackEl.innerText = message;

}

//eventlistener to save the initials and scores
submitBtn.addEventListener("click", function () {
    const userInitial = document.getElementById("initials").value;
    localStorage.setItem("initial", userInitial);
    localStorage.setItem("score", score);
    location.href = "./highscores.html"
});
