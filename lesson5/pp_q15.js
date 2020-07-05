let arr = [
  { a: [1, 2, 3] },
  { b: [2, 4, 6], c: [3, 6], d: [4] },
  { e: [8], f: [6, 10] },
];

let newArray = [];

arr.forEach(obj => {
  if (Object.values(obj).every(arr1 => arr1.every(num => num % 2 === 0))) {
    newArray.push(obj);
  }
});

console.log(newArray);
