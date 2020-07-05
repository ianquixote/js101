let numbers = [1, 2, 3, 4];
let startingLength = numbers.length;

for (let index = 0; index <= startingLength; index++) {
  numbers.shift();
}

for (let index = 0; index <= startingLength; index++) {
  numbers.pop();
}

numbers.splice(0, numbers.length);

numbers.length = 0;

console.log(numbers);
