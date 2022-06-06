const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const qCot = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const timeEl = document.getElementById("time");
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

// variables
//keep track of the current question
let currentQuestion = {};
let play = false;
let score = 0;
let qCo = 0;
let quesionsLeft = [];
var secondsLeft = 60;

//In this function the setInterval function is used to 
// create a game clock starting from 60s and running down 
// to 0
// TODO: create checker to decrement time as player selects
// incorrect answer also make last page and link
function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      return window.location.assign("lastpage.html");
    }

  }, 1000);
}
//four Javascript questions
let questions = [
  {
    question: "Which of the following is not a valid JavaScript variable name?",
    choice1: "2names",
    choice2: "_first_and_last_names",
    choice3: "FirstAndLast",
    choice4: "None of the above",
    answer: 1
  },
  {
    question: "Which of the following function of Array object adds one or more elements to the end of an array and returns the new length of the array?",
    choice1: "pop()",
    choice2: "push()",
    choice3: "join()",
    choice4: "map()",
    answer: 2
  },
  {
    question: "Why do JavaScript and Java have similar names?",
    choice1: "JavaScript is a stripped-down version of Java.",
    choice2: "JavaScript's syntax is loosely based on Java's.",
    choice3: "They both originated on the island of Java",
    choice4: "None of the above.",
    answer: 2
  },
  {
    question: " What are variables used for in JavaScript Programs?",
    choice1: "Storing numbers, dates, or other values.",
    choice2: "Varying randomly.",
    choice3: "Causing high-school algebra flashbacks.",
    choice4: "None of the above.",
    answer: 1
  }
];

//number of points to earn
const point = 10;
//max number of questions
const max = 4;

//start game this function with call the timer function and 
// the newQuestion function to loop begin the game
startGame = () => {
  setTime();
  qCo = 0;
  score = 0;
  quesionsLeft = [...questions];
  newQuestion();
};

//This function is where the bulk of the game is played
// here, there is a checker to determine if all of the questions 
// have been answered and if so then it moves to the last page
// TODO: need to add last page. This function randomly selects 
// questions to ask and displays the questions/choices
newQuestion = () => {
  if (quesionsLeft.length === 0 || qCo >= max) {
    //go to the end page
    return window.location.assign("lastpage.html");
  }
  qCo++;
  const questionIndex = Math.floor(Math.random() * quesionsLeft.length);
  //displays questions
  currentQuestion = quesionsLeft[questionIndex];
  question.innerText = currentQuestion.question;

  //displays choices for each questions
  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  //allows user to select choice as well as highlight 
  //green or red for correctness
  quesionsLeft.splice(questionIndex, 1);
  play = true;
};
//This function determines whether the user's choice
//is correct or incorrect by highlighting the green for 
// correct or red for incorrect.
// if the user is correct they are awarded 10 points
// There is a setTimeout function in here so that 
// the user can see if their selection was right or wrong
// otherwise the user wouldn't be able to see and also the 
// red and green highlights would stick to the screen
choices.forEach(choice => {
  choice.addEventListener("click", done => {
   
    play = false;
    const selectedChoice = done.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    var classToApply = "incorrect"
    if (selectedAnswer == currentQuestion.answer) {
      classToApply = "correct";
    }

    if (classToApply === "correct") {
      incrementScore(point);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      newQuestion();
    }, 1000);
  });
});

//In this function the score is incremented and displayed on the screen
incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};
//call to start game
startGame();

//display text for last page
//TODO: fix final score displaying as 0
finalScore.innerText = mostRecentScore;


const highScoresList = document.getElementById("highScoresList");
const highScores = localStorage.getItem("highScores");
//display highscore list
highScoresList.innerHTML = highScores
