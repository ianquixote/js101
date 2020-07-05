let arr = [{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }];

let serArray = JSON.stringify(arr);
let deepCopyArr = JSON.parse(serArray);

let newArr = deepCopyArr.map(obj => {
  for (let prop in obj) {
    obj[prop] += 1;
  }
  return obj;
});

console.log(newArr);
console.log(arr);
