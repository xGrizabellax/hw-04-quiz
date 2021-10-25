/* I need to make an html with tags for a start page with a button
then make tags for every page but no html text
the text will come from the javascript and will appear on the button click
there will be a question and four clickable answers
when clicked the current question and answers will dissapear and the next ones will appear
*/


var body = document.querySelector('body')
var header = document.querySelector('header')
var scoreCard = document.querySelector('.score-card')
var highScoresCard = document.querySelector('.high-scores-card')
var nameInput = document.querySelector('.enter-name')
// var setRecord = document.querySelector('#ini-sco')
// var playerScore = document.querySelector('#player-score')
var startBtn = document.querySelector(".start-button")
var highScoreBtn = document.querySelector(".high-score-button")
var homeBtn = document.querySelector(".home-button")
var scoreBtn = document.querySelector('.save-score')
var highScoresTitle = document.querySelector('.high-scores-title')
var title = document.querySelector(".quiz-title")
var card = document.querySelector(".quiz-card")
var questionSlot = document.querySelector(".question");
var optionSlot = document.querySelector(".options")
var timeCard = document.querySelector('.time-card')
var secTitle = document.querySelector('.sec-title')
var timeLeft = 60
var timer = document.querySelector('.sec-rem')
var correct = 0;
var incorrect = 0;
let questionIndex = 0;
var choice = document.createElement('p')
var scoreTitle = document.querySelector('.score')
var scoreCor = document.querySelector('.correct-score')
var scoreInc = document.querySelector('.incorrect-score')

scoreCard.setAttribute('style', 'display: none')
highScoresCard.setAttribute('style', 'display: none')

choice.setAttribute('style', 'display: flex; align-text: center')
correctChoice = "CORRECT"
wrongChoice = "WRONG"


let questions = [
    {
    numb: 1,
    question: "Which of the following is the correct way to set a new variable to 10?",
    answer: "var num = 10",
    options: [
      "var = 10",
      "var = num 10",
      "var num = 10",
      "num = 10"
    ]
  },
    {
    numb: 2,
    question: "How can you cycle through multiple elements with the same tag in javascript?",
    answer: "Use a for loop to go through the elements index numbers",
    options: [
      "Highlight them",
      "By selecting the index of each individual element",
      "Target the parent element that contains all of the similar sibling elements",
      "Use a for loop to go through the elements index numbers"
    ]
  },
    {
    numb: 3,
    question: "If you want to set a timer to change every second, what number do you put at the end of an interval function?",
    answer: "1000",
    options: [
      "100",
      "10",
      "1000",
      "1"
    ]
  },
    {
    numb: 4,
    question: "Which method targets an individual character in a sting?",
    answer: "charAt()",
    options: [
      "indexOf()",
      "grabChar()",
      "push()",
      "charAt()"
    ]
  },
    {
    numb: 5,
    question: "How can you stop a child element's event from 'bubbling' out to its parent elements?",
    answer: "stopPropagation()",
    options: [
      "setInterval()",
      "stopPropagation()",
      "clearInterval",
      "preventDefault()"
    ]
  },
]

// function countDown() {
//     var timeLeft = 60;
//     var timeInterval = setInterval(function () {
//       timeLeft--; 
//       timer.textContent = timeLeft;

//       if (timeLeft === 0) {
//         clearInterval(timeInterval);
//         endGame()
//       }

//     }, 1000);

    
//   }





function showQuestions() {
    var questionLine = "<span>" + questions[questionIndex].numb + ". " + questions[questionIndex].question +"</span>";
    var optionsLine = "<div class='option'><span>"+ questions[questionIndex].options[0] +"</span></div>" + "<div class='option'><span>"+ questions[questionIndex].options[1] +"</span></div>" + "<div class='option'><span>"+ questions[questionIndex].options[2] +"</span></div>" + "<div class='option'><span>"+ questions[questionIndex].options[3] +"</span></div>";
    questionSlot.innerHTML = questionLine;
    optionSlot.innerHTML = optionsLine;

    var option = document.querySelectorAll(".option");
    for (i = 0; i <option.length; i++) {
    option[i].setAttribute('style', 'background-color: yellow; margin: 20px; padding: 8px; border: solid 2px black; border-radius: 5px;')
    option[i].addEventListener("click", optionSelect)
    };

}

function optionSelect(event) {
    console.log(event.target)
    var myAns = event.target.innerText
    var correctAns = questions[questionIndex].answer;
    card.appendChild(choice)

    if (myAns === correctAns){
    correct++;
    choice.innerHTML = correctChoice;
    }
    else {
    incorrect++;
    choice.innerHTML = wrongChoice;
    timeLeft -= 5;
    timer.innerHTML = timeLeft;
    };
    questionIndex++;
    console.log(correct)
    console.log(incorrect)

    if (questionIndex < questions.length) {
    showQuestions()
    }
    else {
        endGame()
    }
    
};

