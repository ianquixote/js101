let arr = [['b', 'c', 'a'], [2, 1, 3], ['blue', 'black', 'green']];

let sortedArray = arr.map(arr1 => {
  if (typeof arr1[0] === 'string') {
    return arr1.slice().sort();
  } else {
    return arr1.slice().sort((a, b) => a - b);
  }
});

console.log(sortedArray);
console.log(arr);
