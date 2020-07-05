const readline = require('readline-sync');
const ROUNDS_TO_WIN = 5;
const VALID_CHOICES = ['rock', 'paper', 'scissors', 'spock', 'lizard'];
const VALID_INPUT = {
  rock: ['ro', 'roc', 'rock'],
  paper: ['pa', 'pap', 'paper'],
  scissors: ['sc', 'sci', 'scissors'],
  lizard: ['li', 'liz', 'lizard'],
  spock: ['sp', 'spo', 'spock'],
};
const WINNING_COMBOS = {
  rock:     ['scissors', 'lizard'],
  paper:    ['rock',     'spock'],
  scissors: ['paper',    'lizard'],
  lizard:   ['paper',    'spock'],
  spock:    ['rock',     'scissors'],
};

function prompt(message) {
  console.log(`=> ${message}`);
}

function playerWins(choice, computerChoice) {
  return WINNING_COMBOS[choice].includes(computerChoice);
}

function displayWinner(choice, computerChoice) {
  if (playerWins(choice, computerChoice)) {
    return 'You win!';
  } else if (choice === computerChoice) {
    return "It's a tie!";
  } else {
    return 'The computer wins!';
  }
}

let playerScore = 0;
let computerScore = 0;
function updateScore(string) {
  if (string === 'You win!') {
    playerScore += 1;
  } else if (string === 'The computer wins!') {
    computerScore += 1;
  }
}

let choice;
function inputToChoice(input, VALID_INPUT) {
  choice = '';
  Object.keys(VALID_INPUT).forEach((key) => {
    if (VALID_INPUT[key].includes(input)) {
      choice = key;
    }
  });
}

function validateYesOrNo(answer) {
  while (answer !== 'no' && answer !== 'yes') {
    prompt('Please enter only yes or no.');
    answer = readline.question().toLowerCase();
  }
}

function grandWinner(score1, score2) {
  if (score1 === ROUNDS_TO_WIN) {
    prompt('The computer is the grand winner!');
  } else if (score2 === ROUNDS_TO_WIN) {
    prompt('You are the grand winner!');
  } else {
    prompt('You resigned. The computer wins by default.');
  }
}

function randomIndex() {
  return VALID_CHOICES[Math.floor(Math.random() * VALID_CHOICES.length)];
}

function displayStats(match, round, playerScore, computerScore) {
  prompt(`Match: ${match} Round: ${round}`);
  prompt(`Current Score: You: ${playerScore}, Computer: ${computerScore}`);
}

let newMatchAnswer = 'yes';
let match = 1;
let round = 1;
while (newMatchAnswer !== 'no') {
  let playAgainAnswer = 'yes';
  round = 1;
  playerScore = 0;
  computerScore = 0;
  while (playAgainAnswer !== 'no') {
    console.clear();
    displayStats(match, round, playerScore, computerScore);
    prompt(`Choose one: rock, paper, scissors, lizard, or spock.`);
    prompt('*Type the first 2 or 3 letters or the full name of your choice.*');
    let input = readline.question().toLowerCase();
    inputToChoice(input, VALID_INPUT);
    while (!VALID_CHOICES.includes(choice)) {
      prompt("That's not a valid choice. Choose again.");
      input = readline.question();
      inputToChoice(input, VALID_INPUT);
    }

    let computerChoice = randomIndex();

    prompt(`You chose ${choice}, and the computer chose ${computerChoice}.`);

    let winner = displayWinner(choice, computerChoice);

    updateScore(winner);

    if (playerScore !== ROUNDS_TO_WIN && computerScore !== ROUNDS_TO_WIN) {
      prompt(winner);
      prompt(`New Score: You: ${playerScore}, Computer: ${computerScore}`);
      prompt('Do you want to play again? (yes/no)');
      playAgainAnswer = readline.question().toLowerCase();
      validateYesOrNo(playAgainAnswer);
    } else {
      break;
    }
    round += 1;
  }

  grandWinner(computerScore, playerScore);
  prompt(`Final Score: You: ${playerScore}, Computer: ${computerScore}`);
  prompt("Would you like to start a new match? (yes/no)");
  newMatchAnswer = readline.question().toLowerCase();
  validateYesOrNo(newMatchAnswer);
  match += 1;
}
