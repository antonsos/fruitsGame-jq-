document.addEventListener('DOMContentLoaded', function() {
  
  // varibales
  var startReset = query('.start-reset');
  var playing = false;
  var scoreReset = 0;
  var scoreRsult = 0;
  var scoreGameOver = 0;
  var scoreValue = query('.score-value');
  var timeBox = query('.time-box');
  var timeSec = query('.time-sec');
  var timeSecIterator = 60;
  var gameOver = query('.game-over');
  var example = query('.example');
  var resulExample;
  var answersBox = query('.answers');
  var scoreValue = query('.score-value');
  var errBox = query('.errBox');
  var correctBox = query('.correctBox');
  var gameScore = query('.game-score');


  //functions
  function query(nameEl) {
    return document.querySelector(nameEl);
  }

  function showeBlock(nameEl) {
    nameEl.style.display = 'block';
  }

  function showeNone(nameEl) {
    nameEl.style.display = 'none';
  }

  function startTimeSec() {
    //start time
    var action = setInterval(function() {
      if(timeSecIterator === 0) {
        //game over
        clearInterval(action);
        showeBlock(gameOver);
        showeNone(timeBox);
        answersBox.removeEventListener('click', answersBoxColl);
        gameScore.textContent = scoreValue.textContent;
      } else {
        timeSec.textContent = --timeSecIterator;
      }
    }, 1000);
  }

  function generateQA() {
    //generate question varibale
    var questionIntOne = Math.round(Math.random() * 9) + 1;
    var questionIntTwo = Math.round(Math.random() * 9) + 1;
    //result question example
    resulExample = questionIntOne * questionIntTwo;
    example.textContent = questionIntOne + 'x' + questionIntTwo;
    //position correct answer
    var positionRulsExample = Math.round(Math.random() * 3) + 1;
    query('.answer' + positionRulsExample).textContent = resulExample;
    //for loop while, indexOf
    var answers = [resulExample];
    //generate wrong answer
    for (let i = 1; i < 5; i++) {
      if(i !== positionRulsExample) {
        //wrong answer
        var wrongAnswer;
        do {
          wrongAnswer = (Math.round(Math.random() * 9) + 1) * (Math.round(Math.random() * 9) + 1);
        } while (answers.indexOf(wrongAnswer) > -1);
        query('.answer' + i).textContent = wrongAnswer;
      }
    }
  }

  function answersBoxColl(el) {
    if(playing) {
      if (el.target.textContent == resulExample) {
        scoreValue.textContent = ++scoreRsult;
        showeBlock(correctBox);
        generateQA();
        setTimeout(function() {
          showeNone(correctBox);
        }, 1000);
      } else if(el.target.classList[0] === 'answer-box') {  
        showeBlock(errBox);

        setTimeout(function() {
          showeNone(errBox);
        }, 1000);
      }
    }
  }

  //if we click on the start/reset
  startReset.addEventListener('click', function() {
    //if we are playing
    if(playing) {
      location.reload();
    } else {
      //change flag
      playing = true;

      //if we are not playing
      //set score to 0 and showe time
      scoreValue.textContent = scoreReset;
      gameScore.textContent = scoreReset;
      showeBlock(timeBox);
      showeNone(gameOver);
      timeSec.textContent = timeSecIterator;
      //change text button start/reset
      startReset.textContent = 'Reset Game';
      generateQA();
      //start time
      startTimeSec();
    }
  });

  //if we click on the answer box
  answersBox.addEventListener('click', answersBoxColl);

});