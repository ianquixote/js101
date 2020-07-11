const readline = require('readline-sync');
const MAX = 21;
const DEALER_STAY = 17;
const MATCH_WIN = 3;

const SUIT_NAMES = {
  H: 'Hearts',
  D: 'Diamonds',
  S: 'Spades',
  C: 'Clubs'
};

const VALUE_NAMES = {
  2: 'a 2',
  3: 'a 3',
  4: 'a 4',
  5: 'a 5',
  6: 'a 6',
  7: 'a 7',
  8: 'an 8',
  9: 'a 9',
  10: 'a 10',
  J: 'a Jack',
  Q: 'a Queen',
  K: 'a King',
  A: 'an Ace'
};

function prompt(string) {
  console.log(`=> ${string}`);
}

function deal(array, deck) {
  array.push(deck.pop());
}

function suit(arr, index1, index2) {
  return SUIT_NAMES[arr[index1][index2]];
}

function value(arr, index1, index2) {
  return VALUE_NAMES[arr[index1][index2]];
}

function valueOfSuit(arr, index) {
  return `${value(arr, index, 0)} of ${suit(arr, index, 1)}`;
}

function youHave(arr) {
  prompt('You have:');
  let string = '';
  for (let index = 0; index < arr.length - 1; index++) {
    string += `${valueOfSuit(arr, index)}, `;
  }
  return string + `and ${valueOfSuit(arr, arr.length - 1)},`;
}

function theDealerHas(arr) {
  prompt('The dealer has:');
  let string = '';
  for (let index = 0; index < arr.length - 1; index++) {
    string += `${valueOfSuit(arr, index)}, `;
  }
  return string + `and ${valueOfSuit(arr, arr.length - 1)},`;
}

function displayHands(playerHand, playerTotal, dealerHand, dealerTotal, start = true) {
  console.clear();
  prompt(youHave(playerHand));
  prompt(`for a total of ${playerTotal}.`);
  console.log('');
  if (start) {
    prompt('The dealer has:');
    prompt(`${valueOfSuit(dealerHand, 0)}, and an unknown card,`);
    prompt('for an unknown total.');
  } else {
    prompt(theDealerHas(dealerHand));
    prompt(`for a total of ${dealerTotal}.`);
  }
  console.log('');
  console.log('------------------------------------------------------------\n');
}


function total(cards) {
  let values = cards.map(card => card[0]);

  let sum = 0;
  values.forEach(value => {
    if (value === "A") {
      sum += 11;
    } else if (['J', 'Q', 'K'].includes(value)) {
      sum += 10;
    } else {
      sum += Number(value);
    }
  });

  // correct for Aces
  values.filter(value => value === "A").forEach(_ => {
    if (sum > MAX) sum -= 10;
  });

  return sum;
}

function busted(handTotal) {
  return handTotal > MAX;
}

function shuffle(array) {
  for (let index = array.length - 1; index > 0; index--) {
    let otherIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[otherIndex]] = [array[otherIndex], array[index]];
  }
}

function displayScore(score) {
  prompt(`The score is: Player: ${score.playerScore}, Dealer: ${score.dealerScore}\n`);
}

function displayMatchWinner(score) {
  if (score.playerScore === MATCH_WIN) {
    prompt('You win the match!');
  } else if (score.dealerScore === MATCH_WIN) {
    prompt('The dealer wins the match!');
  }
}

function isMatchWon(score) {
  return ((score.playerScore || score.dealerScore) === MATCH_WIN);
}

function playAgain() {
  let answer;
  let validAnswers = ['e', 'exit', ''];
  while (true) {
    answer = readline.question().trim().toLowerCase();
    if (validAnswers.includes(answer)) break;
    prompt('That is not a valid option. Please press enter or type exit.');
  }
  return answer[0];
}

function hitOrStay() {
  let answer;
  let validAnswers = ['h', 'hit', 's', 'stay'];
  while (true) {
    answer = readline.question().trim().toLowerCase();
    if (validAnswers.includes(answer)) break;
    prompt('That is not a valid option. Please choose (h)it or (s)tay.');
  }
  return answer[0];
}

while (true) {
  console.clear();
  prompt('Welcome to Twenty-one!\n');
  prompt('Press enter to continue.');
  let answer = readline.question();
  if (answer === '') break;
}

while (true) {
  let score = {playerScore: 0, dealerScore: 0};
  while (true) {
    //Initialize Deck
    let deck = [];
    let suits = ['H', 'D', 'S', 'C'];
    suits.forEach(suit => {
      for (let value = 2; value <= 10; value++) {
        deck.push([value.toString(), suit]);
      }
      deck.push(['J', suit]);
      deck.push(['Q', suit]);
      deck.push(['K', suit]);
      deck.push(['A', suit]);
    });

    shuffle(deck);

    //Deal cards to player and dealer
    let playerHand = [];
    let dealerHand = [];
    deal(playerHand, deck);
    deal(dealerHand, deck);
    deal(playerHand, deck);
    deal(dealerHand, deck);
    let playerTotal = total(playerHand);
    let dealerTotal = total(dealerHand);

    displayHands(playerHand, playerTotal, dealerHand, dealerTotal);

    //Player turn: hit or stay
    // - repeat until bust or stay
    while (true) {
      prompt('Do you want to hit or stay?');
      let answer = hitOrStay();
      if (answer === 'h') {
        deal(playerHand, deck);
        playerTotal = total(playerHand);
      }
      if (answer === 's' || busted(playerTotal)) break;
      displayHands(playerHand, playerTotal, dealerHand, dealerTotal);
    }

    //If player busts, the dealer wins. New game?
    if (busted(playerTotal)) {
      displayHands(playerHand, playerTotal, dealerHand, dealerTotal, false);
      prompt('You have busted! The dealer wins!');
      score.dealerScore += 1;
      displayScore(score);

      displayMatchWinner(score);
      if (isMatchWon(score)) break;

      prompt("Press enter to play again or type 'exit' to leave the match.");
      if (playAgain() === 'e') break;
      else continue;
    }

    //Dealer turn: hit or stay
    // - repeat until total >= 17
    while (true) {
      if (dealerTotal >= DEALER_STAY || busted(dealerTotal)) break;
      deal(dealerHand, deck);
      dealerTotal = total(dealerHand);
    }
    //If dealer busts, the player wins
    if (busted(dealerTotal)) {
      displayHands(playerHand, playerTotal, dealerHand, dealerTotal, false);
      prompt('The dealer has busted! You win!');
      score.playerScore += 1;
      displayScore(score);

      displayMatchWinner(score);
      if (isMatchWon(score)) break;

      prompt("Press enter to play again or type 'exit' to leave the match.");
      if (playAgain() === 'e') break;
      else continue;
    }

    //compare cards and declare the winner
    displayHands(playerHand, playerTotal, dealerHand, dealerTotal, false);
    if (playerTotal > dealerTotal) {
      prompt('You win!');
      score.playerScore += 1;
      displayScore(score);
    } else if (dealerTotal > playerTotal) {
      prompt('The dealer wins!');
      score.dealerScore += 1;
      displayScore(score);
    } else {
      prompt("It's a tie!");
      displayScore(score);
    }

    displayMatchWinner(score);
    if (isMatchWon(score)) break;

    prompt("Press enter to play again or type 'exit' to leave the match.");
    if (playAgain() === 'e') break;
  }
  prompt("Press enter to begin a new match or type 'exit' to stop playing.");
  if (playAgain() === 'e') break;
}

prompt('Thanks for playing Twenty-one!');
