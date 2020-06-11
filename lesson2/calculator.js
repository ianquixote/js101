//Ask the user for the first number.
//Ask the user for the second number.
//Ask the user for some operation to perform.
//Perform the operation on the two numbers.
//Print the result to the terminal.

const readline = require('readline-sync');
const messages = require('./calculator_messages.json');

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

prompt("For English, press 1: Para Español, prensa 2.");
let language = readline.question();
let lang = "en";
if (language === '2') {
  lang = "es";
}

prompt(messages[lang]['1']);

let answer = '1';

while (answer === '1') {
  prompt(messages[lang]['2']);
  let number1 = readline.question();

  while (invalidNumber(number1)) {
    prompt(messages[lang]['3']);
    number1 = readline.question();
  }

  prompt(messages[lang]['4']);
  let number2 = readline.question();

  while (invalidNumber(number2)) {
    prompt(messages[lang]['3']);
    number2 = readline.question();
  }

  prompt(messages[lang]['5']);
  prompt(messages[lang]['6']);
  let operation = readline.question();

  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt(messages[lang]['7']);
    operation = readline.question();
  }

  let output;
  switch (operation) {
    case '1':
      output = Number(number1) + Number(number2);
      break;
    case '2':
      output = number1 - number2;
      break;
    case '3':
      output = number1 * number2;
      break;
    case '4':
      output = number1 / number2;
      break;
  }

  prompt(messages[lang]['9'] + `${output}.`);

  prompt(messages[lang]['8']);
  answer = readline.question();
}
