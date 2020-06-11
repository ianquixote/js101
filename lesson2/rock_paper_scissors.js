const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors', 'spock', 'lizard'];

function prompt(message) {
  console.log(`=> ${message}`);
}

function displayWinner(cIndex, compCIndex, pIndex, p3Index) {
  if (compCIndex === pIndex || compCIndex === p3Index) {
    return 'You win!';
  } else if (compCIndex === cIndex) {
    return "It's a draw!";
  } else {
    return 'The computer wins!';
  }
}

// function displayWinner(choice, computerChoice) {
//   if ((choice === 'rock' && (computerChoice === 'scissors' || computerChoice === 'lizard')) ||
//       (choice === 'paper' && (computerChoice === 'rock' || computerChoice === 'spock')) ||
//       (choice === 'scissors' && (computerChoice === 'paper' || computerChoice === 'lizard')) ||
//       (choice === 'lizard' && (computerChoice === 'spock' || computerChoice === 'paper')) ||
//       (choice === 'spock' && (computerChoice === 'rock' || computerChoice === 'scissors'))) {
//     return 'You win!';
//   } else if ((choice === 'rock' && (computerChoice === 'paper' || computerChoice === 'spock')) ||
//       (choice === 'paper' && (computerChoice === 'scissors' || computerChoice === 'lizard')) ||
//       (choice === 'scissors' && (computerChoice === 'rock' || computerChoice === 'spock')) ||
//       (choice === 'lizard' && (computerChoice === 'rock' || computerChoice === 'scissors')) ||
//       (choice === 'spock' && (computerChoice === 'paper' || computerChoice === 'lizard'))) {
//     return 'The computer wins!';
//   } else {
//     return "It's a draw!";
//   }
// }

let answer = 'y';

while (answer[0] !== 'n') {
  prompt(`Choose one: ${VALID_CHOICES.join(', ')}.`);
  let choice = readline.question();

  while (!VALID_CHOICES.includes(choice)) {
    prompt("That's not a valid choice. Choose again.");
    choice = readline.question();
  }

  let choiceIndex = VALID_CHOICES.indexOf(choice);
  let prevIndex = (choiceIndex === 0 ? VALID_CHOICES.length - 1 : choiceIndex - 1);
  let prev3Index = (choiceIndex <= (VALID_CHOICES.length - 3) ? (VALID_CHOICES.length - (3 - choiceIndex)) : choiceIndex - 3);
  let computerChoice = VALID_CHOICES[Math.floor(Math.random() * VALID_CHOICES.length)];
  let computerChoiceIndex = VALID_CHOICES.indexOf(computerChoice);

  prompt(`You chose ${choice}, and the computer chose ${computerChoice}.`);

  let winner = displayWinner(choiceIndex, computerChoiceIndex, prevIndex, prev3Index);
  console.log(winner);

  prompt('Do you want to play again? Enter y/n.');
  answer = readline.question().toLowerCase();

  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt('Please enter y or n.');
    answer = readline.question().toLowerCase();
  }

}
