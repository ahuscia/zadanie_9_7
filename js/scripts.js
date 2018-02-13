var newGameBtn = document.getElementById('js-newGameButton');
newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock'),
  pickPaper = document.getElementById('js-playerPick_paper'),
  pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function () {
  playerPick('rock')
});
pickPaper.addEventListener('click', function () {
  playerPick('paper')
});
pickScissors.addEventListener('click', function () {
  playerPick('scissors')
});

var gameState = 'notStarted',
  player = {
    name: '',
    score: 0,
    rounds: ''
  },
  computer = {
    score: 0
  };

var newGameElem = document.getElementById('js-newGameElement'),
  pickElem = document.getElementById('js-playerPickElement'),
  resultsElem = document.getElementById('js-resultsTableElement');
  winElem = document.getElementById('js-winElem');
  
function setGameElements() {
  switch (gameState) {
    case 'started':
      newGameElem.style.display = 'none';
      pickElem.style.display = 'block';
      resultsElem.style.display = 'block';
      winElem.style.display = 'none';
      break;
    case 'ended':
      newGameBtn.innerText = 'Jeszcze raz';
      winElem.style.display = 'block';
    case 'notStarted':
    default:
      newGameElem.style.display = 'block';
      pickElem.style.display = 'none';
      resultsElem.style.display = 'none';
  }
}

setGameElements();

var playerPointsElem = document.getElementById('js-playerPoints'),
  playerNameElem = document.getElementById('js-playerName'),
  computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
  player.name = prompt('Please enter your name', 'imię gracza');
  player.rounds = prompt ('How many rounds do you want play?', 'liczba');
  if (player.name && player.rounds) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;

  }
}


function getComputerPick() {
  var possiblePicks = ['rock', 'paper', 'scissors'];
  return possiblePicks[Math.floor(Math.random() * 3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
  computerPickElem = document.getElementById('js-computerPick'),
  playerResultElem = document.getElementById('js-playerResult'),
  computerResultElem = document.getElementById('js-computerResult');

function playerPick(playerPick) {
  var computerPick = getComputerPick();

  playerPickElem.innerHTML = playerPick;
  computerPickElem.innerHTML = computerPick;

  checkRoundWinner(playerPick, computerPick);
}

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';

  if (playerPick == computerPick) {
    winnerIs = 'noone'; // remis
  } else if (
    (computerPick == 'rock' && playerPick == 'scissors') ||
    (computerPick == 'scissors' && playerPick == 'paper') ||
    (computerPick == 'paper' && playerPick == 'rock')) {

    winnerIs = 'computer';
  }

  if (winnerIs == 'player') {
    playerResultElem.innerHTML = "Win!";
    player.score++;
  } else if (winnerIs == 'computer') {
    computerResultElem.innerHTML = "Win!";
    computer.score++;
  }
  setGamePoints();

}

function setGamePoints() {
  playerPointsElem.innerHTML = player.score;
  computerPointsElem.innerHTML = computer.score;

checkGameEnd();
}

function checkGameEnd() {

  if (player.score == player.rounds) {
    winElem.innerHTML = player.name + ', you win!'
    gameState = 'ended';
    setGameElements();
  } else if (computer.score == player.rounds) {
    winElem.innerHTML = 'Computer wins!';
    gameState = 'ended';
    setGameElements();
  }
}