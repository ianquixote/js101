let arr = [[2], [3, 5, 7], [9], [11, 15, 18]];

let newArray = arr.map(arr1 => {
  return arr1.filter(num => num % 3 === 0);
});

console.log(newArray);
