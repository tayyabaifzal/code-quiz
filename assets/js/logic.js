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
