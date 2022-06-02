var timer = document.querySelector("#timer");
var startGameButton = document.querySelector("#startGame");
var viewHighscore = document.querySelector("#viewHighscore");

var theQuestion = document.querySelector("#question");
var answerOne = document.querySelector("#choiceOne");
var answerTwo = document.querySelector("#choiceTwo");
var answerThree = document.querySelector("#choiceThree");
var answerFour = document.querySelector("#choiceFour");
var correctness = document.querySelector("#isCorrect");

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

startGameButton.addEventListener("click", function(){
    MakeVisible(showQuestions, showStart);
    countdown = setInterval(TimerCountdown, 1000);});

viewHighscore.addEventListener("click", function(){
    if(!showStart.classList.contains("none")){
        MakeVisible(showHighscore, showStart);}
    else if(!showQuestions.classList.contains("none")){
        MakeVisible(showHighscore, showQuestions);}
    else if(!showForm.classList.contains("none")){
        MakeVisible(showHighscore, showForm);}
})

answerOne.addEventListener("click", function(event){event.preventDefault(); CheckAnswer(answerOne)});
answerTwo.addEventListener("click", function(event){event.preventDefault(); CheckAnswer(answerTwo)});
answerThree.addEventListener("click", function(event){event.preventDefault(); CheckAnswer(answerThree)});
answerFour.addEventListener("click", function(event){event.preventDefault(); CheckAnswer(answerFour)});

highscoreForm.addEventListener("submit", HighscoreSubmit)
reset.addEventListener("click", ResetLocal)

function GetHighscores()
{
    if(localStorage.getItem("highscores"))
    {
        var printList = JSON.parse(localStorage.getItem("highscores"));

        for(var i = 0; i < printList.length; i++)
        {
            var listItem = document.createElement("li");
            listItem.classList.add("body-font");
            listItem.textContent = printList[i];
            highscoreList.append(listItem);
            highscores[highscores.length] = listItem.textContent;
        }
    }
};

function HighscoreSubmit(event)
{
    event.preventDefault();
    var listItem = document.createElement("li");
    listItem.textContent = highscoreName.value + ": " + timerCountdown;
    listItem.classList.add("body-font");
    highscores[highscores.length] = listItem.textContent;
    localStorage.setItem("highscores", JSON.stringify(highscores));
    highscoreList.append(listItem);
    highscoreName.value = "";
    MakeVisible(showHighscore, showForm);
};

function CheckAnswer(pressedButton)
{
    if(correctAnswer === pressedButton){
        if(questionNumber + 1 === questions.length){
            UpdateTimerText(0);
            quizFinished = true;
        }
        else
        {   correctness.textContent = "Correct!";
            questionNumber++;
            UpdateButtonText();}}
    else
    {
        if(timerCountdown - 2 >= 0)
        {UpdateTimerText(2);
            correctness.textContent = "Incorrect!";}
        else
        {UpdateTimerText(Math.abs(timerCountdown));}}};

function MakeVisible(divToShow, divToHide)
{   divToHide.classList.add("none");
    divToShow.classList.remove("none");
};

function ResetLocal(event)
{
    event.preventDefault();
    localStorage.clear();
    while (highscoreList.firstChild) 
    {   highscoreList.removeChild(highscoreList.firstChild);}};

function RestartGame(event)
{
    event.preventDefault();
    
    timerCountdown = 60;
    questionNumber = 0;
    UpdateTimerText(0);
    quizFinished = false;
    UpdateButtonText();
    MakeVisible(showStart, showHighscore);
};

function TimerCountdown()
{    
    if(timerCountdown > 0)
    {
        UpdateTimerText(1);
    }
    else if(timerCountdown <= 0)
    {
        UpdateTimerText(Math.abs(timerCountdown) - timerCountdown);
        clearInterval(countdown);
        MakeVisible(showForm, showQuestions);
    }
    if(quizFinished === true)
    {
        UpdateTimerText(0);
        clearInterval(countdown);
        MakeVisible(showForm, showQuestions);
    }
    if(!showHighscore.classList.contains("none"))
    {
        UpdateTimerText(0);
        clearInterval(countdown);
    }
};

function UpdateButtonText()
{
    theQuestion.textContent = questions[questionNumber].question;
    answerOne.innerHTML = questions[questionNumber].firstAnswer;
    answerTwo.innerHTML = questions[questionNumber].secondAnswer;
    answerThree.innerHTML = questions[questionNumber].thirdAnswer;
    answerFour.innerHTML = questions[questionNumber].fourthAnswer;
    correctAnswer = questions[questionNumber].answer;   
};

function UpdateTimerText(subtractTime)
{
    timerCountdown = timerCountdown - subtractTime;
    timer.textContent = timerCountdown;
};
