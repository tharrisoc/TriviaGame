/*
Correct answers
1 Mike Connors
2 Intertect
3 Joe
4 Peggy
5 William Conrad
6 Barnaby Jones
7 Peter Falk
8 Sgt. Pepper Anderson
9 Adam 12
10 Hawaii Five-O 
*/

var answers = [
  null,
  'choice01-04',
  'choice02-04',
  'choice03-03',
  'choice04-01',
  'choice05-03',
  'choice06-03',
  'choice07-04',
  'choice08-04',
  'choice09-04',
  'choice10-01'
];

const MAX_SECONDS_ALLOWED = 120;
const QUESTION_COUNT = 10;

var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;
var secondsLeft = 0;
var timerHandle = null;

$(document).ready(readyFunc);

function readyFunc() {
  $('#start-button').click(playGame);
  $('#done-button').click(endGame);
  startNewGame();
}

function initVariables() {
  correctAnswers = 0;
  incorrectAnswers = 0;
  unanswered = 0;
  secondsLeft = MAX_SECONDS_ALLOWED;

  $('#scores').hide();
  
  $('#correct-total').text('0');
  $('#incorrect-total').text('0');
  $('#unanswered-total').text('0');

  $('#seconds').text('000');
}

function startNewGame() {
  initVariables();
  $('#timer-div').hide();
  $('#start-div').show();
  $('#scores').hide();
  $('#question-list').hide();
  $('#done-div').hide();
}

function playGame() {
  secondsLeft = MAX_SECONDS_ALLOWED;
  clearRadioButtons();
  $('#seconds').text(secondsLeft.toString());
  $('#start-button').hide();
  $('#timer-div').show();
  $('#question-list').show();
  $('#done-div').show();
  timerHandle = setInterval(showCountdown, 1000);
}

function clearRadioButtons() {
  var buttonName;

  for (var i = 1; i <= QUESTION_COUNT; i++) {
    buttonName = 'answer' + ( (i < 10) ? '0' : '' ) + i;
    $('input[name=' + buttonName + ']').prop('checked', false);
  }
}

function showCountdown() {
  if ( secondsLeft <= 0) {
    // game over
    clearInterval( timerHandle);
    endGame();      
  } else {
    --secondsLeft;
    $('#seconds').text(secondsLeft.toString());
  }
}

function endGame() {
  var theValue;
  var buttonName = null;

  for (var i = 1; i <= QUESTION_COUNT; i++) {
    buttonName = 'answer' + ( (i < 10) ? '0' : '' ) + i;
    theValue = $('input[name=' + buttonName + ']:checked').val();
    if (theValue === answers[i]) {
      ++correctAnswers;
    } else if (typeof theValue != 'undefined') {
      ++incorrectAnswers;
    }
    else {
      ++unanswered;
    }
  }

  $('#correct-total').text(correctAnswers.toString());
  $('#incorrect-total').text(incorrectAnswers.toString());
  $('#unanswered-total').text(unanswered.toString());

  showScores();
}

function showScores() {
  $('#timer-div').hide();
  $('#start-div').hide();
  $('#scores').show();
  $('#question-list').hide();
  $('#done-div').hide();
}