let flintstones = { Fred: 0, Wilma: 1, Barney: 2, Betty: 3, Bambam: 4, Pebbles: 5 };

let array = Object.entries(flintstones);
let newArray = [];
array.forEach(function (arr) {
  if (arr[0] === 'Barney') {
    newArray = arr;
  }
});

console.log(newArray);

console.log(Object.entries(flintstones).filter(pair => pair[0] === 'Barney').shift());
