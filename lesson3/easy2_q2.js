let numbers = [1, 2, 3, 4, 5];

let reversedNumbers = [].concat(numbers).reverse();
console.log(reversedNumbers);

console.log(numbers.slice(0).sort((num1, num2) => num2 - num1));

console.log([...numbers.slice(0).sort((num1, num2) => num2 - num1)]);

let array = [];
numbers.forEach(num => {
  array.unshift(num);
});
console.log(array);

let reduce = numbers.reduce(function(accumulator, value) {
  accumulator.unshift(value);
  return accumulator;
}, []);
console.log(reduce);

console.log(numbers);
