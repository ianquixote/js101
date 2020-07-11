let rlSync = require('readline-sync');

console.log('What is the bill?');
let bill = rlSync.question();
bill = parseInt(bill, 10);

console.log('What is the tip percentage?');
let tipPercent = rlSync.question();
tipPercent = parseInt(tipPercent, 10);

let tip = parseInt((bill * (tipPercent / 100)).toFixed(2), 10);
let totalBill = (bill + tip).toFixed(2);

console.log(`The tip is $${tip}.`);
console.log(`The total is $${totalBill}.`);
