const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors', 'spock', 'lizard'];

function prompt(message) {
  console.log(`=> ${message}`);
}

function playerWins(choice, computerChoice) {
  return (choice === 'rock' && computerChoice === 'scissors') ||
         (choice === 'rock' && computerChoice === 'lizard') ||
         (choice === 'paper' && computerChoice === 'rock') ||
         (choice === 'paper' && computerChoice === 'spock') ||
         (choice === 'scissors' && computerChoice === 'paper') ||
         (choice === 'scissors' && computerChoice === 'lizard') ||
         (choice === 'lizard' && computerChoice === 'paper') ||
         (choice === 'lizard' && computerChoice === 'spock') ||
         (choice === 'spock' && computerChoice === 'rock') ||
         (choice === 'spock' && computerChoice === 'scissors');
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
function inputToChoice(input) {
  choice = '';
  switch (input) {
    case 'r': case 'ro': case 'rock':
      choice = 'rock';
      break;
    case 'p': case 'pa': case 'paper':
      choice = 'paper';
      break;
    case 'sc': case 'scissors':
      choice = 'scissors';
      break;
    case 'sp': case 'spock':
      choice = 'spock';
      break;
    case 'l': case 'li': case 'lizard':
      choice = 'lizard';
      break;
  }
}

function validateYesOrNo(ans) {
  while (ans[0] !== 'n' && ans[0] !== 'y') {
    prompt('Please enter y or n.');
    ans = readline.question().toLowerCase();
  }
}

function grandWinner(score1, score2) {
  if (score1 === 5) {
    prompt('The computer is the grand winner!');
  } else if (score2 === 5) {
    prompt('You are the grand winner!');
  } else {
    prompt('You resigned. The computer wins by default.');
  }
}

function randomIndex() {
  return VALID_CHOICES[Math.floor(Math.random() * VALID_CHOICES.length)];
}

let newMatchAnswer = 'y';
let match = 1;
let round = 1;
while (newMatchAnswer[0] !== 'n') {
  let playAgainAnswer = 'y';
  round = 1;
  playerScore = 0;
  computerScore = 0;
  while (playAgainAnswer[0] !== 'n') {
    console.clear();
    prompt(`Match: ${match} Round: ${round}`);
    prompt(`Current Score: You: ${playerScore}, Computer: ${computerScore}`);
    prompt(`Choose one: rock, paper, scissors, lizard, or spock.`);
    prompt('*Type the first 1 or 2 letters or the full name of your choice.*');
    let input = readline.question();
    inputToChoice(input);
    while (!VALID_CHOICES.includes(choice)) {
      prompt("That's not a valid choice. Choose again.");
      input = readline.question();
      inputToChoice(input);
    }

    let computerChoice = randomIndex();

    prompt(`You chose ${choice}, and the computer chose ${computerChoice}.`);

    let winner = displayWinner(choice, computerChoice);

    updateScore(winner);

    if (playerScore !== 5 && computerScore !== 5) {
      prompt(winner);
      prompt(`New Score: You: ${playerScore}, Computer: ${computerScore}`);
      prompt('Do you want to play again? (y/n)');
      playAgainAnswer = readline.question().toLowerCase();
      validateYesOrNo(playAgainAnswer);
    } else {
      break;
    }
    round += 1;
  }

  grandWinner(computerScore, playerScore);
  prompt(`Final Score: You: ${playerScore}, Computer: ${computerScore}`);
  prompt("Would you like to start a new match? (y/n)");
  newMatchAnswer = readline.question().toLowerCase();
  validateYesOrNo(newMatchAnswer);
  match += 1;
}