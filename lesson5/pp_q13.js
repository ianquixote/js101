let arr = [[1, 6, 7], [1, 5, 3], [1, 8, 3]];

function oddSum(array) {
  return array.reduce((accumulator, currentValue) => {
    if (currentValue % 2 === 1) {
      accumulator += currentValue;
    }
    return accumulator;
  }, 0);
}

let newArray = arr.sort((a, b) => {
  return oddSum(a) - oddSum(b);
});

console.log(newArray);
