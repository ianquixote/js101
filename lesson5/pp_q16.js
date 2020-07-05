let arr = [['a', 1], ['b', 'two'], ['sea', {'c': 3}], ['D', ['a', 'b', 'c']]];

let obj = {};

arr.forEach(arr1 => {
  obj[arr1[0]] = arr1[1];
});

console.log(obj);
