//start
const READLINE = require('readline-sync');

function print(message) {
  console.log(message);
}

function query() {
  return READLINE.question();
}
//get loan amount
print("What is the total loan amount?");
let amount1 = query();

//process amount string to valid number
let array = amount1.split('');
let amount2 = '';
array.forEach(function (string) {
  if (Number.isInteger(Number(string)) || string === '.') {
    amount2 += string;
  }
});
amount2 = parseFloat(amount2);

//get APR
print("What is the APR? (Type a number from 0 to 100)");
let apr = query();

//convert APR to monthly interest (monInt)
let monInt = ((parseInt(apr) / 100) / 12);

//get loan duration in years
print("What is the loan duration in years?");
let years = query();

//convert loan duration to months
let months = (parseFloat(years) * 12);

//perform operation to find monthly payment
let payment = (amount2 * (monInt / (1 - Math.pow((1 + monInt),(-months))))).toFixed(2);

//print result
print(`The montlhy payment for this loan is $${payment}.`);
