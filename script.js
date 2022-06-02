var timer = document.querySelector("#timer");
var startGameButton = document.querySelector("#startGame");
var viewHighscore = document.querySelector("#viewHighscore");

var theQuestion = document.querySelector("#question");
var answerOne = document.querySelector("#choiceOne");
var answerTwo = document.querySelector("#choiceTwo");
var answerThree = document.querySelector("#choiceThree");
var answerFour = document.querySelector("#choiceFour");
var correctness = document.querySelector("#correct");

var showStart = document.querySelector("#startSection");
var showQuestions = document.querySelector("#questionSection");
var showForm = document.querySelector("#formSection");
var showHighscore = document.querySelector("#highscoreSection");
var highscoreForm = document.querySelector("#highscore");
var highscoreName = document.querySelector("#highscoreName");
var highscoreList = document.querySelector("#highscoreList");

var reset = document.querySelector("#resetButton");
var restart = document.querySelector("#restartButton");

var timerCountdown = 60;
var countdown;
var questionNumber = 0;
var correctAnswer = "";
var quizFinished = false;

var firstQuestion = 
{
    question: "Which of the following is correct about features of JavaScript?",
    firstAnswer: "JavaScript is open and cross-platform.",
    secondAnswer: "JavaScript is to be integrated with HTML",
    thirdAnswer: "Both of the above.",
    fourthAnswer: "None of the above.",
    answer: answerThree
};

var secondQuestion = 
{
    question: "Which of the following function of String object extracts a section of a string and returns a new string?",
    firstAnswer: "slice()",
    secondAnswer: "split()",
    thirdAnswer: "replace()",
    fourthAnswer: "search",
    answer: answerOne
};

var thirdQuestion = 
{
    question: "What is it called when you add a string to the end of a string?",
    firstAnswer: "append",
    secondAnswer: "concatonate",
    thirdAnswer: "attach",
    fourthAnswer: "None of the above.",
    answer: answerTwo
};

var fourthQuestion = 
{
    question: "Which of the following function of Array object adds one or more elements to the front of an array and returns the new length of the array?",
    firstAnswer: "unshift()",
    secondAnswer: "sort",
    thirdAnswer: "splice",
    fourthAnswer: "toString()",
    answer: answerOne
};

var fifthQuestion = 
{
    question: "Which of the following function of String object returns a number indicating the Unicode value of the character at the given index?",
    firstAnswer: "charAt()",
    secondAnswer: "charCodeAt()",
    thirdAnswer: "concat()",
    fourthAnswer: "indexOf",
    answer: answerTwo
};

var questions = [firstQuestion, secondQuestion, thirdQuestion, fourthQuestion, fifthQuestion];
var highscores = [];

UpdateTimerText(0);
UpdateButtonText();
GetHighscores();