function endGame() {
    questionSlot.innerHTML = "";
    optionSlot.innerHTML = "";
    choice.innerHTML = "";
    timer.innerHTML = "";
    secTitle.innerHTML = ""
    header.setAttribute('style', 'display: none')


    card.setAttribute('style', 'background-color: unset; border: unset;')
    questionSlot.setAttribute('style', 'background-color: unset; border: unset;')
    
    scoreCard.setAttribute('style', 'display: unset')
    scoreTitle.innerHTML = "Score: "
    scoreCor.innerHTML = "Correct: " + correct
    scoreInc.innerHTML = "Incorrect: " + incorrect
    scoreBtn.innerHTML = "Save Score"




}





scoreBtn.addEventListener('click', function(event) {
    event.preventDefault();
    scoreCard.setAttribute('style', 'display: none')
    header.setAttribute('style', 'display: unset;')
    homeBtn.setAttribute('style', 'display: unset;')
    body.setAttribute('style', 'flex-direction: column-reverse')


    if (nameInput.value !== null) {
        var newHighScoreEntry = [{
          highscore: correct,
          time: timeLeft,
          initials: nameInput.value 
        }]
        console.log(localStorage.getItem("highscores"))
      
        if (localStorage.getItem("highscores") === null) {
          localStorage.setItem("highscores", JSON.stringify(newHighScoreEntry))
    
      
        } else {
            var storedHighScores = retrieveScores();

            var highScoreArray = storedHighScores.concat(newHighScoreEntry)

            highScoreArray.sort(function (a, b) {
              if (a.highscore > b.highscore) return -1;
              if (a.highscore < b.highscore) return 1;
              if (a.time > b.time) return -1;
              if (a.time < b.time) return 1;
            });
            while (highScoreArray.length > 10) highScoreArray.pop();

            localStorage.setItem("highscores", JSON.stringify(highScoreArray))

        };        
        setHighScores();
      }
      else {
        alert("Please enter your initials!")

    }



})



function retrieveScores() {
    return JSON.parse(localStorage.getItem("highscores"));
}



function setHighScores() {
  card.setAttribute('style', 'display: none;')
  highScoresTitle.innerHTML = "HIGH SCORES"
  highScoresCard.setAttribute('style', 'display: unset; ')
  var highScoreListEl = document.createElement('ul');
  highScoreListEl.setAttribute('class', 'high-score-list')
  var highScoreArray = retrieveScores();
  highScoresTitle.append(highScoreListEl);
  

  console.log(highScoreArray)

 
  

  for (var i = 0; i < highScoreArray.length; i++) {
    var listEl = document.createElement('li');
    var highScoreFin = document.createElement('p')
    var timeFin = document.createElement('p')
    var initialsFin = document.createElement('p')

    highScoreFin.setAttribute('style', 'color: red;')
    timeFin.setAttribute('style', 'color: red;')
    initialsFin.setAttribute('style', 'color: red;')

    highScoreFin = highScoreArray[i].highscore.toString();
    timeFin = highScoreArray[i].time.toString();
    initialsFin = highScoreArray[i].initials.toString();

    listEl.setAttribute('class', 'list-item')
    listEl.setAttribute('style', 'margin: 10px; justify-content: center')


    listEl.textContent = "NAME: " + initialsFin + "   " + "SCORE: " + highScoreFin + "   " + "TIME LEFT: " + timeFin ;
    highScoreListEl.append(listEl);

  }


}


highScoreBtn.addEventListener('click', function(event) {
  event.preventDefault();


  body.setAttribute("style", "flex-direction: column; align-items: center;")
  
  homeBtn.setAttribute("style", "width: 200px")
  highScoreBtn.setAttribute("style", "display: none;")
  startBtn.setAttribute("style", "display: none;")
  title.setAttribute("style", "display: none;")

  setHighScores();

})

homeBtn.addEventListener("click", function(event) {
  event.preventDefault();
  highScoresTitle.innerHTML = null
  startBtn.setAttribute("style", "display: unset;");
  highScoreBtn.setAttribute("style", "display: unset;");
  homeBtn.setAttribute("style", "width: unset");
  title.setAttribute("style", "display: unset;");
  highScoresCard.setAttribute('style', 'display: none;')
})



startBtn.addEventListener("click", function(event) {
    event.preventDefault();
    
    var timeInterval = setInterval(function () {
      timeLeft--; 
      timer.textContent = timeLeft;

      if (timeLeft === 0 || questionIndex >= questions.length) {
        clearInterval(timeInterval);
        endGame()
      }

    }, 1000);

    homeBtn.setAttribute('style', 'display: none')
    highScoreBtn.setAttribute('style', 'display: none')
    card.setAttribute('style', 'background-color: rgb(167, 167, 167); border: solid 3px black;')
    questionSlot.setAttribute('style', 'background-color: white; border: solid 2px blue;')
    // startBtn.innerHTML = ""
    startBtn.setAttribute("style", "display: none;")
    title.innerHTML = ""
    title.setAttribute("style", "display: none;")
    secTitle.innerHTML = 'Time:'
    timer.innerHTML = '60'

    var correctChoice = document.createElement('p');
    var wrongChoice = document.createElement('p');
    correctChoice.textContent = "CORRECT"
    correctChoice.setAttribute("style", "color: green; margin-top: 25px; margin-left: 125px;");
    wrongChoice.textContent = "WRONG"
    wrongChoice.setAttribute("style", "color: red; margin-top: 25px; margin-left: 125px;");


    showQuestions()

    

    

    
})