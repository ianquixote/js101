const readline = require('readline-sync');
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const MATCH = 3;
const FIRST_MOVE = 'choose';
const BEST_INITIAL_SQUARE = 13;
const WINNING_LINES = [
  ['1', '2', '3', '4'], ['2', '3', '4', '5'],
  ['6', '7', '8', '9'], ['7', '8', '9', '10'],
  ['11', '12', '13', '14'], ['12', '13', '14', '15'],
  ['16', '17', '18', '19'], ['17', '18', '19', '20'],
  ['21', '22', '23', '24'], ['22', '23', '24', '25'],
  ['1', '6', '11', '16'], ['6', '11', '16', '21'],
  ['2', '7', '12', '17'], ['7', '12', '17', '22'],
  ['3', '8', '13', '18'], ['8', '13', '18', '23'],
  ['4', '9', '14', '19'], ['9', '14', '19', '24'],
  ['5', '10', '15', '20'], ['10', '15', '20', '25'],
  ['1', '7', '13', '19'], ['2', '8', '14', '20'],
  ['6', '12', '18', '24'], ['7', '13', '19', '25'],
  ['4', '8', '12', '16'], ['5', '9', '13', '17'],
  ['9', '13', '17', '21'], ['10', '14', '18', '22'],
];

function prompt(input) {
  console.log(`=> ${input}`);
}

