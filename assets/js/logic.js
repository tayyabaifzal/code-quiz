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
    questionsTitleEl.innerText = currentQuestion.question;
    choicesContainer.innerHTML = '';

    currentQuestion.options.forEach((option, i) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("choice-btn");
        button.addEventListener("click", function (event) {
            checkAnswer(i);

        })
        choicesContainer.appendChild(button);
    });
}


//function to tally the selected answer and prompt if the answer is correct or not
function checkAnswer(index) {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.options[index] === currentQuestion.correctAnswer) {
        score++ // increase score for correct answer
        correctSound.play();
        showfeedback("Correct!");
    } else {
        timeLeft -= 10; // decrease time for incorrect answer
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


//function to start the timer
function startTimer() {
    timer = setInterval(function () {
        if (timeLeft <= 0) {
            endQuiz();
        } else {
            timerEl.textContent = timeLeft--;
        }
    }, 1000);

}

//function to end the quiz
function endQuiz() {
    clearInterval(timer);
    questionsContainer.classList.add("hide");
    endScreen.classList.remove("hide");
    showfeedback("");
    finalScoreEl.innerText = score;
}

