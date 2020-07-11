const readline = require('readline-sync');

console.log('Is the input in meters or feet?');
let units = readline.question().toLowerCase()[0];

console.log('Enter the length of the room:');
let length = readline.question();
length = parseInt(length, 10);

console.log('Enter the width of the room:');
let width = readline.question();
width = parseInt(width, 10);

let areaInMeters;
let areaInSquareFeet;

if (units === 'm') {
  areaInMeters = (width * length).toFixed(2);
  areaInSquareFeet = (areaInMeters * 10.7639).toFixed(2);
  console.log(`The area of the room is ${areaInMeters} square meters (${areaInSquareFeet} square feet).`);
} else if (units === 'f') {
  areaInSquareFeet = (width * length).toFixed(2);
  areaInMeters = (areaInSquareFeet / 10.7639).toFixed(2);
  console.log(`The area of the room is ${areaInSquareFeet} square feet (${areaInMeters} square meters).`);
}