function displayBoard(board) {
  console.clear();

  console.log('');
  console.log('1    |2    |3    |4    |5');
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}  |  ${board['4']}  |  ${board['5']}`);
  console.log('     |     |     |     |\n-----+-----+-----+-----+-----\n6    |     |     |     |');
  console.log(`  ${board['6']}  |  ${board['7']}  |  ${board['8']}  |  ${board['9']}  |  ${board['10']}`);
  console.log('     |     |     |     |\n-----+-----+-----+-----+-----\n11   |     |     |     |');
  console.log(`  ${board['11']}  |  ${board['12']}  |  ${board['13']}  |  ${board['14']}  |  ${board['15']}`);
  console.log('     |     |     |     |\n-----+-----+-----+-----+-----\n16   |     |     |     |');
  console.log(`  ${board['16']}  |  ${board['17']}  |  ${board['18']}  |  ${board['19']}  |  ${board['20']}`);
  console.log('     |     |     |     |\n-----+-----+-----+-----+-----\n21   |     |     |     |');
  console.log(`  ${board['21']}  |  ${board['22']}  |  ${board['23']}  |  ${board['24']}  |  ${board['25']}`);
  console.log('     |     |     |     |');
  console.log('');
}

function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 25; square++) {
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
  if (detectGreatVictory(board)) {
    board[detectGreatVictory(board)] = COMPUTER_MARKER;
  } else if (detectGreatThreat(board)) {
    board[detectGreatThreat(board)] = COMPUTER_MARKER;
  } else if (detectNearVictory(board)) {
    board[detectNearVictory(board)] = COMPUTER_MARKER;
  } else if (detectMinorThreat(board)) {
    board[detectMinorThreat(board)] = COMPUTER_MARKER;
  } else if (board[BEST_INITIAL_SQUARE] === INITIAL_MARKER) {
    board[BEST_INITIAL_SQUARE] = COMPUTER_MARKER;
  } else {
    let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
    let square = emptySquares(board)[randomIndex];
    board[square] = COMPUTER_MARKER;
  }
}

function detectGreatThreat(board) {
  for (let line = 0; line < WINNING_LINES.length; line++) {
    let emptySquares =
    WINNING_LINES[line].filter(square => board[square] === INITIAL_MARKER);
    let humanMarkers =
    WINNING_LINES[line].filter(square => board[square] === HUMAN_MARKER);
    if (emptySquares.length === 1 && humanMarkers.length === 3) {
      return emptySquares[0];
    }
  }
  return false;
}

function detectMinorThreat(board) {
  for (let line = 0; line < WINNING_LINES.length; line++) {
    let emptySquares =
    WINNING_LINES[line].filter(square => board[square] === INITIAL_MARKER);
    let humanMarkers =
    WINNING_LINES[line].filter(square => board[square] === HUMAN_MARKER);
    if (emptySquares.length === 2 && humanMarkers.length === 2) {
      return emptySquares[0];
    }
  }
  return false;
}

function detectGreatVictory(board) {
  for (let line = 0; line < WINNING_LINES.length; line++) {
    let emptySquares =
    WINNING_LINES[line].filter(square => board[square] === INITIAL_MARKER);
    let computerMarkers =
    WINNING_LINES[line].filter(square => board[square] === COMPUTER_MARKER);
    if (emptySquares.length === 1 && computerMarkers.length === 3) {
      return emptySquares[0];
    }
  }
  return false;
}

function detectNearVictory(board) {
  for (let line = 0; line < WINNING_LINES.length; line++) {
    let emptySquares =
    WINNING_LINES[line].filter(square => board[square] === INITIAL_MARKER);
    let computerMarkers =
    WINNING_LINES[line].filter(square => board[square] === COMPUTER_MARKER);
    if (emptySquares.length === 2 && computerMarkers.length === 2) {
      return emptySquares[0];
    }
  }
  return false;
}

function isBoardFull(board) {
  return emptySquares(board).length === 0;
}

function detectWinner(board) {
  for (let line = 0; line < WINNING_LINES.length; line++) {
    let [sq1, sq2, sq3, sq4] = WINNING_LINES[line];
    if (board[sq1] === HUMAN_MARKER &&
      board[sq2] === HUMAN_MARKER &&
      board[sq3] === HUMAN_MARKER &&
      board[sq4] === HUMAN_MARKER) {
      return 'You';
    } else if (board[sq1] === COMPUTER_MARKER &&
      board[sq2] === COMPUTER_MARKER &&
      board[sq3] === COMPUTER_MARKER &&
      board[sq4] === COMPUTER_MARKER) {
      return 'The computer';
    }
  }
  return null;
}

function isSomeoneWon(board) {
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
  if (setting === 'player') return 'player';
  if (setting === 'computer') return 'computer';

  if (setting === 'choose') {
    prompt('Choose who goes first: player or computer.');
    while (true) {
      let firstPlay = readline.question().trim().toLowerCase();
      if (firstPlay === 'player' || firstPlay === 'computer') return firstPlay;
      prompt('That is not a valid option. Choose only player or computer.');
    }
  }
  return null;
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

function updateScore(board, score) {
  if (detectWinner(board) === 'You') {
    score.playerScore += 1;
  } else if (detectWinner(board) === 'The computer') {
    score.computerScore += 1;
  }
}

function displayScore(score) {
  prompt(`The score is: Player: ${score.playerScore}, Computer: ${score.computerScore}.`);
}

function displayMatchWinner(score) {
  if (score.playerScore === MATCH) {
    prompt('You win the match!');
  } else if (score.computerScore === MATCH)  {
    prompt('The computer wins the match!');
  }
}

while (true) {
  let score = {playerScore: 0, computerScore: 0};
  while (true) {
    let board = initializeBoard();
    console.clear();
    prompt(`Welcome to Tic-Tac-Toe 4-In-A-Row!.`);
    prompt(`You are ${HUMAN_MARKER} and the computer is ${COMPUTER_MARKER}.`);
    prompt(`Get 4 in a row to win the game.`);
    let currentPlayer = chooseFirstPlayer(FIRST_MOVE);

    while (true) {
      displayBoard(board);
      chooseSquare(board, currentPlayer);
      currentPlayer = alternatePlayer(currentPlayer);
      if (isSomeoneWon(board) || isBoardFull(board)) break;
    }

    displayBoard(board);

    if (isSomeoneWon(board)) {
      prompt(`${detectWinner(board)} won!`);
    } else {
      prompt("It's a tie!");
    }

    updateScore(board, score);
    displayScore(score);
    displayMatchWinner(score);

    if (MATCH === (score.playerScore || score.computerScore)) break;

    prompt('Would you like to play again?');
    let answer = yesOrNo();
    if (answer[0] !== 'y') break;
  }
  prompt('Would you like to play another match?');
  let answer = yesOrNo();
  if (answer[0] !== 'y') break;
}

prompt('Thanks for playing Tic Tac Toe!');
