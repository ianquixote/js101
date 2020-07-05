const readline = require('readline-sync');
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const MATCH = 3;
const FIRST_MOVE = 'choose';
const WINNING_LINES = [
  ['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'],
  ['1', '4', '7'], ['2', '5', '8'], ['3', '6', '9'],
  ['1', '5', '9'], ['3', '5', '7']];

function prompt(input) {
  console.log(`=> ${input}`);
}

function displayBoard(board) {
  console.clear();

  console.log(`You are ${HUMAN_MARKER} and the computer is ${COMPUTER_MARKER}.`);

  console.log('');
  console.log('     |     |');
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}  `);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}  `);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}  `);
  console.log('     |     |');
  console.log('');
}

function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square++) {
    board[String(square)] = INITIAL_MARKER;
  }

  return board;
}

function emptySquares(board) {
  return Object.keys(board).filter(key => {
    return board[key] === INITIAL_MARKER;
  });
}

function playerChoosesSquare(board) {
  let square;

  while (true) {
    prompt(`Choose a square (${joinOr(emptySquares(board))}):`);
    square = readline.question().trim();

    if (emptySquares(board).includes(square)) break;
    prompt("That's not a valid choice.");
  }
  board[square] = HUMAN_MARKER;
}

function computerChoosesSquare(board) {
  if (detectThreatOrVictory(board, COMPUTER_MARKER)) {
    board[detectThreatOrVictory(board, COMPUTER_MARKER)] = COMPUTER_MARKER;
  } else if (detectThreatOrVictory(board, HUMAN_MARKER)) {
    board[detectThreatOrVictory(board, HUMAN_MARKER)] = COMPUTER_MARKER;
  } else if (board['5'] === INITIAL_MARKER) {
    board['5'] = COMPUTER_MARKER;
  } else {
    let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
    let square = emptySquares(board)[randomIndex];
    board[square] = COMPUTER_MARKER;
  }
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function detectWinner(board) {
  for (let line = 0; line < WINNING_LINES.length; line++) {
    let [sq1, sq2, sq3] = WINNING_LINES[line];
    if (board[sq1] === HUMAN_MARKER &&
      board[sq2] === HUMAN_MARKER &&
      board[sq3] === HUMAN_MARKER) {
      return 'You';
    } else if (board[sq1] === COMPUTER_MARKER &&
      board[sq2] === COMPUTER_MARKER &&
      board[sq3] === COMPUTER_MARKER) {
      return 'The computer';
    }
  }
  return null;
}

function detectThreatOrVictory(board, marker) {
  for (let line = 0; line < WINNING_LINES.length; line++) {
    let emptySquares =
    WINNING_LINES[line].filter(square => board[square] === INITIAL_MARKER);
    let markers =
    WINNING_LINES[line].filter(square => board[square] === marker);
    if (emptySquares.length === 1 && markers.length === 2) {
      return emptySquares[0];
    }
  }
  return false;
}

function someoneWon(board) {
  return !!detectWinner(board);
}

function joinOr(array, delimiter = ', ', finalWord = 'or') {
  switch (array.length) {
    case 0:
      return '';
    case 1:
      return `${array[0]}`;
    case 2:
      return `${array[0]} or ${array[1]}}`;
    default:
      return array.slice(0, array.length - 1).join(`${delimiter}`) +
       `${delimiter}${finalWord} ` +
        array[array.length - 1];
  }
}

function chooseSquare(board, currentPlayer) {
  if (currentPlayer === 'player') {
    playerChoosesSquare(board);
  } else if (currentPlayer === 'computer') {
    computerChoosesSquare(board);
  }
}

function alternatePlayer(currentPlayer) {
  let player;
  if (currentPlayer === 'player') {
    player = 'computer';
  } else if (currentPlayer === 'computer') {
    player = 'player';
  }
  return player;
}

function chooseFirstPlayer(setting) {
  let firstPlayer;
  if (setting === 'choose') {
    prompt('Choose who goes first: player or computer.');
    while (true) {
      firstPlayer = readline.question().trim().toLowerCase();
      if (firstPlayer === 'player' || firstPlayer === 'computer') break;
      prompt('That is not a valid option. Choose only player or computer.');
    }
  } else if (setting === 'player') {
    firstPlayer = 'player';
  } else if (setting === 'computer') {
    firstPlayer = 'computer';
  }
  return firstPlayer;
}

function yesOrNo() {
  let answer;
  let validAnswers = ['y', 'yes', 'yep', 'yeah', 'n', 'no', 'nope', 'nah'];
  while (true) {
    answer = readline.question().trim().toLowerCase();
    if (validAnswers.includes(answer)) break;
    prompt('That is not a valid option. Please choose yes or no.');
  }
  return answer;
}

while (true) {
  let playerScore = 0;
  let computerScore = 0;
  while (true) {
    let board = initializeBoard();
    let currentPlayer = chooseFirstPlayer(FIRST_MOVE);

    while (true) {
      displayBoard(board);
      chooseSquare(board, currentPlayer);
      currentPlayer = alternatePlayer(currentPlayer);
      if (someoneWon(board) || boardFull(board)) break;
    }

    displayBoard(board);

    if (someoneWon(board)) {
      prompt(`${detectWinner(board)} won!`);
    } else {
      prompt("It's a tie!");
    }

    if (detectWinner(board) === 'You') {
      playerScore += 1;
    } else if (detectWinner(board) === 'The computer') {
      computerScore += 1;
    }

    prompt(`The score is: Player: ${playerScore}, Computer: ${computerScore}.`);

    if (playerScore === MATCH) {
      prompt('You win the match!');
      break;
    } else if (computerScore === MATCH)  {
      prompt('The computer wins the match!');
      break;
    }

    prompt('Would you like to play again?');
    let answer = yesOrNo();
    if (answer[0] !== 'y') break;
  }
  prompt('Would you like to play another match?');
  let answer = yesOrNo();
  if (answer[0] !== 'y') break;
}

prompt('Thanks for playing Tic Tac Toe!');
